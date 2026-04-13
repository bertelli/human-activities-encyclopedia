// Voxel models for each category, built from simple primitives.
// All coordinates are roughly centered at origin. Y is up, X right, Z forward.

export type Vox = readonly [number, number, number];

function sphere(r: number, cx = 0, cy = 0, cz = 0): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let x = -R; x <= R; x++)
    for (let y = -R; y <= R; y++)
      for (let z = -R; z <= R; z++) {
        const d = Math.hypot(x, y, z);
        if (d <= r + 0.3 && d >= r - 1.3)
          out.push([x + cx, y + cy, z + cz]);
      }
  return out;
}

function filledSphere(r: number, cx = 0, cy = 0, cz = 0): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let x = -R; x <= R; x++)
    for (let y = -R; y <= R; y++)
      for (let z = -R; z <= R; z++) {
        if (Math.hypot(x, y, z) <= r + 0.3) out.push([x + cx, y + cy, z + cz]);
      }
  return out;
}

function box(
  xRange: [number, number],
  yRange: [number, number],
  zRange: [number, number],
  hollow = false
): Vox[] {
  const out: Vox[] = [];
  for (let x = xRange[0]; x <= xRange[1]; x++)
    for (let y = yRange[0]; y <= yRange[1]; y++)
      for (let z = zRange[0]; z <= zRange[1]; z++) {
        if (hollow) {
          const atEdge =
            +(x === xRange[0] || x === xRange[1]) +
            +(y === yRange[0] || y === yRange[1]) +
            +(z === zRange[0] || z === zRange[1]);
          if (atEdge < 2) continue;
        }
        out.push([x, y, z]);
      }
  return out;
}

function cylinderY(
  r: number,
  yMin: number,
  yMax: number,
  cx = 0,
  cz = 0,
  hollow = false
): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let x = -R; x <= R; x++)
    for (let z = -R; z <= R; z++) {
      const d = Math.hypot(x, z);
      if (d > r + 0.3) continue;
      if (hollow && d < r - 1) continue;
      for (let y = yMin; y <= yMax; y++) out.push([x + cx, y, z + cz]);
    }
  return out;
}

function discY(r: number, y: number, cx = 0, cz = 0): Vox[] {
  return cylinderY(r, y, y, cx, cz);
}

function merge(...groups: Vox[][]): Vox[] {
  const seen = new Set<string>();
  const out: Vox[] = [];
  for (const g of groups)
    for (const v of g) {
      const k = `${v[0]},${v[1]},${v[2]}`;
      if (!seen.has(k)) {
        seen.add(k);
        out.push(v);
      }
    }
  return out;
}

// ──────────────────────────────────────────────────────────────
// Models
// ──────────────────────────────────────────────────────────────

// helper: rotate around Z-axis to create lying-cylinder (for camera lens etc.)
function cylinderX(
  r: number,
  xMin: number,
  xMax: number,
  cy = 0,
  cz = 0
): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let y = -R; y <= R; y++)
    for (let z = -R; z <= R; z++) {
      if (Math.hypot(y, z) > r + 0.3) continue;
      for (let x = xMin; x <= xMax; x++) out.push([x, y + cy, z + cz]);
    }
  return out;
}

