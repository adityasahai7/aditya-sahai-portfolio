"use client";

import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { footer, nav, preloader, socials, LINKS } from "@/lib/content";
import { ScrollTrigger, ease, scrollToTop, startSmoothScroll } from "@/components/motion/core";
import { FlipText, Magnetic } from "@/components/motion/kit";
import { LiveClock } from "@/components/fun/Fun";

const TONE_HEX: Record<string, string> = { teal: "#176D70", sea: "#38A997", mint: "#BDEFD5", cyan: "#9CE8F2", yellow: "#F5D46D", red: "#F18179", fuchsia: "#E56AA6", ink: "#202727", paper: "#F7F1E7" };

/** Lenis + GSAP heartbeat, scroll reset and ScrollTrigger refresh per route. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => { startSmoothScroll(); }, []);
  useEffect(() => {
    scrollToTop();
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}

/** Ink dot + trailing ring that grows a label over interactive things (mouse only). */
export function Cursor() {
  const [on, setOn] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });
  const [label, setLabel] = useState("");
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const [tone, setTone] = useState("#F18179");
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const id = window.setTimeout(() => setOn(true), 0);
    const move = (e: PointerEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, summary, input, textarea, select");
      setHot(Boolean(el));
      setLabel(el?.dataset.cursor ?? (el?.tagName === "A" ? "GO" : ""));
      const room = (e.target as HTMLElement).closest<HTMLElement>("[data-room]");
      setTone(TONE_HEX[room?.dataset.room ?? "red"] ?? "#F18179");
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    document.documentElement.classList.add("has-cursor");
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);
  if (!on) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} aria-hidden="true" />
      <motion.div className={`cursor-ring ${hot ? "is-hot" : ""} ${label ? "has-label" : ""} ${down ? "is-down" : ""}`} style={{ x: sx, y: sy, ["--cursor-tone" as string]: tone }} aria-hidden="true">
        <span>{label}</span>
      </motion.div>
    </>
  );
}

/** First visit: THINK · BEYOND · THE · DEFAULT. slam in, counter runs, curtain splits. */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  useEffect(() => {
    let seen = false;
    try { seen = Boolean(sessionStorage.getItem("as-pre")); sessionStorage.setItem("as-pre", "1"); } catch { /* storage blocked */ }
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = window.setTimeout(() => setShow(true), 0);
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => { const p = Math.min(1, (now - t0) / 1500); setCount(Math.round(p * 100)); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    const end = window.setTimeout(() => setShow(false), 1900);
    document.documentElement.classList.add("is-loading");
    const unlock = window.setTimeout(() => document.documentElement.classList.remove("is-loading"), 2300);
    return () => { window.clearTimeout(start); window.clearTimeout(end); window.clearTimeout(unlock); cancelAnimationFrame(raf); };
  }, []);
  const colors = ["#F18179", "#F5D46D", "#9CE8F2", "#BDEFD5"];
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="preloader" exit={{ opacity: 1 }} transition={{ duration: 0.9 }} aria-hidden="true">
          {preloader.map((word, i) => (
            <motion.div key={word} className="pre-word" style={{ background: colors[i] }}
              initial={{ y: "100%" }} animate={{ y: "0%" }} exit={{ x: i % 2 ? "105%" : "-105%" }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.22, ease }}>
              <motion.span initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4, delay: 0.25 + i * 0.22, ease }}>{word}</motion.span>
            </motion.div>
          ))}
          <motion.span className="pre-count" exit={{ opacity: 0 }}>{String(count).padStart(3, "0")}%</motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

