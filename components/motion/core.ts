"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const ease = [0.22, 1, 0.36, 1] as const;
export const TONES = ["#176D70", "#38A997", "#F5D46D", "#F18179", "#E56AA6", "#9CE8F2", "#BDEFD5"];
export const FILLS = ["#176D70", "#F5D46D", "#F18179", "#E56AA6", "#38A997", "#202727", "#9CE8F2"];
/** Fill colours that would vanish on each section background. */
export const CLASHES: Record<string, string[]> = {
  yellow: ["#F5D46D"], red: ["#F18179", "#E56AA6"], fuchsia: ["#E56AA6", "#F18179"], cyan: ["#9CE8F2"], mint: ["#38A997", "#9CE8F2"],
  ink: ["#202727", "#176D70"], teal: ["#176D70", "#38A997"], sea: ["#38A997", "#176D70"], paper: ["#9CE8F2", "#F5D46D"],
};

export const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
export const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;
export const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 900px)").matches;

let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || reducedMotion()) return lenis;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.2 });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo(0, 0);
}

export function getLenis() {
  return lenis;
}

export { gsap, ScrollTrigger };
