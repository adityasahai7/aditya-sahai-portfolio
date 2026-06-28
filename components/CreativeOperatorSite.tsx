"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { articles, beliefs, socials } from "@/lib/operator-content";

type StickerVariant = "pill" | "tape" | "stamp" | "square" | "starburst" | "corner-label" | "file-tag";

export function Sticker({
  children,
  variant = "tape",
  className = "",
}: {
  children: React.ReactNode;
  variant?: StickerVariant;
  className?: string;
}) {
  return <span className={`co-sticker co-${variant} ${className}`}>{children}</span>;
}

export function DoodleArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`co-doodle co-doodle-arrow ${className}`} viewBox="0 0 180 90" aria-hidden="true">
      <path d="M12 58C47 18 99 18 151 42" />
      <path d="M132 14l24 29-36 12" />
    </svg>
  );
}

export function ScribbleCircle({ className = "" }: { className?: string }) {
  return (
    <svg className={`co-doodle co-scribble-circle ${className}`} viewBox="0 0 180 100" aria-hidden="true">
      <path d="M17 48C29 13 140 4 161 42c21 38-61 58-111 43C-2 69 21 23 93 16" />
    </svg>
  );
}

export function MarkerUnderline({ className = "" }: { className?: string }) {
  return (
    <svg className={`co-doodle co-marker-underline ${className}`} viewBox="0 0 280 34" aria-hidden="true">
      <path d="M8 19c47-12 96-11 139-8 35 2 74 2 125-5" />
      <path d="M18 28c54-9 115-8 164-6 29 1 57-3 88-10" />
    </svg>
  );
}

function FloatingSpark({ className = "" }: { className?: string }) {
  return <span className={`co-spark ${className}`} aria-hidden="true">✦</span>;
}

function MiniEnvelope() {
  return <span className="co-mini-illo co-mini-envelope" aria-hidden="true"><i /><b /></span>;
}

function MiniArticleSheet() {
  return <span className="co-mini-illo co-mini-sheet" aria-hidden="true"><i /><i /><b /></span>;
}

function MiniMoodboard() {
  return <span className="co-mini-illo co-mini-moodboard" aria-hidden="true"><i /><i /><i /><b /></span>;
}

function MiniSalesPage() {
  return <span className="co-mini-illo co-mini-sales" aria-hidden="true"><i /><i /><b /></span>;
}

