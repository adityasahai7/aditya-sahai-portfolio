"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { articles, beliefs, creativeFiles, socials } from "@/lib/operator-content";

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
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [src, setSrc] = useState("/images/aditya-photo.png");
  const photoPaths = useMemo(() => ["/images/aditya-photo.png", "/aditya/aditya-main.png"], []);
  const tags = ["AI BRANDING", "MARKETING", "SALES STORY", "ARTICLES"];

  useEffect(() => {
    let cancelled = false;
    async function probe(index: number) {
      if (index >= photoPaths.length) {
        if (cancelled) return;
      setLoaded(false);
      setFailed(true);
        return;
      }
      const image = new window.Image();
      image.onload = () => {
        if (cancelled) return;
        setSrc(photoPaths[index]);
        setLoaded(true);
        setFailed(false);
      };
      image.onerror = () => probe(index + 1);
      image.src = photoPaths[index];
    }
    probe(0);
    return () => {
      cancelled = true;
    };
  }, [photoPaths]);

  return (
    <motion.figure
      className={`co-photo-file ${compact ? "compact" : ""} ${className}`}
      whileHover={{ y: -8, rotate: compact ? -1 : 1.6 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      data-cursor="OPEN"
    >
      <div className="co-photo-backdrop" />
      <div className="co-photo-frame">
        {loaded && !failed && (
          <img
            src={src}
            alt="Aditya Sahai portrait file"
            loading="lazy"
            className="is-loaded"
          />
        )}
        {(!loaded || failed) && (
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
      <Sticker variant="stamp" className="co-photo-stamp">BIO FILE</Sticker>
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

function Preloader() {
  const [hidden, setHidden] = useState(false);
  const labels = ["BIO", "BRANDING", "MARKETING", "SALES", "CREATIVE", "ARTICLES", "NEWSLETTER", "FRROST"];
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
  return (
    <footer className="co-footer">
      <div>
        <Sticker variant="stamp">END OF FILE</Sticker>
        <h2>Aditya Sahai</h2>
        <p>Creative AI Operator · AI branding · AI marketing · sales stories · creative direction · articles · newsletter</p>
        <strong>Thinking Beyond Average.</strong>
      </div>
      <div className="co-footer-links">
        {["Home", "About", "Articles", "Newsletter", "FRROST Media", "Privacy", "Terms"].map((item) => (
          <Link key={item} href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" media", "-media")}`}>{item}</Link>
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
      <div className="strip-a"><span>AI BRANDING {icons[0]} AI MARKETING {icons[1]} SALES STORIES {icons[2]} CREATIVE DIRECTION {icons[3]} FRROST MEDIA {icons[4]} THINKING BEYOND AVERAGE {icons[5]} </span><span>AI BRANDING {icons[0]} AI MARKETING {icons[1]} SALES STORIES {icons[2]} CREATIVE DIRECTION {icons[3]} FRROST MEDIA {icons[4]} THINKING BEYOND AVERAGE {icons[5]} </span></div>
      <div className="reverse strip-b"><span>AI MADE OUTPUT FREE ✦ TASTE IS THE MOAT ✦ CONTENT IS POSITIONING AT SCALE ✦ SALES PAGES ARE STORIES UNDER PRESSURE ✦ OPEN THE CREATIVE FILE ✦ </span><span>AI MADE OUTPUT FREE ✦ TASTE IS THE MOAT ✦ CONTENT IS POSITIONING AT SCALE ✦ SALES PAGES ARE STORIES UNDER PRESSURE ✦ OPEN THE CREATIVE FILE ✦ </span></div>
      <div className="strip-c"><span>FILE META: INDIA / CREATIVE AI OPERATOR / ARTICLES / NEWSLETTER / BRAND WORLDS / PUBLIC THINKING / SOFT CONTACT / </span><span>FILE META: INDIA / CREATIVE AI OPERATOR / ARTICLES / NEWSLETTER / BRAND WORLDS / PUBLIC THINKING / SOFT CONTACT / </span></div>
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
        <p className="co-hero-kicker">ADITYA SAHAI · CREATIVE AI OPERATOR · INDIA</p>
        <p className="co-hero-question">WHAT IS A CREATIVE AI OPERATOR?</p>
        <p className="co-good-question">Good question.</p>
        <h1 className="co-split-title">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              className={["AI,", "branding,", "marketing,", "creative"].includes(word) ? "highlight" : ""}
              initial={{ opacity: 0, y: 42, rotate: index % 2 ? 1.6 : -1.2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ delay: 0.3 + index * 0.055, duration: 0.6, type: "spring", stiffness: 160, damping: 18 }}
            >
              {word}{index < words.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </h1>
        <p className="co-hero-copy">I’m Aditya Sahai. I use AI, taste, storytelling, and strategy to think through modern brands, content, websites, sales pages, articles, newsletters, and creative systems.</p>
        <p className="co-support">AI made average output free. Taste, story, and strategy are the moat.</p>
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
            <p>I care about the layer after the tool: the brand, the story, the message, the campaign, the article, the sales page, the website, the creative direction, and the taste that decides what should exist in the first place.</p>
            <p>AI made it easier to produce. It did not make it easier to matter. That is the gap I’m building in.</p>
            <p>I’m a Creative AI Operator from India, building at the intersection of AI, branding, marketing, sales storytelling, content strategy, and creative work.</p>
          </article>
        </Reveal>
        <div className="co-pin-board co-bio-board co-meta-panel">
          <h3>ADITYA SAHAI</h3>
          <p>CREATIVE AI OPERATOR</p>
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
      <SectionIntro label="BELIEF FILE / 02" title="AI is not the brand. It is the lever." copy="Most people use AI to make more average things. I care about using it to make sharper brands, better marketing, stronger stories, and creative work with a reason to exist." />
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

function CreativeLanes() {
  const lanes = [
    ["Brand", "Positioning + identity", "How a brand sounds, looks, moves, and becomes memorable.", ["positioning", "voice", "visual direction", "brand world", "founder narrative", "message clarity"], "BRAND FILE"],
    ["Market", "Content + campaigns", "How ideas travel through hooks, articles, newsletters, launches, and campaigns.", ["campaign angles", "content ideas", "article topics", "newsletter themes", "creative territories", "distribution thinking"], "SIGNAL DESIGN"],
    ["Sell", "Pages + stories", "How websites, sales pages, CTAs, and proof flows make people understand what to do next.", ["sales story", "landing page flow", "offer narrative", "proof structure", "conversion path"], "STORY UNDER PRESSURE"],
    ["Create", "AI-assisted creative direction", "How AI can explore moodboards, campaign ideas, website worlds, and art direction without replacing taste.", ["moodboards", "visual references", "creative concepts", "website direction", "content packaging"], "TASTE > TOOLS"],
    ["Write", "Articles + letters", "How writing turns thinking into a searchable archive, a trust engine, and a long-term personal brand asset.", ["essays", "articles", "newsletters", "notes", "frameworks", "public thinking"], "ARTICLE FILE"],
  ];
  return (
    <section className="co-section co-lanes">
      <SectionIntro label="CREATIVE LANES / 03" title="Brand. Market. Sell. Create. Write." copy="This is not a package list. It is the map of the work I think about, study, write, and build around." />
      <div className="co-lane-grid">
        {lanes.map(([title, subtitle, copy, items, sticker], index) => (
          <Reveal key={String(title)} delay={index * 0.04}>
            <article className="co-lane" data-cursor="OPEN">
              <Sticker variant="corner-label">{sticker as string}</Sticker>
              <h3>{title as string}</h3>
              <b>{subtitle as string}</b>
              <p>{copy as string}</p>
              <ul>{(items as string[]).map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stack() {
  const orbits = [
    ["moodboard", "references", "delete note"],
    ["hook", "narrative", "belief shift"],
    ["articles", "newsletter", "website"],
    ["recall", "trust", "search"],
  ];
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
            <div className="co-orbit-notes">{orbits[index].map((item) => <span key={item}>{item}</span>)}</div>
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

function Archive() {
  return (
    <section className="co-section co-archive">
      <SectionIntro label="OPEN THE FILE / 05" title="The archive is the proof of taste." copy="A living collection of ideas, brand notes, article drafts, newsletter issues, creative directions, campaign thoughts, website breakdowns, and public build files." />
      <div className="co-drag-label">DRAG TO EXPLORE</div>
      <div className="co-file-row" data-cursor="DRAG">
        {creativeFiles.map(([num, title, type, status, description, sticker, href]) => (
          <Link href={href} className="co-file-card" key={num} data-cursor="OPEN">
            <i className="co-file-tab" />
            <span>FILE {num}</span>
            <Sticker variant="file-tag">{sticker}</Sticker>
            <h3>{title}</h3>
            <b>{type} · {status}</b>
            <p>{description}</p>
            <div className="co-file-preview"><MiniArticleSheet /><MiniMoodboard /></div>
            <em>Open file →</em>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Ecosystem() {
  const nodes = [
    ["FRROST Media", "An AI creative studio for brand worlds, marketing systems, websites, content, sales stories, and creative direction."],
    ["Thinking Beyond Letter", "The Sunday newsletter for Indian operators who refuse the default path."],
    ["Articles", "SEO-rich essays on AI branding, AI marketing, creative direction, founder brands, sales pages, and content strategy."],
    ["Beyond Default", "A content layer for business, AI, creative breakdowns, and upskill paths."],
    ["Thinking Beyond Average", "The anchor phrase, mindset, and future community direction."],
    ["Personal Archive", "Build notes, idea files, creative files, lessons, drafts, and public thinking."],
  ];
  return (
    <section className="co-section co-ecosystem">
      <SectionIntro label="ECOSYSTEM / 06" title="One creative operator. Multiple worlds. Same signal." copy="AdityaSahai.com is the front door. Everything else is a world connected to the same idea: think sharper, build better, and open the file." />
      <div className="co-map">
        <div className="co-map-center">Aditya Sahai<br /><span>Creative AI Operator</span></div>
        {nodes.map(([title, copy], index) => <article key={title} className={`node-${index + 1}`} data-cursor="OPEN"><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>
  );
}

function FrrostDoorway() {
  return (
    <section className="co-section co-frrost" id="frrost">
      <SectionIntro label="FRROST MEDIA / 07" title="FRROST Media is the studio layer." copy="FRROST Media is where the creative operator thinking turns into brand worlds, websites, content systems, campaigns, sales stories, and AI-assisted creative direction." />
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
      <SectionIntro label="ARTICLES / 08" title="Articles for creative operators, founders, and AI-native brands." copy="Essays on AI branding, AI marketing, creative direction, founder personal brands, sales pages, content systems, and building modern brands with taste." />
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
      <SectionIntro label="NEWSLETTER / 09" title="Thinking Beyond Letter." copy="The Sunday read for Indian operators who refuse the default path. One creative build, one sharp lesson, and three things worth your attention." />
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

function BuildTimeline() {
  return (
    <section className="co-section co-timeline">
      <SectionIntro label="THE BUILD / 10" title="The file didn’t start finished." copy="I’m documenting the build, not pretending the destination is already done." />
      <div className="co-timeline-list">
        {["Default Path Question", "First AI Realization", "Brand + Creative Direction", "FRROST Media", "Articles", "Thinking Beyond Letter", "The Creative Operator File"].map((title, index) => (
          <article key={title} data-cursor="STORY"><i className="co-tape-piece" /><span>0{index + 1}</span><h3>{title}</h3><p>{["The point where the obvious route stopped feeling obvious.", "When AI stopped feeling like a toy and started looking like a creative lever.", "The layer that made the most sense: not just using tools, but shaping meaning.", "The studio layer for brand worlds, websites, marketing, and creative output.", "The searchable archive for ideas that should compound.", "The weekly letter for operators who want sharper thinking.", "The public home for the whole thing."][index]}</p></article>
        ))}
      </div>
      <Link href="/about" className="co-btn" data-cursor="GO">Read the Full Bio</Link>
    </section>
  );
}

function FAQ() {
  const faqs = [
    ["Who is Aditya Sahai?", "Aditya Sahai is a Creative AI Operator from India building at the intersection of AI branding, AI marketing, creative direction, content strategy, founder personal branding, articles, newsletters, and FRROST Media."],
    ["What is a Creative AI Operator?", "A Creative AI Operator uses AI to improve the creative and strategic parts of a brand: positioning, content, marketing, sales stories, visual direction, websites, articles, newsletters, and public trust."],
    ["What does Aditya write about?", "Aditya writes about AI branding, AI marketing, creative direction, sales pages, founder personal brands, content strategy, websites, FRROST Media, and the operator mindset behind modern creative work."],
    ["What is FRROST Media?", "FRROST Media is the studio layer Aditya is building around AI-powered branding, marketing, websites, content systems, sales storytelling, and creative direction."],
    ["What is Thinking Beyond Letter?", "Thinking Beyond Letter is Aditya’s newsletter for Indian operators who refuse the default path. It covers creative builds, lessons, links, AI, branding, marketing, and operator thinking."],
    ["What is AI branding?", "AI branding is using AI to support brand positioning, voice, visual direction, customer research, content ideas, and creative exploration without losing strategy or taste."],
    ["What is AI marketing?", "AI marketing is using AI to plan, create, test, and improve marketing assets like content, campaigns, landing pages, sales pages, emails, newsletters, and social posts."],
    ["Does Aditya build websites?", "Aditya thinks about websites as brand worlds and sales conversations. The focus is not just design, but story, structure, message, visual direction, and conversion logic."],
    ["Is this a services website?", "No. AdityaSahai.com is primarily a personal brand, bio, article, and newsletter website. It includes a soft contact path, but it is not built around packages or pricing."],
    ["How do I contact Aditya?", "Use the contact section to send a note about what you’re building, writing, launching, or trying to clarify."],
  ];
  return (
    <section className="co-section co-faq">
      <SectionIntro label="FAQ / 11" title="Clear answers for humans and search engines." />
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
        <SectionIntro label="SEND A NOTE / 12" title="Want to open a file with me?" copy="Send a note if you want to talk about brand, marketing, creative direction, articles, newsletters, websites, FRROST Media, or something you’re building." />
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
        <label>What kind of note is this?<select name="noteType" required defaultValue=""><option value="" disabled>Select a file type</option><option>Brand / positioning</option><option>Marketing / content</option><option>Website / landing page</option><option>Article / newsletter</option><option>FRROST Media</option><option>Creative direction</option><option>Collaboration</option><option>Something else</option></select></label>
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
      <Preloader />
      <Cursor />
      <motion.div className="co-progress" style={{ width: progress }} />
      <OperatorNav />
      <Hero />
      <Marquee />
      <BioSection />
      <Beliefs />
      <CreativeLanes />
      <Stack />
      <Archive />
      <Ecosystem />
      <FrrostDoorway />
      <ArticlesPreview />
      <Newsletter />
      <BuildTimeline />
      <FAQ />
      <ContactNote />
      <OperatorFooter />
    </main>
  );
}
