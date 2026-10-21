"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import type { Tone } from "@/lib/content";
import { Btn, Label, MaskLines } from "@/components/motion/kit";

export function PageHero({ label, lines, lead, emoji, tone = "paper", accent = -1, size = "mega", children }: { label: string; lines: ReactNode[]; lead?: string; emoji?: string; tone?: Tone; accent?: number; size?: "mega" | "xl" | "lg"; children?: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <section className={`page-hero tone-${tone}`} data-room={tone}>
      <div className="dot-grid" aria-hidden="true" />
      {emoji && (
        <motion.span className="page-hero-emoji" aria-hidden="true" initial={reduce ? false : { scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: [0, 10, -6, 0], y: [0, -14, 0] }}
          transition={{ scale: { type: "spring", stiffness: 180, damping: 10, delay: 0.5 }, rotate: { duration: 5, repeat: Infinity }, y: { duration: 3.4, repeat: Infinity } }}>
          {emoji}
        </motion.span>
      )}
      <div className="wrap" style={{ position: "relative" }}>
        <Label>{label}</Label>
        <MaskLines lines={lines} as="h1" className={`h-${size}`} accent={accent} delay={0.3} />
        {lead && <motion.p className="lead" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>{lead}</motion.p>}
        {children}
      </div>
    </section>
  );
}

export function FlipCards({ items }: { items: { emoji: string; front: string; sub: string; back: ReactNode; tone: Tone }[] }) {
  const [flipped, setFlipped] = useState<number | null>(null);
  return (
    <div className="flip-cards">
      {items.map((it, i) => (
        <motion.button key={it.front} type="button" className="fcard" data-cursor="FLIP" aria-pressed={flipped === i}
          initial={{ y: 100, rotate: [-10, 6, -4][i % 3], opacity: 0 }} whileInView={{ y: 0, rotate: [-2, 1.5, -1][i % 3], opacity: 1 }} viewport={{ once: true, margin: "-10%" }}
          transition={{ type: "spring", stiffness: 100, damping: 14, delay: i * 0.12 }}
          onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(i)} onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(null)} onClick={() => setFlipped(flipped === i ? null : i)}>
          <motion.span className="fcard-inner" animate={{ rotateY: flipped === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 150, damping: 17 }}>
            <span className={`fcard-face tone-${it.tone}`}><span className="card-emoji">{it.emoji}</span><b>{it.front}</b><small>{it.sub} · FLIP ↻</small></span>
            <span className="fcard-face fcard-back">{it.back}</span>
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}

/** The big "leave this site" moment for TBC / FRROST: a giant pulsing button. */
export function ExitDoor({ href, label, note, tone, emoji }: { href: string; label: string; note: string; tone: Tone; emoji: string }) {
  const reduce = useReducedMotion();
  return (
    <section className={`exit-door tone-${tone}`} data-room={tone}>
      <div className="wrap">
        <motion.div animate={reduce ? undefined : { scale: [1, 1.04, 1] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <Btn href={href} tone="ink" size="xl" cursor="ENTER ↗">{emoji} {label} →</Btn>
        </motion.div>
        <p>{note}</p>
      </div>
    </section>
  );
}
