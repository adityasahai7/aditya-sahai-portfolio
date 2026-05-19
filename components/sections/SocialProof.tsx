"use client";

/**
 * SocialProof — Ultra-animated filler section between Manifesto and Contact
 * ─────────────────────────────────────────────────────────────────────────
 * Sections:
 *  1. Rotating stat ticker (big numbers, infinite horizontal scroll)
 *  2. "Why AI Operator?" — 3-column split with animated counters
 *  3. Floating testimonial cards (staggered entrance + hover lift)
 *  4. Full-width "Your competitors aren't waiting" urgency strip
 */

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/* ─── Animated counter hook ─── */
function useCounter(target: number, duration = 1.8, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = target / (duration * 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(id); return; }
      setVal(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [trigger, target, duration]);
  return val;
}

/* ─── Stat Data ─── */
const STATS = [
  { number: "6×",   label: "Faster than agencies",     color: "#4DFFDF" },
  { number: "100%", label: "Custom — zero templates",  color: "#6E9EFF" },
  { number: "3-6",  label: "Days to delivery",          color: "#C4A8FF" },
  { number: "∞",    label: "Leverage from day one",     color: "#FF6B35" },
];

/* ─── Marquee numbers ─── */
/* ─── Reasons ─── */
const REASONS = [
  {
    num: "01",
    title: "You get a system, not a deliverable",
    body: "Most designers hand you a logo. I hand you an engine — brand, content, ads, strategy — all wired together and built to run on AI.",
    color: "#6E9EFF",
    icon: "⚙",
  },
  {
    num: "02",
    title: "Days, not months",
    body: "Traditional agencies bill by the hour. I bill by the outcome. No bloated teams, no pointless revisions, no waiting 6 weeks for a brand deck.",
    color: "#4DFFDF",
    icon: "⚡",
  },
  {
    num: "03",
    title: "AI as infrastructure",
    body: "I don't use AI as a gimmick. I use it as a multiplier — so you get agency-quality output at a fraction of the price and timeline.",
    color: "#C4A8FF",
    icon: "🧠",
  },
];

