import { eq, sql } from "drizzle-orm";
import { generateText, Output } from "ai";
import { z } from "zod";
import { db, schema } from "../src/db";

const MODEL = process.env.AI_MODEL ?? "anthropic/claude-haiku-4.5";
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 12);

const schemaObj = z.object({
  description: z
    .string()
    .describe(
      "One or two concise factual sentences about the activity. No fluff, no second person."
    ),
  tools: z
    .array(z.string())
    .min(5)
    .max(10)
    .describe(
      "5-10 specific physical tools, equipment or materials actually used."
    ),
  glossary: z
    .array(
      z.object({
        term: z.string(),
        definition: z.string(),
      })
    )
    .min(6)
    .max(10)
    .describe(
      "6-10 genuine insider terms with one-line factual definitions. Not generic words like 'Fundamentals' or 'Drill'."
    ),
});

type Row = { id: number; name: string; cat: string };

const GENERIC_DESC =
  "This activity's tools and glossary are still being curated. Contributions welcome — see the project README.";

async function generate(row: Row) {
  const prompt = `You are writing an entry in a hobby-and-activity encyclopedia.
Activity: ${row.name}
Category: ${row.cat}

Produce a JSON object per the schema with factual, specific content. Glossary terms must be real insider jargon for THIS activity (e.g. for Bowling: "turkey", "split", "strike"; NOT "fundamentals", "drill"). Tools must be concrete physical items. Description = 1-2 sentences, no marketing language, no second person.`;

  const { experimental_output } = await generateText({
    model: MODEL,
    output: Output.object({ schema: schemaObj }),
    prompt,
    temperature: 0.3,
  });
  return experimental_output;
}

async function processRow(row: Row): Promise<{ ok: boolean; err?: string }> {
  try {
    const out = await generate(row);
    await db
      .update(schema.activities)
      .set({ description: out.description })
      .where(eq(schema.activities.id, row.id));

    await db.delete(schema.tools).where(eq(schema.tools.activityId, row.id));
    await db.insert(schema.tools).values(
      out.tools.map((name, i) => ({
        activityId: row.id,
        name,
        position: i,
      }))
    );

    await db
      .delete(schema.glossaryTerms)
      .where(eq(schema.glossaryTerms.activityId, row.id));
    await db.insert(schema.glossaryTerms).values(
      out.glossary.map((g, i) => ({
        activityId: row.id,
        term: g.term,
        definition: g.definition,
        position: i,
      }))
    );
    return { ok: true };
  } catch (e) {
    return { ok: false, err: (e as Error).message };
  }
}

async function main() {
  const rows = await db.execute<Row>(sql`
    SELECT a.id, a.name, c.name AS cat
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE a.description = ${GENERIC_DESC}
       OR a.description IS NULL
       OR a.description = ''
       OR EXISTS (
         SELECT 1 FROM glossary_terms g
         WHERE g.activity_id = a.id
           AND g.term = 'Fundamentals'
           AND g.definition = 'Core skills underpinning advanced work'
       )
    ORDER BY a.id
  `);

  const queue: Row[] = rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    cat: String(r.cat),
  }));
  const total = queue.length;
  console.log(`${total} activities to fill. Model=${MODEL} concurrency=${CONCURRENCY}`);

  let done = 0;
  let failed = 0;
  const start = Date.now();

  async function worker() {
    while (queue.length) {
      const row = queue.shift();
      if (!row) break;
      const res = await processRow(row);
      done++;
      if (!res.ok) {
        failed++;
        if (failed <= 20) console.error(`  ✗ ${row.name}: ${res.err}`);
      }
      if (done % 10 === 0) {
        const el = (Date.now() - start) / 1000;
        const rate = done / el;
        const eta = (total - done) / rate;
        console.log(
          `  ${done}/${total} (${failed} failed) ${rate.toFixed(2)}/s eta ${Math.round(eta)}s`
        );
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  console.log(`Done. ${done - failed} succeeded, ${failed} failed.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
