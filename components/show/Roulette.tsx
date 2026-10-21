"use client";

import { animate, motion, useMotionValue, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState } from "react";
import { roulette } from "@/lib/content";
import { unlock } from "@/components/fun/achievements";
import { sfx } from "@/components/fun/sound";

const ROW = 64;

function Reel({ items, value, label }: { items: string[]; value: ReturnType<typeof useMotionValue<number>>; label: string }) {
  const y = useTransform(value, (v) => -((v % items.length) + items.length) % items.length * ROW);
  const strip = [...items, ...items, items[0]];
  return (
    <div className="reel" aria-label={label}>
      <motion.div className="reel-strip" style={{ y }}>
        {strip.map((t, i) => <span key={i}>{t}</span>)}
      </motion.div>
    </div>
  );
}

/** Pull the lever: person × topic × twist = a Beyond Default story idea. */
export function Roulette() {
  const a = useMotionValue(0), b = useMotionValue(0), c = useMotionValue(0);
  const [result, setResult] = useState<string[] | null>(null);
  const [spinning, setSpinning] = useState(false);
  const lever = useMotionValue(0);
  const turns = useRef(0);
  const leverRotate = useTransform(lever, [0, 1], [0, 40]);

  async function spin() {
    if (spinning) return;
    setSpinning(true); setResult(null); sfx.click();
    void animate(lever, [0, 1, 0], { duration: 0.6 });
    turns.current += 1;
    const picks = [roulette.people, roulette.topics, roulette.twists].map((list) => Math.floor(Math.random() * list.length));
    const ticker = window.setInterval(() => sfx.click(), 90);
    await Promise.all([a, b, c].map((mv, i) => {
      const list = [roulette.people, roulette.topics, roulette.twists][i];
      const base = Math.floor(mv.get() / list.length) * list.length + list.length * (3 + i);
      return animate(mv, base + picks[i], { duration: 1.6 + i * 0.5, ease: [0.15, 0.85, 0.3, 1.04] });
    }));
    window.clearInterval(ticker);
    sfx.pop();
    setResult([roulette.people[picks[0]], roulette.topics[picks[1]], roulette.twists[picks[2]]]);
    setSpinning(false);
    unlock("roulette");
  }

  const idea = result ? `${result[0]} × ${result[1]}: ${result[2]}` : "";
  return (
    <div className="roulette">
      <div className="slot">
        <div className="slot-top">🎰 STORY ROULETTE 🎰</div>
        <div className="reels">
          <Reel items={roulette.people} value={a} label="Person" />
          <span className="reel-x">×</span>
          <Reel items={roulette.topics} value={b} label="Topic" />
          <span className="reel-x">×</span>
          <Reel items={roulette.twists} value={c} label="Twist" />
        </div>
        <div className="slot-labels"><span>WHO</span><span>WHAT</span><span>TWIST</span></div>
        <motion.button type="button" className="lever" onClick={spin} disabled={spinning} aria-label="Pull the lever" data-cursor="PULL" style={{ rotate: leverRotate }}>
          <span className="lever-ball" />
        </motion.button>
        <button type="button" className="btn btn-red btn-lg slot-btn" onClick={spin} disabled={spinning}>{spinning ? "Spinning… 🎲" : "Spin for a story 🎲"}</button>
      </div>
      {result && (
        <motion.div className="slot-result" initial={{ scale: 0.6, rotate: -8, opacity: 0 }} animate={{ scale: 1, rotate: -2, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 13 }}>
          <small>YOUR BEYOND DEFAULT EPISODE 🎬</small>
          <b>{idea}</b>
          <Link className="btn btn-ink btn-md" href={`/contact?idea=${encodeURIComponent(idea)}`} data-cursor="SUGGEST">Suggest this episode →</Link>
        </motion.div>
      )}
    </div>
  );
}
