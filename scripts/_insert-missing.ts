import postgres from "postgres";
import { slugify } from "../src/lib/slug";

const missing = `Home Security
Home Theatre
Homing Pigeons
Hookah (Shisha) Smoking
Hooverball
Horse Riding
Horse Shoe (Art/Making)
Hot Air Ballooning
Hot Tub Games
Hydroplane
Ice Blocking
Ice Diving
Ice Skating
Icosathlon
Igloo Building
Illusion Art
Illustration Art
Improvisational Theater (Improv)
Indoor Hobbies
Indoor Sports
Interior design
Inventing
Investing
Invisible Ink (Art/Tattoos)
Jacuzzi Games
Jal Tarang
Jam Skating
Janggi (Korean Chess)
Japanese Lantern Making
Jarrarium
Jazzercise
Jenga
Jewellry Making
Jockeying
Jogging
Joinery
Jorkyball
Jousting
Jumping Rope
Junk (Art/Collection)
Kajukenbo
Kamancheh
Kanjira Playing
Kanzashi Art
Karaoke
Kart Racing
Kendo
Kenpo
Keyboard Playing
Kicksled
Kinetic Sculptures
Kites (Making or Flying)
Kizomba Dancing
Klezmer Music
Kneeboarding
Knot Tying (Knotting)
K-Pop Music
Lacemaking
Landscaping
Lapidary
Laser Tag
Lasso Throwing
Latte Art
Lawn Care
Lawn Sports
Leaf (Art/Collecting)
Letterboxing
Lightshow
Limo Riding
Listening to Music
Lithography
Livestreaming
Log Rolling
Machining
Macramé
Magic Tricks
Magnet Art
Makeup Art
Mall Visiting
Mandala
Mandolin Playing
Marble (Playing/Collecting)
Marble Art
Marching
Marimba
Marionette
Marksmanship
Mask (Making/Collecting)
Masquerade Parties
Massaging
Matchstick Models
Mechanics
Medieval (Art/Re-enactment)
Memorabilia Collecting
Metallurgy
Metaverse
Meteorology
Microscopy
Miming
Mineral Collecting
Miniature Art
Mixed Martial Arts (MMA)
Mixology
Model Making
Monster Truck Racing
Mooing
Motocross
Motorcycles (Racing/Restoration)
Mountain Climbing
Movies (Watching/Making)
Muraling
Museum Visiting
Music Album Collecting
NASCAR Racing
Necklace (Making/Collecting)
Needlepoint
Needlework
Nerts
Ninja Warrior
Ninjutsu
Numismatics
Oboe Playing
Observatory
Oceanography
Offroading
Online Activities
Opal Art
Opera (Listening or Singing)
Orchestra
Orchid Growing
Organ Playing
Organic Farming
Organizing
Ornithology
Ouija Board
Outdoor Activities
Paddle Boarding
Paddle Ball
Pageants Attending
Paludarium
Paper Crafts
Papier Mache
Parachuting
Parades Attending
Park Visiting
Partying
Pen Pal
Penmanship
People Watching
Performance Arts
Pet (Sitting/Grooming)
Petting Zoo
Philately (Stamp Collecting)
Piano Playing
Picnicking
Piercing Arts
Piloting
Ping Pong (Table Tennis)
Pipe (Making/Smoking)
Planespotting
Planetarium
Plastic Art
Playdough Modelling
Pole Climbing
Pontoon Boats
Power Lifting
Prepping
Pub Crawling
Pumpkin Art
Pyrotechnics
Qawwali
Qianball
Quad Biking
Quadcopter Flying
Quadrathlon
Quadruplane Models
Quail Keeping
Quartz Collecting
Quatrefoil
Quickstep Dancing
Quidditch
Quiz Games
Quoits
Rapping
RC-Remote Control
Roller Blading
Recreational Vehicles (RV)
Reggae Music
Relaxing
Rockets (Amateur Rocketry)
Recycling
Recycle Art
Road Trips
Roller Coasters
Relay Sports
Rogaining
Safari
Sake Tasting
Samba
Sand Art (Sand Castles)
Saxophone
Scale Models
Scavenger Hunt
Scootering
Scouting
Sculling (Rowing)
Seashells (Art/Collecting)
Seawalking
Shooting
Shopping
Shuffleboard
Skeet Shooting
Skijoring
Skipping Rope
Slingshot
Sneaker Collecting
Snorkelling
Snuba diving
Social Media
Socializing`
  .split("\n").map(s => s.trim()).filter(Boolean);

// Category names → will resolve IDs at runtime
type Cat =
  | "Sports"
  | "Games"
  | "Music"
  | "Arts & Crafts"
  | "Collecting"
  | "Food & Drink"
  | "Performance"
  | "Writing"
  | "Photography"
  | "Nature & Science"
  | "Mind & Spirit"
  | "Technology & Making";

