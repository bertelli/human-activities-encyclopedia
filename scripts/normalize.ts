import { sql } from "drizzle-orm";
import { db, schema } from "../src/db";
import { slugify } from "../src/lib/slug";

const CATEGORY_MAP: Record<string, string> = {
  "Paper & Print Arts": "Arts & Crafts",
  "Fiber & Textile": "Arts & Crafts",
  "Glass & Ceramics": "Arts & Crafts",
  "Wood & Natural Materials": "Arts & Crafts",
  "Metal & Jewelry": "Arts & Crafts",
  "Visual Arts": "Arts & Crafts",
  "Miniature & Scale Arts": "Arts & Crafts",
  "Arts & Media": "Arts & Crafts",
  "Making & Tech": "Technology & Making",
  "Technology & Making": "Technology & Making",
  "Vehicles & Transport": "Technology & Making",
  "Digital & Online": "Technology & Making",
  "Photography": "Photography",
  "Photography Subcategories": "Photography",
  "Writing": "Writing",
  "Writing Subcategories": "Writing",
  "Language & Literature": "Writing",
  "Music & Sound": "Music",
  "Music Production": "Music",
  "Performance & Social": "Performance",
  "Performing Arts": "Performance",
  "Dance": "Performance",
  "Sports": "Sports",
  "Sports & Athletics": "Sports",
  "Combat & Martial Arts": "Sports",
  "Water Sports": "Sports",
  "Winter Sports": "Sports",
  "Outdoor & Adventure": "Sports",
  "Cycling & Board Sports": "Sports",
  "Racket & Cue Sports": "Sports",
  "Equestrian": "Sports",
  "Archery & Throwing": "Sports",
  "Track & Field": "Sports",
  "Gym & Fitness": "Sports",
  "Fitness & Wellness": "Sports",
  "Niche Sports": "Sports",
  "Niche & Unusual": "Sports",
  "Board & Card Games": "Games",
  "Puzzles & Mind Games": "Games",
  "Role-Playing & Strategy Games": "Games",
  "South Asian Games": "Games",
  "East Asian Games": "Games",
  "Southeast Asian Games": "Games",
  "Central Asian Games": "Games",
  "Middle Eastern Games": "Games",
  "African Games": "Games",
  "European Folk Games": "Games",
  "Indigenous American Games": "Games",
  "Oceania & Pacific": "Games",
  "Ancient & Historical": "Games",
  "Collecting": "Collecting",
  "Food Crafts": "Food & Drink",
  "Food & Drink": "Food & Drink",
  "Science & Nature Hobbies": "Nature & Science",
  "Animals & Pets": "Nature & Science",
  "Outdoor Skills": "Nature & Science",
  "Self-Sufficiency": "Nature & Science",
  "Spiritual & Contemplative": "Mind & Spirit",
  "Lifestyle & Self-Improvement": "Mind & Spirit",
  "Health & Alternative Medicine": "Mind & Spirit",
};

const MANUAL_PARENTS: Record<string, string> = {
  "360 photography": "Photography",
  "Aerial photography": "Photography",
  "Drone photography": "Photography",
  "Underwater photography": "Photography",
  "Astrophotography": "Photography",
  "Film photography": "Photography",
  "Portrait photography": "Photography",
  "Wedding photography": "Photography",
  "Street photography": "Photography",
  "Landscape photography": "Photography",
  "Food photography": "Photography",
  "Fashion photography": "Photography",
  "Sports photography": "Photography",
  "Wildlife photography": "Photography",
  "Macro photography": "Photography",
  "Night photography": "Photography",
  "Alpine Skiing": "Skiing",
  "Cross-Country Skiing": "Skiing",
  "Ski Jumping": "Skiing",
  "Freestyle Skiing": "Skiing",
  "Water Skiing": "Skiing",
};

async function main() {
  console.log("Normalizing categories...");

  const allActs = await db
    .select({
      id: schema.activities.id,
      name: schema.activities.name,
      categoryId: schema.activities.categoryId,
    })
    .from(schema.activities);

  const allCats = await db.select().from(schema.categories);
  const catById = new Map(allCats.map((c) => [c.id, c]));

  const canonicalSet = new Set<string>();
  for (const [, v] of Object.entries(CATEGORY_MAP)) canonicalSet.add(v);
  for (const c of allCats)
    if (!CATEGORY_MAP[c.name]) canonicalSet.add(c.name);

  const existingBySlug = new Map(allCats.map((c) => [c.slug, c]));
  const canonicalRows: typeof allCats = [];
  for (const name of canonicalSet) {
    const slug = slugify(name);
    const existing = existingBySlug.get(slug);
    if (existing) {
      canonicalRows.push(existing);
    } else {
      const [row] = await db
        .insert(schema.categories)
        .values({ name, slug })
        .returning();
      canonicalRows.push(row);
    }
  }
  const canonicalByName = new Map(canonicalRows.map((c) => [c.name, c.id]));

  let updated = 0;
  for (const a of allActs) {
    const oldCat = catById.get(a.categoryId);
    if (!oldCat) continue;
    const mapped = CATEGORY_MAP[oldCat.name] ?? oldCat.name;
    const newCatId = canonicalByName.get(mapped);
    if (!newCatId || newCatId === a.categoryId) continue;
    await db
      .update(schema.activities)
      .set({ categoryId: newCatId })
      .where(sql`${schema.activities.id} = ${a.id}`);
    updated++;
  }
  console.log(`  remapped ${updated} activities`);

  await db.execute(sql`
    DELETE FROM categories
    WHERE NOT EXISTS (
      SELECT 1 FROM activities a WHERE a.category_id = categories.id
    )
  `);

  const finalCats = await db.select().from(schema.categories);
  console.log(`  ${finalCats.length} categories remain`);

  console.log("Applying manual parent overrides...");
  const byName = new Map(allActs.map((a) => [a.name.toLowerCase(), a]));
  let manualParents = 0;
  for (const [child, parent] of Object.entries(MANUAL_PARENTS)) {
    const c = byName.get(child.toLowerCase());
    if (!c) continue;
    const parentSlug = slugify(parent);
    await db
      .update(schema.activities)
      .set({ parentSlug })
      .where(sql`${schema.activities.id} = ${c.id}`);
    manualParents++;
  }
  console.log(`  set ${manualParents} manual parents`);

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
