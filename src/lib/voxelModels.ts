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
};

const M_ALL = { ...M, ...EXTRA } as const;

// ──────────────────────────────────────────────────────────────
// Keyword → model mapping. First match wins. Order matters: put
// specific matches before generic ones.
// ──────────────────────────────────────────────────────────────
const KEYWORDS: Array<[RegExp, keyof typeof M_ALL]> = [
  // specific sports / activities
  [/chess|checker|go\b|backgammon/i, "chessPiece"],
  [/rubik/i, "games"],
  [/cycl|bik(e|ing)|roller\s*skat|skateboard/i, "wheel"],
  [/axe\s*throw|axe\b|hatchet|chop/i, "axe"],
  [/golf|baseball|cricket|hocke/i, "bat"],
  [/tennis|badminton|pickleball|squash|racquet|racket|ping\s*pong|pong/i, "racket"],
  [/bowl|billiard|pool\b|darts/i, "ball"],
  [/bow|archery|arrow/i, "bow"],
  [/box(ing)?|kickbox|judo|karate|taekwon|jiu[\s-]?jitsu|wrestl|martial|fencing/i, "fist"],
  [/fish/i, "fishing"],
  [/archery/i, "bow"],
  [/camp/i, "tent"],
  [/hik|backpack|trek|mountain/i, "backpack"],
  [/bird|watch/i, "binoculars"],
  [/telescop|astron|stargaz/i, "telescope"],
  [/yoga|pilates|acroyoga/i, "mat"],
  [/meditat|mindfulness|zen/i, "stones"],
  [/plant|garden|bonsai|hydropon|mycolog|forage|aquascap/i, "plant"],
  [/controll|gaming|video\s*game|esport|larp|role[\s-]?play|cosplay/i, "controller"],
  [/pottery|ceramic|glassblow|sculpt|candle\s*mak/i, "vase"],
  [/knit|crochet|embroid|quilt|sew|yarn|cross[\s-]?stitch|macrame/i, "yarnBall"],
  [/piano|keyboard|dj|organ|accordion|harpsichord|synth/i, "piano"],
  [/guitar|violin|cello|bass|sitar|ukulele|banjo|mandolin|harp|fiddle|lute|instrument|band|sing|choir|record|flute|clarinet|oboe|saxo|trumpet|trombone|tuba|horn|drum|percuss|tabla|bongo/i, "music"],
  [/cook|bak|bread|brew|kombucha|coffee|tea/i, "pot"],
  [/wine|beer|spirit|cocktail/i, "bottle"],
  [/draw|paint|sketch|callig|pyrograph|illustrat|anim|nail\s*art/i, "pencil"],
  [/car\b|auto|drift|racing|motorcy|motor/i, "wheel"],
  [/photo|camera|film|video/i, "photography"],
  [/writ|journal|blog|poetry|liter|read/i, "writing"],
  [/gun|rifle|pistol|airsoft|paintball|hunt|shoot|target/i, "gun"],
  [/climb|boulder/i, "stones"],
  [/alpine|downhill|ski(ing)?|nordic|cross[\s-]?country/i, "skis"],
  [/snowboard|surf|kite|wake|paddle\s*board/i, "bat"],
  [/swim|dive|kayak|canoe|sail|paddl/i, "fishing"],
  [/run|jog|marathon|sprint/i, "ball"],
  [/weight|lift|gym|body|calisth|fitness|dumbbell|barbell/i, "sports"],
  [/board\s*games?|card|poker|jigsaw|puzzle/i, "games"],
  [/collect|antique|coin|stamp|ephemer/i, "collecting"],
  [/3d\s*print|blacksmith|metalwork|lockp|lego|model|electron/i, "technology"],
  [/genealogy|research|astrology|geocach|ghost|lang|learn/i, "writing"],
  [/comed|act|stand[\s-]?up|theat|mime|danc/i, "performance"],
  [/home\s*impro|diy|woodwork|leather|soap|origami|scrapbook/i, "arts"],

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

export function getVoxelModel(name: string, categoryName?: string): Vox[] {
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
