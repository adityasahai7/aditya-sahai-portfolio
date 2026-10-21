import type { Metadata } from "next";
import Image from "next/image";
import { about, LINKS } from "@/lib/content";
import { Sides } from "@/components/home/Home";
import { LetterSection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";
import { Btn, Label, Marquee, MaskLines, Reveal, ScrubText, Tilt } from "@/components/motion/kit";

export const metadata: Metadata = {
  title: "About",
  description: "Who Aditya Sahai is: a Creative AI Operator from India. Creator, storyteller and builder behind Beyond Default, Thinking Beyond Club and FRROST Media.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero label="ABOUT · THE LONG VERSION" lines={about.title} lead={about.intro} emoji="🧠" tone="paper" accent={1}>
        <div className="hero-cta" style={{ marginTop: 30 }}>
          <Btn href={LINKS.youtube} tone="red" size="lg">▶️ YouTube</Btn>
          <Btn href={LINKS.instagram} tone="fuchsia" size="lg">📸 Instagram</Btn>
          <Btn href="/contact" tone="yellow" size="lg">👋 Say hi</Btn>
        </div>
      </PageHero>

      <section className="page-section tone-cyan" data-room="cyan">
        <div className="wrap grid-2">
          <Reveal rotate={-4}>
            <Tilt className="hero-photo" max={12} style={{ maxWidth: 440, margin: "0 auto" }}>
              <span className="tape tape-a" /><span className="tape tape-b" />
              <Image src="/images/aditya-sahai.webp" alt="Aditya Sahai" width={520} height={520} sizes="(max-width: 860px) 80vw, 440px" />
              <span className="polaroid-caption">creator · storyteller · builder</span>
            </Tilt>
          </Reveal>
          <div>
            <Label>WHY I DO THIS</Label>
            <ScrubText text={about.scrub} hot={about.hot} className="about-scrub" />
          </div>
        </div>
      </section>

      <section className="page-section tone-ink" data-room="ink">
        <div className="wrap">
          <Label tone="yellow">THE MISSION</Label>
          <p className="lead" style={{ marginBottom: 30 }}>To create stories, knowledge and experiences that help people change their own lives. That means helping you:</p>
          <MaskLines lines={about.mission} as="div" className="mission" />
        </div>
      </section>

      <Marquee items={["Taste is the moat 👅", "Stories change decisions 📖", "Build in public 🛠️", "Curiosity is the job 🧭"]} tone="yellow" tilt={-2} />

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="red">WHAT I BELIEVE 📌</Label>
          <MaskLines lines={["SIX THINGS", "I'D BET ON."]} className="h-xl" accent={1} />
          <div className="belief-board" style={{ marginTop: 50 }}>
            {about.beliefs.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06} rotate={[-4, 3, -2, 4, -3, 2][i]} className={`note tone-${b.tone}`} style={{ rotate: `${[-2, 1.5, -1, 2, -1.5, 1][i]}deg` }}>
                <span className="card-emoji">{b.emoji}</span>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Sides />

      <section className="page-section tone-mint" data-room="mint">
        <div className="wrap">
          <Label>RIGHT NOW 🟢</Label>
          <MaskLines lines={["CURRENTLY…"]} className="h-xl" />
          <div className="now-list" style={{ marginTop: 34 }}>
            {about.now.map((n, i) => <Reveal key={n} delay={i * 0.07} y={30}><span>{n}</span></Reveal>)}
          </div>
        </div>
      </section>

      <LetterSection source="about" />
    </>
  );
}
