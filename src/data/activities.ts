export type ActivityData = {
  name: string;
  category: string;
  icon: string;
  tools: string[];
  glossary: Record<string, string>;
};

export const DATA: ActivityData[] = [
  {
    name: "3D Printing",
    category: "Making & Tech",
    icon: "",
    tools: ["FDM/SLA/SLS printer", "Filament (PLA, PETG, ABS, TPU)", "Slicer software (Cura, PrusaSlicer)", "Bed adhesive", "Calipers", "Spatula/scraper", "Deburring tool", "Post-processing sandpaper", "Resin (for SLA)", "UV curing lamp"],
    glossary: {
      "FDM": "Fused Deposition Modeling – melts filament layer by layer",
      "SLA": "Stereolithography – UV resin cured by a laser",
      "Slicer": "Software that converts 3D models into printer instructions (G-code)",
      "Infill": "Internal structure density of a printed object (0–100%)",
      "Layer height": "Thickness of each printed layer; lower = more detail",
      "Supports": "Temporary structures holding up overhangs during printing",
      "Retraction": "Filament pulled back to prevent stringing",
      "Bed leveling": "Ensuring the print surface is perfectly flat",
      "Overhang": "Part of a model that extends beyond its base without support below",
      "G-code": "Machine instructions sent to the printer",
      "Stringing": "Thin threads of plastic between parts from oozing filament",
      "PETG": "Polyethylene terephthalate glycol – strong, food-safe filament"
    }
  },
  {
    name: "Acroyoga",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Yoga mat", "Spotter", "Comfortable stretch clothing", "Open flat space", "Crash mat (for advanced work)"],
    glossary: {
      "Base": "Person on the ground supporting the flyer",
      "Flyer": "Person lifted in the air",
      "Spotter": "Third person ensuring safety",
      "Washing machine": "Dynamic sequence of flowing transitions",
      "Star": "Flyer balanced on base's hands and feet, arms and legs extended",
      "Throne": "Flyer seated on base's feet",
      "L-basing": "Base lying on back with legs vertical supporting flyer",
      "Standing acro": "Base standing and lifting flyer"
    }
  },
  {
    name: "Acting",
    category: "Performing Arts",
    icon: "",
    tools: ["Script", "Monologue material", "Acting coach", "Mirror", "Recording device", "Headshots", "Resume template", "Scene partners"],
    glossary: {
      "Monologue": "Solo speech performed by one actor",
      "Cold reading": "Performing a script without prior preparation",
      "Blocking": "Physical movement choreography on stage",
      "Motivation": "Character's internal reason for their actions",
      "Subtext": "Meaning beneath the spoken words",
      "The Method": "Stanislavski-based technique emphasizing emotional truth",
      "Upstage": "The back portion of the stage",
      "Downstage": "The front of the stage closest to the audience",
      "Slate": "Actor stating their name before an audition take",
      "Callback": "Second audition invitation after initial casting"
    }
  },
  {
    name: "Action Figures",
    category: "Collecting",
    icon: "",
    tools: ["Display cases", "UV-protective cases", "Cotton gloves", "Soft brushes", "Acrylic risers", "Figure stands", "Price guides"],
    glossary: {
      "MOC": "Mint On Card – still sealed in original packaging",
      "MIB": "Mint In Box – complete in original box",
      "Loose": "Out of original packaging",
      "Articulation": "Number of poseable joints on a figure",
      "Scale": "Size ratio (1:6, 1:12, etc.) relative to real life",
      "Variant": "Alternate version of a figure (different color, accessories)",
      "Repaint": "Same figure mold released with different paint scheme",
      "Kitbash": "Figure built combining parts from different figures"
    }
  },
  {
    name: "Airsoft",
    category: "Sports",
    icon: "",
    tools: ["AEG/GBB/spring gun", "BBs (0.20g–0.45g)", "Eye protection (ANSI rated)", "Face mask", "Tactical vest/gear", "Battery & charger", "Speed loader", "Chrono (velocity meter)"],
    glossary: {
      "AEG": "Automatic Electric Gun – battery-powered automatic",
      "GBB": "Gas Blowback – uses compressed gas with realistic recoil",
      "FPS": "Feet Per Second – BB velocity measurement",
      "Hop-up": "Backspin mechanism improving range and accuracy",
      "MED": "Minimum Engagement Distance for high-powered guns",
      "CQB": "Close Quarters Battle – indoor/tight-space gameplay",
      "Speedsoft": "Fast-paced competitive airsoft style",
      "Safe zone": "Non-combat area where magazines must be removed"
    }
  },
  {
    name: "Animation",
    category: "Arts & Media",
    icon: "",
    tools: ["Drawing tablet (Wacom, iPad)", "Animation software (Animate, Toon Boom, Blender)", "Light box", "Pencils & paper", "Peg bar", "Frame-by-frame reference", "Color palette tools"],
    glossary: {
      "Keyframe": "Major pose defining the start/end of a motion",
      "Inbetween": "Frames drawn between keyframes for smooth motion",
      "Squash & stretch": "Exaggerating form to convey weight and flexibility",
      "Anticipation": "Small opposite motion before a main action",
      "Follow-through": "Continuation of motion after main action stops",
      "12 principles": "Disney's foundational animation guidelines",
      "Tweening": "Software auto-generating frames between keyframes",
      "FPS": "Frames per second – animation playback rate",
      "Rigging": "Creating a skeleton system for character movement"
    }
  },
  {
    name: "Ant Keeping",
    category: "Animals & Nature",
    icon: "",
    tools: ["Formicarium (ant farm)", "Test tube setup", "Outworld (foraging area)", "Forceps", "Humidity gauge", "Heating mat", "Feeding dishes", "Escape prevention (Fluon/PTFE)"],
    glossary: {
      "Queen": "Reproductive female that starts and leads the colony",
      "Brood": "Eggs, larvae, and pupae collectively",
      "Formicarium": "Artificial nest housing for ant colony",
      "Outworld": "External foraging area connected to the nest",
      "Nanitics": "First small workers produced by a new queen",
      "Alate": "Winged reproductive ant (future queens/males)",
      "Nuptial flight": "Mating swarm of winged ants",
      "Fluon": "Slippery coating preventing ant escape"
    }
  },
  {
    name: "Antiquing & Artefacts",
    category: "Collecting",
    icon: "",
    tools: ["UV light (blacklight)", "Magnifying loupe", "Price guides", "White gloves", "Soft cloth", "Reference books", "Authentication certificates"],
    glossary: {
      "Provenance": "Documented ownership history of an item",
      "Patina": "Natural aging finish on metals and wood",
      "Attribution": "Identifying who made or owned an item",
      "Hallmark": "Official stamp indicating metal purity/maker",
      "Auction estimate": "Dealer's predicted sale price range",
      "Period piece": "Item actually made during its claimed historical era",
      "Repro": "Reproduction – modern copy of an antique",
      "Sleeper": "Valuable item sold cheaply due to being unrecognized"
    }
  },
  {
    name: "Aquascaping",
    category: "Animals & Nature",
    icon: "",
    tools: ["Aquarium tank", "CO2 system", "Planted tank substrate (ADA Amazonia)", "Fertilizers", "Aquascape scissors & tweezers", "Filter", "LED grow light", "Hardscape (rocks, driftwood)"],
    glossary: {
      "Iwagumi": "Japanese minimalist aquascape using only rocks",
      "Dutch style": "Dense, organized colorful plant arrangements",
      "Nature aquarium": "Takashi Amano's style mimicking natural scenes",
      "Hardscape": "Non-living decorative elements (rocks, wood)",
      "Carpeting plant": "Low-growing ground cover plant",
      "Dry start": "Growing plants emersed before flooding tank",
      "NO3/PO4": "Nitrate and phosphate – key plant nutrients",
      "Crypts": "Cryptocoryne – popular low-light aquarium plants"
    }
  },
  {
    name: "Archery",
    category: "Sports",
    icon: "",
    tools: ["Recurve/compound/longbow", "Arrows (carbon/aluminum/wood)", "Quiver", "Arm guard", "Finger tab or release aid", "Target face", "Arrow rest", "Bow stringer", "Stabilizer"],
    glossary: {
      "Draw weight": "Force (in lbs) required to pull bow to full draw",
      "Draw length": "Distance from grip to full draw position",
      "Nocking point": "Marked position where arrow clips onto string",
      "Anchor point": "Consistent face position at full draw",
      "Fletching": "Vanes or feathers that stabilize arrow flight",
      "Spine": "Arrow shaft stiffness rating",
      "Release": "Mechanical device releasing bowstring for compound bows",
      "Peep sight": "Small ring in bowstring used for aiming",
      "Grouping": "How close arrows land to each other"
    }
  },
  {
    name: "Astrology",
    category: "Spiritual & Mystical",
    icon: "",
    tools: ["Birth chart software (Astro.com)", "Ephemeris", "Astrology journals", "Planetary symbol reference", "Aspect grid"],
    glossary: {
      "Natal chart": "Map of planetary positions at time of birth",
      "Rising sign": "Zodiac sign rising on the eastern horizon at birth",
      "House": "One of 12 sections of the birth chart",
      "Aspect": "Angular relationship between planets",
      "Transit": "Current planetary movement in relation to natal chart",
      "Retrograde": "Planet appearing to move backward in the sky",
      "Stellium": "Three or more planets in the same sign/house",
      "Conjunction": "Two planets at the same degree"
    }
  },
  {
    name: "Astronomy",
    category: "Science",
    icon: "",
    tools: ["Telescope (refractor/reflector/SCT)", "Eyepieces", "Star atlas", "Red flashlight", "Mount (alt-az/equatorial)", "Finder scope", "Astrophotography camera", "Barlow lens", "Planetarium app"],
    glossary: {
      "Aperture": "Diameter of telescope's light-gathering lens/mirror",
      "Magnification": "How much larger an object appears",
      "Focal length": "Distance light travels through telescope to form image",
      "Alt-Az mount": "Mount moving up-down and left-right",
      "Equatorial mount": "Mount aligned to Earth's rotation axis",
      "Seeing": "Atmospheric stability affecting image quality",
      "Dark adaptation": "Eye adjusting to darkness for better night vision",
      "Messier object": "Famous catalog of deep-sky objects",
      "Light pollution": "Artificial light obscuring faint celestial objects"
    }
  },
  {
    name: "Audiophile",
    category: "Music & Audio",
    icon: "",
    tools: ["Amplifier", "DAC (digital-to-analog converter)", "Headphones (open/closed back)", "Speakers", "Speaker cables", "RCA interconnects", "Record player", "Phono preamp", "Acoustic treatment panels"],
    glossary: {
      "DAC": "Digital-to-Analog Converter – turns digital signal to audio",
      "Impedance": "Resistance (ohms) of headphones/speakers to current",
      "Sensitivity": "How loud a headphone gets per milliwatt input",
      "Soundstage": "Perceived width and depth of audio imaging",
      "Imaging": "Ability to pinpoint instrument positions in a recording",
      "Burn-in": "Breaking in new drivers through extended use",
      "Planar magnetic": "Headphone driver type with flat diaphragm",
      "Tube amp": "Amplifier using vacuum tubes for warm distortion",
      "FLAC": "Lossless audio file format preserving all audio data"
    }
  },
  {
    name: "Auto Detailing",
    category: "Automotive",
    icon: "",
    tools: ["Foam cannon", "Pressure washer", "Dual-action polisher", "Microfiber towels", "Clay bar", "Iron remover", "Ceramic coating", "Car wax", "Interior detailing brushes", "Wet/dry vacuum"],
    glossary: {
      "Swirl marks": "Fine circular scratches from improper washing",
      "Paint correction": "Machine polishing to remove scratches",
      "Ceramic coating": "Liquid polymer forming semi-permanent protection",
      "PPF": "Paint Protection Film – clear wrap protecting paint",
      "Detailing clay": "Clay bar removing bonded contaminants",
      "Decontamination": "Removing iron particles, tar, and fallout",
      "Single stage paint": "Older paint without separate clear coat layer",
      "Two-stage paint": "Modern base coat + clear coat system",
      "Water spots": "Mineral deposits left from evaporated water"
    }
  },
  {
    name: "Auto Racing",
    category: "Motorsports",
    icon: "",
    tools: ["Race helmet", "HANS device", "Racing suit (Nomex)", "Gloves & boots", "Racing harness", "Roll cage", "Fire suppression system", "Data logger", "Racing tires"],
    glossary: {
      "Understeer": "Car turning less than steering input (pushing wide)",
      "Oversteer": "Rear of car sliding outward (loose handling)",
      "Apex": "Inner point of a corner",
      "Trail braking": "Maintaining brake pressure while initiating a turn",
      "Slip angle": "Angle between wheel direction and actual travel",
      "Drafting": "Following closely to reduce aerodynamic drag",
      "DRS": "Drag Reduction System – adjustable rear wing for overtaking",
      "Pit window": "Optimal lap range for a tire change"
    }
  },
  {
    name: "Axe Throwing",
    category: "Sports",
    icon: "",
    tools: ["Throwing axes (single/double bit)", "Target (wood rounds)", "Lane markers", "Measuring tape", "Axes sharpening stone"],
    glossary: {
      "Double bit": "Axe with two blades on opposite sides",
      "Release point": "Moment the axe leaves the hand during throw",
      "Rotation": "Number of spins axe makes before hitting target",
      "Bullseye": "Center scoring zone of target",
      "No-spin throw": "Technique minimizing axe rotation",
      "WATL": "World Axe Throwing League – governing body",
      "Killshot": "High-risk high-reward narrow blue target zone"
    }
  },
  {
    name: "Backgammon",
    category: "Board Games",
    icon: "",
    tools: ["Backgammon board", "15 checkers per player", "2 pairs of dice", "Doubling cube", "Dice cup"],
    glossary: {
      "Pip": "Single unit of movement",
      "Doubling cube": "Cube used to raise game stakes",
      "Blot": "Single checker vulnerable to being hit",
      "Hit": "Landing on opponent's blot, sending it to the bar",
      "Prime": "Six consecutive made points blocking opponent",
      "Gammon": "Winning before opponent bears off any pieces",
      "Backgame": "Defensive strategy holding opponent's home board",
      "Bear off": "Removing checkers from board in final phase"
    }
  },
  {
    name: "Backpacking",
    category: "Outdoors",
    icon: "",
    tools: ["Backpack (50–70L)", "Tent/tarp", "Sleeping bag", "Sleeping pad", "Water filter (Sawyer Squeeze, Katadyn)", "Trekking poles", "Navigation (map, compass, GPS)", "Stove & fuel", "First aid kit", "Bear canister/hang bag"],
    glossary: {
      "Base weight": "Pack weight excluding consumables (food, water, fuel)",
      "UL": "Ultralight – sub-10lb base weight philosophy",
      "SUL": "Super ultralight – sub-5lb base weight",
      "Thru-hike": "Walking a long trail end-to-end in one continuous journey",
      "Resupply": "Replenishing food and supplies mid-trail",
      "LNT": "Leave No Trace – environmental ethics principles",
      "Cat hole": "Small hole dug for human waste disposal",
      "Bivy": "Minimalist sleeping shelter (bivouac)",
      "Topo map": "Topographic map showing elevation contours"
    }
  },
  {
    name: "Badminton",
    category: "Racket Sports",
    icon: "",
    tools: ["Racket", "Shuttlecocks (feather/nylon)", "Court shoes", "Net", "Stringing machine", "Overgrip", "Wristband"],
    glossary: {
      "Shuttlecock": "The feathered or plastic projectile used in play",
      "Clear": "High deep shot to opponent's back court",
      "Smash": "Powerful downward attacking shot",
      "Drop shot": "Soft shot falling steeply near the net",
      "Net kill": "Aggressive shot taken right at the net",
      "Drive": "Flat fast shot hit horizontally",
      "Lift": "High shot sending shuttle to opponent's back court",
      "Service fault": "Illegal serve (too high, wrong position, etc.)"
    }
  },
  {
    name: "Baking",
    category: "Food & Drink",
    icon: "",
    tools: ["Stand mixer", "Kitchen scale", "Measuring cups & spoons", "Rolling pin", "Bench scraper", "Silicone molds", "Baking pans", "Pastry brush", "Thermometer", "Cooling rack", "Piping bags"],
    glossary: {
      "Proof": "Yeast dough's final rise before baking",
      "Lamination": "Folding butter into dough for flaky layers",
      "Autolyse": "Resting flour and water before adding other ingredients",
      "Maillard reaction": "Browning chemical reaction at high heat",
      "Blind bake": "Pre-baking pie crust before filling",
      "Fold": "Gentle mixing technique to preserve air bubbles",
      "Crumb": "Internal texture structure of baked bread",
      "Oven spring": "Rapid rise when dough first enters oven"
    }
  },
  {
    name: "Beekeeping",
    category: "Animals & Nature",
    icon: "",
    tools: ["Langstroth hive", "Bee suit & veil", "Smoker", "Hive tool", "Frame grip", "Queen excluder", "Honey extractor", "Uncapping knife", "Feeders"],
    glossary: {
      "Queen": "Single reproductive female running the colony",
      "Drone": "Male bee whose sole purpose is mating",
      "Worker": "Infertile female doing all colony labor",
      "Brood": "Developing eggs, larvae, pupae in comb",
      "Swarm": "Colony splitting and leaving to form new hive",
      "Supersedure": "Colony replacing old queen with new one",
      "Propolis": "Resin bees use to seal hive gaps",
      "Varroa": "Destructive parasitic mite infesting colonies",
      "Flow hive": "Modern hive with tap-able honey extraction system"
    }
  },
  {
    name: "Billiards / Pool",
    category: "Sports",
    icon: "",
    tools: ["Pool cue", "Cue chalk", "Rack (triangle/diamond)", "Bridge stick", "Billiard balls (set)", "Pool table brush"],
    glossary: {
      "Cue ball": "The white ball struck by the cue",
      "Break shot": "Opening shot scattering racked balls",
      "English": "Sidespin applied to the cue ball",
      "Draw": "Backspin causing cue ball to roll backward after contact",
      "Follow": "Topspin causing cue ball to roll forward after contact",
      "Masse": "Extreme curve shot using very angled cue",
      "Safety": "Defensive shot leaving opponent in a bad position",
      "Scratch": "Cue ball pocketed illegally",
      "Bank shot": "Ball rebounding off a rail before pocketing"
    }
  },
  {
    name: "Birdwatching",
    category: "Animals & Nature",
    icon: "",
    tools: ["Binoculars (8x42 recommended)", "Field guide (Peterson, Sibley)", "eBird app", "Notebook", "Camera with telephoto lens", "Scope (for distant viewing)", "Birding hat"],
    glossary: {
      "Lifer": "A species seen for the very first time",
      "Pishing": "Making sounds to attract birds from cover",
      "Jizz": "Overall impression of a bird before detail identification",
      "Vagrant": "Bird far outside its normal range",
      "Twitching": "Traveling specifically to see a rare bird",
      "LBJ": "Little Brown Job – hard-to-identify small brown bird",
      "Big year": "Attempt to see as many species as possible in one year",
      "Pelagic": "Open ocean birding trip"
    }
  },
  {
    name: "Blacksmithing",
    category: "Making & Crafts",
    icon: "",
    tools: ["Forge (coal/propane/induction)", "Anvil", "Hammer (cross peen, rounding)", "Tongs", "Hardy tools", "Slack tub (water quench)", "Swage block", "Punch & drift", "Angle grinder"],
    glossary: {
      "Heat treatment": "Controlled heating/cooling to change steel properties",
      "Quench": "Rapidly cooling hot metal in water/oil",
      "Temper": "Reheating quenched steel to reduce brittleness",
      "Drawing out": "Stretching metal longer and thinner",
      "Upsetting": "Compressing metal to make it shorter and thicker",
      "Forge welding": "Joining two pieces of metal under heat and hammer",
      "Scale": "Iron oxide flakes forming on heated steel",
      "Stock": "Bar of raw metal before shaping",
      "Hardy hole": "Square hole in anvil for holding tools"
    }
  },
  {
    name: "Board Games",
    category: "Games",
    icon: "",
    tools: ["Game boards", "Dice sets", "Player tokens", "Card sleeves", "Organizer inserts", "Rule reference cards", "Score pads", "Timer"],
    glossary: {
      "Euro game": "Strategy game emphasizing resource management over conflict",
      "Ameritrash": "Thematic game with lots of luck and combat",
      "Worker placement": "Mechanic where players place tokens to claim actions",
      "Deck building": "Players build card hands from expanding pool",
      "Hidden role": "Game where some players have secret identities",
      "Alpha gamer": "Player who tells others what moves to make",
      "Analysis paralysis": "Being unable to decide due to too many options",
      "Solo mode": "Rules allowing the game to be played alone"
    }
  },
  {
    name: "Bodybuilding",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Barbell & plates", "Dumbbells", "Cable machine", "Resistance bands", "Gym belt", "Wrist wraps", "Meal prep containers", "Kitchen scale", "Protein shaker"],
    glossary: {
      "Hypertrophy": "Muscle growth through training stimulus",
      "Progressive overload": "Gradually increasing training stress over time",
      "Cut": "Caloric deficit phase to lose fat while preserving muscle",
      "Bulk": "Caloric surplus phase to gain muscle mass",
      "Recomp": "Simultaneously gaining muscle and losing fat",
      "Compound lift": "Multi-joint exercise (squat, bench, deadlift)",
      "Isolation exercise": "Single-joint movement targeting specific muscle",
      "DOMS": "Delayed Onset Muscle Soreness appearing 24–48hrs post-workout",
      "1RM": "One Rep Max – maximum weight for a single repetition"
    }
  },
  {
    name: "Bonsai",
    category: "Gardening",
    icon: "",
    tools: ["Bonsai scissors", "Wire cutters", "Concave cutters", "Bonsai wire (aluminum/copper)", "Bonsai soil (akadama, pumice, lava rock)", "Training pots", "Root hook", "Jin pliers"],
    glossary: {
      "Nebari": "Surface root spread at base of trunk",
      "Ramification": "Development of fine branch structure",
      "Jin": "Deadwood on a branch created by stripping bark",
      "Shari": "Deadwood on the trunk",
      "Literati (Bunjin)": "Slender elegant style with minimal foliage",
      "Yamadori": "Wild-collected tree dug from nature",
      "Canopy": "The overall foliage mass shape",
      "Deciduous": "Trees losing leaves seasonally (maple, elm)",
      "Repotting": "Refreshing soil and root-pruning to maintain size"
    }
  },
  {
    name: "Book Collecting",
    category: "Collecting",
    icon: "",
    tools: ["Mylar book covers", "Acid-free boxes", "White cotton gloves", "Bookends", "Price guides (Collected Books by Allen & Patricia Ahearn)", "UV light", "Magnifying loupe"],
    glossary: {
      "First edition": "The first printing of a book",
      "Dust jacket": "Removable paper wrapper protecting book covers",
      "Points": "Identifying characteristics distinguishing first editions",
      "Ex-libris": "Book previously owned by a library",
      "Foxing": "Brown spots on aged paper from mold/oxidation",
      "Provenance": "Record of a book's ownership history",
      "Inscribed": "Signed with a personal message from the author",
      "Fine": "Highest condition grade – as close to new as possible"
    }
  },
  {
    name: "Bowling",
    category: "Sports",
    icon: "",
    tools: ["Bowling ball (reactive resin/urethane/plastic)", "Bowling shoes", "Thumb slug", "Grip tape", "Rosin bag", "Finger inserts", "Ball bag"],
    glossary: {
      "Strike": "Knocking all 10 pins on first ball",
      "Spare": "Knocking remaining pins on second ball",
      "Turkey": "Three consecutive strikes",
      "Split": "Remaining pins with gap between them",
      "Brooklyn": "Ball crossing to opposite side of the head pin",
      "Pocket": "Ideal entry point between pins 1 and 3 (right-handed)",
      "Hook": "Curved path the ball takes at the end of its path",
      "Rev rate": "Revolutions per minute of the ball's spin",
      "Axis tilt": "Angle of the ball's spin axis"
    }
  },
  {
    name: "Boxing",
    category: "Martial Arts & Combat",
    icon: "",
    tools: ["Boxing gloves", "Hand wraps", "Heavy bag", "Speed bag", "Jump rope", "Headgear", "Mouthguard", "Body protector", "Sparring mitts"],
    glossary: {
      "Jab": "Quick straight punch with lead hand",
      "Cross": "Powerful straight punch with rear hand",
      "Hook": "Punch with bent elbow swinging horizontally",
      "Uppercut": "Punch driving upward into chin or body",
      "Southpaw": "Left-handed boxer (leads with right hand)",
      "Clinch": "Holding opponent to stop their punches",
      "Slip": "Moving head to avoid a punch",
      "Bob and weave": "Defensive movement ducking under punches",
      "Counterpunch": "Punch thrown immediately in response to opponent's attack"
    }
  },
  {
    name: "Brazilian Jiu-Jitsu",
    category: "Martial Arts & Combat",
    icon: "",
    tools: ["Gi (kimono)", "Belt", "No-gi rashguard & shorts", "Grappling dummy", "Mat space", "Mouth guard"],
    glossary: {
      "Guard": "Defensive position with legs controlling opponent",
      "Mount": "Controlling opponent from top, straddling their chest",
      "Submission": "Technique forcing opponent to tap out",
      "Sweep": "Reversing position from bottom to top",
      "Pass": "Moving around opponent's guard to side control",
      "Armbar": "Joint lock hyperextending the elbow",
      "Rear naked choke": "Choke applied from behind around the neck",
      "Triangle choke": "Leg-based choke squeezing neck and arm",
      "Berimbolo": "Inverted spinning guard pass technique"
    }
  },
  {
    name: "Breadmaking",
    category: "Food & Drink",
    icon: "",
    tools: ["Dutch oven", "Bench scraper", "Banneton (proofing basket)", "Lame (scoring blade)", "Kitchen scale", "Dough thermometer", "Stand mixer with dough hook", "Bread pan"],
    glossary: {
      "Sourdough starter": "Wild yeast culture used to leaven bread",
      "Autolyse": "Rest period for flour and water before other ingredients",
      "Hydration": "Water percentage relative to flour weight",
      "Bulk fermentation": "First long rise of the dough",
      "Shaping": "Forming the final loaf structure",
      "Scoring": "Cutting patterns in dough before baking",
      "Crumb": "Internal hole structure of baked bread",
      "Gluten": "Protein network giving bread structure and chew",
      "Levain": "Portion of starter used to leaven a dough"
    }
  },
  {
    name: "Bullet Journaling",
    category: "Lifestyle & Organization",
    icon: "",
    tools: ["Dotted notebook (Leuchtturm1917, Rhodia)", "Fine-liner pens (Micron, Staedtler)", "Brush pens", "Ruler", "Washi tape", "Stencils", "Highlighters", "Stamps"],
    glossary: {
      "Rapid logging": "Quick capture system using symbols for tasks/events/notes",
      "Index": "Table of contents for navigating the journal",
      "Future log": "Overview of upcoming months",
      "Monthly log": "Month-at-a-glance calendar and task list",
      "Daily log": "Day-by-day task and note capture",
      "Migration": "Moving uncompleted tasks forward to new period",
      "Collections": "Special topic pages (habit trackers, reading lists, etc.)",
      "Signifier": "Symbol denoting task priority or type"
    }
  },
  {
    name: "Calisthenics",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Pull-up bar", "Parallel bars", "Gymnastics rings", "Resistance bands", "Dip bars", "Parallettes", "Chalk"],
    glossary: {
      "Planche": "Horizontal hold with body parallel to ground supported by arms",
      "Front lever": "Horizontal hold hanging from a bar, body facing up",
      "Back lever": "Horizontal hold hanging from a bar, body facing down",
      "Human flag": "Horizontal hold gripping a vertical pole",
      "Muscle up": "Explosive pull-up transitioning above the bar",
      "L-sit": "Holding body with legs horizontal while supported on arms",
      "Scapular pull": "Raising and lowering shoulder blades while hanging",
      "Hollow body": "Foundational position with core braced and lower back flat"
    }
  },
  {
    name: "Calligraphy",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Dip pen nib (Nikko G, Zebra G)", "Nib holder", "Ink (sumi, iron gall)", "Practice sheets", "Light pad", "Pointed/broad brush", "Watercolor for flourishing", "Guide sheets"],
    glossary: {
      "Ascender": "Stroke extending above the main body of a letter",
      "Descender": "Stroke extending below the baseline",
      "Hairline": "Thin stroke made with minimal pressure",
      "Shade": "Thick stroke made with increased nib pressure",
      "Letterform": "The specific shape structure of each letter",
      "Flourish": "Decorative swirling extension of a letterform",
      "Slant angle": "Angle at which letters are written (typically 52–55°)",
      "x-height": "Height of lowercase letters without ascenders/descenders"
    }
  },
  {
    name: "Camping",
    category: "Outdoors",
    icon: "",
    tools: ["Tent", "Sleeping bag", "Sleeping pad", "Camp stove", "Fuel canister", "Headlamp", "Cooler", "Tarp", "Camp chairs", "Fire starter", "Multi-tool"],
    glossary: {
      "Car camping": "Camping with vehicle access to campsite",
      "Dispersed camping": "Camping on public land without designated site",
      "Leave No Trace": "Principles minimizing environmental impact",
      "Guy lines": "Ropes staking out tent or tarp",
      "Cowboy camping": "Sleeping under the stars without a tent",
      "Hammock camping": "Using a hammock instead of tent",
      "Bear box": "Metal food storage container at campsites"
    }
  },
  {
    name: "Candle Making",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Wax (soy, paraffin, beeswax)", "Candle wicks", "Fragrance/essential oils", "Dye chips", "Melting pot", "Thermometer", "Pour pitcher", "Molds/jars", "Wick centering tool"],
    glossary: {
      "Flash point": "Temperature at which fragrance oil can ignite",
      "Fragrance load": "Maximum percentage of scent oil wax can hold",
      "Cold throw": "Scent strength of unlit candle",
      "Hot throw": "Scent strength when candle is burning",
      "Melt pool": "Puddle of melted wax during burning",
      "Tunneling": "Wick burning straight down leaving wax on sides",
      "Mushrooming": "Carbon buildup forming a mushroom shape on wick tip",
      "Cure time": "Resting period after pouring for best scent throw"
    }
  },
  {
    name: "Canoeing",
    category: "Water Sports",
    icon: "",
    tools: ["Canoe", "Paddle (single blade)", "PFD (life jacket)", "Helmet (whitewater)", "Dry bags", "Throw bag", "Kneeling pad", "Bow line"],
    glossary: {
      "Gunwale": "Top edge of canoe hull",
      "Portage": "Carrying canoe overland between waterways",
      "J-stroke": "Corrective stroke keeping canoe on course solo",
      "Draw stroke": "Moving canoe sideways toward paddle",
      "Eddy": "Calm water behind an obstacle in current",
      "Ferry angle": "Angling canoe to cross current efficiently",
      "Thwart": "Structural cross brace in canoe"
    }
  },
  {
    name: "Car Tuning",
    category: "Automotive",
    icon: "",
    tools: ["OBD scanner", "ECU tuning software", "Laptop with tuning interface", "Wideband O2 sensor", "Boost gauge", "Dyno (dynamometer)", "Air/fuel ratio meter"],
    glossary: {
      "ECU": "Engine Control Unit – the car's brain computer",
      "Remap": "Reprogramming ECU parameters for more power",
      "Boost": "Positive intake pressure from a turbocharger",
      "Wastegate": "Valve controlling turbo boost pressure",
      "AFR": "Air-Fuel Ratio – mixture of air to fuel",
      "Dyno": "Machine measuring engine power output",
      "Stage 1/2/3": "Levels of modification intensity",
      "Turbo lag": "Delay before turbocharger spools up and provides boost"
    }
  },
  {
    name: "Ceramics & Pottery",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Potter's wheel", "Clay (stoneware, earthenware, porcelain)", "Kiln", "Trimming tools", "Needle tool", "Sponge", "Wire cutter", "Ribs", "Glaze & brushes"],
    glossary: {
      "Throwing": "Creating forms on a spinning potter's wheel",
      "Centering": "Aligning clay at the center of the spinning wheel",
      "Bisque firing": "First kiln firing before glazing",
      "Glaze firing": "Second firing melting glaze onto bisqueware",
      "Slip": "Liquid clay used for joining or decoration",
      "Wedging": "Kneading clay to remove air bubbles",
      "Greenware": "Unfired, bone-dry clay piece",
      "Leather hard": "Clay dried enough to handle but still carveable",
      "Sgraffito": "Decorative technique scratching through surface layer"
    }
  },
  {
    name: "Chess",
    category: "Board Games",
    icon: "",
    tools: ["Chess board & pieces", "Chess clock", "Notation pad", "Chess engine (Stockfish)", "Opening database", "Chess.com/Lichess account"],
    glossary: {
      "Gambit": "Sacrificing material for positional advantage",
      "Fork": "Single piece attacking two opponent pieces simultaneously",
      "Pin": "Piece unable to move without exposing valuable piece behind it",
      "Skewer": "Attack through a valuable piece to one behind it",
      "Zwischenzug": "Unexpected intermediate move interrupting expected sequence",
      "En passant": "Special pawn capture rule",
      "Castling": "King moving two squares toward rook simultaneously",
      "Fianchetto": "Bishop developed to long diagonal via g or b pawn",
      "Tempo": "A unit of time – moving with gain or loss of tempo"
    }
  },
  {
    name: "Rock Climbing",
    category: "Outdoors & Sports",
    icon: "",
    tools: ["Climbing shoes", "Harness", "Belay device (ATC, GriGri)", "Locking carabiners", "Chalk bag", "Rope (dynamic)", "Quickdraws", "Cams & nuts (trad)", "Helmet", "Crash pad (bouldering)"],
    glossary: {
      "Lead climbing": "Climber clips rope to protection as they ascend",
      "Top rope": "Rope already anchored above – safer beginner method",
      "Bouldering": "Short routes without ropes, using crash pads",
      "Crux": "The hardest move or section of a climb",
      "Beta": "Information or advice about how to do a move/route",
      "Redpoint": "Completing a lead route cleanly after previous attempts",
      "Onsight": "Climbing a route with no prior information or falls",
      "Dyno": "Dynamic jumping move to reach a hold",
      "V-grade": "Bouldering difficulty scale (V0–V17)"
    }
  },
  {
    name: "Coffee Roasting",
    category: "Food & Drink",
    icon: "",
    tools: ["Home roaster (drum/fluid bed)", "Green coffee beans", "Probe thermometer", "Scale", "Timer", "Cooling tray", "Airtight containers"],
    glossary: {
      "Green bean": "Unroasted coffee bean",
      "First crack": "Audible popping as beans expand – light roast stage",
      "Second crack": "Second pop sequence – dark roast territory",
      "Maillard reaction": "Browning process developing flavor compounds",
      "Degassing": "CO2 releasing from freshly roasted beans",
      "Single origin": "Coffee from one specific region or farm",
      "Chaff": "Dry skin that separates during roasting",
      "Development time": "Time between first crack and end of roast"
    }
  },
  {
    name: "Coin Collecting",
    category: "Collecting",
    icon: "",
    tools: ["Coin albums/holders", "Cotton gloves", "Magnifying glass", "Coin grading scale reference", "Price guides (Red Book)", "Storage boxes", "NGC/PCGS slabs"],
    glossary: {
      "Obverse": "Heads side of the coin",
      "Reverse": "Tails side of the coin",
      "Mint mark": "Letter indicating which mint produced the coin",
      "Proof": "Specially struck coin with mirror-like finish",
      "Uncirculated": "Coin never used in commerce",
      "Toning": "Natural color change on coin surface over time",
      "Die variety": "Coins struck from distinct die combinations",
      "Key date": "Rare, valuable coin in a series"
    }
  },
  {
    name: "Cooking",
    category: "Food & Drink",
    icon: "",
    tools: ["Chef's knife", "Cutting board", "Cast iron skillet", "Stainless pots", "Instant-read thermometer", "Kitchen scale", "Wooden spoons", "Microplane grater", "Dutch oven"],
    glossary: {
      "Mise en place": "Everything in its place – prepping all ingredients before cooking",
      "Sauté": "Cooking quickly in small amount of fat over high heat",
      "Deglaze": "Adding liquid to a hot pan to release browned bits",
      "Fond": "Browned bits stuck to pan after searing",
      "Emulsify": "Combining two immiscible liquids (oil & water)",
      "Blanch": "Briefly boiling then plunging into ice water",
      "Braise": "Long slow cooking in liquid partially covering the food",
      "Julienne": "Cutting into thin matchstick-shaped strips",
      "Roux": "Cooked mixture of flour and fat used to thicken sauces"
    }
  },
  {
    name: "Cosplaying",
    category: "Arts & Performing",
    icon: "",
    tools: ["Sewing machine", "EVA foam", "Heat gun", "Contact cement", "Acrylic paints", "Worbla (thermoplastic)", "Dremel tool", "Wig & wig head", "Body paint"],
    glossary: {
      "WIP": "Work In Progress – unfinished costume",
      "Foam smithing": "Crafting armor/props from EVA foam",
      "Worbla": "Brand of thermoplastic used for armor pieces",
      "Wig styling": "Cutting and shaping wigs to match character",
      "Screen accurate": "Exactly matching source material appearance",
      "Closet cosplay": "Costume assembled from regular clothing",
      "Hall costume": "Competition-grade elaborate convention costume",
      "Crossplay": "Cosplaying as a character of a different gender"
    }
  },
  {
    name: "Crocheting",
    category: "Fiber Arts",
    icon: "",
    tools: ["Crochet hooks (various sizes)", "Yarn (various weights)", "Stitch markers", "Row counter", "Tapestry needles", "Scissors", "Blocking mats & pins"],
    glossary: {
      "Amigurumi": "Small crocheted stuffed toy characters",
      "Magic ring": "Adjustable loop for starting rounds",
      "Slip stitch": "Connecting stitch with no height",
      "Single crochet": "Basic short stitch",
      "Double crochet": "Taller basic stitch",
      "Yarn over": "Wrapping yarn around hook",
      "FO": "Finished object",
      "WIP": "Work in progress",
      "Frog": "To rip out stitches and start over (rip it = frog it)"
    }
  },
  {
    name: "Cross-stitch",
    category: "Fiber Arts",
    icon: "",
    tools: ["Aida cloth (14-count, 18-count)", "Embroidery floss", "Needles (tapestry)", "Embroidery hoop", "Pattern", "Scissors", "Needle minder"],
    glossary: {
      "Aida": "Evenweave fabric with visible holes for counted cross-stitch",
      "DMC": "Popular embroidery floss brand with standardized color numbers",
      "Full cross": "Complete X-shaped stitch",
      "Half stitch": "Single diagonal stitch making up half a cross",
      "Confetti stitching": "Many isolated single stitches of different colors",
      "Parking method": "Leaving needles at set positions to minimize thread waste",
      "BAP": "Big Ass Project – large complex piece",
      "Frogging": "Ripping out stitches to redo them"
    }
  },
  {
    name: "Cycling",
    category: "Sports",
    icon: "",
    tools: ["Road/MTB/gravel bike", "Helmet", "Cycling shoes & cleats", "Padded shorts", "GPS computer (Garmin)", "Water bottles", "Tube & pump", "Multi-tool", "Cycling jersey"],
    glossary: {
      "Cadence": "Pedaling revolutions per minute",
      "FTP": "Functional Threshold Power – sustainable power for one hour",
      "Peloton": "Main group of riders in a race",
      "Drafting": "Riding closely behind another to reduce wind resistance",
      "Breakaway": "Small group that escapes the peloton",
      "Bonk": "Energy depletion causing weakness and confusion (hitting the wall)",
      "Chamois": "Padded insert in cycling shorts",
      "Strava": "Popular GPS tracking app for cyclists and runners"
    }
  },
  {
    name: "DJing",
    category: "Music & Audio",
    icon: "",
    tools: ["DJ controller/turntables", "Mixer", "CDJs", "DJ software (Serato, Rekordbox, Traktor)", "Headphones", "Monitor speakers", "Laptop", "Vinyl records (for vinyl DJs)"],
    glossary: {
      "BPM": "Beats Per Minute – tempo of a track",
      "Beatmatch": "Aligning the tempo and phase of two tracks",
      "Cue point": "Marked position in a track for quick access",
      "Loop": "Repeating section of a track",
      "EQ": "Equalization – adjusting bass, mid, treble",
      "Crossfader": "Slider transitioning between two channels",
      "Drop": "Moment when bass kicks in after a buildup",
      "Mix": "Smooth transition between two songs",
      "Scratch": "Rhythmically manipulating a record back and forth"
    }
  },
  {
    name: "Darts",
    category: "Sports",
    icon: "",
    tools: ["Steel tip or soft tip darts", "Dartboard", "Flights", "Shafts/stems", "Dart case", "Scoreboard", "Oche (throwing line)"],
    glossary: {
      "Oche": "The throw line 7 ft 9.25 in from the board",
      "Double": "Narrow outer ring worth double the segment",
      "Triple": "Inner ring worth triple the segment",
      "Bullseye": "Center (50 points), outer bull (25 points)",
      "Checkout": "Finishing score to win a leg",
      "501/301": "Common game formats starting from that score",
      "Shanghai": "Hitting single, double, triple of same number in one turn",
      "Bust": "Going below zero in 01 games – turn doesn't count"
    }
  },
  {
    name: "Disc Golf",
    category: "Sports",
    icon: "",
    tools: ["Driver disc", "Fairway driver", "Midrange disc", "Putter", "Disc golf bag", "Mini marker disc", "Towel"],
    glossary: {
      "Hyzer": "Throw with disc angled so the outside edge is lower",
      "Anhyzer": "Throw with disc angled so the outside edge is higher",
      "Understable": "Disc that turns right when thrown right-handed",
      "Overstable": "Disc that resists turn and fades left strongly",
      "Birdie": "One under par on a hole",
      "Ace": "Hole-in-one in disc golf",
      "OB": "Out of bounds",
      "PDGA": "Professional Disc Golf Association – governing body"
    }
  },
  {
    name: "Embroidery",
    category: "Fiber Arts",
    icon: "",
    tools: ["Embroidery hoop", "Embroidery floss", "Needles", "Fabric (linen, cotton)", "Transfer paper", "Scissors", "Thimble"],
    glossary: {
      "Satin stitch": "Parallel straight stitches filling an area smoothly",
      "French knot": "Tiny circular raised knot formed by wrapping thread",
      "Backstitch": "Strong outline stitch with no gaps between stitches",
      "Running stitch": "Simple in-and-out stitching",
      "Couching": "Laying thread on surface and stitching it down",
      "Goldwork": "Embroidery using metallic threads",
      "Jacobean": "Stylized floral embroidery style from 17th century England",
      "Needle painting": "Highly detailed realistic embroidery imitating painting"
    }
  },
  {
    name: "Fishing",
    category: "Outdoors & Sports",
    icon: "",
    tools: ["Rod & reel", "Fishing line (mono/fluoro/braid)", "Terminal tackle (hooks, swivels)", "Lures & bait", "Tackle box", "Landing net", "Fishing license", "Polarized sunglasses", "Pliers"],
    glossary: {
      "Jigging": "Lifting and dropping a lure vertically",
      "Trolling": "Dragging lures behind a moving boat",
      "Casting": "Throwing line out from shore or boat",
      "Strike": "Fish biting the bait or lure",
      "Drag": "Reel mechanism controlling line tension when fish runs",
      "Hookset": "Forceful motion driving hook into fish's mouth",
      "Catch and release": "Returning fish unharmed after catching",
      "Leader": "Short section of strong/clear line between mainline and lure",
      "Structure": "Underwater features where fish congregate"
    }
  },
  {
    name: "Fitness",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Barbell & plates", "Dumbbells", "Resistance bands", "Jump rope", "Gym shoes", "Lifting belt", "Foam roller", "Heart rate monitor"],
    glossary: {
      "Superset": "Two exercises performed back-to-back without rest",
      "Circuit": "Series of exercises performed in sequence",
      "VO2 max": "Maximum oxygen uptake – aerobic fitness measure",
      "RPE": "Rate of Perceived Exertion – subjective effort scale",
      "AMRAP": "As Many Reps As Possible",
      "EMOM": "Every Minute On the Minute",
      "Periodization": "Structured variation of training over time",
      "Active recovery": "Light movement on rest days to aid recovery"
    }
  },
  {
    name: "Foraging",
    category: "Outdoors & Nature",
    icon: "",
    tools: ["Field guide (regional)", "Basket or mesh bag", "Knife", "Paper bags", "Hand lens", "Gloves", "Spore print paper", "GPS app"],
    glossary: {
      "Edibility": "Whether a plant/mushroom is safe to eat",
      "Look-alike": "Dangerous plant/mushroom resembling an edible species",
      "Flush": "Multiple mushrooms appearing at same time after rain",
      "Mycelium": "Fungal root network underground",
      "Substrate": "Material mushrooms grow on (wood, soil, dung)",
      "Spore print": "Pattern of spores dropped from a mushroom cap",
      "Wildcrafting": "Harvesting wild plants for food or medicine"
    }
  },
  {
    name: "Gaming",
    category: "Games",
    icon: "",
    tools: ["Gaming PC/console", "Controller/keyboard/mouse", "Headset", "Gaming monitor", "Chair", "Capture card (streaming)", "Mousepad"],
    glossary: {
      "FPS": "First Person Shooter or Frames Per Second",
      "MMO": "Massively Multiplayer Online game",
      "RPG": "Role-Playing Game",
      "GG": "Good Game – sportsmanship phrase",
      "Nerf": "Weakening an overpowered element via update",
      "Buff": "Strengthening an element via update",
      "Grinding": "Repetitive play to accumulate resources/experience",
      "Meta": "Most Effective Tactics Available – current optimal strategies",
      "PVP": "Player vs Player combat"
    }
  },
  {
    name: "Gardening",
    category: "Nature & Outdoors",
    icon: "",
    tools: ["Trowel", "Pruners/secateurs", "Garden fork", "Hoe", "Watering can/hose", "Kneeling pad", "Gloves", "pH meter", "Compost bin", "Raised bed frames"],
    glossary: {
      "Deadheading": "Removing spent flowers to encourage more blooms",
      "Hardening off": "Gradually acclimatizing indoor seedlings to outdoor conditions",
      "Succession planting": "Staggering planting times for continuous harvest",
      "Companion planting": "Growing mutually beneficial plants together",
      "Bolting": "Plant prematurely going to seed",
      "Germination": "Seed sprouting into a seedling",
      "Tilth": "Physical condition of soil as relates to plant growth",
      "Mulch": "Material covering soil to retain moisture and suppress weeds"
    }
  },
  {
    name: "Genealogy",
    category: "Research & Education",
    icon: "",
    tools: ["Ancestry.com", "FamilySearch.org", "DNA test kit", "Family tree software (Gramps)", "Vital records", "Census records", "Church records", "Archive access"],
    glossary: {
      "Vital records": "Birth, marriage, and death certificates",
      "Pedigree chart": "Chart showing direct ancestors in branching format",
      "Primary source": "Record created at time of event",
      "Collateral relative": "Non-direct ancestor relative (uncle, cousin, etc.)",
      "Brick wall": "Ancestor whose records cannot be traced further",
      "cM": "Centimorgans – DNA matching unit",
      "Endogamy": "Community where members repeatedly intermarry",
      "GEDCOM": "Standard file format for sharing genealogy data"
    }
  },
  {
    name: "Geocaching",
    category: "Outdoors",
    icon: "",
    tools: ["GPS device or smartphone", "Geocaching app", "Pen", "Tweezers (for nano caches)", "Trade items (SWAG)", "Flashlight"],
    glossary: {
      "Cache": "Hidden container with logbook to sign",
      "Muggle": "Non-geocacher unaware of the hobby",
      "TFTC": "Thanks For The Cache",
      "FTF": "First To Find – finding a newly placed cache first",
      "Nano cache": "Tiny magnetic cache barely visible",
      "DNF": "Did Not Find",
      "GZ": "Ground Zero – exact GPS coordinates of cache",
      "Difficulty/Terrain": "1–5 ratings for finding and reaching a cache"
    }
  },
  {
    name: "Ghost Hunting",
    category: "Spiritual & Paranormal",
    icon: "",
    tools: ["EMF meter", "Digital voice recorder (for EVP)", "Full-spectrum camera", "Infrared thermometer", "Motion sensors", "Spirit box", "Dowsing rods"],
    glossary: {
      "EVP": "Electronic Voice Phenomenon – voices captured on recording",
      "EMF": "Electromagnetic Field – changes may indicate presence",
      "Orb": "Circle of light in photos (often dust or moisture)",
      "Apparition": "Visual manifestation of a spirit",
      "Residual haunting": "Repetitive replay of past events",
      "Intelligent haunting": "Spirit that responds to interaction",
      "Trigger object": "Personal item placed to attract specific spirit"
    }
  },
  {
    name: "Glassblowing",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Blowpipe", "Punty rod", "Marver table", "Gaffer (bench)", "Jacks", "Shears", "Annealing oven (lehr)", "Kiln", "Cullet (broken glass)"],
    glossary: {
      "Gather": "Ball of molten glass on the end of blowpipe",
      "Marver": "Steel table for shaping and cooling glass",
      "Gaffer": "Master glassblower leading a team",
      "Annealing": "Slow cooling in oven preventing glass from cracking",
      "Glory hole": "Furnace opening for reheating glass",
      "Cullet": "Broken/scrap glass added to melt",
      "Punty": "Solid iron rod attached to base of piece for handling"
    }
  },
  {
    name: "Golf",
    category: "Sports",
    icon: "",
    tools: ["Driver", "Fairway woods", "Irons (3–9)", "Wedges (pitching, sand, lob)", "Putter", "Golf bag", "Golf shoes", "Glove", "Rangefinder", "Tees & balls"],
    glossary: {
      "Handicap": "Numerical measure of golfer's ability",
      "Par": "Expected strokes for a hole or round",
      "Birdie": "One under par",
      "Eagle": "Two under par",
      "Bogey": "One over par",
      "Fade": "Left-to-right ball flight (for right-handed golfer)",
      "Draw": "Right-to-left ball flight",
      "Divot": "Chunk of turf displaced by iron shot",
      "Lag putting": "Long putt aimed to finish close to hole"
    }
  },
  {
    name: "Gymnastics",
    category: "Sports & Fitness",
    icon: "",
    tools: ["Gymnastics mat", "Uneven bars", "Balance beam", "Vault", "Horizontal bar", "Rings", "Pommel horse", "Chalk", "Grips", "Pit foam"],
    glossary: {
      "Kip": "Movement swinging body from below to above a bar",
      "Giant": "Full rotation around a bar with straight body",
      "Layout": "Back salto with straight body position",
      "Tuck": "Salto with knees drawn to chest",
      "Pike": "Salto with straight legs, body folded at hips",
      "Roundoff": "Cartwheel variant landing with feet together",
      "Salto": "A flip/somersault",
      "Aerial": "Cartwheel or walkover with no hand contact",
      "Dismount": "Final skill leaving apparatus at end of routine"
    }
  },
  {
    name: "Ham Radio",
    category: "Technology",
    icon: "",
    tools: ["Transceiver", "Antenna (dipole, yagi)", "Coaxial cable", "SWR meter", "Antenna tuner", "Power supply", "Logging software", "Morse code key"],
    glossary: {
      "QSO": "A radio contact between stations",
      "QSL card": "Confirmation card sent after contact",
      "DX": "Long-distance contact, or distant station",
      "Elmer": "Experienced ham who mentors newcomers",
      "Repeater": "Receiver/transmitter extending radio range",
      "CW": "Continuous Wave – Morse code transmission",
      "HF": "High Frequency – long-distance bands",
      "VHF/UHF": "Very/Ultra High Frequency – local line-of-sight bands"
    }
  },
  {
    name: "Hiking",
    category: "Outdoors",
    icon: "",
    tools: ["Hiking boots/trail runners", "Trekking poles", "Day pack", "Water filter/purification tablets", "Navigation (map, compass, GPS)", "First aid kit", "Rain jacket", "Sun hat", "Snacks"],
    glossary: {
      "Switchback": "Zigzag trail section ascending a steep slope",
      "Trailhead": "Starting point of a hiking trail",
      "Scrambling": "Using hands and feet on steep rocky terrain",
      "Blaze": "Trail marker painted on trees or rocks",
      "Cairn": "Stack of stones marking a trail or route",
      "Grade": "Slope percentage of trail terrain",
      "Out-and-back": "Hiking same trail to a destination and returning",
      "Loop trail": "Trail returning to start via different path"
    }
  },
  {
    name: "Home Improvement",
    category: "Making & DIY",
    icon: "",
    tools: ["Drill & bits", "Circular saw", "Level", "Tape measure", "Stud finder", "Caulk gun", "Paint rollers", "Ladder", "Multimeter (electrical)", "Pipe wrench (plumbing)"],
    glossary: {
      "Load-bearing wall": "Wall supporting structural weight from above",
      "Joist": "Horizontal framing member supporting floor/ceiling",
      "Stud": "Vertical framing member in walls",
      "Roughing in": "Installing infrastructure before covering walls",
      "GFCI": "Ground Fault Circuit Interrupter – safety outlet for wet areas",
      "OSB": "Oriented Strand Board – engineered wood panel",
      "Thinset": "Adhesive mortar for tile installation",
      "Flashing": "Waterproof material at roof/wall junctions"
    }
  },
  {
    name: "Homebrewing",
    category: "Food & Drink",
    icon: "",
    tools: ["Fermentor (bucket/carboy)", "Airlock & stopper", "Hydrometer", "Auto-siphon & tubing", "Sanitizer (Star San)", "Bottle capper & caps", "Thermometer", "Brewing kettle", "Wort chiller"],
    glossary: {
      "Wort": "Unfermented beer – sweet liquid from grains",
      "Mash": "Process converting grain starches to fermentable sugars",
      "Sparge": "Rinsing grains with hot water to extract sugars",
      "OG": "Original Gravity – sugar density before fermentation",
      "FG": "Final Gravity – after fermentation completes",
      "ABV": "Alcohol by volume percentage",
      "Dry hopping": "Adding hops after fermentation for aroma",
      "Autolysis": "Yeasty off-flavor from leaving beer on dead yeast too long",
      "Krausen": "Foam head during active fermentation"
    }
  },
  {
    name: "Horseback Riding",
    category: "Animals & Sports",
    icon: "",
    tools: ["Saddle (English/Western)", "Bridle & bit", "Riding boots", "Helmet", "Jodhpurs/breeches", "Crop", "Grooming kit", "Saddle pad"],
    glossary: {
      "Gait": "Pattern of horse movement (walk, trot, canter, gallop)",
      "Trot": "Two-beat diagonal gait",
      "Canter": "Three-beat gait slower than a gallop",
      "Posting trot": "Rider rising from saddle rhythmically with trot",
      "Collection": "Horse's balance, energy, and engagement",
      "Leg yield": "Horse moving sideways while going forward",
      "Half halt": "Brief, momentary resistance to rebalance horse",
      "Seat": "Rider's position and balance in the saddle"
    }
  },
  {
    name: "Hunting",
    category: "Outdoors",
    icon: "",
    tools: ["Firearm or bow", "Ammunition/arrows", "Hunter orange vest", "Binoculars", "Rangefinder", "Game calls", "Scent eliminator", "Field dressing knife", "Game bags"],
    glossary: {
      "Rut": "Deer breeding season when bucks are most active",
      "Stand": "Elevated platform or blind for concealed waiting",
      "Stalk": "Moving quietly toward game without detection",
      "Field dressing": "Removing internal organs in the field after harvest",
      "Scout": "Researching an area before hunting season",
      "Sign": "Evidence of game (tracks, rubs, scrapes)",
      "Drag": "Moving harvested animal from woods",
      "Shooting lane": "Clear path through vegetation for a clear shot"
    }
  },
  {
    name: "Hydroponics",
    category: "Gardening",
    icon: "",
    tools: ["Grow tent", "LED grow lights", "Nutrient solution", "pH meter", "EC meter", "Net pots", "Growing medium (clay pebbles, rockwool)", "Air pump & stones", "Reservoir"],
    glossary: {
      "DWC": "Deep Water Culture – roots suspended in oxygenated nutrient water",
      "NFT": "Nutrient Film Technique – thin stream of nutrients over roots",
      "EC": "Electrical Conductivity – measures nutrient concentration",
      "VPD": "Vapor Pressure Deficit – ideal humidity/temp relationship for plants",
      "Photoperiod": "Light/dark cycle controlling plant growth and flowering",
      "Clone": "Cutting from a mother plant",
      "Runoff": "Excess nutrient solution draining from medium",
      "SCROG": "Screen of Green – training technique using a net"
    }
  },
  {
    name: "Ice Hockey",
    category: "Sports",
    icon: "",
    tools: ["Skates", "Stick", "Helmet with cage/visor", "Shoulder pads", "Elbow pads", "Gloves", "Shin guards", "Hockey pants", "Cup", "Puck"],
    glossary: {
      "Icing": "Shooting puck from own half across opponent's goal line",
      "Offsides": "Attacking player entering zone before the puck",
      "Hat trick": "Three goals scored by one player in a game",
      "Power play": "Team playing with numerical advantage after penalty",
      "Penalty kill": "Team defending while short-handed",
      "Deke": "Deceptive move to fake out a defender or goalie",
      "Slot": "High-danger scoring area directly in front of net",
      "Wraparound": "Shooting attempt circling the net from behind"
    }
  },
  {
    name: "Jewelry Making",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Round nose pliers", "Flat nose pliers", "Wire cutters", "Bench block", "Hammer", "Mandrel", "Torch (soldering)", "Pickle solution", "Silver/gold wire", "Beads & gemstones"],
    glossary: {
      "Bezel": "Metal frame surrounding and holding a gemstone",
      "Prong setting": "Wire claws holding a stone",
      "Wire wrapping": "Creating settings by wrapping wire around stones",
      "Annealing": "Heating metal to make it soft and workable",
      "Pickle": "Acid solution removing oxidation from heated metal",
      "Soldering": "Joining metal pieces with molten filler metal",
      "Gauge": "Wire thickness measurement",
      "Cabochon": "Unfaceted polished gemstone"
    }
  },
  {
    name: "Jigsaw Puzzles",
    category: "Games",
    icon: "",
    tools: ["Puzzle board with cover", "Sorting trays", "Puzzle glue", "Good lighting lamp", "Puzzle roll-up mat"],
    glossary: {
      "Knob & hole": "Traditional interlocking piece shapes",
      "False join": "Two pieces that seem to fit but don't belong together",
      "Edge sorting": "Starting by completing the border pieces",
      "Sky piece": "Frustrating uniform piece without distinguishing features",
      "Piece count": "Total number of pieces (100–50,000+)",
      "Cut style": "Pattern the die cutting creates (grid, random, etc.)"
    }
  },
  {
    name: "Journaling",
    category: "Lifestyle & Wellness",
    icon: "",
    tools: ["Notebook (Moleskine, Leuchtturm)", "Good pens (Pilot G2, Uni-ball)", "Washi tape", "Stickers", "Watercolors", "Date stamp"],
    glossary: {
      "Stream of consciousness": "Writing whatever comes to mind without editing",
      "Gratitude journal": "Daily record of things you're thankful for",
      "Bullet journal": "Structured organization system within a journal",
      "Morning pages": "Three pages of stream-of-consciousness each morning (Julia Cameron)",
      "Art journal": "Visual journal combining writing and artwork",
      "Smash book": "Scrapbook-style journal collecting mementos"
    }
  },
  {
    name: "Judo",
    category: "Martial Arts & Combat",
    icon: "",
    tools: ["Judogi (gi)", "Belt", "Tatami mats", "Grappling dummy"],
    glossary: {
      "Uke": "Person being thrown in a technique",
      "Tori": "Person performing the technique",
      "Randori": "Free practice sparring",
      "Kata": "Prearranged sequence of techniques",
      "Ippon": "Full point winning the match immediately",
      "Waza-ari": "Half point in judo",
      "Shime-waza": "Choking techniques",
      "Osae-komi": "Pinning technique",
      "Kuzushi": "Breaking opponent's balance before throwing"
    }
  },
  {
    name: "Kayaking",
    category: "Water Sports",
    icon: "",
    tools: ["Kayak (sit-in/sit-on-top)", "Double-blade paddle", "PFD", "Spray skirt (for sea kayak)", "Helmet (whitewater)", "Dry bags", "Bilge pump", "Float bags"],
    glossary: {
      "Brace": "Paddle support stroke preventing capsizing",
      "Roll": "Righting a capsized kayak without exiting",
      "Sweep stroke": "Wide arcing stroke turning the kayak",
      "Eddy": "Calm water behind an obstacle in flowing water",
      "Playboating": "Performing tricks in river features",
      "Sea kayaking": "Long-distance coastal or open water kayaking",
      "Stern draw": "Stroke moving the back of the kayak sideways"
    }
  },
  {
    name: "Kitesurfing",
    category: "Watersports",
    icon: "",
    tools: ["Kite (leading edge inflatable)", "Bar & lines", "Harness", "Kiteboard", "Wetsuit", "Helmet", "Impact vest", "Quick-release safety system"],
    glossary: {
      "Wind window": "3D space in which a kite can fly",
      "Power zone": "Area directly downwind where kite generates most pull",
      "Edge": "Angle the board against the water for upwind riding",
      "Body drag": "Being pulled through water by kite without board",
      "Relaunch": "Getting kite back up after it falls in the water",
      "Depower": "Reducing kite's power using bar adjustment",
      "Boosting": "Using kite lift to jump high into the air"
    }
  },
  {
    name: "Knitting",
    category: "Fiber Arts",
    icon: "",
    tools: ["Knitting needles (straight/circular/DPN)", "Yarn", "Stitch markers", "Row counter", "Tapestry needle", "Blocking mats", "Cable needle"],
    glossary: {
      "Knit stitch": "Basic front-of-work stitch (smooth V appearance)",
      "Purl stitch": "Back-of-work stitch creating bumps",
      "Cast on": "Creating the initial row of stitches",
      "Bind off": "Finishing and removing work from needles",
      "WS/RS": "Wrong side / Right side of the work",
      "Frogging": "Pulling out stitches to redo them",
      "Gauge swatch": "Test square to check stitch size matches pattern",
      "Yarn over": "Creating a new stitch and hole by wrapping yarn",
      "DPN": "Double pointed needles for knitting in the round"
    }
  },
  {
    name: "Kombucha Brewing",
    category: "Food & Drink",
    icon: "",
    tools: ["Glass jar (1 gallon+)", "SCOBY", "Starter liquid", "Black/green tea", "Sugar", "pH strips", "Cloth cover & rubber band", "Swing-top bottles (F2)"],
    glossary: {
      "SCOBY": "Symbiotic Culture Of Bacteria and Yeast – the living culture",
      "First fermentation (F1)": "Primary brewing in large vessel",
      "Second fermentation (F2)": "Carbonating in sealed bottles with added flavor",
      "Starter liquid": "Previously brewed kombucha making environment acidic",
      "Hotel": "Container of stored SCOBYs",
      "Pellicle": "New SCOBY layer forming on surface",
      "pH": "Acidity measure – finished kombucha should be 2.5–3.5"
    }
  },
  {
    name: "LARPing",
    category: "Gaming & Performance",
    icon: "",
    tools: ["LARP-safe foam weapon", "Costume/armor", "Shield", "In-game currency", "Character sheet", "Rulebook", "Safety pins"],
    glossary: {
      "Boffer": "Foam-padded LARP weapon",
      "Phys-rep": "Physical representation of in-game item",
      "IC": "In Character – acting as your character",
      "OOC": "Out Of Character – speaking as yourself",
      "Rules Marshal": "Official enforcing game rules",
      "Hit points": "Character's health total",
      "Respawn": "Returning to game after being 'killed'",
      "Tavern": "Common in-game social gathering location"
    }
  },
  {
    name: "Leather Crafting",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Swivel knife", "Stamping tools", "Mallet", "Stitching chisels/pricking irons", "Leather needles & waxed thread", "Edge beveler", "Burnishing tools", "Leather conditioner", "Rotary punch"],
    glossary: {
      "Vegetable tanned leather": "Leather tanned with natural plant materials – allows tooling",
      "Chrome tanned": "Faster process – softer but not suitable for tooling",
      "Skiving": "Thinning leather edges for cleaner folds/joins",
      "Saddle stitch": "Hand stitching method using two needles simultaneously",
      "Casing": "Dampening leather for tooling",
      "Burnishing": "Compressing and polishing leather edges",
      "Flesh side": "Rough inside of the leather hide",
      "Grain side": "Smooth outer surface of the leather"
    }
  },
  {
    name: "Lego Building",
    category: "Making & Crafts",
    icon: "",
    tools: ["LEGO bricks", "Brick separator", "Part catalogues (BrickLink)", "Sorting containers", "Building base plates", "Pick-a-brick cups"],
    glossary: {
      "AFOL": "Adult Fan Of Lego",
      "MOC": "My Own Creation – original build not from a set",
      "SNOT": "Studs Not On Top – technique placing bricks sideways",
      "Minifig": "LEGO minifigure",
      "BrickLink": "Online marketplace for buying individual LEGO parts",
      "Vignette": "Small display scene in limited footprint",
      "Greebling": "Adding mechanical-looking surface details",
      "Technic": "LEGO line with gears, axles, and functional mechanisms"
    }
  },
  {
    name: "Lock Picking",
    category: "Skills & Hobbies",
    icon: "",
    tools: ["Tension wrench set", "Hook picks", "Rake picks", "Diamond picks", "Transparent practice lock", "Progressive pin tumbler locks", "Practice padlocks"],
    glossary: {
      "SPP": "Single Pin Picking – setting one pin at a time",
      "Raking": "Fast randomized picking technique",
      "Shear line": "Gap between driver and key pins where lock opens",
      "Binding pin": "Pin under tension that sets when picked",
      "Plug": "Rotating cylinder inside the lock",
      "Driver pin": "Spring-loaded pin resting above the shear line",
      "Key pin": "Lower pin touching the key",
      "Set": "Pin reaching shear line and holding in place"
    }
  },
  {
    name: "Macrame",
    category: "Fiber Arts",
    icon: "",
    tools: ["Macrame cord (cotton/jute)", "Dowel rod or ring", "Scissors", "Comb", "Tape measure", "S-hooks for hanging", "Mounting board"],
    glossary: {
      "Lark's head knot": "Mounting knot attaching cord to dowel",
      "Square knot": "Foundation knot alternating half hitches",
      "Half hitch": "Single loop knot building patterns",
      "Spiral stitch": "Repeated half square knots creating a spiral",
      "Fringe": "Unworked cord ends left loose for decoration",
      "Sennit": "Chain of knots",
      "Warp cord": "Vertical foundation cords",
      "Working cord": "Cord actively used to tie knots"
    }
  },
  {
    name: "Meditation",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Meditation cushion (zafu)", "Timer app", "Mala beads", "Incense", "Meditation bench", "Blanket"],
    glossary: {
      "Samatha": "Calming meditation focusing on a single object",
      "Vipassana": "Insight meditation observing sensations and phenomena",
      "Body scan": "Systematic attention to sensations throughout the body",
      "Mantra": "Word or phrase repeated during meditation",
      "Zazen": "Zen sitting meditation",
      "Metta": "Loving-kindness meditation sending goodwill to others",
      "Mindfulness": "Non-judgmental awareness of present moment",
      "Jhana": "Deep meditative absorption states"
    }
  },
  {
    name: "Metal Detecting",
    category: "Outdoors & Collecting",
    icon: "",
    tools: ["Metal detector (Minelab, Garrett)", "Digging tool/pinpointer", "Finds pouch", "Knee pads", "Headphones", "Research maps"],
    glossary: {
      "Discrimination": "Setting detector to ignore certain metals",
      "Pinpointing": "Narrowing exact location of a target",
      "Hot rock": "Rock with high mineral content causing false signals",
      "Ground balance": "Tuning detector to local soil mineralization",
      "TID": "Target ID – number/letter indicating likely metal type",
      "Relic hunting": "Searching sites for historical artifacts",
      "Skunked": "Session finding nothing of value"
    }
  },
  {
    name: "Metalworking",
    category: "Making & Crafts",
    icon: "",
    tools: ["Angle grinder", "MIG/TIG welder", "Lathe", "Mill", "Drill press", "Vise", "Calipers", "Files", "Taps & dies", "Safety gear (gloves, shield)"],
    glossary: {
      "Milling": "Machining material with rotating cutting tools",
      "Turning": "Cutting rotating workpiece on a lathe",
      "Kerf": "Width of material removed by cutting tool",
      "Tolerance": "Acceptable deviation from exact measurements",
      "Work hardening": "Metal becoming harder from deformation",
      "Flux": "Chemical aiding solder/weld by preventing oxidation",
      "Feed rate": "Speed at which cutting tool moves through material",
      "Chatter": "Vibration causing surface imperfections"
    }
  },
  {
    name: "Mycology",
    category: "Nature & Science",
    icon: "",
    tools: ["Pressure cooker (sterilization)", "Still air box or laminar flow hood", "Agar plates", "Syringes", "Spawn bags", "Fruiting chamber", "Humidity tent", "Field guide"],
    glossary: {
      "Mycelium": "Fungal root network of thread-like hyphae",
      "Fruiting body": "The mushroom – the visible reproductive structure",
      "Inoculation": "Introducing spores/mycelium to a substrate",
      "Colonization": "Mycelium spreading through substrate",
      "Pinning": "First appearance of tiny mushroom primordia",
      "Flush": "Harvest of mushrooms from one fruiting cycle",
      "Agar": "Gel medium for growing and isolating cultures",
      "FAE": "Fresh Air Exchange – ventilation for fruiting"
    }
  },
  {
    name: "Nail Art",
    category: "Beauty & Self-care",
    icon: "",
    tools: ["Gel/regular polish", "UV/LED lamp", "Nail art brushes", "Dotting tools", "Stamping plates & scraper", "Nail foils", "Nail tape", "Top coat/base coat"],
    glossary: {
      "Gel polish": "UV-cured polish lasting 2–3 weeks",
      "Dip powder": "Acrylic powder system without UV curing",
      "Stamping": "Transferring designs from engraved plates",
      "Ombre": "Gradient color fade across the nail",
      "Nail wrap": "Adhesive sticker-style nail design",
      "Cuticle": "Skin at the base of the nail",
      "Builder gel": "Thick gel for extending nail length",
      "Flash cure": "Brief UV light exposure to partially set gel"
    }
  },
  {
    name: "Origami",
    category: "Paper Arts",
    icon: "",
    tools: ["Square paper (kami, washi, foil)", "Bone folder", "Tweezers (for tiny folds)", "Wet folding paper", "Grid paper for design"],
    glossary: {
      "Valley fold": "Folding paper toward you, creating a valley",
      "Mountain fold": "Folding paper away from you, creating a ridge",
      "Squash fold": "Opening a flap and flattening it",
      "Inside reverse fold": "Folding a point inward between layers",
      "Sink fold": "Pushing a point inside the model completely",
      "Wet folding": "Dampening paper to hold curved shapes",
      "Modular origami": "Building larger structures from many identical units",
      "Crease pattern": "Map of all fold lines in a complex model"
    }
  },
  {
    name: "Paintball",
    category: "Sports",
    icon: "",
    tools: ["Paintball marker (gun)", "Hopper/loader", "Tank (CO2/HPA)", "Mask/goggle system", "Paintballs", "Barrel cover", "Pod pack & pods", "Cleaner cloth"],
    glossary: {
      "HPA": "High Pressure Air – modern propellant system",
      "Hopper": "Container feeding paintballs into the marker",
      "BPS": "Balls Per Second – firing rate",
      "Bunker": "Cover structure on a field",
      "Snake": "Long low cylindrical bunker",
      "Chrono": "Speed check ensuring marker fires under safe velocity",
      "Bunkering": "Running up and shooting into an occupied bunker",
      "Squeegee": "Tool cleaning paint from the barrel"
    }
  },
  {
    name: "Painting",
    category: "Arts",
    icon: "",
    tools: ["Canvas/paper/board", "Brushes (various shapes/sizes)", "Palette", "Palette knife", "Easel", "Mediums (linseed oil, gesso)", "Varnish", "Brush cleaner"],
    glossary: {
      "Gesso": "White primer preparing canvas for paint",
      "Impasto": "Thick paint application creating texture",
      "Glazing": "Applying transparent paint over dry layers",
      "Underpainting": "Initial monochrome layer establishing values",
      "Alla prima": "Completing a painting in one wet session",
      "Plein air": "Painting outdoors from direct observation",
      "Value": "Lightness or darkness of a color",
      "Chiaroscuro": "Dramatic light and shadow contrast technique"
    }
  },
  {
    name: "Paragliding",
    category: "Extreme Sports",
    icon: "",
    tools: ["Paraglider wing", "Harness", "Reserve parachute", "Helmet", "Vario (variometer)", "Radio", "GPS", "Wind meter"],
    glossary: {
      "Thermal": "Rising column of warm air used to gain altitude",
      "Glide ratio": "Horizontal distance traveled per unit of altitude lost",
      "Brake toggles": "Controls steering and speed of the glider",
      "Collapse": "Wing folding from turbulence or stall",
      "Reserve": "Emergency backup parachute",
      "XC": "Cross-country – long-distance soaring flights",
      "EN rating": "European safety certification level (A through D)",
      "Speed bar": "Foot bar increasing speed by deforming wing profile"
    }
  },
  {
    name: "Photography",
    category: "Arts & Media",
    icon: "",
    tools: ["Camera (DSLR/mirrorless/film)", "Lenses", "Tripod", "Memory cards", "External flash/speedlight", "Filters (ND, polarizer)", "Editing software (Lightroom, Photoshop)", "Camera bag"],
    glossary: {
      "Aperture": "Lens opening size controlling depth of field (f/stops)",
      "Shutter speed": "Duration sensor is exposed to light",
      "ISO": "Sensor sensitivity to light",
      "Exposure triangle": "Relationship between aperture, shutter, and ISO",
      "Depth of field": "Range of sharp focus in an image",
      "Golden hour": "First/last hour of sunlight for warm soft light",
      "RAW file": "Unprocessed full-data image file",
      "Bokeh": "Aesthetic quality of out-of-focus blur",
      "Composition": "Arrangement of visual elements in the frame"
    }
  },
  {
    name: "Pickleball",
    category: "Racket Sports",
    icon: "",
    tools: ["Paddle (graphite/composite/wood)", "Pickleball (polymer ball)", "Court shoes", "Net (34 inches center)", "Protective eyewear"],
    glossary: {
      "Kitchen": "Non-volley zone 7 feet from the net",
      "Dink": "Soft shot landing in the opponent's kitchen",
      "Drop shot": "Soft shot returning from deep to land in the kitchen",
      "Erne": "Volley hit outside the court by the sideline",
      "Third shot drop": "Soft third shot after serve used to approach the net",
      "Stacking": "Team positioning to keep stronger player on preferred side",
      "Banging": "Hard-hitting baseline-to-baseline style of play"
    }
  },
  {
    name: "Podcasting",
    category: "Media & Communication",
    icon: "",
    tools: ["USB/XLR microphone", "Audio interface (XLR)", "Headphones", "Recording software (Audacity, GarageBand)", "Acoustic treatment (foam panels)", "Pop filter", "Podcast hosting (Buzzsprout, Anchor)"],
    glossary: {
      "RSS feed": "Web feed distributing podcast episodes to directories",
      "DAW": "Digital Audio Workstation – audio editing software",
      "Room tone": "Ambient background sound of recording space",
      "Noise gate": "Filter cutting audio below a set volume threshold",
      "Compression": "Reducing dynamic range for consistent loudness",
      "EQ": "Equalizer – adjusting audio frequencies",
      "Show notes": "Written summary and links for a podcast episode",
      "Episode arc": "Narrative structure of a podcast episode"
    }
  },
  {
    name: "Poker",
    category: "Games",
    icon: "",
    tools: ["Playing cards", "Poker chips set", "Dealer button", "Card shuffler", "Felt table top", "Timer (tournament)", "Bankroll management spreadsheet"],
    glossary: {
      "Pot odds": "Ratio of pot size to cost of calling",
      "Bluff": "Betting with a weak hand to make opponent fold",
      "Value bet": "Betting with a strong hand to get calls from worse hands",
      "Tilt": "Playing poorly due to emotional frustration",
      "Range": "All possible hands an opponent could hold",
      "GTO": "Game Theory Optimal – unexploitable balanced strategy",
      "Tells": "Physical or behavioral clues revealing hand strength",
      "Continuation bet": "Bet on flop made by the pre-flop raiser"
    }
  },
  {
    name: "Powerlifting",
    category: "Fitness & Sports",
    icon: "",
    tools: ["Barbell", "Plates (bumper/iron)", "Power rack/squat rack", "Lifting belt", "Knee sleeves/wraps", "Wrist wraps", "Deadlift shoes/slippers", "Chalk"],
    glossary: {
      "The big three": "Squat, bench press, and deadlift",
      "Total": "Combined weight of best squat, bench, and deadlift at a meet",
      "Wilks score": "Bodyweight-adjusted strength comparison score",
      "Raw vs equipped": "Lifting without/with supportive gear (suit, shirt)",
      "RPE": "Rate of Perceived Exertion – 1–10 effort scale",
      "Attempt selection": "Choosing weights to attempt at competition",
      "Red light": "Judge's signal for a failed lift",
      "White light": "Judge's signal for a good/passed lift"
    }
  },
  {
    name: "Pyrography",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Wood burning pen/unit", "Wire nibs (shading/detailing)", "Basswood/birch panels", "Graphite transfer paper", "Sandpaper", "Sealer/finish"],
    glossary: {
      "Burning tip/nib": "Metal tip conducting heat for burning",
      "Fixed-tip burner": "Simpler unit with non-interchangeable tip",
      "Wire-nib burner": "Advanced unit with swappable wire nibs",
      "Stippling": "Burning dots to create shading and texture",
      "Basswood": "Preferred soft pale wood for burning",
      "Grain": "Wood fiber direction affecting burning direction",
      "Sealer": "Finish protecting completed pyrography"
    }
  },
  {
    name: "Quilting",
    category: "Fiber Arts",
    icon: "",
    tools: ["Sewing machine", "Rotary cutter & mat", "Quilting ruler", "Fabric scissors", "Pins & clips", "Iron & pressing mat", "Batting", "Quilting frame/hoop"],
    glossary: {
      "Quilt sandwich": "Layers of top, batting, and backing",
      "Binding": "Fabric strip finishing the quilt's raw edges",
      "Seam allowance": "Extra fabric beyond the stitching line (1/4\" standard)",
      "HST": "Half Square Triangle – common quilt block unit",
      "Fat quarter": "Fabric piece approximately 18\"×22\"",
      "Longarm quilting": "Machine quilting using a large frame system",
      "FMQ": "Free Motion Quilting – guiding fabric freely under presser foot",
      "Stitch in the ditch": "Quilting directly in a seam line"
    }
  },
  {
    name: "Reading",
    category: "Education & Leisure",
    icon: "",
    tools: ["Books", "E-reader (Kindle)", "Reading light", "Bookmarks", "Reading journal", "Library card", "Goodreads account"],
    glossary: {
      "TBR": "To Be Read – accumulated list of books to read",
      "DNF": "Did Not Finish – abandoned a book",
      "ARC": "Advance Reader Copy – pre-publication review book",
      "Reading slump": "Period of difficulty finding motivation to read",
      "Comfort read": "Beloved familiar book read for enjoyment",
      "Reading challenge": "Annual goal of reading a set number of books",
      "Buddy read": "Reading the same book simultaneously with another person"
    }
  },
  {
    name: "Record Collecting",
    category: "Music & Collecting",
    icon: "",
    tools: ["Turntable (direct drive/belt drive)", "Phono preamp", "Speakers or headphones", "Record cleaning brush", "Anti-static inner sleeves", "Outer poly sleeves", "Stylus cleaning fluid", "Record storage crates"],
    glossary: {
      "RPM": "Revolutions per minute – 33⅓, 45, or 78 for different formats",
      "Stylus": "Needle reading the record groove",
      "Cartridge": "Housing holding the stylus and generating signal",
      "Dead wax": "Area between last groove and label",
      "Pressings": "Different manufacturing runs of the same album",
      "VG+": "Very Good Plus – used condition grading",
      "NM": "Near Mint – highest condition grade",
      "Original pressing": "First manufacturing run of a record"
    }
  },
  {
    name: "Rock Collecting",
    category: "Nature & Collecting",
    icon: "",
    tools: ["Rock hammer", "Chisel", "Hand lens (10x loupe)", "Field guide", "Collecting bags", "Safety goggles", "GPS", "Field notebook"],
    glossary: {
      "Mineral": "Naturally occurring inorganic crystalline substance",
      "Rock": "Aggregate of one or more minerals",
      "Igneous": "Rock formed from cooled magma or lava",
      "Sedimentary": "Rock formed from compacted sediment layers",
      "Metamorphic": "Rock changed by heat/pressure from original form",
      "Hardness": "Resistance to scratching (Mohs scale 1–10)",
      "Cleavage": "Tendency to split along flat planes",
      "Luster": "Quality and intensity of light reflection"
    }
  },
  {
    name: "Role-Playing Games",
    category: "Gaming",
    icon: "",
    tools: ["Rulebook", "Dice set (d4, d6, d8, d10, d12, d20)", "Character sheet", "Miniatures", "Battle map", "GM screen", "Campaign notebook"],
    glossary: {
      "GM/DM": "Game Master/Dungeon Master – person running the game",
      "PC": "Player Character",
      "NPC": "Non-Player Character – controlled by GM",
      "Campaign": "Ongoing series of connected game sessions",
      "Session zero": "Preliminary session establishing tone, rules, and characters",
      "Homebrew": "Custom rules or content created by the GM",
      "Railroading": "Forcing players toward a predetermined outcome",
      "Sandbox": "Open-world play with minimal predetermined plot"
    }
  },
  {
    name: "Roller Skating",
    category: "Sports",
    icon: "",
    tools: ["Quad skates or inline skates", "Helmet", "Wrist guards", "Knee pads", "Elbow pads", "Skate tool", "Toe stops or brakes"],
    glossary: {
      "Quad skates": "Four-wheeled skates in 2×2 arrangement",
      "Inline skates": "Wheels in a single row (rollerblades)",
      "T-stop": "Dragging one skate perpendicular to stop",
      "Plow stop": "Pushing skates outward into a V to stop",
      "Crossovers": "Crossing one foot over the other while turning",
      "Jam skating": "Rhythmic expressive style to music",
      "Derby stance": "Low crouched position for roller derby"
    }
  },
  {
    name: "Rubik's Cube",
    category: "Puzzles",
    icon: "",
    tools: ["3x3 speed cube (Gan, MoYu)", "Cube lubricant (Traxxas, Maru)", "Timer (Stackmat)", "Cube bag", "Scramble app"],
    glossary: {
      "OLL": "Orientation of Last Layer",
      "PLL": "Permutation of Last Layer",
      "CFOP": "Cross, F2L, OLL, PLL – most popular speed method",
      "F2L": "First Two Layers – pairing corners and edges",
      "Algorithms": "Sequence of moves solving specific cases",
      "Cubie": "Individual small cube within the puzzle",
      "Fingertricks": "Efficient finger movements for fast solving",
      "Sub-X": "Solving consistently under X seconds"
    }
  },
  {
    name: "Running",
    category: "Sports & Fitness",
    icon: "",
    tools: ["Running shoes", "GPS watch", "Running socks", "Moisture-wicking clothes", "Hydration vest/belt", "Foam roller", "Compression socks", "Running app (Strava, Garmin)"],
    glossary: {
      "Cadence": "Steps per minute",
      "Tempo run": "Comfortably hard sustained effort run",
      "Interval training": "Alternating fast efforts with recovery",
      "LSD": "Long Slow Distance – base building run",
      "Negative split": "Running second half faster than first",
      "Bonking": "Severe energy depletion during a run",
      "Pronation": "Inward rolling of foot during ground contact",
      "BQ": "Boston Qualifier – time fast enough to enter Boston Marathon"
    }
  },
  {
    name: "Sailing",
    category: "Water Sports",
    icon: "",
    tools: ["Sailboat", "PFD", "VHF radio", "Charts & compass", "Winch handle", "Foul weather gear", "Flares", "Anchor & rode", "Binoculars"],
    glossary: {
      "Tack": "Turning bow through the wind",
      "Jibe": "Turning stern through the wind",
      "Close hauled": "Sailing as close to wind direction as possible",
      "Beam reach": "Sailing with wind perpendicular to the boat",
      "Running": "Sailing with wind directly behind",
      "Starboard": "Right side of the boat",
      "Port": "Left side of the boat",
      "Heel": "Tilting of boat from wind pressure",
      "Halyards": "Lines used to raise and lower sails"
    }
  },
  {
    name: "Scrapbooking",
    category: "Paper Arts & Crafts",
    icon: "",
    tools: ["Scrapbook album", "Cardstock", "Patterned paper", "Adhesive (dots, tape runner)", "Scissors & craft knife", "Stamps & ink", "Embellishments", "Die-cut machine (Cricut)"],
    glossary: {
      "Layout": "Completed double page spread in a scrapbook",
      "Embellishments": "Decorative elements added to pages",
      "Die cut": "Shape cut by machine or die press",
      "Photo mat": "Cardstock background framing a photo",
      "Journaling": "Written captions and stories on a layout",
      "Distressing": "Aging paper/elements for vintage look",
      "Hybrid scrapping": "Combining digital and physical elements"
    }
  },
  {
    name: "Scuba Diving",
    category: "Water Sports",
    icon: "",
    tools: ["BCD (buoyancy control device)", "Regulator", "Tank", "Wetsuit/drysuit", "Mask", "Fins", "Dive computer", "SMB (surface marker buoy)", "Dive light", "Underwater camera"],
    glossary: {
      "Nitrogen narcosis": "Intoxicating effect of nitrogen at depth",
      "Decompression sickness": "Condition from ascending too fast (the bends)",
      "NDL": "No Decompression Limit – max bottom time at a depth",
      "SAC rate": "Surface Air Consumption – breathing rate measurement",
      "Negative entry": "Entering water while exhaling to descend quickly",
      "Safety stop": "3-minute stop at 5m during every ascent",
      "Thermocline": "Sudden temperature drop between water layers",
      "Drift diving": "Being carried along by current"
    }
  },
  {
    name: "Sculpting",
    category: "Arts",
    icon: "",
    tools: ["Clay (polymer, air dry, oil-based, ceramic)", "Wire armature", "Sculpting tools (loop, ribbon, wire-end)", "Silicone molds", "Epoxy putty", "Rotary carving tool", "Calipers"],
    glossary: {
      "Armature": "Internal skeleton supporting a sculpture",
      "Additive sculpting": "Building up material to create form",
      "Subtractive sculpting": "Removing material from a block",
      "Lost wax casting": "Creating a mold from a wax model to cast metal",
      "Maquette": "Small scale preliminary sculpture",
      "Relief": "Sculpture projecting from a flat background",
      "Patina": "Chemical surface treatment coloring metal sculptures"
    }
  },
  {
    name: "Sewing",
    category: "Fiber Arts",
    icon: "",
    tools: ["Sewing machine", "Serger/overlocker", "Rotary cutter & mat", "Fabric scissors", "Seam ripper", "Dressmaker's pins", "Iron & pressing cloth", "Pattern paper"],
    glossary: {
      "Seam allowance": "Extra fabric beyond stitching line",
      "Selvedge": "Finished edges of fabric as woven",
      "Bias cut": "Cutting at 45° to fabric grain for stretch and drape",
      "Ease": "Extra fabric allowing movement in garments",
      "Dart": "Stitched fold shaping fabric to body curves",
      "Gathering": "Drawing fabric to create fullness",
      "Interfacing": "Stabilizing material fused to fabric",
      "Basting": "Long temporary stitches holding fabric before permanent sewing"
    }
  },
  {
    name: "Singing",
    category: "Music & Performing Arts",
    icon: "",
    tools: ["Microphone", "Audio interface", "In-ear monitors", "Voice recorder", "Piano/keyboard (for practice)", "Pitch pipe", "DAW software"],
    glossary: {
      "Chest voice": "Lower register with resonance felt in the chest",
      "Head voice": "Upper register with resonance in the head",
      "Mix voice": "Blending chest and head voice",
      "Passaggio": "Transition point between vocal registers",
      "Vibrato": "Regular oscillation in pitch adding warmth",
      "Breath support": "Using diaphragm to power and control voice",
      "Legato": "Smooth connected singing style",
      "Melisma": "Many notes sung on a single syllable"
    }
  },
  {
    name: "Skateboarding",
    category: "Board Sports",
    icon: "",
    tools: ["Deck", "Trucks", "Wheels", "Bearings", "Grip tape", "Hardware (nuts & bolts)", "Skate tool", "Wax"],
    glossary: {
      "Ollie": "Basic jump trick popping board off the ground",
      "Kickflip": "Ollie where the board flips along its length",
      "Heelflip": "Board flips outward on the heel side",
      "Grind": "Sliding on trucks along an edge",
      "Manual": "Balancing on the back wheels while rolling",
      "Fakie": "Rolling backward in normal stance",
      "Goofy": "Riding with right foot forward",
      "Regular": "Riding with left foot forward",
      "Switch": "Riding/skating with opposite foot forward"
    }
  },
  {
    name: "Skiing",
    category: "Winter Sports",
    icon: "",
    tools: ["Skis", "Ski boots", "Bindings", "Poles", "Helmet", "Goggles", "Ski jacket & pants", "Base layers", "Gloves"],
    glossary: {
      "Carving": "Turning using ski edges with minimal skidding",
      "Schussing": "Skiing straight downhill without turning",
      "Moguls": "Bumps of compacted snow formed by skier turns",
      "Powder": "Fresh light deep snow",
      "Groomer": "Machine-packed smooth snow run",
      "Catching an edge": "Ski edge catching causing a fall",
      "Snowplow": "Beginner position with ski tips together to brake",
      "Black diamond": "Most difficult marked run category"
    }
  },
  {
    name: "Skydiving",
    category: "Extreme Sports",
    icon: "",
    tools: ["Parachute container system", "Main canopy", "Reserve canopy", "AAD (automatic activation device)", "Altimeter", "Helmet", "Jumpsuit", "Goggles"],
    glossary: {
      "AFF": "Accelerated Freefall – common skydiving training program",
      "Freefall": "Portion of jump before parachute deployment",
      "Cutaway": "Emergency release of malfunctioning main canopy",
      "AAD": "Automatic Activation Device – opens reserve at critical altitude",
      "Canopy piloting": "Precision maneuvering of the open parachute",
      "Formation skydiving": "Multiple people forming shapes in freefall",
      "Wingsuit": "Suit with fabric between limbs for gliding"
    }
  },
  {
    name: "Soap Making",
    category: "Arts & Crafts",
    icon: "",
    tools: ["Scale", "Stick blender", "Safety goggles & gloves", "Stainless/silicone pot", "Soap molds", "Thermometer", "Sodium hydroxide (lye)", "Oils (olive, coconut, shea)", "Fragrance/essential oils"],
    glossary: {
      "Saponification": "Chemical reaction between oils and lye creating soap",
      "Lye": "Sodium hydroxide – essential caustic ingredient",
      "Trace": "Point where soap mixture thickens enough to trail lines",
      "Hot process": "Soap cooked in slow cooker after trace",
      "Cold process": "Soap poured into molds and left to cure",
      "Cure time": "4–6 week waiting period for soap to harden and mellow",
      "Superfat": "Excess oil left unsaponified for skin conditioning",
      "Swirling": "Decorative technique creating patterns in soap"
    }
  },
  {
    name: "Stand-up Comedy",
    category: "Performing Arts",
    icon: "",
    tools: ["Microphone", "Notebook", "Voice recorder", "Stage time (open mics)", "Video camera for review"],
    glossary: {
      "Set": "A comedian's prepared performance material",
      "Bit": "Individual joke or comedic segment",
      "Tag": "Additional punchline following the main punchline",
      "Callback": "Reference to earlier joke made later in set",
      "Bombing": "Performing without getting laughs",
      "Killing": "Performing to great audience response",
      "Open mic": "Event where anyone can perform short sets",
      "Tight five": "Five minutes of polished material",
      "Rule of three": "Pattern using two expectations and one subverted one"
    }
  },
  {
    name: "Storm Chasing",
    category: "Science & Outdoors",
    icon: "",
    tools: ["Weather apps & radar (RadarScope)", "GPS & maps", "Camera with telephoto lens", "Dashcam", "Radio (NOAA weather)", "Hail guards for vehicle", "Spotting scope"],
    glossary: {
      "Supercell": "Rotating thunderstorm capable of producing tornadoes",
      "Mesocyclone": "Rotating updraft within a supercell",
      "Wall cloud": "Lowering of cloud base indicating intense updraft",
      "Anvil": "Flat top of a thunderstorm cloud",
      "Hook echo": "Radar signature indicating tornado potential",
      "Outflow boundary": "Boundary of cool air from a storm's downdraft",
      "Intercept": "Successfully positioning close to the storm target"
    }
  },
  {
    name: "Surfing",
    category: "Water Sports",
    icon: "",
    tools: ["Surfboard (shortboard/longboard/fish/foamie)", "Fins", "Leash", "Wax", "Wetsuit", "Rash guard", "Surf wax comb"],
    glossary: {
      "Duck dive": "Submerging board to get through breaking waves",
      "Paddle out": "Getting from shore out to the lineup",
      "Lineup": "Area where surfers wait for waves",
      "Take off": "Jumping up to standing position on a wave",
      "Barrel": "Hollow tube created by a breaking wave",
      "Goofy": "Riding right foot forward",
      "Regular": "Riding left foot forward",
      "Stoke": "Excitement and joy from surfing",
      "Kook": "Inexperienced or disrespectful surfer"
    }
  },
  {
    name: "Swimming",
    category: "Sports & Fitness",
    icon: "",
    tools: ["Swim goggles", "Swim cap", "Kickboard", "Pull buoy", "Fins (training)", "Paddles", "Waterproof fitness tracker", "Drag suit"],
    glossary: {
      "Freestyle": "Front crawl – the fastest swim stroke",
      "Breaststroke": "Frog-kick stroke swum face down",
      "Backstroke": "Swimming on back with alternating arm pulls",
      "Butterfly": "Simultaneous double-arm stroke with dolphin kick",
      "Flip turn": "Somersault turn at the pool wall",
      "DPS": "Distance Per Stroke – efficiency measure",
      "Open turn": "Turn touching wall without a flip",
      "Drafting": "Swimming in another swimmer's wake to reduce drag"
    }
  },
  {
    name: "Tarot",
    category: "Spiritual & Mystical",
    icon: "",
    tools: ["Tarot deck (Rider-Waite or preferred deck)", "Reading cloth", "Journal", "Guidebook", "Crystals (optional)", "Candles"],
    glossary: {
      "Major Arcana": "22 trump cards representing life's major themes",
      "Minor Arcana": "56 suit cards (Wands, Cups, Swords, Pentacles)",
      "Spread": "Layout pattern positioning cards for a reading",
      "Reversed card": "Card upside down with potentially altered meaning",
      "Significator": "Card representing the person being read for",
      "Shadow card": "Card on bottom of deck offering additional insight",
      "Celtic Cross": "Popular 10-card spread for detailed readings"
    }
  },
  {
    name: "Taxidermy",
    category: "Science & Nature",
    icon: "",
    tools: ["Scalpel & knives", "Fleshing tool", "Preservative (borax)", "Glass eyes", "Manniform (foam form)", "Sculpting epoxy", "Hide paste", "Mounting wire"],
    glossary: {
      "Fleshing": "Removing fat and flesh from a hide",
      "Pickle": "Acidic solution preserving and preparing hides",
      "Tanning": "Preserving hide to prevent decomposition",
      "Mannequin/Form": "Pre-made body form from foam for mounting",
      "Skull cleaning": "Cleaning skulls via beetles or maceration",
      "Freeze dry": "Method preserving specimens with very life-like results",
      "Wet specimen": "Animal preserved in liquid (usually formalin/alcohol)"
    }
  },
  {
    name: "Tennis",
    category: "Racket Sports",
    icon: "",
    tools: ["Racket", "Tennis balls", "Overgrip", "Vibration dampener", "Tennis shoes", "Ball machine", "Stringing machine"],
    glossary: {
      "Ace": "Serve opponent cannot touch",
      "Love": "Zero points",
      "Deuce": "Score tied at 40-40",
      "Topspin": "Forward ball rotation causing it to dip sharply",
      "Slice": "Backspin shot that stays low",
      "Volley": "Ball struck before it bounces",
      "Lob": "High arcing shot over opponent",
      "Break": "Winning a game on opponent's serve",
      "Grand Slam": "Four major tournaments (Australian, French, Wimbledon, US Open)"
    }
  },
  {
    name: "Terrariums",
    category: "Nature & Gardening",
    icon: "",
    tools: ["Glass container (open/closed)", "Pebbles/drainage layer", "Activated charcoal", "Substrate (potting mix)", "Long tweezers & tongs", "Misting bottle", "Small plants & mosses"],
    glossary: {
      "Closed terrarium": "Sealed container creating self-sustaining ecosystem",
      "Open terrarium": "Container with opening for air circulation",
      "Drainage layer": "Gravel/leca layer preventing root rot",
      "Bioactive": "Living ecosystem with cleanup crew insects",
      "Vivarium": "Living space for animals with live plants",
      "Paludarium": "Combination aquatic and terrestrial terrarium",
      "LECA": "Lightweight Expanded Clay Aggregate – drainage medium"
    }
  },
  {
    name: "Thrifting",
    category: "Collecting & Shopping",
    icon: "",
    tools: ["Reusable tote bags", "Measuring tape", "Fabric testing (burn test for fibers)", "Price guide apps", "Phone for research/authentication"],
    glossary: {
      "Haul": "Collection of thrift finds from one trip",
      "Deadstock": "New old stock never sold or used",
      "Depop/Poshmark": "Resale platforms for secondhand clothing",
      "Grail": "Highly sought-after specific item",
      "Thrift flip": "Altering thrifted items to sell or wear",
      "Vintage": "Typically items 20–99 years old",
      "Antique": "Items 100+ years old"
    }
  },
  {
    name: "Thru-hiking",
    category: "Outdoors",
    icon: "",
    tools: ["Ultralight pack (30–50L)", "Shelter (tarp/tent/bivy)", "Sleeping bag/quilt", "Water filter", "Navigation tools", "Trekking poles", "Resupply box supplies", "Satellite communicator (Garmin inReach)"],
    glossary: {
      "NOBO/SOBO": "Northbound/Southbound – direction of travel on a trail",
      "Trail magic": "Unexpected trail-side food/drink provided by strangers",
      "Trail angel": "Person providing assistance to thru-hikers",
      "Trail name": "Nickname adopted by thru-hikers",
      "Zero day": "Day spent in town with no hiking miles",
      "Nero": "Nearly zero – very short mileage day",
      "Town chores": "Re-supplying, laundry, and rest in town",
      "The Triple Crown": "AT + PCT + CDT – all three major US thru-hikes"
    }
  },
  {
    name: "Travel",
    category: "Lifestyle",
    icon: "",
    tools: ["Passport", "Travel insurance", "Day pack", "Packing cubes", "Universal adapter", "Offline maps (Maps.me)", "Noise-canceling headphones", "Money belt"],
    glossary: {
      "Slow travel": "Spending extended time in fewer places",
      "Digital nomad": "Working remotely while traveling long-term",
      "Layover": "Stop between connecting flights",
      "Open jaw": "Flying into one city, departing from another",
      "RTW ticket": "Round-the-world multi-stop flight ticket",
      "Bleisure": "Combining business and leisure travel",
      "Voluntourism": "Combining volunteering with travel experiences"
    }
  },
  {
    name: "Urban Exploration",
    category: "Outdoors & Adventure",
    icon: "",
    tools: ["Headlamp", "Respirator mask", "Sturdy boots", "Gloves", "First aid kit", "Camera", "Buddy (never go alone)", "Phone with offline maps"],
    glossary: {
      "Urbex": "Shorthand for urban exploration",
      "Infiltration": "Accessing active or secure locations",
      "Abandon": "Abandoned building or location",
      "Draining": "Exploring storm drains and sewer systems",
      "Rooftopping": "Climbing buildings to access rooftops",
      "TOAP": "Take Only Photographs, leave only footprints",
      "Peeling paint porn": "Aesthetic appreciation of decay and texture"
    }
  },
  {
    name: "VR Gaming",
    category: "Gaming & Tech",
    icon: "",
    tools: ["VR headset (Quest, PlayStation VR, Valve Index)", "Controllers", "Play space (6x6 ft minimum)", "PC (for PCVR)", "Charging cables", "Lens cloth"],
    glossary: {
      "Room scale": "Moving physically around play space in VR",
      "6DOF": "Six Degrees of Freedom – full movement tracking",
      "IPD": "Interpupillary Distance – lens spacing adjustment",
      "Presence": "Psychological feeling of actually being in VR",
      "Comfort mode": "Settings reducing motion sickness risk",
      "Tracking": "Headset/controller position detection system",
      "Passthrough": "Seeing real world through headset cameras"
    }
  },
  {
    name: "Video Game Developing",
    category: "Tech & Games",
    icon: "",
    tools: ["Game engine (Unity, Unreal, Godot)", "Code editor (VS Code)", "Version control (Git)", "Art tools (Aseprite, Blender)", "Sound tools (FMOD, Audacity)", "Itch.io account"],
    glossary: {
      "Game loop": "Core cycle of receiving input, updating state, rendering",
      "Prefab": "Reusable pre-configured game object",
      "Sprite": "2D image/animation used in a game",
      "Collision detection": "Detecting when game objects overlap",
      "Shader": "Program controlling how objects are rendered",
      "Pathfinding": "Algorithm finding optimal routes for AI characters",
      "GDD": "Game Design Document – blueprint of a game's design",
      "Playtesting": "Testing game with real players for feedback"
    }
  },
  {
    name: "Vintage Cars",
    category: "Automotive",
    icon: "",
    tools: ["Socket set", "Torque wrench", "Body hammers & dollies", "MIG welder", "Rust treatment", "Paint gun", "Rotisserie (for full restoration)", "Parts reference manuals"],
    glossary: {
      "Concours": "Pristine show-quality restoration",
      "Driver quality": "Restored to drive, not necessarily show",
      "Barn find": "Rare car discovered stored long-term",
      "Numbers matching": "Original engine/components matching body VIN",
      "Patina": "Original aging and wear kept deliberately",
      "Resto-mod": "Classic body with modern mechanical updates",
      "Survivor": "Original low-mileage car with minimal restoration"
    }
  },
  {
    name: "Voice Acting",
    category: "Performing Arts & Media",
    icon: "",
    tools: ["Condenser microphone", "Audio interface", "Pop filter", "Acoustic treatment", "Headphones", "DAW (Adobe Audition)", "Home studio space"],
    glossary: {
      "VO": "Voice over",
      "Copy": "The script being performed",
      "Cold read": "Performing material without preparation",
      "Scratch track": "Rough placeholder recording",
      "Warm up": "Vocal exercises before a session",
      "Pickup": "Re-recording specific lines or words",
      "Direction": "Instructions from clients/directors on delivery",
      "Booth": "Soundproofed recording room"
    }
  },
  {
    name: "Volleyball",
    category: "Sports",
    icon: "",
    tools: ["Volleyball", "Net & poles", "Knee pads", "Court shoes", "Libero jersey (for libero position)"],
    glossary: {
      "Spike": "Powerful attacking hit from height",
      "Serve receive": "Passing the serve to the setter",
      "Dig": "Defensive pass of a hard-driven ball",
      "Kill": "Successful attack resulting in a point",
      "Block": "Jumping to deflect opponent's attack at net",
      "Libero": "Defensive specialist in distinctive jersey",
      "Six rotation": "System where all 6 players rotate through all positions",
      "Float serve": "Serve with no spin that moves unpredictably"
    }
  },
  {
    name: "Welding",
    category: "Making & Crafts",
    icon: "",
    tools: ["MIG welder", "TIG welder", "Stick/ARC welder", "Auto-darkening helmet", "Welding gloves", "Angle grinder", "Clamps & magnets", "Wire brush", "Chipping hammer"],
    glossary: {
      "MIG": "Metal Inert Gas – wire-fed semi-automatic welding",
      "TIG": "Tungsten Inert Gas – precise high-quality welding",
      "Stick": "Shielded Metal Arc – versatile outdoor welding",
      "Puddle": "The molten metal pool during welding",
      "Spatter": "Small metal droplets ejected during welding",
      "Porosity": "Gas pockets trapped in weld causing weakness",
      "Penetration": "Depth the weld fuses into base metal",
      "Bead": "Completed weld line"
    }
  },
  {
    name: "Whittling",
    category: "Making & Crafts",
    icon: "",
    tools: ["Whittling knife", "Detail knife", "Strop & compound", "Basswood/butternut blanks", "Cut-resistant gloves", "Sandpaper", "Danish oil finish"],
    glossary: {
      "Basswood": "Soft pale wood ideal for beginners",
      "Push cut": "Cutting away from the body with thumb as pivot",
      "Pull cut": "Drawing knife toward the body with control",
      "Pare cut": "Removing thin controlled shavings",
      "Grain direction": "Which way wood fibers run – cut with the grain",
      "Strop": "Leather strip for final edge polishing",
      "Bench knife": "Larger knife for rough shaping",
      "Chip carving": "Removing geometric chip shapes for decorative patterns"
    }
  },
  {
    name: "Wine Tasting & Making",
    category: "Food & Drink",
    icon: "",
    tools: ["Wine glasses (ISO)", "Decanter", "Wine key/corkscrew", "Aerator", "Vacuum pump stoppers", "Tasting notebook", "Fermenter & airlock (winemaking)", "Hydrometer", "Crush pad/press (winemaking)"],
    glossary: {
      "Tannins": "Compounds causing drying astringent sensation",
      "Terroir": "Sum of environmental factors expressing in wine",
      "Vintage": "Year grapes were harvested",
      "Sediment": "Natural deposits in aged wine",
      "Legs": "Droplets running down glass after swirling (viscosity indicator)",
      "Finish": "Flavor lingering after swallowing",
      "Sulfites": "Preservative naturally occurring and added to wine",
      "Malolactic fermentation": "Secondary fermentation reducing acidity"
    }
  },
  {
    name: "Witchcraft",
    category: "Spiritual & Mystical",
    icon: "",
    tools: ["Athame (ritual knife)", "Wand", "Cauldron", "Crystals", "Tarot deck", "Grimoire/Book of Shadows", "Candles", "Herbs & incense", "Altar"],
    glossary: {
      "Grimoire": "Magical workbook recording spells and rituals",
      "Sigil": "Symbolic graphic encoding a magical intention",
      "Correspondences": "Associations between colors, herbs, moon phases and intentions",
      "Sabbat": "Eight seasonal celebrations in Wicca/Paganism",
      "Esbat": "Full moon ritual gathering",
      "Casting a circle": "Creating sacred protected space for ritual",
      "Charging": "Infusing an object with intention or energy",
      "Grounding": "Connecting with earth energy to release excess energy"
    }
  },
  {
    name: "Woodworking",
    category: "Making & Crafts",
    icon: "",
    tools: ["Table saw", "Band saw", "Router", "Jointer & planer", "Hand planes", "Chisels", "Clamps", "Sandpaper & ROS (random orbit sander)", "Marking gauge", "Square"],
    glossary: {
      "Grain": "Direction of wood fiber growth",
      "Board feet": "Unit of lumber measurement (144 cubic inches)",
      "Joinery": "Method of connecting wood pieces (dovetail, mortise & tenon)",
      "Kerf": "Material removed by a saw blade",
      "Tearout": "Wood grain lifting and splintering during cutting",
      "Snipe": "Extra material removed at board's end by a planer",
      "Checking": "Cracks along wood grain from drying",
      "Finishing": "Applying protective surface coating to wood"
    }
  },
  {
    name: "Wrestling",
    category: "Martial Arts & Sports",
    icon: "",
    tools: ["Wrestling shoes", "Singlet", "Headgear", "Knee pads", "Mouth guard", "Wrestling mat"],
    glossary: {
      "Takedown": "Taking opponent from standing to the mat",
      "Escape": "Getting from bottom to neutral or top position",
      "Reversal": "Going from bottom to top scoring position",
      "Pin/fall": "Holding both opponent's shoulders to mat for two seconds",
      "Neutral position": "Both wrestlers standing",
      "Sprawl": "Defensive movement blocking a leg shot",
      "Sit-out": "Bottom move to escape to neutral",
      "Cradle": "Pinning combination encircling opponent's head and leg"
    }
  },
  {
    name: "Writing",
    category: "Arts & Literature",
    icon: "",
    tools: ["Word processor (Scrivener, Word, Google Docs)", "Thesaurus & dictionary", "Style guide (Chicago, AP)", "Notebook", "Beta readers", "Editing software (Grammarly, ProWritingAid)"],
    glossary: {
      "POV": "Point of View – perspective narrative is told from",
      "Show don't tell": "Expressing through action/dialogue rather than stating directly",
      "Plot arc": "Overall narrative structure of a story",
      "Inciting incident": "Event that starts the main conflict",
      "Red herring": "Misleading detail diverting reader's attention",
      "MacGuffin": "Object motivating characters but not important in itself",
      "Denouement": "Resolution following the climax",
      "Voice": "Distinctive style and personality of writing"
    }
  },
  {
    name: "Yoga",
    category: "Fitness & Wellness",
    icon: "",
    tools: ["Yoga mat", "Yoga blocks", "Strap", "Bolster", "Blanket", "Yoga wheel", "Comfortable clothing"],
    glossary: {
      "Asana": "Physical yoga posture",
      "Pranayama": "Breath control practices",
      "Vinyasa": "Flowing sequences synchronizing breath and movement",
      "Hatha": "Traditional style focusing on individual poses",
      "Savasana": "Final relaxation pose (corpse pose)",
      "Drishti": "Focused gaze point during poses",
      "Bandha": "Internal muscular 'lock' engaging core energy",
      "Sun salutation": "Classic flowing sequence of poses",
      "Namaste": "Greeting honoring the light in each person"
    }
  },
  {
    name: "Yo-Yoing",
    category: "Skill Toys",
    icon: "",
    tools: ["Responsive yo-yo (beginner)", "Unresponsive yo-yo (advanced)", "Extra strings (polyester)", "Bearing lubricant", "Bearing removal tool"],
    glossary: {
      "Responsive": "Yo-yo returning when you tug the string",
      "Unresponsive": "Yo-yo requiring a bind to return",
      "Bind": "Trick creating friction to bring an unresponsive yo-yo back",
      "Slack": "Trick using loose string tension and momentum",
      "Whip": "String whipped to catch on the yo-yo's bearing",
      "1A/2A/3A/4A/5A": "Different yo-yo play styles",
      "Grind": "Allowing yo-yo to spin on body part"
    }
  },
  {
    name: "Zumba",
    category: "Fitness & Dance",
    icon: "",
    tools: ["Dance/aerobics shoes", "Comfortable workout clothes", "Water bottle", "Heart rate monitor"],
    glossary: {
      "Basic step": "Foundational side-to-side movement",
      "Merengue": "Two-beat Latin dance rhythm used in Zumba",
      "Salsa": "Eight-beat Latin rhythm with hip movement",
      "Cumbia": "Colombian rhythm with rocking step pattern",
      "Reggaeton": "Urban Latin rhythm with bouncing movement",
      "Cool-down": "Stretching portion ending a Zumba class",
      "Z-slide": "Sliding movement variation",
      "Zumba Gold": "Lower-intensity version for older adults"
    }
  }
];
