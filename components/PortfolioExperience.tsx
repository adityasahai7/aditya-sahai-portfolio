"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Compass,
  Film,
  Instagram,
  Layers3,
  Linkedin,
  Mail,
  MessageCircle,
  PlaySquare,
  Rocket,
  Search,
  Sparkles,
  Twitter,
  Workflow,
  Youtube,
} from "lucide-react";
import ContactForm from "@/components/ui/ContactForm";

const ease = [0.16, 1, 0.3, 1] as const;

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-sahai-6939b8362", Icon: Linkedin },
  { label: "Twitter / X", href: "https://x.com/adityasahai07", Icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/adityasahai37", Icon: Instagram },
  { label: "YouTube", href: "https://youtube.com/@adityasahai37", Icon: Youtube },
];

const services = [
  ["01", "AI Opportunity Audits", "Find the one place AI actually pays off for you — before you spend on it.", Search, "cyan"],
  ["02", "AI Workflows", "Turn your repetitive work into systems that run without you.", Workflow, "mint"],
  ["03", "Content Systems", "One good idea becomes a month of on-brand content.", PlaySquare, "coral"],
  ["04", "Brand Systems", "A sharper identity that holds up as your output scales.", Layers3, "yellow"],
  ["05", "Creative Production", "Ship campaigns in days, not weeks — without dropping the bar.", Film, "pink"],
  ["06", "Growth Strategy", "Find your next real move, not the trendy one.", Compass, "cyan"],
];

const process = [
  ["01", "Identify", "Find the AI moves that actually matter for your brand.", Search, "coral"],
  ["02", "Build", "Turn the right ones into systems that run.", BrainCircuit, "mint"],
  ["03", "Grow", "Ship faster, keep the brand intact.", Rocket, "cyan"],
];

const ideas = [
  ["AI Opportunity Map", "Where's the first AI move actually worth making?", "mint"],
  ["Content Engine", "How can one good idea become a month of output?", "cyan"],
  ["Creative Workflow", "Where can your team ship faster without lowering the bar?", "pink"],
  ["Brand System", "How can your identity stay sharp while your output scales?", "yellow"],
  ["Automation Layer", "Which repetitive bottleneck should disappear first?", "coral"],
];

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

function Sticker({
  children,
  tone = "mint",
  className = "",
}: {
  children: React.ReactNode;
  tone?: string;
  className?: string;
}) {
  return <span className={`as-sticker as-${tone} ${className}`}>{children}</span>;
}

function Spark({ className = "" }: { className?: string }) {
  return <span className={`as-spark ${className}`} aria-hidden="true">✦</span>;
}

