"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";
import { SERVICES } from "@/lib/data";

const EXPO = [0.16, 1, 0.3, 1] as const;

const HOOKS = [
  "Every brand is different. Your AI system should be too.",
  "No packages. No pricing tiers. Just leverage.",
  "Tell me what you're building. I'll tell you where AI gives you 10x.",
  "One conversation. Infinite leverage.",
  "Your brand's unfair advantage — scoped exactly for you.",
];

function AutoHookRotator() {
  const [idx, setIdx] = useState(0);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % HOOKS.length), 3200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <div ref={inViewRef} className="relative h-[56px] overflow-hidden flex items-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          className="font-editorial italic text-ink/65 absolute left-0 right-0"
          style={{ fontSize: "clamp(15px, 1.4vw, 21px)", lineHeight: 1.4 }}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: EXPO }}
        >
          &ldquo;{HOOKS[idx]}&rdquo;
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

const CHAOS_COLORS = ["#6E9EFF", "#9B6FD4", "#4DFFDF", "#C4A8FF", "#7B5EA7"];

export default function WhatIDo() {
  const [chaosHovered, setChaosHovered] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.08 });

  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-transparent section-pad overflow-hidden"
      id="services"
      data-section="services"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />

      {/* Ambient orbs */}
      {[
        { color: "#6E9EFF", size: 500, left: "-8%",  top: "20%", dur: 8.0, delay: 0   },
        { color: "#C4A8FF", size: 320, left: "80%",  top: "60%", dur: 6.5, delay: 1.2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width: orb.size, height: orb.size, left: orb.left, top: orb.top,
            background: `radial-gradient(circle, ${orb.color}12 0%, ${orb.color}04 60%, transparent 100%)`,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1, y: [0, -20, 0] } : {}}
          transition={{
            opacity: { duration: 1.2, ease: EXPO },
            y: { duration: orb.dur, repeat: Infinity, ease: "easeInOut", delay: orb.delay },
          }}
        />
      ))}

      <div className="container-main relative z-10">

        {/* ── PERSONALIZED SOLUTIONS HERO BLOCK ── */}
        <motion.div
          className="mb-20 md:mb-28"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EXPO }}
        >
          <p className="eyebrow text-accent/75 mb-5">
            How I Work — No Packages. Pure Leverage.
          </p>

          <div className="overflow-hidden mb-2">
            <motion.h2
              className="leading-[0.9]"
              style={{ fontSize: "clamp(48px,7vw,96px)" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.08 }}
            >
              <span className="font-display font-semibold text-ink tracking-tight">
                Personalized{" "}
              </span>
              <em className="font-editorial italic gradient-text-cycle">
                AI solutions
              </em>
            </motion.h2>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.h2
              className="leading-[0.9] font-display font-semibold text-ink/40 tracking-tight"
              style={{ fontSize: "clamp(40px,6vw,80px)" }}
              initial={{ y: "110%" }}
              animate={inView ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: EXPO, delay: 0.16 }}
            >
              scoped for your brand.
            </motion.h2>
          </div>

          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.35 }}
          >
            <p className="font-grotesk text-body-lg text-ink/55 mb-6">
              I don&apos;t sell packages. I solve problems. Tell me your brand, your goal, and your bottleneck — I&apos;ll build the exact AI system that gives you leverage. Nothing generic. Nothing templated.
            </p>
            <AutoHookRotator />
          </motion.div>

          {/* CTA row */}
          <motion.div
            className="mt-10 flex flex-wrap gap-4 items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO, delay: 0.5 }}
          >
            <motion.button
              onClick={scrollToContact}
              className="relative overflow-hidden px-8 py-4 rounded-pill font-mono text-[11px] tracking-[0.16em] uppercase"
              style={{
                background: "linear-gradient(135deg, #6E9EFF, #4DFFDF)",
                color: "#050505",
                boxShadow: "0 16px 60px -20px rgba(110,158,255,0.65)",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 rounded-pill pointer-events-none"
                style={{ background: "rgba(255,255,255,0.22)", transformOrigin: "center" }}
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2.5, opacity: 1 }}
                transition={{ duration: 0.5, ease: EXPO }}
                aria-hidden="true"
              />
              <span className="relative z-10">Get Your AI Strategy →</span>
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-ink/45 hover:text-accent transition-colors flex items-center gap-2"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 14 }}
            >
              Free 20-min call · No pitch <span>→</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── SERVICES HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EXPO, delay: 0.2 }}
          className="mb-12"
        >
          <p className="eyebrow text-accent/60 mb-3">What I Build — 06 AI Systems</p>
          <p className="font-grotesk text-ink/42 text-[14px] max-w-md">
            Six systems. Fixed scope. Built from scratch for your brand.
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid — Desktop */}
        <div
          className="hidden lg:grid gap-3"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows:    "280px 220px 280px 200px",
          }}
        >
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            <BentoCard service={SERVICES[0]} index={0} />
          </div>
          <div style={{ gridColumn: "3", gridRow: "1" }}>
            <BentoCard service={SERVICES[1]} index={1} />
          </div>
          <div style={{ gridColumn: "3", gridRow: "2" }}>
            <BentoCard service={SERVICES[2]} index={2} />
          </div>
          <div style={{ gridColumn: "1", gridRow: "3" }}>
            <BentoCard service={SERVICES[3]} index={3} />
          </div>
          <div style={{ gridColumn: "2 / 4", gridRow: "3" }}>
            <BentoCard service={SERVICES[4]} index={4} />
          </div>
          <div style={{ gridColumn: "1 / 3", gridRow: "4" }}>
            <BentoCard service={SERVICES[5]} index={5} />
          </div>

          {/* CHAOS CARD */}
          <div style={{ gridColumn: "3", gridRow: "4" }}>
            <motion.div
              className="relative overflow-hidden rounded-card h-full flex items-center justify-center p-5 cursor-pointer"
              style={{
                border:     "1px solid rgba(255,255,255,0.16)",
                background: `linear-gradient(135deg, ${CHAOS_COLORS[colorIdx]}, ${CHAOS_COLORS[(colorIdx + 2) % CHAOS_COLORS.length]})`,
                boxShadow:  "0 20px 70px -32px rgba(0,0,0,0.85)",
              }}
              animate={{ rotate: chaosHovered ? 0 : [0, 1.5, -1.5, 1.5, 0] }}
              onMouseEnter={() => { setChaosHovered(true); setColorIdx((i) => (i + 1) % CHAOS_COLORS.length); }}
              onMouseLeave={() => setChaosHovered(false)}
              onClick={scrollToContact}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                rotate:  { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.6, delay: 0.4, ease: EXPO },
                y:       { duration: 0.6, delay: 0.4, ease: EXPO },
              }}
            >
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink/80 font-medium mb-2">
                  Not sure where to start?
                </p>
                <p className="font-editorial italic text-ink leading-tight mb-3" style={{ fontSize: "clamp(18px,1.8vw,24px)" }}>
                  Let&apos;s find your leverage.
                </p>
                <p className="font-mono text-[9px] tracking-[0.08em] uppercase text-ink/55">
                  Book a free strategy call →
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile/Tablet */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SERVICES.map((svc, i) => (
            <div key={svc.num} style={{ minHeight: 260 }}>
              <BentoCard service={svc} index={i} />
            </div>
          ))}
          <motion.div
            className="rounded-card p-6 flex items-center justify-center min-h-[160px] cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${CHAOS_COLORS[0]}, ${CHAOS_COLORS[2]})`,
              border: "1px solid rgba(255,255,255,0.16)",
            }}
            onClick={scrollToContact}
            whileTap={{ scale: 0.97 }}
          >
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink/80 mb-1">
                Not sure where to start?
              </p>
              <p className="font-editorial italic text-ink text-[20px]">
                Let&apos;s find your leverage.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
