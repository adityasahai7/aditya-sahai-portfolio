"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const EXPO = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    num: "01",
    title: "Discover",
    body: "Deep dive into your brand, audience, and market. I find exactly where AI multiplies your output — not generic advice, just what moves your needle.",
    color: "var(--accent)",
  },
  {
    num: "02",
    title: "Build",
    body: "Custom brand systems, content engines, and performance creatives — built specifically for your ICP, your voice, and your growth goals.",
    color: "#EEEEF5",
  },
  {
    num: "03",
    title: "Deliver",
    body: "Premium output in days, not months. You get production-ready assets — brand identity, content, ads, or strategy — that are yours forever.",
    color: "#C4A8FF",
  },
];

const ORBS = [
  { color: "#6E9EFF", size: 380, left: "-6%",  top: "5%",  dur: 6.2, delay: 0   },
  { color: "#7B5EA7", size: 180, left: "88%",  top: "12%", dur: 7.5, delay: 1.2 },
  { color: "#4DFFDF", size: 140, left: "48%",  top: "78%", dur: 5.8, delay: 0.6 },
];

export default function AIApproach() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const sx = useSpring(rawX, { stiffness: 28, damping: 22 });
  const sy = useSpring(rawY, { stiffness: 28, damping: 22 });
  const spotBg = useMotionTemplate`radial-gradient(700px circle at ${sx}% ${sy}%, rgba(110,158,255,0.08), transparent 60%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative bg-transparent section-pad overflow-hidden"
      id="services"
      data-section="services"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotBg }}
        aria-hidden="true"
      />

      {/* Ambient orbs */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.left,
            top:    orb.top,
            background: `radial-gradient(circle, ${orb.color}18 0%, ${orb.color}06 60%, transparent 100%)`,
            border: `1px solid ${orb.color}10`,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1, y: [0, -20, 0] } : {}}
          transition={{
            opacity: { duration: 1.0, delay: 0.1 * i, ease: EXPO },
            scale:   { duration: 1.0, delay: 0.1 * i, ease: EXPO },
            y: { duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay, repeatType: "loop" },
          }}
        />
      ))}

      <div className="container-main relative z-10">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.16em] uppercase mb-6"
          style={{ color: "var(--accent)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          The Process
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            className="leading-none"
            style={{ fontSize: "clamp(48px,7vw,96px)" }}
            initial={{ y: "105%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 1.0, ease: EXPO }}
          >
            <span className="font-display font-semibold text-ink" style={{ letterSpacing: "-0.02em" }}>
              No agencies.{" "}
            </span>
            <em className="font-editorial italic gradient-text-cycle">Just results.</em>
          </motion.h2>
        </div>

        {/* Body copy */}
        <motion.p
          className="font-body text-ink/52 max-w-2xl mb-16 md:mb-20"
          style={{ fontSize: "clamp(17px,1.5vw,21px)", lineHeight: 1.65 }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18, ease: EXPO }}
        >
          Traditional agencies charge ₹5–50L and take months. I deliver the same quality — sometimes better — in days. The difference? AI as infrastructure, not as a gimmick.
        </motion.p>

        {/* Step cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16 md:mb-20">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              className="relative rounded-card p-8 flex flex-col gap-4 overflow-hidden"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-card)",
              }}
              initial={{ opacity: 0, y: 56 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.28 + i * 0.14, ease: EXPO }}
              whileHover={{
                y: -8,
                transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Animated top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${step.color === "var(--accent)" ? "rgba(110,158,255,0.8)" : step.color === "#C4A8FF" ? "rgba(196,168,255,0.7)" : "rgba(238,238,245,0.4)"}, transparent)`,
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.15, ease: EXPO }}
              />

              {/* Bloom on hover */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-card"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(110,158,255,0.08), transparent 70%)" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              />

              <span
                className="font-mono text-[11px] tracking-[0.15em] uppercase relative z-10"
                style={{ color: "var(--accent)" }}
              >
                {step.num}
              </span>

              <motion.h3
                className="font-editorial italic leading-none relative z-10"
                style={{ fontSize: "clamp(40px,4.2vw,60px)", color: step.color }}
                initial={{ opacity: 0, x: -14 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.4 + i * 0.14, ease: EXPO }}
              >
                {step.title}
              </motion.h3>

              <p className="font-body text-[15px] text-ink/50 leading-relaxed relative z-10">
                {step.body}
              </p>

              <motion.span
                className="absolute bottom-6 right-6 font-mono text-[18px] leading-none pointer-events-none"
                style={{ color: "var(--accent)" }}
                initial={{ opacity: 0.18, x: 6, y: -6 }}
                whileHover={{ opacity: 0.8, x: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* ── SVG Flow connector (ORION Step 9) — desktop only ── */}
        <div className="hidden md:block relative w-full mb-10 -mt-6 overflow-hidden" style={{ height: 60 }} aria-hidden="true">
          <svg width="100%" height="60" viewBox="0 0 900 60" preserveAspectRatio="none" fill="none">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#6E9EFF" stopOpacity="0" />
                <stop offset="30%"  stopColor="#6E9EFF" stopOpacity="0.7" />
                <stop offset="60%"  stopColor="#4DFFDF" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#C4A8FF" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Curved path connecting the 3 steps */}
            <motion.path
              d="M 0,30 C 150,30 150,10 300,10 C 450,10 450,50 600,50 C 750,50 750,30 900,30"
              stroke="url(#flowGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.9, ease: EXPO }}
            />
            {/* Moving dot */}
            {inView && (
              <motion.circle
                r="4"
                fill="#4DFFDF"
                filter="url(#glowFilter)"
                style={{ offsetPath: "path('M 0,30 C 150,30 150,10 300,10 C 450,10 450,50 600,50 C 750,50 750,30 900,30')" } as React.CSSProperties}
                initial={{ offsetDistance: "0%" } as any}
                animate={{ offsetDistance: "100%" } as any}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1.5 }}
              />
            )}
            <defs>
              <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* CTA block */}
        <motion.div
          className="flex flex-col items-start gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.58, ease: EXPO }}
        >
          <div className="overflow-hidden">
            <motion.p
              className="font-editorial italic text-ink/72"
              style={{ fontSize: "clamp(22px,2.6vw,36px)" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 0.85, delay: 0.62, ease: EXPO }}
            >
              Your competitors aren&apos;t waiting.
            </motion.p>
          </div>

          <MagneticButton onClick={scrollToContact}>
            <span className="btn-cta">
              Let&apos;s Build Your System →
            </span>
          </MagneticButton>

          <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink/28">
            Free 20-min strategy call · No pitch · No commitment
          </p>
        </motion.div>
      </div>
    </section>
  );
}