function ArrowDoodle({ className = "" }: { className?: string }) {
  return (
    <svg className={`as-arrow-doodle ${className}`} viewBox="0 0 240 90" fill="none" aria-hidden="true">
      <motion.path
        d="M5 18c38 68 108 64 155 25 18-15 33-19 61-14"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="9 11"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease }}
      />
      <path d="m207 12 20 18-24 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function OperatorIllustration() {
  return (
    <motion.div
      className="as-operator-art"
      initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, delay: 0.35, ease }}
    >
      <motion.div
        className="as-hero-gear"
        animate={{ rotate: 360 }}
        transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        ⚙
      </motion.div>
      <motion.svg
        className="as-growth-arrow"
        viewBox="0 0 190 190"
        fill="none"
        aria-hidden="true"
        animate={{ y: [0, -9, 0], rotate: [-2, 2, -2] }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M28 162c44-28 77-69 101-113" stroke="#202727" strokeWidth="28" strokeLinecap="round" />
        <path d="M28 162c44-28 77-69 101-113" stroke="#f18179" strokeWidth="18" strokeLinecap="round" />
        <path d="m105 52 54-24-13 58" fill="#f18179" stroke="#202727" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
      <motion.div className="as-floating-card as-card-one" animate={{ y: [0, -11, 0], rotate: [-2, 1, -2] }} transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}>
        <Search size={18} /> <span>IDENTIFY<br />AI SOLUTIONS</span>
      </motion.div>
      <motion.div className="as-floating-card as-card-two" animate={{ y: [0, 9, 0], rotate: [2, -1, 2] }} transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}>
        <Workflow size={18} /> <span>BUILD<br />AI LEVERAGE</span>
      </motion.div>
      <motion.div className="as-floating-card as-card-three" animate={{ y: [0, -8, 0], rotate: [-1, 2, -1] }} transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}>
        <Rocket size={18} /> <span>GROW WITH<br />INTENTION</span>
      </motion.div>
      <svg viewBox="0 0 640 560" className="as-operator-svg" aria-label="Illustrated AI operator workstation">
        <path d="M111 146c75-79 161-79 216-19 42 45 86 53 157 27" stroke="#176d70" strokeWidth="5" strokeDasharray="10 10" fill="none" />
        <path d="M236 183c67-54 158-39 214 41 30 43 73 55 128 32" stroke="#176d70" strokeWidth="5" strokeDasharray="10 10" fill="none" />
        <circle cx="117" cy="143" r="9" fill="#e56aa6" stroke="#202727" strokeWidth="5" />
        <circle cx="324" cy="127" r="9" fill="#9ce8f2" stroke="#202727" strokeWidth="5" />
        <circle cx="482" cy="156" r="9" fill="#f5d46d" stroke="#202727" strokeWidth="5" />
        <path d="M364 380h245" stroke="#202727" strokeWidth="13" strokeLinecap="round" />
        <path d="M456 391v135M578 391v135" stroke="#202727" strokeWidth="11" strokeLinecap="round" />
        <path d="M410 316h140l-15 83H397z" fill="#eee9df" stroke="#202727" strokeWidth="8" strokeLinejoin="round" />
        <circle cx="471" cy="358" r="17" fill="#176d70" />
        <text x="459" y="364" fill="#f7f1e7" fontSize="17" fontWeight="800">AS</text>
        <ellipse cx="282" cy="508" rx="112" ry="24" fill="#202727" opacity=".14" />
        <path d="M208 495c17-105 42-160 89-171 58-14 108 63 132 170z" fill="#38a997" stroke="#202727" strokeWidth="9" />
        <path d="M337 363c43 24 61 34 100 51" stroke="#202727" strokeWidth="18" strokeLinecap="round" />
        <path d="M335 363c43 24 61 34 100 51" stroke="#bdefd5" strokeWidth="11" strokeLinecap="round" />
        <circle cx="292" cy="279" r="55" fill="#f18179" stroke="#202727" strokeWidth="9" />
        <path d="M241 271c2-78 93-91 115-23-37-23-73-4-115 23z" fill="#202727" />
        <circle cx="274" cy="286" r="5" fill="#202727" /><circle cx="314" cy="286" r="5" fill="#202727" />
        <path d="M282 309c13 7 23 7 35 0" stroke="#202727" strokeWidth="4" strokeLinecap="round" />
        <path d="M209 496h175" stroke="#202727" strokeWidth="13" strokeLinecap="round" />
        <path d="M195 503h-30c-12-72 1-125 43-156" stroke="#202727" strokeWidth="15" strokeLinecap="round" />
        <path d="M158 506v40M307 506v40" stroke="#202727" strokeWidth="12" strokeLinecap="round" />
        <path d="M566 270c13 3 22 14 22 27 0 17-13 30-30 30s-30-13-30-30c0-13 8-24 20-28" fill="#f5d46d" stroke="#202727" strokeWidth="7" />
        <path d="m557 243 6 20 21-5-15 15 15 14-21-5-6 21-6-21-20 5 14-14-14-15 20 5z" fill="#e56aa6" stroke="#202727" strokeWidth="5" strokeLinejoin="round" />
        <path d="M519 414h65" stroke="#202727" strokeWidth="8" strokeLinecap="round" />
        <path d="M540 407c8-38 37-50 59-25 15 17 22 40 22 40" fill="#bdefd5" stroke="#202727" strokeWidth="7" strokeLinecap="round" />
        <path d="M542 407c-2-39-24-56-47-41-18 12-23 35-23 35" fill="#38a997" stroke="#202727" strokeWidth="7" strokeLinecap="round" />
        <path d="M534 407h56l-8 61h-40z" fill="#f18179" stroke="#202727" strokeWidth="7" />
        <path d="M375 456h42M386 446h26" stroke="#202727" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <motion.div className="as-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: "linear" }} />
      <motion.div className="as-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 19, repeat: Infinity, ease: "linear" }} />
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const items = ["services", "process", "explore", "contact"];
  return (
    <header className="as-nav">
      <button className="as-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        ADITYA SAHAI <span>AI OPERATOR</span>
      </button>
      <nav className={open ? "is-open" : ""}>
        {items.map((item) => <a key={item} href={`#${item}`} onClick={() => setOpen(false)}>{item}</a>)}
        <a className="as-nav-cta" href="#contact">BOOK A FREE STRATEGY CALL</a>
      </nav>
      <button className="as-menu" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? "×" : "☰"}</button>
    </header>
  );
}

