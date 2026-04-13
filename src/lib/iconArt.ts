// Deterministic 3D voxel ASCII art generator. B&W isometric icons.

type Vox = readonly [number, number, number];

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ──────────────────────────────────────────────────────────────
// Motif library — hand-tuned silhouettes, sparse on purpose so
// small renderings stay readable.
// ──────────────────────────────────────────────────────────────

const MOTIF_BUILDERS: Record<string, (rng: () => number) => Vox[]> = {
  // Sports — ball sitting on a small platform
  ball: () => {
    const out: Vox[] = [];
    const cx = 2, cy = 2, cz = 2, r = 1.8;
    for (let x = 0; x < 5; x++)
      for (let y = 0; y < 5; y++)
        for (let z = 1; z < 5; z++) {
          const d = Math.hypot(x - cx, y - cy, z - cz);
          if (d <= r) out.push([x, y, z]);
        }
    // platform
    for (let x = 1; x <= 3; x++) for (let y = 1; y <= 3; y++) out.push([x, y, 0]);
    return out;
  },

  // Games — a hollow open cube (dice / board)
  cube: () => {
    const out: Vox[] = [];
    const N = 4;
    for (let x = 0; x < N; x++)
      for (let y = 0; y < N; y++)
        for (let z = 0; z < N; z++) {
          const edge =
            +(x === 0 || x === N - 1) +
            +(y === 0 || y === N - 1) +
            +(z === 0 || z === N - 1);
          if (edge >= 2) out.push([x, y, z]);
        }
    return out;
  },

  // Arts & Crafts — tilted canvas on an easel foot
  easel: () => {
    const out: Vox[] = [];
    // inclined slab: as z rises, y shifts back
    for (let z = 1; z < 5; z++) {
      const y = Math.min(3, 4 - z);
      for (let x = 0; x < 4; x++) out.push([x, y, z]);
    }
    // foot
    out.push([1, 3, 0], [2, 3, 0], [1, 2, 0], [2, 2, 0]);
    return out;
  },

  // Collecting — two offset stacked boxes
  boxes: () => {
    const out: Vox[] = [];
    for (let x = 0; x < 3; x++)
      for (let y = 0; y < 3; y++) out.push([x, y, 0], [x, y, 1]);
    for (let x = 1; x < 4; x++)
      for (let y = 1; y < 4; y++) out.push([x, y, 2], [x, y, 3]);
    return out;
  },

  // Nature & Science — trunk + canopy
  tree: () => {
    const out: Vox[] = [];
    // trunk
    for (let z = 0; z < 3; z++) out.push([2, 2, z]);
    // canopy (diamond/sphere)
    const cx = 2, cy = 2, cz = 4;
    for (let x = 0; x < 5; x++)
      for (let y = 0; y < 5; y++)
        for (let z = 3; z < 6; z++) {
          const d = Math.hypot(x - cx, y - cy, (z - cz) * 1.4);
          if (d <= 1.9) out.push([x, y, z]);
        }
    return out;
  },

  // Technology & Making — staircase
  steps: () => {
    const out: Vox[] = [];
    for (let i = 0; i < 4; i++)
      for (let z = 0; z <= i; z++)
        for (let y = 1; y <= 3; y++) out.push([i, y, z]);
    return out;
  },

  // Mind & Spirit — stepped pyramid
  pyramid: () => {
    const out: Vox[] = [];
    const N = 5;
    for (let z = 0; z < 3; z++)
      for (let x = z; x < N - z; x++)
        for (let y = z; y < N - z; y++) out.push([x, y, z]);
    return out;
  },

  // Music — + cross (like a note on its side)
  plus: () => {
    const out: Vox[] = [];
    for (let z = 0; z < 4; z++) out.push([2, 2, z]);
    for (let i = 0; i < 5; i++) {
      out.push([i, 2, 0]);
      out.push([2, i, 0]);
    }
    // top cap
    out.push([2, 2, 4], [1, 2, 4], [3, 2, 4], [2, 1, 4], [2, 3, 4]);
    return out;
  },

  // Writing — a flat book/slab
  book: () => {
    const out: Vox[] = [];
    for (let x = 0; x < 4; x++)
      for (let y = 0; y < 3; y++) out.push([x, y, 0], [x, y, 1]);
    // spine raised
    for (let y = 0; y < 3; y++) out.push([0, y, 2]);
    return out;
  },

  // Performance — archway / stage
  arch: () => {
    const out: Vox[] = [];
    for (let z = 0; z < 4; z++) {
      out.push([0, 2, z]);
      out.push([4, 2, z]);
    }
    for (let x = 0; x <= 4; x++) out.push([x, 2, 3]);
    // base stage
    for (let x = 0; x < 5; x++) for (let y = 1; y < 4; y++) out.push([x, y, 0]);
    return out;
  },

  // Photography — tall narrow tower with wide lens cap
  tower: () => {
    const out: Vox[] = [];
    for (let z = 0; z < 5; z++) out.push([2, 2, z]);
    // lens cap
    for (let x = 1; x <= 3; x++)
      for (let y = 1; y <= 3; y++) out.push([x, y, 5]);
    // base
    for (let x = 0; x < 5; x++) out.push([x, 2, 0]);
    for (let y = 0; y < 5; y++) out.push([2, y, 0]);
    return out;
  },

  // Food & Drink — mug / cup
  mug: () => {
    const out: Vox[] = [];
    // hollow cylinder walls
    for (let z = 0; z < 4; z++) {
      for (let x = 1; x <= 3; x++) {
        out.push([x, 1, z]);
        out.push([x, 3, z]);
      }
      for (let y = 1; y <= 3; y++) {
        out.push([1, y, z]);
        out.push([3, y, z]);
      }
    }
    // base floor
    for (let x = 1; x <= 3; x++) for (let y = 1; y <= 3; y++) out.push([x, y, 0]);
    // handle
    out.push([4, 2, 1], [4, 2, 2]);
    return out;
  },

  // Generic fallbacks for subcategories
  ring: () => {
    const out: Vox[] = [];
    for (let x = 0; x < 5; x++)
      for (let y = 0; y < 5; y++) {
        const d = Math.hypot(x - 2, y - 2);
        if (d <= 2.2 && d >= 1.3)
          for (let z = 0; z < 2; z++) out.push([x, y, z]);
      }
    return out;
  },
  twin: () => {
    const out: Vox[] = [];
    for (let z = 0; z < 4; z++) out.push([1, 2, z], [3, 2, z]);
    return out;
  },
  wedge: () => {
    const out: Vox[] = [];
    for (let x = 0; x < 5; x++) {
      const h = x + 1;
      for (let y = 1; y <= 3; y++) for (let z = 0; z < h; z++) out.push([x, y, z]);
    }
    return out;
  },
};