/* ─── Leverage Statement Lines ─── */
const LEVERAGE_LINES = [
  {
    text: "Your Brand.",
    className: "font-display font-semibold text-ink",
    style: { fontSize: "clamp(72px,11vw,180px)", letterSpacing: "-0.04em", lineHeight: 0.88 },
  },
  {
    text: "My AI.",
    className: "font-editorial italic",
    style: {
      fontSize: "clamp(68px,10.5vw,172px)",
      lineHeight: 0.88,
      background: "linear-gradient(100deg, #FF6B35 0%, #C4A8FF 45%, #6E9EFF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  },
  {
    text: "Infinite Leverage.",
    className: "font-display font-semibold",
    style: {
      fontSize: "clamp(60px,9.5vw,158px)",
      letterSpacing: "-0.04em",
      lineHeight: 0.88,
      background: "linear-gradient(95deg, #4DFFDF 0%, #00E87A 50%, #6E9EFF 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
  },
];

const PROOF_POINTS = [
  { label: "Zero templates", color: "#6E9EFF" },
  { label: "Days, not months", color: "#4DFFDF" },
  { label: "Agency output", color: "#C4A8FF" },
  { label: "Fraction of the price", color: "#FF6B35" },
  { label: "Yours forever", color: "#00E87A" },
];

function LeverageStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={ref} className="relative mb-28 md:mb-36 overflow-hidden">
      {/* Fine dot grid bg */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(110,158,255,0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Ambient orb left */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          left: "-10%", top: "10%",
          background: "radial-gradient(circle, rgba(110,158,255,0.10) 0%, rgba(110,158,255,0.02) 60%, transparent 100%)",
        }}
        animate={{ y: [0, -24, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Ambient orb right */}
      <motion.div
        aria-hidden="true"
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 380, height: 380,
          right: "-8%", bottom: "5%",
          background: "radial-gradient(circle, rgba(196,168,255,0.10) 0%, rgba(196,168,255,0.02) 60%, transparent 100%)",
        }}
        animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      {/* Lines */}
      <div className="text-center mb-12">
        {LEVERAGE_LINES.map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.div
              className={line.className}
              style={line.style}
              initial={{ y: "108%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 1.05, delay: i * 0.14, ease: EXPO }}
            >
              {line.text}
            </motion.div>
          </div>
        ))}
      </div>

      {/* Separator line */}
      <motion.div
        className="flex items-center justify-center gap-4 mb-10"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 1.0, delay: 0.5, ease: EXPO }}
        style={{ transformOrigin: "center" }}
      >
        <div className="h-[1px] w-24" style={{ background: "linear-gradient(90deg, transparent, rgba(110,158,255,0.5))" }} />
        {["#6E9EFF", "#4DFFDF", "#C4A8FF", "#FF6B35", "#00E87A"].map((c, i) => (
          <motion.span
            key={i}
            className="rounded-full shrink-0"
            style={{ width: i === 2 ? 10 : 6, height: i === 2 ? 10 : 6, background: c, boxShadow: `0 0 8px ${c}bb` }}
            animate={{ scale: [1, 1.7, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <div className="h-[1px] w-24" style={{ background: "linear-gradient(90deg, rgba(196,168,255,0.5), transparent)" }} />
      </motion.div>

      {/* Proof point chips */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.55, ease: EXPO }}
      >
        {PROOF_POINTS.map((p, i) => (
          <motion.span
            key={p.label}
            className="font-mono text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full"
            style={{
              color: p.color,
              background: `${p.color}12`,
              border: `1px solid ${p.color}28`,
            }}
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.65 + i * 0.07, ease: EXPO }}
            whileHover={{ scale: 1.08, background: `${p.color}1e`, borderColor: `${p.color}55`, transition: { duration: 0.18 } }}
          >
            {p.label}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 18 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.85, ease: EXPO }}
      >
        <motion.button
          onClick={scrollToContact}
          className="relative overflow-hidden px-10 py-5 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase"
          style={{
            background: "linear-gradient(135deg, #6E9EFF, #4DFFDF)",
            color: "#050505",
            boxShadow: "0 20px 70px -22px rgba(110,158,255,0.7)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          <motion.span
            className="absolute inset-0 rounded-pill pointer-events-none"
            style={{ background: "rgba(255,255,255,0.25)", transformOrigin: "center" }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 2.5, opacity: 1 }}
            transition={{ duration: 0.5, ease: EXPO }}
            aria-hidden="true"
          />
          <span className="relative z-10">Build My System →</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default function SocialProof() {
  const sectionRef  = useRef<HTMLElement>(null);
  const reasonsRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  const inView        = useInView(sectionRef,  { once: true, amount: 0.05 });
  const reasonsInView = useInView(reasonsRef,  { once: true, amount: 0.2  });
  const statsInView   = useInView(statsRef,    { once: true, amount: 0.3  });

  /* Mouse follow spotlight */
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const sx = useSpring(rawX, { stiffness: 30, damping: 22 });
  const sy = useSpring(rawY, { stiffness: 30, damping: 22 });

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      onMouseMove={(e) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        rawX.set(((e.clientX - rect.left) / rect.width) * 100);
        rawY.set(((e.clientY - rect.top) / rect.height) * 100);
      }}
      className="relative bg-transparent overflow-hidden"
      style={{ paddingTop: "clamp(80px,12vw,160px)", paddingBottom: "clamp(80px,12vw,160px)" }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      {/* Mouse spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(900px circle at ${sx}% ${sy}%, rgba(110,158,255,0.07), transparent 55%)`,
        }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      {[
        { c: "#6E9EFF", s: 600, l: "60%", t: "5%",  d: 7.5 },
        { c: "#C4A8FF", s: 400, l: "-5%", t: "55%", d: 9.0 },
        { c: "#4DFFDF", s: 250, l: "50%", t: "80%", d: 6.0 },
      ].map((b, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width: b.s, height: b.s, left: b.l, top: b.t,
            background: `radial-gradient(circle, ${b.c}14 0%, ${b.c}04 55%, transparent 100%)`,
            border: `1px solid ${b.c}10`,
          }}
          animate={{ y: [0, -20, 0], scale: [1, 1.04, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}

      <div className="container-main relative z-10">

        {/* ══════════════════════════════════
             BLOCK 2: Big stat numbers
        ══════════════════════════════════ */}
        <div ref={statsRef} className="mb-28 md:mb-36">
          <motion.p
            className="eyebrow text-accent/70 mb-12 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EXPO }}
          >
            The Numbers
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EXPO }}
              >
                {/* Number */}
                <motion.div
                  className="font-display font-bold leading-none"
                  style={{
                    fontSize: "clamp(56px, 8vw, 96px)",
                    letterSpacing: "-0.04em",
                    background: `linear-gradient(135deg, ${stat.color}, #EEEEF5)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                  animate={statsInView ? {
                    textShadow: [`0 0 0px ${stat.color}00`, `0 0 40px ${stat.color}44`, `0 0 0px ${stat.color}00`],
                  } : {}}
                  transition={{ duration: 3, delay: 0.5 + i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                >
                  {stat.number}
                </motion.div>

                {/* Horizontal line accent */}
                <motion.div
                  className="h-[1px] w-full max-w-[80px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${stat.color}70, transparent)` }}
                  initial={{ scaleX: 0 }}
                  animate={statsInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.35 + i * 0.1, ease: EXPO }}
                />

                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/45 leading-tight">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
             BLOCK 3: Why AI Operator? — 3 col
        ══════════════════════════════════ */}
        <div ref={reasonsRef} className="mb-28 md:mb-36">
          <div className="mb-14">
            <motion.p
              className="eyebrow text-accent/70 mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={reasonsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              Why Not Just Hire an Agency?
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="leading-none"
                style={{ fontSize: "clamp(40px, 6vw, 80px)" }}
                initial={{ y: "105%" }}
                animate={reasonsInView ? { y: "0%" } : {}}
                transition={{ duration: 1.0, ease: EXPO, delay: 0.06 }}
              >
                <span className="font-display font-semibold text-ink tracking-tight">
                  Because AI operators{" "}
                </span>
                <em className="font-editorial italic gradient-text-cycle">just hit different.</em>
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REASONS.map((r, i) => (
              <motion.div
                key={r.num}
                className="relative rounded-card p-8 overflow-hidden group"
                style={{
                  background: "var(--glass-bg)",
                  border: "1px solid var(--glass-border)",
                }}
                initial={{ opacity: 0, y: 50, rotateX: 8 }}
                animate={reasonsInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.1 + i * 0.12, ease: EXPO }}
                whileHover={{
                  y: -10,
                  borderColor: `${r.color}40`,
                  boxShadow: `0 30px 80px -30px ${r.color}30`,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Animated top bar */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ background: `linear-gradient(90deg, transparent, ${r.color}80, transparent)`, transformOrigin: "left" }}
                  initial={{ scaleX: 0 }}
                  animate={reasonsInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 1.0, delay: 0.4 + i * 0.12, ease: EXPO }}
                />

                {/* Icon */}
                <motion.div
                  className="text-[36px] mb-5 block"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                >
                  {r.icon}
                </motion.div>

                <p
                  className="font-mono text-[10px] tracking-[0.16em] uppercase mb-4"
                  style={{ color: r.color }}
                >
                  {r.num}
                </p>
                <h3
                  className="font-display font-semibold text-ink leading-tight mb-4"
                  style={{ fontSize: "clamp(18px, 1.5vw, 22px)", letterSpacing: "-0.02em" }}
                >
                  {r.title}
                </h3>
                <p className="font-body text-ink/52 leading-relaxed" style={{ fontSize: "clamp(14px, 1.1vw, 16px)" }}>
                  {r.body}
                </p>

                {/* Hover glow overlay */}
                <motion.div
                  className="absolute inset-0 rounded-card pointer-events-none opacity-0 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${r.color}08, transparent 70%)` }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════
             BLOCK 4: Your Brand. My AI. Infinite Leverage.
        ══════════════════════════════════ */}
        <LeverageStatement />

        {/* ══════════════════════════════════
             BLOCK 5: Urgency strip
        ══════════════════════════════════ */}
        <motion.div
          className="relative rounded-card-lg overflow-hidden"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: EXPO }}
        >
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, rgba(110,158,255,0.12) 0%, rgba(77,255,223,0.06) 50%, rgba(196,168,255,0.08) 100%)",
              border: "1px solid rgba(110,158,255,0.18)",
            }}
          />

          {/* Animated gradient border */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-cycle"
            style={{ opacity: 0.8 }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(196,168,255,0.4), transparent)", opacity: 0.6 }}
          />

          {/* Spinning conic rings — decorative */}
          {[
            { size: 280, right: "-60px", top: "-60px", dur: 12 },
            { size: 180, right: "-20px", bottom: "-50px", dur: 18 },
          ].map((ring, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: ring.size, height: ring.size,
                right: ring.right, top: (ring as any).top, bottom: (ring as any).bottom,
                background: "conic-gradient(from 0deg, #6E9EFF22, #4DFFDF22, #C4A8FF22, #FF6B3522, #6E9EFF22)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
          ))}

          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent/70 mb-4">
                The window is narrow.
              </p>
              <h2
                className="font-display font-semibold text-ink leading-tight mb-4"
                style={{ fontSize: "clamp(32px, 4.5vw, 64px)", letterSpacing: "-0.03em" }}
              >
                Your competitors{" "}
                <em className="font-editorial italic gradient-text-cycle">aren&apos;t waiting.</em>
              </h2>
              <p className="font-body text-ink/55 max-w-lg" style={{ fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.65 }}>
                Every week you don&apos;t have a brand system is a week your competitor does. The brands that move first own the positioning — forever. This is that window.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-4">
              <motion.button
                onClick={scrollToContact}
                className="relative overflow-hidden px-10 py-5 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #6E9EFF, #6BA8FF 58%, #C4A8FF)",
                  color: "#050505",
                  boxShadow: "0 20px 70px -22px rgba(110,158,255,0.75)",
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-pill pointer-events-none"
                  style={{ background: "rgba(255,255,255,0.28)", transformOrigin: "center" }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 2.5, opacity: 1 }}
                  transition={{ duration: 0.5, ease: EXPO }}
                  aria-hidden="true"
                />
                <span className="relative z-10">Claim My Advantage →</span>
              </motion.button>

              <div className="flex items-center gap-2">
                <motion.span
                  className="w-[5px] h-[5px] rounded-full"
                  style={{ backgroundColor: "#4DFFDF", boxShadow: "0 0 8px rgba(77,255,223,0.8)" }}
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-ink/40">
                  Free strategy call · Reply &lt; 12hrs
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