function categorize(name: string): Cat {
  const n = name.toLowerCase();
  const has = (w: string) => n.includes(w);

  // Music instruments / styles
  if (has("playing") && (has("jal") || has("kanjira") || has("kamancheh") ||
      has("mandolin") || has("keyboard") || has("oboe") || has("organ") ||
      has("piano") || has("marimba")) ) return "Music";
  if (has("saxophone") || has("orchestra") || has("opera") ||
      has("karaoke") || has("klezmer") || has("k-pop") || has("reggae") ||
      has("qawwali") || has("rapping") || has("samba") || has("listening to music") ||
      has("music album") || has("marching")) return "Music";

  // Collecting
  if (has("collecting") || has("memorabilia") || has("numismatics") ||
      has("philately") || has("mineral") || has("sneaker collecting") ||
      has("quartz collecting")) return "Collecting";

  // Arts/crafts
  if (has("art") || has("painting") || has("lantern making") || has("macramé") ||
      has("macrame") || has("mandala") || has("mural") || has("illustration") ||
      has("illusion art") || has("kinetic sculptures") || has("kanzashi") ||
      has("lacemaking") || has("knot tying") || has("papier") || has("paper craft") ||
      has("origami") || has("needle") || has("scrap") || has("sand art") ||
      has("miniature") || has("makeup art") || has("model making") || has("matchstick") ||
      has("scale models") || has("quadruplane models") || has("jewellry") ||
      has("lithography") || has("letterboxing") || has("magic trick") ||
      has("playdough") || has("pumpkin art") || has("seashells (art")) return "Arts & Crafts";

  // Performance / dance / theater
  if (has("dancing") || has("jazzercise") || has("karaoke") || has("masquerade") ||
      has("miming") || has("marionette") || has("puppet") || has("magic trick") ||
      has("improvisational theater") || has("improv") || has("mooing") ||
      has("performance arts") || has("pageants") || has("clowning") ||
      has("lightshow") || has("quickstep")) return "Performance";

  // Food & drink
  if (has("latte") || has("pub crawl") || has("sake") || has("mixology") ||
      has("picnick") || has("jam skating") === false && has("jam ") ||
      has("hookah") || has("pipe (making/smoking)")) return "Food & Drink";

  // Games
  if (has("janggi") || has("jenga") || has("laser tag") || has("quidditch") ||
      has("quiz games") || has("quoits") || has("marbles") || has("marble (playing") ||
      has("ouija") || has("paintball") || has("jorkyball") || has("qianball") ||
      has("hooverball") || has("hot tub games") || has("jacuzzi games") ||
      has("indoor sports") || has("online activities")) return "Games";

  // Nature & Science
  if (has("ornithology") || has("meteorology") || has("microscopy") ||
      has("oceanography") || has("observatory") || has("planetarium") ||
      has("organic farming") || has("orchid") || has("horse") || has("homing pigeon") ||
      has("quail keeping") || has("petting zoo")) return "Nature & Science";

  // Writing
  if (has("pen pal") || has("penmanship") || has("letterboxing")) return "Writing";

  // Tech & Making
  if (has("inventing") || has("investing") || has("rc-remote") || has("quadcopter") ||
      has("raspberry") || has("rockets") || has("recycling") || has("recycle art") ||
      has("metaverse") || has("machining") || has("joinery") || has("metallurgy") ||
      has("home security") || has("home theatre") || has("interior design") ||
      has("landscaping") || has("lawn care") || has("mechanics") || has("livestream") ||
      has("social media") || has("jewellry")) return "Technology & Making";

  // Mind & Spirit
  if (has("relaxing") || has("organizing") || has("feng") || has("meditation") ||
      has("mandala")) return "Mind & Spirit";

  // Default: Sports (covers most remaining: racing, skating, climbing, athlon, etc.)
  return "Sports";
}

function makeDescription(): string {
  return "This activity's tools and glossary are still being curated. Contributions welcome — see the project README.";
}

(async () => {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  const cats = await sql<{ id: number; name: string }[]>`SELECT id, name FROM categories`;
  const catMap = new Map(cats.map(c => [c.name, c.id]));

  // Ensure all target categories exist
  for (const need of ["Arts & Crafts","Collecting","Food & Drink","Games","Mind & Spirit",
                      "Music","Nature & Science","Performance","Photography","Sports",
                      "Technology & Making","Writing"]) {
    if (!catMap.has(need)) throw new Error(`Missing category: ${need}`);
  }

  const existingSlugs = new Set(
    (await sql<{ slug: string }[]>`SELECT slug FROM activities`).map(r => r.slug)
  );

  let inserted = 0, skipped = 0;
  for (const name of missing) {
    const slug = slugify(name);
    if (existingSlugs.has(slug)) { skipped++; continue; }
    const cat = categorize(name);
    const catId = catMap.get(cat)!;
    await sql`
      INSERT INTO activities (name, slug, icon, description, category_id, parent_slug)
      VALUES (${name}, ${slug}, '', ${makeDescription()}, ${catId}, NULL)
      ON CONFLICT DO NOTHING
    `;
    existingSlugs.add(slug);
    inserted++;
  }

  console.log(`Inserted: ${inserted}`);
  console.log(`Skipped (slug collision): ${skipped}`);
  await sql.end();
})();
