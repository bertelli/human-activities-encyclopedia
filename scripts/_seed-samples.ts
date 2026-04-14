import { eq } from "drizzle-orm";
import { db, schema } from "../src/db";

type Payload = {
  slug: string;
  description: string;
  tools: string[];
  glossary: Array<{ term: string; definition: string }>;
  brands: Array<{ name: string; note?: string }>;
  techniques: Array<{ name: string; description?: string }>;
  masters: Array<{ name: string; note?: string }>;
};

const cakeCarving: Payload = {
  slug: "cake-carving",
  description:
    "Cake carving is the craft of sculpting stacked cake into three-dimensional forms — a leaping dolphin, an open book, a cartoon character, a racing helmet — rather than simply frosting a round or square base. It sits at the demanding end of cake decorating: the baker first builds a tall block from firm, sturdy recipes (pound cake, mud cake, or dense chocolate), then uses serrated knives and paper templates to shave the block into the intended silhouette, working from rough outlines down to fine contours on a rotating turntable.\n\nOnce the shape is right, the sculpt is sealed with a ganache or buttercream crumb coat, chilled until firm, and then either draped in rolled fondant for a smooth finish or clad in modeling chocolate and gumpaste details. Heavier builds rely on hidden armatures — food-safe dowels, cake drums, and commercial tiering systems — to stay upright without collapsing into the filling. Competitive carvers appear at events like Cake International and on shows such as Cake Masters and Cake Wars, and the community trades techniques on YouTube, Instagram, and specialist forums where sculptors post schematics and step-by-step builds.",
  tools: [
    "Long serrated knife (for rough carving of stacked cake)",
    "Small paring knife (for detail trimming)",
    "Offset spatula (angled, for applying ganache and buttercream)",
    "Straight spatula",
    "Bench scraper / side scraper",
    "Rotating cake turntable",
    "Cake leveler (wire or blade)",
    "Food-safe wooden dowels",
    "Food-safe plastic dowels (bubble tea straws, Wilton)",
    "SPS (Single Plate System) tiering kit",
    "Cake drum (foil-wrapped MDF base)",
    "Cake board (thin cardboard separators)",
    "Fondant smoother",
    "Fondant rolling pin (extra-long, non-stick)",
    "Silicone rolling mat",
    "Piping bags and tips",
    "Acetate sheets and paper templates",
    "Ruler and set square",
    "Pizza cutter / rolling pastry wheel",
    "Ball tool / Dresden tool / veining tools (PME, Wilton)",
    "Silicone moulds (Katy Sue, Karen Davies, Marvelous Molds)",
    "Airbrush and food-safe compressor",
    "Edible-ink pens (Rainbow Dust, FooDoodler)",
    "Luster dust and petal dust brushes",
    "Isopropyl alcohol or clear extract (for painting fondant)",
    "Food-grade silicone glue / edible glue",
    "Tylose / CMC powder (for hardening gumpaste)",
    "Cocoa butter (for chocolate-based painting)",
    "Viva paper towels (for smoothing crusting buttercream)",
    "Kitchen blowtorch (for fondant shine)",
    "Precision digital scale",
    "Stand mixer with paddle and whip",
    "Cake boards in assorted sizes",
    "Long spirit level",
    "Drill or screwdriver (for central support dowel through tiers)",
    "Foam board (for internal structure and RKT forms)",
  ],
  glossary: [
    { term: "Crumb coat", definition: "A thin initial layer of buttercream or ganache applied to seal in loose crumbs before the final coat." },
    { term: "Dirty ice", definition: "Informal name for the crumb coat; a messy-looking thin pass that traps crumbs and fixes the shape." },
    { term: "Ganache", definition: "A mixture of chocolate and cream used as a firm, carve-friendly coating under fondant." },
    { term: "Ganache dam", definition: "A piped ring of stiff ganache or buttercream that contains soft fillings between cake layers." },
    { term: "Fondant", definition: "A pliable sugar dough rolled into sheets and draped over cakes for a smooth, sculptable finish." },
    { term: "Gumpaste", definition: "A sugar paste that dries hard, used for fine details, flowers, and standing elements that must hold shape." },
    { term: "Modeling chocolate", definition: "Chocolate kneaded with corn syrup into a clay-like medium for sculpted figures and details." },
    { term: "RKT", definition: "Rice Krispie Treats, shaped and used as lightweight internal filler for parts that can't be sliced from cake." },
    { term: "Armature", definition: "The hidden skeleton (dowels, PVC, wooden frame) that supports a carved cake against gravity." },
    { term: "SPS", definition: "Single Plate System; a commercial tiering kit of pillars and plates that supports stacked cakes without bowing." },
    { term: "Dowel", definition: "A food-safe rod driven through lower tiers so they bear the weight of upper tiers instead of the cake itself." },
    { term: "Cake drum", definition: "A thick foil-wrapped MDF or foam board used as the structural base under a carved cake." },
    { term: "Cake board", definition: "A thinner cardboard round or square placed between stacked tiers to distribute load." },
    { term: "Tiering", definition: "Assembling multiple cakes vertically with internal supports so each layer sits on structure, not sponge." },
    { term: "Stacking", definition: "The act of placing one cake directly on top of another, usually after dowel insertion." },
    { term: "Chill / set", definition: "Resting a carved cake in the fridge or freezer so the ganache firms up for clean carving or draping." },
    { term: "Bevel", definition: "An angled cut along an edge used to create rounded or tapered contours in a cake surface." },
    { term: "Drape", definition: "Laying rolled fondant over a cake and smoothing it down into the carved contours." },
    { term: "Elephant skin", definition: "A wrinkled, dry surface on fondant caused by overworking or low humidity." },
    { term: "Luster dust", definition: "Edible shimmer powder brushed or airbrushed onto fondant for metallic and pearl finishes." },
    { term: "Petal dust", definition: "A matte edible powder used to add soft colour shading to fondant flowers and figures." },
    { term: "Airbrushing", definition: "Spraying food-safe colour through a compressed-air gun to shade or gradient carved details." },
    { term: "Template", definition: "A paper or acetate cut-out placed on the cake as a cutting guide for precise shapes." },
    { term: "Schematic", definition: "A labelled sketch of the carved cake showing dimensions, internal supports, and tier positions." },
    { term: "Viva smoothing", definition: "Pressing a plain Viva paper towel onto a crusted buttercream surface to polish it before fondant." },
    { term: "Crusting buttercream", definition: "A high-sugar buttercream formulation that forms a dry crust, ideal for smoothing and under fondant." },
    { term: "Mud cake", definition: "A dense, moist chocolate cake recipe preferred for carving because it holds shape under weight." },
    { term: "Topper", definition: "A decorative element (figure, flower, sign) placed on top of a cake, often gumpaste or modelling chocolate." },
    { term: "Isomalt", definition: "A sugar substitute that melts clear and is cast into glass-like elements such as windows or gems." },
    { term: "Edible image", definition: "A printed sheet of edible ink on wafer paper or icing sheet applied to a cake surface." },
    { term: "Tylose / CMC", definition: "A powder mixed into fondant or gumpaste to speed drying and improve structural hold." },
    { term: "Food-safe", definition: "Certified materials (dowels, paints, glues) that can contact food without contamination." },
    { term: "Central dowel", definition: "A single long dowel or threaded rod driven through every tier to lock an entire cake column." },
    { term: "Pillar and plate", definition: "A traditional tiering method with separator plates resting on decorative pillars above each tier." },
  ],
  brands: [
    { name: "Wilton", note: "US baking giant; fondant, tools, dowels, pans, and training courses." },
    { name: "Satin Ice", note: "Widely used US rolled fondant brand; known for stable texture and flavour range." },
    { name: "Renshaw", note: "UK sugarpaste (fondant) maker popular with professional decorators." },
    { name: "Massa Ticino", note: "Swiss premium fondant favoured for competition cakes for its smooth finish." },
    { name: "Fondx", note: "US fondant brand preferred for warm-climate work due to its elasticity." },
    { name: "Saracino", note: "Italian brand whose modelling paste and sugarpaste are staples for sculpted cakes." },
    { name: "Squires Kitchen", note: "UK supplier of dusts, colours, and sugarcraft tools used in fine detailing." },
    { name: "Rainbow Dust", note: "UK maker of luster dusts and edible pens widely used in professional finishing." },
    { name: "Sugarflair", note: "UK paste-colour brand used for tinting fondant and buttercream without thinning." },
    { name: "Americolor", note: "US gel-paste colour range favoured for vivid tones in buttercream and fondant." },
    { name: "Chefmaster", note: "US food colour brand known for airbrush colours and gel pastes." },
    { name: "PME", note: "UK tool brand producing ball tools, veiners, scribers, and flower cutters." },
    { name: "Karen Davies", note: "UK silicone mould brand used for textured panels and figures." },
    { name: "Katy Sue Designs", note: "UK mould and tool maker for frills, lace, and figurine pieces." },
    { name: "FMM", note: "UK cutter brand producing alphabet, fabric, and shape cutters used on fondant." },
    { name: "Callebaut", note: "Belgian couverture chocolate used for ganache and modelling chocolate work." },
    { name: "Valrhona", note: "French couverture chocolate favoured for premium ganaches." },
    { name: "KitchenAid", note: "Stand-mixer brand of choice in most cake-decorating kitchens." },
    { name: "Ateco", note: "US kitchenware brand supplying piping tips, scrapers, and turntables." },
    { name: "Innovative Sugarworks", note: "US maker of SPS (Single Plate System) structural tiering kit." },
    { name: "Cakes by Chloe", note: "Structural-hardware line including the Bakestix internal support system." },
    { name: "Magic Colours", note: "Paste and airbrush colour brand popular in European competition work." },
  ],
  techniques: [
    { name: "Stack-and-carve", description: "Gluing tall blocks of baked cake with buttercream, then carving from the outside inward to reveal the target shape." },
    { name: "Template carving", description: "Pinning printed paper silhouettes to the cake and cutting straight down to transfer exact proportions." },
    { name: "Bevelling", description: "Angling the blade to round off sharp cut edges and create natural, sculptural curves." },
    { name: "Crumb coating", description: "Applying a thin ganache or buttercream layer to seal crumbs before the final smooth coat." },
    { name: "Double ganache", description: "Applying a first rough ganache coat, chilling, scraping flat, then a second coat for a tablet-smooth surface." },
    { name: "Fondant draping", description: "Rolling fondant to even thickness, lifting with a pin, and smoothing it down the cake from the top outward to push out air." },
    { name: "Panelling", description: "Cutting fondant into strips or panels for flat surfaces (book pages, building walls) where a single drape would tear." },
    { name: "Modelling chocolate sculpting", description: "Kneading modelling chocolate by hand to hand-sculpt heads, limbs, and detailed figurines." },
    { name: "Gumpaste flower construction", description: "Cutting, veining, and drying individual petals over formers, then wiring them into realistic blooms." },
    { name: "Structured tiering", description: "Dowelling each tier and anchoring a central rod through the stack so heavy upper tiers cannot shift or sink." },
    { name: "RKT armatures", description: "Packing Rice Krispie Treats into shapes around a central dowel to form lightweight extensions (heads, fins, arms)." },
    { name: "Airbrushed shading", description: "Laying gradients and shadow over fondant with a low-pressure airbrush for depth and realism." },
    { name: "Hand-painting", description: "Using food-safe colours thinned with alcohol or cocoa butter to paint details directly onto fondant or chocolate." },
    { name: "Isomalt casting", description: "Melting isomalt and pouring into silicone moulds for clear glass-like windows, gems, or water." },
    { name: "Edible image transfer", description: "Printing edible ink onto wafer or icing sheets and applying to flat cake faces for photo-accurate detail." },
    { name: "Wafer-paper work", description: "Cutting, curling, and glueing wafer paper to make feathers, petals, and translucent sails." },
    { name: "Fault-line cake", description: "A decorating style where a ring of texture (geode, flowers, gold) bisects a smooth tier." },
    { name: "Geode", description: "Inset crystal cluster made from rock candy or isomalt embedded into a carved cavity on the tier." },
    { name: "Fondant quilting", description: "Impressing diamond or square patterns into fondant with a ruler or quilting tool, often beaded at intersections." },
    { name: "Lace moulding", description: "Casting edible lace mats in silicone moulds and applying around tiers as textile detailing." },
    { name: "Dust-and-polish", description: "Brushing luster dust over a surface then burnishing it smooth with a soft brush for a metallic sheen." },
    { name: "Gravity-defying builds", description: "Using threaded rod and cantilevered supports to produce cakes that appear to float or lean impossibly." },
  ],
  masters: [
    { name: "Debbie Brown", note: "British author whose 1990s books on novelty and character cakes defined modern 3-D carving." },
    { name: "Colette Peters", note: "American pioneer of artistic wedding cakes; founder of Colette's Cakes in New York." },
    { name: "Ron Ben-Israel", note: "Israeli-American couture cake designer known for photo-real sugar flowers." },
    { name: "Mich Turner", note: "British founder of Little Venice Cake Company; royal and celebrity commissions." },
    { name: "Peggy Porschen", note: "German-born London pâtissière known for pastel-perfect tiered work." },
    { name: "Eddie Spence MBE", note: "Master royal-icing decorator, awarded MBE for services to sugarcraft." },
    { name: "Buddy Valastro", note: "Star of TLC's Cake Boss; popularised large-scale sculpted cake on US television." },
    { name: "Duff Goldman", note: "Founder of Charm City Cakes and star of Ace of Cakes; championed structural and themed cakes." },
    { name: "Karen Portaleo", note: "American sculptural cake artist famed for hyper-real animal busts at Highland Bakery." },
    { name: "Mike McCarey", note: "Owner of Mike's Amazing Cakes, Seattle; builder of kinetic and vehicle cakes." },
    { name: "Margaret Braun", note: "NYC-based sugar artist whose painted, Renaissance-style cakes shifted the form toward fine art." },
    { name: "Sylvia Weinstock", note: "American wedding cake legend known as the 'leonardo da vinci of wedding cakes'." },
    { name: "Eric Lanlard", note: "French pâtissier based in London; celebrity cake commissions and TV presenter." },
    { name: "Rosalind Chan", note: "Malaysian-Canadian decorator; founder of the International Centre of Cake Artistry." },
    { name: "Rosie Cake-Diva", note: "UK hand-painting specialist known for portrait cakes." },
    { name: "Avalon Yarnes", note: "American fondant sculpture teacher and Food Network judge." },
    { name: "Bronwen Weber", note: "US master decorator; four-time Food Network Challenge champion." },
    { name: "Rick Reichart", note: "American structural cake engineer; founder of Cake Engineering." },
    { name: "Rosanna Pansino", note: "YouTube baker whose Nerdy Nummies channel popularised novelty carved cakes to a mass audience." },
  ],
};

