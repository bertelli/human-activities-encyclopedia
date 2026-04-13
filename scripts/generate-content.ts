import { eq, sql } from "drizzle-orm";
import { db, schema } from "../src/db";

const MODEL = process.env.OLLAMA_MODEL ?? "qwen2.5:14b";
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const CONCURRENCY = Number(process.env.CONCURRENCY ?? 4);

type GenOutput = {
  icon: string;
  tools: string[];
  glossary: Array<{ term: string; definition: string }>;
};

async function callOllama(
  name: string,
  categoryName: string
): Promise<GenOutput> {
  const prompt = `You are a hobby encyclopedia.
For the activity "${name}" (category: ${categoryName}), output a JSON object with EXACTLY these keys:
- "icon": one relevant emoji character
- "tools": array of 5-10 specific physical tools or equipment (strings)
- "glossary": array of 6-10 objects, each with "term" (insider jargon) and "definition" (one concise factual sentence)

Be factual. No commentary. No markdown. ONLY valid JSON.`;

  const res = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      format: "json",
      stream: false,
      options: { temperature: 0.3 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Ollama ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as { response: string };
  const parsed = JSON.parse(data.response) as Partial<GenOutput>;

  const icon =
    typeof parsed.icon === "string" && parsed.icon.length <= 8
      ? parsed.icon
      : "•";
  const tools = Array.isArray(parsed.tools)
    ? parsed.tools.filter((t): t is string => typeof t === "string").slice(0, 10)
    : [];
  const glossary = Array.isArray(parsed.glossary)
    ? parsed.glossary
        .filter(
          (g): g is { term: string; definition: string } =>
            g != null &&
            typeof (g as { term?: unknown }).term === "string" &&
            typeof (g as { definition?: unknown }).definition === "string"
        )
        .slice(0, 10)
    : [];

  return { icon, tools, glossary };
}

async function getPending(limit: number) {
  return db.execute<{
    id: number;
    name: string;
    category_name: string;
  }>(sql`
    SELECT a.id, a.name, c.name AS category_name
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE (a.icon IS NULL OR a.icon = '')
       OR NOT EXISTS (SELECT 1 FROM tools t WHERE t.activity_id = a.id)
       OR NOT EXISTS (SELECT 1 FROM glossary_terms g WHERE g.activity_id = a.id)
    ORDER BY a.id
    LIMIT ${limit}
  `);
}

async function processActivity(row: {
  id: number;
  name: string;
  category_name: string;
}) {
  try {
    const out = await callOllama(row.name, row.category_name);

    if (out.tools.length === 0 && out.glossary.length === 0) {
      throw new Error("empty output");
    }

    await db
      .update(schema.activities)
      .set({ icon: out.icon })
      .where(eq(schema.activities.id, row.id));

    await db.delete(schema.tools).where(eq(schema.tools.activityId, row.id));
    if (out.tools.length > 0) {
      await db.insert(schema.tools).values(
        out.tools.map((name, i) => ({
          activityId: row.id,
          name,
          position: i,
        }))
      );
    }

    await db
      .delete(schema.glossaryTerms)
      .where(eq(schema.glossaryTerms.activityId, row.id));
    if (out.glossary.length > 0) {
      await db.insert(schema.glossaryTerms).values(
        out.glossary.map((g, i) => ({
          activityId: row.id,
          term: g.term,
          definition: g.definition,
          position: i,
        }))
      );
    }

    return { ok: true as const };
  } catch (e) {
    return { ok: false as const, error: (e as Error).message };
  }
}

async function main() {
  const limit = Number(process.env.LIMIT ?? 5000);
  console.log(`Model: ${MODEL}  concurrency: ${CONCURRENCY}  limit: ${limit}`);

  const rows = await getPending(limit);
  console.log(`${rows.length} activities need content.`);
  if (rows.length === 0) process.exit(0);

  const queue = rows.map((r) => ({
    id: Number(r.id),
    name: String(r.name),
    category_name: String(r.category_name),
  }));

  let done = 0;
  let failed = 0;
  const start = Date.now();

  async function worker() {
    while (queue.length > 0) {
      const row = queue.shift();
      if (!row) break;
      const result = await processActivity(row);
      done++;
      if (!result.ok) {
        failed++;
        if (failed <= 10) {
          console.error(`  ✗ ${row.name}: ${result.error}`);
        }
      }
      if (done % 10 === 0) {
        const elapsed = (Date.now() - start) / 1000;
        const rate = done / elapsed;
        const remaining = (rows.length - done) / rate;
        console.log(
          `  ${done}/${rows.length} (${failed} failed) ${rate.toFixed(1)}/s, eta ${Math.round(
            remaining
          )}s`
        );
      }
    }
  }

  await Promise.all(
    Array.from({ length: CONCURRENCY }, () => worker())
  );

  console.log(`Done. ${done - failed} succeeded, ${failed} failed.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
