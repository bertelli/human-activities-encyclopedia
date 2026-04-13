"use client";

import { useEffect, useRef } from "react";

// Each letter is its own 3D voxel object: volumetric cubes with iso shading,
// no rotation, baseline-aligned so every letter lines up horizontally.

const FONT_PX = 20;
const CELL_PX = 6;
const DEPTH = 3;
const ASCENT_PX = Math.round(FONT_PX * 0.78);
const DESCENT_PX = Math.round(FONT_PX * 0.22);
const RASTER_H = ASCENT_PX + DESCENT_PX;

function VoxelLetter({ ch }: { ch: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    // 1. Rasterize this single letter.
    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d")!;
    offCtx.font = `700 ${FONT_PX}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    const W = Math.max(1, Math.ceil(offCtx.measureText(ch).width));
    off.width = W;
    off.height = RASTER_H;
    offCtx.fillStyle = "white";
    offCtx.fillRect(0, 0, W, RASTER_H);
    offCtx.fillStyle = "black";
    offCtx.font = `700 ${FONT_PX}px "Helvetica Neue", Helvetica, Arial, sans-serif`;
    offCtx.textBaseline = "alphabetic";
    offCtx.fillText(ch, 0, ASCENT_PX);

    const img = offCtx.getImageData(0, 0, W, RASTER_H).data;

    // 2. Collect voxels from opaque pixels.
    const vset = new Set<string>();
    const vox: Array<[number, number, number]> = [];
    for (let y = 0; y < RASTER_H; y++) {
      for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        if (img[i] < 128) {
          for (let z = 0; z < DEPTH; z++) {
            const key = `${x},${-y},${z}`;
            if (!vset.has(key)) {
              vset.add(key);
              vox.push([x, -y, z]);
            }
          }
        }
      }
    }

    // 3. Canvas size: same height for every letter (RASTER_H + depth offset),
    // width = letter width + depth offset. Baseline is constant.
    const tilt = 0.45;
    const tc = Math.cos(tilt);
    const ts = Math.sin(tilt);
    const angle = -0.35;
    const ca = Math.cos(angle);
    const sa = Math.sin(angle);

    const depthOffsetX = Math.ceil(DEPTH * Math.abs(sa)) + 1;
    const depthOffsetY = Math.ceil(DEPTH * Math.abs(ts)) + 1;

    const spanX = W + depthOffsetX;
    const spanY = RASTER_H + depthOffsetY;
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

      const rx = x * ca - z * sa;
      const rz = x * sa + z * ca;
      const screenX = rx * CELL_PX;
      // Baseline: y = 0 row sits near bottom, at depth-offset above bottom.
      // Raster y maps to voxel -y; so voxel y ∈ [−(RASTER_H − 1), 0].
      // screenY: we want y=0 (baseline) at Ch − depthOffsetY*CELL_PX.
      const screenY = (-(y * tc - rz * ts) + depthOffsetY) * CELL_PX;
      const depthK = y * ts + rz * tc;
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

    const rightOnScreen = ca >= 0 ? "right" : "left";
    const leftOnScreen = ca >= 0 ? "left" : "right";
    const zRightOnScreen = -sa >= 0 ? "front" : "back";
    const zLeftOnScreen = -sa >= 0 ? "back" : "front";

    const BLOCK = CELL_PX;

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

      for (let dy = 0; dy < BLOCK; dy++)
        for (let dx = 0; dx < BLOCK; dx++) {
          const x = p.sx + dx;
          const y = p.sy + dy - BLOCK;
          if (x < 0 || x >= Cw || y < 0 || y >= Ch) continue;
          const uY = dy / BLOCK;
          const uX = dx / BLOCK;
          let color: string;
          if (uY < 0.4 && p.topVis) {
            color = ((dx + dy) & 1) === 0 ? "#ffffff" : "#d0d0d0";
          } else if (uX < 0.5 && lFaceVis) {
            color = ((dx + dy) & 1) === 0 ? "#888888" : "#707070";
          } else if (uX >= 0.5 && rFaceVis) {
            color = ((dx + dy) & 1) === 0 ? "#505050" : "#383838";
          } else {
            color = "#000000";
          }
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
    }
  }, [ch]);

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
  const chars = Array.from(text);
  return (
    <div className="flex items-end flex-wrap gap-x-2">
      {chars.map((ch, i) =>
        ch === " " ? (
          <span key={i} style={{ width: FONT_PX * CELL_PX * 0.3 }} />
        ) : (
          <VoxelLetter key={`${ch}-${i}`} ch={ch} />
        )
      )}
    </div>
  );
}