export function PhotoFile({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  const [src, setSrc] = useState("/images/aditya-photo.png");
  const photoPaths = useMemo(() => ["/images/aditya-photo.png", "/aditya/aditya-main.png", "/aditya.png"], []);
  const [pathIndex, setPathIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const tags = ["AI BRANDING", "SALES STORIES", "CREATIVE DIRECTION"];

  useEffect(() => {
    if (pathIndex >= photoPaths.length) {
      setFailed(true);
      return;
    }
    setSrc(photoPaths[pathIndex]);
    setFailed(false);
  }, [pathIndex, photoPaths]);

  return (
    <motion.figure
      className={`co-photo-file ${compact ? "compact" : ""} ${className}`}
      whileHover={{ y: -8, rotate: compact ? -1 : 1.6 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      data-cursor="OPEN"
    >
      <div className="co-photo-backdrop" />
      <div className="co-photo-frame">
        {!failed && (
          <img
            src={src}
            alt="Aditya Sahai, Creative AI Operator"
            loading="lazy"
            className="is-loaded"
            onError={() => setPathIndex((index) => index + 1)}
          />
        )}
        {failed && (
          <div className="co-photo-placeholder" role="img" aria-label="Aditya Sahai photo file coming soon">
            <span>PHOTO FILE</span>
            <strong>COMING SOON</strong>
          </div>
        )}
      </div>
      <figcaption>
        <b>ADITYA SAHAI</b>
        <span>CREATIVE AI OPERATOR</span>
      </figcaption>
      {!compact && tags.map((tag, index) => <span className={`co-photo-tag tag-${index + 1}`} key={tag}>{tag}</span>)}
    </motion.figure>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [label, setLabel] = useState("");

  useEffect(() => {
    const move = (event: MouseEvent) => setPos({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setLabel(target.closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "");
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <motion.div className={`co-cursor ${label ? "active" : ""}`} animate={{ x: pos.x, y: pos.y }}>
      {label || ""}
    </motion.div>
  );
}

function PreloaderWTF() {
  const [hidden, setHidden] = useState(false);
  const labels = ["BRANDING", "MARKETING", "SALES", "CREATIVE", "ARTICLES", "NEWSLETTER", "FRROST", "BEYOND DEFAULT", "TBC"];
  useEffect(() => {
    const timeout = window.setTimeout(() => setHidden(true), 2100);
    return () => window.clearTimeout(timeout);
  }, []);
  if (hidden) return null;
  return (
    <motion.div className="co-preloader co-preloader-wtf" exit={{ opacity: 0 }} aria-hidden="true">
      <motion.div className="co-loader-wipe" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.65, ease: [0.76, 0, 0.24, 1] }} />
      <div className="co-loader-card">
        <p className="co-loader-question">WHAT IS A CREATIVE AI OPERATOR?</p>
        <div className="co-loader-tabs" aria-hidden="true">
          {labels.map((item, index) => (
            <motion.span key={item} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: index * 0.055, duration: 0.28 }}>
              {item}
            </motion.span>
          ))}
        </div>
        <motion.div className="co-loader-bars" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }}>
          {[0, 1, 2].map((item) => <motion.i key={item} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: .55, ease: "easeOut" }} />)}
        </motion.div>
        <motion.p className="co-loader-answer" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.08, duration: 0.28 }}>GOOD QUESTION.</motion.p>
        <motion.strong className="co-loader-stamp" initial={{ scale: .72, rotate: -7, opacity: 0 }} animate={{ scale: 1, rotate: -2, opacity: 1 }} transition={{ delay: 1.38, type: "spring", stiffness: 260, damping: 16 }}>FILE OPENED</motion.strong>
      </div>
    </motion.div>
  );
}

export function OperatorNav() {
  return (
    <header className="co-nav">
      <Link href="/" className="co-brand" data-cursor="OPEN">
        ADITYA SAHAI <span>Creative AI Operator</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/about" data-cursor="GO">About</Link>
        <Link href="/articles" data-cursor="READ">Articles</Link>
        <Link href="/newsletter" data-cursor="JOIN">Newsletter</Link>
        <Link href="/frrost-media" data-cursor="ENTER">FRROST</Link>
        <a href="#contact" data-cursor="SEND">Send a Note</a>
      </nav>
    </header>
  );
}

export function OperatorFooter() {
  const footerLinks = [
    ["Home", "/"],
    ["About", "/about"],
    ["Articles", "/articles"],
    ["Newsletter", "/newsletter"],
    ["FRROST Media", "/frrost-media"],
    ["Beyond Default", "/#beyond-default"],
    ["Thinking Beyond Club", "/#thinking-beyond-club"],
    ["Contact", "/#contact"],
    ["Privacy", "/privacy"],
    ["Terms", "/terms"],
  ];
  return (
    <footer className="co-footer">
      <div>
        <Sticker variant="stamp">END OF FILE</Sticker>
        <h2>Aditya Sahai</h2>
        <p>Creative AI Operator · AI branding · AI marketing · sales stories · creative direction · articles · newsletter</p>
        <strong>Thinking Beyond Average.</strong>
      </div>
      <div className="co-footer-links">
        {footerLinks.map(([item, href]) => (
          <Link key={item} href={href}>{item}</Link>
        ))}
      </div>
      <div className="co-socials">
        {socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}
        <a href="mailto:adityasahai037@gmail.com">Email</a>
        <a href="https://wa.me/916207126091" target="_blank" rel="noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 36, rotate: -0.5 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.65, delay }}>
      {children}
    </motion.div>
  );
}

