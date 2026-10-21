"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { loadSoundPref, setSound, sfx } from "./sound";

const EMOJIS = ["⭐", "🔥", "💛", "🧠", "🎬", "🚀", "😂", "👀", "🫶", "✨", "🍕", "🤯"];
type Slap = { x: number; y: number; e: string; r: number; id: number };

function useLights() {
  const [off, setOff] = useState(false);
  useEffect(() => {
    const on = (e: Event) => setOff((e as CustomEvent<boolean>).detail);
    window.addEventListener("as:lights", on);
    return () => window.removeEventListener("as:lights", on);
  }, []);
  return off;
}
function setLights(off: boolean) {
  window.dispatchEvent(new CustomEvent("as:lights", { detail: off }));
  document.documentElement.classList.toggle("lights-off", off);
  if (off) sfx.switchOff(); else sfx.switchOn();
}

/** WTF-style hanging string. Pull it down to switch the lights off (and on again). */
export function PullString() {
  const off = useLights();
  const y = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 300, damping: 12 });
  const len = useTransform(sy, (v) => 96 + Math.max(0, v));
  const [hint, setHint] = useState(true);
  useEffect(() => { const t = window.setTimeout(() => setHint(false), 9000); return () => window.clearTimeout(t); }, []);
  return (
    <div className="pull" aria-hidden="false">
      <motion.span className="pull-line" style={{ height: len }} />
      <motion.button
        type="button"
        className={`pull-knob ${off ? "is-off" : ""}`}
        style={{ top: 96 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 90 }}
        dragElastic={0.2}
        dragSnapToOrigin
        onDrag={(_, info) => y.set(Math.max(0, info.offset.y))}
        onDragEnd={(_, info) => { y.set(0); if (info.offset.y > 45) { setLights(!off); setHint(false); } }}
        onClick={() => { setLights(!off); setHint(false); }}
        aria-label={off ? "Pull to turn the lights on" : "Pull to turn the lights off"}
        data-cursor="PULL"
        whileHover={{ scale: 1.15 }}
      >
        {off ? "💡" : "🔌"}
      </motion.button>
      <AnimatePresence>{hint && <motion.span className="pull-hint" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: 2.5 }}>← pull me</motion.span>}</AnimatePresence>
    </div>
  );
}

