export type Content = {
  description: string;
  tools: string[];
  glossary: Array<[string, string]>;
};

export const SPECIFIC: Record<string, Content> = {
  "thoda archery": {
    description: "Thoda is a traditional archery-based festival game played in Himachal Pradesh, India, between clans claiming Pandava (Pashi) and Kaurava (Saathi) descent. Held on Baisakhi, archers shoot blunt wooden-tipped arrows at opponents' legs while accompanying teams perform the Pateira dance with drums and flutes.",
    tools: ["Bamboo bow ~2 m", "Blunt wooden-tipped arrows (thoda tip)", "Leg and foot cloth wraps", "Traditional woolen pahari attire", "Drums (dhol, nagara) and flutes", "Open village field"],
    glossary: [
      ["Pashi", "Clan claiming Pandava descent"],
      ["Saathi", "Opposing clan claiming Kaurava descent"],
      ["Baisakhi", "Mid-April harvest festival when Thoda is played"],
      ["Dhamjaal", "Team of archers (warriors) shooting"],
      ["Pateira", "Accompanying dance team with music"],
      ["Thoda", "Round blunt tip of the arrow which names the game"],
    ],
  },
  "field archery": {
    description: "Field archery is shot along an outdoor course of 24–28 targets at varying unmarked or marked distances through wooded or undulating terrain. Modern field archery was standardized by the National Field Archery Association (USA, 1939) and later the FITA/World Archery Field Championships.",
    tools: ["Recurve or compound bow", "Aluminum or carbon arrows", "Arm guard and finger tab or release aid", "Binocular for target scoring", "Quiver (hip or back)", "Field-course scorecard"],
    glossary: [
      ["Marked round", "Course with known distances posted at each target"],
      ["Unmarked round", "Distances hidden — archer judges range"],
      ["Fan shoot", "Multiple stakes shooting at one target from different angles"],
      ["Walk-up", "Shoot from progressively closer stakes on one target"],
      ["3D target", "Animal-shaped foam target used in 3D field rounds"],
      ["X ring", "Innermost scoring ring breaking ties"],
    ],
  },
  "traditional archery": {
    description: "Traditional archery uses historically styled bows — longbows, recurves without modern sights, horse bows — and emphasizes instinctive shooting. It spans English longbow, Asian composite recurve, and various tribal traditions, each with its own draw style and arrow spine conventions.",
    tools: ["Longbow or traditional recurve", "Wooden or bamboo arrows", "Leather arm guard and shooting glove", "Back or side quiver", "Beeswax bowstring wax", "Stringer for bracing the bow"],
    glossary: [
      ["Self bow", "Bow carved from a single stave of wood"],
      ["Laminated bow", "Bow glued up from multiple wood layers"],
      ["Nocking point", "Marked spot on the string where the arrow sits"],
      ["Brace height", "Distance from grip to string at rest"],
      ["Spine", "Stiffness of an arrow, matched to bow draw weight"],
      ["Mediterranean draw", "Three-finger European string grip"],
    ],
  },
  "compound archery": {
    description: "Compound archery uses bows whose cams and cables multiply energy and provide a let-off at full draw, making high draw weights easier to hold. Invented by Holless Wilbur Allen in 1966 (US patent 1969), the compound dominates modern target, field, and bowhunting.",
    tools: ["Compound bow with cam system", "Mechanical release aid", "Sight with pins or scope", "Stabilizer and counterweights", "Arrow rest (drop-away common)", "Carbon arrows tuned to the setup"],
    glossary: [
      ["Let-off", "Holding weight reduction at full draw (65–90%)"],
      ["Cam", "Elliptical pulley shaping the draw-force curve"],
      ["Peep sight", "Small aperture in the string for rear alignment"],
      ["D-loop", "String loop the release clips to"],
      ["Back wall", "Solid stop at full draw"],
      ["Torque", "Unwanted bow rotation affecting arrow flight"],
    ],
  },
  "3d archery": {
    description: "3D archery shoots arrows at life-size foam animal targets placed along woodland courses to simulate hunting scenarios. Formalized by the IBO and ASA in the 1980s in the US, it is a major bowhunting-adjacent sport with modern world championships.",
    tools: ["Hunting-style compound or recurve", "3D-legal arrows", "Binoculars for scoring rings", "Rangefinder (in marked classes)", "Quiver and scorecard", "Sturdy footwear for uneven terrain"],
    glossary: [
      ["Vital ring", "Scoring zone corresponding to an animal's heart/lungs"],
      ["Stake", "Marker where the archer stands for each target"],
      ["Known / Unknown", "Class allowing or forbidding rangefinders"],
      ["Hunter class", "Setup constraints approximating hunting gear"],
      ["Open class", "Less restricted class allowing top-end gear"],
      ["IBO ring", "Scoring rings defined by the International Bowhunters Org"],
    ],
  },
  "atlatl": {
    description: "The atlatl is a spear-throwing lever used by pre-contact peoples on every inhabited continent, extending the arm to launch a dart 2–3× faster than by hand. Still thrown competitively through the World Atlatl Association.",
    tools: ["Atlatl (wooden spear thrower)", "Flexible darts (~1.5–2 m)", "Fletching for the darts", "Target bale or foam animal", "Measuring tape", "Spare dart shafts"],
    glossary: [
      ["Dart", "Flexible spear-like projectile (not an arrow)"],
      ["Spur", "Hook at the atlatl's far end engaging the dart's nock"],
      ["Bannerstone", "Prehistoric weight attached to atlatls (likely balance/utility)"],
      ["Flex", "Spring action of the dart on release, adding cast"],
      ["Cast", "Distance a given atlatl/dart combination achieves"],
      ["ISAC", "International Standard Accuracy Contest governed by WAA"],
    ],
  },

  "skiing": {
    description: "Skiing is gliding over snow on long runners. Practical roots stretch back 8,000+ years in Scandinavia and the Altai region; modern recreational skiing emerged in 19th-century Norway and today splits into alpine, nordic, freestyle, and backcountry disciplines.",
    tools: ["Skis", "Ski boots", "Ski poles", "Helmet", "Goggles", "Gloves", "Base layers and insulated jacket", "Wax and scrapers"],
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
    description: "Alpine skiing is downhill skiing on groomed mountain slopes using fixed-heel bindings, emphasizing speed and edge control. Formalized as a competitive discipline in the Alps in the 1920s–30s and in the Winter Olympics since 1936.",
    tools: ["Alpine skis", "Stiff alpine boots", "Bindings with DIN release", "Helmet", "Goggles", "Race suit (for slalom)", "Ski wax"],
    glossary: [
      ["Slalom", "Short-turn race between closely-spaced gates"],
      ["Giant slalom", "Longer radius turns on a steeper course"],
      ["Super-G", "Super giant slalom — higher speed, fewer gates"],
      ["Downhill", "Fastest alpine discipline with long straight sections"],
      ["DIN", "Release setting on bindings based on weight and ability"],
      ["Hard pack", "Dense compressed snow surface"],
    ],
  },
  "cross-country skiing": {
    description: "Cross-country skiing is self-propelled travel over snow on lightweight skis with free heels. Born as transport in prehistoric Scandinavia, it is now both a recreational backcountry pursuit and an Olympic endurance sport with classic and skate techniques.",
    tools: ["XC skis (classic or skate)", "XC boots", "Poles sized to the discipline", "Grip wax or skins", "Glide wax", "Layered breathable clothing"],
    glossary: [
      ["Diagonal stride", "Classic technique kicking and gliding alternately"],
      ["Skate skiing", "V-pushing technique on groomed skate lanes"],
      ["Kick zone", "Middle ski section gripping the snow"],
      ["Herringbone", "Climbing technique with splayed tips"],
      ["Klister", "Sticky grip wax for warm wet snow"],
      ["Double pole", "Propulsion using both poles simultaneously"],
    ],
  },
  "ski jumping": {
    description: "Ski jumping sends athletes down a steep in-run to launch as far as possible from a takeoff ramp, scored on distance and style. Originating in 19th-century Norway (Olaf Rye's 1809 jump is commonly cited as the earliest recorded), Olympic since 1924.",
    tools: ["Long specialized jumping skis", "Flexible jumping boots", "Aerodynamic suit", "Helmet", "Goggles", "Wax"],
    glossary: [
      ["K-point", "Construction point of a hill (target landing zone)"],
      ["Hill size", "Total maximum safe jumping distance"],
      ["In-run", "Acceleration ramp before the takeoff"],
      ["Telemark landing", "Required landing posture with one ski forward"],
      ["V-style", "Modern airborne ski position forming a V"],
      ["Style points", "Judges' marks (0–20 each) for flight and landing"],
    ],
  },
  "freestyle skiing": {
    description: "Freestyle skiing combines aerial acrobatics and skiing in events like moguls, aerials, halfpipe, and slopestyle. Emerging from the 1960s–70s 'hot dog' ski scene in the US, it became an Olympic sport in 1992.",
    tools: ["Twin-tip freestyle skis", "Softer freestyle boots", "Helmet with freestyle certification", "Impact shorts", "Park-specific wax"],
    glossary: [
      ["Moguls", "Bumps course with two aerial jumps"],
      ["Halfpipe", "U-shaped snow ramp for aerial tricks"],
      ["Slopestyle", "Course with jumps, rails, and features"],
      ["Aerials", "Dedicated jumping event with flips and twists"],
      ["Switch", "Skiing or landing backward"],
      ["Grab", "Holding part of the ski mid-air for style"],
    ],
  },
  "snowboarding": {
    description: "Snowboarding descends snow slopes on a single board with feet strapped across. Invented in 1965 by Sherman Poppen's 'Snurfer' toy and developed through the 1970s–80s by Burton, Sims and others; Olympic since 1998.",
    tools: ["Snowboard", "Snowboard boots", "Bindings", "Helmet", "Goggles", "Wrist guards", "Base layers and shell"],
    glossary: [
      ["Goofy", "Stance with right foot forward"],
      ["Regular", "Stance with left foot forward"],
      ["Heelside/Toeside", "Edges corresponding to heels and toes"],
      ["Switch", "Riding the opposite of natural stance"],
      ["Ollie", "Jumping by loading and releasing the tail"],
      ["Cambered / Reverse / Flat", "Board profiles affecting pop and float"],
    ],
  },

  "chess": {
    description: "Chess is a two-player strategy board game on an 8×8 board with 16 pieces per side. It evolved from the Indian game chaturanga around the 6th century, spread through Persia (shatranj) and the Islamic world to Europe, and reached its modern form around 1475.",
    tools: ["Chess set and board", "Chess clock", "Scorebook or notation pad", "Opening and endgame books", "Chess engine (Stockfish)", "Online platform account (Lichess, Chess.com)"],
    glossary: [
      ["Fork", "One piece attacking two or more at once"],
      ["Pin", "Line-piece attack restricting a piece shielding a more valuable one"],
      ["Skewer", "Reverse pin; valuable piece forced to move exposing a lesser one"],
      ["Zugzwang", "Position where any move worsens one's own stance"],
      ["En passant", "Pawn capture of a pawn that advanced two squares past it"],
      ["Castling", "King–rook swap move protecting the king"],
      ["Elo", "Rating system measuring relative strength"],
      ["Tempo", "Unit of initiative, gained by forcing the opponent's hand"],
    ],
  },
  "go": {
    description: "Go is a territorial board game for two players placing stones on a 19×19 grid. Originating in China more than 2,500 years ago, it remains central to East Asian board-game culture and has one of the deepest strategic decision trees of any game.",
    tools: ["19×19 Go board (goban)", "Black and white stones", "Stone bowls", "Timer/clock", "Joseki reference", "Game record sheets"],
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
    description: "Poker is a family of card games combining hand rankings with betting and bluffing. Traced to early 19th-century New Orleans from French and Persian antecedents (bouillotte, as nas); Texas Hold'em became the dominant variant after 1970s televised tournaments.",
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
  "mahjong": {
    description: "Mahjong is a tile game for four players developed in mid-19th-century China and now the most popular game in much of East Asia. Players draw and discard tiles to build winning hands of sets and a pair; variants include Riichi (Japan), Hong Kong, Taiwanese, and American.",
    tools: ["Set of 144 mahjong tiles", "Dice", "Racks (in some variants)", "Wind markers", "Scoring sheets", "Automatic table (optional)"],
    glossary: [
      ["Pung", "Three identical tiles"],
      ["Kong", "Four identical tiles"],
      ["Chow", "Three consecutive tiles of the same suit"],
      ["Riichi", "Japanese declaration of a ready hand"],
      ["Dora", "Bonus indicator tile awarding extra points"],
      ["Yaku", "Scoring element defining a valid Japanese hand"],
    ],
  },
  "backgammon": {
    description: "Backgammon is a two-player race-and-contact game of 15 checkers each, moved by dice rolls around a board of 24 points. One of the oldest board games — ancestors like the Royal Game of Ur and Tabula date back 5,000 years.",
    tools: ["Backgammon board", "30 checkers (15 per player)", "Two pairs of dice", "Doubling cube", "Dice cups (in match play)", "Scoresheet"],
    glossary: [
      ["Point", "One of 24 triangles on the board"],
      ["Pip count", "Total pips a player still needs to bear off"],
      ["Bear off", "Removing checkers from the home board"],
      ["Prime", "Six consecutive points blocking the opponent"],
      ["Doubling cube", "Cube used to raise the stake during a game"],
      ["Hit", "Sending a lone opposing checker to the bar"],
    ],
  },
  "settlers of catan": {
    description: "The Settlers of Catan is a resource-trading strategy board game designed by Klaus Teuber and published by Kosmos in 1995. Its asymmetric starts, dice-driven production, and constant player negotiation helped trigger the modern Eurogame boom.",
    tools: ["Catan board (hexes and frames)", "Resource and development card decks", "Wooden roads, settlements, cities", "Two dice", "Number tiles", "Score track"],
    glossary: [
      ["Longest road", "Bonus VP for continuous road of 5+"],
      ["Largest army", "Bonus VP for 3+ played knight cards"],
      ["Development card", "Deck of knights, VPs, progress cards"],
      ["Robber", "Blocking token moved on a 7 roll"],
      ["Trading", "Player-to-player resource exchange"],
      ["Victory point", "Tracked to the winning total (10 in base game)"],
    ],
  },

  "running": {
    description: "Running is sustained bipedal locomotion with an aerial phase. Endurance running likely shaped human evolution; competitive running begins with ancient Greek stadia and the Olympics (776 BCE), and the modern road-race boom started after the 1970s jogging wave.",
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
  "marathon": {
    description: "The marathon is a 42.195 km (26.2 mi) footrace commemorating Pheidippides' legendary run from Marathon to Athens. The modern event was created for the 1896 Athens Olympics; the standard distance was fixed in 1908 at the London Games.",
    tools: ["Training-grade running shoes", "Race kit (bib, timing chip)", "GPS watch", "Fueling (gels, chews, drink)", "Anti-chafe balm", "Foil blanket for finish"],
    glossary: [
      ["Wall", "Point (~30 km) where glycogen depletes sharply"],
      ["Carb-load", "Increased carbs 1–3 days before the race"],
      ["Taper", "Reduced mileage in the final weeks"],
      ["Pacer", "Runner holding a set finish time for a group"],
      ["BQ", "Boston Marathon qualifying time"],
      ["Split", "Time at each kilometer or 5 km segment"],
    ],
  },
  "ultramarathon": {
    description: "An ultramarathon is any footrace longer than the marathon, from 50 km up to multi-day mountain events. Modern ultra racing grew from 1970s pioneers like the Western States 100 (1977) and now spans road, trail, desert, and polar terrain.",
    tools: ["Trail-running shoes", "Hydration vest", "Headlamp and spare batteries", "Poles (for mountain races)", "Drop bags for aid stations", "Electrolyte and calorie plan"],
    glossary: [
      ["Aid station", "On-course stop with water, food, medical"],
      ["Cutoff", "Time by which a runner must reach a point"],
      ["Drop bag", "Pre-staged gear at chosen aid stations"],
      ["Pacer", "Allowed companion running with the athlete on later sections"],
      ["FKT", "Fastest Known Time on a specific trail"],
      ["Buckle", "Finisher award at many US 100-milers"],
    ],
  },
  "sprinting": {
    description: "Sprinting is all-out running over short distances, primarily 60, 100, 200, and 400 metres. Modern sprint events trace from 19th-century British and US track, with Jesse Owens and, later, Usain Bolt defining eras of the 100 m world record.",
    tools: ["Spike shoes", "Starting blocks", "Timing gates or photo finish", "Racing singlet", "Resistance sled (training)", "Hurdles or cones for drills"],
    glossary: [
      ["Block start", "Push-off from starting blocks at the gun"],
      ["Drive phase", "Initial accelerating steps with forward body lean"],
      ["Top-end speed", "Maximum velocity phase, reached around 60 m"],
      ["Reaction time", "Delay between gun and first force into blocks"],
      ["False start", "Leaving blocks before the gun — disqualifying"],
      ["Wind-legal", "Tailwind ≤ 2.0 m/s for record purposes"],
    ],
  },

  "cycling": {
    description: "Cycling is human-powered travel on a bicycle. The first practical bicycles appeared in 1860s France; the safety bicycle (1880s) and pneumatic tire transformed it into mass transport and sport. Modern cycling spans road, MTB, gravel, track, BMX, and commuting.",
    tools: ["Road or gravel bicycle", "Helmet", "Cycling shoes and cleats", "Bib shorts and jersey", "Water bottles", "Bike computer/GPS", "Multi-tool, pump, spare tube"],
    glossary: [
      ["Peloton", "Main group of cyclists in a race"],
      ["Cadence", "Pedal revolutions per minute"],
      ["Drafting", "Riding in another rider's slipstream"],
      ["Power-to-weight", "Watts per kilogram, a key climbing metric"],
      ["FTP", "Functional Threshold Power — sustainable 60-min wattage"],
      ["Bonk", "Severe fatigue from glycogen depletion"],
    ],
  },
  "mountain biking": {
    description: "Mountain biking rides bicycles off-road on rough terrain. Born in the Marin County hills of California in the mid-1970s around the 'Repack' downhill races, it now spans cross-country, trail, enduro, downhill, and dirt jumping disciplines.",
    tools: ["MTB bicycle (hardtail or full suspension)", "Full-face or trail helmet", "Knee and elbow pads", "Clipless or flat pedals and shoes", "Hydration pack", "Mini pump, multi-tool, spare tube"],
    glossary: [
      ["Singletrack", "Trail narrow enough for one rider at a time"],
      ["Berm", "Banked turn allowing higher cornering speeds"],
      ["Drop", "Feature where the trail falls off vertically"],
      ["Switchback", "Sharp 180° turn on a steep climb or descent"],
      ["Dropper post", "Height-adjustable seatpost operated from the bar"],
      ["Tubeless", "Tire/rim setup without an inner tube"],
    ],
  },
  "bmx": {
    description: "BMX (Bicycle Motocross) races or performs tricks on small 20-inch-wheel bicycles. It emerged from 1970s Southern California as kids imitated motocross on dirt tracks; now split into BMX Racing (Olympic since 2008) and BMX Freestyle (Olympic since 2020).",
    tools: ["BMX bike (race, park, or street build)", "Full-face helmet (racing)", "Open-face helmet (freestyle)", "Pads and gloves", "Grip tape or PC pedal pins", "Toolkit: pedal wrench, headset tool"],
    glossary: [
      ["Gate", "Starting ramp that drops at the gun"],
      ["Rhythm section", "Series of jumps requiring timing"],
      ["Bunnyhop", "Jumping both wheels off the ground together"],
      ["Barspin", "Spinning the handlebars a full turn in the air"],
      ["Manual", "Wheelie without pedaling"],
      ["Grind", "Sliding pegs or bike on a rail/ledge"],
    ],
  },

  "swimming": {
    description: "Swimming is self-propulsion through water. Depicted in 7,000-year-old rock art in Egypt, it became organized sport in 19th-century England and an inaugural modern-Olympic event in 1896 with front crawl dominating speed events.",
    tools: ["Swimsuit (brief or jammer)", "Goggles", "Swim cap", "Training fins", "Kickboard", "Pull buoy", "Waterproof stopwatch"],
    glossary: [
      ["Catch", "Initial water-gripping phase of the pull"],
      ["Flip turn", "Somersault turn at the wall"],
      ["Streamline", "Tight body position off walls and dives"],
      ["Breakout", "Surfacing stroke after pushoff"],
      ["Interval", "Swim time including rest"],
      ["Set", "Group of swims with defined intervals"],
    ],
  },
  "surfing": {
    description: "Surfing rides ocean waves standing on a board. Polynesian in origin — documented in Hawaii for centuries before European contact — it spread globally from 20th-century California and Hawaii, and became an Olympic sport at Tokyo 2020.",
    tools: ["Surfboard (shortboard, longboard, fish, etc.)", "Leash", "Wax", "Wetsuit (climate-dependent)", "Fins (FCS or Futures)", "Surf forecast/app"],
    glossary: [
      ["Lineup", "Area beyond the breaking waves where surfers wait"],
      ["Takeoff", "Committing to paddle into a wave"],
      ["Duck dive", "Pushing the board under an oncoming wave"],
      ["Barrel / Tube", "Hollow curl of a breaking wave"],
      ["Cutback", "Sharp turn reversing direction back to the pocket"],
      ["Pop-up", "Springing from prone to stance on the wave"],
    ],
  },
  "scuba diving": {
    description: "Scuba (Self-Contained Underwater Breathing Apparatus) diving uses compressed gas to explore underwater. Jacques Cousteau and Émile Gagnan's 1943 aqua-lung launched recreational diving; today 25+ million certified divers exist worldwide.",
    tools: ["Mask, snorkel, fins", "Regulator (first and second stage)", "BCD (buoyancy compensator)", "Dive computer", "Cylinder (tank) and weights", "Exposure suit (wetsuit/drysuit)"],
    glossary: [
      ["No-deco limit", "Time at depth with no decompression stops required"],
      ["Decompression stop", "Safety pause to off-gas nitrogen"],
      ["Narcosis", "Nitrogen's anesthetic effect at depth"],
      ["Buddy check", "Pre-dive partner gear verification"],
      ["Neutral buoyancy", "Neither sinking nor rising — efficient diving state"],
      ["SMB", "Surface Marker Buoy deployed on ascent"],
    ],
  },

  "photography": {
    description: "Photography is the art and practice of capturing light on a sensor or film. Since its 1820s origins with Niépce and Daguerre, it has grown into a vast field spanning documentary, artistic, scientific, and commercial work.",
    tools: ["DSLR or mirrorless camera", "Prime and zoom lenses", "Tripod", "External flash", "Memory cards", "Camera bag", "Lens filters", "Editing software"],
    glossary: [
      ["Aperture", "Lens opening controlling light and depth of field, measured in f-stops"],
      ["ISO", "Sensor sensitivity to light; higher ISO brightens but adds noise"],
      ["Shutter speed", "Duration the sensor is exposed; controls motion blur"],
      ["Bokeh", "Quality of out-of-focus areas"],
      ["Exposure triangle", "Balance of aperture, shutter speed, and ISO"],
      ["RAW", "Unprocessed sensor data with maximum editing latitude"],
      ["Golden hour", "First/last hour of daylight with warm, soft light"],
      ["Rule of thirds", "Composition grid placing subjects along intersection lines"],
    ],
  },
  "360 photography": {
    description: "360 photography captures an entire sphere around the camera, producing immersive images viewable in VR or on web panoramic viewers. Popularized by Google Street View and later consumer 360 cameras like the Ricoh Theta and Insta360.",
    tools: ["360 camera (Insta360, GoPro Max)", "Monopod / invisible selfie stick", "Tripod with nadir cap", "Stitching software", "VR headset for review", "ND filters"],
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
    description: "Astrophotography images astronomical objects by stacking long exposures through tracked telescopes. Developed alongside 19th-century astronomy and transformed by modern CMOS sensors and narrowband filters.",
    tools: ["Tracking equatorial mount", "Telescope or astrograph", "Astro camera or modified DSLR", "Autoguider", "Light pollution / narrowband filters", "Dew heater", "Stacking/processing software (PixInsight, Siril)"],
    glossary: [
      ["Integration time", "Total exposure from stacking many subs"],
      ["Sub", "A single exposure in a stacked set"],
      ["Dark frame", "Calibration capturing sensor noise"],
      ["Flat frame", "Calibration capturing vignetting and dust"],
      ["Polar alignment", "Aligning mount axis with celestial pole for tracking"],
      ["Bortle scale", "1–9 rating of night-sky darkness"],
      ["Narrowband", "Imaging with filters isolating emission lines (Ha, OIII, SII)"],
    ],
  },
  "film photography": {
    description: "Film photography records images on silver-halide emulsions developed in chemical baths. Dominant from the late 1800s to the 2000s digital shift; now a deliberate craft prized for grain, tonality, and slower workflow.",
    tools: ["35mm or medium-format camera", "Film rolls (C-41, B&W, E-6)", "Light meter", "Developing tank and reels", "Chemistry (developer, stop, fixer)", "Film scanner", "Changing bag"],
    glossary: [
      ["Latitude", "Film's tolerance for over/underexposure"],
      ["Push/pull", "Developing film as if exposed at different ISO"],
      ["Grain", "Silver halide texture inherent to film"],
      ["C-41", "Standard color-negative development process"],
      ["E-6", "Slide-film development process"],
      ["Contact sheet", "Print of all frames at negative size for review"],
    ],
  },
  "street photography": {
    description: "Street photography records candid, unposed life in public places. Associated with figures like Henri Cartier-Bresson (the 'decisive moment'), Vivian Maier, and Garry Winogrand, it is a core genre of 20th- and 21st-century documentary art.",
    tools: ["Small mirrorless or rangefinder", "Fast 28–50mm prime lens", "Discreet strap and no camera bag", "Extra battery and card", "Notebook for caption notes", "Comfortable shoes"],
    glossary: [
      ["Decisive moment", "Peak instant where form and meaning align (Cartier-Bresson)"],
      ["Zone focus", "Pre-set focus distance enabling instant capture"],
      ["Candid", "Unposed, unobserved subject"],
      ["Juxtaposition", "Two elements paired for meaning"],
      ["Contact release", "Low-profile release on a wrist strap"],
      ["Leading line", "Compositional line drawing the eye into the frame"],
    ],
  },

  "pottery": {
    description: "Pottery shapes clay by hand, wheel, or mold and fires it into ceramic. Humanity's oldest craft material — fragments date to 20,000 BCE in China — it remains a vibrant studio practice spanning functional wares, sculpture, and industrial ceramics.",
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
    description: "Bookbinding assembles printed or blank pages into a protected codex. Descended from Coptic bindings of 2nd-century Egypt through medieval European scribal traditions, it survives today as both fine craft and industrial process.",
    tools: ["Bone folder", "Awl and needles", "Waxed linen thread", "Book press", "PVA glue", "Book cloth and boards", "Paring knife", "Headbands"],
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
    description: "Calligraphy is the artistic practice of handwritten letterforms using broad-edged or pointed pens. Distinct traditions developed in Western (Latin), Arabic, Chinese, Japanese, and Hebrew scripts, each with rigorous training systems still taught today.",
    tools: ["Dip pen and nibs", "India ink / sumi ink", "Practice pads with guide lines", "Pencil and ruler", "Blotter paper", "Brushes for East Asian scripts"],
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
    description: "Knitting is a textile technique that interlocks loops of yarn with two or more needles. Traceable to Egypt around the 11th century and reaching Europe via Spain, it evolved from guild craft to domestic necessity to today's global hobby.",
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
  "crochet": {
    description: "Crochet creates fabric by pulling loops of yarn through other loops with a single hook. It emerged in Europe in the 19th century, possibly evolving from tambour embroidery or shepherd's knitting, and supports dense structures like granny squares and amigurumi.",
    tools: ["Crochet hooks (various sizes)", "Yarn", "Stitch markers", "Yarn needle", "Scissors", "Pattern book or chart"],
    glossary: [
      ["Chain (ch)", "Series of loops forming foundation or turn"],
      ["Single crochet (sc)", "Basic short stitch"],
      ["Double crochet (dc)", "Taller stitch with a yarn-over"],
      ["Granny square", "Motif built from rounds of clusters"],
      ["Amigurumi", "Crocheted stuffed figures (Japanese tradition)"],
      ["Frog", "Rip back rows (ribbit = rip it)"],
    ],
  },
  "beekeeping": {
    description: "Beekeeping manages honey bee colonies for honey, wax, pollination, and other products. Practiced since Egyptian antiquity, it was transformed by L.L. Langstroth's 1851 patent of the movable-frame hive, which remains the standard worldwide.",
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
  "blacksmithing": {
    description: "Blacksmithing forges iron and steel using heat and hammer. Central to every agrarian society from the Iron Age onward, it declined with industrialization but survives as a craft for tools, architectural ironwork, bladesmithing, and sculpture.",
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
    description: "Meditation is a family of mental-training practices cultivating attention, awareness, or insight. Rooted in the contemplative traditions of India (Vedic and Buddhist), East Asia, and the early Christian desert fathers; widely adopted in secular and therapeutic forms.",
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
    description: "Yoga is a family of Indian physical, mental, and spiritual practices. Its philosophical roots reach into the Upanishads and Patanjali's Yoga Sutras (c. 2nd century BCE–CE); modern postural yoga (hatha, vinyasa, Iyengar, ashtanga) was codified largely in 20th-century India.",
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
    description: "Soldering joins metals by melting a filler alloy that wets and bonds the surfaces. Known since the Bronze Age for plumbing and jewelry, modern electronics soldering exploded after WWII with mass-produced printed circuit boards.",
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
    description: "3D printing builds three-dimensional objects layer by layer from a digital model. Invented by Chuck Hull (SLA, 1984) and Scott Crump (FDM, 1989), it moved from industrial prototyping into homes through the RepRap open-source project and affordable desktop printers.",
    tools: ["FDM or resin printer", "Filament or resin", "Slicer (Cura, PrusaSlicer, Bambu Studio)", "Calipers", "Scraper", "Deburring tool", "UV cure station (resin)"],
    glossary: [
      ["Layer height", "Thickness of each deposited layer"],
      ["Infill", "Internal lattice density inside prints"],
      ["Retraction", "Pulling filament back to avoid stringing"],
      ["Slicer", "Software converting models to G-code"],
      ["Bed adhesion", "Grip between first layer and build plate"],
      ["Overhang", "Surface angled past vertical needing supports"],
    ],
  },
  "falconry": {
    description: "Falconry hunts wild quarry with trained birds of prey. Originating over 4,000 years ago in Mesopotamia and Central Asia, it is inscribed on UNESCO's Intangible Cultural Heritage list and is still regulated in many countries through licensing and permits.",
    tools: ["Falconer's glove (gauntlet)", "Bells or telemetry transmitter", "Jesses and leash", "Hood for the bird", "Weighing scale", "Giant hood and travel box"],
    glossary: [
      ["Manning", "Acclimating a new bird to the falconer's presence"],
      ["Mews", "Enclosure where the bird is housed"],
      ["Creance", "Long line used in early free-flight training"],
      ["Lure", "Swung pad the bird is trained to strike"],
      ["Weathering", "Period the bird spends outdoors in sun and wind"],
      ["Imprint", "Bird raised from chick bonding with humans"],
    ],
  },
  "buzkashi": {
    description: "Buzkashi is a Central Asian mounted game in which riders compete for possession of a decapitated goat or calf carcass and carry it to a scoring goal. The national sport of Afghanistan, it is also played in Tajikistan, Uzbekistan, Kyrgyzstan, and Kazakhstan (as kok-boru).",
    tools: ["Trained horse (Buzkashi stallion)", "Heavy leather boots", "Quilted chapan coat and helmet", "Short riding whip (qamchi)", "Goat or calf carcass (boz)", "Marked circle (hallal) and goal post"],
    glossary: [
      ["Chapandaz", "Master rider in buzkashi"],
      ["Boz", "Goat carcass used as the 'ball'"],
      ["Hallal", "Scoring circle of justice"],
      ["Tudabarai", "Simpler form — carry the carcass free of other riders"],
      ["Qarajai", "More complex form — carry to flag and return to circle"],
      ["Kok-boru", "Kyrgyz/Kazakh cousin of buzkashi, now codified with a goal"],
    ],
  },
  "kabaddi": {
    description: "Kabaddi is a contact team sport originating on the Indian subcontinent. A single 'raider' crosses into the opposing half chanting 'kabaddi' on one breath, trying to tag defenders and return. Standardized in 1923, it is the national sport of Bangladesh and is televised competitively through the Indian Pro Kabaddi League.",
    tools: ["Rectangular court 13×10 m (standard)", "Non-slip flat shoes", "Shorts and jersey", "Talcum powder (grip)", "Scoreboard and timekeeper", "Whistle"],
    glossary: [
      ["Raider", "Player entering the opponent's half to score"],
      ["Antis", "Defenders who try to tackle the raider"],
      ["Do-or-die raid", "Third consecutive empty raid — must score"],
      ["Bonus line", "Line raider can touch for an extra point"],
      ["Lona", "Bonus when all opponents are eliminated"],
      ["Cant", "Continuous chanting of 'kabaddi' without inhaling"],
    ],
  },
  "sepak takraw": {
    description: "Sepak takraw is a Southeast Asian kick-volleyball played with a rattan or synthetic ball. Its modern form was codified in 1960s Malaysia/Thailand and is contested at the Asian Games. Players use feet, knees, chest, and head — but never hands — over a high net.",
    tools: ["Rattan or synthetic takraw ball", "Takraw court (similar to badminton doubles)", "Net ~1.52 m high for men", "Light grippy court shoes", "Shin and ankle support", "Kneepads"],
    glossary: [
      ["Tekong", "Server standing in the service circle"],
      ["Feeder", "Lofts the ball to the attacker"],
      ["Killer", "Executes the spike kick (often bicycle kick)"],
      ["Sila", "Inside-of-foot touch"],
      ["Horse kick", "Acrobatic over-the-shoulder kick"],
      ["Deuce", "Extended play at 14–14 until 2-point lead"],
    ],
  },
  "hurling": {
    description: "Hurling is a high-speed Gaelic field sport played with an ash stick (hurley) and small hard ball (sliotar). Over 3,000 years old in Irish tradition and codified by the GAA in 1884, it is played amateur at all levels in Ireland and the diaspora.",
    tools: ["Hurley (ash stick)", "Sliotar (leather-covered cork ball)", "Helmet with faceguard", "Boots (molded or studded)", "Shin guards", "Gloves (optional)"],
    glossary: [
      ["Solo", "Running while balancing sliotar on the hurley"],
      ["Puck-out", "Goalkeeper's restart after a score or wide"],
      ["Sideline cut", "Ball struck from the ground at the sideline"],
      ["Point", "Ball over the crossbar, between the posts (1 pt)"],
      ["Goal", "Ball into the net (3 pts)"],
      ["Hand-pass", "Striking the sliotar with the open hand"],
    ],
  },
  "parkour": {
    description: "Parkour is the discipline of moving efficiently through any environment — running, jumping, vaulting, climbing. Developed in 1980s–90s France by David Belle and the Yamakasi group, drawing on George Hébert's Natural Method (Méthode Naturelle).",
    tools: ["Lightweight trainers with good grip", "Flexible athletic clothing", "Callus care supplies", "Training gym or outdoor spot", "Foam blocks / crash mats for new moves", "Smartphone for video review"],
    glossary: [
      ["Vault", "Passing an obstacle with hand(s) and body rotation"],
      ["Precision", "Jump to an exact landing spot (rail, block)"],
      ["Kong", "Forward vault diving hands-first over an obstacle"],
      ["Wall run", "Ascending a wall with planted foot steps"],
      ["Roll", "Shoulder roll dispersing landing impact"],
      ["Cat leap", "Jump landing hands on a wall with feet on its face"],
    ],
  },
  "bread baking": {
    description: "Bread baking turns flour, water, salt, and leaven into baked loaves. Wild-yeast sourdough predates written history; modern commercial yeast (Fleischmann's, 1868) industrialized bread, while the 21st century saw a global resurgence of home sourdough.",
    tools: ["Digital scale", "Mixing bowl and covers", "Dough scraper", "Proofing basket (banneton)", "Dutch oven or baking stone", "Lame (razor) for scoring", "Thermometer"],
    glossary: [
      ["Hydration", "Water as % of flour weight"],
      ["Autolyse", "Initial rest of flour + water before mixing in salt/starter"],
      ["Levain", "Offshoot of starter built for a specific bake"],
      ["Bulk fermentation", "First rise developing flavor and gluten"],
      ["Score", "Slashing dough surface before baking"],
      ["Oven spring", "Final rapid rise in the oven"],
    ],
  },
  "fermentation": {
    description: "Fermentation is the controlled microbial transformation of food and drink — lacto-bacteria for pickles and kimchi, yeast for bread and beer, mold for miso and cheese. Every human culture fermented long before knowing the microbiology behind it.",
    tools: ["Glass jars or crocks", "Airlocks and weights", "Non-iodized salt", "pH meter or test strips", "Fine mesh strainer", "Notebook for batches"],
    glossary: [
      ["Lacto-fermentation", "Lactic-acid bacteria converting sugars to acid"],
      ["SCOBY", "Symbiotic culture of bacteria and yeast (kombucha)"],
      ["Mother", "Live culture used to seed vinegar"],
      ["Primary fermentation", "Vigorous early phase producing CO2 and alcohol"],
      ["Secondary fermentation", "Slower conditioning/carbonation phase"],
      ["Koji", "Aspergillus oryzae mold central to miso, sake, shoyu"],
    ],
  },
  "homebrewing": {
    description: "Homebrewing makes beer from malt, hops, yeast, and water at home. Legalized in the US in 1978, the hobby fueled the craft-beer revolution; today home brewers can emulate nearly any commercial style and develop their own.",
    tools: ["Kettle (5+ gal)", "Mash tun", "Fermenter with airlock", "Hydrometer or refractometer", "Thermometer", "Bottles/kegs and caps", "Sanitizer"],
    glossary: [
      ["Mash", "Soaking milled grain in hot water to extract sugars"],
      ["Wort", "Sweet liquid before yeast is added"],
      ["OG / FG", "Original and Final Gravity — density before/after fermentation"],
      ["IBU", "International Bitterness Units from hops"],
      ["Pitching", "Adding yeast to the cooled wort"],
      ["Cold crash", "Chilling to settle yeast and clarify the beer"],
    ],
  },
};

export const KEYWORDS: Array<{
  match: RegExp;
  description: string;
  tools: string[];
  glossary: Array<[string, string]>;
}> = [
  {
    match: /\b(archery|arrow)\b/i,
    description:
      "A bow-and-arrow discipline — shooting arrows at targets with a drawn bow. Archery has distinct branches (target, field, 3D, traditional, compound), each with specialized gear and a common foundation in stance, draw, anchor, and release.",
    tools: ["Bow (recurve, compound, longbow)", "Arrows matched to draw weight", "Arm guard and finger tab/release", "Quiver", "Target faces or 3D targets", "Bow stringer and wax"],
    glossary: [
      ["Draw", "Pulling the bowstring back to a consistent anchor"],
      ["Anchor point", "Consistent position where the draw hand touches the face"],
      ["Release", "Letting the string go cleanly without disturbing aim"],
      ["Nocking", "Placing the arrow on the string at the nock point"],
      ["Spine", "Arrow stiffness, matched to bow draw weight"],
      ["Grouping", "How tightly arrows cluster on the target"],
    ],
  },
  {
    match: /\b(spear throw|javelin|atlatl|sling|boomerang|axe throw|knife throw|disc throw)\b/i,
    description:
      "A thrown-projectile discipline aiming for distance or target accuracy. These pursuits range from ancient hunting weapons (atlatl, sling) to modern sports (javelin, axe-throwing leagues) and world-championship boomerang events.",
    tools: ["Throwing implement (spear, axe, disc, sling)", "Targets at graded distances", "Measuring tape", "Eye and throat protection", "Grip chalk or tape", "Projectile carrier"],
    glossary: [
      ["Grip", "Specific hand hold defining release angle"],
      ["Release point", "Position of the hand when the implement leaves"],
      ["Rotation", "Spin imparted on release for stable flight"],
      ["Cast", "Total distance achieved"],
      ["Stick", "A thrown implement that lands and holds in the target"],
      ["Foul line", "Mark the thrower must not cross"],
    ],
  },
  {
    match: /\b(wrestl|grappl|jiu[- ]?jitsu|judo|sambo|kushti|schwingen|glima|gouren|pankration|bökh|ssireum|shuai jiao|naban|malla yuddha|musti yuddha|yağlı güreş|lutte|nuba|dambe|musangwe|evala|tahtib|inbuan|mukna)/i,
    description:
      "A grappling combat tradition where competitors throw, pin, or submit each other without striking. Every major culture has developed its own form — from folk village traditions to Olympic freestyle and Greco-Roman — built on leverage, balance, and timing.",
    tools: ["Mat or designated ground", "Appropriate uniform or loincloth", "Mouthguard", "Ear guards (optional)", "Tape", "Training partners"],
    glossary: [
      ["Takedown", "Move bringing opponent from standing to the ground"],
      ["Pin", "Shoulders held to the ground for scoring"],
      ["Shoot", "Quick drop attacking the legs"],
      ["Sprawl", "Defending a shoot by flattening the hips"],
      ["Guard", "Bottom position controlling a standing opponent"],
      ["Submission", "Joint lock or choke ending the match"],
    ],
  },
  {
    match: /\b(boxing|muay thai|kickboxing|savate|karate|taekwondo|kung fu|pradal|lethwei|bokator|silat|pencak|kalaripayattu|silambam|gatka|eskrima|arnis|systema|krav maga|wing chun|capoeira|jeet kune do|wushu|tomoi|hapkido|aikido|sanda|sambo|kendo|iaido|kyudo)/i,
    description:
      "A striking or hybrid martial art combining kicks, punches, and blocks — sometimes with weapons. Originating in ancestral self-defense systems around the world, each style carries distinct history, lineage, and training rituals.",
    tools: ["Gloves or hand wraps", "Mouthguard", "Shin/elbow guards", "Heavy bag or pads", "Focus mitts", "Uniform appropriate to the style"],
    glossary: [
      ["Stance", "Basic ready position balancing offense and defense"],
      ["Combination", "Chain of strikes thrown in sequence"],
      ["Clinch", "Close-range grip-fighting position"],
      ["Block/Parry", "Deflecting an incoming strike"],
      ["Footwork", "Movement patterns controlling distance and angle"],
      ["Kata", "Choreographed form practiced solo (Japanese arts)"],
    ],
  },
  {
    match: /\b(running|marathon|sprint|jogging|hurdl|long distance|race walk|jog)\b/i,
    description:
      "A foot-based athletic discipline emphasizing pace, endurance, or short-burst speed. The ancestor of all sport, with deep roots in ancient Olympic competition and modern road-race and track culture.",
    tools: ["Running shoes suited to distance/surface", "Technical apparel", "GPS watch or phone tracker", "Hydration and fueling plan", "Foam roller/recovery tools", "Race kit (bib, chip)"],
    glossary: [
      ["Cadence", "Steps per minute"],
      ["Tempo pace", "Comfortably hard sustained pace"],
      ["VO2 max", "Peak oxygen uptake capacity"],
      ["Taper", "Reduced training before a race"],
      ["Splits", "Time for each segment of a run"],
      ["PR", "Personal record — fastest time for a distance"],
    ],
  },
  {
    match: /\b(pole vault|long jump|high jump|triple jump|shot put|discus|hammer throw|decathl|heptath)/i,
    description:
      "A track-and-field discipline centered on explosive power and technique — jumping for height or distance or throwing an implement as far as possible. Formalized in the Ancient and modern Olympic Games.",
    tools: ["Event-specific implement (pole, shot, discus, hammer, javelin)", "Spikes", "Measuring tape and pit", "Throwing circle or runway", "Rulebook/judges", "Strength-training gear"],
    glossary: [
      ["Approach", "Run-up leading to the jump or throw"],
      ["Plant", "Placing the pole or takeoff foot"],
      ["Release angle", "Angle at which an implement leaves the hand"],
      ["Scratch", "Failed jump/throw due to a fault"],
      ["Personal best", "Athlete's career-best mark in the event"],
      ["Circle", "Throwing zone from which the athlete must not step"],
    ],
  },
  {
    match: /\b(triathlon|duathlon|ironman|multisport)\b/i,
    description:
      "A multi-discipline endurance race combining swimming, cycling, and running (or subsets thereof). Modern triathlon was invented in 1970s San Diego; the Ironman began in Hawaii in 1978 and became the flagship long-course event worldwide.",
    tools: ["Wetsuit for cold-water swims", "Triathlon or road bike", "Aero helmet", "Running shoes with quick laces", "Race belt", "Nutrition and hydration plan"],
    glossary: [
      ["T1 / T2", "Transitions from swim→bike and bike→run"],
      ["Brick workout", "Bike ride followed immediately by a run"],
      ["Sprint / Olympic / 70.3 / Ironman", "Standard distance categories"],
      ["Drafting", "Riding close behind — usually illegal in age-group tris"],
      ["Aero", "Low-drag bike position or equipment"],
      ["Mass start", "All athletes enter the water together"],
    ],
  },
  {
    match: /\b(cycling|cyclocross|gravel|mtb|mountain bik|bmx|velomobile|recumbent|tandem|penny[ -]farthing|track cycling|fixed gear|road cycling)/i,
    description:
      "A human-powered discipline on two (or more) wheels. From 19th-century safety bicycles to modern carbon-fiber racers, cycling has diversified into road, MTB, gravel, track, BMX, and touring — all sharing the efficient rolling geometry of the diamond frame.",
    tools: ["Bicycle for the discipline", "Helmet", "Gloves", "Eyewear", "Hydration and nutrition", "Tools: multi-tool, pump, spare tube", "GPS computer"],
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
    match: /\b(swimming|open water|freediv|scuba|snorkel|synchro|spearfish|apnea)/i,
    description:
      "An aquatic discipline carried out on or below the water's surface. Branches include pool racing, open-water endurance, freediving, underwater hockey, and the precision artistry of artistic (synchronized) swimming.",
    tools: ["Swimsuit or wetsuit", "Goggles and/or mask", "Fins or paddles", "Buoyancy aid / safety device", "Cap or hood", "Stopwatch or dive computer"],
    glossary: [
      ["Catch", "Initial water-gripping phase of a stroke"],
      ["Streamline", "Tight body position off walls and dives"],
      ["Apnea", "Breath-hold duration in freediving"],
      ["Tumble turn", "Somersault turn at the wall"],
      ["Drill", "Stroke-component exercise"],
      ["Sighting", "Lifting the head to check course in open water"],
    ],
  },
  {
    match: /\b(surf|wakeboard|kitesurf|windsurf|skimboard|bodyboard|stand[- ]?up paddle|sup)/i,
    description:
      "A board-on-water discipline riding waves, wind, or boat wake. Modern board sports branched from mid-20th-century Pacific surf culture; each variant (wakeboard, kitesurf, windsurf) added its own equipment and tricks.",
    tools: ["Board appropriate to the sport", "Leash", "Wetsuit or impact vest", "Sail / kite / tow rope as applicable", "Fins and wax", "Surf/wind forecast"],
    glossary: [
      ["Lineup", "Where wave riders wait to catch waves"],
      ["Takeoff", "Committing to ride an incoming wave"],
      ["Duck dive", "Pushing the board under an oncoming wave"],
      ["Cutback", "Sharp turn back toward the wave's pocket"],
      ["Trim", "Adjusting body/board to maintain speed"],
      ["Drop in", "Taking a wave already being ridden — a rule violation"],
    ],
  },
  {
    match: /\b(kayak|canoe|row|paddle|raft|dragon boat)/i,
    description:
      "A paddle-craft discipline propelled through water by paddles or oars. Indigenous traditions — Inuit kayak, Polynesian outrigger, Pacific Northwest canoe — meet modern whitewater, sea, and flatwater racing equipment.",
    tools: ["Paddle or oars", "Craft suited to water type", "PFD (life jacket)", "Spray skirt (whitewater kayak)", "Helmet (whitewater)", "Dry bag and first aid"],
    glossary: [
      ["Eddy", "Sheltered current-reverse behind an obstacle"],
      ["Ferry", "Crossing a current at an angle"],
      ["Roll", "Righting a capsized kayak without exiting"],
      ["Peel-out", "Exiting an eddy into the main current"],
      ["Feathering", "Offset angle between two paddle blades"],
      ["Catch", "Blade entering the water to initiate a stroke"],
    ],
  },
  {
    match: /\b(sail|yacht|iceboat|land sail|hovercraft)/i,
    description:
      "A wind-powered craft discipline — sailing boats across water (or ice or sand) using sails as wings. Traditions range from ancient Phoenician trading to modern foiling America's Cup racing.",
    tools: ["Sailboat (or iceboat / landboard)", "Sails appropriate to wind", "PFD", "Lines and winches", "Chart/GPS", "Weather and tide reference"],
    glossary: [
      ["Tack", "Zig-zag course angling into the wind"],
      ["Gybe", "Turning the stern through the wind"],
      ["Point of sail", "Boat's angle relative to the wind"],
      ["Heeling", "Boat's sideways lean from wind pressure"],
      ["Reef", "Reducing sail area in strong winds"],
      ["Close-hauled", "Sailing as close to the wind as possible"],
    ],
  },
  {
    match: /\b(weaving|spinning|embroider|knit|crochet|lace|felt|tatt|sewing|dyeing|quilt|rug|smock|nalbind|kumihimo|sprang|passementerie|nålebinding|goldwork|stumpwork|hardanger|whitework|tapestry|punch needle|latch hook)/i,
    description:
      "A fiber or textile craft transforming yarn, thread, or loose fiber into fabric or finished pieces. These are among humanity's oldest crafts — bone needles appear 50,000+ years ago — and each regional tradition carries distinctive stitches, dyes, and motifs.",
    tools: ["Fiber/yarn/thread", "Needles, hooks, or loom", "Frame or hoop", "Scissors", "Measuring gauge", "Pattern reference"],
    glossary: [
      ["Gauge", "Stitches per inch, governs fit"],
      ["Warp/Weft", "Longitudinal and transverse threads in weaving"],
      ["Selvedge", "Self-finished fabric edge"],
      ["Ply", "Number of strands twisted into a yarn"],
      ["Blocking", "Wetting and shaping finished textile"],
      ["Mordant", "Fixative helping dye bond to fiber"],
    ],
  },
  {
    match: /\b(forging|smith|metalwork|blacksmith|silversmith|goldsmith|coppersmith|tinsmith|jewel|repouss|chas|wire wrap|chain maill|casting|enamel|mokume|damascene|niello|metal clay|pmc|repoussé|armour|coin engrav|scrimshaw|lost wax)/i,
    description:
      "A metalworking practice shaping metal through heat, pressure, or chemistry into tools, sculpture, or jewelry. Traditions range from Iron-Age forging to modern CAD-driven jewelry design.",
    tools: ["Forge or torch", "Anvil or bench block", "Hammers", "Tongs and pliers", "Vise", "Files and chisels", "Safety eyewear and gloves"],
    glossary: [
      ["Anneal", "Soften by heat followed by slow cooling"],
      ["Temper", "Moderate hardness and brittleness after hardening"],
      ["Flux", "Agent preventing oxides during soldering/welding"],
      ["Pickle", "Acid bath removing oxides after heating"],
      ["Bezel", "Metal rim holding a stone in jewelry"],
      ["Patina", "Intentional surface coloration"],
    ],
  },
  {
    match: /\b(carving|whittl|intarsia|marquetry|turn|bodging|lath|coopering|luthier|bamboo|wicker|bask|coil|willow|treen|chip carv|relief carv|gourd|antler carv|bone carv|shell carv|coconut|cork)/i,
    description:
      "A subtractive or constructive practice shaping wood, cane, bone, or natural material with hand tools. These traditions are deeply regional — green-wood chair bodging, Japanese sashimono, and African basketry all grow from local species and needs.",
    tools: ["Knives, gouges, or chisels", "Mallet", "Clamp or vise", "Sharpening stones", "Dust mask", "Raw stock"],
    glossary: [
      ["Grain", "Direction of wood fibers; follow to avoid tearout"],
      ["Relief", "Carving with background left intact"],
      ["Stop cut", "Cut defining the boundary before removing wood"],
      ["Sweep", "Curvature number of a gouge"],
      ["Tearout", "Fibers torn against grain"],
      ["Finish", "Oil, wax, or lacquer protecting the surface"],
    ],
  },
  {
    match: /\b(baking|bread|pastry|pasta|pickling|cheese|brew|mead|cider|sake|miso|kimchi|kombucha|kefir|sourdough|dumpling|sushi|ramen|chocolate|sugar|marzipan|gingerbread|charcuterie|cake|cookie|ice cream|confection)/i,
    description:
      "A food craft transforming raw ingredients through heat, time, or microbial action into prepared food or drink. Every human culture has its own canon, and the chemistry of fermentation, dough, and emulsion underlies nearly all of it.",
    tools: ["Scale", "Mixing bowls", "Appropriate cookware or vessels", "Thermometer", "Timer", "Reference recipe"],
    glossary: [
      ["Hydration", "Water as % of flour weight"],
      ["Fermentation", "Controlled microbial transformation of flavor and structure"],
      ["Proof", "Final rise of shaped dough before baking"],
      ["Maillard reaction", "Browning chemistry creating savory flavor"],
      ["Lamination", "Alternating layers of dough and fat for flakiness"],
      ["Curing", "Preserving with salt, smoke, or time"],
    ],
  },
  {
    match: /\b(painting|drawing|sketch|watercolor|gouache|acrylic|oil paint|pastel|fresco|ink|sumi|chinese brush|pointilli|stippling|mural|graffiti|stencil|airbrush|henna|mehndi|tempera|encaustic|zentangle|doodl|caricature|cartoon|botanical illustration|scientific illustration|medical illustration|fashion illustration|life drawing|urban sketch|plein air|portrait drawing|concept art|storyboard|graphic novel)/i,
    description:
      "A visual art practice applying pigment, ink, or wash to a surface. Each medium and tradition — oil, watercolor, fresco, sumi-e — developed in response to available materials, climate, and cultural use.",
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
    match: /\b(print|linocut|screen print|letterpress|woodblock|risograph|monoprint|etching|engraving|copperplate|lumen|anthotype|cyanotype print)/i,
    description:
      "A printmaking technique producing multiple images from a carved, incised, or stencilled matrix. From Song-dynasty woodblock to modern risograph, printmaking traditions combine fine-art craft with reproducible multiples.",
    tools: ["Matrix (block, plate, stencil)", "Ink and rollers", "Press or burnishing tool", "Paper and registration guides", "Solvents and rags", "Protective gloves"],
    glossary: [
      ["Matrix", "The carved/inked surface transferring the image"],
      ["Edition", "Numbered set of prints from one matrix"],
      ["Registration", "Aligning multi-color runs"],
      ["Burnish", "Pressure transferring ink to paper"],
      ["Bleed", "Image extending to the paper edge"],
      ["Plate tone", "Light ink film left on intaglio plates"],
    ],
  },
  {
    match: /\b(dance|ballet|salsa|tango|waltz|swing dan|hip[- ]?hop|break|flamenco|belly|hula|kathak|bhangra|bachata|foxtrot|jazz dance|tap|capoeira|zumba|voguing|waacking|locking|popping|tutting|disco dance|ballroom|latin dance|lindy|line dan|country western|irish danc|pole danc)/i,
    description:
      "An art of rhythmic, expressive movement to music. Every dance form carries a specific historical and cultural context — from court ballets to street breaking — and its own vocabulary of steps, poses, and musicality.",
    tools: ["Appropriate shoes", "Fitted clothing", "Mirror or studio", "Music source", "Grip or slide spray for floor"],
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
    match: /\b(guitar|piano|violin|cello|drum|bass|saxophone|trumpet|ukulele|mandolin|banjo|tabla|sitar|oud|shamisen|koto|erhu|didgeridoo|hurdy|nyckelharpa|dulcimer|kalimba|ocarina|theremin|balalaika|jaw harp|kendama|whistling|overtone sing|throat sing|beatbox|spoons play|jug play|washboard|glass harmonica|hang drum|handpan|musical saw|tin whistle|steel drum|chapman stick|recorder play|lute play|viol play|barbershop|choral|shape note)/i,
    description:
      "The practice of playing a specific musical instrument or vocal style, each with its own physical technique, repertoire, and cultural lineage. Instrumental traditions often trace back centuries or millennia and continue to evolve through new styles.",
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
    match: /\b(music production|daw|beat making|sampling|remix|mashup|sound design|foley|field recording|ambient|drone music|noise music|experimental music|generative music|algorithmic composition|live coding|modular synth|eurorack|analog synth|digital synth|granular|fm synth|wavetable|additive|subtractive|chiptune|tracker|vaporwave|synthwave|dark ambient)/i,
    description:
      "A music-production or electronic-music discipline creating recorded sound via DAWs, synthesizers, samplers, and effects. Born with 1950s musique concrète and tape studios, today it spans every genre from pop to modular drones.",
    tools: ["DAW (Ableton, Logic, FL, Reaper)", "MIDI controller or keyboard", "Audio interface and monitors", "Headphones", "Synthesizer(s) or sample library", "Reference tracks"],
    glossary: [
      ["DAW", "Digital Audio Workstation for recording and producing"],
      ["VST/AU", "Plugin formats for instruments and effects"],
      ["Sidechain", "Compression triggered by another signal"],
      ["LUFS", "Loudness unit; integrated loudness target for mastering"],
      ["Automation", "Parameter changes over time in the project"],
      ["Mix bus", "Summed stereo channel where tracks combine"],
    ],
  },
  {
    match: /\b(fishing|angl|fly fish|carp fish|bass fish|ice fish|surf fish|kayak fish)/i,
    description:
      "Catching fish using rod, line, net, or spear. One of humanity's oldest subsistence activities, it splits today into fly, coarse, sea, and sport branches, each with distinct gear and ethics.",
    tools: ["Rod and reel (or fly outfit)", "Line, leader, tippet", "Tackle box with hooks/lures/flies", "Net or gaff", "Pliers and forceps", "Waders (for fly fishing)"],
    glossary: [
      ["Drag", "Adjustable resistance in the reel"],
      ["Leader", "Stronger line section near the hook"],
      ["Tippet", "Finest section in fly fishing"],
      ["Presentation", "How lure/fly is offered to fish"],
      ["Structure", "Underwater features attracting fish"],
      ["Hatch", "Insects emerging and fish rising to feed"],
    ],
  },
  {
    match: /\b(climb|boulder|mountaineer|via ferrata|canyoneer|caving|spelunk|rappel|slackline|highline|tree climb)/i,
    description:
      "A vertical or technical movement sport demanding strength, balance, and route-reading. Modern climbing disciplines emerged from 19th-century alpinism and 20th-century American big-wall and bouldering traditions.",
    tools: ["Climbing shoes or approach shoes", "Harness", "Rope and protection", "Belay device", "Chalk and bag", "Helmet"],
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
    match: /\b(horse|equestrian|dressage|rodeo|polo|barrel racing|carriage|vaulting|endurance riding|trail riding|show jumping|eventing|western pleasure)/i,
    description:
      "A discipline practiced on horseback or with horses. Stretching from nomadic steppe traditions to Olympic dressage, equestrian sports share deep horse-handling knowledge that can take a lifetime to master.",
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
    match: /\b(sculpt|clay|ceramic|pot|porcel|raku|kiln|slip cast|coil build|slab build|majolica|mosaic|stained glass|fused glass|glass|lusterware|saggar|soda firing|salt glaz|crystalline glaz|enamel on metal|glass paint)/i,
    description:
      "A material-forming art shaping clay, glass, or enamel through heat and handwork. These crafts connect directly to humanity's earliest decorative and functional objects and are still evolving with new kilns, molds, and digital tools.",
    tools: ["Raw material (clay, glass, stone, enamel)", "Shaping tools", "Kiln or fusing source", "Ribs, sponges, or glass cutters", "Safety equipment", "Reference glazes or colorants"],
    glossary: [
      ["Greenware", "Unfired clay piece"],
      ["Bisque", "Once-fired unglazed piece"],
      ["Slip", "Liquid clay used for joining or decorating"],
      ["Cone", "Pyrometric indicator of firing heat work"],
      ["Reduction", "Low-oxygen firing affecting glaze color"],
      ["Frit", "Pre-fused glass used in enamels and glazes"],
    ],
  },
  {
    match: /\b(robotic|arduino|raspberry|cnc|laser cut|electronic|3d print|pcb|chiptune|demoscene|retrocomput|mechanical keyboard|overclocking|emulation|voxel|pixel art|ai art|procedural|digital sculpt|drone build|custom pc)/i,
    description:
      "A maker or digital discipline combining hardware, software, or both. Rooted in the hobbyist electronics and hacker communities of the 1970s–80s, it now encompasses open-source robotics, generative art, retro computing, and personal fabrication.",
    tools: ["Microcontroller, board, or workstation", "Sensors or input devices", "Soldering iron / fabrication tool", "Multimeter or debugger", "Software toolchain", "Reference documentation"],
    glossary: [
      ["PWM", "Pulse-width modulation for variable output"],
      ["Firmware", "Embedded software running on the device"],
      ["GPIO", "General-purpose input/output pin"],
      ["Toolpath", "Programmed route of a cutting/printing head"],
      ["Iteration", "Rapid cycle of design, test, revise"],
      ["Kinematics", "Math of joint/link motion"],
    ],
  },
  {
    match: /\b(amateur astronomy|meteorite|fossil|entomolog|lepidopter|herpetolog|mycolog|lichen|bryolog|tide pool|whale watch|bat watch|moth trap|pond dip|citizen science|cloud watch|phenolog|urban ecolog|litter pick)/i,
    description:
      "An amateur-science or nature-observation pursuit that feeds real research while cultivating field skill. Citizen-science platforms like iNaturalist, eBird, and SETI@home have turned these hobbies into global scientific infrastructure.",
    tools: ["Field guide for the subject", "Binoculars / loupe / microscope", "Notebook or recording app", "Specimen containers (if permitted)", "Camera", "Reference taxonomy key"],
    glossary: [
      ["Taxon", "A named biological group (species, genus, etc.)"],
      ["Indicator species", "Organism whose presence signals habitat health"],
      ["Voucher", "Preserved specimen documenting a record"],
      ["Transect", "Line along which samples or counts are taken"],
      ["Phenology", "Timing of recurring biological events"],
      ["Citizen science", "Public participation in scientific data collection"],
    ],
  },
  {
    match: /\b(collect|collection|memorabilia|vintage|antique|numismat|phillumen|deltiolog|trading card|sports card|pokemon card|funko|nendoroid|figma|garage kit|diecast|gunpla|snow globe|thimble|patch collect|label collect|cigarette card|bobblehead|taxidermy|curiosity cabinet)/i,
    description:
      "Assembling a curated set of physical objects around a theme, era, or maker. Collecting is one of the most universal human hobbies and spans everything from rare coins to industrial ephemera; value rests on rarity, condition, and documented history.",
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
    match: /\b(writing|fiction|poetry|memoir|essay|novel|screenwrit|playwrit|flash fiction|short stor|novella|haiku|sonnet|tanka|ghazal|villanelle|libretto|podcast script|game writing|fan fiction|conlang|worldbuild|lexicograph|etymol|literary fiction|science fiction|fantasy writ|horror writ|mystery writ|thriller writ|romance writ|creative nonfiction|travel writing|food writing|nature writing|technical writing|grant writing|speech writing)/i,
    description:
      "A literary or narrative craft producing text for readers, performers, or players. Each genre and form has its own conventions; the modern writing craft draws on centuries of accumulated technique from oral tradition to contemporary publishing.",
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
    match: /\b(magic|mentalism|juggl|poi|stilt|puppet|mime|clown|aerial silk|aerial hoop|aerial strap|trapeze|contortion|storytelling|improv|stand[- ]?up|sketch comedy|spoken word|slam poetry|ventriloq|balloon anim|fire perform|hoop danc|staff spin|shadow pupp|card magic|coin magic|close[- ]?up magic|stage magic)/i,
    description:
      "A live performance discipline designed to be experienced by an audience in real time. From ancient acrobatic traditions to modern circus arts and slam poetry, these forms demand technique, presence, and stagecraft.",
    tools: ["Props specific to the art", "Rehearsal space", "Music or sound rig", "Safety gear", "Costume", "Mirror for practice"],
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
    match: /\b(scale model|miniature|gunpla|wargam|warhammer|flames of war|bolt action|x[- ]?wing miniatures|star wars legion|infinity|warmachine|horde|kings of war|sharp practice|chain of command|dollhouse|room box|railway layout|diorama|military diorama|fantasy diorama|sci[- ]?fi diorama|resin casting|mold making|kitbash|terrain build|scatter terrain)/i,
    description:
      "Scale-model building reproduces vehicles, figures, or environments in miniature, often for display, wargaming, or film. Modern plastic kit hobbies took off in the 1950s–60s with companies like Airfix, Tamiya, Revell, and Bandai.",
    tools: ["Hobby knife", "Plastic cement or superglue", "Sanding sticks", "Paints and primer", "Airbrush", "Pin vise", "Tweezers"],
    glossary: [
      ["Kitbash", "Combining parts from multiple kits"],
      ["Wash", "Thin paint pooling into crevices for depth"],
      ["Drybrush", "Near-dry brush highlighting raised surfaces"],
      ["Priming", "Base layer for paint adhesion"],
      ["NMM", "Non-Metallic Metal — painting metal using only matte colors"],
      ["Scale", "Size ratio (1:72, 1:35, 28 mm, etc.)"],
    ],
  },
  {
    match: /\b(tarot|astrology|rune|divin|dows|reiki|shaman|chakra|qigong|tai chi|breathwork|ikebana|tea ceremon|incense|altar|candle magic|herbalism|witchcraft|druidry|asatru|chaos magic|pendulum|labyrinth|ecstatic dance|crystal healing|ayurveda|i ching|falun gong|vision quest|sound healing|singing bowl|tuning fork|float tank|sensory deprivation|sweat lodge|plant medicine)/i,
    description:
      "A contemplative, ritual, or divinatory practice from the world's spiritual and alternative-medicine traditions. These systems aim at self-knowledge, healing, or communion with the numinous — often carrying centuries or millennia of lineage.",
    tools: ["Cards, stones, or ritual objects", "Journal", "Candles and incense", "Altar cloth", "Reference books", "Quiet space"],
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
    match: /\b(mancala|senet|backgammon|carrom|mahjong|pachisi|chaturanga|pallankuzhi|ganjifa|dayakattai|tavla|oware|bao|omweso|fanorona|yoté|morabaraba|nine men'?s morris|fox and geese|hnefatafl|tafl|alquerque|tablut|draughts|checkers|chinese chess|xiangqi|shogi|yut nori|tuho|shagai|toguz|kubb|molkky|gorodki|lapta|cuju|kemari|ulama|patolli|royal game of ur|ludus duodecim|knucklebones|kottabos|petteia|harpastum|episkyros|soule|camp ball|pale-mall|jeu de paume|latrunculi|tabula|mehen|hounds and jackals|calcio storico|highland games|caber toss|stone put|sheaf toss|bog snorkel|cheese rolling|shin kicking|wife carrying|worm charm|dwile flonk)/i,
    description:
      "A traditional board, tile, pitch, or folk game from a specific culture. Many of these games have roots going back thousands of years and serve as both pastime and living cultural heritage — Senet was played in Egypt c. 3100 BCE, Go in China over 2,500 years ago.",
    tools: ["Board, pit, or playing field", "Counters, stones, or pieces", "Rulebook or oral tradition", "Timer (for competitive play)", "Reference material", "Traditional costume or attire"],
    glossary: [
      ["Opening", "Established initial sequence of moves"],
      ["Tempo", "Initiative; forcing the opponent to respond"],
      ["Territory", "Controlled points or area"],
      ["Capture", "Removing opponent's piece(s) from play"],
      ["Variation", "Regional or house rule difference"],
      ["Endgame", "Late stage when pieces/options are reduced"],
    ],
  },
  {
    match: /\b(tcg|ccg|yugioh|pokemon tcg|magic the gathering|trading card|uno|bridge|canasta|rummy|hearts|spades|euchre|cribbage|solitaire|blackjack|baccarat|pinochle|gin rummy|codenames|dixit|carcassonne|power grid|settlers|catan|ticket to ride|pandemic|wingspan|dominion|gloomhaven|agricola|terraforming mars)/i,
    description:
      "A card- or modern board-game discipline of tactics, probability, and bluff. Card games date back to 9th-century Tang China; modern Eurogames (post-1995 Catan) and collectible card games (Magic: The Gathering, 1993) reshaped the hobby.",
    tools: ["Card set or deck(s)", "Sleeves and deck box (for TCGs)", "Playmat", "Dice and counters", "Rulebook", "Timer"],
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
    match: /\b(puzzle|jigsaw|crossword|sudoku|word search|nonogram|ken[- ]?ken|kakuro|rubik|speed cubing|burr puzzle|escape room|brain teaser|memory palace|mental math|logic puzzle|cryptic)/i,
    description:
      "A solo or small-group puzzle discipline blending logic, pattern recognition, and sometimes mechanical skill. Modern puzzle forms range from the Victorian crossword to 1980s Rubik's Cube to narrative escape rooms.",
    tools: ["The puzzle itself", "Pencil and eraser", "Timer (for speed disciplines)", "Reference solving guide", "Good lighting", "Flat work surface"],
    glossary: [
      ["Heuristic", "Rule-of-thumb shortcut"],
      ["Algorithm", "Memorized sequence solving a sub-problem"],
      ["Constraint", "Rule restricting valid solutions"],
      ["Parity", "Even/odd state governing reachability"],
      ["Bottleneck", "Hardest step limiting overall time"],
      ["Warm-up", "Easy exercise before attempting records"],
    ],
  },
  {
    match: /\b(dungeons|pathfinder|call of cthulhu|vampire the masquerade|shadowrun|warhammer rpg|traveller|gurps|fate|blades in the dark|powered by the apocalypse|stars without number|osr|ironsworn|solo rpg|play by mail|play by post|larp)/i,
    description:
      "A tabletop role-playing game (TTRPG) telling stories through rules, dice, and a game master or solo mechanics. TTRPGs began with D&D (1974, Gygax/Arneson) and branched into hundreds of systems — from gritty sim to rules-light narrative games.",
    tools: ["Core rulebook(s)", "Character sheets", "Polyhedral dice (or cards/coins)", "Miniatures or theater of the mind", "Battle mat / VTT (Roll20, Foundry)", "Session notes and handouts"],
    glossary: [
      ["GM / DM", "Game/Dungeon Master running the fiction"],
      ["PC / NPC", "Player and Non-Player Character"],
      ["Stat block", "Condensed rules for a creature or NPC"],
      ["Save", "Defensive roll against an effect"],
      ["Session zero", "Planning meeting before the campaign starts"],
      ["Retcon", "Retroactively changing past fiction"],
    ],
  },
  {
    match: /\b(drone|rc |r\/c|radio control|model aircraft|rocketry|model rocket|high[- ]?power rocket|slot car|soap box|pinewood derby|fpv)/i,
    description:
      "A radio-controlled or model-vehicle hobby involving building and operating miniature aircraft, cars, boats, or rockets. Modern RC emerged post-WWII with proportional control radios; amateur rocketry was formalized by Estes and the NAR in the 1950s–60s.",
    tools: ["Transmitter", "Receiver / flight controller", "Batteries and charger", "Frame or airframe", "Motors and props", "Spare parts kit"],
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
    match: /\b(coffee|tea|wine|beer|whisky|spirit|cocktail|barista|cider|mead|hot sauce|vinegar|jam and preserve|jam making|preserve making)/i,
    description:
      "A beverage or preserving craft focused on fermentation, extraction, or preparation of a specific drink or preserve. From Ethiopian coffee rituals to Scottish whisky distillation and grandma's canning, each branch combines agriculture, chemistry, and sensory evaluation.",
    tools: ["Brewing/extraction/canning device", "Scale", "Grinder, mill, or blender", "Timer and thermometer", "Glassware, bottles, or jars", "pH meter or test strips"],
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
    match: /\b(gard|permacul|forag|homestead|compost|mushroom|sprout|microgreen|aquapon|hydropon|aeropon|seed sav|grafting|espalier|biochar|rainwater|greywater|pressure can|water bath can|forest garden|market garden|herbalism|kitchen garden)/i,
    description:
      "A growing, preserving, or land-management practice rooted in food self-sufficiency. These crafts blend horticulture, chemistry, and ecology — and range from apartment microgreens to full-scale permaculture homesteads.",
    tools: ["Hand tools (trowel, pruners)", "Hose/watering can", "Soil amendments or substrate", "Seeds, spores, or starts", "Compost bin or system", "Garden journal"],
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
    match: /\b(video game|speedrun|twitch|streaming|esports|game modding|texture pack|map making for game|modding|emulation|vlog|blog|youtube content|podcast|wikipedia edit|open source|competitive programming|ctf|bug bounty|prompt engineering|pixel art|asmr|lo[- ]?fi|meme making|digital journal|fan wiki|amv|flash anim|nft)/i,
    description:
      "A digital discipline organized around playing, broadcasting, creating, or modifying online content. Emerging from 1980s arcade and BBS culture, it now spans professional esports, streaming, citizen-led internet scholarship, and AI-mediated creation.",
    tools: ["Gaming PC / editing workstation", "Controller or keyboard/mouse", "Capture card (for streaming)", "Microphone", "Multiple monitors", "High-refresh display"],
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
    match: /\b(language|linguist|etym|conlang|esperanto|polyglot|sign language|braille|shorthand|stenograph|latin|sanskrit|dialect study|accent coaching)/i,
    description:
      "A language-learning, linguistic, or philological practice. From classical philology to constructed languages like Esperanto and Dothraki, these pursuits combine comparative analysis, phonetics, and regular practice.",
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
    match: /\b(stamp|coin|banknote|philately|numismat|ticket|postcard|matchbox|ephemera|pin badge|enamel pin|patch collect)/i,
    description:
      "A documentary collecting specialty focused on printed or struck paper and metal items. Philately and numismatics both took formal shape in the 19th century and preserve vast visual and historical records.",
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
  {
    match: /\b(bushcraft|primitive|flint knap|fire by friction|shelter build|trapping|tanning|brain tan|bark tan|cordage|natural pigment|charcoal mak|dry stone|cob build|straw bale|adobe|timber fram|log cabin|earthship|bow making|atlatl making|stone tool)/i,
    description:
      "An outdoor-skills or primitive-craft discipline practicing pre-industrial techniques for shelter, fire, food, and tools. Rooted in foraging, hunter-gatherer, and vernacular building traditions, these skills have seen strong modern revival through Mors Kochanski, Ray Mears, and similar teachers.",
    tools: ["Cutting tool (knife, axe)", "Ferro rod or traditional fire kit", "Cordage and cloth", "Container", "Reference field guide", "Sturdy footwear and clothing"],
    glossary: [
      ["Tinder bundle", "Fine dry material catching ignition"],
      ["Kindling", "Small sticks growing the flame"],
      ["Bowdrill", "Friction fire system with spindle and hearth"],
      ["Debris hut", "Insulated improvised shelter"],
      ["Figure-four", "Simple deadfall trap trigger"],
      ["Cordage", "Twisted fiber rope made from plant or sinew"],
    ],
  },
  {
    match: /\b(dog|cat|rabbit|pigeon|falcon|ferret|rat|hedgehog|sugar glider|tarantula|reptile|gecko|chameleon|snake breed|axolotl|dart frog|jellyfish|octopus|parrot|canary|finch|chicken keep|duck keep|goat keep|butterfly garden|bug hotel|flyball|dog agility|herding trial|schutzhund|canicross|dock diving|disc dog|mantis shrimp)/i,
    description:
      "An animal-keeping, training, or companion-animal discipline. Each species brings its own husbandry and welfare requirements; many traditions (falconry, pigeon fancying, chicken keeping) have multi-century histories in their host cultures.",
    tools: ["Appropriate enclosure or housing", "Food and water systems", "Veterinary reference/contacts", "Enrichment and training tools", "Cleaning/maintenance supplies", "Health-check equipment"],
    glossary: [
      ["Husbandry", "Overall care practices for a species"],
      ["Enrichment", "Environmental complexity supporting welfare"],
      ["Imprinting", "Early-life attachment in young animals"],
      ["Conformation", "Structure judged in show standards"],
      ["Quarantine", "Isolation period preventing disease spread"],
      ["Pedigree", "Documented ancestry of an animal"],
    ],
  },
  {
    match: /\b(amateur radio|software defined radio|ham radio|ssb|hf|vhf|uhf|morse|cw)/i,
    description:
      "Amateur ('ham') radio is licensed two-way radio communication for hobbyists. Born with Marconi's 1901 Atlantic transmission, amateur radio supports emergency communication, contesting, moonbounce, satellite ops, and technical experimentation.",
    tools: ["HF/VHF/UHF transceiver", "Antenna and feedline", "SWR meter", "Power supply", "Morse key or digital mode interface", "Logbook or software (N1MM, Log4OM)"],
    glossary: [
      ["QSO", "Radio contact between two operators"],
      ["CQ", "General call — 'seeking any station'"],
      ["SWR", "Standing wave ratio — antenna match measure"],
      ["DX", "Long-distance contact"],
      ["Elmer", "Experienced ham mentoring newcomers"],
      ["Net", "Organized on-air group meeting"],
    ],
  },
  {
    match: /\b(vintage car|hot rod|custom van|motorcycle build|sidecar|trike build|go[- ]?kart|electric vehicle conversion|bicycle restoration|canal boat|narrowboat|tall ship)/i,
    description:
      "A vehicle restoration or custom-building hobby, reviving or transforming cars, motorcycles, boats, or human-powered craft. Each era and marque has its own parts ecosystem, shows, and devoted clubs.",
    tools: ["Complete toolset (metric and imperial)", "Service manual for the specific vehicle", "Parts catalog", "Lifts, jacks, or hoists", "Paint and finishing supplies", "Diagnostic scan tool"],
    glossary: [
      ["OEM", "Original Equipment Manufacturer parts"],
      ["Restomod", "Restoration with modern mechanical upgrades"],
      ["Concours", "Highest-level show judging to original spec"],
      ["Patina", "Original surviving weathering prized over repaint"],
      ["Tear-down", "Complete disassembly for restoration"],
      ["Numbers-matching", "Verified original engine/trans/chassis pairing"],
    ],
  },
  {
    match: /\b(journal|morning pages|gratitude|bullet journal|habit track|dream journal|lucid dream|memory train|speed read|typing practice|public speak|handwriting|ambidext|minimalism|capsule wardrobe|slow living|frugal living|dumpster div|bokashi|vermicomposting)/i,
    description:
      "A self-improvement or lifestyle practice focused on habit, reflection, or intentional living. Many draw on Stoic, Buddhist, or modern productivity traditions (bullet journaling, minimalism, slow living) adapted for daily routine.",
    tools: ["Notebook or app for tracking", "Pens or stylus", "Quiet dedicated time", "Reference book or course", "Timer", "Review schedule (weekly/monthly)"],
    glossary: [
      ["Keystone habit", "Core habit that triggers others"],
      ["Trigger", "Cue that starts a habit loop"],
      ["Streak", "Consecutive days of maintaining a habit"],
      ["Reflection", "Periodic review of practice and progress"],
      ["Constraint", "Self-imposed limit driving focus"],
      ["Resistance", "Inner friction opposing meaningful work"],
    ],
  },
];

export const GENERIC: Content = {
  description:
    "This activity's tools and glossary are still being curated. Contributions welcome — see the project README.",
  tools: [
    "Reference material (book, course, or online community)",
    "Dedicated practice space",
    "Safety gear appropriate to the activity",
    "Progress journal or log",
    "Mentor, partner, or local club",
    "Starter-grade equipment",
  ],
  glossary: [
    ["Fundamentals", "Core skills underpinning advanced work"],
    ["Drill", "Focused repetition of one component"],
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
    if (kw.match.test(name)) {
      return {
        description: kw.description,
        tools: kw.tools,
        glossary: kw.glossary,
      };
    }
  }
  for (const kw of KEYWORDS) {
    if (kw.match.test(category)) {
      return {
        description: kw.description,
        tools: kw.tools,
        glossary: kw.glossary,
      };
    }
  }
  return GENERIC;
}
