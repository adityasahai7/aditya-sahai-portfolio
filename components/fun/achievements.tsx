"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { sfx } from "./sound";

export const ACHIEVEMENTS = [
  { id: "pull", emoji: "🔌", name: "Lights out", hint: "Pull the string" },
  { id: "slap10", emoji: "🎯", name: "Sticker bomber", hint: "Slap 10 stickers" },
  { id: "beyond", emoji: "✨", name: "Secret word", hint: "Type the magic word" },
  { id: "gravity", emoji: "🪐", name: "Newton was right", hint: "Switch off gravity" },
  { id: "explode", emoji: "💥", name: "Name exploder", hint: "Bomb my name 20 times" },
  { id: "quiz", emoji: "🧭", name: "Know thyself", hint: "Take the quiz" },
  { id: "chai", emoji: "☕", name: "Chai sponsor", hint: "Buy me a virtual chai" },
  { id: "roulette", emoji: "🎰", name: "Story gambler", hint: "Spin the story roulette" },
  { id: "doodle", emoji: "✏️", name: "Vandal (nice)", hint: "Doodle on the page" },
  { id: "poster", emoji: "🖼️", name: "Poster child", hint: "Make your poster" },
  { id: "night", emoji: "🌃", name: "Night owl", hint: "Find the night club" },
  { id: "explorer", emoji: "🗺️", name: "Explorer", hint: "Visit every page" },
  { id: "wave", emoji: "👋", name: "Hello stranger", hint: "Wave at a live visitor" },
  { id: "desk", emoji: "🖥️", name: "Desk snoop", hint: "Click 3 things on my desk" },
] as const;
export type AchievementId = (typeof ACHIEVEMENTS)[number]["id"];

const KEY = "as-trophies";
const PAGES = ["/", "/about", "/beyond-default", "/thinking-beyond-club", "/frrost-media", "/work", "/articles", "/newsletter", "/contact"];

export function getUnlocked(): string[] {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]") as string[]; } catch { return []; }
}

/** Unlock a badge (once). Fires a toast + updates the shelf. */
export function unlock(id: AchievementId) {
  if (typeof window === "undefined") return;
  const have = getUnlocked();
  if (have.includes(id)) return;
  try { localStorage.setItem(KEY, JSON.stringify([...have, id])); } catch { /* ignore */ }
  window.dispatchEvent(new CustomEvent("as:trophy", { detail: id }));
  sfx.switchOn();
}

/** Toasts for new badges + tracks the "visit every page" badge. */
export function TrophyToasts() {
  const pathname = usePathname();
  const [queue, setQueue] = useState<string[]>([]);
  useEffect(() => {
    const on = (e: Event) => setQueue((q) => [...q, (e as CustomEvent<string>).detail]);
    window.addEventListener("as:trophy", on);
    return () => window.removeEventListener("as:trophy", on);
  }, []);
  useEffect(() => {
    if (!queue.length) return;
    const t = window.setTimeout(() => setQueue((q) => q.slice(1)), 3200);
    return () => window.clearTimeout(t);
  }, [queue]);
  useEffect(() => {
    try {
      const seen = new Set<string>(JSON.parse(localStorage.getItem("as-pages") ?? "[]") as string[]);
      const page = PAGES.find((p) => p === pathname || (p !== "/" && pathname.startsWith(p)));
      if (page) seen.add(page);
      localStorage.setItem("as-pages", JSON.stringify([...seen]));
      if (PAGES.every((p) => seen.has(p))) unlock("explorer");
    } catch { /* ignore */ }
  }, [pathname]);
  const current = ACHIEVEMENTS.find((a) => a.id === queue[0]);
  return (
    <AnimatePresence>
      {current && (
        <motion.div key={current.id} className="trophy-toast" role="status" initial={{ y: -120, rotate: -8, opacity: 0 }} animate={{ y: 0, rotate: -2, opacity: 1 }} exit={{ y: -120, opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>
          <span className="trophy-emoji">{current.emoji}</span>
          <span><small>🏆 ACHIEVEMENT UNLOCKED</small><b>{current.name}</b></span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** The trophy shelf (opened from the dock). */
export function TrophyShelf({ onClose }: { onClose: () => void }) {
  const [have, setHave] = useState<string[]>([]);
  useEffect(() => { const id = window.setTimeout(() => setHave(getUnlocked()), 0); return () => window.clearTimeout(id); }, []);
  return (
    <motion.div className="shelf" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <div className="shelf-head"><b>🏆 Trophy shelf · {have.length}/{ACHIEVEMENTS.length}</b><button type="button" onClick={onClose} aria-label="Close">✖️</button></div>
      <div className="shelf-grid">
        {ACHIEVEMENTS.map((a) => {
          const got = have.includes(a.id);
          return (
            <div key={a.id} className={`shelf-item ${got ? "is-got" : ""}`} title={got ? a.name : a.hint}>
              <span>{got ? a.emoji : "🔒"}</span>
              <small>{got ? a.name : a.hint}</small>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
