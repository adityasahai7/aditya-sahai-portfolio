import type { Metadata } from "next";
import Image from "next/image";
import { LINKS, socials } from "@/lib/content";
import { Btn, Reveal } from "@/components/motion/kit";

export const metadata: Metadata = {
  title: "Links",
  description: "Every Aditya Sahai link in one place: YouTube, Instagram, the Thinking Beyond Letter, Thinking Beyond Club and FRROST Media.",
  alternates: { canonical: "/links" },
};

const links = [
  { label: "▶️ Beyond Default on YouTube", href: LINKS.youtube, tone: "red" },
  { label: "💌 Get the Sunday letter", href: "/newsletter", tone: "yellow" },
  { label: "🫂 Join Thinking Beyond Club", href: LINKS.tbc, tone: "mint" },
  { label: "📈 FRROST Media", href: LINKS.frrost, tone: "cyan" },
  { label: "✍️ Read my writing", href: "/articles", tone: "fuchsia" },
  { label: "👋 Say hi", href: "/contact", tone: "paper" },
] as const;

/** Link-in-bio page for Instagram / YouTube bios: adityasahai.com/links */
export default function LinksPage() {
  return (
    <section className="links-page" data-room="paper">
      <div className="dot-grid" aria-hidden="true" />
      <div className="links-card">
        <Reveal y={20}><Image src="/images/aditya-sahai.webp" alt="Aditya Sahai" width={240} height={240} priority /></Reveal>
        <Reveal delay={0.1}><h1 className="h-md" style={{ margin: "8px 0 0" }}>ADITYA SAHAI</h1></Reveal>
        <Reveal delay={0.15}><p className="hint" style={{ margin: "0 0 10px" }}>⚡ CREATIVE AI OPERATOR · 🇮🇳</p></Reveal>
        {links.map((l, i) => <Reveal key={l.href} delay={0.2 + i * 0.07} y={30}><Btn href={l.href} tone={l.tone} size="lg">{l.label}</Btn></Reveal>)}
        <Reveal delay={0.7}><p className="hint" style={{ marginTop: 14 }}>{socials.map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{ margin: "0 8px" }}>{s.emoji} {s.label}</a>)}</p></Reveal>
      </div>
    </section>
  );
}
