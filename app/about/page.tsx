import type { Metadata } from "next";
import { SiteShell } from "@/components/site/Chrome";
import { ButtonLink, PageHero, SectionHeading } from "@/components/site/UI";
import { beliefs } from "@/lib/operator-content";
import { worlds } from "@/lib/site-content";

export const metadata: Metadata = {
  title: { absolute: "About Aditya Sahai — Creative AI Operator" },
  description: "The story, beliefs, current builds, and learning path of Aditya Sahai, a Creative AI Operator from India.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <main>
        <PageHero eyebrow="ABOUT ADITYA" title="I’m building the creative operator lane." copy="I’m not interested in being another person posting tool updates. I care about the layer after the tool: the brand, story, website, content system, sales page, and creative direction that decides what should exist." ><div className="ice-about-quote"><span>CORE BELIEF</span><b>AI made it easier to produce. It did not make it easier to matter.</b></div></PageHero>
        <section className="ice-page-section"><div className="ice-container ice-prose"><SectionHeading label="THE STORY" title="Early, serious, and building in public." /><p>I’m Aditya Sahai, a Creative AI Operator from India. I’m learning the connected disciplines that make modern brands easier to understand, trust, and remember: positioning, writing, websites, content, creative direction, sales stories, and AI-assisted systems.</p><p>I do not have a wall of giant client logos or dramatic growth screenshots. I have the work I can honestly show now: articles, experiments, breakdowns, systems, visual directions, and the early build of FRROST Media.</p><blockquote>I’m early, but I’m building in public with taste, systems, and sharp thinking.</blockquote><p>This site is the public layer of that journey. The goal is not to perform expertise. It is to make the thinking visible, improve the quality of the work, and become useful enough that the right people want to build together.</p></div></section>
        <section className="ice-page-section is-tint"><div className="ice-container"><SectionHeading label="BELIEFS" title="What I believe." /><div className="ice-meta-grid">{beliefs.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
        <section className="ice-page-section"><div className="ice-container"><SectionHeading label="CURRENT BUILDS" title="What I’m building." /><div className="ice-world-grid">{worlds.map((world) => <article className={`ice-world-card ${world.className}`} key={world.title}><span className="ice-section-label">{world.label}</span><h3>{world.title}</h3><p>{world.copy}</p></article>)}</div></div></section>
        <section className="ice-page-section is-tint"><div className="ice-container"><SectionHeading label="LEARNING IN PUBLIC" title="What I’m learning." copy="Brand memory, website storytelling, AI-assisted creative workflows, founder-led content, visual direction, and the discipline of shipping useful work before it feels finished." /><div className="ice-meta-grid">{[["Study the mechanism","Why did this brand, page, hook, or visual work?"],["Build the system","Turn the lesson into something reusable and practical."],["Publish the thinking","Write clearly enough that another operator can use it."]].map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ice-actions"><ButtonLink href="/work">Explore the Lab</ButtonLink><ButtonLink href="/newsletter" variant="secondary">Join the Letter</ButtonLink><ButtonLink href="/contact" variant="moss">Send a Note</ButtonLink></div></div></section>
      </main>
    </SiteShell>
  );
}
