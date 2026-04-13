import { eq, sql } from "drizzle-orm";
import { db, schema } from "../src/db";
import { resolveContent } from "../src/data/content";

async function main() {
  const rows = await db.execute<{
    id: number;
    name: string;
    category_name: string;
  }>(sql`
    SELECT a.id, a.name, c.name AS category_name
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE (a.icon IS NULL OR a.icon = '' OR a.icon = '•')
       OR NOT EXISTS (SELECT 1 FROM tools t WHERE t.activity_id = a.id)
       OR NOT EXISTS (SELECT 1 FROM glossary_terms g WHERE g.activity_id = a.id)
    ORDER BY a.id
  `);

  console.log(`Filling content for ${rows.length} activities...`);
  let updated = 0;

  for (const row of rows) {
    const id = Number(row.id);
    const name = String(row.name);
    const category = String(row.category_name);
    const content = resolveContent(name, category);

    await db
      .update(schema.activities)
      .set({ icon: content.icon })
      .where(eq(schema.activities.id, id));

    await db.delete(schema.tools).where(eq(schema.tools.activityId, id));
    await db.insert(schema.tools).values(
      content.tools.map((t, i) => ({
        activityId: id,
        name: t,
        position: i,
      }))
    );

    await db.delete(schema.glossaryTerms).where(eq(schema.glossaryTerms.activityId, id));
    await db.insert(schema.glossaryTerms).values(
      content.glossary.map(([term, definition], i) => ({
        activityId: id,
        term,
        definition,
        position: i,
      }))
    );

    updated++;
    if (updated % 100 === 0) console.log(`  ${updated}/${rows.length}`);
  }

  console.log(`Done. ${updated} activities updated.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
