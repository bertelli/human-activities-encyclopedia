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

  // Arts & Crafts — toolbox: solid box body + clean arc carry handle
  arts: () => {
    const out: Vox[] = [];
    // solid body
    for (let x = -6; x <= 6; x++)
      for (let y = -3; y <= 2; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    // subtle lid groove (missing voxels at lid line, z = ±3 only)
    const groove = new Set<string>();
    for (let x = -6; x <= 6; x++) {
      groove.add(`${x},1,3`);
      groove.add(`${x},1,-3`);
    }
    // clean thick arc handle (Y heights across X; 3 voxels deep in Z)
    const arc: Array<[number, number]> = [
      [-4, 3], [-3, 4], [-2, 5], [-1, 5],
      [0, 5], [1, 5], [2, 5], [3, 4], [4, 3],
    ];
    for (const [x, y] of arc)
      for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // latch bump on front
    for (let y = 0; y <= 1; y++)
      for (let x = -1; x <= 1; x++) out.push([x, y, 4]);
    return out.filter(([x, y, z]) => !groove.has(`${x},${y},${z}`));
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

// ──────────────────────────────────────────────────────────────
// Additional activity-level archetypes
// ──────────────────────────────────────────────────────────────
const EXTRA = {
  // Ball sports (soccer, basketball, volleyball, bowling)
  ball: () => filledSphere(6),

  // Racket (tennis, badminton, pickleball, squash)
  racket: () => {
    const out: Vox[] = [];
    // oval head in X-Y plane
    for (let x = -4; x <= 4; x++)
      for (let y = 0; y <= 8; y++)
        for (let z = -1; z <= 1; z++) {
          const d = Math.hypot(x / 4, (y - 4) / 4);
          if (d <= 1 && d >= 0.75) out.push([x, y, z]);
        }
      // strings
    for (let x = -3; x <= 3; x++)
      for (let y = 1; y <= 7; y++) {
        if ((x & 1) === 0 || (y & 1) === 0) out.push([x, y, 0]);
      }
    // handle
    for (let y = -7; y <= 0; y++)
      for (let x = -1; x <= 1; x++) out.push([x, y, 0]);
    return out;
  },

  // Bat / golf club / stick
  bat: () => {
    const out: Vox[] = [];
    for (let y = -7; y <= 7; y++) {
      const r = y < -2 ? 1 : 1 + Math.floor((y + 2) / 3);
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(x, z) <= r) out.push([x, y, z]);
        }
    }
    return out;
  },

  // Bicycle wheel / rim with spokes
  wheel: () => {
    const out: Vox[] = [];
    const R = 7;
    // rim (torus cross-section)
    for (let x = -R - 1; x <= R + 1; x++)
      for (let y = -R - 1; y <= R + 1; y++) {
        const d = Math.hypot(x, y);
        if (d > R + 0.5 || d < R - 1) continue;
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
      }
    // spokes
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      for (let r = 1; r < R - 1; r++) {
        const sx = Math.round(Math.cos(a) * r);
        const sy = Math.round(Math.sin(a) * r);
        out.push([sx, sy, 0]);
      }
    }
    // hub
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    return out;
  },

  // Arrow + bow (archery)
  bow: () => {
    const out: Vox[] = [];
    // curved bow (arc)
    for (let y = -7; y <= 7; y++) {
      const xs = Math.round(Math.sqrt(Math.max(0, 50 - y * y)) - 4);
      for (let x = xs; x <= xs + 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    }
    // string
    for (let y = -7; y <= 7; y++) out.push([-4, y, 0]);
    // arrow shaft
    for (let x = -3; x <= 6; x++) out.push([x, 0, 0]);
    // arrowhead
    out.push([7, 0, 0], [7, 1, 0], [7, -1, 0]);
    // fletching
    out.push([-3, 1, 0], [-3, -1, 0], [-4, 2, 0], [-4, -2, 0]);
    return out;
  },

  // Chess king/rook silhouette
  chessPiece: () => {
    const out: Vox[] = [];
    // base
    for (let y = -5; y <= -3; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) <= 3) out.push([x, y, z]);
        }
    // body taper
    for (let y = -2; y <= 2; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) <= 2) out.push([x, y, z]);
        }
    // neck
    for (let y = 3; y <= 5; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) <= 3) out.push([x, y, z]);
        }
    // crown battlements
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2;
      const bx = Math.round(Math.cos(a) * 3);
      const bz = Math.round(Math.sin(a) * 3);
      out.push([bx, 6, bz], [bx, 7, bz]);
    }
    return out;
  },

  // Game controller (gaming)
  controller: () => {
    const out: Vox[] = [];
    // body: wide oval
    for (let x = -6; x <= 6; x++)
      for (let y = -3; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x / 6, y / 3) > 1) continue;
          out.push([x, y, z]);
        }
    // d-pad (+ cross)
    for (let i = -1; i <= 1; i++) {
      out.push([-4 + i, 1, 3]);
      out.push([-4, 1 + i, 3]);
    }
    // buttons on right
    out.push([3, 2, 3], [5, 2, 3], [4, 1, 3], [4, 3, 3]);
    return out;
  },

  // Pencil (drawing, writing subcategories)
  pencil: () => {
    const out: Vox[] = [];
    // shaft (hexagonal-ish prism)
    for (let y = -4; y <= 6; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // eraser (bottom)
    for (let y = -6; y <= -5; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // ferrule (metal band)
    for (let x = -1; x <= 1; x++)
      for (let z = -1; z <= 1; z++) out.push([x, -4.5 | 0, z]);
    // wooden tip (cone)
    for (let i = 0; i < 3; i++) {
      const r = 1 - i * 0.4;
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > r) continue;
          out.push([x, 7 + i, z]);
        }
    }
    // point
    out.push([0, 10, 0]);
    return out;
  },

  // Vase / pottery
  vase: () => {
    const out: Vox[] = [];
    for (let y = -5; y <= 6; y++) {
      const t = (y + 5) / 11;
      const r = 2 + 2 * Math.sin(t * Math.PI * 1.2);
      for (let x = -4; x <= 4; x++)
        for (let z = -4; z <= 4; z++) {
          const d = Math.hypot(x, z);
          if (d > r + 0.3 || d < r - 0.8) continue;
          out.push([x, y, z]);
        }
    }
    return out;
  },

  // Yarn ball with needles (knitting/crochet)
  yarnBall: () => {
    const out: Vox[] = [];
    // ball
    for (let x = -4; x <= 4; x++)
      for (let y = -4; y <= 4; y++)
        for (let z = -4; z <= 4; z++) {
          const d = Math.hypot(x, y, z);
          if (d > 4 || d < 3.2) continue;
          out.push([x, y, z]);
        }
    // filled interior
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -3; z <= 3; z++)
          if (Math.hypot(x, y, z) <= 3) out.push([x, y, z]);
    // two needles sticking out diagonally
    for (let t = 0; t < 7; t++) {
      out.push([3 + t, 3 + t, 0]);
      out.push([-3 - t, 3 + t, 0]);
    }
    return out;
  },

  // Piano keyboard
  piano: () => {
    const out: Vox[] = [];
    // white keys: 10 wide
    for (let i = 0; i < 10; i++)
      for (let y = -2; y <= 0; y++)
        for (let z = -3; z <= 3; z++) out.push([-5 + i, y, z]);
    // black keys on top (5 black keys for 7 whites, pattern 2-3-2)
    const blackX = [-4, -3, -1, 0, 1];
    for (const bx of blackX)
      for (let z = -3; z <= 0; z++) out.push([bx, 1, z]);
    // body below
    for (let x = -5; x <= 4; x++)
      for (let y = -4; y <= -3; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    return out;
  },

  // Cooking pot
  pot: () => {
    const out: Vox[] = [];
    // body (cylinder hollow)
    for (let y = -3; y <= 2; y++)
      for (let x = -5; x <= 5; x++)
        for (let z = -5; z <= 5; z++) {
          const d = Math.hypot(x, z);
          if (d > 5 || d < 4) continue;
          out.push([x, y, z]);
        }
    // floor
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) <= 5) out.push([x, -3, z]);
      }
    // handles
    for (let y = 0; y <= 2; y++) {
      out.push([6, y, 0]);
      out.push([-6, y, 0]);
    }
    out.push([7, 1, 0], [-7, 1, 0]);
    // lid dome
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        const d = Math.hypot(x, z);
        if (d > 5) continue;
        const h = Math.round(Math.sqrt(Math.max(0, 25 - d * d)) * 0.5);
        out.push([x, 3 + h, z]);
      }
    // lid knob
    out.push([0, 6, 0], [0, 7, 0]);
    return out;
  },

  // Tent (camping)
  tent: () => {
    const out: Vox[] = [];
    for (let y = -4; y <= 4; y++) {
      const r = 5 - y;
      if (r <= 0) break;
      for (let x = -r; x <= r; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.abs(x) === r || y === -4) out.push([x, y, z]);
        }
    }
    // door flap
    for (let y = -4; y <= 0; y++) out.push([0, y, 2]);
    return out;
  },

  // Backpack (hiking)
  backpack: () => {
    const out: Vox[] = [];
    // main body (rounded rect)
    for (let x = -3; x <= 3; x++)
      for (let y = -5; y <= 5; y++)
        for (let z = -2; z <= 2; z++) {
          const corner =
            (Math.abs(x) > 2 && Math.abs(y) > 4) ||
            (Math.abs(x) > 2 && (y < -4.5 || y > 4.5));
          if (corner) continue;
          out.push([x, y, z]);
        }
    // top handle
    for (let x = -1; x <= 1; x++) out.push([x, 6, 0]);
    out.push([-1, 7, 0], [1, 7, 0]);
    // straps
    for (let y = -5; y <= 5; y++) {
      out.push([-3, y, 3]);
      out.push([3, y, 3]);
    }
    // front pocket detail
    for (let x = -2; x <= 2; x++)
      for (let y = -3; y <= -1; y++) out.push([x, y, 3]);
    return out;
  },

  // Telescope (astronomy)
  telescope: () => {
    const out: Vox[] = [];
    // barrel (long cylinder)
    for (let y = -2; y <= 8; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2) continue;
          out.push([x, y, z]);
        }
    // eyepiece (narrower extension)
    for (let y = 9; y <= 11; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // tripod legs (3 diagonal supports)
    for (let t = 0; t < 6; t++) {
      out.push([3 + t, -3 - t, 0]);
      out.push([-3 - t, -3 - t, 0]);
      out.push([0, -3 - t, 3 + t]);
    }
    // mount cross
    for (let x = -2; x <= 2; x++) out.push([x, -3, 0]);
    return out;
  },

  // Fishing rod
  fishing: () => {
    const out: Vox[] = [];
    // rod (diagonal thin)
    for (let t = -6; t <= 8; t++) {
      out.push([t, t * 0.6 | 0, 0]);
    }
    // reel (small disc)
    for (let x = -4; x <= -2; x++)
      for (let y = -4; y <= -2; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x + 3, y + 3) > 1.5) continue;
          out.push([x, y, z]);
        }
    // line dropping down
    for (let y = 5; y >= -6; y--) out.push([9, y, 0]);
    // hook
    out.push([9, -7, 0], [10, -7, 0], [10, -6, 0]);
    return out;
  },

  // Fist / glove (martial arts, boxing)
  fist: () => {
    const out: Vox[] = [];
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, y, z) <= 3.5) out.push([x, y, z]);
        }
    // knuckle bumps
    for (let x = -2; x <= 2; x += 2) out.push([x, 3, 3]);
    // wrist
    for (let y = -6; y <= -3; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) <= 2.3) out.push([x, y, z]);
        }
    return out;
  },

  // Meditation stones (stacked stack of flat stones)
  stones: () => {
    const out: Vox[] = [];
    const stones: Array<[number, number]> = [
      [5, -5], [4, -3], [3, -1], [4, 1], [3, 3], [2, 5],
    ];
    for (const [r, y] of stones) {
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(x, z) > r) continue;
          out.push([x, y, z]);
          out.push([x, y - 1, z]);
        }
    }
    return out;
  },

  // Plant in pot (gardening)
  plant: () => {
    const out: Vox[] = [];
    // pot (trapezoid)
    for (let y = -5; y <= -2; y++) {
      const r = 4 - Math.abs(y + 3) * 0;
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(x, z) <= r) out.push([x, y, z]);
        }
    }
    // leaves (several curved arcs coming out)
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      for (let r = 1; r <= 5; r++) {
        const sx = Math.round(Math.cos(a) * r * 0.5);
        const sz = Math.round(Math.sin(a) * r * 0.5);
        const sy = r;
        out.push([sx, sy - 1, sz]);
      }
    }
    // central stem
    for (let y = -2; y <= 5; y++) out.push([0, y, 0]);
    return out;
  },

  // Binoculars (birdwatching)
  binoculars: () => {
    const out: Vox[] = [];
    // two parallel cylinders
    for (const cx of [-3, 3]) {
      for (let y = -3; y <= 3; y++)
        for (let x = -2; x <= 2; x++)
          for (let z = -2; z <= 2; z++) {
            if (Math.hypot(x, z) > 2) continue;
            out.push([cx + x, y, z]);
          }
    }
    // bridge connecting them
    for (let x = -3; x <= 3; x++)
      for (let y = 0; y <= 1; y++) out.push([x, y, 0]);
    return out;
  },

  // Skis — pair of parallel planks with upturned tips + poles
  skis: () => {
    const out: Vox[] = [];
    for (const z of [-3, 2]) {
      for (let x = -8; x <= 8; x++) {
        // upward-curved tip at +X end
        const y = x >= 6 ? Math.round((x - 6) * 1.2) : 0;
        for (let zw = 0; zw <= 1; zw++) out.push([x, y, z + zw]);
      }
      // binding (raised block in middle)
      for (let y = 1; y <= 2; y++)
        for (let x = -1; x <= 1; x++)
          for (let zw = 0; zw <= 1; zw++) out.push([x, y, z + zw]);
    }
    // ski poles (two vertical sticks)
    for (const z of [-5, 5]) {
      for (let y = -2; y <= 7; y++) out.push([2, y, z]);
      // pole grips on top
      for (let x = 1; x <= 3; x++) out.push([x, 7, z]);
      // basket at bottom
      for (let x = 1; x <= 3; x++) out.push([x, -2, z]);
    }
    return out;
  },

  // Axe — long handle + wedge-shaped head
  axe: () => {
    const out: Vox[] = [];
    // handle (long vertical shaft)
    for (let y = -8; y <= 5; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // axe head (wedge-shaped, wider at cutting edge)
    for (let y = 3; y <= 7; y++) {
      const spread = 5 - Math.abs(y - 5); // widest at y=5
      for (let z = -spread; z <= spread; z++)
        for (let x = -1; x <= 2; x++) out.push([x, y, z]);
    }
    // cutting edge (sharper back)
    for (let y = 4; y <= 6; y++)
      for (let z = -6; z <= 6; z++) {
        const taper = Math.abs(y - 5);
        if (Math.abs(z) > 6 - taper) continue;
        out.push([3, y, z]);
      }
    // handle grip (thicker bottom)
    for (let y = -8; y <= -6; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z * 1.5) > 2) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Rifle / gun (airsoft, paintball, shooting, hunting)
  gun: () => {
    const out: Vox[] = [];
    // barrel
    for (let x = -3; x <= 8; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // receiver body
    for (let x = -4; x <= 2; x++)
      for (let y = -2; y <= 1; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // grip
    for (let y = -6; y <= -2; y++)
      for (let x = -2; x <= 0; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // stock
    for (let x = -7; x <= -4; x++)
      for (let y = -3; y <= 1; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // scope on top
    for (let x = -1; x <= 2; x++)
      for (let y = 2; y <= 3; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // front sight bump
    out.push([6, 2, 0], [7, 2, 0]);
    return out;
  },

  // Yoga mat — rolled up cylinder on one end, unrolled section
  mat: () => {
    const out: Vox[] = [];
    // rolled-up portion on +X end (hollow cylinder, axis along Y)
    for (let y = -3; y <= 3; y++)
      for (let x = 3; x <= 7; x++)
        for (let z = -3; z <= 3; z++) {
          const d = Math.hypot(x - 5, z);
          if (d > 2.3 || d < 1.3) continue;
          out.push([x, y, z]);
        }
    // unrolled flat section extending in -X
    for (let y = -3; y <= 3; y++)
      for (let x = -8; x <= 3; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // tie strap around the roll
    for (let z = -3; z <= 3; z++) {
      const d = Math.hypot(0, z);
      if (d > 2.5 || d < 1.5) continue;
      for (let x = 5; x <= 5; x++) out.push([x, 0, z]);
    }
    return out;
  },

  // Running shoe / sneaker
  shoe: () => {
    const out: Vox[] = [];
    // sole (flat extended base)
    for (let x = -7; x <= 5; x++)
      for (let z = -2; z <= 2; z++) {
        if (x >= 4 && Math.abs(z) > 1) continue; // taper toe
        out.push([x, -2, z]);
        out.push([x, -3, z]);
      }
    // upper (rounded body)
    for (let x = -6; x <= 3; x++)
      for (let y = -1; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          const yLim = x > 1 ? 1 : x < -5 ? 2 : 3;
          if (y > yLim) continue;
          out.push([x, y, z]);
        }
    // ankle cut (heel higher)
    for (let x = -7; x <= -5; x++)
      for (let y = 3; y <= 5; y++)
        for (let z = -2; z <= 2; z++) {
          if (y > 5 - (x + 7)) continue;
          out.push([x, y, z]);
        }
    // laces (stripes on top)
    for (const xLace of [-4, -2, 0]) {
      for (let z = -2; z <= 2; z++) out.push([xLace, 3, z]);
    }
    return out;
  },

  // Dart
  dart: () => {
    const out: Vox[] = [];
    // shaft
    for (let x = -5; x <= 4; x++) out.push([x, 0, 0]);
    // flights (cross fins at back)
    for (let dx = -5; dx <= -3; dx++) {
      for (let d = 1; d <= 3; d++) {
        out.push([dx, d, 0]);
        out.push([dx, -d, 0]);
        out.push([dx, 0, d]);
        out.push([dx, 0, -d]);
      }
    }
    // barrel (thicker middle)
    for (let x = -2; x <= 2; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // tip
    out.push([5, 0, 0], [6, 0, 0], [7, 0, 0]);
    return out;
  },

  // Microphone on a small stand
  microphone: () => {
    const out: Vox[] = [];
    // head (capsule/grille)
    for (let x = -2; x <= 2; x++)
      for (let y = 2; y <= 7; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2.3) continue;
          out.push([x, y, z]);
        }
    // grille stripes
    for (let y = 3; y <= 6; y += 2)
      for (let x = -3; x <= 3; x++)
        if (x === -3 || x === 3) out.push([x, y, 0]);
    // handle body
    for (let x = -1; x <= 1; x++)
      for (let y = -5; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // base (round plate)
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++)
        if (Math.hypot(x, z) <= 3) out.push([x, -6, z]);
    return out;
  },

  // Parachute (open canopy + strings + person)
  parachute: () => {
    const out: Vox[] = [];
    // canopy dome (half-sphere top)
    for (let x = -6; x <= 6; x++)
      for (let z = -6; z <= 6; z++) {
        const d = Math.hypot(x, z);
        if (d > 6) continue;
        const y = Math.round(Math.sqrt(36 - d * d) * 0.6) + 3;
        out.push([x, y, z]);
        if (d > 5) out.push([x, y - 1, z]);
      }
    // suspension lines (diagonal strings from canopy edge to person)
    const anchors: Array<[number, number]> = [
      [-6, 0], [6, 0], [0, -6], [0, 6],
      [-4, 4], [4, 4], [-4, -4], [4, -4],
    ];
    for (const [ax, az] of anchors) {
      for (let t = 0; t < 8; t++) {
        const f = t / 7;
        const x = Math.round(ax * (1 - f));
        const z = Math.round(az * (1 - f));
        const y = Math.round(3 - f * 7);
        out.push([x, y, z]);
      }
    }
    // person (small figure below)
    for (let y = -6; y <= -4; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    return out;
  },

  // Sword (LARPing, fencing)
  sword: () => {
    const out: Vox[] = [];
    // blade
    for (let y = -1; y <= 8; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.abs(x) + Math.abs(z) > 1) continue;
          out.push([x, y, z]);
        }
    // tip point
    out.push([0, 9, 0], [0, 10, 0]);
    // crossguard
    for (let x = -4; x <= 4; x++)
      for (let z = -1; z <= 1; z++)
        out.push([x, -2, z]);
    // grip
    for (let y = -6; y <= -3; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1.3) continue;
          out.push([x, y, z]);
        }
    // pommel (round knob)
    for (let x = -2; x <= 2; x++)
      for (let y = -8; y <= -6; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, y + 7, z) > 2) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Tabletop die (D20 icosahedron approximation)
  dice: () => {
    const out: Vox[] = [];
    // approximate D20 as octahedron-ish (two pyramids)
    for (let y = -4; y <= 4; y++) {
      const r = 4 - Math.abs(y);
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.abs(x) + Math.abs(z) > r) continue;
          out.push([x, y, z]);
        }
    }
    return out;
  },

  // Candle (lit)
  candle: () => {
    const out: Vox[] = [];
    // body (cylinder)
    for (let y = -5; y <= 2; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2) continue;
          out.push([x, y, z]);
        }
    // wick
    for (let y = 3; y <= 5; y++) out.push([0, y, 0]);
    // flame teardrop
    for (let y = 5; y <= 9; y++) {
      const r = Math.max(0.5, 1.8 * Math.sin(((y - 5) / 4) * Math.PI));
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) <= r) out.push([x, y, z]);
        }
    }
    // holder base plate
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++)
        if (Math.hypot(x, z) <= 3) out.push([x, -6, z]);
    return out;
  },

  // Sailboat (sailing)
  sailboat: () => {
    const out: Vox[] = [];
    // hull (boat body)
    for (let x = -6; x <= 6; x++) {
      const halfY = x === -6 || x === 6 ? 0 : Math.abs(x) >= 5 ? 1 : 2;
      for (let y = -2; y <= -2 + halfY; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.abs(z) > 3 - Math.max(0, Math.abs(x) - 3)) continue;
          out.push([x, y, z]);
        }
    }
    // mast
    for (let y = -1; y <= 9; y++) out.push([0, y, 0]);
    // triangular main sail (biggest)
    for (let y = 0; y <= 8; y++)
      for (let x = 1; x <= 8 - y; x++) out.push([x, y, 0]);
    // jib (smaller front sail)
    for (let y = 0; y <= 6; y++)
      for (let x = -1; x >= -(6 - y); x--) out.push([x, y, 0]);
    return out;
  },

  // Paddle / kayak paddle (double-bladed)
  paddle: () => {
    const out: Vox[] = [];
    // shaft
    for (let x = -8; x <= 8; x++) out.push([x, 0, 0]);
    // blade on +X end
    for (let x = 6; x <= 11; x++) {
      const spread = 3 - Math.abs(x - 8);
      for (let y = -spread; y <= spread; y++) out.push([x, y, 0]);
    }
    // blade on -X end
    for (let x = -11; x <= -6; x++) {
      const spread = 3 - Math.abs(x + 8);
      for (let y = -spread; y <= spread; y++) out.push([x, y, 0]);
    }
    return out;
  },

  // Beer/wine bottle
  bottle: () => {
    const out: Vox[] = [];
    // body (cylinder)
    for (let y = -6; y <= 1; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2.3) continue;
          out.push([x, y, z]);
        }
    // shoulder
    for (let y = 1; y <= 3; y++) {
      const r = 2.3 - (y - 1) * 0.7;
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > r) continue;
          out.push([x, y, z]);
        }
    }
    // neck
    for (let y = 4; y <= 7; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1) continue;
          out.push([x, y, z]);
        }
    // cap
    for (let y = 8; y <= 9; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    return out;
  },

  // Climbing — harness loop + carabiner + coiled rope
  climbing: () => {
    const out: Vox[] = [];
    // carabiner (oval ring)
    for (let y = -2; y <= 6; y++)
      for (let x = -3; x <= 3; x++) {
        const d = Math.hypot(x / 2.8, (y - 2) / 4);
        if (d <= 1 && d >= 0.6) for (let z = -1; z <= 1; z++) out.push([x, y, z]);
      }
    // gate (diagonal cut on one side)
    out.push([2, 3, 0], [3, 2, 0]);
    // rope coil below (stacked rings)
    for (let ring = 0; ring < 3; ring++) {
      const yR = -5 - ring;
      for (let a = 0; a < 16; a++) {
        const ang = (a / 16) * Math.PI * 2;
        const cx = Math.round(Math.cos(ang) * 4);
        const cz = Math.round(Math.sin(ang) * 4);
        out.push([cx, yR, cz]);
      }
    }
    return out;
  },

  // Swimming — swim goggles
  goggles: () => {
    const out: Vox[] = [];
    // two eye cups (rings)
    const cup = (cx: number) => {
      for (let x = -3; x <= 3; x++)
        for (let y = -3; y <= 3; y++) {
          const d = Math.hypot(x, y);
          if (d > 3 || d < 1.8) continue;
          for (let z = -1; z <= 1; z++) out.push([x + cx, y, z]);
        }
      // lens glass (thin disc)
      for (let x = -2; x <= 2; x++)
        for (let y = -2; y <= 2; y++) {
          if (Math.hypot(x, y) <= 2) out.push([x + cx, y, 1]);
        }
    };
    cup(-4);
    cup(4);
    // nose bridge
    for (let x = -1; x <= 1; x++) out.push([x, 0, 0]);
    // strap wings
    for (let x = 7; x <= 9; x++) out.push([x, 0, -1], [x, 1, -1], [x, -1, -1]);
    for (let x = -9; x <= -7; x++) out.push([x, 0, -1], [x, 1, -1], [x, -1, -1]);
    return out;
  },

  // Snowboard — board with bindings and stance angle
  snowboard: () => {
    const out: Vox[] = [];
    // deck (rounded rectangle, lying flat)
    for (let x = -10; x <= 10; x++)
      for (let z = -3; z <= 3; z++) {
        const end = Math.abs(x) > 8 ? Math.abs(x) - 8 : 0;
        if (Math.abs(z) + end * 0.7 > 3) continue;
        out.push([x, -2, z]);
        out.push([x, -1, z]);
      }
    // bindings (two raised rectangles)
    const binding = (cx: number) => {
      for (let x = cx - 2; x <= cx + 2; x++)
        for (let z = -2; z <= 2; z++) {
          const edge = Math.abs(x - cx) === 2 || Math.abs(z) === 2;
          if (edge) out.push([x, 0, z]);
        }
      // boot bump
      for (let x = cx - 1; x <= cx + 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, 1, z]);
    };
    binding(-5);
    binding(5);
    return out;
  },

  // Soccer ball — hex/pent pattern sphere (dimpled)
  soccerBall: () => {
    const out: Vox[] = [];
    const R = 6;
    for (let x = -R; x <= R; x++)
      for (let y = -R; y <= R; y++)
        for (let z = -R; z <= R; z++) {
          const d = Math.hypot(x, y, z);
          if (d > R + 0.3 || d < R - 1.5) continue;
          // dimple pattern: skip voxels at "pentagon centers"
          const skip =
            (Math.abs(x) === 3 && Math.abs(y) === 3) ||
            (Math.abs(y) === 3 && Math.abs(z) === 3) ||
            (Math.abs(x) === 3 && Math.abs(z) === 3);
          if (skip) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Basketball — sphere with seam lines (curves crossing over)
  basketball: () => {
    const out: Vox[] = [];
    const R = 6;
    for (let x = -R; x <= R; x++)
      for (let y = -R; y <= R; y++)
        for (let z = -R; z <= R; z++) {
          const d = Math.hypot(x, y, z);
          if (d > R + 0.3 || d < R - 1.5) continue;
          // carve seam lines: great circle on XZ plane (y~0) and two curved seams
          const onSeamY = Math.abs(y) <= 0;
          const onSeamCurveA = Math.abs(x - y * 0.3) <= 0 && z > 0;
          const onSeamCurveB = Math.abs(x + y * 0.3) <= 0 && z > 0;
          if (onSeamY || onSeamCurveA || onSeamCurveB) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Golf — club with ball on tee
  golfClub: () => {
    const out: Vox[] = [];
    // shaft (long diagonal)
    for (let i = 0; i <= 12; i++) {
      const x = -4 + Math.round(i * 0.4);
      const y = 7 - i;
      out.push([x, y, 0], [x, y, 1]);
    }
    // club head (wedge at bottom)
    for (let x = 0; x <= 4; x++)
      for (let y = -6; y <= -4; y++)
        for (let z = -1; z <= 2; z++) out.push([x, y, z]);
    // ball on tee
    for (let x = -6; x <= -4; x++)
      for (let y = -5; y <= -3; y++)
        for (let z = -2; z <= 0; z++) {
          if (Math.hypot(x + 5, y + 4, z + 1) <= 1.3) out.push([x, y, z]);
        }
    // tee peg
    out.push([-5, -6, -1], [-5, -7, -1]);
    return out;
  },

  // Cricket — wicket stumps + bails
  wicket: () => {
    const out: Vox[] = [];
    // three vertical stumps
    for (const cx of [-3, 0, 3])
      for (let y = -6; y <= 5; y++) out.push([cx, y, 0]);
    // two bails resting on top
    for (let x = -3; x <= 0; x++) out.push([x, 6, 0]);
    for (let x = 0; x <= 3; x++) out.push([x, 6, 0]);
    // base line
    for (let x = -5; x <= 5; x++) out.push([x, -7, 0]);
    return out;
  },

  // Hockey stick + puck
  hockeyStick: () => {
    const out: Vox[] = [];
    // long shaft (diagonal)
    for (let i = 0; i < 14; i++) {
      const x = -6 + i;
      const y = 6 - i;
      out.push([x, y, 0], [x, y, 1]);
    }
    // blade at the bottom (horizontal extension)
    for (let x = 7; x <= 10; x++)
      for (let z = 0; z <= 1; z++) out.push([x, -7, z], [x, -6, z]);
    // puck (short cylinder lying flat near blade)
    for (let x = -7; x <= -4; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x + 5.5, z) > 2) continue;
        out.push([x, -7, z]);
      }
    return out;
  },

  // Coffee cup on saucer
  coffeeCup: () => {
    const out: Vox[] = [];
    // saucer (flat disc)
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) <= 5) out.push([x, -5, z]);
      }
    // cup body (short cylinder, hollow top)
    for (let y = -4; y <= 2; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          const d = Math.hypot(x, z);
          if (d > 3) continue;
          const isRim = y === 2;
          const isInside = d < 2.2 && y > -3;
          if (isInside && !isRim) continue;
          out.push([x, y, z]);
        }
    // handle (C-shape on +X)
    for (let y = -2; y <= 1; y++) out.push([4, y, 0]);
    out.push([5, -1, 0], [5, 0, 0]);
    // steam curl
    out.push([0, 4, 0], [1, 5, 0], [0, 6, 0], [-1, 7, 0], [0, 8, 0]);
    return out;
  },

  // Teapot — round body + spout + handle + lid knob
  teapot: () => {
    const out: Vox[] = [];
    // round body
    for (let x = -4; x <= 4; x++)
      for (let y = -4; y <= 2; y++)
        for (let z = -4; z <= 4; z++) {
          const d = Math.hypot(x, y * 0.9, z);
          if (d <= 4) out.push([x, y, z]);
        }
    // spout (tapered tube going out-up on +X)
    const spout: Array<[number, number]> = [
      [4, -1], [5, 0], [6, 1], [7, 2], [7, 3],
    ];
    for (const [sx, sy] of spout)
      for (let z = -1; z <= 1; z++) out.push([sx, sy, z]);
    // handle (arc on -X)
    for (const [hx, hy] of [[-4, -1] as [number, number], [-5, 0], [-5, 1], [-5, 2], [-4, 2]])
      for (let z = -1; z <= 1; z++) out.push([hx, hy, z]);
    // lid (flat disc on top)
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) <= 3) out.push([x, 3, z]);
      }
    // lid knob
    out.push([0, 4, 0], [0, 5, 0]);
    return out;
  },

  // Bread — rounded loaf with diagonal scoring
  bread: () => {
    const out: Vox[] = [];
    for (let x = -7; x <= 7; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -3; z <= 3; z++) {
          // oval cross-section, long in X
          const d = Math.hypot(y / 3, z / 3);
          if (d > 1) continue;
          // taper ends
          const taper = Math.abs(x) > 5 ? (Math.abs(x) - 5) * 0.4 : 0;
          if (d + taper > 1) continue;
          out.push([x, y, z]);
        }
    // diagonal score marks on top (skip voxels at top to form lines)
    const skip = new Set<string>();
    for (let i = -3; i <= 3; i += 2) {
      for (let o = -1; o <= 1; o++) {
        skip.add(`${i + o},3,${o}`);
        skip.add(`${i + o - 1},3,${o}`);
      }
    }
    return out.filter(([x, y, z]) => !skip.has(`${x},${y},${z}`));
  },

  // Sewing machine — classic L-shape arm + needle + base
  sewingMachine: () => {
    const out: Vox[] = [];
    // base
    for (let x = -6; x <= 6; x++)
      for (let z = -3; z <= 3; z++)
        for (let y = -5; y <= -3; y++) out.push([x, y, z]);
    // upright column on -X side
    for (let x = -6; x <= -4; x++)
      for (let y = -3; y <= 4; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // horizontal arm extending +X
    for (let x = -4; x <= 5; x++)
      for (let y = 3; y <= 5; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // needle head (down from arm)
    for (let y = -2; y <= 2; y++) out.push([4, y, 0]);
    // handwheel on -X column
    for (let y = -1; y <= 3; y++)
      for (let z = 3; z <= 4; z++) {
        if (Math.hypot(y - 1, z - 3.5) <= 2) out.push([-5, y, z]);
      }
    return out;
  },

  // 3D printer — gantry frame with bed and extruder
  printer3D: () => {
    const out: Vox[] = [];
    // bed (flat platform)
    for (let x = -5; x <= 5; x++)
      for (let z = -4; z <= 4; z++) out.push([x, -4, z], [x, -3, z]);
    // four vertical rails at corners
    for (const [cx, cz] of [[-5, -4], [5, -4], [-5, 4], [5, 4]] as Array<[number, number]>)
      for (let y = -2; y <= 7; y++) out.push([cx, y, cz]);
    // top gantry beam (X axis)
    for (let x = -5; x <= 5; x++)
      for (let z = -4; z <= 4; z += 8) out.push([x, 7, z]);
    // extruder carriage (hanging box)
    for (let x = -1; x <= 1; x++)
      for (let y = 3; y <= 6; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // nozzle tip
    out.push([0, 2, 0], [0, 1, 0]);
    // small printed cube on bed
    for (let x = -1; x <= 1; x++)
      for (let y = -2; y <= 0; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    return out;
  },

  // Car — side profile chassis
  car: () => {
    const out: Vox[] = [];
    // body (lower box)
    for (let x = -7; x <= 7; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    // cabin (upper, narrower, centered)
    for (let x = -4; x <= 3; x++)
      for (let y = 2; y <= 4; y++)
        for (let z = -2; z <= 2; z++) {
          // taper the front of the cabin
          if (x >= 2 && y === 4) continue;
          out.push([x, y, z]);
        }
    // wheels (two discs at each end, on X axis)
    const wheel = (cx: number) => {
      for (let y = -4; y <= -1; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(y + 2.5, z) > 2.2) continue;
          for (let x = cx - 1; x <= cx + 1; x++) out.push([x, y, z]);
        }
    };
    wheel(-5);
    wheel(5);
    // headlight bump
    out.push([7, 0, 2], [7, 0, -2]);
    return out;
  },

  // Volleyball — lighter sphere with different seam pattern
  volleyball: () => {
    const out: Vox[] = [];
    const R = 6;
    for (let x = -R; x <= R; x++)
      for (let y = -R; y <= R; y++)
        for (let z = -R; z <= R; z++) {
          const d = Math.hypot(x, y, z);
          if (d > R + 0.3 || d < R - 1.5) continue;
          // horizontal and two angled seams
          const sa = Math.abs(y) <= 0;
          const sb = Math.abs(x - z * 0.7) <= 0 && y > 0;
          const sc = Math.abs(x + z * 0.7) <= 0 && y < 0;
          if (sa || sb || sc) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Rugby / American football — prolate spheroid (pointed ball)
  rugbyBall: () => {
    const out: Vox[] = [];
    for (let x = -8; x <= 8; x++)
      for (let y = -4; y <= 4; y++)
        for (let z = -4; z <= 4; z++) {
          const d = Math.hypot(x / 2.2, y, z);
          if (d <= 3.2) out.push([x, y, z]);
        }
    // lace stitching on top
    for (let x = -3; x <= 3; x += 2) out.push([x, 4, 0]);
    return out;
  },

  // Lacrosse / field hockey stick with small ball
  lacrosseStick: () => {
    const out: Vox[] = [];
    // shaft
    for (let i = 0; i < 14; i++) {
      const x = -6 + i;
      const y = 5 - i;
      out.push([x, y, 0]);
    }
    // mesh head at top
    for (let x = -8; x <= -6; x++)
      for (let y = 4; y <= 8; y++) out.push([x, y, 0]);
    // ball (small sphere near head)
    for (let x = -7; x <= -5; x++)
      for (let y = 5; y <= 7; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x + 6, y - 6, z) <= 1.2) out.push([x, y, z]);
        }
    return out;
  },

  // Surfboard — pointed teardrop lying flat
  surfboard: () => {
    const out: Vox[] = [];
    for (let x = -9; x <= 9; x++) {
      const n = (x + 9) / 18;
      const r = 3 * Math.sin(n * Math.PI) ** 0.6;
      for (let z = -Math.ceil(r); z <= Math.ceil(r); z++) {
        if (Math.abs(z) > r) continue;
        for (let y = -1; y <= 0; y++) out.push([x, y, z]);
      }
    }
    // fin on bottom
    for (let y = -3; y <= -2; y++) out.push([-6, y, 0]);
    return out;
  },

  // Ice skate — blade with curved boot
  iceSkate: () => {
    const out: Vox[] = [];
    // boot body
    for (let x = -3; x <= 3; x++)
      for (let y = 0; y <= 5; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // toe curl
    for (let y = 0; y <= 2; y++) out.push([4, y, 0], [4, y, 1], [4, y, -1]);
    // blade (thin strip below, with slight curve)
    for (let x = -5; x <= 5; x++) {
      const yBlade = -2 + (Math.abs(x) > 3 ? 1 : 0);
      out.push([x, yBlade, 0]);
      out.push([x, yBlade - 1, 0]);
    }
    // blade supports
    out.push([-3, -1, 0], [3, -1, 0]);
    return out;
  },

  // Curling stone — squat cylinder with handle
  curlingStone: () => {
    const out: Vox[] = [];
    for (let x = -4; x <= 4; x++)
      for (let y = -2; y <= 1; y++)
        for (let z = -4; z <= 4; z++) {
          if (Math.hypot(x, z) > 4) continue;
          out.push([x, y, z]);
        }
    // handle
    for (let x = -2; x <= 2; x++) out.push([x, 3, 0]);
    out.push([-2, 2, 0], [2, 2, 0]);
    return out;
  },

  // Barbell with plates (distinct from dumbbell)
  barbell: () => {
    const out: Vox[] = [];
    // long bar
    for (let x = -11; x <= 11; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1.3) out.push([x, y, z]);
        }
    // big round plates at each end
    const plate = (cx: number) => {
      for (let x = cx - 1; x <= cx + 1; x++)
        for (let y = -5; y <= 5; y++)
          for (let z = -5; z <= 5; z++) {
            if (Math.hypot(y, z) > 5) continue;
            if (Math.hypot(y, z) < 1.3) continue;
            out.push([x, y, z]);
          }
    };
    plate(-9);
    plate(9);
    return out;
  },

  // Kettlebell — round body with rectangular handle on top
  kettlebell: () => {
    const out: Vox[] = [];
    // round body
    for (let x = -4; x <= 4; x++)
      for (let y = -5; y <= 1; y++)
        for (let z = -4; z <= 4; z++) {
          if (Math.hypot(x, y + 2, z) <= 4) out.push([x, y, z]);
        }
    // handle arch
    for (const [hx, hy] of [[-2, 2] as [number, number], [2, 2], [-3, 3], [3, 3], [-3, 4], [3, 4], [-2, 5], [-1, 5], [0, 5], [1, 5], [2, 5]])
      for (let z = -1; z <= 1; z++) out.push([hx, hy, z]);
    return out;
  },

  // Trophy / medal cup
  trophy: () => {
    const out: Vox[] = [];
    // bowl
    for (let y = 0; y <= 5; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          const d = Math.hypot(x, z);
          if (d > 3) continue;
          const hollow = y > 1 && d < 2.2;
          if (hollow) continue;
          out.push([x, y, z]);
        }
    // handles
    for (let y = 2; y <= 4; y++) out.push([4, y, 0], [-4, y, 0]);
    // stem
    for (let y = -2; y <= -1; y++) out.push([0, y, 0], [1, y, 0], [-1, y, 0]);
    // base
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) out.push([x, -3, z]);
    return out;
  },

  // Javelin (long thin pointed shaft)
  javelin: () => {
    const out: Vox[] = [];
    for (let x = -11; x <= 10; x++) out.push([x, 0, 0]);
    // grip wrap
    for (let x = -1; x <= 1; x++) {
      out.push([x, 1, 0]);
      out.push([x, -1, 0]);
    }
    // point
    out.push([11, 0, 0]);
    out.push([10, 1, 0], [10, -1, 0]);
    return out;
  },

  // Violin — narrower than guitar, with f-holes & bridge
  violin: () => {
    const out: Vox[] = [];
    // body (hourglass)
    for (let y = -6; y <= 4; y++) {
      const waist = Math.abs(y) < 1 ? 2 : 3;
      for (let x = -waist; x <= waist; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    }
    // neck
    for (let y = 4; y <= 10; y++) out.push([0, y, 0], [0, y, 1]);
    // scroll head
    out.push([-1, 11, 0], [0, 11, 0], [1, 11, 0], [-1, 12, 0]);
    // bridge (small notch)
    out.push([0, -2, 2]);
    return out;
  },

  // Saxophone — curved J-tube with bell
  saxophone: () => {
    const out: Vox[] = [];
    // mouthpiece at top
    out.push([0, 7, 0], [0, 8, 0]);
    // straight neck section going down
    for (let y = -2; y <= 6; y++) out.push([0, y, 0], [1, y, 0]);
    // curved bottom (U-turn)
    for (const [bx, by] of [[1, -3] as [number, number], [2, -4], [3, -5], [4, -5], [5, -5], [6, -4], [6, -3], [6, -2]])
      for (let z = -1; z <= 1; z++) out.push([bx, by, z]);
    // bell (flared end going up on the right)
    for (let y = -1; y <= 5; y++) {
      const r = 1 + Math.floor((y + 1) / 2);
      for (let x = 6 - r; x <= 6 + r; x++) {
        if (Math.abs(x - 6) === r) out.push([x, y, 0], [x, y, 1]);
      }
    }
    return out;
  },

  // Trumpet — horizontal tube with flared bell
  trumpet: () => {
    const out: Vox[] = [];
    // tube
    for (let x = -6; x <= 4; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1) out.push([x, y, z]);
        }
    // bell (flared cone on +X)
    for (let x = 4; x <= 9; x++) {
      const r = 1 + (x - 4);
      for (let y = -r; y <= r; y++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(y, z) > r + 0.3 || Math.hypot(y, z) < r - 0.7) continue;
          out.push([x, y, z]);
        }
    }
    // three valve buttons on top
    for (const vx of [-3, -1, 1]) {
      for (let y = 2; y <= 4; y++) out.push([vx, y, 0]);
    }
    // mouthpiece
    out.push([-7, 0, 0], [-7, 0, 1]);
    return out;
  },

  // Flute — long thin tube with finger holes
  flute: () => {
    const out: Vox[] = [];
    for (let x = -9; x <= 9; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1) out.push([x, y, z]);
        }
    // holes (gaps in top)
    const holes = [-5, -3, -1, 1, 3, 5];
    return out.filter(([x, y, z]) => !(holes.includes(x) && y === 1 && z === 0));
  },

  // Harmonica — rectangular block with slots
  harmonica: () => {
    const out: Vox[] = [];
    for (let x = -6; x <= 6; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // slot cutouts
    for (let x = -5; x <= 5; x += 2)
      for (let y = 0; y <= 1; y++) {
        const i = out.findIndex(([a, b, c]) => a === x && b === y && c === 1);
        if (i >= 0) out.splice(i, 1);
      }
    return out;
  },

  // Turntable — circular platter with tonearm
  turntable: () => {
    const out: Vox[] = [];
    // base (square)
    for (let x = -6; x <= 6; x++)
      for (let z = -6; z <= 6; z++)
        for (let y = -2; y <= -1; y++) out.push([x, y, z]);
    // record platter (disc)
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) > 5) continue;
        out.push([x, 0, z]);
      }
    // center spindle
    out.push([0, 1, 0], [0, 2, 0]);
    // tonearm (diagonal bar with head)
    for (let i = 0; i <= 6; i++) {
      const x = 5 - i;
      const z = -5 + i;
      out.push([x, 1, z]);
    }
    // tonearm pivot base
    for (let y = -1; y <= 1; y++) out.push([5, y, -5]);
    return out;
  },

  // Ballet slipper / pointe shoe
  balletShoe: () => {
    const out: Vox[] = [];
    // sole (curved)
    for (let x = -5; x <= 5; x++) {
      const yCurve = Math.abs(x) > 3 ? 1 : 0;
      for (let z = -2; z <= 2; z++) out.push([x, yCurve, z]);
    }
    // upper
    for (let x = -4; x <= 4; x++)
      for (let y = 2; y <= 3; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.abs(x) > 3 && y > 2) continue;
          out.push([x, y, z]);
        }
    // ribbon
    for (let x = 3; x <= 6; x++) out.push([x, 4, 0]);
    for (let x = -6; x <= -3; x++) out.push([x, 4, 0]);
    return out;
  },

  // Theater masks (comedy/tragedy pair)
  theaterMask: () => {
    const out: Vox[] = [];
    // oval face
    for (let x = -4; x <= 4; x++)
      for (let y = -5; y <= 5; y++) {
        const d = Math.hypot(x / 4, y / 5);
        if (d > 1) continue;
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
      }
    // eye holes (carved)
    const skip = new Set<string>();
    for (const [cx, cy] of [[-2, 2], [2, 2]] as Array<[number, number]>) {
      for (let x = cx - 1; x <= cx + 1; x++)
        for (let y = cy - 1; y <= cy + 1; y++)
          for (let z = 0; z <= 1; z++) skip.add(`${x},${y},${z}`);
    }
    // mouth curve (smile)
    for (const [x, y] of [[-2, -2], [-1, -3], [0, -3], [1, -3], [2, -2]] as Array<[number, number]>) {
      for (let z = 0; z <= 1; z++) skip.add(`${x},${y},${z}`);
    }
    return out.filter(([x, y, z]) => !skip.has(`${x},${y},${z}`));
  },

  // Clapperboard — hinged slate
  clapperboard: () => {
    const out: Vox[] = [];
    // slate body
    for (let x = -5; x <= 5; x++)
      for (let y = -3; y <= 1; y++)
        for (let z = -1; z <= 0; z++) out.push([x, y, z]);
    // striped top plank (slightly open)
    for (let x = -5; x <= 5; x++)
      for (let z = -1; z <= 0; z++) {
        out.push([x, 2 + Math.round((x + 5) * 0.15), z]);
      }
    // stripe pattern (alternating gaps)
    return out;
  },

  // Typewriter — keys + carriage + paper roll
  typewriter: () => {
    const out: Vox[] = [];
    // main body
    for (let x = -5; x <= 5; x++)
      for (let y = -3; y <= 0; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    // key plate (stepped) — three rows of keys
    for (let row = 0; row < 3; row++) {
      for (let x = -4 + row; x <= 4 - row; x += 2) {
        out.push([x, 1 + row, row - 2]);
      }
    }
    // paper roll on top
    for (let x = -4; x <= 4; x++)
      for (let y = 3; y <= 4; y++)
        for (let z = 2; z <= 3; z++) {
          if (Math.hypot(y - 3.5, z - 2.5) <= 1) out.push([x, y, z]);
        }
    // paper sheet
    for (let x = -3; x <= 3; x++)
      for (let y = 5; y <= 8; y++) out.push([x, y, 2]);
    return out;
  },

  // Quill / fountain pen in ink bottle
  quill: () => {
    const out: Vox[] = [];
    // ink bottle
    for (let x = -3; x <= 3; x++)
      for (let y = -5; y <= -2; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) > 2) continue;
          out.push([x, y, z]);
        }
    // bottle neck
    for (let x = -1; x <= 1; x++)
      for (let z = -1; z <= 1; z++) out.push([x, -1, z]);
    // quill shaft (diagonal)
    for (let i = 0; i <= 10; i++) {
      const x = Math.round(i * 0.3);
      const y = Math.round(i * 1.0);
      out.push([x, y, 0]);
    }
    // feather barbs
    for (let i = 5; i <= 10; i++) {
      const x = Math.round(i * 0.3);
      const y = Math.round(i * 1.0);
      out.push([x - 1, y, 0], [x + 1, y, 0]);
    }
    return out;
  },

  // Easel with canvas
  easel: () => {
    const out: Vox[] = [];
    // three legs (two front + back brace)
    for (let y = -7; y <= 5; y++) {
      out.push([-3 + Math.round((y + 7) * -0.15), y, 3]);
      out.push([3 + Math.round((y + 7) * 0.15), y, 3]);
      out.push([0, y, -3 + Math.round((y + 7) * 0.1)]);
    }
    // canvas
    for (let x = -4; x <= 4; x++)
      for (let y = -2; y <= 4; y++)
        for (let z = 3; z <= 4; z++) out.push([x, y, z]);
    // crossbar support
    for (let x = -3; x <= 3; x++) out.push([x, -2, 3]);
    return out;
  },

  // Palette with thumb hole
  palette: () => {
    const out: Vox[] = [];
    for (let x = -6; x <= 6; x++)
      for (let z = -4; z <= 4; z++) {
        const d = Math.hypot(x / 6, z / 4);
        if (d > 1) continue;
        // thumb hole on left
        const thumbD = Math.hypot(x + 3, z + 1);
        if (thumbD < 1.5) continue;
        for (let y = -1; y <= 0; y++) out.push([x, y, z]);
      }
    // paint blobs
    for (const [bx, bz] of [[2, -2], [4, 1], [0, 3], [-1, -2]] as Array<[number, number]>) {
      out.push([bx, 1, bz]);
    }
    return out;
  },

  // Spray can
  sprayCan: () => {
    const out: Vox[] = [];
    // body
    for (let y = -6; y <= 4; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) <= 2.3) out.push([x, y, z]);
        }
    // cap
    for (let y = 5; y <= 7; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) <= 1.3) out.push([x, y, z]);
        }
    // nozzle
    out.push([0, 8, 0], [1, 8, 0]);
    // spray dots
    for (const [dx, dy, dz] of [[3, 8, 0], [4, 9, 1], [5, 8, -1], [3, 10, 0]] as Array<[number, number, number]>)
      out.push([dx, dy, dz]);
    return out;
  },

  // Scissors — two blades crossed
  scissors: () => {
    const out: Vox[] = [];
    // blade 1
    for (let i = 0; i <= 8; i++) out.push([i - 4, i - 4, 0]);
    // blade 2
    for (let i = 0; i <= 8; i++) out.push([i - 4, 4 - i, 0]);
    // handles (loops on -X end)
    for (let y = -6; y <= -4; y++) out.push([-5, y, 0], [-6, y, 0]);
    for (let y = 4; y <= 6; y++) out.push([-5, y, 0], [-6, y, 0]);
    // pivot
    out.push([0, 0, 0], [0, 0, 1], [0, 0, -1]);
    return out;
  },

  // Origami crane
  origamiCrane: () => {
    const out: Vox[] = [];
    // body (diamond/kite)
    for (const [x, y] of [[0, 0], [-1, 0], [1, 0], [0, 1], [0, -1], [-1, -1], [1, -1], [-2, 0], [2, 0]] as Array<[number, number]>)
      out.push([x, y, 0]);
    // neck + head
    for (const [x, y] of [[2, 1], [3, 2], [4, 3], [4, 4]] as Array<[number, number]>) out.push([x, y, 0]);
    // tail
    for (const [x, y] of [[-2, 1], [-3, 2], [-4, 3]] as Array<[number, number]>) out.push([x, y, 0]);
    // wings (angled up)
    for (const [x, y, z] of [[0, 2, 2], [0, 3, 3], [0, 4, 4], [-1, 1, 1], [1, 1, 1], [-1, 1, -1], [1, 1, -1], [0, 2, -2], [0, 3, -3], [0, 4, -4]] as Array<[number, number, number]>)
      out.push([x, y, z]);
    return out;
  },

  // Handsaw
  handsaw: () => {
    const out: Vox[] = [];
    // blade with teeth
    for (let x = -2; x <= 8; x++) {
      out.push([x, 0, 0]);
      out.push([x, 1, 0]);
      // teeth
      if ((x - (-2)) % 1 === 0) out.push([x, -1, 0]);
    }
    // handle (D-shape)
    for (let x = -6; x <= -3; x++)
      for (let y = -2; y <= 3; y++) {
        const edge = x === -6 || x === -3 || y === -2 || y === 3;
        if (!edge) continue;
        out.push([x, y, 0]);
      }
    // grip hole
    return out;
  },

  // Hammer
  hammer: () => {
    const out: Vox[] = [];
    // handle
    for (let y = -7; y <= 4; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // head (claw + face)
    for (let x = -3; x <= 3; x++)
      for (let y = 5; y <= 7; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // claw V
    out.push([-4, 6, 0], [-5, 7, 0], [4, 6, 0], [5, 7, 0]);
    return out;
  },

  // Anvil
  anvil: () => {
    const out: Vox[] = [];
    // horn (tapered on +X)
    for (let x = 3; x <= 8; x++) {
      const r = 3 - (x - 3) * 0.5;
      for (let y = 0; y <= r; y++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(y - r / 2, z) <= r) out.push([x, y, z]);
        }
    }
    // body
    for (let x = -6; x <= 3; x++)
      for (let y = 0; y <= 3; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    // waist (narrower)
    for (let x = -4; x <= 1; x++)
      for (let y = -3; y <= -1; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // base
    for (let x = -6; x <= 3; x++)
      for (let y = -6; y <= -4; y++)
        for (let z = -4; z <= 4; z++) out.push([x, y, z]);
    return out;
  },

  // Soldering iron
  solderingIron: () => {
    const out: Vox[] = [];
    // tip
    out.push([8, 0, 0], [7, 0, 0]);
    // shaft
    for (let x = -4; x <= 6; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1) out.push([x, y, z]);
        }
    // handle (thicker)
    for (let x = -10; x <= -4; x++)
      for (let y = -2; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(y, z) <= 2) out.push([x, y, z]);
        }
    // cord (curl at end)
    for (const [cx, cy, cz] of [[-11, 0, 0], [-12, 1, 0], [-12, 2, 0], [-11, 3, 0]] as Array<[number, number, number]>)
      out.push([cx, cy, cz]);
    return out;
  },

  // Circuit board
  circuitBoard: () => {
    const out: Vox[] = [];
    for (let x = -6; x <= 6; x++)
      for (let z = -4; z <= 4; z++) {
        for (let y = -1; y <= 0; y++) out.push([x, y, z]);
      }
    // chip (square)
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) out.push([x, 1, z]);
    // capacitors (cylinders)
    for (const [cx, cz] of [[4, 2], [-4, -2]] as Array<[number, number]>)
      for (let y = 1; y <= 3; y++) out.push([cx, y, cz]);
    // resistors
    for (const [cx, cz] of [[3, -3], [-3, 3], [5, 0]] as Array<[number, number]>)
      out.push([cx, 1, cz]);
    // traces (lines)
    for (let x = -5; x <= 5; x += 2) out.push([x, 1, 0]);
    return out;
  },

  // Laptop
  laptop: () => {
    const out: Vox[] = [];
    // base (keyboard deck)
    for (let x = -6; x <= 6; x++)
      for (let z = -4; z <= 4; z++)
        for (let y = -1; y <= 0; y++) out.push([x, y, z]);
    // keys (pattern)
    for (let x = -5; x <= 5; x += 2)
      for (let z = -3; z <= 2; z += 2) out.push([x, 1, z]);
    // screen (angled backward)
    for (let x = -6; x <= 6; x++)
      for (let h = 0; h <= 7; h++) {
        const y = 1 + h;
        const z = -4 - Math.round(h * 0.2);
        out.push([x, y, z]);
      }
    return out;
  },

  // Microscope
  microscope: () => {
    const out: Vox[] = [];
    // base
    for (let x = -4; x <= 4; x++)
      for (let z = -3; z <= 3; z++)
        for (let y = -6; y <= -5; y++) out.push([x, y, z]);
    // arm (vertical)
    for (let y = -4; y <= 4; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = 2; z <= 3; z++) out.push([x, y, z]);
    // stage
    for (let x = -3; x <= 3; x++)
      for (let z = -1; z <= 2; z++) out.push([x, -3, z]);
    // objective lens turret
    for (let y = -1; y <= 1; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 2) continue;
          out.push([x, y, z]);
        }
    // objective barrel pointing down
    for (let y = -4; y <= -2; y++) out.push([0, y, 0]);
    // eyepiece on top
    for (let y = 5; y <= 7; y++)
      for (let x = -1; x <= 1; x++) out.push([x, y, 0]);
    return out;
  },

  // Beaker / flask
  beaker: () => {
    const out: Vox[] = [];
    // conical body (Erlenmeyer)
    for (let y = -5; y <= 1; y++) {
      const r = 1 + Math.round((1 - y) * 0.5);
      const rr = Math.max(1, r);
      for (let x = -rr; x <= rr; x++)
        for (let z = -rr; z <= rr; z++) {
          if (Math.hypot(x, z) > rr) continue;
          if (Math.hypot(x, z) < rr - 1 && y > -4) continue; // hollow
          out.push([x, y, z]);
        }
    }
    // neck
    for (let y = 1; y <= 4; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, z) > 1) continue;
          out.push([x, y, z]);
        }
    // bubbles coming out
    for (const [bx, by, bz] of [[0, 5, 0], [1, 6, 1], [-1, 7, -1], [0, 8, 1]] as Array<[number, number, number]>)
      out.push([bx, by, bz]);
    return out;
  },

  // Rocket
  rocket: () => {
    const out: Vox[] = [];
    // body (cylinder)
    for (let y = -5; y <= 5; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2) continue;
          out.push([x, y, z]);
        }
    // nose cone
    for (let y = 6; y <= 9; y++) {
      const r = 2 - (y - 6);
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(x, z) > r) continue;
          out.push([x, y, z]);
        }
    }
    // fins
    for (let y = -6; y <= -4; y++)
      for (let d = 0; d <= 2; d++) {
        out.push([3 + d, y - d, 0]);
        out.push([-3 - d, y - d, 0]);
        out.push([0, y - d, 3 + d]);
        out.push([0, y - d, -3 - d]);
      }
    // flame
    for (let y = -8; y <= -6; y++) out.push([0, y, 0]);
    return out;
  },

  // Watering can
  wateringCan: () => {
    const out: Vox[] = [];
    // body
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 2; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) > 3) continue;
          out.push([x, y, z]);
        }
    // handle (arc over top)
    for (const [hx, hy] of [[-3, 3], [-2, 4], [-1, 4], [0, 4], [1, 4], [2, 4], [3, 3]] as Array<[number, number]>)
      for (let z = -1; z <= 1; z++) out.push([hx, hy, z]);
    // spout (long tube extending +X and up)
    for (let i = 0; i <= 6; i++) {
      const x = 3 + i;
      const y = 1 + Math.round(i * 0.4);
      for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    }
    // sprinkler head
    for (let y = 3; y <= 5; y++)
      for (let z = -2; z <= 2; z++) out.push([9, y, z]);
    // water drops
    for (const [dx, dy, dz] of [[10, 2, 0], [11, 1, 1], [10, 0, -1]] as Array<[number, number, number]>)
      out.push([dx, dy, dz]);
    return out;
  },

  // Spade / shovel
  spade: () => {
    const out: Vox[] = [];
    // shaft
    for (let y = -2; y <= 8; y++) out.push([0, y, 0], [0, y, 1]);
    // T-handle at top
    for (let x = -2; x <= 2; x++) out.push([x, 8, 0], [x, 9, 0]);
    // blade (spade-shaped)
    for (let x = -3; x <= 3; x++)
      for (let y = -5; y <= -2; y++) {
        const d = Math.hypot(x / 3, (y + 3.5) / 2);
        if (d <= 1) {
          for (let z = 0; z <= 1; z++) out.push([x, y, z]);
        }
      }
    return out;
  },

  // Flower pot with plant flower
  flowerPot: () => {
    const out: Vox[] = [];
    // tapered pot
    for (let y = -5; y <= 0; y++) {
      const r = 2 + Math.round((y + 5) * 0.3);
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          const d = Math.hypot(x, z);
          if (d > r) continue;
          if (d < r - 1 && y > -4) continue;
          out.push([x, y, z]);
        }
    }
    // rim
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        const d = Math.hypot(x, z);
        if (d > 3 || d < 2) continue;
        out.push([x, 1, z]);
      }
    // stem
    for (let y = 2; y <= 5; y++) out.push([0, y, 0]);
    // flower petals
    for (const [px, py, pz] of [[0, 6, 0], [1, 6, 0], [-1, 6, 0], [0, 6, 1], [0, 6, -1], [0, 7, 0]] as Array<[number, number, number]>)
      out.push([px, py, pz]);
    return out;
  },

  // Butterfly
  butterfly: () => {
    const out: Vox[] = [];
    // body
    for (let y = -3; y <= 3; y++) out.push([0, y, 0]);
    // upper wings
    for (let y = 0; y <= 4; y++)
      for (let x = 1; x <= 5; x++) {
        const d = Math.hypot((x - 3) / 3, (y - 2) / 2);
        if (d <= 1) out.push([x, y, 0], [-x, y, 0]);
      }
    // lower wings
    for (let y = -4; y <= 0; y++)
      for (let x = 1; x <= 4; x++) {
        const d = Math.hypot((x - 2.5) / 2.5, (y + 2) / 2);
        if (d <= 1) out.push([x, y, 0], [-x, y, 0]);
      }
    // antennae
    out.push([0, 4, 0], [1, 5, 0], [-1, 5, 0]);
    return out;
  },

  // Birdhouse
  birdhouse: () => {
    const out: Vox[] = [];
    // box body
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 2; y++)
        for (let z = -3; z <= 3; z++) {
          const edge = Math.abs(x) === 3 || Math.abs(z) === 3 || y === -3 || y === 2;
          if (edge) out.push([x, y, z]);
        }
    // gabled roof
    for (let level = 0; level <= 3; level++) {
      for (let x = -3 + level; x <= 3 - level; x++)
        for (let z = -3; z <= 3; z++) out.push([x, 3 + level, z]);
    }
    // entrance hole
    const hole = new Set<string>();
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++) hole.add(`${x},${y},3`);
    // perch
    out.push([0, -2, 4], [0, -2, 5]);
    return out.filter(([x, y, z]) => !hole.has(`${x},${y},${z}`));
  },

  // Fish tank
  fishTank: () => {
    const out: Vox[] = [];
    // glass box (edges only)
    for (let x = -6; x <= 6; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -3; z <= 3; z++) {
          const onEdge =
            +(Math.abs(x) === 6) + +(Math.abs(y) === 3) + +(Math.abs(z) === 3);
          if (onEdge >= 2) out.push([x, y, z]);
        }
    // gravel bottom
    for (let x = -5; x <= 5; x++)
      for (let z = -2; z <= 2; z++) out.push([x, -2, z]);
    // fish (small dart shape)
    for (const [fx, fy, fz] of [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [2, 1, 0], [2, -1, 0]] as Array<[number, number, number]>)
      out.push([fx, fy, fz]);
    // plants
    for (let y = -1; y <= 2; y++) out.push([-4, y, 0], [4, y, 0]);
    return out;
  },

  // Magnifying glass (investigation, research)
  magnifier: () => {
    const out: Vox[] = [];
    // lens (circle)
    for (let x = -5; x <= 5; x++)
      for (let y = -5; y <= 5; y++) {
        const d = Math.hypot(x, y);
        if (d > 5 || d < 3.5) continue;
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
      }
    // handle
    for (let i = 0; i <= 8; i++) {
      const x = 4 + Math.round(i * 0.6);
      const y = -4 - Math.round(i * 0.6);
      for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    }
    return out;
  },

  // Compass (navigation)
  compass: () => {
    const out: Vox[] = [];
    // round case
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        const d = Math.hypot(x, z);
        if (d > 5) continue;
        if (d > 4) { for (let y = -1; y <= 1; y++) out.push([x, y, z]); continue; }
        // face
        out.push([x, 0, z]);
      }
    // needle (N-S)
    for (let x = -3; x <= 3; x++) out.push([x, 1, 0]);
    out.push([3, 2, 0]); // north tip
    // center pivot
    out.push([0, 2, 0]);
    return out;
  },

  // Tarot card (fanned cards)
  cards: () => {
    const out: Vox[] = [];
    for (let i = 0; i < 5; i++) {
      const angle = (i - 2) * 0.2;
      for (let y = -4; y <= 4; y++)
        for (let x = -2; x <= 2; x++) {
          const rx = Math.round(x * Math.cos(angle) - y * Math.sin(angle));
          const ry = Math.round(x * Math.sin(angle) + y * Math.cos(angle));
          out.push([rx, ry, i - 2]);
        }
    }
    return out;
  },

  // Mahjong / domino tile
  tile: () => {
    const out: Vox[] = [];
    for (let x = -2; x <= 2; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // dots on face
    for (const [dx, dy] of [[-1, -1], [1, 1], [-1, 1], [1, -1], [0, 0]] as Array<[number, number]>)
      out.push([dx, dy, 2]);
    // stack a second tile behind
    for (let x = 0; x <= 4; x++)
      for (let y = -3; y <= 3; y++) out.push([x, y, -2]);
    return out;
  },

  // Gemstone / crystal
  crystal: () => {
    const out: Vox[] = [];
    // tapered hex prism — diamond shape
    for (let y = -5; y <= 5; y++) {
      const r = Math.max(1, 4 - Math.abs(y) * 0.8);
      for (let x = -Math.ceil(r); x <= Math.ceil(r); x++)
        for (let z = -Math.ceil(r); z <= Math.ceil(r); z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) > r) continue;
          out.push([x, y, z]);
        }
    }
    return out;
  },

  // Incense / smoke curl
  incense: () => {
    const out: Vox[] = [];
    // holder
    for (let x = -3; x <= 3; x++)
      for (let z = -1; z <= 1; z++) out.push([x, -4, z]);
    // stick
    for (let y = -3; y <= 4; y++) out.push([0, y, 0]);
    // smoke curl
    for (const [sx, sy, sz] of [[0, 5, 0], [1, 6, 0], [2, 7, 0], [2, 8, -1], [1, 9, -1], [0, 10, 0], [-1, 10, 1]] as Array<[number, number, number]>)
      out.push([sx, sy, sz]);
    return out;
  },

  // Prayer beads / mala
  beads: () => {
    const out: Vox[] = [];
    // ring of beads
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      const x = Math.round(Math.cos(a) * 5);
      const y = Math.round(Math.sin(a) * 5);
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++)
          if (Math.hypot(dx, dy) <= 1) out.push([x + dx, y + dy, 0]);
    }
    // pendant
    for (let y = -8; y <= -6; y++) out.push([0, y, 0], [1, y, 0], [-1, y, 0]);
    return out;
  },

  // Crystal ball / orb on stand
  orb: () => {
    const out: Vox[] = [];
    // sphere
    for (let x = -4; x <= 4; x++)
      for (let y = -1; y <= 7; y++)
        for (let z = -4; z <= 4; z++) {
          if (Math.hypot(x, y - 3, z) <= 4) out.push([x, y, z]);
        }
    // stand
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        const d = Math.hypot(x, z);
        if (d > 3) continue;
        if (d < 2 && d >= 0) out.push([x, -2, z]);
        out.push([x, -3, z]);
      }
    return out;
  },

  // Top hat (magic / illusion)
  topHat: () => {
    const out: Vox[] = [];
    // crown
    for (let y = -1; y <= 7; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) > 3) continue;
          if (Math.hypot(x, z) < 2.2 && y < 6) continue;
          out.push([x, y, z]);
        }
    // brim
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) > 5) continue;
        if (Math.hypot(x, z) < 3) continue;
        out.push([x, -2, z]);
      }
    // band
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.abs(Math.hypot(x, z) - 3) > 0.5) continue;
        out.push([x, -1, z]);
        out.push([x, 0, z]);
      }
    return out;
  },

  // High heel shoe (fashion)
  highHeel: () => {
    const out: Vox[] = [];
    // sole
    for (let x = -4; x <= 4; x++)
      for (let z = -2; z <= 2; z++) out.push([x, 0, z]);
    // body
    for (let x = -4; x <= 2; x++)
      for (let y = 1; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          if (x > 0 && y === 2) continue;
          out.push([x, y, z]);
        }
    // heel (thin tall)
    for (let y = -5; y <= -1; y++) out.push([3, y, 0], [3, y, 1]);
    return out;
  },

  // Dress form / mannequin torso
  dressForm: () => {
    const out: Vox[] = [];
    // hourglass torso
    for (let y = -4; y <= 5; y++) {
      const waist = Math.abs(y) < 1 ? 2 : 3;
      for (let x = -waist; x <= waist; x++)
        for (let z = -waist / 2; z <= waist / 2; z++) {
          if (Math.hypot(x / waist, z / (waist / 2)) > 1) continue;
          out.push([x, y, Math.round(z)]);
        }
    }
    // neck
    for (let y = 6; y <= 8; y++) out.push([0, y, 0]);
    // pole + stand
    for (let y = -8; y <= -5; y++) out.push([0, y, 0]);
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x, z) > 2) continue;
        out.push([x, -9, z]);
      }
    return out;
  },

  // Lipstick
  lipstick: () => {
    const out: Vox[] = [];
    // case
    for (let y = -5; y <= 3; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2) continue;
          out.push([x, y, z]);
        }
    // slanted tip
    for (let y = 4; y <= 7; y++)
      for (let x = -2; x <= 2; x++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, z) > 2) continue;
          // angled cut
          if (x < (y - 4) - 1) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Perfume bottle
  perfume: () => {
    const out: Vox[] = [];
    // fancy body
    for (let y = -5; y <= 3; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) > 3) continue;
          out.push([x, y, z]);
        }
    // neck
    for (let y = 4; y <= 5; y++)
      for (let x = -1; x <= 1; x++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // atomizer bulb
    for (let x = -2; x <= 2; x++)
      for (let y = 6; y <= 8; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x, y - 7, z) <= 2) out.push([x, y, z]);
        }
    return out;
  },

  // Suitcase / luggage
  suitcase: () => {
    const out: Vox[] = [];
    // body
    for (let x = -6; x <= 6; x++)
      for (let y = -4; y <= 4; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // seam down middle
    const seam = new Set<string>();
    for (let x = -6; x <= 6; x++) seam.add(`${x},0,2`);
    // handle
    for (const [hx, hy] of [[-2, 5], [-2, 6], [-1, 6], [0, 6], [1, 6], [2, 6], [2, 5]] as Array<[number, number]>)
      for (let z = -1; z <= 1; z++) out.push([hx, hy, z]);
    // wheels at corners
    out.push([-5, -5, 1], [5, -5, 1], [-5, -5, -1], [5, -5, -1]);
    return out.filter(([x, y, z]) => !seam.has(`${x},${y},${z}`));
  },

  // Flag / pennant on pole
  flag: () => {
    const out: Vox[] = [];
    // pole
    for (let y = -8; y <= 8; y++) out.push([-5, y, 0]);
    // flag waving
    for (let x = -5; x <= 2; x++)
      for (let y = 3; y <= 7; y++) {
        const wave = Math.round(Math.sin((x + 5) * 0.6) * 1);
        out.push([x, y + wave, 0]);
      }
    // flagpole base
    for (let x = -6; x <= -4; x++)
      for (let z = -1; z <= 1; z++) out.push([x, -9, z]);
    return out;
  },

  // Drone (quadcopter)
  drone: () => {
    const out: Vox[] = [];
    // central body
    for (let x = -2; x <= 2; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.max(Math.abs(x), Math.abs(z)) > 2) continue;
          out.push([x, y, z]);
        }
    // four arms extending diagonally
    for (const [sx, sz] of [[1, 1], [1, -1], [-1, 1], [-1, -1]] as Array<[number, number]>) {
      for (let i = 2; i <= 4; i++) out.push([sx * i, 0, sz * i]);
      // rotor ring
      const cx = sx * 5, cz = sz * 5;
      for (let dx = -2; dx <= 2; dx++)
        for (let dz = -2; dz <= 2; dz++) {
          const d = Math.hypot(dx, dz);
          if (d > 2 || d < 1.3) continue;
          out.push([cx + dx, 1, cz + dz]);
        }
      // propeller
      for (let i = -2; i <= 2; i++) out.push([cx + i, 2, cz], [cx, 2, cz + i]);
    }
    return out;
  },

  // VR headset
  vrHeadset: () => {
    const out: Vox[] = [];
    // front face
    for (let x = -5; x <= 5; x++)
      for (let y = -2; y <= 2; y++)
        for (let z = 0; z <= 2; z++) out.push([x, y, z]);
    // eye holes (indents)
    const skip = new Set<string>();
    for (const cx of [-2, 2])
      for (let x = cx - 1; x <= cx + 1; x++)
        for (let y = -1; y <= 1; y++) skip.add(`${x},${y},2`);
    // strap around back
    for (let x = -5; x <= 5; x += 2) out.push([x, 3, -2]);
    for (let z = -2; z <= 0; z++) {
      out.push([-5, 2, z]);
      out.push([5, 2, z]);
    }
    return out.filter(([x, y, z]) => !skip.has(`${x},${y},${z}`));
  },

  // Game controller (generic)
  gamepad: () => {
    const out: Vox[] = [];
    // body (wide flat pill)
    for (let x = -7; x <= 7; x++)
      for (let y = -2; y <= 1; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.abs(x) > 5 && Math.hypot((Math.abs(x) - 5) / 2, y / 2) > 1) continue;
          out.push([x, y, z]);
        }
    // d-pad
    out.push([-4, 2, 0], [-5, 2, 0], [-3, 2, 0], [-4, 3, 0], [-4, 2, 1], [-4, 2, -1]);
    // ABXY buttons
    for (const [bx, by] of [[4, 2], [5, 3], [5, 1], [6, 2]] as Array<[number, number]>) out.push([bx, by, 0]);
    return out;
  },

  // Dumbbell (keep distinct from barbell) — reuse sports but cleaner
  // Skateboard
  skateboard: () => {
    const out: Vox[] = [];
    // deck (long rounded plank)
    for (let x = -8; x <= 8; x++)
      for (let z = -2; z <= 2; z++) {
        const end = Math.max(0, Math.abs(x) - 6);
        if (Math.abs(z) + end > 2) continue;
        out.push([x, 0, z]);
        out.push([x, 1, z]);
      }
    // trucks + wheels
    for (const wx of [-6, 6])
      for (const wz of [-2, 2]) {
        out.push([wx, -1, wz]);
        for (let y = -2; y <= -1; y++)
          for (let dx = -1; dx <= 1; dx++) out.push([wx + dx, y, wz]);
      }
    return out;
  },

  // Slackline stretched between posts
  slackline: () => {
    const out: Vox[] = [];
    // two posts
    for (let y = -5; y <= 5; y++) {
      out.push([-8, y, 0]);
      out.push([8, y, 0]);
    }
    // webbing (sags in middle)
    for (let x = -7; x <= 7; x++) {
      const sag = Math.round(Math.sin(((x + 7) / 14) * Math.PI) * -1);
      out.push([x, 2 + sag, 0]);
    }
    return out;
  },

  // Hang glider triangle
  hangGlider: () => {
    const out: Vox[] = [];
    // triangular wing
    for (let x = -8; x <= 8; x++)
      for (let z = -6; z <= 6; z++) {
        // triangle condition
        if (Math.abs(x) + Math.abs(z) * 1.3 > 8) continue;
        out.push([x, 2, z]);
      }
    // keel (center spar)
    for (let x = -8; x <= 8; x++) out.push([x, 1, 0]);
    // pilot harness (small body below)
    for (let y = -2; y <= 0; y++) out.push([0, y, 0]);
    return out;
  },

  // Scooter
  scooter: () => {
    const out: Vox[] = [];
    // deck
    for (let x = -4; x <= 4; x++)
      for (let z = -1; z <= 1; z++) out.push([x, -2, z]);
    // front wheel
    for (let y = -4; y <= -2; y++)
      for (let dx = -1; dx <= 1; dx++) {
        if (Math.hypot(y + 3, dx) <= 1) out.push([4 + dx, y, 0]);
      }
    // back wheel
    for (let y = -4; y <= -2; y++)
      for (let dx = -1; dx <= 1; dx++) {
        if (Math.hypot(y + 3, dx) <= 1) out.push([-4 + dx, y, 0]);
      }
    // front stem + handlebar
    for (let y = -2; y <= 5; y++) out.push([4, y, 0]);
    for (let z = -2; z <= 2; z++) out.push([4, 5, z]);
    return out;
  },

  // Jump rope
  jumpRope: () => {
    const out: Vox[] = [];
    // two handles
    for (let y = -2; y <= 2; y++) {
      out.push([-5, y, 0]);
      out.push([5, y, 0]);
    }
    // rope arc over top
    for (let x = -5; x <= 5; x++) {
      const y = 2 + Math.round(Math.abs(x) * -0.6 + 5);
      out.push([x, y, 0]);
    }
    // rope arc under bottom (behind)
    for (let x = -4; x <= 4; x++) {
      const y = -3 - Math.round(Math.abs(x) * -0.4 + 2);
      out.push([x, y, -1]);
    }
    return out;
  },

  // Kite — diamond with tail
  kite: () => {
    const out: Vox[] = [];
    // diamond
    for (let y = -4; y <= 4; y++)
      for (let x = -3; x <= 3; x++) {
        if (Math.abs(x) + Math.abs(y) * 0.75 > 3) continue;
        out.push([x, y, 0]);
      }
    // cross spars
    for (let x = -3; x <= 3; x++) out.push([x, 0, 1]);
    for (let y = -4; y <= 4; y++) out.push([0, y, 1]);
    // tail ribbons
    for (const [tx, ty] of [[0, -5], [1, -6], [-1, -7], [0, -8], [1, -9]] as Array<[number, number]>)
      out.push([tx, ty, 0]);
    return out;
  },

  // Balloon (party)
  balloon: () => {
    const out: Vox[] = [];
    // sphere with taper
    for (let x = -3; x <= 3; x++)
      for (let y = 0; y <= 6; y++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, y - 3, z) <= 3) out.push([x, y, z]);
        }
    // knot
    out.push([0, -1, 0], [1, -1, 0], [-1, -1, 0]);
    // string
    for (let y = -7; y <= -2; y++) {
      const wave = Math.round(Math.sin((y + 7) * 0.8) * 1);
      out.push([wave, y, 0]);
    }
    return out;
  },

  // Juggling balls (three arranged in cascade)
  jugglingBalls: () => {
    const out: Vox[] = [];
    const ball = (cx: number, cy: number, cz: number, r: number) => {
      for (let x = -r; x <= r; x++)
        for (let y = -r; y <= r; y++)
          for (let z = -r; z <= r; z++)
            if (Math.hypot(x, y, z) <= r) out.push([x + cx, y + cy, z + cz]);
    };
    ball(-3, -2, 0, 2);
    ball(0, 3, 1, 2);
    ball(3, -2, -1, 2);
    return out;
  },

  // Yo-yo (disc on string)
  yoyo: () => {
    const out: Vox[] = [];
    // two discs
    for (let x = -3; x <= 3; x++)
      for (let y = -3; y <= 3; y++) {
        if (Math.hypot(x, y) > 3) continue;
        out.push([x, y, 1]);
        out.push([x, y, -1]);
      }
    // axle
    out.push([0, 0, 0]);
    // string going up
    for (let y = 4; y <= 10; y++) out.push([0, y, 0]);
    // finger loop
    for (let x = -1; x <= 1; x++) out.push([x, 11, 0]);
    return out;
  },

  // Hula hoop
  hulaHoop: () => {
    const out: Vox[] = [];
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      const x = Math.round(Math.cos(a) * 7);
      const z = Math.round(Math.sin(a) * 7);
      out.push([x, 0, z], [x, 1, z]);
    }
    return out;
  },

  // Frisbee — flat disc tilted
  frisbee: () => {
    const out: Vox[] = [];
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) > 5) continue;
        if (Math.hypot(x, z) < 4) continue;
        const y = Math.round(x * 0.3);
        out.push([x, y, z]);
        out.push([x, y + 1, z]);
      }
    return out;
  },

  // Airplane (small plane profile)
  airplane: () => {
    const out: Vox[] = [];
    // fuselage
    for (let x = -6; x <= 7; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1) out.push([x, y, z]);
        }
    // nose cone
    out.push([8, 0, 0]);
    // wings
    for (let z = -7; z <= 7; z++)
      for (let x = -2; x <= 3; x++) {
        const taper = Math.abs(z) > 4 ? 1 : 0;
        if (x < -1 + taper || x > 2 - taper) continue;
        out.push([x, 0, z]);
      }
    // tail fin (vertical)
    for (let y = 1; y <= 4; y++) out.push([-6, y, 0]);
    // tail horizontal
    for (let z = -3; z <= 3; z++) out.push([-6, 0, z]);
    return out;
  },

  // Motorcycle
  motorcycle: () => {
    const out: Vox[] = [];
    // two wheels
    const wheel = (cx: number) => {
      for (let y = -4; y <= 0; y++)
        for (let dz = -2; dz <= 2; dz++) {
          if (Math.hypot(y + 2, dz) > 2 || Math.hypot(y + 2, dz) < 1) continue;
          for (let dx = -1; dx <= 1; dx++) out.push([cx + dx, y, dz]);
        }
    };
    wheel(-5);
    wheel(5);
    // frame (diagonal)
    for (let x = -4; x <= 4; x++) out.push([x, 1, 0]);
    // seat
    for (let x = -3; x <= 0; x++) out.push([x, 2, 0], [x, 2, 1], [x, 2, -1]);
    // tank
    for (let x = 0; x <= 3; x++)
      for (let y = 1; y <= 3; y++) out.push([x, y, 0]);
    // handlebar
    for (let z = -2; z <= 2; z++) out.push([5, 3, z]);
    for (let y = 1; y <= 3; y++) out.push([5, y, 0]);
    return out;
  },

  // Train (locomotive)
  train: () => {
    const out: Vox[] = [];
    // main body box
    for (let x = -6; x <= 4; x++)
      for (let y = -1; y <= 3; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // cabin (taller at back)
    for (let x = -6; x <= -3; x++)
      for (let y = 4; y <= 6; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // smokestack
    for (let y = 4; y <= 7; y++) out.push([2, y, 0]);
    // smoke puff
    for (const [sx, sy, sz] of [[3, 8, 0], [4, 9, 1], [2, 9, -1], [3, 10, 0]] as Array<[number, number, number]>)
      out.push([sx, sy, sz]);
    // wheels
    for (const wx of [-5, -2, 2])
      for (let dy = -3; dy <= -2; dy++)
        for (let dz = -2; dz <= 2; dz += 4) {
          if (Math.hypot(dy + 2.5, 0) <= 1) out.push([wx, dy, dz]);
        }
    // cowcatcher
    for (let y = -2; y <= 0; y++) out.push([5, y, 0]);
    return out;
  },

  // Beer mug (stein with handle)
  beerMug: () => {
    const out: Vox[] = [];
    // cylinder
    for (let y = -5; y <= 4; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          const d = Math.hypot(x, z);
          if (d > 3) continue;
          if (d < 2.2 && y > -4) continue;
          out.push([x, y, z]);
        }
    // handle
    for (const [hx, hy] of [[4, -3], [5, -2], [5, -1], [5, 0], [5, 1], [4, 2]] as Array<[number, number]>)
      for (let z = -1; z <= 1; z++) out.push([hx, hy, z]);
    // foam top
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, 5 + ((x + z) & 1 ? 1 : 0), z]);
      }
    return out;
  },

  // Cocktail glass (martini)
  cocktailGlass: () => {
    const out: Vox[] = [];
    // conical cup
    for (let y = 0; y <= 5; y++) {
      const r = Math.max(1, y);
      for (let x = -r; x <= r; x++)
        for (let z = -r; z <= r; z++) {
          if (Math.hypot(x, z) > r) continue;
          if (Math.hypot(x, z) < r - 1 && y > 0) continue;
          out.push([x, y, z]);
        }
    }
    // stem
    for (let y = -4; y <= -1; y++) out.push([0, y, 0]);
    // base
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, -5, z]);
      }
    // olive on stick
    out.push([0, 6, 0], [0, 7, 0]);
    return out;
  },

  // Wine barrel
  barrel: () => {
    const out: Vox[] = [];
    for (let y = -5; y <= 5; y++) {
      const r = 4 - Math.abs(y) * 0.3;
      for (let x = -Math.ceil(r); x <= Math.ceil(r); x++)
        for (let z = -Math.ceil(r); z <= Math.ceil(r); z++) {
          if (Math.abs(Math.hypot(x, z) - r) > 0.5) continue;
          out.push([x, y, z]);
        }
    }
    // end caps
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, 5, z]);
        out.push([x, -5, z]);
      }
    // metal bands
    for (let x = -4; x <= 4; x++)
      for (let z = -4; z <= 4; z++) {
        const d = Math.hypot(x, z);
        if (d > 4 || d < 3.5) continue;
        out.push([x, 2, z]);
        out.push([x, -2, z]);
      }
    return out;
  },

  // Sushi roll
  sushi: () => {
    const out: Vox[] = [];
    // 3 rolls
    for (const cx of [-4, 0, 4]) {
      for (let y = -2; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(y, z) > 2) continue;
          for (let x = cx - 1; x <= cx + 1; x++) out.push([x, y, z]);
        }
      // rice top (slight bump)
      out.push([cx, 2, 0]);
    }
    return out;
  },

  // Pizza slice
  pizza: () => {
    const out: Vox[] = [];
    // triangle slice
    for (let x = -5; x <= 5; x++)
      for (let z = 0; z <= 7; z++) {
        if (Math.abs(x) > z * 0.7) continue;
        out.push([x, 0, z]);
        out.push([x, 1, z]);
      }
    // crust edge
    for (let x = -5; x <= 5; x++) {
      if (Math.abs(x) > 7 * 0.7) continue;
      out.push([x, 2, 7]);
    }
    // toppings
    for (const [tx, tz] of [[-2, 2], [1, 3], [2, 5], [-1, 5], [0, 1]] as Array<[number, number]>)
      out.push([tx, 2, tz]);
    return out;
  },

  // Chisel
  chisel: () => {
    const out: Vox[] = [];
    // blade
    for (let x = 0; x <= 7; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // tip bevel
    out.push([8, 0, 0]);
    // handle
    for (let x = -6; x <= -1; x++)
      for (let y = -2; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(y, z) > 2) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Drill (power tool silhouette)
  drill: () => {
    const out: Vox[] = [];
    // body
    for (let x = -4; x <= 3; x++)
      for (let y = -1; y <= 2; y++)
        for (let z = -2; z <= 2; z++) out.push([x, y, z]);
    // chuck (cylindrical on +X)
    for (let x = 3; x <= 6; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) <= 1) out.push([x, y, z]);
        }
    // drill bit
    for (let x = 7; x <= 10; x++) out.push([x, 0, 0]);
    // handle (grip going down)
    for (let x = -2; x <= 0; x++)
      for (let y = -5; y <= -2; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // trigger
    out.push([-1, -2, 2]);
    return out;
  },

  // Ring (jewelry)
  ring: () => {
    const out: Vox[] = [];
    for (let a = 0; a < 32; a++) {
      const ang = (a / 32) * Math.PI * 2;
      const x = Math.round(Math.cos(ang) * 4);
      const y = Math.round(Math.sin(ang) * 4);
      for (let dz = -1; dz <= 1; dz++) out.push([x, y, dz]);
    }
    // gem on top
    for (let dx = -1; dx <= 1; dx++)
      for (let dz = -1; dz <= 1; dz++)
        for (let dy = 0; dy <= 2; dy++) {
          if (Math.max(Math.abs(dx), Math.abs(dz)) + Math.abs(dy) > 2) continue;
          out.push([dx, 5 + dy, dz]);
        }
    return out;
  },

  // Necklace / chain
  necklace: () => {
    const out: Vox[] = [];
    // arc chain
    for (let i = 0; i < 24; i++) {
      const t = (i / 23);
      const ang = Math.PI * (0.2 + t * 0.6);
      const x = Math.round(Math.cos(ang) * 7);
      const y = Math.round(-Math.sin(ang) * 5) + 3;
      out.push([x, y, 0]);
    }
    // pendant heart/gem
    for (const [px, py] of [[0, -5], [-1, -4], [1, -4], [0, -4], [-1, -3], [0, -3], [1, -3], [0, -2]] as Array<[number, number]>)
      out.push([px, py, 0]);
    return out;
  },

  // Umbrella
  umbrella: () => {
    const out: Vox[] = [];
    // canopy dome
    for (let x = -6; x <= 6; x++)
      for (let z = -6; z <= 6; z++) {
        const d = Math.hypot(x, z);
        if (d > 6) continue;
        const y = Math.round(6 - d * 0.7);
        out.push([x, y, z]);
      }
    // pole
    for (let y = -8; y <= 5; y++) out.push([0, y, 0]);
    // handle hook
    for (const [hx, hy] of [[0, -9], [1, -9], [1, -10], [0, -10]] as Array<[number, number]>) out.push([hx, hy, 0]);
    return out;
  },

  // Top / spinning top
  spinningTop: () => {
    const out: Vox[] = [];
    // cone
    for (let y = -4; y <= 2; y++) {
      const r = Math.max(0, 3 - Math.abs(y + 1) * 0.7);
      for (let x = -Math.ceil(r); x <= Math.ceil(r); x++)
        for (let z = -Math.ceil(r); z <= Math.ceil(r); z++) {
          if (Math.hypot(x, z) > r) continue;
          out.push([x, y, z]);
        }
    }
    // stem
    for (let y = 3; y <= 5; y++) out.push([0, y, 0]);
    // tip
    out.push([0, -5, 0]);
    return out;
  },

  // Fireworks burst
  fireworks: () => {
    const out: Vox[] = [];
    // center
    out.push([0, 0, 0]);
    // radial streaks
    for (let a = 0; a < 12; a++) {
      const ang = (a / 12) * Math.PI * 2;
      for (let r = 2; r <= 6; r++) {
        const x = Math.round(Math.cos(ang) * r);
        const y = Math.round(Math.sin(ang) * r);
        if (r === 2 || r === 4 || r === 6) out.push([x, y, 0]);
      }
    }
    // 3D burst sparks
    for (const [dx, dy, dz] of [[0, 0, 5], [0, 0, -5], [3, 3, 3], [-3, -3, 3], [3, -3, -3], [-3, 3, -3]] as Array<[number, number, number]>)
      out.push([dx, dy, dz]);
    return out;
  },

  // Pinball / arcade — boxy machine
  arcadeCabinet: () => {
    const out: Vox[] = [];
    // base
    for (let x = -4; x <= 4; x++)
      for (let y = -7; y <= -3; y++)
        for (let z = -3; z <= 3; z++) out.push([x, y, z]);
    // screen section (tilted back)
    for (let x = -4; x <= 4; x++)
      for (let y = -3; y <= 4; y++)
        for (let z = -3; z <= 3; z++) {
          if (z > -1 - Math.round((y + 3) * 0.1)) continue;
          out.push([x, y, z]);
        }
    // marquee top
    for (let x = -4; x <= 4; x++)
      for (let y = 5; y <= 7; y++)
        for (let z = -2; z <= 1; z++) out.push([x, y, z]);
    // joystick
    for (let y = -2; y <= 0; y++) out.push([0, y, 3]);
    // button dots
    for (const [bx, bz] of [[-2, 3], [2, 3], [-1, 4], [1, 4]] as Array<[number, number]>)
      out.push([bx, -2, bz]);
    return out;
  },

  // Fedora hat
  fedora: () => {
    const out: Vox[] = [];
    // crown (rounded)
    for (let y = 0; y <= 4; y++)
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) > 3) continue;
          if (Math.hypot(x, z) < 2.2 && y < 4) continue;
          if (y === 4 && Math.hypot(x, z) > 2.5) continue;
          out.push([x, y, z]);
        }
    // brim
    for (let x = -5; x <= 5; x++)
      for (let z = -5; z <= 5; z++) {
        if (Math.hypot(x, z) > 5) continue;
        if (Math.hypot(x, z) < 3) continue;
        out.push([x, -1, z]);
      }
    // band
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        const d = Math.hypot(x, z);
        if (Math.abs(d - 3) > 0.5) continue;
        out.push([x, 0, z]);
      }
    return out;
  },

  // Glove (mitten / boxing glove)
  glove: () => {
    const out: Vox[] = [];
    // main palm
    for (let x = -2; x <= 3; x++)
      for (let y = -3; y <= 3; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(x - 0.5, y, z) > 3.5) continue;
          out.push([x, y, z]);
        }
    // thumb
    for (let x = -3; x <= -2; x++)
      for (let y = 0; y <= 2; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // wrist cuff
    for (let x = -2; x <= 3; x++)
      for (let z = -2; z <= 2; z++) out.push([x, -4, z]);
    return out;
  },

  // Pool cue + cue ball
  cue: () => {
    const out: Vox[] = [];
    // cue (long thin stick)
    for (let i = -10; i <= 8; i++) out.push([i, 0, 0]);
    // tip
    out.push([9, 0, 0]);
    // butt grip (thicker)
    for (let x = -10; x <= -6; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) > 1) continue;
          out.push([x, y, z]);
        }
    // cue ball
    for (let x = 10; x <= 13; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x - 11.5, y, z) <= 1.3) out.push([x, y, z]);
        }
    return out;
  },

  // Slot machine / roulette wheel
  roulette: () => {
    const out: Vox[] = [];
    // outer wheel
    for (let x = -6; x <= 6; x++)
      for (let z = -6; z <= 6; z++) {
        const d = Math.hypot(x, z);
        if (d > 6) continue;
        if (d > 5) for (let y = 0; y <= 1; y++) out.push([x, y, z]);
        else out.push([x, 0, z]);
      }
    // ball
    out.push([4, 2, 0]);
    // spokes
    for (let a = 0; a < 8; a++) {
      const ang = (a / 8) * Math.PI * 2;
      for (let r = 1; r <= 4; r++) {
        out.push([Math.round(Math.cos(ang) * r), 1, Math.round(Math.sin(ang) * r)]);
      }
    }
    return out;
  },

  // Igloo / snow dome
  igloo: () => {
    const out: Vox[] = [];
    // dome
    for (let x = -6; x <= 6; x++)
      for (let y = -3; y <= 6; y++)
        for (let z = -6; z <= 6; z++) {
          const d = Math.hypot(x, y, z);
          if (d > 6 || d < 4.8) continue;
          if (y < -2) continue;
          // entrance tunnel opening on +Z
          if (z > 3 && Math.abs(x) <= 1 && y <= 1) continue;
          out.push([x, y, z]);
        }
    // tunnel extension
    for (let x = -1; x <= 1; x++)
      for (let y = -2; y <= 1; y++)
        for (let z = 5; z <= 8; z++) {
          if (Math.max(Math.abs(x), Math.abs(y - -0.5)) > 1.5) continue;
          out.push([x, y, z]);
        }
    return out;
  },

  // Snowflake
  snowflake: () => {
    const out: Vox[] = [];
    for (let a = 0; a < 6; a++) {
      const ang = (a / 6) * Math.PI * 2;
      for (let r = 0; r <= 6; r++) {
        const x = Math.round(Math.cos(ang) * r);
        const y = Math.round(Math.sin(ang) * r);
        out.push([x, y, 0]);
        // branches
        if (r === 3 || r === 5) {
          const bAngA = ang + 0.6;
          const bAngB = ang - 0.6;
          out.push([Math.round(Math.cos(bAngA) * (r + 1)), Math.round(Math.sin(bAngA) * (r + 1)), 0]);
          out.push([Math.round(Math.cos(bAngB) * (r + 1)), Math.round(Math.sin(bAngB) * (r + 1)), 0]);
        }
      }
    }
    return out;
  },

  // Sled / toboggan
  sled: () => {
    const out: Vox[] = [];
    // deck
    for (let x = -5; x <= 5; x++)
      for (let z = -2; z <= 2; z++) out.push([x, 0, z], [x, 1, z]);
    // curved front
    for (let y = 2; y <= 4; y++)
      for (let z = -2; z <= 2; z++) out.push([5 - (y - 2), y, z]);
    // runners
    for (let x = -5; x <= 5; x++) out.push([x, -1, 2], [x, -1, -2]);
    return out;
  },

  // Pom poms (cheerleading) — two clustered tufts
  pompom: () => {
    const out: Vox[] = [];
    const tuft = (cx: number, cy: number) => {
      for (let x = cx - 3; x <= cx + 3; x++)
        for (let y = cy - 3; y <= cy + 3; y++)
          for (let z = -3; z <= 3; z++) {
            if (Math.hypot(x - cx, y - cy, z) > 3) continue;
            if (((x + y + z) & 1) === 0) out.push([x, y, z]);
          }
    };
    tuft(-4, 2);
    tuft(4, -2);
    return out;
  },

  // Microphone stand variant for singing (reuse microphone — skip)

  // Pole (dance pole / climbing pole)
  pole: () => {
    const out: Vox[] = [];
    for (let y = -8; y <= 8; y++) out.push([0, y, 0]);
    // base
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x, z) > 2) continue;
        out.push([x, -9, z]);
      }
    // top mount
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x, z) > 2) continue;
        out.push([x, 9, z]);
      }
    return out;
  },

  // Aerial silks (hanging ribbons)
  aerialSilks: () => {
    const out: Vox[] = [];
    // rig bar
    for (let x = -4; x <= 4; x++) out.push([x, 8, 0]);
    // silk ribbons flowing down (waving)
    for (let y = -8; y <= 7; y++) {
      const waveA = Math.round(Math.sin((y + 8) * 0.3) * 1);
      const waveB = Math.round(Math.cos((y + 8) * 0.3) * 1);
      out.push([-2 + waveA, y, 0]);
      out.push([2 + waveB, y, 0]);
    }
    return out;
  },

  // Stained glass window
  stainedGlass: () => {
    const out: Vox[] = [];
    // arched frame
    for (let x = -4; x <= 4; x++)
      for (let y = -6; y <= 6; y++) {
        if (y > 4) {
          // arched top
          const d = Math.hypot(x, y - 4);
          if (d > 4) continue;
        } else if (Math.abs(x) > 4) continue;
        // interior grid
        const isDivider = x === 0 || y === 0 || (y === -3 || y === 3) || Math.abs(x) === 4 || y === -6;
        if (isDivider) {
          for (let z = -1; z <= 1; z++) out.push([x, y, z]);
        } else {
          out.push([x, y, 0]);
        }
      }
    return out;
  },

  // Abacus (tool for counting/math games)
  abacus: () => {
    const out: Vox[] = [];
    // frame
    for (let x = -5; x <= 5; x++) {
      out.push([x, 5, 0]);
      out.push([x, -5, 0]);
    }
    for (let y = -5; y <= 5; y++) {
      out.push([-5, y, 0]);
      out.push([5, y, 0]);
    }
    // rods & beads
    for (let row = -3; row <= 3; row += 2) {
      for (let x = -4; x <= 4; x++) out.push([x, row, 0]);
      // beads (slightly thicker)
      for (const bx of [-3, -1, 2, 4])
        for (let dy = -1; dy <= 1; dy++)
          for (let dz = -1; dz <= 1; dz++) {
            if (Math.hypot(dy, dz) > 1) continue;
            out.push([bx, row + dy, dz]);
          }
    }
    return out;
  },

  // Coin stack (for collecting coins)
  coinStack: () => {
    const out: Vox[] = [];
    for (let i = 0; i < 6; i++) {
      const y = -5 + i;
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x, z) > 3) continue;
          out.push([x, y, z]);
        }
    }
    // second stack offset
    for (let i = 0; i < 4; i++) {
      const y = -5 + i;
      for (let x = -3; x <= 3; x++)
        for (let z = -3; z <= 3; z++) {
          if (Math.hypot(x - 5, z + 2) > 3 * 0.8) continue;
          out.push([x + 5, y, z - 2]);
        }
    }
    return out;
  },

  // Stamp (collecting)
  stamp: () => {
    const out: Vox[] = [];
    // perforated rectangle
    for (let x = -4; x <= 4; x++)
      for (let y = -3; y <= 3; y++) {
        // perforation pattern on edges (skip even-alternating voxels)
        const onEdge = Math.abs(x) === 4 || Math.abs(y) === 3;
        if (onEdge && (x + y) % 2 === 0) continue;
        out.push([x, y, 0]);
      }
    // design (small motif)
    for (const [dx, dy] of [[-1, 1], [0, 1], [1, 1], [0, 0], [0, -1]] as Array<[number, number]>)
      out.push([dx, dy, 1]);
    return out;
  },

  // Chess clock (but chessPiece covers chess). Use for time trials/speedcubing.
  // Vinyl record
  vinyl: () => {
    const out: Vox[] = [];
    for (let x = -6; x <= 6; x++)
      for (let z = -6; z <= 6; z++) {
        const d = Math.hypot(x, z);
        if (d > 6) continue;
        out.push([x, 0, z]);
        // grooves
        if (d > 4 && d < 5.5 && ((Math.round(d * 2) % 2) === 0)) out.push([x, 1, z]);
      }
    // label
    for (let x = -2; x <= 2; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x, z) > 2) continue;
        out.push([x, 1, z]);
      }
    // center hole skipped visually (keep it solid)
    return out;
  },

  // Printing press / linocut block
  printingPress: () => {
    const out: Vox[] = [];
    // bed plate
    for (let x = -6; x <= 6; x++)
      for (let z = -4; z <= 4; z++) out.push([x, -3, z], [x, -2, z]);
    // roller on top (cylinder X-axis)
    for (let x = -5; x <= 5; x++)
      for (let y = 0; y <= 3; y++)
        for (let z = -2; z <= 2; z++) {
          if (Math.hypot(y - 1.5, z) > 2) continue;
          out.push([x, y, z]);
        }
    // roller supports
    for (let y = -1; y <= 1; y++) out.push([-6, y, 0], [6, y, 0]);
    // printed sheet sticking out
    for (let x = 3; x <= 8; x++)
      for (let z = -3; z <= 3; z++) out.push([x, -1, z]);
    return out;
  },

  // Puppet (marionette on strings)
  puppet: () => {
    const out: Vox[] = [];
    // control bar on top
    for (let x = -3; x <= 3; x++) out.push([x, 8, 0]);
    // strings
    for (const sx of [-3, -1, 1, 3])
      for (let y = 2; y <= 7; y++) out.push([sx, y, 0]);
    // head
    for (let x = -1; x <= 1; x++)
      for (let y = 0; y <= 2; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, y - 1, z) > 1.5) continue;
          out.push([x, y, z]);
        }
    // body
    for (let x = -2; x <= 2; x++)
      for (let y = -3; y <= -1; y++) out.push([x, y, 0]);
    // arms hanging
    for (let y = -4; y <= -1; y++) out.push([-3, y, 0], [3, y, 0]);
    // legs dangling
    for (let y = -6; y <= -4; y++) out.push([-1, y, 0], [1, y, 0]);
    return out;
  },

  // Whistle (simple tube with mouthpiece)
  whistle: () => {
    const out: Vox[] = [];
    // body
    for (let x = -5; x <= 3; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(y, z) > 1) continue;
          out.push([x, y, z]);
        }
    // mouthpiece (flared)
    for (let x = -7; x <= -5; x++)
      for (let y = -2; y <= 2; y++)
        for (let z = -2; z <= 2; z++) {
          const r = 2 - (x + 7) * 0.4;
          if (Math.hypot(y, z) > r) continue;
          out.push([x, y, z]);
        }
    // pea/ball inside (small sphere visible through hole)
    out.push([0, 0, 2]);
    // lanyard loop
    for (const [lx, ly] of [[3, 2], [4, 3], [4, 4], [3, 5], [2, 5], [2, 4], [2, 3]] as Array<[number, number]>)
      out.push([lx, ly, 0]);
    return out;
  },

  // Collectible figurine (humanoid)
  figurine: () => {
    const out: Vox[] = [];
    // head
    for (let x = -1; x <= 1; x++)
      for (let y = 5; y <= 7; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x, y - 6, z) > 1.5) continue;
          out.push([x, y, z]);
        }
    // torso
    for (let x = -2; x <= 2; x++)
      for (let y = 0; y <= 4; y++)
        for (let z = -1; z <= 1; z++) out.push([x, y, z]);
    // arms
    for (let y = 1; y <= 4; y++) out.push([-3, y, 0], [3, y, 0]);
    // legs
    for (let y = -4; y <= -1; y++) out.push([-1, y, 0], [1, y, 0]);
    // base (stand)
    for (let x = -3; x <= 3; x++)
      for (let z = -2; z <= 2; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, -5, z]);
      }
    return out;
  },

  // Feather (writing / quill / decor)
  feather: () => {
    const out: Vox[] = [];
    // quill spine
    for (let y = -7; y <= 7; y++) out.push([0, y, 0]);
    // barbs (asymmetric)
    for (let y = -5; y <= 6; y++) {
      const w = Math.max(1, 3 - Math.abs(y - 1) * 0.2);
      for (let x = 1; x <= Math.floor(w); x++) out.push([x, y, 0]);
      for (let x = -Math.floor(w); x <= -1; x++) out.push([x, y, 0]);
    }
    return out;
  },

  // Hourglass (habit/time tracking)
  hourglass: () => {
    const out: Vox[] = [];
    // caps
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, 6, z]);
        out.push([x, -6, z]);
      }
    // bulbs (two cones)
    for (let y = -5; y <= 5; y++) {
      const r = Math.max(1, 3 - Math.abs(y) * 0.6);
      for (let x = -Math.ceil(r); x <= Math.ceil(r); x++)
        for (let z = -Math.ceil(r); z <= Math.ceil(r); z++) {
          if (Math.abs(Math.hypot(x, z) - r) > 0.5) continue;
          out.push([x, y, z]);
        }
    }
    // sand stream
    out.push([0, 0, 0], [0, -1, 0], [0, -2, 0], [0, -3, 0]);
    return out;
  },

  // Podium / lectern (debate, toastmasters)
  lectern: () => {
    const out: Vox[] = [];
    // slanted top
    for (let x = -3; x <= 3; x++)
      for (let z = -2; z <= 2; z++) {
        out.push([x, 3 - Math.round(z * 0.5), z]);
        out.push([x, 4 - Math.round(z * 0.5), z]);
      }
    // post
    for (let y = -4; y <= 2; y++) out.push([0, y, 0]);
    // base
    for (let x = -3; x <= 3; x++)
      for (let z = -3; z <= 3; z++) {
        if (Math.hypot(x, z) > 3) continue;
        out.push([x, -5, z]);
      }
    return out;
  },

  // Poi / staff (fire spinning)
  poi: () => {
    const out: Vox[] = [];
    // two balls/tails at chain ends
    for (let x = -3; x <= -1; x++)
      for (let y = 4; y <= 6; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x + 2, y - 5, z) <= 1.3) out.push([x, y, z]);
        }
    for (let x = 1; x <= 3; x++)
      for (let y = -6; y <= -4; y++)
        for (let z = -1; z <= 1; z++) {
          if (Math.hypot(x - 2, y + 5, z) <= 1.3) out.push([x, y, z]);
        }
    // chains
    for (let i = 0; i <= 8; i++) {
      const x = -2 + Math.round(i * 0.5);
      const y = 4 - i;
      out.push([x, y, 0]);
    }
    for (let i = 0; i <= 8; i++) {
      const x = 2 - Math.round(i * 0.5);
      const y = -4 + i;
      out.push([x, y, 0]);
    }
    // flame sparks
    out.push([-2, 7, 0], [-1, 8, 0], [2, -7, 0], [3, -6, 0]);
    return out;
  },

  // Drum kit — bass drum + snare + cymbal
  drumKit: () => {
    const out: Vox[] = [];
    // bass drum (cylinder on X-axis)
    for (let x = -3; x <= 3; x++)
      for (let y = -4; y <= 2; y++)
        for (let z = -2; z <= 4; z++) {
          const d = Math.hypot(y + 1, z - 1);
          if (d > 3) continue;
          if (d < 2.5 && Math.abs(x) < 3) continue; // hollow interior, keep heads
          out.push([x, y, z]);
        }
    // snare (smaller cylinder to the side)
    for (let x = 4; x <= 7; x++)
      for (let y = 0; y <= 3; y++)
        for (let z = -3; z <= 0; z++) {
          const d = Math.hypot(y - 1.5, z + 1.5);
          if (d > 2) continue;
          out.push([x, y, z]);
        }
    // cymbal (tilted disc on -X)
    for (let x = -7; x <= -4; x++)
      for (let z = -4; z <= 2; z++) {
        const d = Math.hypot(x + 5.5, z + 1);
        if (d > 3.5) continue;
        out.push([x, 4 + Math.round((x + 5.5) * 0.2), z]);
      }
    // cymbal stand
    for (let y = -3; y <= 3; y++) out.push([-5, y, -1]);
    return out;
  },
};

