"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
  const [count,   setCount]   = useState(0);
  const [flash,   setFlash]   = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let raf: number;
    const t1 = setTimeout(() => {
      const start    = performance.now();
      const duration = 900;

      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(e * 100));

        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setCount(100);
          setTimeout(() => setFlash(true),   60);
          setTimeout(() => setVisible(false), 200);
        }
      };
      raf = requestAnimationFrame(tick);
    }, 600);

    return () => { clearTimeout(t1); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
          style={{ background: "#03030A" }}
          exit={{ clipPath: "inset(0 0 100% 0)", filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: WIPE }}
        >
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(110,158,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(110,158,255,0.04) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative flex flex-col items-center gap-8 z-10">
            {/* AS monogram SVG */}
            <svg
              viewBox="0 0 130 80"
              width={160}
              height={98}
              fill="none"
              className="loader-monogram"
              style={{
                color: flash ? "#4DFFDF" : "#EEEEF5",
                transition: "color 80ms linear",
                overflow: "visible",
              }}
            >
              <motion.path
                d="M 2,74 L 26,4 L 50,74 M 12,44 L 40,44"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: EXPO }}
              />
              <motion.path
                d="M 88,22 C 83,8 66,9 62,22 C 58,35 74,44 80,49 C 86,54 88,67 82,74 C 76,81 62,78 58,72"
                stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round" fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
              />
              <motion.circle
                cx="108" cy="72" r="4" fill="currentColor"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.22, delay: 0.72, ease: EXPO }}
                style={{ transformOrigin: "108px 72px" }}
              />
            </svg>

            {/* Progress bar */}
            <div
              className="relative overflow-hidden rounded-full"
              style={{ width: 200, height: 1, background: "rgba(110,158,255,0.12)" }}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ background: "linear-gradient(90deg, #6E9EFF, #4DFFDF)" }}
                initial={{ scaleX: 0, originX: "left" }}
                animate={{ scaleX: count / 100 }}
                transition={{ duration: 0.05 }}
              />
              <motion.div
                className="absolute inset-y-0 w-20 rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  left: `${count - 10}%`,
                }}
              />
            </div>

            {/* Counter */}
            <motion.p
              className="font-mono tabular-nums select-none"
              style={{
                fontSize: "11px",
                letterSpacing: "0.2em",
                color: flash ? "#4DFFDF" : "rgba(238,238,245,0.35)",
                transition: "color 80ms linear",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: count > 0 ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {String(count).padStart(2, "0")}
            </motion.p>
          </div>

          {/* Scan line */}
          <motion.div
            className="absolute left-0 right-0 pointer-events-none"
            style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(77,255,223,0.6), transparent)" }}
            animate={{ y: ["-100vh", "100vh"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