const M = {
  // Sports — dumbbell: two weight discs + connecting bar
  sports: () => {
    const out: Vox[] = [];
    // weight discs (cylinders along X axis, flat faces perpendicular to X)
    const disc = (xMin: number, xMax: number, r: number) => {
      for (let x = xMin; x <= xMax; x++)
        for (let y = -r; y <= r; y++)
          for (let z = -r; z <= r; z++) {
            if (Math.hypot(y, z) <= r) out.push([x, y, z]);
          }
    };
    // left weight (two-plate stack)
    disc(-7, -6, 4);
    disc(-5, -4, 3);
    // right weight
    disc(4, 5, 3);
    disc(6, 7, 4);
    // bar
    for (let x = -4; x <= 4; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1.3) out.push([x, y, z]);
        }
    return out;
  },

  // Games — Rubik's cube: 3×3×3 of solid sub-cubes with 1-voxel gap
  games: () => {
    const out: Vox[] = [];
    const S = 3; // sub-cube size
    const G = 1; // gap
    const stride = S + G; // 4
    // center on origin: positions -stride, 0, +stride
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++) {
          const cx = i * stride;
          const cy = j * stride;
          const cz = k * stride;
          for (let x = -1; x <= 1; x++)
            for (let y = -1; y <= 1; y++)
              for (let z = -1; z <= 1; z++) {
                out.push([cx + x, cy + y, cz + z]);
              }
        }
    return out;
  },

  // Arts & Crafts — toolbox: shell + hinged lid + arc carry handle
  arts: () => {
    const out: Vox[] = [];
    // toolbox body shell (hollow box)
    for (let x = -5; x <= 5; x++)
      for (let y = -4; y <= 1; y++)
        for (let z = -3; z <= 3; z++) {
          const atEdge =
            +(x === -5 || x === 5) +
            +(y === -4) +
            +(z === -3 || z === 3);
          if (atEdge >= 1) out.push([x, y, z]);
        }
    // solid lid
    for (let x = -5; x <= 5; x++)
      for (let z = -3; z <= 3; z++) out.push([x, 1, z]);
    // arc handle on top
    for (let x = -4; x <= 4; x++) {
      const lift = Math.round(Math.cos((x / 4) * (Math.PI / 2)) * 2.5);
      out.push([x, 2 + lift, 0]);
      out.push([x, 2 + lift, -1]);
      out.push([x, 2 + lift, 1]);
    }
    // handle posts connecting to lid
    out.push([-4, 2, 0], [-4, 2, -1], [-4, 2, 1]);
    out.push([4, 2, 0], [4, 2, -1], [4, 2, 1]);
    // a few visible tools sticking out (a screwdriver shaft + hammer head bump)
    for (let y = 1; y <= 3; y++) out.push([-2, y, 2]); // screwdriver shaft
    out.push([-2, 4, 2]); // handle tip
    for (let x = 1; x <= 3; x++) out.push([x, 2, -2]); // hammer head peeking
    return out;
  },

  // Collecting — three stacked crates of different sizes
  collecting: () =>
    merge(
      box([-5, 5], [-5, -3], [-5, 5], true),
      box([-3, 3], [-2, 0], [-3, 3], true),
      box([-2, 2], [1, 3], [-2, 2], true)
    ),

  // Nature & Science — distinctive TREE: slim trunk + huge round canopy on top
  nature: () =>
    merge(
      box([-1, 1], [-6, 1], [-1, 1]),
      filledSphere(4, 0, 4, 0)
    ),

  // Technology & Making — gear with long teeth
  technology: () => {
    const disc = cylinderY(3, -1, 1);
    const teeth: Vox[] = [];
    const rOuter = 5;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      for (let r = 3; r <= rOuter; r++) {
        const tx = Math.round(Math.cos(a) * r);
        const tz = Math.round(Math.sin(a) * r);
        for (let y = -1; y <= 1; y++) teeth.push([tx, y, tz]);
      }
    }
    const hub = cylinderY(1, -2, 2);
    return merge(disc, teeth, hub);
  },

  // Mind & Spirit — tall flame teardrop (wide base, pointed tip)
  mind: () => {
    const out: Vox[] = [];
    for (let y = -5; y <= 5; y++) {
      const t = (y + 5) / 10; // 0 at bottom, 1 at top
      // wider near bottom-middle, tapers to point at top
      const r = Math.max(0.5, 3 * Math.sin(t * Math.PI) * (1 - t * 0.5));
      for (let x = -4; x <= 4; x++)
        for (let z = -4; z <= 4; z++) {
          if (Math.hypot(x, z) <= r) out.push([x, y, z]);
        }
    }
    return out;
  },

  // Music — acoustic guitar: body (two-stacked rounded lobes), neck, head
  music: () => {
    const out: Vox[] = [];
    // guitar body = figure-8: two circles of different radii
    const bodyCircle = (cy: number, r: number) => {
      for (let x = -r - 1; x <= r + 1; x++)
        for (let y = cy - r - 1; y <= cy + r + 1; y++)
          for (let z = -2; z <= 2; z++) {
            if (Math.hypot(x, y - cy) <= r) out.push([x, y, z]);
          }
    };
    bodyCircle(-4, 4);  // lower bout (larger)
    bodyCircle(1, 3);   // upper bout (smaller)
    // sound hole on front (z = 2) carved out
    const holeSet = new Set<string>();
    for (let x = -1; x <= 1; x++)
      for (let y = -3; y <= -1; y++)
        for (let z = 2; z >= 1; z--) {
          if (Math.hypot(x, y + 2) <= 1.3) holeSet.add(`${x},${y},${z}`);
        }
    // neck: long thin column going up
    for (let y = 4; y <= 10; y++)
      for (let x = -1; x <= 1; x++) out.push([x, y, 0], [x, y, 1]);
    // headstock: wider flat piece at top
    for (let y = 10; y <= 11; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = 0; z <= 1; z++) out.push([x, y, z]);
    return out.filter(([x, y, z]) => !holeSet.has(`${x},${y},${z}`));
  },

  // Writing — open book with flipping pages (animated via time t)
  writing: (t: number = 0) => {
    const out: Vox[] = [];
    // back cover
    for (let x = -7; x <= 7; x++)
      for (let z = -5; z <= 5; z++) out.push([x, -3, z]);
    // spine (raised middle ridge)
    for (let y = -3; y <= 2; y++)
      for (let z = -5; z <= 5; z++) out.push([0, y, z]);
    // pages: 6 flat sheets, each with a sinusoidal Y offset for flipping
    const pageCount = 6;
    for (let p = 0; p < pageCount; p++) {
      const phase = (p / pageCount) * Math.PI * 2;
      const lift = Math.sin(t * 2 + phase) * 1.5;
      const side = p < pageCount / 2 ? -1 : 1; // left or right page
      for (let x = side === -1 ? -7 : 1; x <= (side === -1 ? -1 : 7); x++)
        for (let z = -4; z <= 4; z++) {
          const curveY = Math.round(-2 + p * 0.3 + lift);
          out.push([x, curveY, z]);
        }
    }
    return out;
  },

  // Performance — Roman Colosseum: outer oval wall with arches on multiple tiers
  performance: () => {
    const out: Vox[] = [];
    const rx = 7, rz = 5; // oval radii
    // three tiers of arched wall
    for (let tier = 0; tier < 3; tier++) {
      const yBase = -3 + tier * 3;
      const yTop = yBase + 2;
      for (let x = -rx - 1; x <= rx + 1; x++)
        for (let z = -rz - 1; z <= rz + 1; z++) {
          const nx = x / rx;
          const nz = z / rz;
          const d = Math.hypot(nx, nz);
          // wall is a thin shell
          if (d > 1.0 || d < 0.82) continue;
          // cut arch openings periodically
          const angle = Math.atan2(z, x);
          const arches = 12;
          const phase = (angle + Math.PI) * (arches / (2 * Math.PI));
          const inArch =
            phase - Math.floor(phase) < 0.5 && (tier < 2 ? true : false);
          for (let y = yBase; y <= yTop; y++) {
            const relY = y - yBase;
            const isArchOpening = inArch && relY >= 0 && relY <= 1;
            if (isArchOpening) continue;
            out.push([x, y, z]);
          }
        }
    }
    // arena floor
    for (let x = -rx + 2; x <= rx - 2; x++)
      for (let z = -rz + 2; z <= rz - 2; z++) {
        const d = Math.hypot(x / (rx - 2), z / (rz - 2));
        if (d <= 1) out.push([x, -3, z]);
      }
    return out;
  },

  // Photography — accordion/bellows camera: lens + stepped tapered bellows + body
  photography: () => {
    const out: Vox[] = [];
    // body (back box)
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -5; z <= -2; z++) out.push([x, y, z]);
    // bellows: stepped rings getting smaller toward the lens
    for (let i = 0; i < 5; i++) {
      const z = -1 + i;
      const s = 3 - Math.floor(i / 2);
      // square ring (hollow)
      for (let x = -s; x <= s; x++)
        for (let y = -s; y <= s; y++) {
          const edge =
            +(x === -s || x === s) + +(y === -s || y === s);
          if (edge >= 1) out.push([x, y, z]);
        }
    }
    // lens cylinder at the very front
    for (let x = -2; x <= 2; x++)
      for (let y = -2; y <= 2; y++) {
        if (Math.hypot(x, y) > 2.3) continue;
        for (let z = 4; z <= 6; z++) out.push([x, y, z]);
      }
    // tripod bump under body
    for (let y = -5; y <= -3; y++) out.push([0, y, -4]);
    return out;
  },

  // Food & Drink — fork and knife side by side (crossed)
  food: () => {
    const out: Vox[] = [];
    // knife on +X side: blade (wide flat) + handle (narrow)
    const knifeX = 3;
    // blade
    for (let y = 1; y <= 5; y++)
      for (let dx = -1; dx <= 1; dx++) out.push([knifeX + dx, y, 0]);
    // pointed tip
    out.push([knifeX, 6, 0]);
    // handle
    for (let y = -5; y <= 0; y++)
      for (let dx = -1; dx <= 0; dx++) out.push([knifeX + dx, y, 0]);
    // fork on -X side
    const forkX = -3;
    // 3 tines
    for (let y = 4; y <= 6; y++) out.push([forkX - 2, y, 0]);
    for (let y = 4; y <= 6; y++) out.push([forkX, y, 0]);
    for (let y = 4; y <= 6; y++) out.push([forkX + 2, y, 0]);
    // fork base
    for (let y = 1; y <= 3; y++)
      for (let dx = -2; dx <= 2; dx++) out.push([forkX + dx, y, 0]);
    // fork handle
    for (let y = -5; y <= 0; y++)
      for (let dx = -1; dx <= 0; dx++) out.push([forkX + dx, y, 0]);
    return out;
  },
};

const KEYWORDS: Array<[RegExp, keyof typeof M]> = [
  [/^sports?\b|athletic|fitness|martial/i, "sports"],
  [/^games?\b|puzzl|board/i, "games"],
  [/arts?\s*&\s*crafts?|craft|paint|draw|fiber/i, "arts"],
  [/collect/i, "collecting"],
  [/nature|science|animal|garden|plant/i, "nature"],
  [/tech|making|automot|motor|engineer|tool/i, "technology"],
  [/mind|spirit|mystic|meditat|wellness/i, "mind"],
  [/music|audio|sound|dance/i, "music"],
  [/writ|literat|education|research|book/i, "writing"],
  [/perform|theat|stage|media|communic/i, "performance"],
  [/photo|camera|film/i, "photography"],
  [/food|drink|cook|beer|wine/i, "food"],
];

export function getVoxelModel(name: string): Vox[] {
  for (const [re, key] of KEYWORDS) if (re.test(name)) return M[key]();
  // fallback: a simple cube
  return M.games();
}
