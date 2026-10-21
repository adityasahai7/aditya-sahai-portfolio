"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { sfx } from "@/components/fun/sound";

/**
 * First visit: a hand-drawn door on paper. It swings open (tap, scroll or wait),
 * then you fly through the doorway into the site.
 */
export function Portal() {
  const [stage, setStage] = useState<"off" | "closed" | "open" | "fly">("off");
  useEffect(() => {
    let seen = false;
    try { seen = Boolean(sessionStorage.getItem("as-portal")); sessionStorage.setItem("as-portal", "1"); } catch { /* blocked */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const show = window.setTimeout(() => setStage("closed"), 0);
    document.documentElement.classList.add("is-loading");
    return () => window.clearTimeout(show);
  }, []);

  useEffect(() => {
    if (stage !== "closed") return;
    const openUp = () => setStage((s) => (s === "closed" ? "open" : s));
    const auto = window.setTimeout(openUp, 1700);
    window.addEventListener("wheel", openUp, { once: true });
    window.addEventListener("touchmove", openUp, { once: true });
    window.addEventListener("keydown", openUp, { once: true });
    return () => { window.clearTimeout(auto); window.removeEventListener("wheel", openUp); window.removeEventListener("touchmove", openUp); window.removeEventListener("keydown", openUp); };
  }, [stage]);

  useEffect(() => {
    if (stage === "open") { sfx.switchOn(); const t = window.setTimeout(() => setStage("fly"), 850); return () => window.clearTimeout(t); }
    if (stage === "fly") { const t = window.setTimeout(() => { setStage("off"); document.documentElement.classList.remove("is-loading"); }, 1000); return () => window.clearTimeout(t); }
  }, [stage]);

  return (
    <AnimatePresence>
      {stage !== "off" && (
        <motion.div className="portal" exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setStage((s) => (s === "closed" ? "open" : s))}>
          <motion.div className="portal-zoom" animate={stage === "fly" ? { scale: 14 } : { scale: 1 }} transition={{ duration: 1, ease: [0.7, 0, 0.84, 0] }}>
            <div className="portal-paper" />
            <div className="portal-center">
              <p className="portal-kicker">COME ON IN 👋</p>
              <div className="portal-frame">
                <motion.div className="portal-door" animate={{ rotateY: stage === "closed" ? 0 : -112 }} transition={{ type: "spring", stiffness: 60, damping: 13 }}>
                  <span className="portal-door-text">THINK<br />BEYOND<br />DEFAULT.</span>
                  <span className="portal-knob" />
                </motion.div>
              </div>
              <p className="portal-hint">{stage === "closed" ? "tap, scroll or just wait…" : "here we go ✨"}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
