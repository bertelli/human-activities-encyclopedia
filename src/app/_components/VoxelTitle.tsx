"use client";

import { useEffect, useRef } from "react";

// Bitmap font: each glyph is a 5-wide × 7-tall grid (I is 3-wide).
// 'X' = filled cube, '.' = empty.
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
const CELL_PX = 24;
const DEPTH = 7;

// Steep top-down view: camera looking down onto the letters.
const TILT = 1.1;
const TC = Math.cos(TILT);
const TS = Math.sin(TILT);
const ANGLE = -0.35;
const CA = Math.cos(ANGLE);
const SA = Math.sin(ANGLE);

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
        for (let z = 0; z < DEPTH; z++) {
          const y = ROWS - 1 - r; // row 0 (top of glyph) -> y = ROWS-1
          const key = `${c},${y},${z}`;
          if (!set.has(key)) {
            set.add(key);
            list.push([c, y, z]);
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

    const { set: vset, list: vox, w: W } = buildVoxels(glyph);

    const dx = Math.ceil(DEPTH * Math.abs(SA));
    const dy = Math.ceil(DEPTH * Math.abs(TS));
    const spanX = W + dx;
    const spanY = ROWS + dy;
    const Cw = spanX * CELL_PX;
    const Ch = spanY * CELL_PX;
    cv.width = Cw;
    cv.height = Ch;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, Cw, Ch);

    if (vox.length === 0) return;

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
    for (const [x, y, z] of vox) {
      const topVis = !vset.has(`${x},${y + 1},${z}`);
      const botVis = !vset.has(`${x},${y - 1},${z}`);
      const leftVis = !vset.has(`${x - 1},${y},${z}`);
      const rightVis = !vset.has(`${x + 1},${y},${z}`);
      const frontVis = !vset.has(`${x},${y},${z + 1}`);
      const backVis = !vset.has(`${x},${y},${z - 1}`);
      if (!topVis && !botVis && !leftVis && !rightVis && !frontVis && !backVis)
        continue;

      const rx = x * CA - z * SA;
      const rz = x * SA + z * CA;
      const screenX = rx * CELL_PX;
      // Y up: larger y → higher on screen (smaller sy). Baseline y=0 sits
      // near bottom of canvas (at Ch - dy*CELL_PX).
      const screenY = Ch - dy * CELL_PX - (y * TC - rz * TS) * CELL_PX;
      const depthK = y * TS + rz * TC;
      ps.push({
        sx: Math.round(screenX),
        sy: Math.round(screenY),
        depth: depthK,
        topVis,
        leftVis,
        rightVis,
        frontVis,
        backVis,
      });
    }
    ps.sort((a, b) => b.depth - a.depth);

    const rightOnScreen = CA >= 0 ? "right" : "left";
    const leftOnScreen = CA >= 0 ? "left" : "right";
    const zRightOnScreen = -SA >= 0 ? "front" : "back";
    const zLeftOnScreen = -SA >= 0 ? "back" : "front";

    for (const p of ps) {
      const rFaceVisA =
        rightOnScreen === "right" ? p.rightVis : p.leftVis;
      const lFaceVisA = leftOnScreen === "right" ? p.rightVis : p.leftVis;
      const rFaceVisB =
        zRightOnScreen === "front" ? p.frontVis : p.backVis;
      const lFaceVisB =
        zLeftOnScreen === "front" ? p.frontVis : p.backVis;
      const rFaceVis = rFaceVisA || rFaceVisB;
      const lFaceVis = lFaceVisA || lFaceVisB;

      for (let pdy = 0; pdy < CELL_PX; pdy++) {
        for (let pdx = 0; pdx < CELL_PX; pdx++) {
          // Place block so (p.sx, p.sy) is the bottom-left of this cube on
          // the iso diamond top face (like CategoryIcon centering).
          const x = p.sx + pdx;
          const y = p.sy - CELL_PX + pdy;
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
