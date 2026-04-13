"use client";

import { useEffect, useRef } from "react";

const GLYPHS: Record<string, string[]> = {
  A: [".XXX.", "X...X", "X...X", "XXXXX", "X...X", "X...X", "X...X"],
  C: [".XXXX", "X....", "X....", "X....", "X....", "X....", ".XXXX"],
  D: ["XXXX.", "X...X", "X...X", "X...X", "X...X", "X...X", "XXXX."],
  E: ["XXXXX", "X....", "X....", "XXXX.", "X....", "X....", "XXXXX"],
  F: ["XXXXX", "X....", "X....", "XXXX.", "X....", "X....", "X...."],
  G: [".XXXX", "X....", "X....", "X..XX", "X...X", "X...X", ".XXXX"],
  H: ["X...X", "X...X", "X...X", "XXXXX", "X...X", "X...X", "X...X"],
  I: ["XXX", ".X.", ".X.", ".X.", ".X.", ".X.", "XXX"],
  L: ["X....", "X....", "X....", "X....", "X....", "X....", "XXXXX"],
  M: ["X...X", "XX.XX", "X.X.X", "X.X.X", "X...X", "X...X", "X...X"],
  N: ["X...X", "XX..X", "X.X.X", "X.X.X", "X..XX", "X...X", "X...X"],
  O: [".XXX.", "X...X", "X...X", "X...X", "X...X", "X...X", ".XXX."],
  P: ["XXXX.", "X...X", "X...X", "XXXX.", "X....", "X....", "X...."],
  S: [".XXXX", "X....", "X....", ".XXX.", "....X", "....X", "XXXX."],
  T: ["XXXXX", "..X..", "..X..", "..X..", "..X..", "..X..", "..X.."],
};

const ROWS = 7;
const CELL_PX = 18;
const DEPTH = 5;
const TILT = 0.55;
const TC = Math.cos(TILT);
const TS = Math.sin(TILT);
const ROTATION_DIRECTION = 1; // same direction for every letter
const ROTATION_SPEED = 0.005;

function buildVoxels(rows: string[]): {
  set: Set<string>;
  list: Array<[number, number, number]>;
  w: number;
} {
  const set = new Set<string>();
  const list: Array<[number, number, number]> = [];
  const w = rows[0]?.length ?? 0;
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (rows[r][c] === "X") {
        const x = c - (w - 1) / 2;
        const y = ROWS - 1 - r - (ROWS - 1) / 2;
        for (let zi = 0; zi < DEPTH; zi++) {
          const z = zi - (DEPTH - 1) / 2;
          const key = `${x},${y},${z}`;
          if (!set.has(key)) {
            set.add(key);
            list.push([x, y, z]);
          }
        }
      }
    }
  }
  return { set, list, w };
}

