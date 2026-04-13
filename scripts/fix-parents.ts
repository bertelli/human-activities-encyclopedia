import { sql } from "drizzle-orm";
import { db, schema } from "../src/db";
import { slugify } from "../src/lib/slug";

// Known bad or ambiguous substring matches we never want as auto-parents.
const BANNED_PARENTS = new Set(
  [
    "Boxing",
    "Go",
    "Cricket",
    "Hockey",
    "Stamps",
    "Coins",
    "Art",
    "Arts",
    "Dance",
    "Music",
    "Running",
    "Swimming",
    "Cycling",
    "Skiing",
    "Fishing",
    "Climbing",
    "Collecting",
  ].map((s) => s.toLowerCase())
);

// Explicit parents we DO want (override auto-detection).
const MANUAL_PARENTS: Record<string, string> = {
  "Alpine Skiing": "Skiing",
  "Cross-Country Skiing": "Skiing",
  "Ski Jumping": "Skiing",
  "Freestyle Skiing": "Skiing",
  "Water Skiing": "Skiing",
  "Road Cycling": "Cycling",
  "Mountain Biking": "Cycling",
  "Gravel Cycling": "Cycling",
  "Track Cycling": "Cycling",
  "Cyclocross": "Cycling",
  "BMX": "Cycling",
  "Fixed Gear Cycling": "Cycling",
  "Tandem Cycling": "Cycling",
  "Recumbent Cycling": "Cycling",
  "Bike Touring": "Cycling",
  "Open Water Swimming": "Swimming",
  "Synchronized Swimming": "Swimming",
  "Carp Fishing": "Fishing",
  "Bass Fishing": "Fishing",
  "Fly Fishing": "Fishing",
  "Ice Fishing": "Fishing",
  "Surf Fishing": "Fishing",
  "Kayak Fishing": "Fishing",
  "Rock Climbing": "Climbing",
  "Ice Climbing": "Climbing",
  "Tree Climbing": "Climbing",
  "Long Distance Running": "Running",
  "Trail Running": "Running",
  "Ultramarathon": "Running",
  "Marathon": "Running",
  "Sprinting": "Running",
  "Race Walking": "Running",
  "Racewalking": "Running",
  "Hurdling": "Running",
  "360 Photography": "Photography",
  "Aerial Photography": "Photography",
  "Drone Photography": "Photography",
  "Underwater Photography": "Photography",
  "Astrophotography": "Photography",
  "Film Photography": "Photography",
  "Portrait Photography": "Photography",
  "Wedding Photography": "Photography",
  "Newborn Photography": "Photography",
  "Boudoir Photography": "Photography",
  "Street Photography": "Photography",
  "Documentary Photography": "Photography",
  "Photojournalism": "Photography",
  "Travel Photography": "Photography",
  "Landscape Photography": "Photography",
  "Cityscape Photography": "Photography",
  "Architecture Photography": "Photography",
  "Interior Photography": "Photography",
  "Real Estate Photography": "Photography",
  "Food Photography": "Photography",
  "Product Photography": "Photography",
  "Commercial Photography": "Photography",
  "Advertising Photography": "Photography",
  "Fashion Photography": "Photography",
  "Beauty Photography": "Photography",
  "Sports Photography": "Photography",
  "Wildlife Photography": "Photography",
  "Bird Photography": "Photography",
  "Macro Photography": "Photography",
  "Flower Photography": "Photography",
  "Nightscape Photography": "Photography",
  "Long Exposure Photography": "Photography",
  "Infrared Photography": "Photography",
  "Black And White Photography": "Photography",
  "Lomography": "Photography",
  "Toy Camera Photography": "Photography",
  "Pinhole Photography": "Photography",
  "Cyanotype Photography": "Photography",
  "Alternative Process Photography": "Photography",
  "Large Format Photography": "Photography",
  "Medium Format Photography": "Photography",
  "Stereo Photography": "Photography",
  "Light Painting": "Photography",
  "Double Exposure": "Photography",
};

function normalizeKey(s: string) {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

async function main() {
  const activities = await db
    .select({
      id: schema.activities.id,
      name: schema.activities.name,
      slug: schema.activities.slug,
    })
    .from(schema.activities);

  const bySlug = new Map(activities.map((a) => [a.slug, a]));
  const byName = new Map(activities.map((a) => [normalizeKey(a.name), a]));

  // Clear all parents first.
  await db.execute(sql`UPDATE activities SET parent_slug = NULL`);

  let autoSet = 0;
  let manualSet = 0;

  // Auto-detect with strict word-boundary matching.
  const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const activitiesLower = activities.map((a) => ({
    ...a,
    nameLc: normalizeKey(a.name),
  }));

  for (const a of activitiesLower) {
    const candidates = activitiesLower.filter((p) => {
      if (p.id === a.id) return false;
      if (p.nameLc.length >= a.nameLc.length) return false;
      if (BANNED_PARENTS.has(p.nameLc)) return false;
      if (p.nameLc.length < 4) return false;
      const re = new RegExp(`\\b${escape(p.nameLc)}\\b`, "i");
      return re.test(a.name);
    });
    if (candidates.length === 0) continue;
    candidates.sort((x, y) => y.nameLc.length - x.nameLc.length);
    const parent = candidates[0];
    await db.execute(
      sql`UPDATE activities SET parent_slug = ${parent.slug} WHERE id = ${a.id}`
    );
    autoSet++;
  }

  // Apply manual overrides last so they win.
  for (const [childName, parentName] of Object.entries(MANUAL_PARENTS)) {
    const child = byName.get(normalizeKey(childName));
    const parent = byName.get(normalizeKey(parentName));
    if (!child || !parent) continue;
    await db.execute(
      sql`UPDATE activities SET parent_slug = ${parent.slug} WHERE id = ${child.id}`
    );
    manualSet++;
  }

  // Safety: ensure no activity lists itself as parent.
  await db.execute(sql`
    UPDATE activities SET parent_slug = NULL WHERE parent_slug = slug
  `);

  console.log(`Auto-assigned parents: ${autoSet}`);
  console.log(`Manual overrides applied: ${manualSet}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
