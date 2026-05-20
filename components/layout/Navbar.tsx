"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

const LINKS = [
  { label: "Work",     href: "#work",     id: "work"     },
  { label: "Services", href: "#services", id: "services" },
  { label: "Contact",  href: "#contact",  id: "contact"  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Magnetic nav item ── */
function MagneticNav({
  label, href, active, onClick,
}: {
  label: string; href: string; active: boolean; onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect   = ref.current.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) * 0.30;
    const dy     = (e.clientY - cy) * 0.30;
    x.set(dx);
    y.set(dy);
  }, [x, y]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className="relative font-mono text-[11px] tracking-[0.14em] uppercase transition-colors duration-200 group"
      animate={{ color: active ? "#4DFFDF" : "rgba(238,238,245,0.45)" }}
      whileHover={{ color: "rgba(238,238,245,1)" }}
    >
      {label}
      {/* Active underline */}
      <motion.span
        className="absolute -bottom-1 left-0 h-[1px] origin-left"
        style={{ background: "linear-gradient(90deg, #6E9EFF, #4DFFDF)" }}
        animate={{ scaleX: active ? 1 : 0 }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
      />
      {/* Hover underline */}
      <span
        className="absolute -bottom-1 left-0 w-full h-[1px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: "linear-gradient(90deg, #6E9EFF, #4DFFDF)", opacity: active ? 0 : 1 }}
      />
    </motion.button>
  );
}

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [hidden,         setHidden]         = useState(false);
  const [menuOpen,       setMenuOpen]       = useState(false);
  const [activeSection,  setActiveSection]  = useState<string>("");
  const lastY = useRef(0);

  /* ── Auto-hide on scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY.current && y > 200 && !menuOpen);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  /* ── Active section IntersectionObserver ── */
  useEffect(() => {
    const sections = document.querySelectorAll("section[data-section], div[data-section]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).dataset.section ?? "");
          }
        });
      },
      { threshold: 0.35, rootMargin: "-20% 0px -20% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]"
        style={{ width: "calc(100% - 40px)", maxWidth: "1240px" }}
        animate={{ y: hidden ? -90 : 0 }}
        transition={{ duration: 0.42, ease: EASE }}
      >
        <motion.div
          className="relative flex h-[54px] items-center justify-between rounded-[12px] px-5 md:px-7 overflow-hidden"
          animate={{
            background: scrolled ? "rgba(3,3,10,0.88)" : "rgba(110,158,255,0.04)",
          }}
          style={{
            border: "1px solid rgba(110,158,255,0.09)",
            backdropFilter: "blur(28px) saturate(180%)",
            boxShadow: scrolled
              ? "0 20px 60px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(110,158,255,0.10)"
              : "none",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {/* Shimmer on scroll */}
          <AnimatePresence>
            {scrolled && (
              <motion.div
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, rgba(110,158,255,0.5), rgba(77,255,223,0.5), transparent)" }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </AnimatePresence>

          {/* Name / Monogram */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 hover:opacity-75 transition-opacity duration-200"
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                overflow: "hidden",
                flexShrink: 0,
                border: "1px solid rgba(110,158,255,0.35)",
              }}
            >
              <Image
                src="/aditya.jpg.webp"
                alt="Aditya Sahai"
                width={38}
                height={38}
                style={{ objectFit: "cover", objectPosition: "top", width: "100%", height: "100%" }}
                priority
              />
            </div>
            <span
              className="font-display font-semibold text-ink leading-none"
              style={{ fontSize: "17px", letterSpacing: "-0.03em" }}
            >
              Aditya Sahai
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <MagneticNav
                key={link.label}
                label={link.label}
                href={link.href}
                active={activeSection === link.id}
                onClick={() => scrollTo(link.href)}
              />
            ))}

            {/* Available dot */}
            <div
              className="flex items-center gap-2 pl-7 border-l font-mono text-[10px] tracking-[0.16em] uppercase"
              style={{ borderColor: "rgba(255,255,255,0.06)", color: "#4DFFDF" }}
            >
              <span
                className="w-[5px] h-[5px] rounded-full pulse-dot"
                style={{ backgroundColor: "#4DFFDF", boxShadow: "0 0 8px rgba(77,255,223,0.8)" }}
              />
              Available
            </div>

            {/* CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              className="btn-cta"
              style={{ height: 38, padding: "0 20px", fontSize: "10px" }}
            >
              Get Started →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block h-[1px] w-full"
              style={{ background: "linear-gradient(90deg, #6E9EFF, #4DFFDF)" }}
              animate={menuOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block h-[1px] w-full"
              style={{ background: "linear-gradient(90deg, #6E9EFF, #4DFFDF)" }}
              animate={menuOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </motion.div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-[90] flex flex-col px-7 pt-32 pb-14"
            style={{ background: "rgba(3,3,10,0.97)", backdropFilter: "blur(32px)" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{   opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(110,158,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(110,158,255,0.04) 1px, transparent 1px)`,
                backgroundSize: "50px 50px",
                opacity: 0.5,
              }}
            />

            <nav className="relative flex flex-col gap-4 z-10">
              {LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  className="text-left font-display font-semibold gradient-text-violet hover:opacity-80 transition-opacity"
                  style={{ fontSize: "clamp(42px,11vw,64px)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: EASE }}
                  onClick={() => scrollTo(link.href)}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            <motion.div
              className="relative mt-auto z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.4, ease: EASE }}
            >
              <a
                href="#contact"
                className="btn-cta w-full justify-center"
                onClick={(e) => { e.preventDefault(); scrollTo("#contact"); }}
              >
                Book a Free Strategy Call →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
