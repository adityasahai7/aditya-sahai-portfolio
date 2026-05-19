"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SECTION_ACCENTS: Record<string, string> = {
  hero:    "#6E9EFF",
  marquee1: "#6E9EFF",
  services: "#6E9EFF",
  marquee2: "#C4A8FF",
  work:    "#6E9EFF",
  marquee3: "#6E9EFF",
  contact: "#C4A8FF",
  footer:  "#6E9EFF",
};

export default function SectionFlash() {
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = flashRef.current;
    if (!el) return;

    // flash must be defined BEFORE gsap.context — ScrollTrigger.create
    // fires onEnter synchronously during init (self.refresh), so the
    // closure would hit the TDZ if flash were declared after ctx.
    const flash = (color: string) => {
      gsap.killTweensOf(el);
      gsap.set(el, { backgroundColor: color, scaleY: 0, transformOrigin: "top center" });
      gsap.to(el, {
        scaleY: 1,
        duration: 0.04,
        ease: "none",
        onComplete: () => {
          gsap.to(el, { scaleY: 0, duration: 0.04, ease: "none" });
        },
      });
    };

    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll("[data-section]");

      sections.forEach((section) => {
        const id = (section as HTMLElement).dataset.section ?? "";
        const color = SECTION_ACCENTS[id] ?? "#FF4D2E";

        ScrollTrigger.create({
          trigger: section,
          start: "top 85%",
          once: false,
          onEnter: () => flash(color),
          onEnterBack: () => flash(color),
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={flashRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 h-1"
      style={{ zIndex: 200, transformOrigin: "top center", transform: "scaleY(0)" }}
    />
  );
}
