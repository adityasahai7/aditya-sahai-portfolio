"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { beyondDefault, builds, frrost, hero, operator, ribbons, sides, tbc, whatIDo, LINKS } from "@/lib/content";
import { gsap } from "@/components/motion/core";
import { Btn, Doodle, FlipText, Label, Marquee, MaskLines, Reveal, ScrubText, Tilt, useRefreshOnLoad } from "@/components/motion/kit";
import { StickerPile } from "./StickerPile";
import { MagnetName } from "./MagnetName";
import { AsciiPhoto } from "@/components/fun/AsciiPhoto";
import { LiveClock } from "@/components/fun/Fun";

/* ─────────────────────────── HERO ─────────────────────────── */
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, 120]);
  const nameY = useTransform(scrollY, [0, 700], [0, -80]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotY = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 120, damping: 14 });
  const rotX = useSpring(useTransform(my, [-1, 1], [10, -10]), { stiffness: 120, damping: 14 });

  return (
    <section className="hero" data-room="paper" onPointerMove={(e) => { mx.set((e.clientX / window.innerWidth) * 2 - 1); my.set((e.clientY / window.innerHeight) * 2 - 1); }}>
      <div className="dot-grid" aria-hidden="true" />
      <StickerPile items={hero.stickers} />
      <div className="hero-inner wrap">
        <motion.div className="hero-copy" style={{ y: nameY }}>
          <motion.p className="hero-kicker" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{hero.kicker}</motion.p>
          <MagnetName rows={[hero.name[0], hero.name[1]]} />
          <motion.div className="hero-title-wrap" initial={reduce ? false : { scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: -4 }} transition={{ type: "spring", stiffness: 200, damping: 12, delay: 1.1 }}>
            <span className="hero-title">⚡ {hero.title}</span>
          </motion.div>
          <motion.p className="hero-identity" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}>
            {hero.identity.map((w, i) => <span key={w} className={`tone-text-${["red", "teal", "fuchsia"][i]}`}>{w}{i < 2 ? " •" : ""}</span>)}
          </motion.p>
          <motion.p className="hero-line" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45 }}>{hero.line}</motion.p>
          <motion.div className="hero-cta" initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
            <Btn href={hero.ctaPrimary.href} tone="ink" size="lg" cursor="WATCH">{hero.ctaPrimary.emoji} {hero.ctaPrimary.label}</Btn>
            <Btn href={hero.ctaSecondary.href} tone="yellow" size="lg" cursor="HI!">{hero.ctaSecondary.emoji} {hero.ctaSecondary.label}</Btn>
          </motion.div>
          <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}><LiveClock /></motion.div>
        </motion.div>
        <motion.div className="hero-photo-wrap" style={{ y: photoY }}>
          <motion.div className="hero-photo" style={{ rotateY: rotY, rotateX: rotX }} initial={reduce ? false : { y: -500, rotate: 20 }} animate={{ y: 0, rotate: -4 }} transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.6 }} whileTap={{ scale: 0.96 }}>
            <span className="tape tape-a" /><span className="tape tape-b" />
            <span className="photo-frame">
              <Image src="/images/aditya-sahai.webp" alt="Aditya Sahai" width={560} height={560} priority sizes="(max-width: 900px) 78vw, 440px" />
              <AsciiPhoto src="/images/aditya-sahai.webp" />
            </span>
            <span className="polaroid-caption">that&apos;s me 👆 (hover / hold me)</span>
          </motion.div>
          <motion.span className="hero-badge" initial={reduce ? false : { scale: 0 }} animate={{ scale: 1, rotate: [0, 360] }} transition={{ scale: { delay: 1.5, type: "spring" }, rotate: { duration: 14, repeat: Infinity, ease: "linear" } }}>
            <svg viewBox="0 0 120 120"><defs><path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" /></defs><text><textPath href="#badge-circle" textLength="272" lengthAdjust="spacing">THINK BEYOND DEFAULT ✦ CREATIVE AI ✦</textPath></text></svg>
            <b>🧠</b>
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────── RIBBONS ─────────────────────────── */
export function Ribbons() {
  return (
    <section className="ribbons" data-room="ink" aria-label="Beliefs">
      <Marquee items={ribbons[0]} tone="yellow" tilt={-3} speed={38} />
      <Marquee items={ribbons[1]} tone="red" tilt={2.5} reverse speed={44} />
    </section>
  );
}