function Marquee() {
  const text = " AI OPERATOR ✦ PRACTICAL AI ✦ BRAND SYSTEMS ✦ CONTENT ENGINES ✦ AI WORKFLOWS ✦ SHIP FASTER ✦ ";
  return <div className="as-marquee"><div>{text.repeat(4)}</div></div>;
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -80, y: -80 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    const over = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      setActive(Boolean(target.closest("a, button, input, textarea, select")));
    };
    const leave = () => setActive(false);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", leave);
    };
  }, []);

  return (
    <motion.div
      className={`as-custom-cursor ${active ? "is-active" : ""}`}
      aria-hidden="true"
      initial={{ x: -80, y: -80 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 900, damping: 52, mass: 0.22 }}
    >
      GO
    </motion.div>
  );
}

export default function PortfolioExperience() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="editorial-site">
      <motion.div className="as-progress" style={{ scaleX }} />
      <CustomCursor />
      <section className="as-reference-hero" id="top" aria-label="Aditya Sahai AI Operator">
        <img
          src="/aditya-sahai-approved-hero.png"
          alt="Aditya Sahai AI Operator. Build AI leverage. Grow with intention."
        />
        <a className="as-hero-hotspot hotspot-about" href="#services" aria-label="About" />
        <a className="as-hero-hotspot hotspot-work" href="#explore" aria-label="Work" />
        <a className="as-hero-hotspot hotspot-process" href="#process" aria-label="Process" />
        <a className="as-hero-hotspot hotspot-contact" href="#contact" aria-label="Contact" />
        <a className="as-hero-hotspot hotspot-call-top" href="#contact" aria-label="Book a free strategy call" />
        <a className="as-hero-hotspot hotspot-call-main" href="#contact" aria-label="Book a free strategy call" />
        <a className="as-hero-hotspot hotspot-build" href="#services" aria-label="See what I can build" />
      </section>
      <section className="as-mobile-hero" aria-label="Aditya Sahai AI Operator mobile introduction">
        <div className="as-mobile-hero-grid" />
        <Sticker tone="mint">ADITYA SAHAI · AI OPERATOR</Sticker>
        <h1>BUILD AI<br /><span>LEVERAGE.</span><br />GROW WITH<br /><span>INTENTION.</span></h1>
        <p>I find where AI is actually useful for your brand — then build the system that does the work.</p>
        <div className="as-actions">
          <a className="as-button as-primary" href="#contact">BOOK A FREE STRATEGY CALL <ArrowUpRight size={17} /></a>
          <a className="as-button" href="#services">SEE WHAT I CAN BUILD</a>
        </div>
        <div className="as-mobile-hero-visual">
          <img src="/aditya-sahai-approved-hero.png" alt="" aria-hidden="true" />
        </div>
        <Sticker tone="yellow" className="mobile-hero-sticker-one">SYSTEMS,<br />NOT TOOLS</Sticker>
        <Sticker tone="cyan" className="mobile-hero-sticker-two">USEFUL &gt;<br />FLASHY</Sticker>
        <Spark className="mobile-hero-spark-one" />
        <Spark className="mobile-hero-spark-two" />
      </section>

      <Marquee />

      <section className="as-section as-leverage">
        <Sticker tone="yellow" className="section-sticker leverage-extra">FIND THE<br />RIGHT PROBLEM</Sticker>
        <Spark className="section-spark leverage-spark" />
        <Reveal>
          <p className="as-eyebrow">THE OPERATING IDEA / 01</p>
          <h2>LESS RANDOM TOOLS.<br /><span>MORE REAL OUTPUT.</span></h2>
          <p className="as-section-copy">AI shouldn&apos;t become another pile of subscriptions you forget to cancel. It should help your brand make sharper calls, ship faster, and build systems that compound.</p>
        </Reveal>
        <div className="as-leverage-map">
          {[
            ["01", "IDENTIFY", "Find the opportunity worth solving.", Search, "coral"],
            ["02", "BUILD", "Turn it into a useful system.", Workflow, "mint"],
            ["03", "GROW", "Move faster without losing the brand.", Rocket, "cyan"],
          ].map(([num, title, body, Icon, tone], index) => {
            const IconComponent = Icon as typeof Search;
            return (
              <Reveal key={String(title)} delay={index * 0.12} className="as-map-card">
                <span>{String(num)}</span><IconComponent size={31} />
                <h3>{String(title)}</h3><p>{String(body)}</p>
              </Reveal>
            );
          })}
          <ArrowDoodle className="map-arrow-one" /><ArrowDoodle className="map-arrow-two" />
          <Sticker tone="pink" className="map-sticker">TOOLS CHANGE.<br />SYSTEMS STAY.</Sticker>
        </div>
      </section>

      <section className="as-section as-services" id="services">
        <Spark className="section-spark services-spark" />
        <Reveal>
          <p className="as-eyebrow">WHAT I CAN BUILD / 02</p>
          <h2>AI SYSTEMS THAT<br /><span>EARN THEIR KEEP.</span></h2>
        </Reveal>
        <div className="as-services-grid">
          {services.map(([num, title, body, Icon, tone], index) => {
            const IconComponent = Icon as typeof Search;
            return (
              <Reveal key={String(title)} delay={index * 0.06}>
                <motion.article className="as-service-card" whileHover={{ y: -8, rotate: index % 2 ? 0.7 : -0.7 }}>
                  <b className={`as-tab as-${String(tone)}`}>{String(num)}</b>
                  <IconComponent size={35} />
                  <h3>{String(title)}</h3><p>{String(body)}</p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
        <Sticker tone="coral" className="services-sticker-one">NO GENERIC<br />AI THEATRE.</Sticker>
        <Sticker tone="yellow" className="services-sticker-two">USEFUL &gt; FLASHY</Sticker>
        <Sticker tone="mint" className="services-sticker-three">SYSTEMS THAT<br />COMPOUND</Sticker>
      </section>

      <section className="as-section as-process" id="process">
        <Spark className="section-spark process-spark" />
        <Reveal>
          <p className="as-eyebrow">THE PROCESS / 03</p>
          <h2>FIND THE PROBLEM.<br /><span>BUILD THE SYSTEM.</span> SHIP.</h2>
          <p className="as-section-copy">A focused way of working: find the right problem, build the right AI layer, and turn it into something that actually ships.</p>
        </Reveal>
        <div className="as-process-grid">
          {process.map(([num, title, body, Icon, tone], index) => {
            const IconComponent = Icon as typeof Search;
            return (
              <Reveal key={String(title)} delay={index * 0.12}>
                <article className="as-process-card">
                  <b className={`as-tab as-${String(tone)}`}>{String(num)}</b>
                  <div className="as-process-icon"><IconComponent size={44} /></div>
                  <h3>{String(title)}</h3><p>{String(body)}</p>
                </article>
              </Reveal>
            );
          })}
          <ArrowDoodle className="process-arrow-one" /><ArrowDoodle className="process-arrow-two" />
        </div>
        <Sticker tone="yellow" className="process-sticker-one">PRACTICAL AI.<br />NO GIMMICKS.</Sticker>
        <Sticker tone="cyan" className="process-sticker-two">START WITH THE<br />RIGHT PROBLEM</Sticker>
        <Sticker tone="pink" className="process-sticker-three">SYSTEMS &gt;<br />RANDOM TOOLS</Sticker>
      </section>

      <section className="as-manifesto">
        <div className="as-manifesto-grid" />
        <Reveal>
          <p className="as-eyebrow">THE OPERATOR MANIFESTO / 04</p>
          <h2>AI SHOULD CREATE<br /><span>OUTPUT,</span><br />NOT NOISE.</h2>
        </Reveal>
        <div className="as-manifesto-posters">
          {["START WITH THE PROBLEM.", "BUILD WHAT IS USEFUL.", "KEEP THE BRAND HUMAN.", "MAKE OUTPUT COMPOUND.", "MOVE WITH CLARITY."].map((item, index) => (
            <motion.div key={item} className={`as-poster poster-${index + 1}`} whileHover={{ scale: 1.04, rotate: 0 }}>{item}</motion.div>
          ))}
        </div>
        <Spark className="manifesto-spark-one" /><Spark className="manifesto-spark-two" />
      </section>

      <section className="as-section as-explore" id="explore">
        <Sticker tone="coral" className="section-sticker explore-extra">YOUR NEXT<br />USEFUL MOVE →</Sticker>
        <Reveal>
          <p className="as-eyebrow">WHAT WE CAN EXPLORE / 05</p>
          <h2>YOUR NEXT AI MOVE<br /><span>MIGHT BE HIDING HERE.</span></h2>
          <p className="as-section-copy">Not a catalogue of packages. A board of useful starting points. We choose the one that solves a real bottleneck for your brand.</p>
        </Reveal>
        <div className="as-idea-board">
          {ideas.map(([title, body, tone], index) => (
            <motion.article key={title} className={`as-idea-note note-${index + 1} as-${tone}`} whileHover={{ scale: 1.05, rotate: 0, zIndex: 5 }}>
              <Spark /><h3>{title}</h3><p>{body}</p>
            </motion.article>
          ))}
          <div className="as-idea-center"><Bot size={45} /><span>FIND THE<br />RIGHT MOVE</span></div>
        </div>
      </section>

      <section className="as-section as-why">
        <Reveal>
          <p className="as-eyebrow">WHY AN AI OPERATOR? / 06</p>
          <h2>TOOLS CHANGE.<br /><span>LEVERAGE COMPOUNDS.</span></h2>
          <p className="as-section-copy">Most people sell you tools or a deck. An operator builds the actual system and hands you something that runs. That&apos;s the difference.</p>
        </Reveal>
        <div className="as-why-grid">
          {[
            ["01", "A builder, not a deck", "Strategy that ends in a working system, not a PDF.", Compass],
            ["02", "Built around your brand", "Your voice and standards, baked into every output.", BrainCircuit],
            ["03", "Systems you own", "No lock-in. The system stays yours and keeps running.", Rocket],
          ].map(([num, title, body, Icon], index) => {
            const IconComponent = Icon as typeof Search;
            return <Reveal key={String(title)} delay={index * 0.1}><article><b>{String(num)}</b><IconComponent size={37} /><h3>{String(title)}</h3><p>{String(body)}</p></article></Reveal>;
          })}
        </div>
        <Sticker tone="coral" className="why-sticker-one">LESS NOISE.<br />MORE OUTPUT.</Sticker>
        <Sticker tone="cyan" className="why-sticker-two">YOUR BRAND<br />STILL MATTERS.</Sticker>
      </section>

      <section className="as-contact" id="contact">
        <div>
          <Reveal>
            <Sticker tone="mint">AI OPERATOR · INDIA</Sticker>
            <h2>LET&apos;S FIND<br />YOUR <span>FIRST AI MOVE.</span></h2>
            <p>Tell me what you&apos;re building. I&apos;ll point to where AI is actually worth it — and what I&apos;d build first.</p>
            <ArrowDoodle />
            <div className="as-contact-chips">
              <Sticker tone="yellow">LET&apos;S BUILD<br />THE RIGHT THING</Sticker>
              <Sticker tone="mint">PRACTICAL AI</Sticker>
              <Sticker tone="coral">NO PITCH DECK<br />THEATRE</Sticker>
            </div>
          </Reveal>
        </div>
        <Reveal className="as-form-card" delay={0.12}>
          <Spark /><ContactForm />
        </Reveal>
      </section>

      <footer className="as-footer">
        <div>
          <h2>ADITYA SAHAI</h2>
          <p>Creative AI Operator · Thinking Beyond</p>
        </div>
        <div className="as-socials">
          {socials.map(({ label, href, Icon }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}><Icon size={20} /></a>)}
        </div>
        <div className="as-footer-direct">
          <a href="mailto:adityasahai037@gmail.com"><Mail size={17} /> EMAIL</a>
          <a href="https://wa.me/916207126091" target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> WHATSAPP</a>
        </div>
      </footer>
    </main>
  );
}
