"use client";

import { motion, useReducedMotion } from "motion/react";

/** A rubber stamp that slams down when it scrolls into view. */
export function Stamp({ text, tone = "red" }: { text: string; tone?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={`script-stamp tone-${tone}`} initial={reduce ? false : { scale: 3.2, opacity: 0, rotate: -30 }} whileInView={{ scale: 1, opacity: 1, rotate: -8 }} viewport={{ once: true, margin: "-20%" }} transition={{ type: "spring", stiffness: 320, damping: 14, delay: 0.5 }}>
      {text}
    </motion.div>
  );
}
