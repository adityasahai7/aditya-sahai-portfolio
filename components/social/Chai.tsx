"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { unlock } from "@/components/fun/achievements";
import { sfx } from "@/components/fun/sound";

/** "Buy Aditya a virtual chai": a real, live, shared count. */
export function Chai() {
  const [count, setCount] = useState<number | null>(null);
  const [steam, setSteam] = useState<number[]>([]);
  useEffect(() => { void fetch("/api/chai").then((r) => r.json()).then((j) => setCount(j.count)).catch(() => undefined); }, []);
  async function pour() {
    sfx.pop();
    const id = Date.now();
    setSteam((s) => [...s, id]);
    window.setTimeout(() => setSteam((s) => s.filter((x) => x !== id)), 1600);
    setCount((c) => (c == null ? c : c + 1));
    unlock("chai");
    const r = await fetch("/api/chai", { method: "POST" }).catch(() => null);
    const j = r?.ok ? await r.json() : null;
    if (j?.count != null) setCount(j.count);
  }
  return (
    <div className="chai">
      <motion.button type="button" className="chai-cup" onClick={pour} whileTap={{ scale: 0.85, rotate: -10 }} whileHover={{ rotate: [0, -6, 6, 0] }} aria-label="Buy Aditya a virtual chai" data-cursor="CHAI!">
        ☕
        <AnimatePresence>
          {steam.map((id) => (
            <motion.span key={id} className="chai-plus" initial={{ y: 0, opacity: 1, scale: 0.6 }} animate={{ y: -110, opacity: 0, scale: 1.4 }} exit={{ opacity: 0 }} transition={{ duration: 1.4 }}>+1 ☕</motion.span>
          ))}
        </AnimatePresence>
      </motion.button>
      <div>
        <p className="chai-count">{count == null ? <b>Tap the cup ☕</b> : <><b>{count.toLocaleString("en-IN")}</b> virtual chais</>}</p>
        <p className="chai-sub">bought for me by people on this site. Tap the cup to add one. (Free. Calorie-free. Very appreciated.)</p>
      </div>
    </div>
  );
}
