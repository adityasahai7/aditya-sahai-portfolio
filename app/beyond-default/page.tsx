import type { Metadata } from "next";
import { beyondDefault, LINKS } from "@/lib/content";
import { LetterSection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";
import { Btn, FlipText, Label, Marquee, MaskLines, Reveal, ScrubText } from "@/components/motion/kit";

export const metadata: Metadata = {
  title: "Beyond Default",
  description: "Beyond Default is Aditya Sahai's personality-led media universe: Build Your World on weekdays, Beyond the Story on weekends. Stories, ideas and possibilities.",
  alternates: { canonical: "/beyond-default" },
};

export default function BeyondDefaultPage() {
  return (
    <>
      <PageHero label="THE SHOW 🎬" lines={beyondDefault.title} lead={beyondDefault.tagline} emoji="🎬" tone="cyan" accent={1}>
        <div className="hero-cta" style={{ marginTop: 30 }}>
          <Btn href={LINKS.youtube} tone="red" size="lg" cursor="WATCH">▶️ Watch on YouTube</Btn>
          <Btn href={LINKS.instagram} tone="paper" size="lg">📸 Clips on Instagram</Btn>
        </div>
      </PageHero>

      <section className="page-section tone-ink" data-room="ink">
        <div className="wrap">
          <Label tone="yellow">WHAT IT ISN&apos;T ✋</Label>
          <div style={{ display: "grid", gap: 8 }}>
            {beyondDefault.notThis.map((n, i) => (
              <Reveal key={n} delay={i * 0.1} y={30}><p className="h-md" style={{ textDecoration: "line-through", textDecorationColor: "#F18179", textDecorationThickness: 6, opacity: 0.85, margin: 0 }}>{n}</p></Reveal>
            ))}
          </div>
          <Reveal delay={0.4}><p className="h-lg" style={{ color: "#F5D46D", margin: "40px 0 0" }}>WHAT IT IS 👇</p></Reveal>
          <ScrubText text={beyondDefault.isThis} hot={["curiosity,", "storytelling", "meaningful"]} />
        </div>
      </section>

      <section className="page-section tone-yellow" data-room="yellow">
        <div className="wrap">
          <Label>THE BELIEF 💡</Label>
          <MaskLines lines={beyondDefault.belief} className="h-lg" accent={2} />
        </div>
      </section>

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="teal">TWO EXPERIENCES · EVERY WEEK</Label>
          <MaskLines lines={["WEEKDAYS BUILD.", "WEEKENDS FEEL."]} className="h-xl" accent={1} />
          <div className="show-exp" style={{ marginTop: 46 }}>
            {beyondDefault.experiences.map((x, i) => (
              <Reveal key={x.name} delay={i * 0.12} rotate={i ? 3 : -3} className={`card tone-${x.tone}`}>
                <span className="show-when">{x.when}</span>
                <span className="show-emoji">{x.emoji}</span>
                <h3 className="h-md">{x.name}</h3>
                <p>{x.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={["Build Your World 🌍", "Beyond the Story 🎞️", "Stories That Stay With You 💛"]} tone="red" tilt={2} />

      <section className="page-section tone-mint" data-room="mint">
        <div className="wrap" style={{ textAlign: "center" }}>
          <Label>THE STORY WORLDS 🌌</Label>
          <MaskLines lines={["ANYTHING IS", "FAIR GAME."]} className="h-xl" accent={1} />
          <p className="lead" style={{ margin: "20px auto 40px" }}>Not separate niches. Different windows into the same curious brain. The thread is the perspective.</p>
          <div className="world-cloud">
            {beyondDefault.worlds.map((w, i) => <Reveal key={w} delay={i * 0.03} y={30} rotate={(i % 5) - 2}><span>{w}</span></Reveal>)}
          </div>
        </div>
      </section>

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="red">WHAT YOU SHOULD FEEL</Label>
          <MaskLines lines={["FOUR REACTIONS."]} className="h-xl" />
          <div className="reactions" style={{ marginTop: 46 }}>
            {beyondDefault.reactions.map((r, i) => (
              <Reveal key={r.word} delay={i * 0.1} rotate={[-12, 8, -6, 10][i]} y={60} className={`reaction tone-${r.tone}`}>
                <span>{r.emoji}</span><b>{r.word}</b><p>{r.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section tone-ink" data-room="ink" style={{ textAlign: "center" }}>
        <div className="wrap">
          <p className="h-xl" style={{ margin: 0 }}><FlipText text="FOR GOOD," /></p>
          <p className="h-xl" style={{ margin: "0 0 40px" }}><FlipText text="TOWARDS GREATNESS." /></p>
          <Btn href={LINKS.youtube} tone="yellow" size="xl" cursor="WATCH">▶️ Subscribe @adityasahai37</Btn>
        </div>
      </section>

      <LetterSection source="beyond-default" />
    </>
  );
}
