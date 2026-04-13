import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  const generic =
    "This activity's tools and glossary are still being curated. Contributions welcome — see the project README.";
  const rows = await db.execute<{ id: number; name: string; cat: string }>(sql`
    SELECT a.id, a.name, c.name AS cat
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    WHERE a.description = ${generic}
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
  for (const r of rows) {
    console.log(`${r.id}\t${r.cat}\t${r.name}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