function VoxelLetter({ ch }: { ch: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const glyph = GLYPHS[ch];

  useEffect(() => {
    const cv = ref.current;
    if (!cv || !glyph) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const { set: vset, list: vox, w: gw } = buildVoxels(glyph);

    // Maximum radial extent around the Y axis over all rotations.
    let maxR = 0;
    for (const [x, , z] of vox) {
      const r = Math.hypot(x, z);
      if (r > maxR) maxR = r;
    }
    // Max vertical extent (y is constant across rotation).
    let maxY = 0;
    for (const [, y] of vox) {
      const vy = Math.abs(y * TC + maxR * TS); // worst case contribution from rz
      if (vy > maxY) maxY = vy;
    }

    const padCells = 1;
    const Cw = Math.ceil((maxR * 2 + padCells * 2) * CELL_PX);
    const Ch = Math.ceil((maxY * 2 + padCells * 2) * CELL_PX);
    cv.width = Cw;
    cv.height = Ch;

    let angle = 0;
    let raf = 0;

    const render = () => {
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, Cw, Ch);

      type P = {
        sx: number;
        sy: number;
        depth: number;
        topVis: boolean;
        leftVis: boolean;
        rightVis: boolean;
        frontVis: boolean;
        backVis: boolean;
      };
      const ps: P[] = [];
      const cx = Cw / 2;
      const cy = Ch / 2;
      for (const [x, y, z] of vox) {
        const topVis = !vset.has(`${x},${y + 1},${z}`);
        const botVis = !vset.has(`${x},${y - 1},${z}`);
        const leftVis = !vset.has(`${x - 1},${y},${z}`);
        const rightVis = !vset.has(`${x + 1},${y},${z}`);
        const frontVis = !vset.has(`${x},${y},${z + 1}`);
        const backVis = !vset.has(`${x},${y},${z - 1}`);
        if (
          !topVis &&
          !botVis &&
          !leftVis &&
          !rightVis &&
          !frontVis &&
          !backVis
        )
          continue;

        const rx = x * ca - z * sa;
        const rz = x * sa + z * ca;
        const sx = Math.round(cx + rx * CELL_PX);
        const sy = Math.round(cy - (y * TC - rz * TS) * CELL_PX);
        const depth = y * TS + rz * TC;
        ps.push({
          sx,
          sy,
          depth,
          topVis,
          leftVis,
          rightVis,
          frontVis,
          backVis,
        });
      }
      ps.sort((a, b) => b.depth - a.depth);

      const rightOnScreen = ca >= 0 ? "right" : "left";
      const leftOnScreen = ca >= 0 ? "left" : "right";
      const zRightOnScreen = -sa >= 0 ? "front" : "back";
      const zLeftOnScreen = -sa >= 0 ? "back" : "front";

      for (const p of ps) {
        const rFaceVisA =
          rightOnScreen === "right" ? p.rightVis : p.leftVis;
        const lFaceVisA =
          leftOnScreen === "right" ? p.rightVis : p.leftVis;
        const rFaceVisB =
          zRightOnScreen === "front" ? p.frontVis : p.backVis;
        const lFaceVisB =
          zLeftOnScreen === "front" ? p.frontVis : p.backVis;
        const rFaceVis = rFaceVisA || rFaceVisB;
        const lFaceVis = lFaceVisA || lFaceVisB;

        for (let pdy = 0; pdy < CELL_PX; pdy++) {
          for (let pdx = 0; pdx < CELL_PX; pdx++) {
            const x = p.sx - Math.floor(CELL_PX / 2) + pdx;
            const y = p.sy - Math.floor(CELL_PX / 2) + pdy;
            if (x < 0 || x >= Cw || y < 0 || y >= Ch) continue;
            const uY = pdy / CELL_PX;
            const uX = pdx / CELL_PX;
            let color: string;
            if (uY < 0.4 && p.topVis) {
              color = ((pdx + pdy) & 1) === 0 ? "#ffffff" : "#d0d0d0";
            } else if (uX < 0.5 && lFaceVis) {
              color = ((pdx + pdy) & 1) === 0 ? "#888888" : "#707070";
            } else if (uX >= 0.5 && rFaceVis) {
              color = ((pdx + pdy) & 1) === 0 ? "#505050" : "#383838";
            } else {
              color = "#000000";
            }
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    const loop = () => {
      render();
      angle += ROTATION_SPEED * ROTATION_DIRECTION;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [ch, glyph]);

  if (!glyph) return null;
  return (
    <canvas
      ref={ref}
      style={{
        display: "block",
        imageRendering: "pixelated",
      }}
    />
  );
}

export function VoxelTitle({ text }: { text: string }) {
  const chars = Array.from(text.toUpperCase());
  return (
    <div className="flex items-end flex-wrap">
      {chars.map((ch, i) =>
        ch === " " ? (
          <span
            key={`sp-${i}`}
            style={{ width: CELL_PX * 2, display: "inline-block" }}
          />
        ) : (
          <VoxelLetter key={`${ch}-${i}`} ch={ch} />
        )
      )}
    </div>
  );
}
