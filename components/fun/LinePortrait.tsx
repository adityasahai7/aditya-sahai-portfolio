"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/components/motion/core";

type Stroke = number[]; // flat [x0,y0,x1,y1,...]

/** Trace the photo's edges (Sobel) and chain them into pen strokes, top to bottom. */
function traceStrokes(img: HTMLImageElement, size: number): Stroke[] {
  const c = document.createElement("canvas");
  c.width = size; c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const s = Math.max(size / img.width, size / img.height);
  ctx.drawImage(img, (size - img.width * s) / 2, (size - img.height * s) / 2, img.width * s, img.height * s);
  const d = ctx.getImageData(0, 0, size, size).data;
  const g = new Float32Array(size * size);
  for (let i = 0; i < size * size; i++) g[i] = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2];
  // light blur to kill skin noise
  const b = new Float32Array(size * size);
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    let sum = 0;
    for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) sum += g[(y + j) * size + x + i];
    b[y * size + x] = sum / 9;
  }
  const mag = new Float32Array(size * size);
  let max = 0;
  for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
    const p = (xx: number, yy: number) => b[yy * size + xx];
    const gx = -p(x - 1, y - 1) - 2 * p(x - 1, y) - p(x - 1, y + 1) + p(x + 1, y - 1) + 2 * p(x + 1, y) + p(x + 1, y + 1);
    const gy = -p(x - 1, y - 1) - 2 * p(x, y - 1) - p(x + 1, y - 1) + p(x - 1, y + 1) + 2 * p(x, y + 1) + p(x + 1, y + 1);
    const m = Math.hypot(gx, gy);
    mag[y * size + x] = m;
    if (m > max) max = m;
  }
  const edge = new Uint8Array(size * size);
  const thr = max * 0.12;
  for (let i = 0; i < size * size; i++) { const x = i % size, y = (i / size) | 0; edge[i] = mag[i] > thr && x > 4 && y > 4 && x < size - 5 && y < size - 5 ? 1 : 0; }
  // greedy chaining into strokes
  const strokes: Stroke[] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (!edge[y * size + x]) continue;
    const stroke: Stroke = [x, y];
    edge[y * size + x] = 0;
    let cx = x, cy = y;
    for (let steps = 0; steps < 400; steps++) {
      let found = false;
      for (const [dx, dy] of [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [1, -1], [0, -1], [-1, -1], [2, 0], [0, 2], [2, 2], [-2, 2]]) {
        const nx = cx + dx, ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= size || ny >= size || !edge[ny * size + nx]) continue;
        edge[ny * size + nx] = 0; cx = nx; cy = ny; stroke.push(nx, ny); found = true; break;
      }
      if (!found) break;
    }
    if (stroke.length >= 8) strokes.push(stroke);
  }
  return strokes;
}

/** A line drawing of the real photo that draws itself as you scroll through the section. */
export function LinePortrait({ src }: { src: string }) {
  const section = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = section.current, cv = canvas.current;
    if (!el || !cv) return;
    const SIZE = 260;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = cv.getContext("2d")!;
    let strokes: Stroke[] = [];
    let total = 0;
    let drawnTo = -1;
    const render = (p: number) => {
      const target = Math.floor(total * p);
      if (target === drawnTo) return;
      const dpr = Math.min(2, window.devicePixelRatio);
      const px = cv.clientWidth;
      if (cv.width !== px * dpr) { cv.width = px * dpr; cv.height = px * dpr; drawnTo = -1; }
      const k = (px / SIZE) * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.setTransform(k, 0, 0, k, 0, 0);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.strokeStyle = "#202727"; ctx.lineWidth = 0.9;
      let count = 0;
      for (const s of strokes) {
        if (count >= target) break;
        ctx.beginPath(); ctx.moveTo(s[0], s[1]);
        for (let i = 2; i < s.length; i += 2) ctx.lineTo(s[i], s[i + 1]);
        ctx.stroke();
        count += s.length / 2;
      }
      drawnTo = target;
    };
    const img = new Image();
    img.src = src;
    let st: ScrollTrigger | null = null;
    img.onload = () => {
      strokes = traceStrokes(img, SIZE);
      total = strokes.reduce((n, s) => n + s.length / 2, 0);
      if (reduce) { render(1); return; }
      st = ScrollTrigger.create({ trigger: el, start: "top 85%", end: "bottom 45%", onUpdate: (self) => render(self.progress) });
      render(st.progress);
    };
    return () => st?.kill();
  }, [src]);
  return (
    <div ref={section} className="line-portrait">
      <canvas ref={canvas} aria-label="A line drawing of Aditya that draws itself as you scroll" />
    </div>
  );
}
