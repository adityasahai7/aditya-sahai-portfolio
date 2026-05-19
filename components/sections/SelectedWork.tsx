"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const CAPABILITIES = [
  { label: "AI Brand Identity",    desc: "Complete visual + strategy system" },
  { label: "Content Systems",      desc: "30-day content machine" },
  { label: "UGC Ad Creatives",     desc: "Multi-variant performance ads" },
  { label: "Strategy Audits",      desc: "Competitor + ICP deep dive" },
  { label: "Personal Branding",    desc: "LinkedIn + content positioning" },
  { label: "Video Production",     desc: "AI-powered short-form" },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      data-section="work"
      id="work"
      className="relative bg-transparent section-pad overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      {/* Ambient orbs */}
      {[
        { color: "#6E9EFF", size: 400, left: "70%", top: "10%",  dur: 7.0, delay: 0   },
        { color: "#C4A8FF", size: 200, left: "5%",  top: "60%",  dur: 5.5, delay: 1.0 },
        { color: "#4DFFDF", size: 150, left: "45%", top: "80%",  dur: 6.5, delay: 0.5 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.left,
            top:    orb.top,
            background: `radial-gradient(circle, ${orb.color}15 0%, ${orb.color}05 60%, transparent 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, y: [0, -18, 0] } : {}}
          transition={{
            opacity: { duration: 1.0, delay: 0.2 * i, ease: EXPO },
            y: { duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay, repeatType: "loop" },
          }}
        />
      ))}

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EXPO }}
        >
          <p className="eyebrow text-accent/75 mb-4">
            What I Can Build — 2026
          </p>
          <h2 className="leading-none mb-4" style={{ fontSize: "clamp(48px,7vw,96px)" }}>
            <span className="font-display font-semibold text-ink tracking-tight">
              Built to{" "}
            </span>
            <em className="font-editorial italic gradient-text-cycle-slow">
              perform.
            </em>
          </h2>
          <p className="font-grotesk text-body-lg text-ink/58 max-w-xl">
            Every system. Built from scratch.
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.label}
              className="relative rounded-card p-7 flex flex-col gap-3 overflow-hidden card-shine"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "var(--shadow-card)",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.08, ease: EXPO }}
              whileHover={{
                y: -6,
                borderColor: "rgba(110,158,255,0.28)",
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(110,158,255,0.6), rgba(77,255,223,0.4), transparent)",
                  transformOrigin: "left",
                }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.09, ease: EXPO }}
              />

              <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-accent/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className="font-display font-semibold text-ink leading-tight"
                style={{ fontSize: "clamp(18px, 1.6vw, 22px)", letterSpacing: "-0.02em" }}
              >
                {cap.label}
              </h3>
              <p className="font-mono text-[11px] text-ink/42 tracking-wider uppercase">
                {cap.desc}
              </p>

              <motion.span
                className="absolute bottom-5 right-5 font-mono text-[16px] text-accent/25"
                whileHover={{ opacity: 1, color: "var(--accent)", x: 2 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Coming soon banner */}
        <motion.div
          className="relative rounded-card overflow-hidden p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 animated-border-card noise-card"
          style={{
            background: "linear-gradient(135deg, rgba(110,158,255,0.06), rgba(77,255,223,0.03), rgba(196,168,255,0.05))",
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55, ease: EXPO }}
        >
          {/* Animated gradient border top */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-cycle"
            style={{ opacity: 0.7 }}
          />

          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent/60 mb-3">
              Case Studies — In Production
            </p>
            <h3
              className="font-editorial italic text-ink leading-tight mb-3"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Real work. Coming soon.
            </h3>
            <p className="font-body text-ink/50 max-w-md" style={{ fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.65 }}>
              Currently building case studies from live client work. Every result documented. Every system explained. No fluff.
            </p>
          </div>

          <motion.div
            className="shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 100,
              height: 100,
              background: "conic-gradient(from 0deg, #6E9EFF, #4DFFDF, #C4A8FF, #FF6B35, #6E9EFF)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="rounded-full flex items-center justify-center"
              style={{
                width: 84,
                height: 84,
                background: "var(--bg-void)",
              }}
            >
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/50 text-center leading-tight">
                Work<br/>Soon
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
