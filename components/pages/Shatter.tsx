"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/motion/core";

/** "WHERE IS GROWTH BREAKING?": the last word's letters crack and scatter as you scroll. */
export function Shatter({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".sh-line", { yPercent: 110, rotate: 4, stagger: 0.12, duration: 1, ease: "power4.out", delay: 0.3 });
      gsap.to(".sh-break", {
        x: (i: number) => ((i * 47) % 140) - 70,
        y: (i: number) => 60 + ((i * 31) % 120),
        rotate: (i: number) => ((i * 53) % 90) - 45,
        color: (i: number) => ["#F18179", "#9CE8F2", "#F5D46D", "#BDEFD5"][i % 4],
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 15%", end: "bottom top", scrub: 0.5 },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <h1 ref={ref} className="h-xl shatter" aria-label={lines.join(" ")}>
      {lines.map((line, li) => (
        <span key={line} className="mask-line" aria-hidden="true">
          <span className="sh-line mask-inner">
            {li === lines.length - 1 ? Array.from(line).map((c, i) => <span key={i} className="sh-break" style={{ display: "inline-block" }}>{c}</span>) : line}
          </span>
        </span>
      ))}
    </h1>
  );
}
