"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sfx } from "./sound";

const STATS: [string, number][] = [["Storytelling", 5], ["Curiosity", 5], ["AI building", 4], ["Taste", 5], ["Chai intake", 5], ["Sleep", 2]];

/** A rare holographic trading card. Rainbow shine follows the cursor (or phone tilt). Tap to flip. */
export function HoloCard() {
  const [flipped, setFlipped] = useState(false);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [14, -14]), { stiffness: 160, damping: 16 });
  const ry = useSpring(useTransform(mx, [0, 1], [-18, 18]), { stiffness: 160, damping: 16 });
  const shine = useTransform([mx, my], ([x, y]) => `${(x as number) * 100}% ${(y as number) * 100}%`);
  const glare = useTransform([mx, my], ([x, y]) => `radial-gradient(circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(255,255,255,0.65), transparent 45%)`);

  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const tilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      mx.set(Math.min(1, Math.max(0, 0.5 + e.gamma / 60)));
      my.set(Math.min(1, Math.max(0, 0.5 + (e.beta - 45) / 60)));
    };
    window.addEventListener("deviceorientation", tilt);
    return () => window.removeEventListener("deviceorientation", tilt);
  }, [mx, my]);

  return (
    <div className="holo-wrap">
      <motion.button type="button" className="holo" data-cursor="FLIP" aria-label="Aditya Sahai trading card, tap to flip"
        style={{ rotateX: rx, rotateY: ry }}
        onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width); my.set((e.clientY - r.top) / r.height); }}
        onPointerLeave={() => { mx.set(0.5); my.set(0.5); }}
        onClick={() => { setFlipped(!flipped); sfx.pop(); }}>
        <motion.span className="holo-inner" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ type: "spring", stiffness: 120, damping: 15 }}>
          <span className="holo-face holo-front">
            <span className="holo-top"><b>ADITYA SAHAI</b><i>⚡ 999 HP</i></span>
            <span className="holo-photo"><Image src="/images/aditya-sahai.webp" alt="" width={360} height={360} /></span>
            <span className="holo-type">CREATIVE AI OPERATOR · 🇮🇳 · ULTRA RARE</span>
            <span className="holo-moves">
              <span><b>🎬 Beyond the Story</b><small>Tells one story that changes a decision.</small></span>
              <span><b>🛠️ Build in Public</b><small>Ships the thing, then shows the receipts.</small></span>
            </span>
            <span className="holo-foot">#001/001 · For Good, Towards Greatness ✨</span>
            <motion.span className="holo-foil" style={{ backgroundPosition: shine }} />
            <motion.span className="holo-glare" style={{ background: glare }} />
          </span>
          <span className="holo-face holo-back">
            <b className="holo-back-title">STATS 📊</b>
            {STATS.map(([k, v]) => (
              <span key={k} className="holo-stat"><span>{k}</span><span>{"⭐".repeat(v)}{"·".repeat(5 - v)}</span></span>
            ))}
            <small className="holo-note">Weakness: a good story at 2am. Strength: everything else.</small>
            <span className="holo-foot">tap to flip back ↻</span>
          </span>
        </motion.span>
      </motion.button>
      <p className="hint" style={{ textAlign: "center" }}>Move over it ✨ · tap to flip</p>
    </div>
  );
}