// Keyword-driven semantic mapping. First hit wins.
const KEYWORD_MOTIFS: Array<[RegExp, keyof typeof MOTIF_BUILDERS]> = [
  [/sport|fitness|athletic|martial|combat/i, "ball"],
  [/game|puzzl|board/i, "cube"],
  [/art|craft|paint|draw|fiber|paper/i, "easel"],
  [/collect/i, "boxes"],
  [/nature|science|animal|outdoor|gardening|plant/i, "tree"],
  [/tech|mak|diy|automotive|motor|engineer/i, "steps"],
  [/mind|spirit|mystic|paranormal|meditat|wellness/i, "pyramid"],
  [/music|audio|sound|dance/i, "plus"],
  [/writ|literat|education|research/i, "book"],
  [/perform|stage|theatre|theater|media|communic/i, "arch"],
  [/photo|camera|film/i, "tower"],
  [/food|drink|cook|beer|wine/i, "mug"],
  [/water/i, "ring"],
  [/extreme|adventure|winter|skill/i, "wedge"],
  [/lifestyle|beauty|self-care|organization/i, "twin"],
];

const FALLBACKS: Array<keyof typeof MOTIF_BUILDERS> = [
  "tower", "pyramid", "boxes", "cube", "arch", "plus", "ring", "wedge", "twin",
];