function Marquee() {
  const icons = ["✦", "FILE", "✹", "NOTE", "✺", "SIGNAL"];
  return (
    <section className="co-marquee" aria-label="Creative operator themes">
      <div className="strip-a"><span>AI BRANDING {icons[0]} AI MARKETING {icons[1]} SALES STORIES {icons[2]} CREATIVE DIRECTION {icons[3]} FRROST MEDIA {icons[4]} BEYOND DEFAULT {icons[5]} THINKING BEYOND CLUB {icons[0]} </span><span>AI BRANDING {icons[0]} AI MARKETING {icons[1]} SALES STORIES {icons[2]} CREATIVE DIRECTION {icons[3]} FRROST MEDIA {icons[4]} BEYOND DEFAULT {icons[5]} THINKING BEYOND CLUB {icons[0]} </span></div>
      <div className="reverse strip-b"><span>AI MADE AVERAGE OUTPUT FREE ✦ TASTE IS THE MOAT ✦ CONTENT IS POSITIONING AT SCALE ✦ THINKING BEYOND AVERAGE ✦ </span><span>AI MADE AVERAGE OUTPUT FREE ✦ TASTE IS THE MOAT ✦ CONTENT IS POSITIONING AT SCALE ✦ THINKING BEYOND AVERAGE ✦ </span></div>
      <div className="strip-c"><span>FILE 001 / BIO · FILE 002 / THREE WORLDS · FILE 003 / ARTICLES · FILE 004 / NEWSLETTER · </span><span>FILE 001 / BIO · FILE 002 / THREE WORLDS · FILE 003 / ARTICLES · FILE 004 / NEWSLETTER · </span></div>
    </section>
  );
}

function HeroBoard() {
  const tags = ["AI BRANDING", "SALES STORIES", "CREATIVE DIRECTION"];
  return (
    <motion.div className="co-board" initial={{ opacity: 0, y: 38 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.75, ease: "easeOut" }}>
      <div className="co-board-panel">
        <div className="co-board-meta">
          <span>FILE 001</span>
          <b>THE CREATIVE OPERATOR FILE</b>
        </div>
        <PhotoFile className="co-board-photo" />
        <div className="co-board-tags" aria-label="Creative operator fields">
          {tags.map((tag, index) => <span key={tag} className={`tag-${index + 1}`}>{tag}</span>)}
        </div>
        <div className="co-board-note">NOT AN AI TOOL GUY. THE CREATIVE LAYER AFTER THE TOOL.</div>
      </div>
    </motion.div>
  );
}