/* ──────────────── WHAT'S A CREATIVE AI OPERATOR (pinned) ──────────────── */
export function Operator() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    mm.add({ desk: "(min-width: 900px)", mobile: "(max-width: 899px)" }, (c) => {
      const desk = (c.conditions as { desk: boolean }).desk;
      const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector(".op-stage"), start: "top top", end: desk ? "+=2600" : "+=2000", scrub: 0.7, pin: true, anticipatePin: 1 } });
      tl.to(".op-question", { scale: 0.55, y: desk ? "-34vh" : "-30vh", opacity: 0.18, duration: 1 })
        .from(".op-answer", { scale: 3, opacity: 0, rotate: -12, duration: 0.6 }, "<0.2")
        .to(".op-answer", { y: desk ? "-24vh" : "-22vh", scale: 0.7, duration: 0.6 }, ">0.2")
        .from(".op-card", { y: "110vh", rotate: (i: number) => [-30, 20, -14][i], stagger: 0.25, duration: 1 }, "<")
        .from(".op-plus", { scale: 0, rotate: 180, stagger: 0.2, duration: 0.4 }, "<0.6")
        .to(".op-card", { x: (i: number) => (desk ? [260, 0, -260][i] : 0), y: (i: number) => (desk ? 0 : [90, 0, -90][i]), rotate: (i: number) => [-6, 3, -2][i], scale: 0.86, duration: 0.8 }, ">0.3")
        .to(".op-plus", { opacity: 0, duration: 0.3 }, "<")
        .from(".op-definition", { scale: 0.4, opacity: 0, rotate: 8, duration: 0.7 }, ">-0.2");
    }, el);
    return () => mm.revert();
  }, []);
  return (
    <section className="operator" ref={ref} data-room="yellow">
      <div className="op-stage">
        <div className="dot-grid" aria-hidden="true" />
        <p className="label op-label"><span className="label-dot" />{operator.label}</p>
        <h2 className="op-question">
          {operator.question.map((line) => <span key={line}><FlipText text={line} /></span>)}
        </h2>
        <p className="op-answer"><FlipText text={operator.answer} outline={false} /></p>
        <div className="op-cards">
          {operator.cards.map((c, i) => (
            <div key={c.title} className="op-card-slot">
              <div className={`op-card tone-${c.tone}`}><span className="op-emoji">{c.emoji}</span><b>{c.title}</b><p>{c.body}</p></div>
              {i < 2 && <span className="op-plus">+</span>}
            </div>
          ))}
        </div>
        <div className="op-definition"><span className="op-eq">= CREATIVE AI OPERATOR 🎯</span><p>{operator.definition}</p></div>
      </div>
      <div className="op-scrub wrap"><ScrubText text={operator.scrub} hot={operator.hot} /><Doodle kind="arrow" color="#202727" className="op-arrow" /></div>
    </section>
  );
}