// ──────────────────────────────────────────────────────────────
// Isometric renderer
// Per-voxel stamp: 3 cols × 2 rows
//   row 0 (top edge):  "▄▄▄"
//   row 1 (body):      "███"
// Offsets: +x=(+2,+1), +y=(-2,+1), +z=(0,-1)
// Paint back-to-front so near voxels overwrite far ones.
// ──────────────────────────────────────────────────────────────
function renderIso(voxels: Vox[]): string {
  if (voxels.length === 0) return "";
  let minX = Infinity, minY = Infinity, minZ = Infinity;
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
  for (const [x, y, z] of voxels) {
    if (x < minX) minX = x; if (x > maxX) maxX = x;
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  const nx = maxX - minX + 1;
  const ny = maxY - minY + 1;
  const nz = maxZ - minZ + 1;

  // screen col range: 2*(x-minX) - 2*(y-minY) ∈ [-2(ny-1), 2(nx-1)]
  // plus stamp width 3 → total cols
  const ox = 2 * (ny - 1);
  const W = 2 * (nx - 1) + 2 * (ny - 1) + 3;
  // screen row range: (x-minX)+(y-minY) - (z-minZ) ∈ [-(nz-1), (nx-1)+(ny-1)]
  const oy = nz - 1 + 1; // +1 for the top-edge row
  const H = oy + (nx - 1) + (ny - 1) + 2;

  const canvas: string[][] = Array.from({ length: H }, () => Array(W).fill(" "));
  const vset = new Set<string>();
  for (const [x, y, z] of voxels) vset.add(`${x},${y},${z}`);
  const has = (x: number, y: number, z: number) => vset.has(`${x},${y},${z}`);

  const sorted = [...voxels].sort((a, b) => {
    const da = a[0] - a[1];
    const db = b[0] - b[1];
    // back→front: higher y first, then lower x, then lower z
    if (a[1] !== b[1]) return b[1] - a[1];
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[2] - b[2];
  });

  const put = (c: number, r: number, ch: string) => {
    if (r < 0 || r >= H || c < 0 || c >= W) return;
    canvas[r][c] = ch;
  };

  for (const [x, y, z] of sorted) {
    const X = x - minX, Y = y - minY, Z = z - minZ;
    const sc = 2 * X - 2 * Y + ox;
    const sr = X + Y - Z + oy;

    const topVis = !has(x, y, z + 1);
    const rightVis = !has(x + 1, y, z);
    const leftVis = !has(x, y + 1, z);
    // fully interior — contributes nothing to silhouette
    if (!topVis && !rightVis && !leftVis) continue;

    // Top face (row above body)
    if (topVis) {
      // back-back corner (behind everything) gets a sharper cap
      const backBack = !has(x - 1, y, z + 1) && !has(x, y - 1, z + 1);
      put(sc, sr - 1, leftVis ? "▄" : "▀");
      put(sc + 1, sr - 1, backBack ? "▀" : "▄");
      put(sc + 2, sr - 1, rightVis ? "▄" : "▀");
    }
    // Body — mix characters to add texture
    // left face: ▒ if exposed; else blank (hidden by neighbor)
    if (leftVis) put(sc, sr, "▐");
    // center ridge: use varying density based on height & position
    const ridge = topVis ? "█" : leftVis && rightVis ? "▓" : "█";
    put(sc + 1, sr, ridge);
    // right face
    if (rightVis) put(sc + 2, sr, "▌");
  }

  const lines = canvas.map((r) => r.join("").replace(/\s+$/, ""));
  while (lines.length && lines[lines.length - 1] === "") lines.pop();
  while (lines.length && lines[0] === "") lines.shift();
  let minL = Infinity;
  for (const l of lines) {
    if (l === "") continue;
    const m = l.match(/^( *)/);
    if (m) minL = Math.min(minL, m[1].length);
  }
  if (!isFinite(minL) || minL === 0) return lines.join("\n");
  return lines.map((l) => (l.length >= minL ? l.slice(minL) : l)).join("\n");
}

// ──────────────────────────────────────────────────────────────
// Hand-authored icons for the macro categories.
// Each is a compact, readable glyph using block characters.
// ──────────────────────────────────────────────────────────────
const HAND_ICONS: Record<string, string> = {
  // Sports — a round ball
  sports: [
    "   █████   ",
    " █████████ ",
    "███████████",
    "███████████",
    "███████████",
    "███████████",
    " █████████ ",
    "   █████   ",
  ].join("\n"),

  // Games — die with pips (dots = gaps)
  games: [
    "█████████████",
    "██ ██████ ███",
    "██ ██████ ███",
    "█████████████",
    "██████ ██████",
    "██████ ██████",
    "█████████████",
    "██ ██████ ███",
    "██ ██████ ███",
    "█████████████",
  ].join("\n"),

  // Arts & Crafts — paintbrush (angled handle + bristles)
  arts: [
    "           ██",
    "          ██ ",
    "         ██  ",
    "        ██   ",
    "       ██    ",
    "      ██     ",
    "     ██      ",
    "    ██       ",
    "  ████       ",
    "██████       ",
    "█ ████       ",
    "██████       ",
    "██████       ",
  ].join("\n"),

  // Collecting — shelves of items
  collecting: [
    " ██  ███  ██ █ ",
    " ██  ███  ██ █ ",
    " ██  ███  ██ █ ",
    "███████████████",
    "███████████████",
    "  ████ ██  ███ ",
    "  ████ ██  ███ ",
    "  ████ ██  ███ ",
    "███████████████",
    "███████████████",
  ].join("\n"),

  // Nature & Science — tree (leafy crown + trunk)
  nature: [
    "      █      ",
    "     ███     ",
    "    █████    ",
    "   ███████   ",
    "  █████████  ",
    " ███████████ ",
    "█████████████",
    " ███████████ ",
    "  █████████  ",
    "      █      ",
    "      █      ",
    "    █████    ",
  ].join("\n"),

  // Technology & Making — gear
  technology: [
    "    ██   ██    ",
    "    ██   ██    ",
    " ██ █████████ ██",
    " █████████████ ",
    "███████ ███████",
    "██████   ██████",
    "█████     █████",
    "██████   ██████",
    "███████ ███████",
    " █████████████ ",
    " ██ █████████ ██",
    "    ██   ██    ",
    "    ██   ██    ",
  ].join("\n"),

  // Mind & Spirit — flame
  mind: [
    "      █      ",
    "     ███     ",
    "    █████    ",
    "    █████    ",
    "   ███████   ",
    "   ███████   ",
    "  █████████  ",
    "  █████████  ",
    "  █████████  ",
    "   ███████   ",
    "    █████    ",
    "     ███     ",
    "      █      ",
  ].join("\n"),

  // Music — quarter note
  music: [
    "        █████",
    "        █████",
    "          ███",
    "          ██ ",
    "          ██ ",
    "          ██ ",
    "          ██ ",
    "          ██ ",
    "          ██ ",
    "     █████   ",
    "  ███████    ",
    " ████████    ",
    " ████████    ",
    "  ██████     ",
  ].join("\n"),

  // Writing — open book
  writing: [
    "████████ ████████",
    "█      █ █      █",
    "█ ████ █ █ ████ █",
    "█      █ █      █",
    "█ ████ █ █ ████ █",
    "█      █ █      █",
    "█ ████ █ █ ████ █",
    "█      █ █      █",
    "█ ████ █ █ ████ █",
    "█      █ █      █",
    "█████████████████",
  ].join("\n"),

  // Performance — Greek amphitheater (concentric arcs + stage)
  performance: [
    "       ███████       ",
    "     ███████████     ",
    "   ████       ████   ",
    "  ███  █████████  ██ ",
    " ███  ████   ████  ██",
    "███  ███  ███  ███  █",
    "██  ███  █████  ███  ",
    "██  ██  ███████  ██  ",
    "██  ██ █████████ ██  ",
    "██  ██ █████████ ██  ",
    "██  ██  ███████  ██  ",
    " ██  ██   ███   ██   ",
    "  ██  ███     ███    ",
    "   ███  ███████      ",
    "     ████████        ",
  ].join("\n"),

  // Photography — camera (body + lens circle)
  photography: [
    "   ████   █████   ",
    "██████████████████",
    "██              ██",
    "██    █████     ██",
    "██  █████████   ██",
    "██ ███     ███  ██",
    "██ ██   █   ██  ██",
    "██ ██  ███  ██  ██",
    "██ ██   █   ██  ██",
    "██ ███     ███  ██",
    "██  █████████   ██",
    "██    █████     ██",
    "██              ██",
    "██████████████████",
  ].join("\n"),

  // Food & Drink — mug with handle and steam curls
  food: [
    "   █  █  █   ",
    "  █  █  █    ",
    "   █  █  █   ",
    "             ",
    "█████████    ",
    "█████████ ███",
    "█       █ █ █",
    "█       █ █ █",
    "█       █ ███",
    "█       █    ",
    "█████████    ",
    " ███████     ",
  ].join("\n"),
};

const HAND_LOOKUP: Array<[RegExp, keyof typeof HAND_ICONS]> = [
  [/^sports?\b|athletic/i, "sports"],
  [/^games?\b|puzzl|board game/i, "games"],
  [/arts?\s*&\s*crafts?|^arts?\b|craft|paint|draw/i, "arts"],
  [/collect/i, "collecting"],
  [/nature|science|natural/i, "nature"],
  [/tech|making|tools?|engineer/i, "technology"],
  [/mind|spirit|mystic|meditat/i, "mind"],
  [/music|audio/i, "music"],
  [/writ|literat|book/i, "writing"],
  [/perform|theat|stage|dance/i, "performance"],
  [/photo|camera/i, "photography"],
  [/food|drink|cook|beer|wine/i, "food"],
];

export function generateIcon(name: string): string {
  // First try hand-authored macro icon
  for (const [re, key] of HAND_LOOKUP) {
    if (re.test(name)) return HAND_ICONS[key];
  }
  // Fallback: procedural voxel art for subcategories
  const seed = fnv1a(name.toLowerCase());
  const rng = mulberry32(seed);
  let motif: keyof typeof MOTIF_BUILDERS | null = null;
  for (const [re, m] of KEYWORD_MOTIFS) {
    if (re.test(name)) { motif = m; break; }
  }
  if (!motif) motif = FALLBACKS[seed % FALLBACKS.length];
  const voxels = MOTIF_BUILDERS[motif](rng);
  return renderIso(voxels);
}