/** Hides on scroll down, returns on scroll up. Full-screen colour menu. */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const last = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 160 && y > last.current + 4);
      if (y < last.current - 4 || y < 160) setHidden(false);
      setSolid(y > 30);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { const id = window.setTimeout(() => setOpen(false), 0); return () => window.clearTimeout(id); }, [pathname]);
  useEffect(() => { document.documentElement.classList.toggle("menu-open", open); }, [open]);
  return (
    <>
      <motion.header className={`nav ${solid ? "is-solid" : ""}`} animate={{ y: hidden && !open ? "-120%" : "0%" }} transition={{ duration: 0.45, ease }}>
        <Link href="/" className="nav-mark" data-cursor="HOME" aria-label="Aditya Sahai, home">
          <span className="nav-mark-badge">AS</span>
          <span className="nav-mark-name">Aditya Sahai</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-pill tone-hover-${item.tone} ${pathname.startsWith(item.href) ? "is-active" : ""}`}>{item.label}</Link>
          ))}
        </nav>
        <div className="nav-right">
          <Magnetic><Link href="/contact" className="btn btn-red btn-sm" data-cursor="HI!">Say hi 👋</Link></Magnetic>
          <button type="button" className={`nav-burger ${open ? "is-open" : ""}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)} data-cursor={open ? "CLOSE" : "MENU"}>
            <span /><span />
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" initial={{ clipPath: "circle(0% at 95% 4%)" }} animate={{ clipPath: "circle(150% at 95% 4%)" }} exit={{ clipPath: "circle(0% at 95% 4%)" }} transition={{ duration: 0.7, ease }}>
            <ul>
              {[{ label: "Home", href: "/", tone: "teal" }, ...nav, { label: "Contact", href: "/contact", tone: "yellow" }].map((item, i) => (
                <motion.li key={item.href} initial={{ y: 80, opacity: 0, rotate: 6 }} animate={{ y: 0, opacity: 1, rotate: 0 }} transition={{ delay: 0.18 + i * 0.05, type: "spring", stiffness: 140, damping: 15 }}>
                  <Link href={item.href} className={`menu-link tone-hover-${item.tone}`}>{item.label}</Link>
                </motion.li>
              ))}
            </ul>
            <div className="menu-socials">
              {socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.emoji} {s.label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  return (
    <footer className="footer" data-room="ink">
      <div className="footer-top wrap">
        <div>
          <p className="footer-kicker">Think Beyond Default 🧠</p>
          <LiveClock className="is-dark" />
          <p className="footer-lead">Got a story, a project or a hi? My inbox is open.</p>
          <div className="footer-cta">
            <Magnetic><a className="btn btn-yellow btn-lg" href={LINKS.email} data-cursor="EMAIL">Email me ✉️</a></Magnetic>
            <Magnetic><a className="btn btn-paper btn-lg" href={LINKS.whatsapp} target="_blank" rel="noreferrer" data-cursor="CHAT">WhatsApp 💬</a></Magnetic>
          </div>
        </div>
        <div className="footer-cols">
          <div>
            <p className="footer-h">Explore</p>
            {[["Home", "/"], ...nav.map((n) => [n.label, n.href]), ["Contact", "/contact"], ["Links", "/links"]].map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          </div>
          <div>
            <p className="footer-h">Follow</p>
            {socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.emoji} {s.label} <small>{s.handle}</small></a>)}
            <a href={LINKS.tbc} target="_blank" rel="noreferrer">🫂 Thinking Beyond Club ↗</a>
            <a href={LINKS.frrost} target="_blank" rel="noreferrer">📈 FRROST Media ↗</a>
          </div>
        </div>
      </div>
      <div className="footer-big" aria-label={footer.big}>
        <FlipText text="FOR GOOD," className="footer-flip" />
        <FlipText text="TOWARDS GREATNESS." className="footer-flip" />
      </div>
      <div className="footer-bottom wrap">
        <span>© {new Date().getFullYear()} Aditya Sahai · Creative AI Operator</span>
        <span>{footer.made}</span>
        <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
      </div>
    </footer>
  );
}

/** Type "beyond" anywhere → sticker confetti. */
export function EasterEgg() {
  const [bursts, setBursts] = useState<number[]>([]);
  useEffect(() => {
    let buffer = "";
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      buffer = (buffer + e.key.toLowerCase()).slice(-6);
      if (buffer === "beyond") { const id = Date.now(); setBursts((b) => [...b, id]); window.setTimeout(() => setBursts((b) => b.filter((x) => x !== id)), 2600); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const emojis = ["✨", "🎉", "🧠", "🎬", "🔥", "💛", "🚀", "🫶", "⭐", "🌈"];
  return (
    <div className="confetti-layer" aria-hidden="true">
      {bursts.map((id) => Array.from({ length: 36 }, (_, i) => (
        <motion.span key={`${id}-${i}`} className="confetti" initial={{ x: "50vw", y: "60vh", scale: 0, rotate: 0 }}
          animate={{ x: `${50 + (((i * 37) % 100) - 50) * 0.9}vw`, y: `${-10 + ((i * 53) % 40)}vh`, scale: 1.4, rotate: (i % 2 ? 1 : -1) * 360 }}
          transition={{ duration: 1.6 + (i % 5) * 0.12, ease: [0.15, 0.8, 0.3, 1] }}>
          {emojis[i % emojis.length]}
        </motion.span>
      )))}
    </div>
  );
}
