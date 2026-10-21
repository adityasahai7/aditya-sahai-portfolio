"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "motion/react";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ComponentProps, type CSSProperties, type ReactNode } from "react";
import type { Tone } from "@/lib/content";
import { CLASHES, FILLS, ScrollTrigger, ease, gsap } from "./core";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "div";

/** TBC signature: each line rises from behind a mask as it scrolls into view. */
export function MaskLines({ lines, as = "h2", className = "", delay = 0, accent = -1, once = true }: { lines: ReactNode[]; as?: HeadingTag; className?: string; delay?: number; accent?: number; once?: boolean }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={`mask-lines ${className}`} initial={reduce ? false : "hidden"} whileInView="shown" viewport={{ once, margin: "0px 0px -10% 0px" }}>
      {lines.map((line, index) => (
        <span className="mask-line" key={index}>
          <motion.span
            className={`mask-inner ${index === accent ? "is-accent" : ""}`}
            variants={{ hidden: { y: "110%", rotate: 4 }, shown: { y: "0%", rotate: 0, transition: { duration: 0.95, delay: delay + index * 0.11, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** TBC signature #2: a paragraph whose words light up one by one as you scroll. */
export function ScrubText({ text, hot = [], className = "" }: { text: string; hot?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el.querySelectorAll(".scrub-word"), { opacity: 0.14 }, {
        opacity: 1, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: el, start: "top 82%", end: "bottom 42%", scrub: 0.4 },
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className={`scrub-text ${className}`}>
      {text.split(" ").map((word, index) => (
        <Fragment key={index}>
          <span className={`scrub-word ${hot.includes(word) ? "is-hot" : ""}`}>{word}</span>{" "}
        </Fragment>
      ))}
    </p>
  );
}

/** WTF-style letters: outlined type where letters randomly flood with colour, and flip on hover/tap. */
export function FlipText({ text, className = "", auto = true, outline = true }: { text: string; className?: string; auto?: boolean; outline?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const palette = useRef<string[]>(FILLS);
  useEffect(() => {
    const room = ref.current?.closest<HTMLElement>("[data-room]")?.dataset.room ?? "paper";
    palette.current = FILLS.filter((c) => !(CLASHES[room] ?? []).includes(c));
  }, []);
  const flip = (letter: HTMLElement, hold = 900) => {
    if (letter.dataset.space) return;
    const p = palette.current;
    letter.style.color = p[Math.floor(Math.random() * p.length)];
    letter.classList.add("is-filled");
    window.clearTimeout(Number(letter.dataset.t));
    letter.dataset.t = String(window.setTimeout(() => { letter.classList.remove("is-filled"); letter.style.color = ""; }, hold));
  };
  useEffect(() => {
    const el = ref.current;
    if (!el || !auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>(".flip-letter:not([data-space])"));
    let visible = false;
    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0.2 });
    io.observe(el);
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return;
      for (let i = 0; i < 3; i += 1) flip(letters[Math.floor(Math.random() * letters.length)], 700 + Math.random() * 1400);
    }, 260);
    return () => { window.clearInterval(id); io.disconnect(); };
  }, [auto]);
  return (
    <span ref={ref} className={`flip-text ${outline ? "is-outline" : ""} ${className}`} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span key={index} aria-hidden="true" className="flip-letter" data-space={char === " " ? "1" : undefined} onPointerEnter={(e) => flip(e.currentTarget, 1200)}>
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}

/** Fade + rise with a spring when scrolled into view. */
export function Reveal({ children, className = "", delay = 0, y = 40, rotate = 0, as = "div", style }: { children: ReactNode; className?: string; delay?: number; y?: number; rotate?: number; as?: "div" | "li" | "article" | "section"; style?: CSSProperties }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag className={className} style={style} initial={reduce ? false : { opacity: 0, y, rotate }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "0px 0px -8% 0px" }} transition={{ type: "spring", stiffness: 90, damping: 16, delay }}>
      {children}
    </Tag>
  );
}

/** Buttons that lean toward the cursor and squish into their shadow when pressed. */
export function Magnetic({ children, strength = 0.35, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });
  return (
    <motion.span
      className={`magnetic ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      {children}
    </motion.span>
  );
}

type BtnProps = { href: string; children: ReactNode; tone?: Tone; external?: boolean; cursor?: string; size?: "md" | "lg" | "xl"; className?: string };
export function Btn({ href, children, tone = "ink", external, cursor, size = "md", className = "" }: BtnProps) {
  const cls = `btn btn-${tone} btn-${size} ${className}`;
  const ext = external ?? /^https?:|^mailto:/.test(href);
  return (
    <Magnetic>
      {ext ? (
        <a className={cls} href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" data-cursor={cursor ?? "GO ↗"}>{children}</a>
      ) : (
        <Link className={cls} href={href} data-cursor={cursor ?? "GO"}>{children}</Link>
      )}
    </Magnetic>
  );
}

export function Sticker({ children, tone = "yellow", tilt = -3, className = "", style }: { children: ReactNode; tone?: Tone; tilt?: number; className?: string; style?: CSSProperties }) {
  return <span className={`sticker tone-${tone} ${className}`} style={{ ...style, rotate: `${tilt}deg` }}>{children}</span>;
}

export function Label({ children, tone = "ink" }: { children: ReactNode; tone?: Tone }) {
  return <p className={`label tone-text-${tone}`}><span className="label-dot" />{children}</p>;
}

/** Hand-drawn doodles that draw themselves when they scroll into view. */
const DOODLES = {
  underline: "M4 14 C 60 4, 120 22, 180 10 S 280 6, 296 12",
  circle: "M150 8 C 60 6, 8 30, 12 58 C 16 92, 120 108, 210 96 C 290 84, 300 30, 230 14 C 190 6, 140 8, 96 16",
  arrow: "M10 60 C 60 10, 140 6, 200 40 M200 40 L 176 22 M200 40 L 178 62",
  squiggle: "M4 30 Q 24 4, 44 30 T 84 30 T 124 30 T 164 30 T 204 30",
  star: "M100 10 L 120 75 L 190 75 L 135 115 L 155 185 L 100 140 L 45 185 L 65 115 L 10 75 L 80 75 Z",
};
export function Doodle({ kind, color = "#F18179", className = "", width = 3.5, delay = 0 }: { kind: keyof typeof DOODLES; color?: string; className?: string; width?: number; delay?: number }) {
  const reduce = useReducedMotion();
  const box = kind === "star" ? "0 0 200 200" : kind === "circle" ? "0 0 310 112" : kind === "arrow" ? "0 0 220 80" : kind === "squiggle" ? "0 0 210 60" : "0 0 300 24";
  return (
    <svg className={`doodle doodle-${kind} ${className}`} viewBox={box} fill="none" aria-hidden="true" preserveAspectRatio="none">
      <motion.path d={DOODLES[kind]} stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 1.1, delay, ease }} />
    </svg>
  );
}

/** 3D tilt toward the pointer (mouse) or device tilt feel on press (touch). */
export function Tilt({ children, className = "", max = 10, ...rest }: { children: ReactNode; className?: string; max?: number } & Omit<ComponentProps<typeof motion.div>, "children">) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  return (
    <motion.div
      {...rest}
      className={`tilt ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, ...(rest.style as object) }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * max * 2);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * max * 2);
      }}
      onPointerLeave={() => { rx.set(0); ry.set(0); }}
    >
      {children}
    </motion.div>
  );
}

/** Infinite marquee that speeds up and skews with scroll velocity. */
export function Marquee({ items, tone = "ink", reverse = false, tilt = 0, className = "", speed = 40 }: { items: string[]; tone?: Tone; reverse?: boolean; tilt?: number; className?: string; speed?: number }) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skew = useSpring(useTransform(velocity, [-2500, 0, 2500], [-8, 0, 8]), { stiffness: 120, damping: 30 });
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee tone-${tone} ${className}`} style={{ rotate: `${tilt}deg` }}>
      <motion.div className={`marquee-track ${reverse ? "is-reverse" : ""}`} style={{ skewX: skew, animationDuration: `${speed}s` }}>
        {row.map((item, index) => <span key={index}>{item}<i aria-hidden="true">✦</i></span>)}
      </motion.div>
    </div>
  );
}

/** Wire up ScrollTrigger refresh after fonts/images settle. */
export function useRefreshOnLoad() {
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600);
    void document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => window.clearTimeout(t);
  }, []);
}

export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => { const id = window.setTimeout(() => setM(true), 0); return () => window.clearTimeout(id); }, []);
  return m;
}
