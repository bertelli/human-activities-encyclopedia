import postgres from "postgres";

type Entry = {
  id: number;
  description: string;
  tools: string[];
  glossary: [string, string][];
};

const entries: Entry[] = [
  {
    id: 1613,
    description:
      "Jallikattu is a traditional Tamil bull-taming sport held during the Pongal harvest festival. Participants grab onto the hump of a charging native Kangayam or Pulikulam bull and try to hold on over a set distance.",
    tools: [
      "Trained native bull (Kangayam, Pulikulam)",
      "Vadivasal release gate",
      "Marked arena",
      "Judge stand",
      "Protective padding for bulls",
      "Veterinary staff",
      "Team registrations",
    ],
    glossary: [
      ["Vadivasal", "Narrow release gate bulls exit from"],
      ["Hump", "Bull's shoulder hump tamer grabs"],
      ["Tamer", "Participant attempting the hold"],
      ["Distance", "Required hold length for valid run"],
      ["Pongal", "Harvest festival when event is held"],
      ["Native breed", "Indigenous Tamil zebu cattle"],
      ["Regulation", "Modern rules on welfare and technique"],
    ],
  },
  {
    id: 1841,
    description:
      "Jam skating mixes roller skating with dance, street, and breakdance moves to music. Practiced on rinks with hardwood floors, it developed in African-American communities in the 1970s and features spins, slides, and footwork.",
    tools: [
      "Roller skates (quad)",
      "Grippy dance-rated wheels",
      "Toe stops",
      "Comfortable athletic apparel",
      "Rink with hardwood floor",
      "DJ sound system",
      "Knee pads",
    ],
    glossary: [
      ["Jam", "Improvised skating session on dance floor"],
      ["Slide", "Foot slide across the floor"],
      ["Spin", "Rotation on one or both skates"],
      ["Toe stop", "Rubber tip at front for toe-based tricks"],
      ["Footwork", "Intricate step pattern set to music"],
      ["Shuffle", "Low alternating steps resembling footwork"],
      ["Cypher", "Circle of skaters taking turns"],
    ],
  },
  {
    id: 1842,
    description:
      "Janggi is Korean chess played on a 9×10 board with pieces placed on line intersections. Similar to Chinese xiangqi, it features cannon-jumping pieces and a palace where the general must stay.",
    tools: [
      "Janggi board (9×10 intersections)",
      "32 double-sided pieces",
      "Score pad",
      "Chess clock",
      "Cloth mat",
      "Rule card",
      "Carrying bag",
    ],
    glossary: [
      ["General", "King-equivalent confined to palace"],
      ["Cannon", "Piece that jumps one other piece to attack"],
      ["Palace", "3×3 area at each end"],
      ["Horse", "Knight-equivalent moving L-pattern"],
      ["Elephant", "Bishop-like moving with detour"],
      ["Soldier", "Pawn-equivalent"],
      ["Check", "Threat to capture the general"],
    ],
  },
  {
    id: 1843,
    description:
      "Japanese lantern making (chōchin) constructs bamboo-ribbed paper lanterns used for festivals, restaurants, and ceremonies. Traditional craftsmen in Gifu and Kyoto continue centuries-old techniques of glued washi over a collapsible bamboo frame.",
    tools: [
      "Bamboo strips",
      "Washi (Japanese paper)",
      "Wheat-starch paste",
      "Calligraphy ink",
      "Bamboo bending jig",
      "Wooden top and bottom rings",
      "Silk cord for hanging",
    ],
    glossary: [
      ["Chōchin", "Traditional Japanese folding paper lantern"],
      ["Washi", "Mulberry-fiber paper"],
      ["Kanji", "Calligraphic letters painted on lantern"],
      ["Bamboo rib", "Internal spiral frame"],
      ["Hikite", "Handle or pull cord"],
      ["Odawara chōchin", "Regional style from Odawara"],
      ["Gifu chōchin", "Lantern style from Gifu Prefecture"],
    ],
  },
  {
    id: 1315,
    description:
      "Japanese calligraphy (shodō) brushes kanji, hiragana, and katakana characters on paper in expressive black ink strokes. Masters develop personal style across five historical script types (kaisho, gyōsho, sōsho, reisho, tensho).",
    tools: [
      "Fude brush (sheep or goat hair)",
      "Sumi ink stick",
      "Suzuri ink stone",
      "Washi paper",
      "Paperweight (bunchin)",
      "Felt under-mat (shitajiki)",
      "Seal and red ink (hanko)",
    ],
    glossary: [
      ["Shodō", "The way of writing — Japanese calligraphy"],
      ["Kaisho", "Block script, beginner's form"],
      ["Gyōsho", "Semi-cursive script"],
      ["Sōsho", "Cursive grass script"],
      ["Fude", "Calligraphy brush"],
      ["Sumi", "Solid black ink stick ground on suzuri"],
      ["Hanko", "Red seal stamped on finished work"],
    ],
  },
  {
    id: 1844,
    description:
      "A jarrarium is a sealed or semi-sealed small aquascape inside a jar, maintaining a balanced miniature ecosystem of plants, microfauna, and sometimes shrimp. Hobbyists build self-sustaining worlds lasting months or years.",
    tools: [
      "Glass jar with lid (1-10 L)",
      "Active substrate",
      "Small pieces of hardscape (lava rock)",
      "Live aquatic plants (moss, crypts)",
      "Dechlorinated water",
      "Tweezers and scissors",
      "Snails or shrimp (optional)",
    ],
    glossary: [
      ["Self-sustaining", "Ecosystem cycling nutrients without intervention"],
      ["Hardscape", "Stone or wood structure inside jar"],
      ["Dry start", "Growing emersed plants before flooding"],
      ["Microfauna", "Copepods, rotifers, snails living in jar"],
      ["Cycled", "Having established beneficial bacteria"],
      ["Moss wall", "Plant layer forming background"],
      ["Lidded", "Fully sealed with no evaporation"],
    ],
  },
  {
    id: 1845,
    description:
      "Jazzercise is the dance-fitness brand founded by Judi Sheppard Missett in 1969, combining jazz dance, pilates, yoga, and strength training into choreographed classes set to popular music. It pioneered the group fitness industry.",
    tools: [
      "Fitness studio",
      "Mirrored walls",
      "Dance sneakers",
      "Light hand weights",
      "Resistance tubes",
      "Sound system",
      "Instructor certification",
    ],
    glossary: [
      ["Choreography", "Set routine for a track"],
      ["Set", "Sequence of tracks making up a class"],
      ["Warm-up", "Opening low-intensity tracks"],
      ["Strength track", "Resistance-focused segment"],
      ["Cool-down", "Closing stretches"],
      ["Modifier", "Low-impact alternative move"],
      ["Cue", "Verbal direction to next move"],
    ],
  },
  {
    id: 1846,
    description:
      "Jenga stacks 54 wooden blocks into a tower three across, then players take turns removing blocks and placing them on top. The tower grows taller and more unstable until someone topples it.",
    tools: [
      "Standard Jenga block set (54 blocks)",
      "Flat stable table",
      "Timer (tournament)",
      "Level meter (tournament)",
      "Score tally",
      "Carry pouch",
      "Rule variant cards",
    ],
    glossary: [
      ["Block", "One of 54 hardwood rectangular pieces"],
      ["Level", "Horizontal row of three blocks"],
      ["Push", "Tapping a block to check for looseness"],
      ["Top layer", "Uppermost level, must be complete"],
      ["Topple", "Tower fall, ending the game"],
      ["Giant Jenga", "Oversized outdoor version"],
      ["Truth or dare Jenga", "Variant with prompts on blocks"],
    ],
  },
  {
    id: 1678,
    description:
      "Jereed is a Turkish equestrian javelin-throwing sport played between mounted teams on a field. Riders gallop past opponents and throw a blunt wooden stick (jereed) at them; catching or dodging scores points.",
    tools: [
      "Trained horses",
      "Wooden javelins (jereed)",
      "Riding saddle",
      "Riding boots",
      "Team sashes",
      "Field 70-120 m long",
      "Helmet",
    ],
    glossary: [
      ["Jereed", "Blunt wooden stick thrown at opponents"],
      ["Rider", "Mounted participant"],
      ["Catch", "Grabbing thrown jereed in air"],
      ["Throw", "Mounted javelin throw at opponent"],
      ["Team", "Usually 6-12 riders per side"],
      ["Field", "Long rectangular play area"],
      ["Pass", "Gallop by opponent before throw"],
    ],
  },
  {
    id: 1007,
    description:
      "Jet skiing rides personal watercraft (PWC) — stand-up or sit-down — powered by water-jet propulsion. Recreational riders cruise lakes and coasts; freestyle competitors perform barrel rolls, back flips, and surf riding.",
    tools: [
      "Jet ski (Yamaha, Sea-Doo, Kawasaki)",
      "Life vest (USCG-approved)",
      "Wetsuit or shorts",
      "Lanyard safety kill switch",
      "Boat trailer",
      "Marine fuel",
      "Riding gloves",
    ],
    glossary: [
      ["PWC", "Personal watercraft"],
      ["Stand-up", "Small solo craft ridden standing"],
      ["Runabout", "Sit-down PWC for 1-3 riders"],
      ["Impeller", "Water-jet pump propelling the craft"],
      ["Barrel roll", "Freestyle rotation around long axis"],
      ["Wake", "Water trail behind the craft"],
      ["Lanyard", "Safety cord kill switch"],
    ],
  },
  {
    id: 1847,
    description:
      "Jewellery making crafts rings, pendants, earrings, and bracelets from metals, beads, wire, and stones. Techniques span beading, silversmithing, lost-wax casting, enameling, and polymer clay.",
    tools: [
      "Jeweler's bench and pegs",
      "Round and flat-nose pliers",
      "Saw frame and blades",
      "Soldering kit (butane torch)",
      "Pickle pot and tumbler",
      "Mandrels (ring, bracelet)",
      "Beads, wire, and findings",
    ],
    glossary: [
      ["Finding", "Component like clasp, jump ring, ear wire"],
      ["Bezel", "Metal edge setting holding a stone"],
      ["Pickle", "Acid bath cleaning solder after fabrication"],
      ["Gauge", "Thickness of wire (AWG)"],
      ["Patina", "Chemical coloring of metal surface"],
      ["Lost-wax cast", "Casting method with wax original"],
      ["Temper", "Heat treatment affecting metal hardness"],
    ],
  },
  {
    id: 1616,
    description:
      "Jianzi is a Chinese traditional shuttlecock game played like hacky sack, kicking a weighted feathered shuttle to keep it aloft without using hands. Competitive jianzi includes doubles and team net-volley variants.",
    tools: [
      "Weighted feathered shuttlecock",
      "Flat outdoor or gym surface",
      "Soft-soled shoes",
      "Net (for team variant)",
      "Score sheet",
      "Spare shuttles",
      "Rule card",
    ],
    glossary: [
      ["Shuttle", "Feathered weighted projectile"],
      ["Kick", "Instep, inside, or outside foot contact"],
      ["Net form", "Competitive version played over a net"],
      ["Juggle", "Keeping shuttle aloft with one person"],
      ["Rally", "Continuous exchanges between teams"],
      ["Team", "3 players per side in regulation"],
      ["Loss", "Shuttle touching ground scores for opposing side"],
    ],
  },
  {
    id: 1848,
    description:
      "Jockeying rides thoroughbred horses in professional flat, jump, or harness horse races. Professional jockeys maintain extreme weight control, develop race tactics, and build long career relationships with trainers and owners.",
    tools: [
      "Racing saddle (tiny)",
      "Silks (colorful shirt)",
      "Helmet (safety-rated)",
      "Goggles",
      "Whip (regulated)",
      "Light riding boots",
      "Body protector",
    ],
    glossary: [
      ["Gate", "Starting stall at race start"],
      ["Post position", "Starting gate number"],
      ["Furlong", "1/8 of a mile — race distance unit"],
      ["Wire", "Finish line"],
      ["Weight", "Allowance or penalty carried per horse"],
      ["Apprentice", "Junior jockey with weight allowances"],
      ["Close", "Stretch run of the race"],
    ],
  },
  {
    id: 1849,
    description:
      "Jogging runs at a steady, conversational pace for cardiovascular fitness and weight maintenance. Popularized in the 1960s by Arthur Lydiard and Bill Bowerman, it remains the most accessible endurance exercise.",
    tools: [
      "Running shoes",
      "Moisture-wicking shirt",
      "Shorts or tights",
      "Sports watch or smartphone",
      "Water bottle",
      "Running socks",
      "Reflective vest (night)",
    ],
    glossary: [
      ["Conversational pace", "Pace where you can comfortably talk"],
      ["Cadence", "Steps per minute"],
      ["Stride", "Distance per running step"],
      ["Cool-down", "Slow jog/walk after harder effort"],
      ["Zone 2", "Low heart-rate training band"],
      ["Form drill", "Short technique rep like high knees"],
      ["Mileage", "Weekly total distance run"],
    ],
  },
  {
    id: 1850,
    description:
      "Joinery crafts wooden connections — dovetails, mortise-and-tenon, finger joints, box joints — used in furniture and cabinet making. Hand-cut joinery is prized for both strength and craftsmanship signature.",
    tools: [
      "Japanese pull saw or dovetail saw",
      "Sharp chisels (1/4, 1/2, 1 in)",
      "Mallet",
      "Marking gauge and knife",
      "Router and dovetail jig",
      "Block plane",
      "Wood glue",
    ],
    glossary: [
      ["Dovetail", "Wedge-shaped interlocking joint"],
      ["Mortise", "Rectangular cavity receiving a tenon"],
      ["Tenon", "Projecting tongue fitting mortise"],
      ["Pin", "Thinner part of a dovetail joint"],
      ["Tail", "Wider part of a dovetail joint"],
      ["Dry fit", "Assembly without glue for test"],
      ["Scribe line", "Marking knife cut for precise chisel work"],
    ],
  },
  {
    id: 1851,
    description:
      "Jorkyball is a French 2-a-side caged football game played on a tiny enclosed pitch with plexiglass walls. Players use the walls as ricochet surfaces, playing fast 3-minute sets with unlimited rebounds.",
    tools: [
      "Jorkyball pitch (5 × 3 m cage)",
      "Plexiglass walls",
      "Regulation ball",
      "Indoor soccer shoes",
      "Shin guards",
      "Referee",
      "Scoreboard",
    ],
    glossary: [
      ["Cage", "Plexiglass-walled enclosure"],
      ["Wall play", "Ball ricochet used strategically"],
      ["Set", "Period of play (3 minutes or first to goals)"],
      ["Keeper", "One of two players acting as defender"],
      ["Attacker", "Other player leading offense"],
      ["Pitch", "Compact rubber-surfaced court"],
      ["Match", "Best of 3 or 5 sets"],
    ],
  },
  {
    id: 1852,
    description:
      "Jousting is the medieval mounted combat sport reenacted at modern Renaissance festivals and competitive leagues. Armored riders on heavy horses charge at each other down the lists with long lances aiming for the opponent's shield or helm.",
    tools: [
      "Full plate armor",
      "Jousting lance (balsa or solid wood)",
      "Destrier or large warhorse",
      "Heraldic shield",
      "Helm with visor",
      "Lists (wooden barrier)",
      "Saddle with high cantle",
    ],
    glossary: [
      ["Lists", "Wooden barrier separating charging riders"],
      ["Lance", "Long wooden weapon for strikes"],
      ["Break", "Lance shattering on impact, scores high"],
      ["Tilt", "Single pass between competitors"],
      ["Destrier", "Medieval warhorse"],
      ["Vamplate", "Conical guard on lance protecting hand"],
      ["Pass", "Complete charge down the lists"],
    ],
  },
  {
    id: 1853,
    description:
      "Jumping rope swings a rope beneath the feet to skip over, used as cardio warm-up, boxer's training, fitness, or freestyle competition. Speed rope, Double Dutch, and weighted ropes each serve different training goals.",
    tools: [
      "Speed rope (PVC or cable)",
      "Weighted rope (boxing)",
      "Leather rope (classic)",
      "Cushioned floor mat",
      "Timer",
      "Replacement cables",
      "Wrist-strength exercise band",
    ],
    glossary: [
      ["Double-under", "Two rope passes per single jump"],
      ["Cross-over", "Arms crossed mid-jump"],
      ["Boxer step", "Alternating foot shift while jumping"],
      ["Speed rope", "Lightweight rope for maximum RPM"],
      ["Double Dutch", "Two ropes turned in opposite directions"],
      ["Freestyle", "Trick-based competitive form"],
      ["Trip", "Rope catching a foot, interruption"],
    ],
  },
  {
    id: 1854,
    description:
      "Junk art collects discarded materials — bottle caps, scrap metal, broken toys, found wood — and assembles them into sculpture, wall art, or mixed-media pieces. Thurston Moore, El Anatsui, and Nek Chand exemplify the genre.",
    tools: [
      "Collected junk inventory",
      "Welding torch (metal sculpture)",
      "E6000 adhesive",
      "Power drill and screws",
      "Hot glue gun",
      "Spray primer",
      "Dust mask and gloves",
    ],
    glossary: [
      ["Scavenge", "Finding discarded materials"],
      ["Patina", "Aged surface preserved or enhanced"],
      ["Assemblage", "3D composition of objects"],
      ["Repurpose", "New use for item beyond original"],
      ["Weld", "Metal-to-metal fusion via torch"],
      ["Junkyard", "Key source for raw material"],
      ["Found object", "Pre-existing item used without alteration"],
    ],
  },
  {
    id: 1871,
    description:
      "K-pop music is Korean popular music emphasizing synchronized choreography, production values, and idol groups signed to major agencies (HYBE, SM, JYP, YG). Global fandom developed through social media since the mid-2010s.",
    tools: [
      "Audio interface and DAW",
      "MIDI keyboard",
      "Vocal microphone",
      "Dance studio mirror",
      "Choreography recording camera",
      "Producer's sample library",
      "Stage-ready sound system",
    ],
    glossary: [
      ["Idol", "Professional K-pop performer"],
      ["Trainee", "Pre-debut agency-developed performer"],
      ["Bias", "Favorite member within a group"],
      ["Comeback", "New album release and promotional cycle"],
      ["Fandom", "Organized fan group with official name"],
      ["Hook", "Most memorable melodic phrase"],
      ["Stage name", "Performance pseudonym"],
    ],
  },
  {
    id: 1855,
    description:
      "Kajukenbo is a hybrid martial art founded in Hawaii in 1947 blending karate, judo, jujitsu, kenpo, and Chinese boxing. It emphasizes practical street self-defense and aggressive combinations against multiple attackers.",
    tools: [
      "Gi (uniform)",
      "Belt (rank-colored)",
      "Sparring gloves",
      "Shin pads",
      "Mouthguard",
      "Mat",
      "Focus pads",
    ],
    glossary: [
      ["Emperado", "Adriano Emperado, founder"],
      ["Kumite", "Sparring"],
      ["Forms", "Choreographed solo patterns"],
      ["Self-defense", "Scenario-based drill"],
      ["Sifu", "Teacher/master"],
      ["Black belt", "Advanced rank with further degrees"],
      ["Chinese boxing", "Kung-fu component of the blend"],
    ],
  },
  {
    id: 1856,
    description:
      "The kamancheh is a Persian bowed string instrument with a spherical gourd soundbox and long fingerboard. Held vertically and played with a horsehair bow, it's central to Persian classical music.",
    tools: [
      "Kamancheh (gourd body, long neck)",
      "Horsehair bow",
      "Rosin",
      "Spare strings (gut or synthetic)",
      "Soft case",
      "Fingerboard polish",
      "Pitch pipe or tuner",
    ],
    glossary: [
      ["Spike", "Metal pin at base resting on floor"],
      ["Dastgah", "Persian modal system for melodic structure"],
      ["Bow hair", "Horsehair strung across frog to tip"],
      ["Gushe", "Melodic motif within a dastgah"],
      ["Fingerboard", "Unfretted neck surface"],
      ["Soundbox", "Gourd resonating chamber"],
      ["Radif", "Traditional repertoire of melodic types"],
    ],
  },
  {
    id: 1614,
    description:
      "Kambala is a traditional Indian buffalo race held in muddy paddy fields of coastal Karnataka during Pongal and post-harvest festivals. Jockeys drive paired buffalos through waterlogged tracks at high speed.",
    tools: [
      "Pair of racing buffalos",
      "Plow-yoke connecting buffalos",
      "Muddy paddy track (140 m)",
      "Starting gate",
      "Timing system",
      "Jockey protective gear",
      "Veterinary staff",
    ],
    glossary: [
      ["Joti", "Paired buffalos yoked together"],
      ["Track", "Muddy paddy field run"],
      ["Kaane Halage", "Race category measuring splash height"],
      ["Hagga", "Race category with rope between horns"],
      ["Jockey", "Racer controlling the buffalos"],
      ["Splash", "Mud kicked up by galloping animals"],
      ["Pongal", "Harvest festival season for races"],
    ],
  },
  {
    id: 1594,
    description:
      "Kancha is an Indian marbles game played on the ground with glass or clay marbles. Players flick marbles at targets drawn on dirt, aiming to hit opponent marbles or land nearest a target line.",
    tools: [
      "Set of glass kancha marbles",
      "Flat dirt or concrete surface",
      "Chalk for drawing",
      "Cloth pouch",
      "Target circle",
      "Score tally",
      "Rule card",
    ],
    glossary: [
      ["Kancha", "Marble piece"],
      ["Flick", "Thumb-powered shooting motion"],
      ["Circle", "Target ring drawn on ground"],
      ["Hit", "Striking opponent's marble"],
      ["Kept", "Winning marble transfers to winner"],
      ["Line", "Straight-line target variant"],
      ["Knuckle down", "Position with fist on ground for stability"],
    ],
  },
  {
    id: 1857,
    description:
      "The kanjira is a small South Indian frame drum with a single lizard-skin head and jingling rings. Played in Carnatic classical percussion ensembles and Konnakol vocal percussion.",
    tools: [
      "Kanjira drum (jackwood frame, skin head)",
      "Water spray bottle for tuning",
      "Talcum powder for grip",
      "Practice pad",
      "Spare skin",
      "Mridangam reference for ensemble",
      "Konnakol tongue drills",
    ],
    glossary: [
      ["Kanjira", "Small frame drum of South India"],
      ["Skin tension", "Adjusted via water for pitch"],
      ["Tala", "Rhythmic cycle in Carnatic music"],
      ["Konnakol", "Vocal recitation of rhythmic phrases"],
      ["Mridangam", "Main Carnatic percussion companion"],
      ["Jingle ring", "Metal disk on frame producing shimmer"],
      ["Finger roll", "Rapid finger-tip roll on skin"],
    ],
  },
  {
    id: 1858,
    description:
      "Kanzashi is traditional Japanese fabric flower craft creating hair ornaments from folded silk or cotton squares. Each petal is folded individually, then glued onto a base to build chrysanthemums, cherry blossoms, or plum flowers.",
    tools: [
      "Silk or cotton squares",
      "Tweezers",
      "Sharp scissors",
      "Fabric glue or starch",
      "Hair comb or pin base",
      "Cardboard discs for backing",
      "Iron",
    ],
    glossary: [
      ["Tsumami", "Traditional fold technique (pinch)"],
      ["Petal", "Single folded square"],
      ["Chrysanthemum", "Classic multi-layer kanzashi flower"],
      ["Base", "Cardboard or felt disk petals attach to"],
      ["Shibori", "Dyed fabric used for petal material"],
      ["Maiko", "Apprentice geiko wearing kanzashi seasonally"],
      ["Seasonal motif", "Flower varying by month"],
    ],
  },
  {
    id: 1859,
    description:
      "Karaoke sings along to recorded backing tracks with lyrics displayed on screen. Originating in Japan in the 1970s, it's now a global entertainment form in bars, private rooms (karaoke box), and at home apps.",
    tools: [
      "Karaoke machine or app",
      "Microphone (wired or wireless)",
      "TV or projector screen",
      "Speakers/amplifier",
      "Songbook or digital catalog",
      "Beverage refresher",
      "Stage lighting (optional)",
    ],
    glossary: [
      ["Karaoke box", "Private room rented for karaoke"],
      ["Backing track", "Instrumental version of a song"],
      ["Lyric sync", "On-screen highlighted text in time"],
      ["Duet", "Two-voice performance"],
      ["Key change", "Transposing track up/down"],
      ["Encore", "Additional song requested by crowd"],
      ["Scorer", "Machine's attempted skill ranking"],
    ],
  },
  {
    id: 1860,
    description:
      "Kart racing drives open-wheel karts on short asphalt or dirt tracks. It's the feeder series to Formula 1 and the most accessible motorsport for amateurs, with arrive-and-drive facilities worldwide.",
    tools: [
      "Racing kart (rental or owned)",
      "Helmet with visor",
      "Racing suit",
      "Gloves and karting boots",
      "Rib protector",
      "Transponder (race timing)",
      "Neck collar",
    ],
    glossary: [
      ["Kart", "Open-wheel racing chassis"],
      ["Qualifying", "Time trial for grid position"],
      ["Racing line", "Optimal path through a corner"],
      ["Apex", "Innermost point of a corner"],
      ["Draft", "Slipstreaming another kart"],
      ["Kerb", "Raised curb at corner inside"],
      ["Chicane", "Sequence of tight turns"],
    ],
  },
  {
    id: 1627,
    description:
      "Karuta is the speed version of Hyakunin Isshu played by athletes racing to swat the correct card from 50 displayed tori-fuda after hearing the first lines of a classical Japanese waka poem read aloud.",
    tools: [
      "Competition karuta set (100 cards)",
      "Tatami playing mat",
      "Official reader (yomi-te)",
      "Scorer",
      "Timer",
      "Training drills",
      "Referee",
    ],
    glossary: [
      ["Yomi-fuda", "Reader card with full poem"],
      ["Tori-fuda", "Grabbing card with second half only"],
      ["Kimariji", "Minimum syllables needed to identify poem"],
      ["Swat", "Fast swiping motion to claim a card"],
      ["Send", "Penalty card passed when grabbing wrong one"],
      ["Meijin", "Highest male title holder"],
      ["Queen", "Highest female title holder"],
    ],
  },
  {
    id: 1861,
    description:
      "Kendo is modern Japanese fencing using bamboo swords (shinai) and protective armor (bōgu). Derived from samurai swordsmanship, it emphasizes spirit, posture, and precise strikes at target zones scored by three judges.",
    tools: [
      "Shinai (bamboo sword)",
      "Bokken (wooden sword for kata)",
      "Bōgu armor (men, do, kote, tare)",
      "Gi and hakama uniform",
      "Towel (tenugui)",
      "Rule book",
      "Scoring flags",
    ],
    glossary: [
      ["Shinai", "Bamboo practice sword"],
      ["Men", "Head target and helmet"],
      ["Dō", "Torso target and armor"],
      ["Kote", "Wrist target and gauntlets"],
      ["Tsuki", "Throat thrust, advanced strike"],
      ["Kiai", "Loud spirited shout"],
      ["Ippon", "Valid scoring strike"],
    ],
  },
];

(async () => {
  const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });
  let ok = 0;
  for (const e of entries) {
    await sql.begin(async (tx) => {
      await tx`UPDATE activities SET description=${e.description} WHERE id=${e.id}`;
      await tx`DELETE FROM tools WHERE activity_id=${e.id}`;
      for (let i = 0; i < e.tools.length; i++) {
        await tx`INSERT INTO tools (activity_id, name, position) VALUES (${e.id}, ${e.tools[i]}, ${i})`;
      }
      await tx`DELETE FROM glossary_terms WHERE activity_id=${e.id}`;
      for (let i = 0; i < e.glossary.length; i++) {
        const [term, def] = e.glossary[i];
        await tx`INSERT INTO glossary_terms (activity_id, term, definition, position) VALUES (${e.id}, ${term}, ${def}, ${i})`;
      }
    });
    ok++;
  }
  console.log(`Filled ${ok} activities.`);
  await sql.end();
})();
