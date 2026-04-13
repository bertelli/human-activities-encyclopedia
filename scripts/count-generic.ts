import { db } from "../src/db";
import { sql } from "drizzle-orm";

async function main() {
  const generic =
    "This activity's tools and glossary are still being curated. Contributions welcome — see the project README.";
  const total = await db.execute<{ n: number }>(
    sql`SELECT COUNT(*)::int AS n FROM activities`
  );
  const genericDesc = await db.execute<{ n: number }>(
    sql`SELECT COUNT(*)::int AS n FROM activities WHERE description = ${generic} OR description IS NULL OR description = ''`
  );
  const genericGloss = await db.execute<{ n: number }>(sql`
    SELECT COUNT(DISTINCT a.id)::int AS n FROM activities a
    WHERE EXISTS (
      SELECT 1 FROM glossary_terms g
      WHERE g.activity_id = a.id
        AND g.term = 'Fundamentals'
        AND g.definition = 'Core skills underpinning advanced work'
    )
  `);
  console.log("total:", total[0].n);
  console.log("generic description:", genericDesc[0].n);
  console.log("generic glossary:", genericGloss[0].n);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
