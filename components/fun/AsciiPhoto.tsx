"use client";

import { useEffect, useRef } from "react";

const RAMP = " .:-=+*#%@";
const POPS = ["✨", "⭐", "💛", "🔥"];

/**
 * Hover (or press and hold on a phone): the photo turns into live coloured characters
 * sampled from the real image, so it still looks exactly like the photo. A ripple of
 * emoji follows the cursor. Let go and it fades back to the untouched photo.
 */
export function AsciiPhoto({ src, cell = 9 }: { src: string; cell?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.src = src;
    let samples: { r: number; g: number; b: number; l: number }[] = [];
    let cols = 0, rows = 0, W = 0, H = 0;
    let active = false;
    let alpha = 0;
    let mx = -1, my = -1;
    let raf = 0;
    const t0 = performance.now();

    const prepare = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(2, window.devicePixelRatio);
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(W / cell); rows = Math.floor(H / cell);
      const off = document.createElement("canvas");
      off.width = cols; off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      // object-fit: cover crop, same as the <img>
      const s = Math.max(cols / img.width, rows / img.height);
      const dw = img.width * s, dh = img.height * s;
      o.drawImage(img, (cols - dw) / 2, (rows - dh) / 2, dw, dh);
      const data = o.getImageData(0, 0, cols, rows).data;
      samples = [];
      for (let i = 0; i < cols * rows; i++) {
        const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2];
        samples.push({ r, g, b, l: (0.299 * r + 0.587 * g + 0.114 * b) / 255 });
      }
    };

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      alpha += ((active ? 1 : 0) - alpha) * 0.14;
      if (alpha < 0.01 && !active) { canvas.style.opacity = "0"; return; }
      canvas.style.opacity = String(alpha);
      const t = (now - t0) / 1000;
      ctx.fillStyle = "#16191a";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `bold ${cell + 1}px ui-monospace, Menlo, monospace`;
      ctx.textBaseline = "top";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const s = samples[y * cols + x];
          if (!s) continue;
          const px = x * cell, py = y * cell;
          const d = mx < 0 ? 999 : Math.hypot(px - mx, py - my);
          const wave = d < 90 ? Math.sin(d / 9 - t * 8) * (1 - d / 90) * 5 : 0;
          if (d < 26 && (x + y) % 3 === 0) {
            ctx.font = `${cell + 3}px serif`;
            ctx.fillText(POPS[(x * 7 + y) % POPS.length], px - 1, py - 2 + wave);
            ctx.font = `bold ${cell + 1}px ui-monospace, Menlo, monospace`;
            continue;
          }
          const ch = RAMP[Math.min(RAMP.length - 1, Math.floor((0.08 + s.l) * RAMP.length))];
          const lift = 1.25;
          ctx.fillStyle = `rgb(${Math.min(255, s.r * lift)},${Math.min(255, s.g * lift)},${Math.min(255, s.b * lift)})`;
          ctx.fillText(ch, px, py + wave);
        }
      }
    };

    const enter = () => { active = true; };
    const leave = () => { active = false; mx = -1; my = -1; };
    const move = (e: PointerEvent) => { const r = canvas.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    let hold = 0;
    const touchDown = (e: PointerEvent) => { if (e.pointerType !== "mouse") { move(e); hold = window.setTimeout(enter, 220); } };
    const touchUp = (e: PointerEvent) => { if (e.pointerType !== "mouse") { window.clearTimeout(hold); leave(); } };
    const mouseEnter = (e: PointerEvent) => { if (e.pointerType === "mouse") enter(); };
    const mouseLeave = (e: PointerEvent) => { if (e.pointerType === "mouse") leave(); };

    img.onload = () => { prepare(); raf = requestAnimationFrame(draw); };
    host.addEventListener("pointerenter", mouseEnter);
    host.addEventListener("pointerleave", mouseLeave);
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerdown", touchDown);
    host.addEventListener("pointerup", touchUp);
    host.addEventListener("pointercancel", touchUp);
    window.addEventListener("resize", prepare);
    return () => {
      cancelAnimationFrame(raf); window.clearTimeout(hold);
      host.removeEventListener("pointerenter", mouseEnter); host.removeEventListener("pointerleave", mouseLeave);
      host.removeEventListener("pointermove", move); host.removeEventListener("pointerdown", touchDown);
      host.removeEventListener("pointerup", touchUp); host.removeEventListener("pointercancel", touchUp);
      window.removeEventListener("resize", prepare);
    };
  }, [src, cell]);
  return <canvas ref={ref} className="ascii-photo" aria-hidden="true" />;
}
