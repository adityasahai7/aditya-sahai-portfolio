import type { Metadata } from "next";
import { frrost, LINKS } from "@/lib/content";
import { ExitDoor, FlipCards } from "@/components/pages/PageKit";
import { Shatter } from "@/components/pages/Shatter";
import { Btn, FlipText, Label, Marquee, MaskLines, Reveal, ScrubText } from "@/components/motion/kit";

export const metadata: Metadata = {
  title: "FRROST Media",
  description: "FRROST Media is Aditya Sahai's AI-native Demand Engineering company for founders and consumer brands. Where is growth breaking? Growth, Engineered.",
  alternates: { canonical: "/frrost-media" },
};

export default function FrrostPage() {
  return (
    <>
      <section className="page-hero tone-ink" data-room="ink">
        <div className="dot-grid" aria-hidden="true" style={{ opacity: 0.3, filter: "invert(1)" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <Label tone="mint">{frrost.label} 📈</Label>
          <Shatter lines={frrost.question} />
          <p className="lead" style={{ marginTop: 28 }}>{frrost.category}</p>
          <div className="hero-cta" style={{ marginTop: 30 }}>
            <Btn href={LINKS.frrost} tone="mint" size="lg" cursor="VISIT ↗">📈 Visit FRROST ↗</Btn>
          </div>
        </div>
      </section>

      <section className="page-section tone-mint" data-room="mint">
        <div className="wrap">
          <Label>WHAT FRROST DOES</Label>
          <ScrubText text={frrost.promise} hot={["constraint", "removes"]} />
          <p className="lead" style={{ marginTop: 30 }}>{frrost.who}</p>
        </div>
      </section>

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="teal">ONE SERVICE 🎯</Label>
          <MaskLines lines={["THE FRROST", "DEMAND SYSTEM."]} className="h-xl" accent={1} />
          <p className="lead" style={{ margin: "18px 0 50px" }}>{frrost.serviceLine} Every engagement starts by finding the one constraint that&apos;s actually breaking growth:</p>
          <FlipCards items={frrost.constraints.map((c) => ({ emoji: c.emoji, front: c.name, sub: "THE CONSTRAINT", tone: c.tone, back: <><b style={{ fontSize: 22, color: "#F5D46D" }}>The break 🩹</b><p>{c.symptom}</p><b style={{ fontSize: 22, color: "#BDEFD5" }}>The fix 🔧</b><p>{c.fix}</p></> }))} />
        </div>
      </section>

      <Marquee items={["Diagnose ✦", "Build the system ✦", "Remove the constraint ✦", "Growth, Engineered ✦"]} tone="ink" tilt={-2} />

      <section className="page-section tone-cyan" data-room="cyan" style={{ textAlign: "center" }}>
        <div className="wrap">
          <Reveal y={60}><p className="h-mega" style={{ margin: 0 }}><FlipText text="GROWTH," outline={false} /></p></Reveal>
          <Reveal y={60} delay={0.15}><p className="h-mega" style={{ margin: 0 }}><FlipText text="ENGINEERED." /></p></Reveal>
        </div>
      </section>

      <ExitDoor href={LINKS.frrost} label={frrost.cta} note={frrost.ctaNote} tone="mint" emoji="📈" />
    </>
  );
}