/* ───────────────────── WHAT I DO (horizontal) ───────────────────── */
export function WhatIDo() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = el.querySelector<HTMLElement>(".wid-track");
    if (!track) return;
    const ctx = gsap.context(() => {
      const dist = () => track.scrollWidth - window.innerWidth + 40;
      const tween = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => `+=${dist()}`, scrub: 0.6, pin: true, invalidateOnRefresh: true, anticipatePin: 1 } });
      gsap.utils.toArray<HTMLElement>(".wid-card").forEach((card, i) => {
        gsap.from(card.querySelector(".wid-emoji"), { scale: 0, rotate: -90, ease: "back.out(2)", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", toggleActions: "play none none reverse" } });
        gsap.fromTo(card, { rotate: i % 2 ? 4 : -4 }, { rotate: i % 2 ? -2 : 2, ease: "none", scrollTrigger: { trigger: card, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
    }, el);
    return () => ctx.revert();
  }, []);
  return (
    <section className="wid" ref={ref} data-room="mint">
      <div className="wid-head wrap">
        <Label>{whatIDo.label}</Label>
        <MaskLines lines={whatIDo.title} className="h-xl" accent={1} />
      </div>
      <div className="wid-track">
        {whatIDo.cards.map((c, i) => (
          <Link key={c.title} href={c.href} className={`wid-card tone-${c.tone}`} data-cursor="OPEN">
            <span className="wid-num">0{i + 1}</span>
            <span className="wid-emoji">{c.emoji}</span>
            <h3>{c.title}</h3>
            <p>{c.body}</p>
            <span className="wid-cta">{c.cta} →</span>
          </Link>
        ))}
        <div className="wid-end"><Doodle kind="star" color="#F18179" width={5} /><p>…and a lot of chai ☕</p></div>
      </div>
    </section>
  );
}

/* ───────────────────── SEVEN SIDES (fanned deck) ───────────────────── */
export function Sides() {
  const ref = useRef<HTMLElement>(null);
  const [flipped, setFlipped] = useState<number | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
      gsap.from(".side-card", { rotate: 0, x: (i: number) => (3 - i) * 150, y: 60, ease: "power3.out", stagger: 0.03, scrollTrigger: { trigger: ".sides-deck", start: "top 85%", end: "top 30%", scrub: 0.8 } });
    }, el);
    mm.add("(max-width: 899px)", () => {
      gsap.from(".side-card", { x: (i: number) => (i % 2 ? 140 : -140), rotate: (i: number) => (i % 2 ? 14 : -14), opacity: 0, stagger: 0.1, ease: "back.out(1.6)", scrollTrigger: { trigger: ".sides-deck", start: "top 85%", end: "bottom 60%", scrub: 0.8 } });
    }, el);
    return () => mm.revert();
  }, []);
  const colors = ["red", "yellow", "cyan", "mint", "fuchsia", "sea", "paper"] as const;
  return (
    <section className="sides" ref={ref} data-room="paper">
      <div className="wrap">
        <Label tone="red">{sides.label}</Label>
        <MaskLines lines={sides.title} className="h-xl" accent={1} />
        <p className="hint">Hover or tap a card to flip it ↻</p>
      </div>
      <div className="sides-deck">
        {sides.cards.map((c, i) => (
          <button key={c.name} type="button" className={`side-card tone-${colors[i]}`} style={{ ["--i" as string]: i - 3 }} data-cursor="FLIP"
            onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(i)} onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(null)} onClick={() => setFlipped(flipped === i ? null : i)} aria-pressed={flipped === i}>
            <motion.span className="side-inner" animate={{ rotateY: flipped === i ? 180 : 0 }} transition={{ type: "spring", stiffness: 160, damping: 17 }}>
              <span className="side-face side-front"><span className="side-emoji">{c.emoji}</span><b>{c.name}</b><small>0{i + 1} / 07</small></span>
              <span className="side-face side-back"><b>{c.name}</b><p>{c.body}</p></span>
            </motion.span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── BEYOND DEFAULT teaser ───────────────────── */
export function ShowTeaser() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { backgroundColor: "#9CE8F2" }, { backgroundColor: "#202727", ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "center center", scrub: true } });
      gsap.fromTo(".show-title", { color: "#202727" }, { color: "#F7F1E7", ease: "none", scrollTrigger: { trigger: el, start: "top 60%", end: "center center", scrub: true } });
      gsap.to(".film-strip", { xPercent: -30, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
    }, el);
    return () => ctx.revert();
  }, []);
  const frames = ["🎬", "🤖", "📜", "🧠", "🐉", "🚀", "🎞️", "🔬", "🎨", "🌍", "🎙️", "💡", "📚", "🏛️"];
  return (
    <section className="show" ref={ref} data-room="cyan">
      <div className="film-strip" aria-hidden="true">{[...frames, ...frames].map((f, i) => <span key={i}>{f}</span>)}</div>
      <div className="wrap show-inner">
        <p className="rec"><span /> REC · {beyondDefault.label}</p>
        <MaskLines lines={beyondDefault.title} className="show-title h-mega" />
        <p className="show-tag">{beyondDefault.tagline}</p>
        <div className="show-exp">
          {beyondDefault.experiences.map((x, i) => (
            <Reveal key={x.name} delay={i * 0.12} className={`show-card tone-${x.tone}`} rotate={i ? 3 : -3}>
              <span className="show-when">{x.when}</span>
              <span className="show-emoji">{x.emoji}</span>
              <h3>{x.name}</h3>
              <p>{x.body}</p>
            </Reveal>
          ))}
        </div>
        <div className="show-cta">
          <Btn href={LINKS.youtube} tone="red" size="lg" cursor="WATCH">▶️ Watch on YouTube</Btn>
          <Btn href="/beyond-default" tone="paper" size="lg">What is Beyond Default? →</Btn>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── THREE WORLDS (doors) ───────────────────── */
export function Worlds() {
  const [open, setOpen] = useState<number | null>(null);
  const doors = [
    { name: "Beyond Default", emoji: "🎬", tone: "red", peek: beyondDefault.tagline, href: "/beyond-default", label: "THE SHOW" },
    { name: "Thinking Beyond Club", emoji: "🫂", tone: "yellow", peek: tbc.creed.join(" "), href: "/thinking-beyond-club", label: "THE CLUB" },
    { name: "FRROST Media", emoji: "📈", tone: "mint", peek: frrost.question.join(" "), href: "/frrost-media", label: "THE COMPANY" },
  ] as const;
  return (
    <section className="worlds" data-room="ink">
      <div className="wrap">
        <Label tone="yellow">THREE WORLDS · ONE GUY</Label>
        <MaskLines lines={["PICK A DOOR.", "ANY DOOR. 🚪"]} className="h-xl worlds-title" accent={1} />
      </div>
      <div className="doors wrap">
        {doors.map((d, i) => (
          <Reveal key={d.name} delay={i * 0.12} y={80}>
            <Link href={d.href} className={`door-frame ${open === i ? "is-open" : ""}`} data-cursor="ENTER"
              onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)} onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
              onClick={(e) => { if (window.matchMedia("(hover: none)").matches && open !== i) { e.preventDefault(); setOpen(i); } }}>
              <span className={`door-peek tone-${d.tone}`}><span>{d.emoji}</span><b>{d.peek}</b><small>Tap again to enter →</small></span>
              <motion.span className={`door tone-${d.tone}`} animate={{ rotateY: open === i ? -72 : 0 }} transition={{ type: "spring", stiffness: 90, damping: 14 }}>
                <span className="door-label">{d.label}</span>
                <span className="door-emoji">{d.emoji}</span>
                <b className="door-name">{d.name}</b>
                <span className="door-knob" />
              </motion.span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────── BUILDS (bento) ───────────────────── */
export function Builds({ full = false }: { full?: boolean }) {
  return (
    <section className="builds" data-room="paper">
      <div className="wrap">
        {!full && <Label tone="fuchsia">{builds.label}</Label>}
        {!full && <MaskLines lines={builds.title} className="h-xl" accent={1} />}
        <div className="bento">
          {builds.items.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.08} className={`bento-cell is-${b.size}`}>
              <Tilt className={`bento-card tone-${b.tone}`} max={7}>
                <a href={b.href} target={b.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" data-cursor="VISIT ↗">
                  <span className="bento-kind">{b.kind}</span>
                  <motion.span className="bento-emoji" animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}>{b.emoji}</motion.span>
                  <h3>{b.name}</h3>
                  <p>{b.body}</p>
                  <span className="bento-visit">Visit ↗</span>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── Writing teaser ───────────────────── */
export function WritingTeaser({ articles }: { articles: { slug: string; title: string; excerpt: string; category: string; readingTime: string }[] }) {
  const tones = ["yellow", "cyan", "red", "mint", "fuchsia", "paper"] as const;
  return (
    <section className="writing" data-room="paper">
      <div className="wrap">
        <Label tone="teal">THINGS I WROTE ✍️</Label>
        <MaskLines lines={["READ MY", "THINKING."]} className="h-xl" accent={1} />
        <div className="deal">
          {articles.slice(0, 3).map((a, i) => (
            <motion.div key={a.slug} className="deal-slot" initial={{ y: 200, rotate: [-18, 8, 20][i], opacity: 0 }} whileInView={{ y: 0, rotate: [-3, 1.5, 4][i], opacity: 1 }} viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 80, damping: 13, delay: i * 0.12 }} whileHover={{ y: -18, rotate: 0, scale: 1.03 }}>
              <Link href={`/articles/${a.slug}`} className={`deal-card tone-${tones[i]}`} data-cursor="READ">
                <span className="deal-cat">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <small>{a.readingTime} →</small>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="center"><Btn href="/articles" tone="ink">All writing →</Btn></div>
      </div>
    </section>
  );
}

export function HomeRefresh() {
  useRefreshOnLoad();
  return null;
}

