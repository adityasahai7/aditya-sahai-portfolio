"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { unlock } from "@/components/fun/achievements";
import { sfx } from "@/components/fun/sound";

const BOMBS = ["⭐", "💥", "🔥", "✨", "💛", "🎯", "😂", "🤯", "🚀", "🍕", "👀", "🫶"];
type Bomb = { id: number; x: number; y: number; e: string; r: number };

/**
 * The hero name. Letters spring in, then act like fridge magnets: they scatter away
 * from your cursor/finger and spring back. Click/tap to slap stickers on them;
 * 20 stickers and the name explodes and rebuilds.
 */
export function MagnetName({ rows }: { rows: [string, string] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const [bombs, setBombs] = useState<Bomb[]>([]);
  const [boom, setBoom] = useState(0);

  useEffect(() => {
    const h = ref.current;
    if (!h || reduce) return;
    const mags = Array.from(h.querySelectorAll<HTMLElement>(".mag"));
    const state = mags.map(() => ({ x: 0, y: 0, r: 0, tx: 0, ty: 0, tr: 0 }));
    let px = -9999, py = -9999;
    const zone = h.closest("section") ?? h;
    const move = (e: PointerEvent) => { px = e.clientX; py = e.clientY; };
    const leave = () => { px = -9999; py = -9999; };
    zone.addEventListener("pointermove", move as EventListener, { passive: true });
    zone.addEventListener("pointerleave", leave);
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (px < -9000 && state.every((s) => Math.abs(s.x) + Math.abs(s.y) < 0.2)) return;
      mags.forEach((m, i) => {
        const s = state[i];
        const r = m.parentElement!.getBoundingClientRect();
        const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        const dx = cx - px, dy = cy - py;
        const d = Math.hypot(dx, dy);
        const reach = Math.max(120, r.height * 1.3);
        if (d < reach) {
          const f = (1 - d / reach) ** 2;
          s.tx = (dx / (d || 1)) * f * r.height * 0.55;
          s.ty = (dy / (d || 1)) * f * r.height * 0.55;
          s.tr = (dx > 0 ? 1 : -1) * f * 22;
        } else { s.tx = 0; s.ty = 0; s.tr = 0; }
        s.x += (s.tx - s.x) * 0.18; s.y += (s.ty - s.y) * 0.18; s.r += (s.tr - s.r) * 0.18;
        m.style.transform = `translate(${s.x.toFixed(1)}px, ${s.y.toFixed(1)}px) rotate(${s.r.toFixed(1)}deg)`;
      });
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); zone.removeEventListener("pointermove", move as EventListener); zone.removeEventListener("pointerleave", leave); };
  }, [reduce]);

  function bomb(e: React.MouseEvent<HTMLHeadingElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    const next = [...bombs, { id: Date.now(), x: e.clientX - r.left, y: e.clientY - r.top, e: BOMBS[Math.floor(Math.random() * BOMBS.length)], r: Math.random() * 60 - 30 }];
    sfx.pop();
    if (next.length >= 20) {
      setBombs([]);
      setBoom((b) => b + 1);
      sfx.boing();
      unlock("explode");
      return;
    }
    setBombs(next);
  }

  let n = 0;
  return (
    <h1 ref={ref} className="hero-name" aria-label="Aditya Sahai" onClick={bomb} data-cursor="BOMB IT">
      {rows.map((word, row) => (
        <span key={`${word}-${boom}`} className={`hero-row ${row === 1 ? "is-outline" : ""}`}>
          {Array.from(word).map((ch) => {
            const i = n++;
            return (
              <motion.span key={i} className="hero-letter" aria-hidden="true"
                initial={reduce ? false : boom ? { y: (i % 2 ? -1 : 1) * 400, x: ((i * 97) % 300) - 150, rotate: ((i * 53) % 180) - 90, opacity: 0 } : { y: "120%", rotate: 18, opacity: 0 }}
                animate={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: boom ? 90 : 160, damping: boom ? 10 : 13, delay: boom ? 0.2 + i * 0.04 : 0.35 + i * 0.055 }}
                whileHover={{ color: ["#F18179", "#176D70", "#E56AA6", "#F5D46D"][i % 4] }}>
                <span className="mag">{ch}</span>
              </motion.span>
            );
          })}
        </span>
      ))}
      <span className="bomb-layer" aria-hidden="true">
        <AnimatePresence>
          {bombs.map((b) => (
            <motion.span key={b.id} className="bomb" style={{ left: b.x, top: b.y }} initial={{ scale: 3, rotate: b.r - 40, opacity: 0 }} animate={{ scale: 1, rotate: b.r, opacity: 1 }} exit={{ scale: 0, opacity: 0, y: -80 }} transition={{ type: "spring", stiffness: 420, damping: 12 }}>{b.e}</motion.span>
          ))}
        </AnimatePresence>
        {bombs.length > 0 && <span className="bomb-count">{bombs.length}/20 💣</span>}
      </span>
    </h1>
  );
}
