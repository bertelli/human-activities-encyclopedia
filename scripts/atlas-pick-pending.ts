import { sql } from "drizzle-orm";
import { db } from "../src/db";

async function main() {
  const rows = await db.execute<{
    id: number;
    name: string;
    slug: string;
    category_name: string;
    parent_name: string | null;
  }>(sql`
    SELECT a.id, a.name, a.slug, c.name AS category_name, p.name AS parent_name
    FROM activities a
    JOIN categories c ON c.id = a.category_id
    LEFT JOIN activities p ON p.slug = a.parent_slug
    WHERE
      COALESCE(TRIM(a.description), '') = ''
      OR a.icon_voxels IS NULL
      OR (SELECT COUNT(*) FROM tools t WHERE t.activity_id = a.id) < 5
      OR (SELECT COUNT(*) FROM glossary_terms g WHERE g.activity_id = a.id) < 8
      OR (SELECT COUNT(*) FROM techniques tq WHERE tq.activity_id = a.id) < 4
      OR (SELECT COUNT(*) FROM brands b WHERE b.activity_id = a.id) < 4
      OR (SELECT COUNT(*) FROM masters m WHERE m.activity_id = a.id) < 3
    ORDER BY random()
    LIMIT 1
  `);

  if (rows.length === 0) {
    process.stderr.write("No pending activities.\n");
    process.exit(2);
  }

  const r = rows[0];
  process.stdout.write(
    JSON.stringify({
      id: Number(r.id),
      name: String(r.name),
      slug: String(r.slug),
      categoryName: String(r.category_name),
      parentName: r.parent_name ? String(r.parent_name) : null,
    }) + "\n"
  );
  process.exit(0);
}

main().catch((e) => {
  process.stderr.write(`pick-pending failed: ${(e as Error).message}\n`);
  process.exit(1);
});