const airsoft: Payload = {
  slug: "airsoft",
  description:
    "Airsoft is a team skirmish sport in which players shoot each other with 6 mm biodegradable plastic BBs fired from replica firearms powered by electric motors (AEGs), compressed gas (GBB), or high-pressure air (HPA). It sits closer to military simulation than to paintball: hits don't leave a mark, so the game runs on an honor code where a struck player calls themselves out and either respawns or bleeds out according to the scenario rules. Games range from short public skirmishes at indoor CQB arenas to multi-day MilSim events with strict loadouts, limited ammunition, radio comms, and roleplayed objectives.\n\nEvery field enforces a chronograph check at the door, capping muzzle velocity (typically 350–400 FPS with a 0.20 g BB for rifles, higher for DMRs and snipers with a minimum engagement distance). Players tune their replicas with upgraded hop-up buckings, tighter barrels, and heavier BBs for range, and build loadouts around plate carriers, mid-cap magazines, radios, and optics. The hobby has deep crossover with historical re-enactors, gun enthusiasts in countries where real firearms are restricted, and first-person-shooter players who want the same tactics in the real world; communities cluster around national federations, YouTube gameplay channels, and MilSim operator groups.",
  tools: [
    "AEG (Automatic Electric Gun) rifle",
    "GBB (Gas Blowback) pistol",
    "GBBR (Gas Blowback Rifle)",
    "HPA (High Pressure Air) engine and regulator",
    "HPA air tank and coiled line",
    "Spring-powered bolt-action sniper replica",
    "Support / squad automatic weapon (SAW) replica with box magazine",
    "6 mm biodegradable BBs (0.20 g–0.45 g)",
    "Chronograph",
    "Full-seal ANSI Z87.1-rated goggles",
    "Mesh face mask / half-face lower guard",
    "Ballistic-rated full-face mask",
    "LiPo battery (stick or nunchuck)",
    "NiMH battery pack",
    "Smart LiPo charger and balance board",
    "Mid-cap magazines (30–150 rounds)",
    "Hi-cap magazines (200–400+ rounds)",
    "Low-cap / real-cap magazines",
    "BB speedloader",
    "Plate carrier",
    "Chest rig",
    "Battle belt",
    "Magazine pouches (Kydex or nylon)",
    "Drop-leg holster",
    "Dump pouch",
    "Red dot sight",
    "Holographic sight",
    "Magnifier (3x flip-to-side)",
    "Low-power variable optic (LPVO)",
    "Rifle scope and rings",
    "Laser designator / visible or IR laser module",
    "Weapon-mounted flashlight",
    "Tracer unit (barrel-mounted UV illuminator)",
    "UV tracer BBs",
    "Suppressor / mock silencer",
    "Foregrip and angled grip",
    "RIS / Picatinny rail handguard",
    "Bipod",
    "Sling (one, two, or three-point)",
    "Radio (Baofeng UV-5R, Motorola)",
    "PTT (push-to-talk) adapter and headset",
    "Comtac or Peltor electronic hearing protection",
    "Boonie hat / helmet (FAST, MICH, PASGT replica)",
    "Knee pads and elbow pads",
    "Tactical gloves",
    "Combat shirt and pants (UBACS)",
    "Camouflage BDU (Multicam, A-TACS, M81, Flecktarn, AOR2)",
    "Ghillie suit",
    "Dead rag (high-vis cloth)",
    "Dummy grenade / pyrotechnic grenade (Thunder-B, Enola Gaye)",
    "Airsoft landmine / tripwire device",
    "Shotgun shell carrier",
    "Gun case / soft case",
    "Allen key / hex set (for gearbox disassembly)",
    "Hop-up bucking (75° / Flat Hop / R-hop)",
    "Tightbore inner barrel (6.01 mm–6.05 mm)",
    "Upgraded motor (high torque / high speed)",
    "Upgraded gears (18:1, 16:1, 13:1 ratios)",
    "Upgraded piston and cylinder set",
    "MOSFET / ETU (trigger board)",
  ],
  glossary: [
    { term: "AEG", definition: "Automatic Electric Gun; a battery-powered replica driven by a piston-and-gear gearbox." },
    { term: "GBB / GBBR", definition: "Gas Blowback (Rifle); gas-powered replica with a reciprocating bolt that mimics recoil." },
    { term: "HPA", definition: "High Pressure Air; an external air-tank system with a regulator for fine velocity control." },
    { term: "BB", definition: "6 mm spherical plastic projectile; weights of 0.20 g, 0.25 g, 0.28 g, 0.32 g, and 0.40 g are common." },
    { term: "FPS", definition: "Feet Per Second; muzzle velocity measured at the chrono, standardised with a 0.20 g BB." },
    { term: "Joule / Joule creep", definition: "Muzzle energy in joules; joule creep is the rise in energy when a gas replica fires heavier BBs." },
    { term: "Chrono", definition: "Chronograph; the device used at check-in to verify a replica is within field velocity and joule limits." },
    { term: "FPS cap", definition: "Field-imposed velocity ceiling, typically 350–400 FPS for AEGs and higher for DMRs and snipers." },
    { term: "MED", definition: "Minimum Engagement Distance; the closest range a high-FPS replica (DMR, bolt sniper) is allowed to shoot." },
    { term: "Hit call", definition: "Honor-system declaration where a struck player shouts 'Hit!' and raises a hand or dead rag." },
    { term: "Bang rule", definition: "Safety rule allowing a player to shout 'Bang!' at point-blank range instead of firing." },
    { term: "Dead rag", definition: "Bright cloth worn on the head or held up to signal a player is eliminated and non-combatant." },
    { term: "Respawn", definition: "A designated point players return to after being hit, usually after a timer or touch-back rule." },
    { term: "Bleed-out", definition: "MilSim rule that forces a hit player to lie wounded until a medic revives them or the timer expires." },
    { term: "Medic rule", definition: "Scenario mechanic where a designated player can revive teammates with a bandage, rag, or token." },
    { term: "CQB", definition: "Close Quarters Battle; indoor or urban gameplay at tight range with stricter FPS caps." },
    { term: "MilSim", definition: "Military Simulation; long-form realistic scenario with strict loadouts, limited ammo, and roleplay." },
    { term: "Skirmish", definition: "Casual short-format game with objective rounds, usually a few hours long." },
    { term: "DMR", definition: "Designated Marksman Rifle; semi-auto-only replica with a higher FPS cap for mid-range work." },
    { term: "Sniper / bolt-action", definition: "A high-FPS, bolt-operated spring rifle used for long-range engagements at or beyond MED." },
    { term: "Loadout", definition: "The player's full kit: primary, sidearm, rig, pouches, magazines, battery, and comms." },
    { term: "Hi-cap", definition: "High-capacity magazine (200–400+ BBs) wound by a spring; lightweight but rattles when shaken." },
    { term: "Mid-cap", definition: "Realistic-capacity magazine (30–150 BBs) with no winding, preferred for MilSim realism." },
    { term: "Real-cap / low-cap", definition: "Magazine holding the same round count as its real-steel counterpart, used for hardcore MilSim." },
    { term: "Hop-up", definition: "Adjustable unit in the barrel assembly that applies backspin to the BB to extend flat flight range." },
    { term: "Bucking", definition: "The rubber sleeve inside the hop-up that grips the BB and imparts spin; a common upgrade part." },
    { term: "R-hop", definition: "A hop-up modification installing a hard patch in the barrel window for consistent long-range spin." },
    { term: "Tightbore", definition: "Inner barrel with a reduced internal diameter (6.01–6.05 mm) used to improve accuracy." },
    { term: "Gearbox", definition: "The sealed mechanical drive of an AEG containing the motor, gears, piston, and spring." },
    { term: "V2 / V3 gearbox", definition: "Common AEG gearbox patterns; V2 fits M4/MP5/G3 receivers, V3 fits AK/G36/SCAR." },
    { term: "MOSFET", definition: "Transistor module wired into the trigger circuit to protect contacts and allow burst / AEG programming." },
    { term: "ETU", definition: "Electronic Trigger Unit; a programmable board replacing trigger contacts, often paired with a MOSFET." },
    { term: "LiPo", definition: "Lithium-polymer battery; compact, high-discharge, preferred for upgraded AEGs." },
    { term: "NiMH", definition: "Nickel–metal hydride battery; older, safer, slower trigger response than LiPo." },
    { term: "Green gas", definition: "Propane with silicone lubricant used in GBB replicas; moderate pressure, widely field-legal." },
    { term: "CO2", definition: "High-pressure cartridge gas used in GBB pistols and some rifles; performs better in cold weather." },
    { term: "ROF", definition: "Rate of Fire; how many BBs per second an AEG or HPA replica fires in full-auto." },
    { term: "RPS", definition: "Rounds Per Second; the same measure as ROF expressed per second." },
    { term: "Tracer unit", definition: "A barrel-mounted UV illuminator that charges tracer BBs so they glow in flight at night." },
    { term: "Tracer BB", definition: "A BB with a phosphorescent coating that glows green or red when excited by a tracer unit." },
    { term: "Pyro", definition: "Pyrotechnic grenades (Thunder-B, Enola Gaye) that simulate frags with sound or smoke." },
    { term: "Parley", definition: "A ceasefire call used to sort out disputes or escort an injured player off the field." },
    { term: "Overkill", definition: "Continuing to fire on an already-hit player; considered poor sportsmanship." },
    { term: "Impostor / cheater call", definition: "A marshal's call-out of a player who refuses to take hits (ignoring fire)." },
    { term: "Marshal / ref", definition: "Field staff enforcing safety rules, hit calls, and FPS limits during play." },
    { term: "Chrono line", definition: "The queue at which every replica is tested before the game starts." },
    { term: "Ammo budget", definition: "MilSim restriction on how many BBs a player may carry onto the field per life or per day." },
    { term: "Mag-fed / mag-dump", definition: "Mag-fed means only carrying loaded mags; mag-dump is emptying one at a target in full-auto." },
    { term: "Two-tone", definition: "UK legal finish for replicas sold to non-UKARA members; at least 51% of the replica is painted a bright colour." },
    { term: "UKARA", definition: "UK Airsoft Retailers Association database; registration allows purchase of fully black RIFs in the UK." },
    { term: "RIF / IF", definition: "Realistic Imitation Firearm / Imitation Firearm; UK legal categories for airsoft replicas." },
  ],
  brands: [
    { name: "Tokyo Marui", note: "Japanese manufacturer; considered the industry benchmark for AEG internals and GBB pistols." },
    { name: "VFC (Vega Force Company)", note: "Taiwanese maker of high-end GBB rifles and licensed replicas (HK, Avalon line)." },
    { name: "KWA", note: "Taiwanese/US brand producing robust GBB pistols and the RM4 AEG series." },
    { name: "G&G Armament", note: "Taiwanese brand covering entry to mid-tier AEGs; popular for the Combat Machine line." },
    { name: "KRYTAC", note: "US-designed, Taiwan-built Trident AEGs widely used straight out of the box." },
    { name: "ICS", note: "Taiwanese brand known for split-gearbox AEGs that open without removing internals from the receiver." },
    { name: "ASG (ActionSportGames)", note: "Danish distributor and licensee of CZ, Steyr, and Dan Wesson replicas." },
    { name: "Umarex / Elite Force", note: "German/US brands distributing licensed H&K, Walther, and Glock replicas." },
    { name: "Tokyo Marui Next-Gen Recoil Shock", note: "TM sub-line with simulated recoil and bolt lock-back on AEGs." },
    { name: "Systema", note: "Japanese maker of the PTW (Professional Training Weapon) platform used by training units." },
    { name: "WE-Tech", note: "Taiwanese brand specialising in GBB rifles and pistols across many licensed designs." },
    { name: "KJW (KJ Works)", note: "Taiwanese producer of affordable GBB pistols and rifles." },
    { name: "Classic Army", note: "Hong Kong veteran AEG brand; often co-branded with Ares." },
    { name: "ARES", note: "Taiwanese maker of the EFCS-equipped AEG lines (Amoeba, M4 Octa)." },
    { name: "LCT Airsoft", note: "Russian brand known for steel-bodied AK platform AEGs." },
    { name: "E&L Airsoft", note: "Chinese brand producing steel AK replicas that rival LCT in realism." },
    { name: "PolarStar", note: "US maker of the Fusion Engine (F1/Jack/Kythera) HPA drop-in systems." },
    { name: "Wolverine Airsoft", note: "US HPA engine maker (Inferno Gen 2, Reaper) and Bolt sniper platforms." },
    { name: "AIM Top", note: "Taiwanese upgrade-parts maker for AEG internals and custom builds." },
    { name: "Maxx Model", note: "Taiwanese hop-up unit manufacturer; Maxx ME/MI chambers are a professional standard." },
    { name: "Prometheus / Laylax", note: "Japanese high-end AEG upgrade parts brand; tightbore barrels and precision internals." },
    { name: "SHS / Rocket / ZCI", note: "Chinese budget-to-mid internal parts suppliers for gears, pistons, and cylinders." },
    { name: "Guarder", note: "Hong Kong GBB upgrade parts brand; steel slides, recoil buffers." },
    { name: "Silverback Airsoft", note: "Taiwanese maker of the SRS bolt-action sniper platform." },
    { name: "Novritsch", note: "Austrian founder-driven brand selling the SSG series and player apparel." },
    { name: "Crye Precision", note: "US tactical gear maker; JPC, AVS, and CPC plate carriers widely copied and worn in airsoft." },
    { name: "Multicam (Crye)", note: "Patented camouflage pattern adopted as a near-universal airsoft base camo." },
    { name: "Helikon-Tex", note: "Polish maker of mid-priced combat apparel and pouches." },
    { name: "First Spear", note: "US premium load-bearing gear maker for serious MilSim loadouts." },
    { name: "Ferro Concepts", note: "US plate carrier and belt maker popular in MARSOC-style loadouts." },
    { name: "Emerson Gear", note: "Chinese reproduction brand for Crye and Ferro-style rigs at lower cost." },
    { name: "HAO", note: "Chinese manufacturer of high-fidelity M4 conversion kits (Noveske, HK416, URGI)." },
    { name: "Octane Airsoft / Redline", note: "US HPA regulator and M-Vent brand used with PolarStar engines." },
    { name: "Tippmann", note: "US air-gun veteran whose M4 Carbine HPA rifle bridges paintball and airsoft." },
  ],
  techniques: [
    { name: "Close Quarters Battle (CQB)", description: "Room-clearing movement using angles of attack, slicing the pie, and controlled entries inside tight environments." },
    { name: "Slicing the pie", description: "Pivoting around a corner in narrow arcs to reveal threats one slice at a time without exposing the body." },
    { name: "Stacking", description: "Lining up on a door or corner in a stack formation so the team enters a room in a coordinated sequence." },
    { name: "Bounding overwatch", description: "Two elements advancing in turns: one moves while the other covers, alternating to cross open ground safely." },
    { name: "Flanking", description: "Sending a fire-team around the enemy's side while a second element fixes them in place with suppressive fire." },
    { name: "Suppressive fire", description: "Sustained inaccurate fire that forces the enemy to keep heads down while teammates manoeuvre." },
    { name: "Peek-shooting", description: "Stepping out of cover only long enough to fire, then returning; paired with angle changes to stay unpredictable." },
    { name: "Dead-side / strong-side corner", description: "Choosing whether to lean with the weapon-strong shoulder or swap shoulders to minimise exposed body mass." },
    { name: "Gun-fu / shoulder transition", description: "Switching the replica from the strong shoulder to the weak shoulder when shooting around the opposite corner." },
    { name: "Controlled pairs", description: "Firing two deliberate shots in quick succession per target, common on semi-auto-only nights." },
    { name: "Hop-up tuning", description: "Balancing BB weight, hop-up pressure, and barrel length so the BB flies flat and true at its furthest legal range." },
    { name: "Mag-change drills", description: "Practising fast reloads under cover; retain mid-caps, drop hi-caps, and reindex on target without looking." },
    { name: "Comms discipline", description: "Using short standard phrases ('contact front', 'moving', 'set') on the radio to keep channels clear." },
    { name: "Danger-close fire", description: "Moving and shooting within a few metres of teammates without muzzle-sweeping friendlies." },
    { name: "Ghillie stalking", description: "Low, slow movement in a full ghillie suit to infiltrate sniper positions undetected." },
    { name: "DMR overwatch", description: "Holding long-range lanes on semi-auto while the main element advances through the middle." },
    { name: "Bounding sniper pair", description: "A sniper and a spotter/rifleman leapfrog to cover each other as the sniper changes positions." },
    { name: "Grenading", description: "Cooking a pyrotechnic grenade for a count before a throw so players can't react in time to avoid it." },
    { name: "Chrono management", description: "Dialling back velocity for CQB days and tuning up for outdoor fields without crossing joule caps." },
    { name: "Chamber and hop maintenance", description: "Clearing dust from the hop-up nub and chamber regularly to keep BB flight consistent." },
    { name: "LiPo care", description: "Storing LiPos at storage voltage (~3.8 V/cell) and avoiding full discharge to extend pack life." },
    { name: "Troubleshoot by sound", description: "Diagnosing piston crack, air leak, or dead battery by listening to the cycle rather than stripping the gun in the field." },
    { name: "Radio net management", description: "Running a command net and a squad net on different channels so strategic and tactical traffic don't collide." },
  ],
  masters: [
    { name: "Novritsch (Julian Kulik)", note: "Austrian sniper-focused YouTuber whose content popularised airsoft to a global Gen-Z audience." },
    { name: "Evike.com Tom", note: "Face of Evike's YouTube channel; long-running event coverage and product reviews in the US scene." },
    { name: "DesertFox Airsoft", note: "Long-running US field-gameplay YouTuber and founder of DFA events." },
    { name: "Kristian 'Kriss' Silva", note: "Finnish/Swedish HPA sniper and builder featured in DesertFox and Novritsch collaborations." },
    { name: "Lonex / Matt Kline", note: "US tech and event-host figure central to the American East Coast MilSim scene." },
    { name: "OptimusPrime (PrimeTV)", note: "Influential French-speaking YouTuber covering competitive play and loadouts." },
    { name: "Shoobis / Trigger Happy", note: "Dutch YouTube team producing high-production long-form gameplay." },
    { name: "Jet DesertFox", note: "Co-host on DesertFox Airsoft; co-builder of multi-day MilSim events." },
    { name: "Fresh Airsoft", note: "Dutch YouTube channel with cinematic gameplay edits used as a reference for movement." },
    { name: "DutchTacticalGear (Kamiel)", note: "Dutch reviewer known for deep-dive loadout and gear breakdowns." },
    { name: "Fritz (RussianBias)", note: "Russian-American MilSim player and YouTuber focused on Eastern-bloc loadouts." },
    { name: "Kalashnikitten", note: "Female UK/US player and content creator prominent in women-in-airsoft community." },
    { name: "AirsoftGI (Jerry, Jay, Lucky)", note: "Hosts of the AirsoftGI channel; long-standing US industry voices." },
    { name: "Milsim West", note: "US MilSim event organisation whose multi-day operations are standard-bearers for realism." },
    { name: "Operation Lion Claws", note: "US MilSim event series credited with establishing long-form airsoft scenarios." },
    { name: "Fulda Gap / Bezirk", note: "European MilSim event series recognised as the benchmark for Cold-War-themed play." },
    { name: "Team Airsoft Rangers (Japan)", note: "One of Japan's earliest competitive teams; influential in shaping Japanese CQB play." },
    { name: "Polenar Tactical", note: "Slovenian shooting-instructor crew whose airsoft CQB videos are studied for technique." },
  ],
};

