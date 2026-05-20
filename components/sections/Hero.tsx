"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import Scramble from "@/components/ui/Scramble";
import LiveTicker from "@/components/ui/LiveTicker";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MagneticButton from "@/components/ui/MagneticButton";

interface HeroProps { loaded: boolean }

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ loaded }: HeroProps) {
  const [phase, setPhase] = useState(0);
  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loaded) return;
    const ts = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 550),
      setTimeout(() => setPhase(3), 1200),
      setTimeout(() => setPhase(4), 1800),
    ];
    return () => ts.forEach(clearTimeout);
  }, [loaded]);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const gX     = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const gY     = useSpring(mouseY, { stiffness: 30, damping: 20 });
  const pX     = useTransform(gX, (v) => v * 100);
  const pY     = useTransform(gY, (v) => v * 100);
  const heroBg = useMotionTemplate`radial-gradient(1000px circle at ${pX}% ${pY}%, rgba(110,158,255,0.08) 0%, transparent 60%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      data-section="hero"
      id="hero"
    >
      <FloatingOrbs count={5} intensity="medium" />

      {/* ── Neural grid (ORION Step 5A) ── */}
      <div aria-hidden="true" className="neural-grid z-[0]" />

      {/* ── Volumetric light shaft (ORION Step 5B) ── */}
      <div aria-hidden="true" className="vol-light z-[1]" />

      {/* ── Floating particles (ORION Step 5C) ── */}
      {[
        { size: 3,  top: "22%",  left: "12%",  color: "rgba(110,158,255,0.7)", dur: "7s",  delay: "0s"    },
        { size: 2,  top: "55%",  left: "8%",   color: "rgba(77,255,223,0.6)",  dur: "9s",  delay: "-2s"   },
        { size: 4,  top: "38%",  left: "88%",  color: "rgba(196,168,255,0.5)", dur: "8s",  delay: "-1.5s" },
        { size: 2,  top: "72%",  left: "82%",  color: "rgba(110,158,255,0.5)", dur: "11s", delay: "-3s"   },
        { size: 3,  top: "15%",  left: "68%",  color: "rgba(77,255,223,0.45)", dur: "6.5s",delay: "-0.8s" },
        { size: 2,  top: "80%",  left: "32%",  color: "rgba(196,168,255,0.6)", dur: "10s", delay: "-2.2s" },
      ].map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="hero-particle"
          style={{
            top:    p.top,
            left:   p.left,
            width:  `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
            "--dur":   p.dur,
            "--delay": p.delay,
            zIndex: 2,
          } as React.CSSProperties}
        />
      ))}

      {/* Cursor glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{ background: heroBg }}
      />

      {/* Grid (subtle, kept for depth) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[0]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(110,158,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(110,158,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          maskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 40%, black 20%, transparent 80%)",
        }}
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-52 pointer-events-none z-[2]"
        style={{ background: "linear-gradient(to bottom, transparent, var(--bg-void))" }}
      />

      {/* Main content — two-column on desktop */}
      <div className="container-main relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 xl:gap-20 pt-28 pb-24">

        {/* LEFT: Text content */}
        <div className="flex flex-col w-full lg:max-w-[600px]">

          {/* Eyebrow badge */}
          <motion.div
            className="mb-8 flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 12 }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <span
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] tracking-[0.18em] uppercase"
              style={{
                background: "rgba(110,158,255,0.06)",
                border: "1px solid rgba(110,158,255,0.15)",
                color: "#C4A8FF",
              }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full pulse-dot shrink-0"
                style={{ backgroundColor: "#4DFFDF", boxShadow: "0 0 8px rgba(77,255,223,0.8)" }}
              />
              AI Operator · Thinking Beyond · Taking Projects
            </span>
          </motion.div>

          {/* Headline */}
          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.h1
                className="font-display font-bold text-ink leading-[0.87] headline-breathe"
                style={{ fontSize: "clamp(52px, 7.5vw, 110px)", letterSpacing: "-0.04em", paddingRight: "0.05em" }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: phase >= 2 ? "0%" : "110%", opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                Your Brand.
              </motion.h1>
            </div>
            <div className="overflow-hidden" style={{ paddingRight: "0.08em" }}>
              <motion.div
                className="font-display font-bold leading-[0.87] gradient-text-cycle"
                style={{
                  fontSize: "clamp(52px, 7.5vw, 110px)",
                  letterSpacing: "-0.04em",
                  filter: "drop-shadow(0 0 80px rgba(77,255,223,0.3))",
                  paddingRight: "0.08em",
                }}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: phase >= 2 ? "0%" : "110%", opacity: phase >= 2 ? 1 : 0 }}
                transition={{ duration: 1.1, delay: 0.07, ease: EASE }}
              >
                <Scramble text="Supercharged." trigger={phase >= 2} speed={22} />
              </motion.div>
            </div>
          </div>

          {/* Sub-description */}
          <motion.p
            className="font-body text-ink/52 max-w-[500px] mb-10"
            style={{ fontSize: "clamp(16px, 1.3vw, 20px)", lineHeight: 1.68, letterSpacing: "-0.01em" }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 18 }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            I am an AI operator. I help brands find AI solutions and build leverage using AI.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: phase >= 4 ? 1 : 0, y: phase >= 4 ? 0 : 18 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <MagneticButton
              as="a"
              href="https://wa.me/916207126091?text=Hi%20Aditya%2C%20I%27d%20like%20to%20book%20a%20free%20call."
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn-cta">
                Book a Free Strategy Call →
              </span>
            </MagneticButton>

            <MagneticButton onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}>
              <span className="btn-ghost">
                See What I Build
              </span>
            </MagneticButton>
          </motion.div>
        </div>

        {/* RIGHT: Circular photo — desktop only */}
        <motion.div
          className="hidden lg:flex flex-col items-center gap-6 shrink-0"
          initial={{ opacity: 0, x: 40, scale: 0.88 }}
          animate={{
            opacity: phase >= 2 ? 1 : 0,
            x:       phase >= 2 ? 0  : 40,
            scale:   phase >= 2 ? 1  : 0.88,
          }}
          transition={{ duration: 1.15, delay: 0.18, ease: EASE }}
        >
          {/* Floating wrapper */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              rotateX: useTransform(gY, [0, 1], [8, -8]),
              rotateY: useTransform(gX, [0, 1], [-8, 8]),
              transformStyle: "preserve-3d",
              perspective: 1200,
            }}
          >
            <div className="relative" style={{ width: 360, height: 360 }}>

              {/* Outer pulsing glow halo */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-[-32px] rounded-full pointer-events-none blur-3xl"
                style={{
                  background: "radial-gradient(circle, rgba(110,158,255,0.32) 0%, rgba(77,255,223,0.12) 50%, rgba(255,107,53,0.06) 80%, transparent 100%)",
                }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Spinning conic gradient ring — outer */}
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #6E9EFF, #4DFFDF, #C4A8FF, #FF6B35, #FF4F4F, #00E87A, #6E9EFF)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              {/* Void gap ring */}
              <div
                className="absolute rounded-full"
                style={{ inset: 4, background: "var(--bg-void)" }}
              />

              {/* Circular orbiting text ring */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ inset: 8 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 344 344"
                  width="344"
                  height="344"
                  fill="none"
                  style={{ position: "absolute", inset: 0 }}
                >
                  <defs>
                    <path
                      id="textCircle"
                      d="M 172,172 m -148,0 a 148,148 0 1,1 296,0 a 148,148 0 1,1 -296,0"
                    />
                  </defs>
                  <text
                    fontFamily="'JetBrains Mono', monospace"
                    fontSize="10.5"
                    letterSpacing="3.5"
                    fill="rgba(242,242,244,0.55)"
                    fontWeight="500"
                    style={{ textTransform: "uppercase" }}
                  >
                    <textPath href="#textCircle" startOffset="0%">
                      ✦ THINKING BEYOND · AI OPERATOR · INDIA · RESULTS IN DAYS ·{" "}
                    </textPath>
                  </text>
                </svg>
              </motion.div>

              {/* Photo */}
              <div
                className="absolute rounded-full overflow-hidden"
                style={{ inset: 20 }}
              >
                {imgError ? (
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(110,158,255,0.15), rgba(196,168,255,0.10))",
                    }}
                  >
                    <span
                      className="font-display font-bold"
                      style={{
                        fontSize: 72,
                        letterSpacing: "-0.04em",
                        background: "linear-gradient(135deg, #6E9EFF, #C4A8FF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      AS
                    </span>
                  </div>
                ) : (
                  <Image
                    src="/aditya.jpg.webp"
                    alt="Aditya Sahai — AI Operator"
                    fill
                    className="object-cover object-top"
                    sizes="320px"
                    priority
                    onError={() => setImgError(true)}
                  />
                )}
              </div>

              {/* Inner counter-spinning accent ring */}
              <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: 16,
                  border: "1px solid transparent",
                  borderTopColor: "rgba(77,255,223,0.5)",
                  borderRightColor: "rgba(110,158,255,0.3)",
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          {/* Name below circle */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <p
              className="font-display font-semibold text-ink"
              style={{ fontSize: "clamp(20px, 1.6vw, 26px)", letterSpacing: "-0.025em" }}
            >
              Aditya Sahai
            </p>
            <p
              className="font-mono text-[10px] tracking-[0.16em] uppercase mt-1.5"
              style={{ color: "#4DFFDF" }}
            >
              AI Operator · Thinking Beyond
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* ── Scroll indicator (ORION Step 5D) ── */}
      <motion.div
        className="absolute bottom-10 left-1/2 flex flex-col items-center gap-2 z-10"
        style={{ translateX: "-50%" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 4 ? 0.6 : 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "rgba(238,238,245,0.35)" }}>
          Scroll
        </span>
        <div className="w-[1px] h-8 overflow-hidden" style={{ background: "rgba(110,158,255,0.15)" }}>
          <motion.div
            className="w-full"
            style={{ height: "40%", background: "linear-gradient(to bottom, transparent, rgba(110,158,255,0.7), transparent)" }}
            animate={{ y: ["-100%", "300%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>

      <LiveTicker />
    </section>
  );
}
