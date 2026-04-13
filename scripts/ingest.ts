import { readFileSync } from "node:fs";
import { db, schema } from "../src/db";
import { DATA } from "../src/data/activities";
import { slugify } from "../src/lib/slug";

const newRaw = JSON.parse(
  readFileSync(
    new URL("../src/data/new-activities.json", import.meta.url),
    "utf8"
  )
) as Array<{
  name: string;
  category: string;
  icon: string;
  tools: string[];
  glossary: Record<string, string>;
}>;

type Activity = (typeof newRaw)[number];
const all: Activity[] = [...DATA, ...newRaw];

function findParentSlug(name: string, allNames: string[]): string | null {
  const lower = name.toLowerCase();
  const candidates = allNames
    .filter((n) => n.toLowerCase() !== lower)
    .filter((n) => {
      const nl = n.toLowerCase();
      return lower.includes(nl) || lower.endsWith(` ${nl}`);
    })
    .sort((a, b) => b.length - a.length);
  return candidates[0] ? slugify(candidates[0]) : null;
}

async function main() {
  console.log(`Ingesting ${all.length} activities...`);

  await db.delete(schema.glossaryTerms);
  await db.delete(schema.tools);
  await db.delete(schema.activities);
  await db.delete(schema.categories);

  const uniqueCategories = Array.from(new Set(all.map((d) => d.category)));
  const categoryRows = await db
    .insert(schema.categories)
    .values(
      uniqueCategories.map((name) => ({ name, slug: slugify(name) }))
    )
    .returning();
  const catByName = new Map(categoryRows.map((c) => [c.name, c.id]));

  const allNames = all.map((a) => a.name);

  const BATCH = 100;
  for (let i = 0; i < all.length; i += BATCH) {
    const batch = all.slice(i, i + BATCH);
    const inserted = await db
      .insert(schema.activities)
      .values(
        batch.map((item) => ({
          name: item.name,
          slug: slugify(item.name),
          icon: item.icon || "",
          categoryId: catByName.get(item.category)!,
          parentSlug: findParentSlug(item.name, allNames),
        }))
      )
      .returning();

    for (let j = 0; j < batch.length; j++) {
      const item = batch[j];
      const activity = inserted[j];

      if (item.tools.length > 0) {
        await db.insert(schema.tools).values(
          item.tools.map((t, idx) => ({
            activityId: activity.id,
            name: t,
            position: idx,
          }))
        );
      }

      const glossaryEntries = Object.entries(item.glossary);
      if (glossaryEntries.length > 0) {
        await db.insert(schema.glossaryTerms).values(
          glossaryEntries.map(([term, definition], idx) => ({
            activityId: activity.id,
            term,
            definition,
            position: idx,
          }))
        );
      }
    }
    console.log(`  inserted ${Math.min(i + BATCH, all.length)}/${all.length}`);
  }

  console.log(`Done. ${categoryRows.length} categories, ${all.length} activities.`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
