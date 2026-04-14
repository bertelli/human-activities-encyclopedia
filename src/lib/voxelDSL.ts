export type Vox = readonly [number, number, number];

export type VoxelPrimitive =
  | {
      type: "filledSphere";
      r: number;
      cx?: number;
      cy?: number;
      cz?: number;
    }
  | { type: "sphere"; r: number; cx?: number; cy?: number; cz?: number }
  | {
      type: "box";
      x: [number, number];
      y: [number, number];
      z: [number, number];
      hollow?: boolean;
    }
  | {
      type: "cylinderY";
      r: number;
      yMin: number;
      yMax: number;
      cx?: number;
      cz?: number;
      hollow?: boolean;
    }
  | {
      type: "cylinderX";
      r: number;
      xMin: number;
      xMax: number;
      cy?: number;
      cz?: number;
      hollow?: boolean;
    }
  | {
      type: "cylinderZ";
      r: number;
      zMin: number;
      zMax: number;
      cx?: number;
      cy?: number;
      hollow?: boolean;
    }
  | { type: "discY"; r: number; y: number; cx?: number; cz?: number }
  | {
      type: "line";
      from: [number, number, number];
      to: [number, number, number];
    };

export type VoxelSpec = {
  primitives: VoxelPrimitive[];
};

function filledSphere(r: number, cx = 0, cy = 0, cz = 0): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let x = -R; x <= R; x++)
    for (let y = -R; y <= R; y++)
      for (let z = -R; z <= R; z++) {
        if (Math.hypot(x, y, z) <= r + 0.3)
          out.push([x + cx, y + cy, z + cz]);
      }
  return out;
}

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

function box(
  x: [number, number],
  y: [number, number],
  z: [number, number],
  hollow = false
): Vox[] {
  const out: Vox[] = [];
  for (let ix = x[0]; ix <= x[1]; ix++)
    for (let iy = y[0]; iy <= y[1]; iy++)
      for (let iz = z[0]; iz <= z[1]; iz++) {
        if (hollow) {
          const atEdge =
            +(ix === x[0] || ix === x[1]) +
            +(iy === y[0] || iy === y[1]) +
            +(iz === z[0] || iz === z[1]);
          if (atEdge < 2) continue;
        }
        out.push([ix, iy, iz]);
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

function cylinderX(
  r: number,
  xMin: number,
  xMax: number,
  cy = 0,
  cz = 0,
  hollow = false
): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let y = -R; y <= R; y++)
    for (let z = -R; z <= R; z++) {
      const d = Math.hypot(y, z);
      if (d > r + 0.3) continue;
      if (hollow && d < r - 1) continue;
      for (let x = xMin; x <= xMax; x++) out.push([x, y + cy, z + cz]);
    }
  return out;
}

function cylinderZ(
  r: number,
  zMin: number,
  zMax: number,
  cx = 0,
  cy = 0,
  hollow = false
): Vox[] {
  const out: Vox[] = [];
  const R = Math.ceil(r);
  for (let x = -R; x <= R; x++)
    for (let y = -R; y <= R; y++) {
      const d = Math.hypot(x, y);
      if (d > r + 0.3) continue;
      if (hollow && d < r - 1) continue;
      for (let z = zMin; z <= zMax; z++) out.push([x + cx, y + cy, z]);
    }
  return out;
}

function discY(r: number, y: number, cx = 0, cz = 0): Vox[] {
  return cylinderY(r, y, y, cx, cz);
}

function line(
  from: [number, number, number],
  to: [number, number, number]
): Vox[] {
  const [x1, y1, z1] = from;
  const [x2, y2, z2] = to;
  const steps =
    Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), Math.abs(z2 - z1)) + 1;
  const out: Vox[] = [];
  for (let i = 0; i < steps; i++) {
    const t = steps === 1 ? 0 : i / (steps - 1);
    out.push([
      Math.round(x1 + (x2 - x1) * t),
      Math.round(y1 + (y2 - y1) * t),
      Math.round(z1 + (z2 - z1) * t),
    ]);
  }
  return out;
}

function clampCoord(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.max(-24, Math.min(24, Math.round(n)));
}

function dedupe(voxels: Vox[]): Vox[] {
  const seen = new Set<string>();
  const out: Vox[] = [];
  for (const [x, y, z] of voxels) {
    const k = `${x},${y},${z}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push([x, y, z]);
  }
  return out;
}

export function buildFromSpec(spec: VoxelSpec | unknown): Vox[] | null {
  if (!spec || typeof spec !== "object") return null;
  const prims = (spec as VoxelSpec).primitives;
  if (!Array.isArray(prims) || prims.length === 0) return null;

  const MAX_VOXELS = 40_000;
  let out: Vox[] = [];
  for (const p of prims) {
    if (!p || typeof p !== "object") continue;
    const chunk: Vox[] = (() => {
      try {
        switch (p.type) {
          case "filledSphere":
            return filledSphere(+p.r, p.cx ?? 0, p.cy ?? 0, p.cz ?? 0);
          case "sphere":
            return sphere(+p.r, p.cx ?? 0, p.cy ?? 0, p.cz ?? 0);
          case "box":
            return box(
              [+p.x[0], +p.x[1]],
              [+p.y[0], +p.y[1]],
              [+p.z[0], +p.z[1]],
              !!p.hollow
            );
          case "cylinderY":
            return cylinderY(
              +p.r,
              +p.yMin,
              +p.yMax,
              p.cx ?? 0,
              p.cz ?? 0,
              !!p.hollow
            );
          case "cylinderX":
            return cylinderX(
              +p.r,
              +p.xMin,
              +p.xMax,
              p.cy ?? 0,
              p.cz ?? 0,
              !!p.hollow
            );
          case "cylinderZ":
            return cylinderZ(
              +p.r,
              +p.zMin,
              +p.zMax,
              p.cx ?? 0,
              p.cy ?? 0,
              !!p.hollow
            );
          case "discY":
            return discY(+p.r, +p.y, p.cx ?? 0, p.cz ?? 0);
          case "line":
            return line(p.from, p.to);
          default:
            return [];
        }
      } catch {
        return [];
      }
    })();
    for (const [x, y, z] of chunk) {
      out.push([clampCoord(x), clampCoord(y), clampCoord(z)]);
      if (out.length > MAX_VOXELS) break;
    }
    if (out.length > MAX_VOXELS) break;
  }

  out = dedupe(out);
  return out.length > 0 ? out : null;
}
