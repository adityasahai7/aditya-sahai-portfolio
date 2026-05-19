"use client";

import { useEffect, useRef } from "react";
import { useScroll, useSpring, useMotionValueEvent } from "framer-motion";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scaleX, "change", (v) => {
    if (barRef.current) {
      barRef.current.style.transform = `scaleX(${v})`;
    }
  });

  return (
    <div
      ref={barRef}
      id="scroll-progress-bar"
      style={{ transform: "scaleX(0)" }}
    />
  );
}
