import { sql } from "drizzle-orm";
import { db, schema } from "../src/db";

const FOLD: Record<string, string> = {
  Writing: "Arts & Crafts",
  Photography: "Arts & Crafts",
};

async function main() {
  const cats = await db.select().from(schema.categories);
  const byName = new Map(cats.map((c) => [c.name, c]));

  for (const [from, to] of Object.entries(FOLD)) {
    const fromCat = byName.get(from);
    const toCat = byName.get(to);
    if (!fromCat || !toCat) {
      console.log(`skip: ${from} → ${to} (missing)`);
      continue;
    }
    const [{ moved }] = await db.execute<{ moved: string }>(sql`
      WITH upd AS (
        UPDATE activities SET category_id = ${toCat.id}
        WHERE category_id = ${fromCat.id}
        RETURNING 1
      )
      SELECT COUNT(*)::text AS moved FROM upd
    `);
    console.log(`moved ${moved} from "${from}" to "${to}"`);
  }

  await db.execute(sql`
    DELETE FROM categories
    WHERE NOT EXISTS (
      SELECT 1 FROM activities a WHERE a.category_id = categories.id
    )
  `);

  const final = await db.execute<{ name: string; cnt: string }>(sql`
    SELECT c.name, COUNT(a.id) AS cnt
    FROM categories c
    LEFT JOIN activities a ON a.category_id = c.id
    GROUP BY c.name
    ORDER BY c.name ASC
  `);
  console.log("---after---");
  for (const r of final) console.log(r.cnt, "-", r.name);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
