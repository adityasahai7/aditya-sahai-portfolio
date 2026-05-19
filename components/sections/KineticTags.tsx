"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useInView,
} from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

const BLOBS = [
  { color: "#6E9EFF", size: 260, left: "6%",  top: "8%",  bobDur: 5.2, bobDelay: 0   },
  { color: "#6E9EFF", size: 160, left: "70%", top: "-4%", bobDur: 6.8, bobDelay: 0.8 },
  { color: "#C4A8FF", size: 140, left: "82%", top: "52%", bobDur: 5.6, bobDelay: 0.4 },
  { color: "#6E9EFF", size: 120, left: "40%", top: "62%", bobDur: 7.0, bobDelay: 1.2 },
  { color: "#C4A8FF", size: 90,  left: "18%", top: "70%", bobDur: 6.2, bobDelay: 0.6 },
];

const TAGS = [
  { label: "AI Brand Identity",    color: "#6E9EFF" },
  { label: "Content Systems",      color: "#C4A8FF" },
  { label: "UGC Ad Creative",      color: "#6E9EFF" },
  { label: "Growth Strategy",      color: "#4DFFDF" },
  { label: "AI Workflows",         color: "#C4A8FF" },
  { label: "Personal Brand",       color: "#6E9EFF" },
  { label: "Performance Creative", color: "#4DFFDF" },
  { label: "Automation",           color: "#C4A8FF" },
  { label: "Brand Systems",        color: "#6E9EFF" },
];

export default function KineticTags() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, amount: 0.2 });

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const sx   = useSpring(rawX, { stiffness: 28, damping: 22 });
  const sy   = useSpring(rawY, { stiffness: 28, damping: 22 });
  const spotBg = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgba(110,158,255,0.09), transparent 58%)`;

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative overflow-hidden py-24 md:py-36"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 premium-divider-animated" />

      {/* Cursor spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: spotBg }}
        aria-hidden="true"
      />

      {/* Fine grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(110,158,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,158,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Floating colour blobs */}
      {BLOBS.map((blob, i) => (
        <motion.div
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  blob.size,
            height: blob.size,
            left:   blob.left,
            top:    blob.top,
            background: `radial-gradient(circle, ${blob.color}28 0%, ${blob.color}0a 60%, transparent 100%)`,
            border: `1px solid ${blob.color}18`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 1, scale: 1, y: [0, -20, 0] } : {}}
          transition={{
            opacity: { duration: 0.8, delay: 0.1 * i, ease: EXPO },
            scale:   { duration: 0.8, delay: 0.1 * i, ease: EXPO },
            y: {
              duration:   blob.bobDur,
              repeat:     Infinity,
              ease:       "easeInOut",
              delay:      blob.bobDelay,
              repeatType: "loop",
            },
          }}
        />
      ))}

      {/* Kinetic typography */}
      <div className="container-main relative z-10">

        {/* Line 1 — cycling gradient italic */}
        <div className="overflow-hidden">
          <motion.div
            className="font-editorial italic leading-[0.88] gradient-text-cycle-slow"
            style={{ fontSize: "clamp(72px, 11vw, 168px)" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 1.05, ease: EXPO }}
          >
            Build brands.
          </motion.div>
        </div>

        {/* Line 2 — faint display (contrast) */}
        <div className="overflow-hidden">
          <motion.div
            className="font-display font-semibold leading-[0.88] text-ink/15"
            style={{ fontSize: "clamp(66px, 10.5vw, 156px)", letterSpacing: "-0.03em" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 1.05, delay: 0.13, ease: EXPO }}
          >
            Systems that scale.
          </motion.div>
        </div>

        {/* Line 3 — two accent colours */}
        <div className="overflow-hidden">
          <motion.div
            className="font-editorial italic leading-[0.88]"
            style={{ fontSize: "clamp(62px, 10vw, 148px)" }}
            initial={{ y: "105%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 1.05, delay: 0.26, ease: EXPO }}
          >
            <span className="gradient-text-cycle-fast">Results</span>{" "}
            <span style={{ color: "#6E9EFF" }}>that compound.</span>
          </motion.div>
        </div>

        {/* Floating keyword tags */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-10 md:mt-14">
          {TAGS.map((tag, i) => (
            <motion.span
              key={tag.label}
              className="font-mono text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full"
              style={{
                color:      tag.color,
                background: `${tag.color}10`,
                border:     `1px solid ${tag.color}28`,
              }}
              initial={{ opacity: 0, y: 18, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.46 + i * 0.055, ease: EXPO }}
              whileHover={{
                scale:  1.06,
                background: `${tag.color}1c`,
                borderColor: `${tag.color}55`,
                transition: { duration: 0.18 },
              }}
            >
              {tag.label}
            </motion.span>
          ))}
        </div>

        {/* ── Reverse ticker (ORION Step 11) ── */}
        <motion.div
          className="mt-10 -mx-6 md:-mx-12 xl:-mx-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: EXPO }}
          aria-hidden="true"
        >
          <div
            className="flex whitespace-nowrap gap-8 py-2"
            style={{ animation: "marquee-scroll 22s linear infinite reverse" }}
          >
            {[0, 1].map((k) => (
              <span key={k} className="flex items-center gap-8 shrink-0">
                {["Brand Identity", "Content Systems", "UGC Ads", "Strategy Audit", "Personal Brand", "AI Operator", "Thinking Beyond", "Built to Convert"].map((item, j) => (
                  <span key={j} className="flex items-center gap-8">
                    <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-ink/20">{item}</span>
                    <span className="text-ink/12">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Eyebrow tag */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink/30 mt-8"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0, ease: EXPO }}
        >
          AI Operator · India · Taking Projects Now
        </motion.p>
      </div>
    </section>
  );
}