const M_ALL = { ...M, ...EXTRA } as const;

// ──────────────────────────────────────────────────────────────
// Keyword → model mapping. First match wins. Order matters: put
// specific matches before generic ones.
// ──────────────────────────────────────────────────────────────
const KEYWORDS: Array<[RegExp, keyof typeof M_ALL]> = [
  // specific sports / activities (ORDER MATTERS: specific before generic)
  [/chess|checker|go\b|backgammon/i, "chessPiece"],
  [/mahjong|domino/i, "tile"],
  [/tarot|oracle\s*card/i, "cards"],
  [/poker|bridge|rummy|solitaire|black\s*jack|uno|canasta|playing\s*card|card\s*game/i, "cards"],
  [/rubik/i, "games"],
  [/jigsaw|puzzle/i, "games"],
  [/3d\s*print/i, "printer3D"],
  [/sew(ing)?\s*machine|quilt(ing)?\s*machine/i, "sewingMachine"],
  [/origami|paper\s*fold/i, "origamiCrane"],
  [/scissor|paper\s*cut/i, "scissors"],
  [/easel|oil\s*paint|acrylic|watercolor|gouache|canvas/i, "easel"],
  [/palette|color\s*mix/i, "palette"],
  [/graffiti|street\s*art|spray\s*paint/i, "sprayCan"],
  [/circuit|electron|arduino|raspberry|breadboard|robotic/i, "circuitBoard"],
  [/solder|pcb/i, "solderingIron"],
  [/laptop|coding|program|hackathon|software|web\s*dev/i, "laptop"],
  [/microscop|biolog|lab\s*work/i, "microscope"],
  [/chemistr|beaker|flask/i, "beaker"],
  [/rocket|space|aerospace|satellite/i, "rocket"],
  [/blacksmith|forge|ironwork/i, "anvil"],
  [/hammer|carpent/i, "hammer"],
  [/saw\b|handsaw|woodwork|joinery|whittl/i, "handsaw"],
  [/gardening|garden\b|landscap/i, "wateringCan"],
  [/spade|shovel|dig/i, "spade"],
  [/flower|floral|ikebana|bouquet/i, "flowerPot"],
  [/plant|bonsai|hydropon|mycolog|forage|aquascap|herbal/i, "plant"],
  [/butterfly|insect|bug\b|entomol/i, "butterfly"],
  [/bird|watch|ornithol/i, "birdhouse"],
  [/aquari|fish\s*keep|reef|koi/i, "fishTank"],
  [/genealog|detective|investigat|search|magnif/i, "magnifier"],
  [/compass|orient|cartograph|map\s*mak/i, "compass"],
  [/flag|pennant/i, "flag"],
  [/cycl|bik(e|ing)|bmx|mountain\s*bike/i, "wheel"],
  [/skateboard/i, "skateboard"],
  [/scooter/i, "scooter"],
  [/jump\s*rope|skipping/i, "jumpRope"],
  [/slackline|tightrope/i, "slackline"],
  [/hang\s*glid|paraglid|parasail/i, "hangGlider"],
  [/drone|rc\s*helicop|rc\s*plane/i, "drone"],
  [/vr\b|virtual\s*reality|ar\s*headset|oculus/i, "vrHeadset"],
  [/controll|gaming|video\s*game|esport|cosplay|console/i, "gamepad"],
  [/role[\s-]?play|tabletop|dungeons|d&d|d20|miniatures|warhammer/i, "dice"],
  [/axe\s*throw|axe\b|hatchet|chop/i, "axe"],
  [/golf/i, "golfClub"],
  [/cricket/i, "wicket"],
  [/hocke|field\s*hockey/i, "hockeyStick"],
  [/baseball|softball/i, "bat"],
  [/tennis|badminton|pickleball|squash|racquet|racket|ping\s*pong|pong|padel|table\s*tennis/i, "racket"],
  [/lacrosse/i, "lacrosseStick"],
  [/darts?\b/i, "dart"],
  [/basketball/i, "basketball"],
  [/soccer|football\b|futsal/i, "soccerBall"],
  [/volleyball/i, "volleyball"],
  [/rugby|american\s*football|aussie\s*rules|gridiron/i, "rugbyBall"],
  [/bowl|billiard|pool\b|snooker/i, "ball"],
  [/bow|archery|arrow/i, "bow"],
  [/box(ing)?|kickbox|judo|karate|taekwon|jiu[\s-]?jitsu|wrestl|martial|fencing|muay|capoeira|krav/i, "fist"],
  [/larp|fenc|sword|sabre|saber|kendo|kenjutsu/i, "sword"],
  [/fish/i, "fishing"],
  [/archery/i, "bow"],
  [/camp/i, "tent"],
  [/hik|backpack|trek|mountain/i, "backpack"],
  [/telescop|astron|stargaz/i, "telescope"],
  [/yoga|pilates|acroyoga|stretch/i, "mat"],
  [/meditat|mindfulness|zen|breathwork/i, "stones"],
  [/crystal\s*heal|reiki|chakra|energy\s*work/i, "crystal"],
  [/incense|smudg|aromather/i, "incense"],
  [/prayer|mala|rosary|mantra/i, "beads"],
  [/tarot|fortune|divin|psychic|clairv|scrying|palm/i, "orb"],
  [/magic|illusion|prestidig|close[\s-]?up\s*magic/i, "topHat"],
  [/altar|ritual|ceremon|occult|pagan|witch/i, "candle"],
  [/candle\s*mak|wax/i, "candle"],
  [/pottery|ceramic|glassblow|sculpt|clay/i, "vase"],
  [/knit|crochet|embroid|quilt|yarn|cross[\s-]?stitch|macrame|tatting|weaving|lacemaking|sew/i, "yarnBall"],
  [/piano|dj\b|organ|accordion|harpsichord|synth|keytar|mixing|music\s*prod|beat\s*mak/i, "piano"],
  [/drum|percuss|tabla|bongo|cajon|xylophone|marimba|timpani|cymbal|gong|tambour/i, "drumKit"],
  [/saxophon|sax\b/i, "saxophone"],
  [/trumpet|cornet|bugle/i, "trumpet"],
  [/flute|piccolo|clarinet|oboe|recorder/i, "flute"],
  [/harmonic(a)?|mouth\s*organ/i, "harmonica"],
  [/turntab|vinyl|record\s*collect|scratch|beatmatch/i, "turntable"],
  [/violin|viola|cello|fiddle/i, "violin"],
  [/guitar|bass\s*guitar|sitar|ukulele|banjo|mandolin|harp|lute|koto|zither|instrument|band|sing|choir|vocals|trombone|tuba|horn|brass/i, "music"],
  [/coffee|espresso|cappuccino|latte|barista/i, "coffeeCup"],
  [/tea\b|matcha|chai/i, "teapot"],
  [/bread|bak(ing|ery)|pastry|sourdough|cake\b|cupcake|pie\s*mak/i, "bread"],
  [/cook|cuisine|grill|bbq|barbecue|meal\s*prep|fermentation|pickling|kombucha|saucer/i, "pot"],
  [/wine|beer|spirit|cocktail|mead|mixolog|sake|whisk|distill|brew/i, "bottle"],
  [/draw|paint|sketch|callig|pyrograph|illustrat|anim(e|ation)?|nail\s*art|tattoo|lettering/i, "pencil"],
  [/car\b|auto|drift|racing|motorcy|motor|f1\b|nascar|rally/i, "car"],
  [/photo|camera|film|video(graphy)?|cinema(tography)?/i, "photography"],
  [/typewriter/i, "typewriter"],
  [/quill|calligraph|fountain\s*pen/i, "quill"],
  [/writ|journal|blog|poetry|liter|read|novel|memoir/i, "writing"],
  [/gun|rifle|pistol|airsoft|paintball|hunt|shoot|target\s*shoot/i, "gun"],
  [/climb|boulder|rappel/i, "climbing"],
  [/ice\s*skat|figure\s*skat|speed\s*skat/i, "iceSkate"],
  [/curling/i, "curlingStone"],
  [/alpine|downhill|ski(ing)?|nordic|cross[\s-]?country|biathlon/i, "skis"],
  [/snowboard|wakeboard|kiteboard/i, "snowboard"],
  [/surf/i, "surfboard"],
  [/sail|yacht|regatta|windsurf/i, "sailboat"],
  [/kayak|canoe|paddl|row(ing)?|raft|sup\b|stand[\s-]?up\s*paddle/i, "paddle"],
  [/swim|scuba|dive|snorkel|free\s*div/i, "goggles"],
  [/javelin|discus|shot\s*put|pole\s*vault|long\s*jump|high\s*jump|hurdle|athletics|track\s*and\s*field/i, "javelin"],
  [/run|jog|marathon|sprint|walk|parkour/i, "shoe"],
  [/ballet|barre/i, "balletShoe"],
  [/barbell|deadlift|powerlift|olympic\s*lift/i, "barbell"],
  [/kettle\s*bell|kettlebell/i, "kettlebell"],
  [/weight|lift|gym|body|calisth|fitness|dumbbell|crossfit|hiit/i, "sports"],
  [/trophy|medal|award/i, "trophy"],
  [/board\s*games?/i, "games"],
  [/collect|antique|coin|stamp|ephemer|memorabilia|vintage/i, "collecting"],
  [/metalwork|lockp|lego|model\s*build|scale\s*model/i, "technology"],
  [/genealogy|research|astrolog|geocach|ghost|lang|learn|philosoph|history|trivia/i, "writing"],
  [/podcast|broadcast|radio\s*host|voice(\s*act)?|karaoke|audiobook/i, "microphone"],
  [/skydiv|parachut|base\s*jump|wingsuit/i, "parachute"],
  [/comed|act|stand[\s-]?up|theat|mime|improv/i, "theaterMask"],
  [/clapper|director|film\s*mak|screen\s*writ/i, "clapperboard"],
  [/dance|danc|salsa|ballroom|tap\b|hip\s*hop|breakdanc/i, "performance"],
  [/home\s*impro|diy|woodwork|leather|soap|scrapbook/i, "arts"],
  [/suitcase|luggage|travel\s*plan|tourism/i, "suitcase"],
  [/fashion|design|sewing\s*pattern|tailor/i, "dressForm"],
  [/heel|shoe\s*collect|sneaker/i, "highHeel"],
  [/makeup|cosmetic|lipstick|beauty|skincare/i, "lipstick"],
  [/perfume|cologne|fragranc/i, "perfume"],
  [/kite\s*fl|kiting/i, "kite"],
  [/balloon|helium/i, "balloon"],
  [/juggl|object\s*manipul|contact\s*juggl/i, "jugglingBalls"],
  [/yo[\s-]?yo|diabolo/i, "yoyo"],
  [/hula\s*hoop|hooping/i, "hulaHoop"],
  [/frisbee|disc\s*golf|ultimate/i, "frisbee"],
  [/airplane|aviation|pilot|fly\s*plane|rc\s*plane/i, "airplane"],
  [/motorcy|scooter\s*riding|moped/i, "motorcycle"],
  [/train|railway|locomotive|model\s*train/i, "train"],
  [/beer|pub\s*crawl|ale/i, "beerMug"],
  [/cocktail|martini|mixolog/i, "cocktailGlass"],
  [/whisk|bourbon|scotch|rum|distill|barrel\s*ag/i, "barrel"],
  [/sushi|nigiri|sashimi|ramen/i, "sushi"],
  [/pizza|pizzaiol/i, "pizza"],
  [/chisel|carv/i, "chisel"],
  [/drill|power\s*tool/i, "drill"],
  [/ring\s*(mak|collect)|jewelry\s*ring/i, "ring"],
  [/jewel|necklace|beading|bracelet|pendant/i, "necklace"],
  [/umbrella|parasol/i, "umbrella"],
  [/spinning\s*top|beyblade|tops?\s*collect/i, "spinningTop"],
  [/firework|pyrotech/i, "fireworks"],
  [/pinball|arcade|claw\s*machine/i, "arcadeCabinet"],
  [/hat\s*(mak|collect)|millinery|hat\b/i, "fedora"],
  [/glove|mitten/i, "glove"],
  [/pool\s*(game|play)|billiards\s*play|snooker\s*play|cue\s*sport/i, "cue"],
  [/roulette|casino|slot\s*machine|gambling/i, "roulette"],
  [/igloo|snow\s*dome|snow\s*fort/i, "igloo"],
  [/snowflake|snow\s*craft/i, "snowflake"],
  [/sled|toboggan|luge|bobsled/i, "sled"],
  [/cheer|pom\s*pom/i, "pompom"],
  [/pole\s*danc|pole\s*sport/i, "pole"],
  [/aerial\s*silk|aerial\s*hoop|aerial\s*strap|trapez/i, "aerialSilks"],
  [/stained\s*glass|mosaic/i, "stainedGlass"],
  [/abacus|mental\s*math|math\s*olymp|speed\s*cub/i, "abacus"],
  [/coin(\s*collect)?|numismat/i, "coinStack"],
  [/stamp(\s*collect)?|philatel/i, "stamp"],
  [/vinyl|record\s*(player|collect)/i, "vinyl"],
  // Broad secondary catches for activities missed above
  [/linocut|screen\s*print|letterpress|woodblock|risograph|monoprint|etching|engraving|copperplate|cyanotype|lumen|anthotype|lithograph|intaglio|silkscreen|block\s*print/i, "printingPress"],
  [/paper|papier|decoupage|collage|bookbind|book\s*fold|zine|marbling|scrapbook/i, "origamiCrane"],
  [/spin(ning)?\s*wool|natural\s*dye|rug\s*(hook|tuft)|latch\s*hook|needle\s*felt|wet\s*felt|nalbinding|n[åa]lebinding|sprang|kumihimo|passementerie|smocking|stumpwork|basketry|coil(ed)?\s*basket|rush\s*seat|cane\s*seat|braiding/i, "yarnBall"],
  [/fused\s*glass|raku|pit\s*firing|saggar|soda\s*firing|salt\s*glaz|crystalline\s*glaz|slip\s*cast|coil\s*build|slab\s*build|lusterware|enamel|cloisonn[ée]|champlev[ée]/i, "vase"],
  [/intarsia|marquetry|parquetry|turning\s*on\s*a\s*lathe|luthier|gourd|scrimshaw|woodturn/i, "chisel"],
  [/silversmit|goldsmit|reposs[ée]|wire\s*wrap|metal\s*cast|sand\s*cast|metal\s*spin|tin\s*smit|coppersmit|mokume|damascene|niello/i, "anvil"],
  [/sugar\s*(pull|blow)|isomalt|chocolate\s*temper|confection|cheese\s*ag|charcut|smoking\s*(and|meat)|curing\s*meat|dumpling/i, "bread"],
  [/fossil|lepidopter|herpetol|lichen|bryolog|moth\s*trap|pond\s*dip|phenolog|urban\s*ecol|entomolog|ornitholog|botan|geolog|mineralog|mycolog/i, "magnifier"],
  [/funko|nendoroid|figma|garage\s*kit|art\s*toy|transformer|marvel|action\s*figure/i, "figurine"],
  [/model\s*kit|plastic\s*model|gunpla|diorama/i, "figurine"],
  [/comic|manga|graphic\s*novel/i, "writing"],
  [/trading\s*card|pokemon|magic\s*the\s*gathering|mtg\b|yu[\s-]?gi[\s-]?oh|tcg|ccg/i, "cards"],
  [/first\s*edition|cassette|banknote|militaria|concert\s*poster|poster\b|print\s*collect|lithograph\s*collect|neon\s*sign|depression\s*glass|carnival\s*glass|folk\s*art|outsider\s*art|netsuke|ukiyo|faberge|meissen|royal\s*doulton|wedgwood|hummel|lladro|snow\s*globe|mechanical\s*bank|marble\s*collect|cigarette\s*card|greeting\s*card|christmas\s*ornament|curiosity\s*cabinet|meteorite|gemstone|shell\s*collect|insulator|license\s*plate/i, "collecting"],
  [/whistl/i, "whistle"],
  [/spoon\s*play|jug\s*play|washboard|theremin|handpan|ocarina|tin\s*whistle|kalimba|oud\b|shamisen|erhu|didgeridoo|hurdy|balalaika|dulcimer|chapman\s*stick|barbershop|viol\b|orchestral\s*arrang|compos|songwrit/i, "music"],
  [/fpv\b|cnc|laser\s*cut|demoscene|retrocomput|mechanical\s*keyboard|custom\s*pc|overclock|emulation|pixel\s*art|voxel\s*art|procedural|ai\s*art|quad\s*build|line[\s-]?follow|3d\s*scan|computer\s*build/i, "laptop"],
  [/storytell|debate|mock\s*trial|model\s*un|toastmaster|public\s*speak|oratory|rhetoric/i, "lectern"],
  [/poi\b|staff\s*spin|fire\s*(spin|performance)|flow\s*art/i, "poi"],
  [/acrobat|contortion|clown|mime|living\s*statue|street\s*performance/i, "theaterMask"],
  [/puppet|shadow\s*puppet|ventriloqu/i, "puppet"],
  [/constructed\s*script|esperanto|steno|pen\s*pal|worldbuild|lexicog|etymolog|accent|polyglot|braille|sign\s*language|polylinguistic/i, "quill"],
  [/i\s*ching|tai\s*chi|qigong|shamanic|vision\s*quest|druidry|asatru|morning\s*page|habit\s*track|gratitude|journal\s*prompt/i, "beads"],
  [/origami|paper\s*fold|kirigami/i, "origamiCrane"],
  [/feather|quill\s*work/i, "feather"],
  [/hourglass|pomodoro|productivity|time\s*track|minimalis|declutter|organiz|konmari/i, "hourglass"],
  [/altered\s*book|mono\s*print|print(s|ing|mak)\b|prints\b/i, "printingPress"],
  [/marble\b|shell\b|butterflies|meteorite|gemstones/i, "crystal"],
  [/lucid\s*dream|dream\s*journal|astral|oob|out\s*of\s*body/i, "beads"],
  [/capsule\s*wardrobe|slow\s*living|voluntary\s*simpli|frugal|minimali|declutter|konmari|homesteading|self[\s-]?sufficient/i, "hourglass"],
  [/forag|mushroom|seed\s*sav|wildcraft|herbal|plant\s*medicine/i, "plant"],
  [/hot\s*rod|custom\s*van|trike\s*build|pinewood|derby|ev\s*convers|penny\s*farthing|velomobile|rc\s*car|remote\s*control|rc\s*helic|rc\s*sub|pedal\s*car|cart\s*build|kart\s*build/i, "car"],
  [/canal\s*boat|tall\s*ship|wooden\s*boat|boat\s*build|kayak\s*build|ship\s*model/i, "sailboat"],
  [/dog|cat|rabbit|ferret|rat|hedgehog|sugar\s*glider|tarantula|reptile|gecko|chameleon|snake|axolotl|octopus|canary|parrot|budgie|cockatiel|finch|pet\b|animal\s*keep|falcon|husbandry|obedience|agility|herding|schutz|canicross|flyball|disc\s*dog/i, "birdhouse"],
  [/horse|equestrian|dressage|polo\b|show\s*jump|pony|donkey|mule/i, "trophy"],
  [/bee\s*keep|apiar|honey/i, "pot"],
  [/aquacult|reef\s*keep|saltwater|freshwater\s*tank|vivarium|terrarium|paludarium/i, "fishTank"],
  [/urban\s*farm|permacult|farming|rural|homestead|chicken\s*raising|poultry|goat/i, "wateringCan"],
  [/yoga/i, "mat"],
  [/cooking|kitchen|recipe|gastrono/i, "pot"],
  [/cycling|pedal|unicycle/i, "wheel"],
  // Suffix-based fallbacks for common activity verb patterns
  [/\bmaking\b|\bmak\s*(of|by)\b/i, "hammer"],
  [/\bkeeping\b|raising\b|breeding\b|husbandry/i, "birdhouse"],
  [/\bbuilding\b|\bconstruct/i, "technology"],
  [/\btanning\b|hide\s*process|leather\s*work/i, "anvil"],
  [/tracking|navigation|survival|bushcraft|primitive\s*skill|wilderness/i, "compass"],
  [/charcoal|fire\s*(by|making)|rainwater|biochar|pigment|natural\s*fiber/i, "arts"],
  [/chiptune|retro\s*music|synthwave|video\s*game\s*music/i, "piano"],
  // Generic domain fallbacks
  [/art\b|craft|design|decor/i, "pencil"],
  [/food|drink|eat|cuisine|meal|dessert|snack|diet|nutrition/i, "pot"],
  [/sport|athletic|train(ing)?/i, "sports"],
  [/tech|engineer|maker|hobbyist/i, "technology"],
  [/spirit|religion|faith|belief|mysticism/i, "candle"],
  [/\b(play|playing)\b/i, "games"],

  // fall back to macro categories
  [/^sports?\b|athletic/i, "sports"],
  [/^games?\b/i, "games"],
  [/arts?\s*&\s*crafts?|craft/i, "arts"],
  [/nature|science|animal/i, "nature"],
  [/tech|making|engineer|tool/i, "technology"],
  [/mind|spirit|mystic/i, "mind"],
  [/music|audio|sound/i, "music"],
  [/perform|media|communic/i, "performance"],
  [/photo/i, "photography"],
  [/food|drink/i, "food"],
];

// Deterministic, per-name angle offset so static icons all face a
// different direction and don't look identical.
function seedAngle(name: string): number {
  let h = 2166136261;
  for (let i = 0; i < name.length; i++) {
    h ^= name.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 360) * (Math.PI / 180);
}

import { buildFromSpec, type VoxelSpec } from "./voxelDSL";

export function getVoxelModel(
  name: string,
  categoryName?: string,
  iconVoxels?: VoxelSpec | null
): Vox[] {
  if (iconVoxels) {
    const built = buildFromSpec(iconVoxels);
    if (built && built.length > 0) return built;
  }
  for (const [re, key] of KEYWORDS) if (re.test(name)) return M_ALL[key]();
  // fallback: use the parent category name if provided, so a Music
  // subcategory reads as the guitar rather than the default cube.
  if (categoryName) {
    for (const [re, key] of KEYWORDS)
      if (re.test(categoryName)) return M_ALL[key]();
  }
  return M_ALL.games();
}

export function getStaticAngle(name: string): number {
  return seedAngle(name);
}
