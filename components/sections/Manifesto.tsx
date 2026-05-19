"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const EXPO = [0.16, 1, 0.3, 1] as const;

const BLOBS = [
  { color: "#FF6B35", size: 500, left: "-7%",  top: "1%",   dur: 7.5, delay: 0   },
  { color: "#6E9EFF", size: 360, left: "72%",  top: "3%",   dur: 9.2, delay: 1.4 },
  { color: "#00E87A", size: 280, left: "52%",  top: "26%",  dur: 6.8, delay: 0.7 },
  { color: "#FF4F4F", size: 220, left: "14%",  top: "40%",  dur: 8.4, delay: 1.9 },
  { color: "#C4A8FF", size: 200, left: "84%",  top: "36%",  dur: 7.2, delay: 0.3 },
  { color: "#4DFFDF", size: 170, left: "36%",  top: "12%",  dur: 6.4, delay: 1.1 },
  { color: "#FF6B35", size: 240, left: "78%",  top: "60%",  dur: 8.0, delay: 0.6 },
  { color: "#6E9EFF", size: 200, left: "6%",   top: "66%",  dur: 7.8, delay: 2.0 },
  { color: "#00E87A", size: 160, left: "44%",  top: "76%",  dur: 6.2, delay: 0.9 },
  { color: "#C4A8FF", size: 130, left: "62%",  top: "88%",  dur: 9.0, delay: 1.7 },
];

const CHIPS = [
  { label: "No templates. Ever.",       color: "#6E9EFF" },
  { label: "Built for your brand",      color: "#C4A8FF" },
  { label: "Agency output, not price",  color: "#4DFFDF" },
  { label: "AI as infrastructure",      color: "#FF6B35" },
  { label: "Yours to keep forever",     color: "#00E87A" },
  { label: "Results in days, not months", color: "#FF4F4F" },
];

const SEP_DOTS = ["#FF6B35", "#C4A8FF", "#4DFFDF", "#6E9EFF", "#00E87A", "#FF4F4F"];

