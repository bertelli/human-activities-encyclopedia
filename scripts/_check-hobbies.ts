import postgres from "postgres";

const input = `Abalone Fishing
Abseiling (Rapelling)
A Capella Singing
Accordion
Acid Etching
Acro Dance (Acrobatic Dance)
Acro Yoga
Acrobatics
Acrylic Painting
Acting
Action Figures (Making/ Collecting)
Adventure Hobbies
Aerobics
Aeromodeling
Aikido
Air Guitar
Air Hockey
Airbrushing
Airplane Spotting (Plane spotting)
Airsoft
Ajaeng
Alphorn
Alpine Hobbies/Sports
Amateur Radio
American Football
Angling
Animal Hobbies
Animal Racing (Camel, Dog, Pig, Donkey)
Animation
Anime
Ant Keeping
Antiques/Antiquing
Aquaponics
Aquarium
Aquascaping
Arcade Games
Archery
Architecture
Armwrestling
Art (Making/Collecting/Restoration)
Astrology
Astronomy (Stargazing)
Atumpan
ATV (All-Terrain Vehicle)
Auctions (In-person/Online)
Audiophilia
Aurora Photography
Australian Football (Aussie Rules)
Autobiography Writing
Autoharp
Automobile (Racing/Maintenance/Restoration/Detailing)
Aviation
Ax (Making/Throwing)
Baby Sitting
Backpacking
Backyard Games
Badminton
Bagpipes Playing
Baking
Ball Games
Ballet
Ballooning
Balloons (Art/Decoration)
Ballroom Dancing
Banjo Playing
Barbecuing
Barre
BASE Jumping
Baseball
Basketball
Bass Guitar
Bassoon Playing
Baton Twirling
Beach Sports( Volleyball/Football)
Beachcombing
Beading (Bead Work)
Beat Making
Beatboxing
Beekeeping
Beer (Tasting/Brewing)
Bells ( Ringing/Making)
Belly Dancing
Biathlon
Bikejoring
Biking (Cycling)
Bikini (Fashion/Modeling)
Billiards (Cue Sports/Pool/Snooker)
Bingo
Birdwatching (Photography/Feeding)
Blacksmithing
Blogging
Blow Painting
Board Games
Boats (Racing/Restoration)
Bobsleighing (Bobsledding)
Bocce
Bodybuilding
Bongo Drums
Bonsai
Books (Clubs/Reading/Collecting/Restoration)
Boomerang (Throwing/Making)
Botany
Bouldering
Bowling
Boxing
Braille
Brazilian Jiu-jitsu
Breakdancing
Bubble Art
Building
Bull Riding
Bungee Jumping
Bus (Spotting/Riding)
Bushcraft
Busking
Butchering
Butterfly (Rearing/ Watching /Photography)
Buttons (Collecting/Making)
Cabaret
Cabasa
Caber Toss
Cactus Growing
Cake Art
Cake Decorating
Calcio Storico
Calf Roping
Calligraphy
Camel (Riding / Racing/Safaris)
Camogie
Camping
Candle (Making/Art)
Canning
Canoeing
Canyoneering
Capoeira
Car (Maintenance/Restoration/Racing)
Card Games
Cardistry
Cards (Making/Collecting)
Carnivals
Carolling
Carpentry
Carting
Cartography (Map Making)
Cartooning
Carving (Wood/Soap)
Catering
Cave Diving (Spelunking)
Cello Playing
Ceramics (Collecting /Making/Art)
Chalk Art
Chariot Racing
Checkers (Draughts)
Cheerleading
Cheese (Making /Tasting)
Chess
Chessboxing
Church (Attending/Photography/History)
Cigar (Smoking/Collecting/Making)
Cinema
Circus
Clarinet Playing
Clavichord Playing
Cleaning
Climbing (Rock/Indoor)
Clouds (Gazing/Art/Photography)
Clowning
Clubbing
CNC Art
Coaching
Coding
Coffee (Roasting/Tasting/Art)
Coin (Collecting/Art)
Collage
Collecting Hobbies
Coloring
Comedy (Stand-up Comedy)
Comics (Reading/Making/Collecting)
Composing and Conducting Music
Composting
Computers
Concerts
Concrete Art
Conga Drums
Confectionery
Cooking
Cosplay
Couponing
Crabbing
Crafting Hobbies
Creative Hobbies
Creative Writing
Cribbage
Cricket
Cricut
Crocheting
Croquet
Cross Country Sports (Running/Skiing)
Cross Stitch
CrossFit
Crossword Puzzles
Cryptocurrency (Mining /Investing)
Cryptography
Cue Sports
Curling
Cycling
Cymbals Playing
Dambe Fighting
Dancing
Dandyism (La Sape)
Dartchery
Darts
Dating
Debate
Decathlon
Decorating
Decoupage
Deep Sea Fishing
Deltiology (Postcard Collecting)
Demolition Derby
Design Hobbies
Diabolo
Diary Keeping (Diarizing)
Diecast
Digiscoping
Digital Art
Diorama Making
Dirt (Art/Shaping)
Dirt Bike Racing
Disc Golf
Diving (Pool/Cliff)
DIY (Do It Yourself)
Djembe Drumming
DJing
Dodgeball
Dog (Grooming/Walking/Sledding/Training)
Dolls (Making/ Collecting)
Dolphin Watching
Dominoes
Doodling
Dowsing
Drag Racing
Drag Show
Drama
Draughts (Checkers)
Drawing
Driving
Drone (Flying /Photography)
Drum Playing
Duathlon
Duck Herding
Duelling
Dumpster Diving
Dutch Oven Cooking
Dynamophone Playing
Eating (Gourmet/Competitive)
E-Books (Design/Writing)
Eclipse Watching
E-Commerce
Edible Art
Editing (Books/Photos/Videos)
Egg Shell Painting
Egyptology
Eightball
Electric Guitar
Electronic Music
Electronics (Repair/Restoration)
Embossing
Embroidery
Engraving
Entertaining
Entomology
Equestrianism
Escapology
Eskrima
E-Sports
Etching
Exercise
Exhibitions
Experimenting
Extreme Sports
Face Slapping
Factory Tours
Falconry
Fancy Dress Parties
Fantasy Sports
Farmer Markets Visiting
Farming
Fashion Design
Fashion Shows Attending
Felting
Fencing
Feng Shui
Ferris Wheel
Festivals Attending
Fiddling
Field Hockey
Fighting (Martial Arts)
Figure Skating
Filmmaking
Fine Dining
Finger Painting
Finswimming
Fire Eating
Fire Fighting
Fire Poi
Fish Farming
Fish Keeping (Aquariums)
Fishing (Fly/Sport/Deep Sea)
Flame Throwing
Flamenco Dancing
Flea Markets Visiting
Floorball
Flowboarding
Flower (Growing/Arranging/Pressing)
Flute Playing
Fly Tying
Flyboarding
Flying (Helicopters/Planes)
Foam Parties
Foil Surfing
Food (Making/Blogging/Photography)
Foosball (Table Football)
Football
Foraging
Forest Bathing
Fort Building
Fossicking
Fossil Hunting
Fractal Burning
Free diving
Freerunning
Freestyle
Frisbee
Frugality
Fruit Picking
Furniture (Making/Collecting/Restoration)
Futsal
Gambling
Gaming
Goly Tama Dancing
Garage Band
Garage Sales
Gardening
Gardening (Miniature)
Gemology
Gemshorn Playing
Genealogy
Geocaching
Geography
Geology
Ghost Hunting
Gift Giving
Gingerbread Art
Glacier Hiking
Glass (Blowing /Etching/Staining)
Gliding
Gnoming
Go
Go Karting
Go-go Dancing
Gold (Collecting/Craft/Investing)
Golf
Gong (Making/Playing)
Gongoozling
Gourmet (Cooking/Dining)
Graffiti Art
Graphic Design
Grappling
Grilling
Grooming (Men's Grooming)
Guitar Playing
Gun (Smithing/Collecting/Shooting)
Gym
Gymnastics
Gyotaku (Fish Printing)
Gyrocopter
Hacking (Ethical Hacking)
Hair (Dressing/Art/Styling)
Hammer Throw
Hammocking
Hand Painting
Handball
Handwriting Analysis
Hang Gliding
Hapkido
Harmonica
Harp Playing
Harpastum
Hat Making (Millinery)
Healthy Living
Helicopter (Flying/Riding)
Heliskiing
Herbalism
Herping (Herpetology)
High Jump
Hikaru Dorodangu
Hiking
Hip Hop Music
Hobby Horse
Hockey
Home Brewing
Home Improvement
Home Security
Home Theatre
Homing Pigeons
Hookah (Shisha) Smoking
Hooverball
Horse Riding
Horse Shoe (Art/Making)
Horse Surfing
Hot Air Ballooning
Hot Rod
Hot Tub Games
Hula Hooping
Hunting
Hurling
Hydroplane
Hydroponics
Ice Blocking
Ice Climbing
Ice Diving
Ice Fishing
Ice Hockey
Ice Sailing
Ice Sculpting
Ice Skating
Ice-cream (Tasting/Making)
Icosathlon
Igloo Building
Illusion Art
Illustration Art
Improvisational Theater (Improv)
Indoor Hobbies
Indoor Sports
Inline (Hockey/Skating)
Insects (Collecting)
Instant Pot Cooking
Interior design
Inventing
Investing
Invisible Ink (Art/Tattoos)
Ironing (Extreme Ironing)
Jacuzzi Games
Jal Tarang
Jam Making
Jam Skating
Janggi (Korean Chess)
Japanese Lantern Making
Jarrarium
Javelin
Jaw (Jew) Harp
Jazz
Jazzercise
Jeet Kune Do
Jenga
Jet Skiing
Jewellry Making
Jigsaw Puzzles
Jiu-Jitsu
Jockeying
Jogging
Joinery
Jorkyball
Journaling
Jousting
Judo
Juggling
Juicing
Jumping Rope
Junk (Art/Collection)
Kabaddi
Kajukenbo
Kamancheh
Kanjira Playing
Kanzashi Art
Karaoke
Karate
Kart Racing
Kayak Surfing
Kayaking
Kendama
Kendo
Kenpo
Kettlebell Fitness
Keyboard Playing
Kickball
Kickboxing
Kicksled
Kinetic Sculptures
Kite Surfing
Kites (Making or Flying)
Kizomba Dancing
Klezmer Music
Knapping
Kneeboarding
Knife (Making/Throwing/Collecting)
Knitting
Knot Tying (Knotting)
Kombucha Brewing
Korfball
K-Pop Music
Krav Maga
Kubb
Kung Fu
Lacemaking
Lacrosse
Land Sailing
Landscaping
Language Learning
Lapidary
LARPing
Laser Tag
Lasso Throwing
Latte Art
Lawn Care
Lawn Sports
Leaf (Art/Collecting)
Learning
Leather Crafting
Lego (Building or Art)
Lethwei
Letter Writing
Letterboxing
Lightshow
Limo Riding
Line Dancing
Linocut
Listening to Music
Lithography
Livestreaming
Lock Picking
Log Rolling
Long Jump
Longboarding
Luge (Skeleton)
Lumberjack
Machining
Macramé
Magic Tricks
Magnet Art
Mahjong
Makeup Art
Mall Visiting
Mandala
Mandolin Playing
Manga
Map Making (Cartography)
Marathon Running
Marble (Playing/Collecting)
Marble Art
Marbles
Marching
Marimba
Marionette
Marksmanship
Martial Arts
Mask (Making/Collecting)
Masquerade Parties
Massaging
Matchstick Models
Mechanics
Medieval (Art/Re-enactment)
Meditation
Memoir Writing
Memorabilia Collecting
Memory Training
Mentalism
Metal Detecting
Metallurgy
Metalworking
Metaverse
Meteorology
Microscopy
Miming
Mineral Collecting
Mini Golf (Miniature Golf)
Miniature Art
Minimalism
Mixed Martial Arts (MMA)
Mixology
Model Making
Modeling
Monopoly
Monster Truck Racing
Mooing
Mosaic
Motocross
Motorcycles (Racing/Restoration)
Mountain Biking
Mountain Climbing
Movies (Watching/Making)
Muay Thai
Muraling
Museum Visiting
Mushroom (Farming/Hunting)
Music (Listening /Making)
Music Album Collecting
Nail Art
NASCAR Racing
Nature (Art/Study)
Necklace (Making/Collecting)
Needle Felting
Needlepoint
Needlework
Nerts
Netball
NFT (Collecting or Making)
Ninja Warrior
Ninjutsu
Noodling
Nordic Skiing
Novels (Reading or Writing)
Numismatics
Oboe Playing
Observatory
Obstacle Course Running
Ocarina Playing
Oceanography
Offroading
Oil Painting
Online Activities
Opal Art
Opera (Listening or Singing)
Orchestra
Orchid Growing
Organ Playing
Organic Farming
Organizing
Orienteering
Origami
Ornithology
Ostrich Racing
Ouija Board
Outdoor Activities
Outrigger Canoeing
Paddle Boarding
Pachisi
Paddle Ball
Pageants Attending
Paintball
Painting
Paludarium
Paper Crafts
Papier Mache
Parachuting
Parades Attending
Paragliding
Park Visiting
Parkour
Partying
Pen Pal
Penmanship
People Watching
Performance Arts
Pet (Sitting/Grooming)
Petting Zoo
Philately (Stamp Collecting)
Photography
Piano Playing
Picnicking
Piercing Arts
Pig Racing
Pigeon (Keeping/ Racing)
Pilates
Piloting
Ping Pong (Table Tennis)
Pipe (Making/Smoking)
Planespotting
Planetarium
Plastic Art
Playdough Modelling
Poetry
Poi Making
Pokémon Go
Poker
Pole Climbing
Pole Dancing
Pole Vault
Polo
Pontoon Boats
Pool (Billiards)
Pottery
Power Lifting
Prepping
Printing-3D
Pub Crawling
Pumpkin Art
Puppetry
Puzzles
Pyrography
Pyrotechnics
Qawwali
Qianball
Qigong
Quad Biking
Quadcopter Flying
Quadrathlon
Quadruplane Models
Quail Keeping
Quartz Collecting
Quatrefoil
Quickstep Dancing
Quidditch
Quilling
Quilting
Quiz Games
Quoits
Race Walking
Racquetball
Rafting
Rappelling (Abseiling)
Rapping
Raspberry Pi
RC-Remote Control
Reading
Robotics
Rock Climbing
Roller Skating
Roller Blading
Roller Skiing
Rowing
Rubik's Cube
Rugby
Running (Marathon/Trail)
Rock (Shaping/Carving/Collecting)
Recreational Vehicles (RV)
Reggae Music
Relaxing
Radio (Listening/Monitoring)
Reiki
Rodeo
Real Estate
Rockets (Amateur Rocketry)
Recycling
Recycle Art
Road Trips
Roller Coasters
Racing
Relay Sports
Recorder Playing
Rogaining
Role Playing
Safari
Sailing
Sake Tasting
Samba
Sambo
Sand Art (Sand Castles)
Saxophone
Scale Models
Scavenger Hunt
Scootering
Scouting
Scrabble
Scrapbooking
Scuba Diving
Sculling (Rowing)
Sculpting
Seashells (Art/Collecting)
Seawalking
Segway Polo
Sewing
Shadow Puppetry
Shooting
Shopping
Shot Put
Show Jumping
Shuffleboard
Singing
Skateboarding
Skating (Ice/Roller)
Skeet Shooting
Skeleton
Sketching
Skiing
Skijoring
Skimboarding
Skipping Rope
Skydiving
Slacklining
Sledding
Slingshot
Sneaker Collecting
Snorkelling
Snowboarding
Snowmobiling
Snowshoeing
Snuba diving
Soap (Making/ Art)
Soccer
Social Media
Socializing`;