/** Lights off: the page goes dark and the cursor (or finger) becomes a torch. */
export function Torch() {
  const off = useLights();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!off) return;
    const el = ref.current;
    const set = (x: number, y: number) => { el?.style.setProperty("--tx", `${x}px`); el?.style.setProperty("--ty", `${y}px`); };
    set(window.innerWidth / 2, window.innerHeight / 2);
    const move = (e: PointerEvent) => set(e.clientX, e.clientY);
    const touch = (e: TouchEvent) => { const t = e.touches[0]; if (t) set(t.clientX, t.clientY); };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("touchmove", touch, { passive: true });
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("touchmove", touch); };
  }, [off]);
  return (
    <AnimatePresence>
      {off && (
        <motion.div ref={ref} className="torch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} aria-hidden="true">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: [0, 1, 1, 0], y: 0 }} transition={{ duration: 3.5, times: [0, 0.15, 0.8, 1] }}>Lights out. 🔦 Move around.</motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Sticker gun: pick an emoji, tap anywhere to slap it on the page. Saved per page, per visitor. */
function useSlaps(path: string) {
  const key = `as-slaps:${path}`;
  const [slaps, setSlaps] = useState<Slap[]>([]);
  useEffect(() => {
    let saved: Slap[] = [];
    try { saved = JSON.parse(localStorage.getItem(key) ?? "[]") as Slap[]; } catch { saved = []; }
    const id = window.setTimeout(() => setSlaps(saved), 0);
    return () => window.clearTimeout(id);
  }, [key]);
  const save = useCallback((next: Slap[]) => { setSlaps(next); try { localStorage.setItem(key, JSON.stringify(next.slice(-60))); } catch { /* full */ } }, [key]);
  return [slaps, save] as const;
}

export function FunDock() {
  const pathname = usePathname();
  const off = useLights();
  const [gun, setGun] = useState(false);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [sound, setSoundState] = useState(false);
  const [slaps, save] = useSlaps(pathname);
  const [layer, setLayer] = useState<HTMLElement | null>(null);
  const [aim, setAim] = useState({ x: -100, y: -100 });
  const [open, setOpen] = useState(false);

  useEffect(() => { const id = window.setTimeout(() => { setSoundState(loadSoundPref()); setLayer(document.getElementById("main")); }, 0); return () => window.clearTimeout(id); }, [pathname]);
  useEffect(() => { document.documentElement.classList.toggle("sticker-mode", gun); }, [gun]);

  useEffect(() => {
    if (!gun) return;
    const main = document.getElementById("main");
    const move = (e: PointerEvent) => setAim({ x: e.clientX, y: e.clientY });
    const shoot = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!main || target.closest(".dock, .pull, a, button, input, textarea, .pile-sticker, .nav, .menu")) return;
      e.preventDefault();
      const rect = main.getBoundingClientRect();
      const slap: Slap = { x: ((e.clientX - rect.left) / rect.width) * 100, y: e.clientY - rect.top, e: emoji, r: Math.round(Math.random() * 50 - 25), id: Date.now() };
      save([...slaps, slap]);
      sfx.pop();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("click", shoot, true);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setGun(false);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("pointermove", move); document.removeEventListener("click", shoot, true); window.removeEventListener("keydown", esc); };
  }, [gun, emoji, slaps, save]);

  return (
    <>
      {layer && createPortal(
        <div className="slap-layer" aria-hidden="true">
          <AnimatePresence>
            {slaps.map((s) => (
              <motion.span key={s.id} className="slap" style={{ left: `${s.x}%`, top: s.y }} initial={{ scale: 3, rotate: s.r - 40, opacity: 0 }} animate={{ scale: 1, rotate: s.r, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 420, damping: 13 }}>
                {s.e}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>,
        layer,
      )}
      {gun && <span className="aim" style={{ transform: `translate(${aim.x}px, ${aim.y}px)` }} aria-hidden="true">{emoji}</span>}
      <div className={`dock ${off ? "is-dark" : ""} ${open || gun || off ? "is-open" : ""}`}>
        <AnimatePresence>
          {gun && (
            <motion.div className="dock-tray" initial={{ opacity: 0, y: 20, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
              <p>Pick a sticker, then tap anywhere 👇</p>
              <div className="dock-emojis">
                {EMOJIS.map((e) => <button key={e} type="button" className={e === emoji ? "is-on" : ""} onClick={() => { setEmoji(e); sfx.click(); }} aria-label={`Use ${e}`}>{e}</button>)}
              </div>
              {slaps.length > 0 && <button type="button" className="dock-clear" onClick={() => { save([]); sfx.boing(); }}>🧽 Clean this page ({slaps.length})</button>}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button type="button" className={`dock-btn ${gun ? "is-on" : ""}`} onClick={() => { setGun(!gun); sfx.click(); }} whileTap={{ scale: 0.85 }} aria-pressed={gun} aria-label="Sticker gun" data-cursor={gun ? "DONE" : "STICKERS"}>{gun ? "✖️" : "🎯"}</motion.button>
        <motion.button type="button" className={`dock-btn ${off ? "is-on" : ""}`} onClick={() => setLights(!off)} whileTap={{ scale: 0.85 }} aria-pressed={off} aria-label="Lights" data-cursor="LIGHTS">{off ? "💡" : "🌙"}</motion.button>
        <motion.button type="button" className="dock-btn dock-toggle" onClick={() => { setOpen(!open); sfx.click(); }} whileTap={{ scale: 0.85 }} aria-expanded={open} aria-label="Fun stuff">{open ? "✖️" : "✨"}</motion.button>
        <motion.button type="button" className={`dock-btn ${sound ? "is-on" : ""}`} onClick={() => { const next = !sound; setSound(next); setSoundState(next); if (next) sfx.pop(); }} whileTap={{ scale: 0.85 }} aria-pressed={sound} aria-label="Sound" data-cursor="SOUND">{sound ? "🔊" : "🔈"}</motion.button>
      </div>
    </>
  );
}

const STATUS: [number, string][] = [
  [6, "probably asleep 😴"], [9, "on chai number one ☕"], [12, "deep in a build 🛠️"], [14, "writing a script ✍️"],
  [17, "editing a video 🎬"], [20, "in a FRROST call 📈"], [22, "reading something weird 📚"], [24, "should be asleep 🌙"],
];
/** "📍 India · 12:07 PM · probably editing a video 🎬", live in IST. */
export function LiveClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    const tick = () => setNow(new Date());
    const first = window.setTimeout(tick, 0);
    const id = window.setInterval(tick, 15_000);
    return () => { window.clearTimeout(first); window.clearInterval(id); };
  }, []);
  if (!now) return <span className={`clock ${className}`}>📍 India 🇮🇳</span>;
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const h = ist.getHours();
  const status = STATUS.find(([until]) => h < until)?.[1] ?? STATUS[0][1];
  const time = ist.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  return (
    <span className={`clock ${className}`}>
      <i className="clock-dot" />📍 India · <b>{time}</b> · {status}
    </span>
  );
}
