import { db, schema } from "@/db";
import { DATA } from "@/data/activities";
import { slugify } from "@/lib/slug";

async function main() {
  console.log(`Seeding ${DATA.length} activities...`);

  await db.delete(schema.glossaryTerms);
  await db.delete(schema.tools);
  await db.delete(schema.activities);
  await db.delete(schema.categories);

  const uniqueCategories = Array.from(new Set(DATA.map((d) => d.category)));
  const categoryRows = await db
    .insert(schema.categories)
    .values(
      uniqueCategories.map((name) => ({ name, slug: slugify(name) }))
    )
    .returning();
  const catByName = new Map(categoryRows.map((c) => [c.name, c.id]));

  for (const item of DATA) {
    const [activity] = await db
      .insert(schema.activities)
      .values({
        name: item.name,
        slug: slugify(item.name),
        icon: item.icon,
        categoryId: catByName.get(item.category)!,
      })
      .returning();

    if (item.tools.length > 0) {
      await db.insert(schema.tools).values(
        item.tools.map((t, i) => ({
          activityId: activity.id,
          name: t,
          position: i,
        }))
      );
    }

    const glossaryEntries = Object.entries(item.glossary);
    if (glossaryEntries.length > 0) {
      await db.insert(schema.glossaryTerms).values(
        glossaryEntries.map(([term, definition], i) => ({
          activityId: activity.id,
          term,
          definition,
          position: i,
        }))
      );
    }
  }

  console.log(`Seeded ${categoryRows.length} categories, ${DATA.length} activities.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
