import { sql } from "drizzle-orm";
import { db, schema } from "../src/db";
import { slugify } from "../src/lib/slug";

const FINAL_MAP: Record<string, string> = {
  "Role-playing & Strategy Games": "Games",
  "Lifestyle & Self-improvement": "Mind & Spirit",
  "Self-sufficiency": "Nature & Science",
  "Fiber Arts": "Arts & Crafts",
  "Outdoors": "Sports",
  "Making & Crafts": "Arts & Crafts",
  "Animals & Nature": "Nature & Science",
  "Sports & Fitness": "Sports",
  "Martial Arts & Combat": "Sports",
  "Racket Sports": "Sports",
  "Automotive": "Technology & Making",
  "Spiritual & Mystical": "Mind & Spirit",
  "Arts": "Arts & Crafts",
  "Extreme Sports": "Sports",
  "Board Games": "Games",
  "Outdoors & Sports": "Sports",
  "Gardening": "Nature & Science",
  "Music & Audio": "Music",
  "Paper Arts": "Arts & Crafts",
  "Skill Toys": "Games",
  "Skills & Hobbies": "Technology & Making",
  "Outdoors & Collecting": "Nature & Science",
  "Music & Performing Arts": "Music",
  "Nature & Gardening": "Nature & Science",
  "Gaming & Performance": "Games",
  "Media & Communication": "Technology & Making",
  "Education & Leisure": "Mind & Spirit",
  "Science": "Nature & Science",
  "Fitness & Sports": "Sports",
  "Watersports": "Sports",
  "Lifestyle & Organization": "Mind & Spirit",
  "Performing Arts & Media": "Performance",
  "Arts & Performing": "Performance",
  "Nature & Collecting": "Collecting",
  "Board Sports": "Sports",
  "Technology": "Technology & Making",
  "Music & Collecting": "Music",
  "Nature & Outdoors": "Nature & Science",
  "Outdoors & Nature": "Nature & Science",
  "Tech & Games": "Games",
  "Research & Education": "Mind & Spirit",
  "Outdoors & Adventure": "Sports",
  "Spiritual & Paranormal": "Mind & Spirit",
  "Martial Arts & Sports": "Sports",
  "Beauty & Self-care": "Mind & Spirit",
  "Gaming & Tech": "Games",
  "Gaming": "Games",
  "Lifestyle": "Mind & Spirit",
  "Science & Outdoors": "Nature & Science",
  "Collecting & Shopping": "Collecting",
  "Paper Arts & Crafts": "Arts & Crafts",
  "Puzzles": "Games",
  "Lifestyle & Wellness": "Mind & Spirit",
  "Fitness & Dance": "Performance",
  "Animals & Sports": "Sports",
  "Motorsports": "Technology & Making",
  "Making & DIY": "Technology & Making",
  "Arts & Literature": "Writing",
  "Science & Nature": "Nature & Science",
};

async function main() {
  const cats = await db.select().from(schema.categories);
  const catByName = new Map(cats.map((c) => [c.name, c]));

  for (const [from, to] of Object.entries(FINAL_MAP)) {
    const fromCat = catByName.get(from);
    let toCat = catByName.get(to);
    if (!fromCat) continue;
    if (!toCat) {
      const [row] = await db
        .insert(schema.categories)
        .values({ name: to, slug: slugify(to) })
        .returning();
      toCat = row;
      catByName.set(to, row);
    }
    await db.execute(sql`
      UPDATE activities SET category_id = ${toCat.id}
      WHERE category_id = ${fromCat.id}
    `);
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
    ORDER BY cnt DESC
  `);
  for (const r of final) console.log(r.cnt, "-", r.name);

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
