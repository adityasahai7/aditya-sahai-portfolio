"use client";

import { motion, useReducedMotion } from "motion/react";

/** The hero name, in blue. Letters rise in once, then stay still. */
export function MagnetName({ rows }: { rows: [string, string] }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <h1 className="hero-name" aria-label="Aditya Sahai">
      {rows.map((word) => (
        <span key={word} className="hero-row">
          {Array.from(word).map((ch) => {
            const i = n++;
            return (
              <motion.span key={i} className="hero-letter" aria-hidden="true"
                initial={reduce ? false : { y: "110%", opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.04 }}>
                {ch}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}
