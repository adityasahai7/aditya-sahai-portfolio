import type { Metadata } from "next";
import { tbc, LINKS } from "@/lib/content";
import { ExitDoor, PageHero } from "@/components/pages/PageKit";
import { Btn, Label, Marquee, MaskLines, Reveal, ScrubText } from "@/components/motion/kit";
import { Stamp } from "@/components/pages/Stamp";

export const metadata: Metadata = {
  title: "Thinking Beyond Club",
  description: "Thinking Beyond Club is a free, application-only club for people building a life that compounds. Body, mind, money. Show up. Say it. Do it. Show it.",
  alternates: { canonical: "/thinking-beyond-club" },
};

export default function TbcPage() {
  return (
    <>
      <PageHero label="THE CLUB 🫂" lines={tbc.title} lead={tbc.what} emoji="🫂" tone="yellow" accent={1}>
        <div className="creed">
          {tbc.creed.map((c, i) => (
            <Reveal key={c} delay={0.9 + i * 0.15} y={50} rotate={[-6, 4, -3, 5][i]}>
              <span className={`tone-${["red", "cyan", "mint", "fuchsia"][i]}`} style={{ display: "inline-block", rotate: `${[-3, 2, -1.5, 2.5][i]}deg` }}>{c}</span>
            </Reveal>
          ))}
        </div>
        <div className="hero-cta" style={{ marginTop: 34 }}>
          <Btn href={LINKS.tbc} tone="ink" size="lg" cursor="ENTER ↗">🚪 {tbc.cta} ↗</Btn>
        </div>
      </PageHero>

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="red">01 / THE SCRIPT 📜</Label>
          <MaskLines lines={["THERE'S A PATH", "ALREADY LAID", "OUT FOR YOU."]} className="h-xl" accent={2} />
          <div className="script-cards" style={{ marginTop: 46 }}>
            <Reveal rotate={-4} className="script-card"><p className="label">THE OLD ONE</p><ul>{tbc.scripts.old.map((l) => <li key={l}>{l}</li>)}</ul></Reveal>
            <Reveal rotate={4} delay={0.1} className="script-card tone-cyan"><p className="label">THE NEW ONE</p><ul>{tbc.scripts.new.map((l) => <li key={l}>{l}</li>)}</ul></Reveal>
            <Stamp text={tbc.scripts.stamp} />
          </div>
        </div>
      </section>

      <section className="page-section tone-ink" data-room="ink">
        <div className="wrap">
          <Label tone="yellow">02 / THE TRUTH</Label>
          <MaskLines lines={["YOU ARE", "NOT LAZY."]} className="h-mega" accent={1} />
          <div style={{ marginTop: 40 }}><ScrubText text={tbc.truth} hot={tbc.hot} /></div>
        </div>
      </section>

      <section className="page-section tone-mint" data-room="mint">
        <div className="wrap">
          <Label>03 / ONE PROJECT, THREE AXES</Label>
          <MaskLines lines={["A LIFE IS NOT", "ONE NUMBER."]} className="h-xl" accent={1} />
          <div className="grid-3" style={{ marginTop: 40 }}>
            {tbc.axes.map((a, i) => (
              <Reveal key={a.label} delay={i * 0.1} rotate={[-5, 3, -2][i]} className={`card tone-${a.tone}`} style={{ textAlign: "center" }}>
                <span className="card-emoji" style={{ fontSize: 80 }}>{a.emoji}</span><h3 className="h-lg">{a.label}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="teal">04 / THE WEEK 🗓️</Label>
          <MaskLines lines={["A WEEK THAT", "REPEATS. FOREVER."]} className="h-xl" accent={1} />
          <p className="lead" style={{ margin: "18px 0 40px" }}>Not content. Not channels. Four beats, same days, every week. That&apos;s the whole engine.</p>
          <div className="week">
            {tbc.week.map((d, i) => (
              <Reveal key={d.day} delay={i * 0.1} y={80} rotate={[-6, 4, -3, 5][i]} className={`card tone-${d.tone}`}>
                <span className="week-day">{d.day}</span>
                <span className="card-emoji" style={{ marginTop: 14 }}>{d.emoji}</span>
                <h3>{d.name}</h3><p>{d.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Marquee items={tbc.beliefs.map((b) => `${b} ✦`)} tone="yellow" tilt={-2} speed={50} />

      <section className="page-section tone-red" data-room="red" style={{ textAlign: "center" }}>
        <div className="wrap">
          <MaskLines lines={[tbc.free]} className="h-mega" />
          <p className="lead" style={{ margin: "20px auto 0" }}>{tbc.freeLine}</p>
        </div>
      </section>

      <ExitDoor href={LINKS.tbc} label={tbc.cta} note={tbc.ctaNote} tone="yellow" emoji="🚪" />
    </>
  );
}
