"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

/**
 * Hover (or tap) and the letters droop and melt like wax, then snap back.
 * An SVG turbulence + displacement filter whose strength is animated.
 */
export function MeltText({ children, className = "", as: Tag = "span" }: { children: ReactNode; className?: string; as?: "span" | "p" | "h2" | "h3" }) {
  const raw = useId().replace(/:/g, "");
  const id = `melt-${raw}`;
  const ref = useRef<HTMLElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);
  const turb = useRef<SVGFETurbulenceElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let amount = 0, target = 0, raf = 0, seed = 1;
    const loop = () => {
      amount += (target - amount) * (target > amount ? 0.08 : 0.16);
      seed += 0.04;
      disp.current?.setAttribute("scale", amount.toFixed(2));
      turb.current?.setAttribute("seed", String(Math.floor(seed)));
      el.style.filter = amount > 0.3 ? `url(#${id})` : "";
      el.style.transform = `scaleY(${1 + amount / 260})`;
      if (Math.abs(target - amount) > 0.2 || target > 0) raf = requestAnimationFrame(loop);
      else { el.style.filter = ""; el.style.transform = ""; raf = 0; }
    };
    const on = () => { target = 38; if (!raf) raf = requestAnimationFrame(loop); };
    const off = () => { target = 0; if (!raf) raf = requestAnimationFrame(loop); };
    el.addEventListener("pointerenter", on);
    el.addEventListener("pointerleave", off);
    el.addEventListener("pointerdown", on);
    el.addEventListener("pointerup", () => window.setTimeout(off, 500));
    return () => { cancelAnimationFrame(raf); el.removeEventListener("pointerenter", on); el.removeEventListener("pointerleave", off); el.removeEventListener("pointerdown", on); };
  }, [id]);
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id={id} x="-10%" y="-20%" width="120%" height="160%">
          <feTurbulence ref={turb} type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" seed="1" />
          <feDisplacementMap ref={disp} in="SourceGraphic" scale="0" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <Tag ref={ref as never} className={`melt ${className}`} data-cursor="MELT">{children}</Tag>
    </>
  );
}
