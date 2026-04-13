// Hand-curated tools & glossary content.
// Keys are lowercased activity names. Falls back to categoryDefaults by keyword match.

export type Content = {
  icon: string;
  tools: string[];
  glossary: Array<[string, string]>;
};

export const SPECIFIC: Record<string, Content> = {
  "photography": {
    icon: "",
    tools: ["DSLR or mirrorless camera", "Prime and zoom lenses", "Tripod", "External flash", "Memory cards", "Camera bag", "Lens filters (UV, polarizer, ND)", "Editing software (Lightroom, Capture One)"],
    glossary: [
      ["Aperture", "Lens opening controlling light and depth of field, measured in f-stops"],
      ["ISO", "Sensor sensitivity to light; higher ISO brightens but adds noise"],
      ["Shutter speed", "Duration the sensor is exposed; controls motion blur"],
      ["Bokeh", "Quality of out-of-focus areas, typically smooth and pleasing"],
      ["Exposure triangle", "Balance of aperture, shutter speed, and ISO"],
      ["RAW", "Unprocessed sensor data preserving maximum editing latitude"],
      ["Golden hour", "First/last hour of daylight with warm, soft light"],
      ["Rule of thirds", "Composition grid placing subjects along intersection lines"],
    ],
  },
  "360 photography": {
    icon: "",
    tools: ["360 camera (Insta360, GoPro Max)", "Monopod or invisible selfie stick", "Tripod with nadir cap", "Stitching software", "VR headset for review", "Neutral density filters"],
    glossary: [
      ["Equirectangular", "Flat projection of a spherical panorama, 2:1 ratio"],
      ["Nadir", "Point directly below the camera; often hidden or patched"],
      ["Zenith", "Point directly above the camera"],
      ["Stitching", "Joining overlapping images into a seamless sphere"],
      ["Parallax", "Misalignment from camera lenses at different positions"],
      ["Little planet", "Stereographic projection making a 360 image look like a tiny world"],
    ],
  },
  "astrophotography": {
    icon: "",
    tools: ["Tracking equatorial mount", "Telescope or astrograph", "Dedicated astro camera or modified DSLR", "Autoguider", "Light pollution filter", "Intervalometer", "Dew heater", "PixInsight or Siril for processing"],
    glossary: [
      ["Integration time", "Total exposure from stacking many subs"],
      ["Sub", "A single exposure in a stacked set"],
      ["Dark frame", "Calibration frame capturing sensor noise"],
      ["Flat frame", "Calibration shot capturing vignetting and dust"],
      ["Polar alignment", "Aligning mount axis with celestial pole for tracking"],
      ["Bortle scale", "1-9 rating of night sky darkness"],
      ["Narrowband", "Imaging with filters isolating emission lines (Ha, OIII, SII)"],
    ],
  },
  "film photography": {
    icon: "",
    tools: ["35mm or medium format camera", "Film rolls (color, B&W, slide)", "Light meter", "Developing tank", "Chemistry (developer, stop, fixer)", "Film scanner", "Changing bag"],
    glossary: [
      ["Latitude", "Film's tolerance for over/underexposure"],
      ["Push/pull", "Developing film as if exposed at different ISO"],
      ["Grain", "Silver halide texture inherent to film"],
      ["C-41", "Standard color negative development process"],
      ["E-6", "Slide film development process"],
      ["Contact sheet", "Print of all frames at negative size for review"],
    ],
  },

  "skiing": {
    icon: "",
    tools: ["Skis", "Ski boots", "Ski poles", "Helmet", "Goggles", "Gloves", "Base layers and insulated jacket", "Wax and scrapers for tuning"],
    glossary: [
      ["Carving", "Turning on the edges with minimal sideways slip"],
      ["Edging", "Angling the ski to grip the snow"],
      ["Fall line", "Steepest straight path down a slope"],
      ["Piste", "Groomed marked ski run"],
      ["Off-piste", "Ungroomed snow beyond marked runs"],
      ["Mogul", "Bump formed on a slope from turning traffic"],
      ["Camber", "Upward curve under the middle of a ski when unweighted"],
      ["Rocker", "Reverse camber; tip/tail raised for float in powder"],
    ],
  },
  "alpine skiing": {
    icon: "",
    tools: ["Alpine skis", "Stiff alpine boots", "Bindings with DIN release", "Helmet", "Goggles", "Race suit (for slalom)", "Ski wax"],
    glossary: [
      ["Slalom", "Short-turn race between closely-spaced gates"],
      ["Giant slalom", "Longer radius turns on a steeper course"],
      ["Super-G", "Super giant slalom, higher speed, fewer gates"],
      ["Downhill", "Fastest alpine discipline with long straight sections"],
      ["DIN", "Release setting on bindings based on weight and ability"],
      ["Hard pack", "Dense compressed snow surface"],
    ],
  },
  "cross-country skiing": {
    icon: "",
    tools: ["XC skis (classic or skate)", "XC boots", "Poles sized to the discipline", "Grip wax or skins", "Glide wax", "Layered breathable clothing"],
    glossary: [
      ["Diagonal stride", "Classic technique kicking and gliding alternately"],
      ["Skate skiing", "V-pushing technique on groomed skate lanes"],
      ["Kick zone", "Middle ski section gripping the snow"],
      ["Herringbone", "Climbing technique with splayed tips"],
      ["Klister", "Sticky grip wax for warm wet snow"],
    ],
  },
  "ski jumping": {
    icon: "",
    tools: ["Long specialized jumping skis", "Flexible jumping boots", "Aerodynamic suit", "Helmet", "Goggles", "Wax"],
    glossary: [
      ["K-point", "Construction point of a hill (target landing zone)"],
      ["Hill size", "Total maximum safe jumping distance"],
      ["In-run", "Acceleration ramp before the takeoff"],
      ["Telemark landing", "Required landing posture with one ski forward"],
      ["V-style", "Modern airborne ski position forming a V"],
    ],
  },
  "freestyle skiing": {
    icon: "",
    tools: ["Twin-tip freestyle skis", "Softer freestyle boots", "Helmet with freestyle certification", "Impact shorts", "Park-specific wax"],
    glossary: [
      ["Moguls", "Bumps course with two aerial jumps"],
      ["Halfpipe", "U-shaped snow ramp for aerial tricks"],
      ["Slopestyle", "Course with jumps, rails, and features"],
      ["Aerials", "Dedicated jumping event with flips and twists"],
      ["Switch", "Skiing or landing backward"],
    ],
  },
  "snowboarding": {
    icon: "",
    tools: ["Snowboard", "Snowboard boots", "Bindings", "Helmet", "Goggles", "Wrist guards", "Base layers and shell"],
    glossary: [
      ["Goofy", "Stance with right foot forward"],
      ["Regular", "Stance with left foot forward"],
      ["Heelside/Toeside", "Edges corresponding to heels and toes"],
      ["Switch", "Riding the opposite of natural stance"],
      ["Ollie", "Jumping by loading and releasing the tail"],
      ["Cambered/Reverse/Flat", "Board profiles affecting pop and float"],
    ],
  },

  "chess": {
    icon: "",
    tools: ["Chess set (pieces and board)", "Chess clock", "Scorebook or notation pad", "Opening and endgame books", "Chess engine (Stockfish)", "Online platform account (Lichess, Chess.com)"],
    glossary: [
      ["Fork", "One piece attacking two or more at once"],
      ["Pin", "Line-piece attack restricting a piece shielding a more valuable one"],
      ["Skewer", "Reverse pin; valuable piece forced to move exposing lesser one"],
      ["Zugzwang", "Position where any move worsens one's own stance"],
      ["En passant", "Pawn capture of a pawn that advanced two squares past it"],
      ["Castling", "King-rook swap move protecting the king"],
      ["Elo", "Rating system measuring relative strength"],
      ["Tempo", "Unit of initiative, gained by forcing the opponent's hand"],
    ],
  },
  "go": {
    icon: "",
    tools: ["19x19 Go board (goban)", "Black and white stones", "Stone bowls", "Timer/clock", "Joseki reference", "Game record sheets"],
    glossary: [
      ["Liberty", "Empty adjacent intersection of a stone or group"],
      ["Ko", "Repetition rule preventing immediate recapture"],
      ["Joseki", "Established corner sequence"],
      ["Atari", "Group with one liberty left"],
      ["Sente", "Initiative; forcing move the opponent must answer"],
      ["Dan/Kyu", "Ranking system; dan higher, kyu lower"],
      ["Territory", "Empty points controlled by one color"],
    ],
  },
  "poker": {
    icon: "",
    tools: ["Standard 52-card deck", "Poker chips", "Chip tray", "Dealer button", "Timer for blinds", "Cut cards"],
    glossary: [
      ["Pot odds", "Ratio of pot size to call cost"],
      ["Equity", "Chance of winning given current hand"],
      ["Bluff", "Betting with weak hand to induce a fold"],
      ["Tilt", "Emotional state leading to poor play"],
      ["Range", "Set of hands a player might hold"],
      ["Position", "Acting later relative to opponents, an advantage"],
      ["Out", "Card that improves your hand to likely winner"],
    ],
  },

  "running": {
    icon: "",
    tools: ["Running shoes", "Moisture-wicking apparel", "GPS watch or phone app", "Heart rate monitor", "Foam roller", "Hydration belt or vest"],
    glossary: [
      ["Cadence", "Steps per minute"],
      ["Tempo run", "Comfortably-hard sustained pace workout"],
      ["Negative split", "Second half of a run faster than the first"],
      ["Fartlek", "Unstructured speed play mixed with easy running"],
      ["VO2 max", "Maximum oxygen uptake rate"],
      ["Strides", "Short accelerations to build neuromuscular speed"],
    ],
  },
  "cycling": {
    icon: "",
    tools: ["Road or gravel bicycle", "Helmet", "Cycling shoes and cleats", "Bib shorts and jersey", "Water bottles", "Bike computer/GPS", "Tools: multi-tool, pump, spare tube"],
    glossary: [
      ["Peloton", "Main group of cyclists in a race"],
      ["Cadence", "Pedal revolutions per minute"],
      ["Drafting", "Riding in another rider's slipstream"],
      ["Power-to-weight", "Watts per kilogram, a key climbing metric"],
      ["FTP", "Functional Threshold Power — sustainable 60-min wattage"],
      ["Bonk", "Severe fatigue from glycogen depletion"],
    ],
  },

  "chess improvement": {
    icon: "",
    tools: ["Chess engine", "Tactics trainer", "Opening repertoire book", "Master games database", "Analysis board"],
    glossary: [
      ["Blunder", "Serious mistake losing material or game"],
      ["Calculation", "Mental lookahead of forced sequences"],
      ["Pattern recognition", "Spotting motifs from stored positions"],
      ["Prophylaxis", "Preventing opponent's ideas before they arise"],
      ["Endgame", "Phase with few pieces remaining"],
    ],
  },

  "pottery": {
    icon: "",
    tools: ["Potter's wheel", "Clay", "Kiln", "Wedging table", "Ribs and sponges", "Trimming tools", "Glazes", "Calipers"],
    glossary: [
      ["Wedging", "Kneading clay to remove air pockets"],
      ["Bisque", "First lower-temperature firing before glazing"],
      ["Throwing", "Shaping clay on a spinning wheel"],
      ["Bone dry", "Fully dried greenware ready for bisque"],
      ["Glaze", "Glass-forming coating fused on second firing"],
      ["Cone", "Pyrometric marker of heat-work reached in the kiln"],
      ["Centering", "First step on wheel — placing clay exactly on axis"],
    ],
  },
  "bookbinding": {
    icon: "",
    tools: ["Bone folder", "Awl and needles", "Waxed linen thread", "Book press", "PVA glue", "Book cloth and boards", "Paring knife", "Head bands"],
    glossary: [
      ["Signature", "Folded group of pages sewn as a unit"],
      ["Endpaper", "Decorative page glued to cover's inside"],
      ["Spine", "Bound edge of a book"],
      ["Kettle stitch", "Link stitch at head and tail joining signatures"],
      ["Coptic binding", "Exposed chain-stitch binding"],
      ["Tight-back", "Cover glued directly to spine"],
    ],
  },
  "calligraphy": {
    icon: "",
    tools: ["Dip pen and nibs", "India ink", "Sumi ink", "Practice pads with guide lines", "Pencil and ruler", "Blotter paper"],
    glossary: [
      ["X-height", "Height of lowercase letters without ascenders"],
      ["Ascender", "Stroke rising above x-height (b, d, l)"],
      ["Descender", "Stroke falling below baseline (g, p, y)"],
      ["Serif", "Small projecting finish at stroke ends"],
      ["Flex", "Pressure-driven line variation on a pointed nib"],
      ["Uncial", "Majuscule script of late antiquity"],
    ],
  },
  "knitting": {
    icon: "",
    tools: ["Knitting needles (straight, circular, DPNs)", "Yarn", "Stitch markers", "Row counter", "Tapestry needle", "Scissors", "Gauge ruler"],
    glossary: [
      ["Gauge", "Stitches per inch, key to fit"],
      ["Cast on", "Placing starting loops on the needle"],
      ["Bind off", "Finishing edge that locks stitches"],
      ["Frogging", "Unraveling stitches (rip it, rip it)"],
      ["Increase/Decrease", "Adding or removing stitches to shape"],
      ["Fair Isle", "Stranded colorwork technique"],
    ],
  },
  "beekeeping": {
    icon: "",
    tools: ["Langstroth or top-bar hive", "Bee suit and veil", "Smoker", "Hive tool", "Frame grip", "Honey extractor", "Uncapping knife"],
    glossary: [
      ["Brood", "Eggs, larvae, and pupae in the hive"],
      ["Queen excluder", "Grid preventing the queen entering honey supers"],
      ["Super", "Box above brood for honey storage"],
      ["Propolis", "Resinous bee-made sealant"],
      ["Swarm", "Half the colony leaving with the old queen"],
      ["Varroa", "Parasitic mite, primary hive pest"],
    ],
  },
  "birdwatching": {
    icon: "",
    tools: ["Binoculars (8x42 typical)", "Spotting scope", "Field guide", "Notebook or eBird app", "Camera with telephoto", "Weather-appropriate clothing"],
    glossary: [
      ["Lifer", "First-ever sighting of a species"],
      ["LBJ", "Little Brown Jobs — hard-to-ID small drab birds"],
      ["Pelagic", "Bird of the open ocean"],
      ["Jizz", "Overall shape/movement used for ID"],
      ["Twitcher", "Birder chasing rarities"],
      ["Pishing", "Mouth-made noise to attract small birds"],
    ],
  },

  "woodworking": {
    icon: "",
    tools: ["Hand planes", "Chisels", "Mallet", "Hand saw and Japanese saw", "Marking gauge", "Bench with vise", "Sharpening stones", "Clamps"],
    glossary: [
      ["Mortise and tenon", "Classic strong joinery of peg and socket"],
      ["Dovetail", "Flared interlocking pins and tails"],
      ["Grain", "Direction of wood fibers"],
      ["Figure", "Decorative pattern from grain and light"],
      ["Kerf", "Width of a saw cut"],
      ["Janka", "Hardness rating of woods"],
    ],
  },
  "blacksmithing": {
    icon: "",
    tools: ["Forge (coal or gas)", "Anvil", "Tongs", "Hammers (cross-peen, ball-peen, rounding)", "Post vise", "Quench tank", "Chisels and punches"],
    glossary: [
      ["Heat treating", "Hardening and tempering by controlled heat and cooling"],
      ["Draw", "Lengthening stock by hammering"],
      ["Upset", "Shortening and thickening stock"],
      ["Scarf", "Angled surface prepared for forge welding"],
      ["Normalizing", "Cooling slowly to relieve stress"],
      ["Scale", "Iron oxide flakes forming at heat"],
    ],
  },

  "meditation": {
    icon: "",
    tools: ["Cushion (zafu)", "Mat (zabuton)", "Quiet space", "Timer or bell app", "Optional eye mask", "Journal"],
    glossary: [
      ["Anapanasati", "Mindfulness of breath"],
      ["Samatha", "Calm-abiding concentration practice"],
      ["Vipassana", "Insight meditation observing changing experience"],
      ["Zazen", "Zen seated meditation"],
      ["Metta", "Loving-kindness practice"],
      ["Jhana", "Deep absorption states"],
    ],
  },
  "yoga": {
    icon: "",
    tools: ["Yoga mat", "Blocks", "Strap", "Bolster", "Blanket", "Comfortable clothing"],
    glossary: [
      ["Asana", "Physical posture"],
      ["Pranayama", "Breath control practice"],
      ["Vinyasa", "Flow linking breath to movement"],
      ["Savasana", "Final relaxation pose"],
      ["Drishti", "Focused gaze point"],
      ["Chakra", "Energy center in yogic anatomy"],
    ],
  },

  "soldering": {
    icon: "",
    tools: ["Temperature-controlled soldering iron", "Leaded or lead-free solder", "Flux", "Solder wick", "Desoldering pump", "Helping hands", "Fume extractor"],
    glossary: [
      ["Wetting", "Solder flowing smoothly onto cleaned pad"],
      ["Cold joint", "Dull grainy joint from poor heat or movement"],
      ["Tinning", "Pre-coating wires or tip with thin solder"],
      ["Through-hole", "Components with leads passing through PCB holes"],
      ["SMD", "Surface-mount devices soldered to pads"],
      ["Reflow", "Melting solder paste in an oven to mount SMDs"],
    ],
  },
  "3d printing": {
    icon: "",
    tools: ["FDM or resin printer", "Filament or resin", "Slicer (Cura, PrusaSlicer, Bambu Studio)", "Calipers", "Scraper", "Deburring tool", "UV cure station (for resin)"],
    glossary: [
      ["Layer height", "Thickness of each deposited layer"],
      ["Infill", "Internal lattice density inside prints"],
      ["Retraction", "Pulling filament back to avoid stringing"],
      ["Slicer", "Software converting models to G-code"],
      ["Bed adhesion", "Grip between first layer and build plate"],
      ["Overhang", "Surface angled past vertical needing supports"],
    ],
  },
};

