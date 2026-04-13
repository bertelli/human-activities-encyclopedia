"use client";

import { useEffect, useRef } from "react";
import { getVoxelModel, getStaticAngle } from "@/lib/voxelModels";

export function CategoryIcon({
  name,
  categoryName,
  size = "sm",
  animated = true,
}: {
  name: string;
  categoryName?: string;
  size?: "sm" | "lg" | "xs";
  animated?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const displayPx = size === "lg" ? 260 : size === "xs" ? 36 : 56;
  const internalPx = size === "lg" ? 200 : size === "xs" ? 60 : 96;

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const model = getVoxelModel(name, categoryName);
    const vset = new Set<string>();
    for (const [x, y, z] of model) vset.add(`${x},${y},${z}`);

    // Scale is fixed — based on the model's static bounding radius, not
    // re-computed per frame (which would cause pulsing zoom).
    let modelRadius = 0;
    for (const [x, y, z] of model) {
      const r = Math.hypot(x, y, z);
      if (r > modelRadius) modelRadius = r;
    }
    let angle = animated ? 0 : getStaticAngle(name);
    let raf = 0;

    const render = () => {
      const W = cv.width;
      const H = cv.height;
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, W, H);

      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const tilt = 0.55; // radians, fixed camera tilt
      const tc = Math.cos(tilt);
      const ts = Math.sin(tilt);

      const scale = (Math.min(W, H) * 0.42) / Math.max(1, modelRadius);
      const cx = W / 2;
      const cy = H / 2;

      // Filter to SURFACE voxels only (at least one neighbor missing).
      // Then project each as a solid iso-cube stamp whose pixel size
      // matches the voxel spacing (so neighbors tile without gaps).
      type P = {
        sx: number;
        sy: number;
        depth: number;
        topVis: boolean;
        leftVis: boolean;  // world -X
        rightVis: boolean; // world +X
        frontVis: boolean; // world +Z
        backVis: boolean;  // world -Z
      };
      const ps: P[] = [];
      for (const [x, y, z] of model) {
        const topVis = !vset.has(`${x},${y + 1},${z}`);
        const botVis = !vset.has(`${x},${y - 1},${z}`);
        const leftVis = !vset.has(`${x - 1},${y},${z}`);
        const rightVis = !vset.has(`${x + 1},${y},${z}`);
        const frontVis = !vset.has(`${x},${y},${z + 1}`);
        const backVis = !vset.has(`${x},${y},${z - 1}`);
        if (
          !topVis && !botVis && !leftVis && !rightVis && !frontVis && !backVis
        )
          continue; // deep interior — skip entirely

        const rx = x * cos - z * sin;
        const rz = x * sin + z * cos;
        const sx = Math.round(cx + rx * scale);
        const sy = Math.round(cy - (y * tc - rz * ts) * scale);
        const depth = y * ts + rz * tc;
        ps.push({ sx, sy, depth, topVis, leftVis, rightVis, frontVis, backVis });
      }
      ps.sort((a, b) => b.depth - a.depth);

      const zbuf = new Float32Array(W * H);
      zbuf.fill(-Infinity);

      // Block size = voxel spacing on screen. ceil(scale) so blocks tile.
      const BLOCK = Math.max(2, Math.ceil(scale));
      // Which of the rotated side faces currently points to screen-right vs
      // screen-left? After Y rotation, the +X axis maps to screen-x = cos(a),
      // screen-depth = sin(a). If cos(a) > 0, +X face is on screen right;
      // otherwise −X is on screen right.
      const rightOnScreen = cos >= 0 ? "right" : "left";
      const leftOnScreen = cos >= 0 ? "left" : "right";
      // Z axis: similar — +Z maps to screen-x = -sin(a) after the standard
      // rotation used above.
      const zRightOnScreen = -sin >= 0 ? "front" : "back";
      const zLeftOnScreen = -sin >= 0 ? "back" : "front";

      for (const p of ps) {
        // Pick which world-face is visually on the right and left of screen
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

        for (let dy = 0; dy < BLOCK; dy++)
          for (let dx = 0; dx < BLOCK; dx++) {
            const x = p.sx - Math.floor(BLOCK / 2) + dx;
            const y = p.sy - Math.floor(BLOCK / 2) + dy;
            if (x < 0 || x >= W || y < 0 || y >= H) continue;
            const idx = y * W + x;
            if (p.depth <= zbuf[idx]) continue;
            zbuf[idx] = p.depth;

            // iso-cube shading within the block:
            //   top 40% of pixels = top face
            //   bottom 60%, left half = left face
            //   bottom 60%, right half = right face
            const uY = dy / BLOCK; // 0 top → 1 bottom
            const uX = dx / BLOCK; // 0 left → 1 right

            let color: string;
            if (uY < 0.4 && p.topVis) {
              // top face, dither light/medium by position
              color = ((dx + dy) & 1) === 0 ? "#ffffff" : "#d0d0d0";
            } else if (uX < 0.5 && lFaceVis) {
              color = ((dx + dy) & 1) === 0 ? "#888888" : "#707070";
            } else if (uX >= 0.5 && rFaceVis) {
              color = ((dx + dy) & 1) === 0 ? "#505050" : "#383838";
            } else {
              // edge / occluded corner — deep outline
              color = "#000000";
            }

            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
          }
      }
    };

    if (!animated) {
      render();
      return;
    }
    const direction = Math.random() < 0.5 ? -1 : 1;
    const loop = () => {
      render();
      angle += 0.005 * direction;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [name, categoryName, animated]);

  return (
    <canvas
      ref={ref}
      width={internalPx}
      height={internalPx}
      style={{
        width: `${displayPx}px`,
        height: `${displayPx}px`,
        imageRendering: "pixelated",
      }}
    />
  );
}