/* Reusable line reveal — overflow-hidden + y slide + whileInView */
function Line({
  children,
  delay = 0,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        style={style}
        initial={{ y: "106%", opacity: 0 }}
        whileInView={{ y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 1.08, delay, ease: EXPO }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const sx = useSpring(rawX, { stiffness: 28, damping: 22 });
  const sy = useSpring(rawY, { stiffness: 28, damping: 22 });
  const spotBg = useMotionTemplate`radial-gradient(1100px circle at ${sx}% ${sy}%, rgba(255,107,53,0.07), transparent 55%)`;

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
      className="relative overflow-hidden"
      style={{
        paddingTop:    "clamp(100px, 14vw, 180px)",
        paddingBottom: "clamp(100px, 14vw, 180px)",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(255,107,53,0.018) 22%, rgba(110,158,255,0.022) 55%, rgba(0,232,122,0.013) 82%, transparent 100%)",
      }}
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-0 premium-divider-animated" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 premium-divider-animated" />

      {/* Cursor spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotBg }} aria-hidden="true" />

      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,107,53,0.016) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,158,255,0.016) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 95% 80% at 50% 50%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 80% at 50% 50%, black 25%, transparent 100%)",
        }}
      />

      {/* Ambient blobs */}
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
            background: `radial-gradient(circle, ${blob.color}20 0%, ${blob.color}09 55%, transparent 100%)`,
            border: `1px solid ${blob.color}14`,
          }}
          initial={{ opacity: 0.07, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.01 }}
          animate={{ y: [0, -22, 0] }}
          transition={{
            opacity: { duration: 1.2, delay: 0.08 * i, ease: EXPO },
            scale:   { duration: 1.2, delay: 0.08 * i, ease: EXPO },
            y: { duration: blob.dur, repeat: Infinity, ease: "easeInOut", delay: blob.delay, repeatType: "loop" },
          }}
        />
      ))}

      <div className="container-main relative z-10">

        {/* ── Eyebrow ── */}
        <motion.p
          className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink/28 mb-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: EXPO }}
        >
          — The Thinking Beyond Manifesto
        </motion.p>

        {/* ══════════════════════════════════
            BLOCK 1 — The movement statement
        ══════════════════════════════════ */}
        <div className="text-center">
          <Line
            delay={0}
            className="font-display font-semibold text-ink leading-[0.88]"
            style={{ fontSize: "clamp(62px, 10vw, 172px)", letterSpacing: "-0.04em" }}
          >
            Brands that move first
          </Line>

          <Line
            delay={0.12}
            className="font-editorial italic leading-[0.88] gradient-text-cycle"
            style={{ fontSize: "clamp(58px, 9.5vw, 162px)" }}
          >
            don&apos;t just compete —
          </Line>

          <Line
            delay={0.24}
            className="font-display font-semibold leading-[0.88]"
            style={{
              fontSize: "clamp(54px, 9vw, 152px)",
              letterSpacing: "-0.04em",
              background: "linear-gradient(95deg, #4DFFDF 0%, #00E87A 50%, #6E9EFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            they dominate.
          </Line>
        </div>

        {/* ══════════════════════════════════
            SPACING + SUB-STATEMENT
            (large display text, not body)
        ══════════════════════════════════ */}
        <div className="text-center mt-24 md:mt-36">

          <Line
            delay={0}
            className="font-editorial italic leading-[1.05]"
            style={{
              fontSize: "clamp(38px, 5.8vw, 96px)",
              background: "linear-gradient(105deg, #FF6B35 0%, #EEEEF5 35%, #C4A8FF 65%, #6E9EFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            AI built for your brand
          </Line>

          <Line
            delay={0.13}
            className="font-display font-semibold leading-[1.0] gradient-text-cycle-slow"
            style={{
              fontSize: "clamp(36px, 5.5vw, 90px)",
              letterSpacing: "-0.03em",
            }}
          >
            isn&apos;t a luxury —
          </Line>

          <Line
            delay={0.26}
            className="font-editorial italic leading-[1.05]"
            style={{
              fontSize: "clamp(34px, 5.2vw, 86px)",
              background: "linear-gradient(100deg, #6E9EFF 0%, #4DFFDF 50%, #00E87A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            it&apos;s the only play that compounds forever.
          </Line>
        </div>

        {/* ══════════════════════════════════
            SEPARATOR — pulsing dot row
        ══════════════════════════════════ */}
        <motion.div
          className="flex items-center justify-center gap-4 my-24 md:my-36"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EXPO }}
        >
          <motion.div
            className="h-[1px] flex-1 max-w-[160px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4))" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.0, delay: 0.3, ease: EXPO }}
          />
          {SEP_DOTS.map((c, i) => (
            <motion.span
              key={i}
              className="rounded-full shrink-0"
              style={{
                width:     i === 2 || i === 3 ? 10 : 6,
                height:    i === 2 || i === 3 ? 10 : 6,
                background: c,
                boxShadow: `0 0 10px ${c}bb`,
              }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.6, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            className="h-[1px] flex-1 max-w-[160px]"
            style={{ background: "linear-gradient(90deg, rgba(0,232,122,0.4), transparent)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.0, delay: 0.3, ease: EXPO }}
          />
        </motion.div>

        {/* ══════════════════════════════════
            BLOCK 2 — Your brand. My AI.
        ══════════════════════════════════ */}
        <div className="text-center">
          <Line
            delay={0}
            className="font-display font-semibold text-ink leading-[0.88]"
            style={{ fontSize: "clamp(62px, 10vw, 172px)", letterSpacing: "-0.04em" }}
          >
            Your brand.
          </Line>

          <Line
            delay={0.14}
            className="font-editorial italic leading-[0.88]"
            style={{
              fontSize: "clamp(58px, 9.5vw, 162px)",
              background: "linear-gradient(100deg, #FF6B35 0%, #C4A8FF 55%, #6E9EFF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            My AI.
          </Line>

          <Line
            delay={0.28}
            className="font-display font-semibold leading-[0.88] gradient-text-cycle"
            style={{
              fontSize: "clamp(54px, 9vw, 152px)",
              letterSpacing: "-0.04em",
            }}
          >
            Unfair advantage.
          </Line>
        </div>

        {/* ── Chips ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mt-16"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
        >
          {CHIPS.map((chip, i) => (
            <motion.span
              key={chip.label}
              className="font-mono text-[10px] tracking-[0.14em] uppercase px-4 py-2 rounded-full"
              style={{
                color:      chip.color,
                background: `${chip.color}10`,
                border:     `1px solid ${chip.color}28`,
              }}
              initial={{ opacity: 0, scale: 0.88, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.07, ease: EXPO }}
              whileHover={{
                scale:       1.08,
                background:  `${chip.color}1c`,
                borderColor: `${chip.color}55`,
                transition: { duration: 0.18 },
              }}
            >
              {chip.label}
            </motion.span>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          className="flex justify-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EXPO }}
        >
          <MagneticButton onClick={scrollToContact}>
            <span className="btn-cta">
              Claim your unfair advantage →
            </span>
          </MagneticButton>
        </motion.div>

      </div>
    </section>
  );
}