// Category keyword → default content used when SPECIFIC lacks an entry.
export const KEYWORDS: Array<{
  match: RegExp;
  icon: string;
  tools: string[];
  glossary: Array<[string, string]>;
}> = [
  {
    match: /\b(photography|photograph)/i,
    icon: "",
    tools: ["Camera body", "Lenses", "Tripod", "Lighting kit", "Memory cards", "Editing software", "Reflector/diffuser"],
    glossary: [
      ["Exposure", "Amount of light captured; balance of aperture, shutter, ISO"],
      ["Depth of field", "Range of distance rendered acceptably sharp"],
      ["White balance", "Correcting color temperature of light sources"],
      ["Composition", "Arrangement of elements in the frame"],
      ["Focal length", "Lens distance from sensor; sets field of view"],
      ["Stop", "Doubling or halving of light"],
    ],
  },
  {
    match: /\b(wrestling|grappling|jiu[- ]?jitsu|judo|sambo)/i,
    icon: "",
    tools: ["Mat area", "Grappling singlet or gi", "Mouthguard", "Ear guards", "Tape", "Cauliflower ear oil"],
    glossary: [
      ["Takedown", "Move bringing opponent from standing to the mat"],
      ["Pin", "Shoulders held to the mat for scoring"],
      ["Shoot", "Quick drop to attack the legs"],
      ["Sprawl", "Defending a shoot by flattening the hips"],
      ["Guard", "Bottom position controlling a standing opponent"],
      ["Submission", "Joint lock or choke ending the match"],
    ],
  },
  {
    match: /\b(boxing|muay thai|kickboxing|savate|karate|taekwondo|kung fu)/i,
    icon: "",
    tools: ["Gloves", "Hand wraps", "Heavy bag", "Focus mitts", "Headgear", "Mouthguard", "Shin guards", "Jump rope"],
    glossary: [
      ["Jab", "Lead hand straight punch"],
      ["Cross", "Rear hand straight, often most powerful punch"],
      ["Hook", "Curved side punch to head or body"],
      ["Clinch", "Close range grip fighting position"],
      ["Slip", "Small head movement avoiding a punch"],
      ["Roundhouse", "Circular kick with shin or instep"],
    ],
  },
  {
    match: /\b(running|marathon|sprint|jogging)/i,
    icon: "",
    tools: ["Running shoes", "Technical apparel", "GPS watch", "Hydration bottle", "Energy gels", "Foam roller"],
    glossary: [
      ["Cadence", "Steps per minute"],
      ["Tempo pace", "Comfortably hard sustained pace"],
      ["VO2 max", "Peak oxygen uptake capacity"],
      ["Taper", "Reduced training before a race"],
      ["Splits", "Time for each segment of a run"],
      ["Cushioning/Drop", "Shoe design choices affecting gait"],
    ],
  },
  {
    match: /\b(cycling|cyclocross|gravel|mtb|mountain bik)/i,
    icon: "",
    tools: ["Bicycle for the discipline", "Helmet", "Gloves", "Eyewear", "Hydration pack", "Bike tools and spares", "GPS computer"],
    glossary: [
      ["Cadence", "Pedal revolutions per minute"],
      ["Peloton", "Main cycling group in a race"],
      ["Drafting", "Riding in the slipstream of another rider"],
      ["Granny gear", "Lowest gear for steep climbs"],
      ["Singletrack", "Narrow trail allowing one rider at a time"],
      ["Bonk", "Glycogen depletion causing sudden fatigue"],
    ],
  },
  {
    match: /\b(swimming|freediv|scuba|snorkel|surf|dive)/i,
    icon: "",
    tools: ["Swimsuit/wetsuit", "Goggles/mask", "Fins", "Snorkel", "Dive computer (scuba)", "Towel and dry bag"],
    glossary: [
      ["Drag", "Resistance water imposes on the swimmer"],
      ["Catch", "Initial water-gripping phase of a stroke"],
      ["Flip turn", "Somersault turn at the wall"],
      ["Interval", "Swim time including rest period"],
      ["Streamline", "Tight body position off walls and dives"],
      ["Dolphin kick", "Undulating two-leg kick"],
    ],
  },
  {
    match: /\b(weaving|spinning|embroidery|knitting|crochet|lace|felting|tatting|sewing|dyeing|quilting)/i,
    icon: "",
    tools: ["Fiber/yarn/thread", "Needles or hooks", "Frame or hoop", "Scissors", "Measuring gauge", "Pattern reference"],
    glossary: [
      ["Gauge", "Stitches per inch, governs fit"],
      ["Warp/Weft", "Longitudinal and transverse threads in weaving"],
      ["Selvedge", "Self-finished fabric edge"],
      ["Ply", "Number of strands twisted into a yarn"],
      ["Blocking", "Wetting and shaping finished textile"],
      ["Drape", "How fabric hangs and moves"],
    ],
  },
  {
    match: /\b(forging|smith|metal|blacksmith)/i,
    icon: "",
    tools: ["Forge", "Anvil", "Tongs", "Hammers", "Vise", "Quench tank", "Files and chisels"],
    glossary: [
      ["Anneal", "Soften by slow cooling from hot"],
      ["Temper", "Moderate hardness and brittleness after hardening"],
      ["Flux", "Prevents oxide buildup when welding/soldering"],
      ["Scale", "Flaky iron oxide formed at heat"],
      ["Upset", "Thicken metal by end-on blows"],
      ["Draw out", "Lengthen stock with side blows"],
    ],
  },
  {
    match: /\b(carving|whittling|intarsia|marquetry|turn|bodging|lath)/i,
    icon: "",
    tools: ["Carving knives and gouges", "Mallet", "Clamp or vise", "Strop and sharpening stones", "Dust mask", "Wood blanks"],
    glossary: [
      ["Grain", "Direction of wood fibers; follow to avoid tearout"],
      ["Relief", "Carving with background left intact"],
      ["Stop cut", "Cut defining the boundary before removing wood"],
      ["Chisel sweep", "Curvature number of a gouge"],
      ["Tearout", "Fibers torn against grain"],
      ["Finish", "Oil, wax, or lacquer protecting the surface"],
    ],
  },
  {
    match: /\b(baking|bread|pastry|pasta|fermentation|pickling|cheese|brew)/i,
    icon: "",
    tools: ["Scale", "Mixing bowls", "Dough scraper", "Proofing baskets", "Dutch oven or baking stone", "Thermometer", "Timer"],
    glossary: [
      ["Hydration", "Ratio of water to flour by weight"],
      ["Autolyse", "Initial rest of flour + water before mixing in salt/starter"],
      ["Levain", "Offshoot of starter built for a specific bake"],
      ["Bulk fermentation", "First rise developing flavor and gluten"],
      ["Score", "Slashing dough surface before baking"],
      ["Oven spring", "Final rapid rise in the oven"],
    ],
  },
  {
    match: /\b(painting|drawing|sketch|watercolor|gouache|acrylic|oil|pastel)/i,
    icon: "",
    tools: ["Paints or drawing media", "Brushes or pencils", "Palette", "Surface (canvas, paper, board)", "Easel", "Rags and solvent"],
    glossary: [
      ["Value", "Lightness of a color"],
      ["Hue", "Pure color attribute"],
      ["Chroma/Saturation", "Intensity of a color"],
      ["Underpainting", "Preliminary tonal layer"],
      ["Glazing", "Thin transparent paint layer over dry paint"],
      ["Composition", "Arrangement of shapes and values in the frame"],
    ],
  },
  {
    match: /\b(dance|ballet|salsa|tango|waltz|swing|hip[- ]?hop|break)/i,
    icon: "",
    tools: ["Appropriate shoes", "Fitted clothing", "Mirror or studio", "Music source", "Grip spray for floor"],
    glossary: [
      ["Lead/Follow", "Roles in partner dancing"],
      ["Count", "Rhythmic unit grouping steps"],
      ["Frame", "Posture holding partner connection"],
      ["Turn", "Pivot or spin element"],
      ["Isolation", "Moving one body part independently"],
      ["Musicality", "Matching movement to the music's phrasing"],
    ],
  },
  {
    match: /\b(guitar|piano|violin|cello|drum|bass|saxophone|trumpet|ukulele|mandolin|banjo)/i,
    icon: "",
    tools: ["The instrument", "Tuner", "Metronome", "Method book", "Stand", "Case", "Recording device"],
    glossary: [
      ["Tempo", "Speed, measured in BPM"],
      ["Key signature", "Set of sharps/flats defining tonal center"],
      ["Scale", "Ordered set of pitches"],
      ["Chord", "Three or more notes played together"],
      ["Arpeggio", "Chord played as successive notes"],
      ["Dynamics", "Loudness variation"],
    ],
  },
  {
    match: /\b(fishing|angl)/i,
    icon: "",
    tools: ["Rod and reel", "Line and leader", "Tackle box", "Hooks, lures, bait", "Net or gaff", "Pliers"],
    glossary: [
      ["Drag", "Adjustable resistance in the reel"],
      ["Leader", "Stronger line section near the hook"],
      ["Tippet", "Finest section in fly fishing"],
      ["Presentation", "How lure/fly is offered to fish"],
      ["Structure", "Underwater features attracting fish"],
      ["Bite", "Moment a fish takes the bait"],
    ],
  },
  {
    match: /\b(climb|boulder|mountain|via ferrata)/i,
    icon: "",
    tools: ["Climbing shoes", "Harness", "Rope", "Quickdraws", "Belay device", "Chalk and bag", "Helmet"],
    glossary: [
      ["Crux", "Hardest section of a route"],
      ["Send", "Complete a route cleanly"],
      ["Beta", "Info about how to climb a route"],
      ["Crimp", "Small hold taken with fingertips"],
      ["Redpoint", "Leading a route cleanly after practice"],
      ["Belay", "Managing the rope to protect a climber"],
    ],
  },
  {
    match: /\b(horse|equestrian|dressage|rodeo)/i,
    icon: "",
    tools: ["Saddle", "Bridle and bit", "Helmet", "Riding boots", "Grooming kit", "Lead rope"],
    glossary: [
      ["Gait", "Pattern of leg movement (walk, trot, canter, gallop)"],
      ["Tack", "Collective riding equipment"],
      ["Aids", "Rider's cues through legs, seat, hands"],
      ["Collection", "Engaged short frame with weight to hindquarters"],
      ["Leg yield", "Sideways movement responding to rider's leg"],
      ["Farrier", "Hoof care and shoeing specialist"],
    ],
  },
  {
    match: /\b(sculpt|clay|ceramic|pot|porcel|raku|kiln)/i,
    icon: "",
    tools: ["Clay", "Potter's wheel or slab roller", "Kiln", "Ribs and loop tools", "Glazes", "Sponges", "Calipers"],
    glossary: [
      ["Greenware", "Unfired clay piece"],
      ["Bisque", "Once-fired unglazed piece"],
      ["Slip", "Liquid clay used for joining or decorating"],
      ["Cone", "Pyrometric indicator of firing heat work"],
      ["Reduction", "Low-oxygen firing affecting glaze color"],
      ["Wedging", "Kneading to remove air and align particles"],
    ],
  },
  {
    match: /\b(robotic|arduino|raspberry|cnc|laser|electronic|3d print|pcb)/i,
    icon: "",
    tools: ["Microcontroller or SBC", "Sensors and actuators", "Soldering iron", "Breadboard and jumper wires", "Power supply", "Multimeter"],
    glossary: [
      ["PWM", "Pulse-width modulation for variable output"],
      ["Firmware", "Embedded software running on the device"],
      ["GPIO", "General-purpose input/output pin"],
      ["Serial", "Byte-by-byte communication protocol (UART)"],
      ["Pull-up/Pull-down", "Resistor fixing a logic level default"],
      ["Kinematics", "Math of joint/link motion"],
    ],
  },
  {
    match: /\b(collect|collection|memorabilia|vintage|antique|numismat|phillumen|deltiolog)/i,
    icon: "",
    tools: ["Display cases", "Archival sleeves", "Acid-free storage", "Magnifying loupe", "Reference price guide", "White cotton gloves"],
    glossary: [
      ["Mint", "Item in original unused condition"],
      ["Graded", "Professionally rated and encapsulated"],
      ["Provenance", "Documented ownership history"],
      ["Variant", "Alternate version of an item"],
      ["Ephemera", "Transient printed material collected for value"],
      ["Condition census", "Ranked register of best-known examples"],
    ],
  },
  {
    match: /\b(writing|fiction|poetry|memoir|essay|novel|screenwrit|playwrit)/i,
    icon: "",
    tools: ["Notebook or writing software", "Dictionary and thesaurus", "Style guide", "Editing passes workflow", "Beta readers"],
    glossary: [
      ["POV", "Point of view; narrative perspective"],
      ["Show don't tell", "Depicting through action/detail rather than stating"],
      ["Arc", "Character or narrative transformation path"],
      ["Scene/Sequel", "Goal-conflict-setback, then reaction-dilemma-decision"],
      ["Draft", "A complete revision pass of the manuscript"],
      ["Voice", "Distinctive narrative personality of a writer"],
    ],
  },
  {
    match: /\b(magic|mentalism|juggl|fire|poi|stilt|puppet|mime|clown|aerial|trapeze)/i,
    icon: "",
    tools: ["Props specific to the art", "Rehearsal space", "Music rig", "Safety gear", "Costume", "Mirror for practice"],
    glossary: [
      ["Blocking", "Planned stage movement"],
      ["Patter", "Spoken accompaniment in magic"],
      ["Misdirection", "Controlling audience attention"],
      ["Stage presence", "Commanding performative energy"],
      ["Timing", "Precise synchronization with music or moment"],
      ["Rigging", "Setup of suspended apparatus"],
    ],
  },
  {
    match: /\b(model|diorama|scale|miniature|gunpla|wargam)/i,
    icon: "",
    tools: ["Hobby knife", "Plastic cement", "Sanding sticks", "Paints and primer", "Airbrush", "Pin vise", "Tweezers"],
    glossary: [
      ["Kitbash", "Combining parts from multiple kits"],
      ["Wash", "Thin paint pooling into crevices for depth"],
      ["Drybrush", "Near-dry brush highlighting raised surfaces"],
      ["Priming", "Base layer for paint adhesion"],
      ["Seam line", "Join line to fill or hide"],
      ["Scale", "Size ratio (1:72, 1:35, etc.)"],
    ],
  },
  {
    match: /\b(tarot|astrology|rune|divin|dows|reiki|shaman|chakra|qigong|tai chi|breathwork)/i,
    icon: "",
    tools: ["Cards or stones", "Journal", "Candles and incense", "Altar cloth", "Reference books", "Quiet space"],
    glossary: [
      ["Spread", "Layout of cards and their positions"],
      ["Querent", "Person receiving the reading"],
      ["Correspondence", "Symbolic link between systems (planets, elements)"],
      ["Reversal", "Card drawn upside down, altering its meaning"],
      ["Transit", "Current planetary position affecting a chart"],
      ["Intention", "Purpose set before ritual or practice"],
    ],
  },
  {
    match: /\b(card game|board game|tabletop|trading card|tcg|ccg)/i,
    icon: "",
    tools: ["Game sets and cards", "Sleeves and deck box", "Playmat", "Dice and counters", "Rulebook", "Timer"],
    glossary: [
      ["Meta", "Dominant strategies at a given time"],
      ["Tempo", "Efficient use of turns vs resources"],
      ["Value", "Net resource advantage gained"],
      ["Draw", "Adding cards to the hand"],
      ["Mulligan", "Redraw starting hand under specific rules"],
      ["Win condition", "Specific path to victory in a deck/strategy"],
    ],
  },
  {
    match: /\b(drone|rc |r\/c|radio control|model aircraft|rocket)/i,
    icon: "",
    tools: ["Transmitter", "Receiver/flight controller", "Battery and charger", "Frame/airframe", "Props/motors", "Spare parts kit"],
    glossary: [
      ["LOS", "Line of sight flying"],
      ["FPV", "First-person video flying via goggles"],
      ["LiPo", "Lithium polymer battery commonly used"],
      ["Failsafe", "Behavior on signal loss"],
      ["Binding", "Pairing transmitter with receiver"],
      ["Trim", "Fine adjustments to neutral control surfaces"],
    ],
  },
  {
    match: /\b(coffee|tea|wine|beer|whisky|spirit|cocktail|barista)/i,
    icon: "",
    tools: ["Brewing/extraction device", "Scale", "Grinder", "Timer", "Thermometer", "Glassware or cups", "Cleaning brushes"],
    glossary: [
      ["Extraction", "Soluble compounds drawn from the ingredient"],
      ["TDS", "Total dissolved solids — strength measure"],
      ["Tasting note", "Descriptor of flavor attribute"],
      ["Body", "Perceived weight on the palate"],
      ["Terroir", "Environmental influence on flavor"],
      ["Blind tasting", "Evaluation without brand/origin knowledge"],
    ],
  },
  {
    match: /\b(gard|permacul|forag|homestead|compost|mushroom|sprout)/i,
    icon: "",
    tools: ["Hand tools (trowel, pruners)", "Hose/watering can", "Soil amendments", "Seeds or starts", "Compost bin", "Garden journal"],
    glossary: [
      ["Hardiness zone", "Climate band for plant suitability"],
      ["Annual/Perennial", "Life cycle of the plant"],
      ["Companion planting", "Pairing species for mutual benefit"],
      ["Mulch", "Surface layer suppressing weeds and retaining moisture"],
      ["Succession", "Staggered planting for continuous harvest"],
      ["NPK", "Nitrogen-phosphorus-potassium fertilizer ratio"],
    ],
  },
  {
    match: /\b(game|video game|speedrun|stream|mod)/i,
    icon: "",
    tools: ["Gaming PC or console", "Controller or keyboard/mouse", "Capture card (for streaming)", "Microphone", "Multiple monitors", "High-refresh display"],
    glossary: [
      ["Frame data", "Per-frame animation timing"],
      ["Input lag", "Delay between press and action"],
      ["Skip", "Exploit bypassing content for speed"],
      ["Any%", "Speedrun category allowing any means to finish"],
      ["100%", "Category requiring full completion"],
      ["Glitch", "Unintended game behavior often used in runs"],
    ],
  },
  {
    match: /\b(language|linguist|etym|conlang|esperanto|polyglot)/i,
    icon: "",
    tools: ["Textbooks and grammars", "Spaced-repetition software (Anki)", "Audio materials", "Notebook", "Dictionary", "Native-speaker interlocutors"],
    glossary: [
      ["Morpheme", "Smallest unit of meaning in a word"],
      ["Phoneme", "Smallest unit of distinct sound"],
      ["Cognate", "Shared-origin word across languages"],
      ["Register", "Style level (formal, casual, etc.)"],
      ["Conjugation", "Verb inflection by tense/person/mood"],
      ["Agglutinative", "Building words by stringing morphemes"],
    ],
  },
  {
    match: /\b(cards collect|stamp|coin|banknote)/i,
    icon: "",
    tools: ["Album or folder", "Magnifying loupe", "White gloves", "Grading reference", "Acid-free sleeves", "Tweezers"],
    glossary: [
      ["Mint condition", "As-issued, unhandled state"],
      ["Die variety", "Small striking differences on coins"],
      ["Cancelation", "Postmark on a used stamp"],
      ["Watermark", "Subtle design visible by transmitted light"],
      ["Proof", "Specially struck presentation-grade coin"],
      ["Series", "Group issued together sharing design traits"],
    ],
  },
];

export const GENERIC: Content = {
  icon: "",
  tools: [
    "Beginner reference (book or video course)",
    "Dedicated practice space",
    "Safety gear appropriate to the activity",
    "Notebook for progress tracking",
    "Community or mentor for feedback",
    "Starter-grade equipment",
  ],
  glossary: [
    ["Fundamentals", "Core skills that underpin all advanced work"],
    ["Drill", "Repetitive practice of a single component"],
    ["Form", "Correct technique and body mechanics"],
    ["Progression", "Path of graded difficulty leading to mastery"],
    ["Plateau", "Temporary stall in improvement"],
    ["Review", "Revisiting past material to consolidate skill"],
  ],
};

export function resolveContent(name: string, category: string): Content {
  const key = name.toLowerCase();
  if (SPECIFIC[key]) return SPECIFIC[key];
  for (const kw of KEYWORDS) {
    if (kw.match.test(name) || kw.match.test(category)) {
      return { icon: kw.icon, tools: kw.tools, glossary: kw.glossary };
    }
  }
  return GENERIC;
}
