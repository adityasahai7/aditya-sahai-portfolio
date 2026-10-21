"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/components/motion/core";

const STRIPES = ["#176D70", "#F5D46D", "#F18179", "#BDEFD5"];

/** (Opacity only: a transform here would break GSAP pinning.)
 * Every navigation: four colour stripes wipe off the screen to reveal the new page. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <div className="wipe" aria-hidden="true">
          {STRIPES.map((color, i) => (
            <motion.span key={color} style={{ background: color }} initial={{ scaleY: 1 }} animate={{ scaleY: 0 }} transition={{ duration: 0.7, delay: 0.05 + i * 0.07, ease }} />
          ))}
        </div>
      )}
      <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: reduce ? 0 : 0.25, ease }}>
        {children}
      </motion.div>
    </>
  );
}
