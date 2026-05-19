"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

interface MarqueeBandProps {
  text: string;
  bgColor: string;
  textColor: string;
  speed?: number;
  sectionId?: string;
}

export default function MarqueeBand({
  text,
  bgColor,
  textColor,
  speed = 30,
  sectionId,
}: MarqueeBandProps) {
  const bandRef      = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Tilt on scroll velocity
  useEffect(() => {
    gsap.registerPlugin(Observer);

    const band = bandRef.current;
    if (!band) return;

    let tilt    = 0;
    let target  = 0;
    let rafId: number;

    const obs = Observer.create({
      target: window,
      type:   "wheel,scroll,touch",
      onChange(self) {
        const vel = (self as any).velocityY ?? 0;
        target = Math.max(-4, Math.min(4, vel * 0.006));
      },
    });

    const tick = () => {
      tilt   += (target - tilt) * 0.08;
      target *= 0.94;
      gsap.set(band, { rotation: tilt, overwrite: "auto" });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      obs.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const repeated = `${text} `.repeat(3);
  const duration = `${speed}s`;

  return (
    <section
      ref={bandRef}
      data-section={sectionId}
      aria-hidden="true"
      className="relative overflow-hidden py-4 md:py-5 select-none marquee-masked"
      style={{
        background: bgColor,
        transformOrigin: "center center",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 18px 80px -42px rgba(0,0,0,0.9)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Animate the container — two identical spans inside create seamless loop at -50% */}
      <div
        ref={trackRef}
        className="flex whitespace-nowrap"
        style={{
          animation: `marquee-scroll ${duration} linear infinite`,
          animationDuration: hovered ? `${speed * 0.55}s` : duration,
          animationPlayState: "running",
          willChange: "transform",
        }}
      >
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-editorial italic pr-4 leading-none shrink-0"
            style={{
              fontSize:      "clamp(72px, 10vw, 160px)",
              color:         textColor,
              letterSpacing: "0",
              textShadow:    "0 0 28px rgba(110,158,255,0.14)",
            }}
          >
            {repeated}
          </span>
        ))}
      </div>
    </section>
  );
}
