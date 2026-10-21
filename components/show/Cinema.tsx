"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { sfx } from "@/components/fun/sound";

/**
 * Cinema mode for the Beyond Default page: letterbox bars slide in once you start
 * scrolling, a projector flicker plays, and a scene counter + clapperboard snap
 * on every new section (anything with data-scene).
 */
export function Cinema() {
  const [on, setOn] = useState(false);
  const [scene, setScene] = useState(1);
  const [snap, setSnap] = useState(0);
  useEffect(() => {
    const onScroll = () => setOn(window.scrollY > window.innerHeight * 0.35);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const n = Number((e.target as HTMLElement).dataset.scene);
        setScene((prev) => { if (prev !== n) { setSnap((s) => s + 1); sfx.click(); } return n; });
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    scenes.forEach((s) => io.observe(s));
    document.documentElement.classList.add("cinema");
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); document.documentElement.classList.remove("cinema"); };
  }, []);
  return (
    <div className="cinema-layer" aria-hidden="true">
      <motion.span className="letterbox top" animate={{ y: on ? 0 : "-100%" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <motion.span className="letterbox bottom" animate={{ y: on ? 0 : "100%" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
      <AnimatePresence>{on && <motion.span className="projector" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />}</AnimatePresence>
      <AnimatePresence>
        {on && (
          <motion.div className="scene-counter" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <motion.span key={snap} className="clapper" initial={{ rotate: -35 }} animate={{ rotate: [-35, 0, -8, 0] }} transition={{ duration: 0.45 }}>🎬</motion.span>
            <span>SCENE {String(scene).padStart(2, "0")}</span>
            <span className="rec-dot" />REC
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