function Hero() {
  const words = ["I", "open", "the", "file", "on", "AI,", "branding,", "marketing,", "and", "creative", "work."];
  return (
    <section className="co-hero">
      <div className="co-paper-grid" />
      <Reveal>
        <p className="co-hero-kicker">ADITYA SAHAI / CREATIVE AI OPERATOR / FOUNDER / CO-FOUNDER & CEO, FRROST MEDIA / INDIA</p>
        <h1 className="co-split-title">
          {words.map((word, index) => (
            <Fragment key={`${word}-${index}`}>
              <motion.span
                className={["AI,", "branding,", "marketing,", "creative"].includes(word) ? "highlight" : ""}
                initial={{ opacity: 0, y: 42, rotate: index % 2 ? 1.6 : -1.2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.3 + index * 0.055, duration: 0.6, type: "spring", stiffness: 160, damping: 18 }}
              >
                {word}
              </motion.span>
              {index < words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </h1>
        <p className="co-hero-copy">I use AI, taste, story, and strategy to think through modern brands, content, websites, sales pages, shows, articles, newsletters, and creative systems.</p>
        <p className="co-support">AI made average output free. Taste is the moat.</p>
        <div className="co-actions">
          <Link href="/about" className="co-btn primary" data-cursor="OPEN">Start With My Story <ArrowRight size={17} /></Link>
          <Link href="/articles" className="co-btn" data-cursor="READ">Read the Articles</Link>
          <Link href="/newsletter" className="co-btn" data-cursor="JOIN">Join the Newsletter</Link>
        </div>
      </Reveal>
      <HeroBoard />
    </section>
  );
}

function SectionIntro({ label, title, copy }: { label: string; title: React.ReactNode; copy?: string }) {
  return (
    <div className="co-section-intro">
      <p className="co-label">{label}</p>
      <h2>{title}</h2>
      {copy && <p className="co-section-copy">{copy}</p>}
    </div>
  );
}

function BioSection() {
  return (
    <section className="co-section co-bio" id="about">
      <SectionIntro label="BIO FILE / 01" title="I’m Aditya. I’m building the creative operator lane." />
      <div className="co-bio-grid">
        <Reveal>
          <article className="co-big-card">
            <Sticker variant="stamp">OPEN THE BIO FILE</Sticker>
            <p>I’m not interested in being another AI guy posting tool updates.</p>
            <p>I care about the layer after the tool: the brand, the story, the message, the campaign, the article, the sales page, the website, the show, the newsletter, the creative direction, and the taste that decides what should exist in the first place.</p>
            <p>AI made it easier to produce. It did not make it easier to matter. That is the gap I’m building in.</p>
            <p>I’m a Creative AI Operator from India, building at the intersection of AI, branding, marketing, sales storytelling, content strategy, and creative work.</p>
          </article>
        </Reveal>
        <div className="co-pin-board co-bio-board co-meta-panel">
          <h3>ADITYA SAHAI</h3>
          <p>CREATIVE AI OPERATOR</p>
          <p>FOUNDER</p>
          <p>CO-FOUNDER & CEO, FRROST MEDIA</p>
          <b>INDIA</b>
          <div className="co-bio-facts">
            {["AI Branding", "Marketing", "Sales Stories", "Creative Direction", "Articles", "Newsletter"].map((item, index) => (
              <motion.span key={item} initial={{ opacity: 0, scale: 0.86, rotate: -4 }} whileInView={{ opacity: 1, scale: 1, rotate: index % 2 ? 2 : -2 }} transition={{ delay: index * 0.06 }} viewport={{ once: true }}>{item}</motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniCampaignNote() {
  return <span className="co-mini-illo co-mini-campaign" aria-hidden="true"><i /><i /><b /></span>;
}

function Beliefs() {
  return (
    <section className="co-section co-beliefs">
      <SectionIntro label="BELIEF FILE / 02" title="The beliefs behind the file." copy="Most people use AI to make more average things. I care about using it to make sharper brands, better marketing, stronger stories, and creative work with a reason to exist." />
      <div className="co-card-grid">
        {beliefs.map(([title, copy], index) => (
          <Reveal key={title} delay={index * 0.04}>
            <article className={`co-card belief-${index + 1}`} data-cursor="STORY">
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <MarkerUnderline />
              <p>{copy}</p>
              <small>operator note</small>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section className="co-section co-stack">
      <SectionIntro label="THE STACK / 04" title="Taste → Story → System → Signal." copy="AI can produce. It cannot decide what should exist. That is the creative operator’s job." />
      <div className="co-stack-layers">
        {[
          ["TASTE", "What belongs. What does not. What feels premium. What feels fake."],
          ["STORY", "The positioning, hook, narrative, and emotional reason people care."],
          ["SYSTEM", "The repeatable structure: content, articles, newsletter, website, campaign, creative process."],
          ["SIGNAL", "The public memory created through consistent ideas, visuals, writing, and proof."],
        ].map(([title, copy], index) => (
          <article key={title} data-cursor="OPEN">
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <svg className="co-stack-lines" viewBox="0 0 760 470" aria-hidden="true">
        <path d="M80 58C290 140 514 86 688 171C490 264 263 211 82 315C300 372 513 324 690 420" />
      </svg>
      <Sticker variant="stamp">NO TASTE = AI SLOP</Sticker>
    </section>
  );
}

function ThreeWorlds() {
  const worlds = [
    {
      title: "FRROST Media",
      role: "The AI creative studio.",
      description: "FRROST Media builds brand worlds, websites, marketing systems, sales stories, campaigns, and AI-assisted creative direction for modern founders and brands.",
      points: ["brand worlds", "websites", "marketing systems", "sales stories", "campaigns", "creative direction"],
      cta: "Visit FRROST Media",
      href: "/frrost-media",
      className: "world-frrost",
    },
    {
      title: "Beyond Default Show",
      role: "The breakdown show.",
      description: "Beyond Default is where I break down AI, business, brands, creators, founders, and operator systems — not for motivation, but for mechanisms.",
      points: ["AI breakdowns", "business breakdowns", "brand breakdowns", "creator breakdowns", "operator lessons"],
      cta: "Explore the Show",
      href: "#beyond-default",
      className: "world-default",
    },
    {
      title: "Thinking Beyond Club",
      role: "The community layer.",
      description: "Thinking Beyond Club is for ambitious Indian operators who refuse the default path and want to level up through AI, business, creativity, content, and execution.",
      points: ["community", "learning", "events", "operator challenges", "accountability", "future programs"],
      cta: "Join the Club / Coming Soon",
      href: "#thinking-beyond-club",
      className: "world-club",
    },
  ];
  return (
    <section className="co-section co-worlds">
      <SectionIntro label="THREE WORLDS / 03" title="Three worlds. One creative operator." copy="The work expands into three worlds: the studio, the show, and the club." />
      <div className="co-world-grid">
        {worlds.map((world, index) => (
          <Reveal key={world.title} delay={index * 0.06}>
            <article className={`co-world-card ${world.className}`} data-cursor="OPEN">
              <span>WORLD 0{index + 1}</span>
              <h3>{world.title}</h3>
              <b>{world.role}</b>
              <p>{world.description}</p>
              <ul>{world.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link href={world.href} data-cursor="OPEN">{world.cta} →</Link>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FrrostDoorway() {
  return (
    <section className="co-section co-frrost" id="frrost">
      <SectionIntro label="FRROST MEDIA / 08" title="FRROST Media is the studio layer." copy="The place where creative operator thinking turns into brand worlds, websites, content, sales stories, campaigns, and AI-assisted creative direction." />
      <div className="co-frrost-grid">
        {[
          ["What it is", "An AI creative studio built around branding, marketing, sales storytelling, websites, content, and creative output."],
          ["What it believes", "AI does not replace taste. It multiplies the people who have it."],
          ["What it builds around", "Brand worlds, website experiences, campaign ideas, founder-led content, visual direction, sales stories, content engines, and creative systems."],
        ].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
      <div className="co-frost-lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="co-actions">
        <Link href="/frrost-media" className="co-btn frost" data-cursor="ENTER">Enter the FRROST world</Link>
        <a href="#contact" className="co-btn ghost" data-cursor="SEND">Send a note</a>
      </div>
    </section>
  );
}

function ArticlesPreview() {
  return (
    <section className="co-section co-articles">
      <SectionIntro label="ARTICLES / 05" title="Articles for creative operators, founders, and AI-native brands." copy="Essays on AI branding, AI marketing, creative direction, founder brands, sales pages, content strategy, FRROST Media, Beyond Default, and Thinking Beyond Club." />
      <div className="co-article-grid">
        {articles.filter((article) => article.featured).slice(0, 6).map((article) => (
          <Link key={article.slug} href={`/articles/${article.slug}`} className="co-article-card" data-cursor="READ">
            <span>{article.category}</span>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <small>{article.tags.slice(0, 3).join(" · ")}</small>
            <b>Read File →</b>
          </Link>
        ))}
      </div>
      <Link href="/articles" className="co-btn primary" data-cursor="READ">Read All Articles</Link>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="co-section co-newsletter" id="newsletter">
      <SectionIntro label="NEWSLETTER / 06" title="Thinking Beyond Letter." copy="The Sunday read for Indian operators who refuse the default path. One creative build, one sharp lesson, and three things worth your attention." />
      <div className="co-envelope-stage">
        <MiniEnvelope />
        <Sticker variant="stamp">SUNDAY FILE</Sticker>
        <p>One build. One lesson. Three things worth your attention.</p>
      </div>
      <div className="co-news-grid">
        {["The Build", "The Lesson", "The Round-up"].map((title, index) => (
          <article key={title}><h3>{title}</h3><p>{["What I’m building in AI, branding, marketing, FRROST Media, content, or creative direction.", "One practical idea on taste, story, strategy, sales, creativity, or operator life.", "Three links, campaigns, tools, books, videos, or ideas worth your attention."][index]}</p></article>
        ))}
      </div>
      <div className="co-letter">
        {["The week AI made average content worthless", "What I learned building FRROST’s brand world", "Why your website is the first sales conversation", "AI is not the brand. It is the lever.", "Content is positioning at scale", "Sales pages are stories under pressure"].map((issue) => <span key={issue}>{issue}</span>)}
      </div>
      <Link href="/newsletter" className="co-btn primary" data-cursor="JOIN">Join the Newsletter</Link>
    </section>
  );
}

function BeyondDefault() {
  return (
    <section className="co-section co-show" id="beyond-default">
      <SectionIntro label="BEYOND DEFAULT / 07" title="The show for AI, business, and operator breakdowns." copy="Beyond Default is where I break down AI shifts, business moves, brands, creators, founders, and systems — not for motivation, but for mechanisms." />
      <div className="co-show-grid">
        {[
          ["AI Breakdowns", "New tools, model shifts, AI use cases, creative AI workflows, and what they mean for operators."],
          ["Business Breakdowns", "Brands, creators, startups, campaigns, sales pages, and market moves explained through mechanisms."],
          ["Operator Lessons", "Skills, creative systems, content, sales, writing, execution, and how to think beyond the default path."],
        ].map(([title, copy], index) => (
          <article key={title} data-cursor="STORY">
            <span>STREAM 0{index + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <a href="#contact" className="co-btn" data-cursor="SEND">Explore Beyond Default / Coming Soon</a>
    </section>
  );
}

function ThinkingBeyondClub() {
  return (
    <section className="co-section co-club" id="thinking-beyond-club">
      <SectionIntro label="THINKING BEYOND CLUB / 09" title="A club for Indian operators who refuse the default path." copy="Thinking Beyond Club is the future community layer for ambitious students, creators, founders, and young operators who want to build skills, taste, leverage, and execution in public." />
      <div className="co-club-grid">
        {["AI", "business", "creativity", "content", "career leverage", "operator skills", "accountability", "community", "challenges", "events"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <a href="#contact" className="co-btn primary" data-cursor="JOIN">Join the Waitlist / Coming Soon</a>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ["Who is Aditya Sahai?", "Aditya Sahai is a Creative AI Operator from India building at the intersection of AI branding, AI marketing, creative direction, sales storytelling, articles, newsletter, FRROST Media, Beyond Default Show, and Thinking Beyond Club."],
    ["What is a Creative AI Operator?", "A Creative AI Operator uses AI, taste, story, strategy, and systems to improve the creative and strategic parts of a brand: positioning, content, marketing, websites, sales pages, articles, newsletters, and public trust."],
    ["What is FRROST Media?", "FRROST Media is Aditya’s AI creative studio for brand worlds, websites, marketing systems, content, sales stories, campaigns, and creative direction."],
    ["What is Beyond Default Show?", "Beyond Default is Aditya’s show/content layer where he breaks down AI, business, brands, creators, founders, and operator lessons."],
    ["What is Thinking Beyond Club?", "Thinking Beyond Club is the future community layer for ambitious Indian operators who want to level up through AI, business, creativity, content, and execution."],
    ["What does Aditya write about?", "Aditya writes about AI branding, AI marketing, creative direction, sales pages, founder brands, content strategy, business breakdowns, and operator thinking."],
    ["What is Thinking Beyond Letter?", "Thinking Beyond Letter is Aditya’s newsletter for Indian operators who refuse the default path. It covers creative builds, lessons, links, AI, branding, marketing, and operator thinking."],
    ["Is this a services website?", "No. AdityaSahai.com is primarily a personal brand, bio, article, newsletter, and ecosystem website. It includes soft links to FRROST Media and contact, but it is not built around packages or pricing."],
  ];
  return (
    <section className="co-section co-faq">
      <SectionIntro label="FAQ / 10" title="Clear answers for humans and search engines." />
      <div className="co-faq-list">
        {faqs.map(([question, answer]) => <details key={question} open><summary>{question}</summary><p>{answer}</p></details>)}
      </div>
    </section>
  );
}

export function ContactNote() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      thinkingAbout: form.get("thinkingAbout"),
      noteType: form.get("noteType"),
      message: form.get("message"),
    };
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (response.ok) {
      setStatus("success");
      event.currentTarget.reset();
    } else {
      setStatus("error");
      setError("The note did not send. Try email or WhatsApp directly.");
    }
  }
  return (
    <section className="co-section co-contact" id="contact">
      <div>
        <SectionIntro label="SEND A NOTE / 11" title="Want to open a file with me?" copy="Send a note if you want to talk about brand, marketing, creative direction, articles, newsletter, FRROST Media, Beyond Default, Thinking Beyond Club, or something you’re building." />
        <div className="co-direct">
          <a href="mailto:adityasahai037@gmail.com"><Mail size={18} /> Email</a>
          <a href="https://wa.me/916207126091" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a>
        </div>
      </div>
      <form className="co-note-form" onSubmit={submit}>
        <Sticker variant="stamp">SEND THE NOTE</Sticker>
        <label>Name<input name="name" required /></label>
        <label>Email<input name="email" type="email" required /></label>
        <label>What are you building or thinking about?<input name="thinkingAbout" required /></label>
        <label>What kind of note is this?<select name="noteType" required defaultValue=""><option value="" disabled>Select a file type</option><option>Brand / positioning</option><option>Marketing / content</option><option>Website / landing page</option><option>Article / newsletter</option><option>FRROST Media</option><option>Beyond Default</option><option>Thinking Beyond Club</option><option>Creative direction</option><option>Collaboration</option><option>Something else</option></select></label>
        <label>Message<textarea name="message" minLength={20} required /></label>
        <button className="co-btn primary" type="submit" disabled={status === "loading"} data-cursor="SEND">{status === "loading" ? "Sending..." : "Send the Note"}</button>
        {status === "success" && <p className="co-success">Note received. I’ll read the file and reply if there is a clear next move.</p>}
        {status === "error" && <p className="co-error">{error}</p>}
      </form>
    </section>
  );
}

export default function CreativeOperatorHome() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const progress = useTransform(scaleX, [0, 1], ["0%", "100%"]);
  const websiteSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AdityaSahai.com — The Creative Operator File",
    url: "https://adityasahai.com",
    author: { "@type": "Person", name: "Aditya Sahai", jobTitle: "Creative AI Operator" },
  }), []);

  return (
    <main className="creative-operator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <PreloaderWTF />
      <Cursor />
      <motion.div className="co-progress" style={{ width: progress }} />
      <OperatorNav />
      <Hero />
      <Marquee />
      <BioSection />
      <Beliefs />
      <ThreeWorlds />
      <Stack />
      <ArticlesPreview />
      <Newsletter />
      <BeyondDefault />
      <FrrostDoorway />
      <ThinkingBeyondClub />
      <FAQ />
      <ContactNote />
      <OperatorFooter />
    </main>
  );
}