async function upsert(p: Payload) {
  const [activity] = await db
    .select({ id: schema.activities.id })
    .from(schema.activities)
    .where(eq(schema.activities.slug, p.slug))
    .limit(1);
  if (!activity) {
    console.error(`Activity "${p.slug}" not found; skipping.`);
    return;
  }

  await db
    .update(schema.activities)
    .set({ description: p.description })
    .where(eq(schema.activities.id, activity.id));

  await db.delete(schema.tools).where(eq(schema.tools.activityId, activity.id));
  if (p.tools.length > 0) {
    await db.insert(schema.tools).values(
      p.tools.map((name, i) => ({ activityId: activity.id, name, position: i }))
    );
  }

  await db
    .delete(schema.glossaryTerms)
    .where(eq(schema.glossaryTerms.activityId, activity.id));
  if (p.glossary.length > 0) {
    await db.insert(schema.glossaryTerms).values(
      p.glossary.map((g, i) => ({
        activityId: activity.id,
        term: g.term,
        definition: g.definition,
        position: i,
      }))
    );
  }

  await db.delete(schema.brands).where(eq(schema.brands.activityId, activity.id));
  if (p.brands.length > 0) {
    await db.insert(schema.brands).values(
      p.brands.map((b, i) => ({
        activityId: activity.id,
        name: b.name,
        note: b.note ?? "",
        position: i,
      }))
    );
  }

  await db
    .delete(schema.techniques)
    .where(eq(schema.techniques.activityId, activity.id));
  if (p.techniques.length > 0) {
    await db.insert(schema.techniques).values(
      p.techniques.map((t, i) => ({
        activityId: activity.id,
        name: t.name,
        description: t.description ?? "",
        position: i,
      }))
    );
  }

  await db.delete(schema.masters).where(eq(schema.masters.activityId, activity.id));
  if (p.masters.length > 0) {
    await db.insert(schema.masters).values(
      p.masters.map((m, i) => ({
        activityId: activity.id,
        name: m.name,
        note: m.note ?? "",
        position: i,
      }))
    );
  }

  console.log(
    `Seeded ${p.slug}: ${p.tools.length} tools, ${p.glossary.length} glossary, ${p.brands.length} brands, ${p.techniques.length} techniques, ${p.masters.length} masters`
  );
}

async function main() {
  await upsert(cakeCarving);
  await upsert(airsoft);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
