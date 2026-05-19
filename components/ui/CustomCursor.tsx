"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { CursorState } from "@/types";

const RING_SIZE: Record<CursorState, number> = {
  default: 32,
  link:    56,
  drag:    56,
  view:    110,
  text:    28,
};

const RING_STYLE: Record<CursorState, { bg: string; border: string }> = {
  default: { bg: "transparent",            border: "rgba(238,238,245,0.30)" },
  link:    { bg: "rgba(77,255,223,0.08)",  border: "rgba(77,255,223,0.70)"  },
  drag:    { bg: "rgba(123,94,167,0.14)",  border: "rgba(196,168,255,0.70)" },
  view:    { bg: "rgba(77,255,223,0.10)",  border: "rgba(77,255,223,0.70)"  },
  text:    { bg: "transparent",            border: "rgba(238,238,245,0.35)" },
};

const LABELS: Partial<Record<CursorState, string>> = { drag: "DRAG", view: "VIEW" };

/* Trail spring configs — declared outside component to avoid re-creation */
const T_CFG = [
  { stiffness: 72, damping: 16, mass: 0.85 },
  { stiffness: 64, damping: 16, mass: 0.88 },
  { stiffness: 56, damping: 15, mass: 0.90 },
  { stiffness: 48, damping: 15, mass: 0.93 },
  { stiffness: 40, damping: 14, mass: 0.96 },
  { stiffness: 32, damping: 14, mass: 1.00 },
];

export default function CustomCursor() {
  const [ready,   setReady]   = useState(false);
  const [visible, setVisible] = useState(false);
  const [state,   setState]   = useState<CursorState>("default");
  const isTouch = useRef(false);

  const mx = useMotionValue(-300);
  const my = useMotionValue(-300);

  /* ── Core springs ── */
  const dotX  = useSpring(mx, { stiffness: 600, damping: 34, mass: 0.15 });
  const dotY  = useSpring(my, { stiffness: 600, damping: 34, mass: 0.15 });
  const ringX = useSpring(mx, { stiffness: 100, damping: 14, mass: 1.0 });
  const ringY = useSpring(my, { stiffness: 100, damping: 14, mass: 1.0 });
  const glowX = useSpring(mx, { stiffness: 40,  damping: 12, mass: 1.2 });
  const glowY = useSpring(my, { stiffness: 40,  damping: 12, mass: 1.2 });

  /* ── Trail springs — each at top level (React hooks rule) ── */
  const t0x = useSpring(mx, T_CFG[0]);
  const t0y = useSpring(my, T_CFG[0]);
  const t1x = useSpring(mx, T_CFG[1]);
  const t1y = useSpring(my, T_CFG[1]);
  const t2x = useSpring(mx, T_CFG[2]);
  const t2y = useSpring(my, T_CFG[2]);
  const t3x = useSpring(mx, T_CFG[3]);
  const t3y = useSpring(my, T_CFG[3]);
  const t4x = useSpring(mx, T_CFG[4]);
  const t4y = useSpring(my, T_CFG[4]);
  const t5x = useSpring(mx, T_CFG[5]);
  const t5y = useSpring(my, T_CFG[5]);

  const trails = [
    { x: t0x, y: t0y },
    { x: t1x, y: t1y },
    { x: t2x, y: t2y },
    { x: t3x, y: t3y },
    { x: t4x, y: t4y },
    { x: t5x, y: t5y },
  ];

  useEffect(() => {
    setReady(true);
    isTouch.current = window.matchMedia("(hover: none)").matches;
    if (isTouch.current) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      setVisible(true);

      const el     = e.target as HTMLElement;
      const cursor = el.closest("[data-cursor]") as HTMLElement | null;

      if (cursor) {
        setState((cursor.dataset.cursor as CursorState) ?? "default");
      } else if (el.closest("a, button, [role='button']")) {
        setState("link");
      } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        setState("text");
      } else {
        setState("default");
      }
    };

    document.addEventListener("mousemove",  onMove);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));
    return () => document.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  if (!ready || isTouch.current) return null;

  const { bg, border } = RING_STYLE[state];
  const label          = LABELS[state];
  const isText         = state === "text";
  const isLink         = state === "link";

  return (
    <div
      className="pointer-events-none fixed inset-0 select-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    >
      {/* ── Trail dots ── */}
      {trails.map(({ x, y }, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            x,
            y,
            translateX: "-50%",
            translateY: "-50%",
            width:   `${5 - i * 0.6}px`,
            height:  `${5 - i * 0.6}px`,
            background: "rgba(110,158,255,0.55)",
            opacity: visible ? Math.max(0, 0.30 - i * 0.04) : 0,
            transition: "opacity 0.3s ease",
          }}
        />
      ))}

      {/* ── Ghost glow — most lag ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          x: glowX, y: glowY,
          translateX: "-50%", translateY: "-50%",
          width:  RING_SIZE[state] * 3.5,
          height: RING_SIZE[state] * 3.5,
          background: state !== "default"
            ? `radial-gradient(circle, ${bg.replace(/[\d.]+\)$/, "0.06)")} 0%, transparent 70%)`
            : "none",
          opacity: visible ? 1 : 0,
          transition: "width 0.4s ease, height 0.4s ease",
        }}
      />

      {/* ── Ring — medium lag ── */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center overflow-hidden"
        style={{
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          backgroundColor: bg,
          opacity: visible ? 1 : 0,
          backdropFilter: state !== "default" ? "blur(4px)" : "none",
        }}
        animate={{
          width:       RING_SIZE[state],
          height:      RING_SIZE[state],
          backgroundColor: bg,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Dashed spinning border for link state */}
        {isLink ? (
          <div
            className="cursor-ring-dashed absolute inset-0 rounded-full"
            style={{ border: `1.5px dashed rgba(77,255,223,0.75)` }}
          />
        ) : (
          <div
            className="absolute inset-0 rounded-full"
            style={{ border: `1px solid ${border}` }}
          />
        )}

        {label && (
          <span className="relative z-10 font-mono text-[8px] tracking-[0.16em] uppercase" style={{ color: "#4DFFDF" }}>
            {label}
          </span>
        )}
      </motion.div>

      {/* ── Dot — snappy ── */}
      <motion.div
        className="absolute"
        style={{
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          width:  isText ? 2 : 6,
          height: isText ? 20 : 6,
          borderRadius: isText ? 2 : 999,
          backgroundColor: isText
            ? "rgba(238,238,245,0.7)"
            : isLink
            ? "#4DFFDF"
            : "#4DFFDF",
          boxShadow: isText ? "none" : "0 0 10px rgba(77,255,223,0.8)",
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