function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(s: string): Set<string> {
  return new Set(norm(s).split(" ").filter(Boolean));
}

const sql = postgres(process.env.DATABASE_URL!, { ssl: "require" });

(async () => {
  const rows = await sql<{ name: string }[]>`SELECT name FROM activities`;
  const dbNames = rows.map((r) => r.name);
  const dbNorm = new Map<string, string>();
  for (const n of dbNames) dbNorm.set(norm(n), n);

  const list = input
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const missing: string[] = [];
  const present: string[] = [];

  for (const item of list) {
    const n = norm(item);
    if (!n) continue;
    if (dbNorm.has(n)) {
      present.push(item);
      continue;
    }
    // fuzzy: any db name that shares all tokens of the short side
    const itemTokens = tokens(item);
    let matched: string | null = null;
    for (const [dn, orig] of dbNorm) {
      const dbTokens = new Set(dn.split(" "));
      const small = itemTokens.size <= dbTokens.size ? itemTokens : dbTokens;
      const big = itemTokens.size <= dbTokens.size ? dbTokens : itemTokens;
      let all = true;
      for (const t of small) if (!big.has(t)) { all = false; break; }
      if (all && small.size > 0) { matched = orig; break; }
    }
    if (matched) present.push(`${item}  (≈ ${matched})`);
    else missing.push(item);
  }

  console.log(`TOTAL in list: ${list.length}`);
  console.log(`TOTAL in db:   ${dbNames.length}`);
  console.log(`PRESENT:       ${present.length}`);
  console.log(`MISSING:       ${missing.length}`);
  console.log("\n--- MISSING ---");
  for (const m of missing) console.log(m);
  await sql.end();
})();
