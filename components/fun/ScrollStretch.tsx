"use client";

import { useEffect } from "react";
import { getLenis } from "@/components/motion/core";

/** Big headlines stretch and lean with scroll speed (CSS var --stretch on <html>). */
export function ScrollStretch() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let current = 0;
    let target = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const lenis = getLenis();
      let v: number;
      if (lenis) v = lenis.velocity;
      else { const dt = Math.max(1, now - lastT); v = ((window.scrollY - lastY) / dt) * 16; lastY = window.scrollY; lastT = now; }
      target = Math.max(-1, Math.min(1, v / 40));
      current += (target - current) * 0.12;
      if (Math.abs(current) < 0.001) current = 0;
      root.style.setProperty("--stretch", current.toFixed(3));
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); root.style.removeProperty("--stretch"); };
  }, []);
  return null;
}
