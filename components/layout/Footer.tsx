"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";
import Link from "next/link";

function getLiveIST() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour:     "2-digit",
    minute:   "2-digit",
    second:   "2-digit",
    hour12:   true,
  });
}

const SOCIALS = [
  { Icon: Linkedin,  href: "https://www.linkedin.com/in/aditya-sahai-6939b8362", label: "LinkedIn"  },
  { Icon: Twitter,   href: "https://x.com/adityasahai07",                        label: "Twitter/X" },
  { Icon: Instagram, href: "https://instagram.com/adityasahai37",                label: "Instagram" },
  { Icon: Youtube,   href: "https://youtube.com/@adityasahai37",                 label: "YouTube"   },
];

const NAV_LINKS = ["Work", "Services", "Contact"];

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(getLiveIST());
    const id = setInterval(() => setTime(getLiveIST()), 1000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(`#${id.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth" });
  };

  // Split time into parts
  const [clock, period] = (time ?? "--:--:-- --").split(" ");
  const [hm, sec]       = clock.split(":").slice(0, 3).reduce<[string, string]>(
    (acc, part, i) => i < 2 ? [`${acc[0]}${i > 0 ? ":" : ""}${part}`, acc[1]] : [acc[0], part],
    ["", ""]
  );

  return (
    <footer
      className="relative bg-transparent text-ink overflow-hidden"
      data-section="footer"
      id="footer"
    >
      {/* Giant scrolling name */}
      <div aria-hidden="true" className="premium-divider-animated" />
      <div
        className="overflow-hidden border-b border-ink/10 py-8 select-none"
        aria-hidden="true"
      >
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marquee-scroll 60s linear infinite" }}
        >
          {[0, 1].map((k) => (
            <span
              key={k}
              className="font-editorial italic shrink-0 text-ink leading-none pr-16"
              style={{ fontSize: "25vw", letterSpacing: "0", opacity: 0.18 }}
            >
              ADITYA SAHAI{" "}
            </span>
          ))}
        </div>
        {/* Acid "ground" strip beneath the text */}
        <div
          className="h-[2px] w-full mt-[-2px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(110,158,255,0.6), rgba(196,168,255,0.4), transparent)", opacity: 0.8 }}
        />
      </div>

      {/* Main footer content */}
      <div className="container-main py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Col 1: Brand */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="font-display font-semibold text-ink text-[22px] leading-none mb-1" style={{ letterSpacing: "-0.02em" }}>
                AS
              </p>
              <p className="font-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: "var(--accent)" }}>
                AI Operator · Thinking Beyond
              </p>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: "var(--signal-green)" }}>
              <span
                className="w-[5px] h-[5px] rounded-full animate-pulse-dot"
                style={{ backgroundColor: "var(--signal-green)", boxShadow: "0 0 8px rgba(77,255,223,0.7)" }}
              />
              Taking new projects
            </div>
            {/* Socials */}
            <div className="flex gap-3 mt-1">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-ink/35 hover:text-accent transition-colors"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <p className="eyebrow text-accent/70 mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l}>
                  <button
                    className="relative font-grotesk text-[15px] text-ink/52 hover:text-ink transition-colors group text-left"
                    onClick={() => scrollTo(l)}
                  >
                    {l}
                    <span className="absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-[1px] bg-acid transition-all duration-300" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct contact */}
          <div>
            <p className="eyebrow text-accent/70 mb-5">Direct</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:adityasahai037@gmail.com"
                className="font-grotesk text-[14px] text-ink/52 hover:text-ink transition-colors break-all"
              >
                adityasahai037@gmail.com
              </a>
              <a
                href="https://wa.me/916207126091"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] text-ink/45 hover:text-accent transition-colors tracking-widest"
              >
                +91 62071 26091
              </a>
            </div>
          </div>

          {/* Col 4: Live clock */}
          <div>
            <p className="eyebrow text-accent/70 mb-5">Local Time</p>
            <div>
              <p
                className="font-mono text-ink tabular-nums leading-none"
                style={{ fontSize: "clamp(28px,3vw,36px)" }}
              >
                {hm.split(":")[0]}
                <motion.span
                  className="inline-block mx-[2px]"
                  style={{ color: "#4DFFDF" }}
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeInOut" }}
                >
                  :
                </motion.span>
                {hm.split(":")[1]}
                <span className="text-ink/35 text-[0.65em] ml-2">{period?.toUpperCase()}</span>
              </p>
              <p className="font-mono text-[11px] text-ink/35 tracking-widest mt-1">
                UTC +5:30 · IST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-main pb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/10 pt-8">
          <div className="flex items-center flex-wrap gap-6">
            <p className="font-mono text-[11px] text-ink/30 tracking-widest">
              © 2026 — Built with obsession. India.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/privacy"
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/30 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink/30 hover:text-accent transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
          <motion.button
            className="font-mono text-[11px] text-ink/35 hover:text-accent tracking-[0.14em] uppercase flex items-center gap-2 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
          >
            ↑ Back to Top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
