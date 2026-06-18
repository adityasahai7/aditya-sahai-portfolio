import type { Metadata } from "next";
import Link from "next/link";
import { ContactNote, OperatorFooter, OperatorNav, Sticker } from "@/components/CreativeOperatorSite";
import { beliefs, creativeFiles } from "@/lib/operator-content";

export const metadata: Metadata = {
  title: { absolute: "About Aditya Sahai — Creative AI Operator" },
  description: "Read the story, beliefs, and creative operator file of Aditya Sahai, an Indian Creative AI Operator building around AI branding, AI marketing, creative direction, articles, newsletters, FRROST Media, and Thinking Beyond.",
};

export default function AboutPage() {
  return (
    <main className="co-simple-page">
      <OperatorNav />
      <section className="co-page-hero co-about-hero">
        <div>
          <Sticker variant="file-tag">ABOUT / BIO FILE</Sticker>
          <h1>I’m Aditya Sahai. I’m building the Creative AI Operator lane.</h1>
          <p>I care about the layer where AI meets taste: branding, marketing, sales stories, content, websites, articles, newsletters, and the creative decisions that make output worth remembering.</p>
        </div>
        <div className="co-about-manifesto">
          <span>THINKING BEYOND AVERAGE</span>
          <b>AI made it easier to produce. It did not make it easier to matter.</b>
        </div>
      </section>
      <section className="co-page-section">
        <h2>The longer bio.</h2>
        <div className="co-big-card">
          <Sticker variant="stamp">PERSONAL FILE</Sticker>
          <p>I’m not building a normal portfolio.</p>
          <p>I wanted AdityaSahai.com to feel more like a public notebook: the place where my ideas, articles, creative files, newsletter, brand notes, and studio experiments live.</p>
          <p>The core question I keep returning to is simple: what happens when a young Indian operator learns AI, branding, marketing, sales, content, and creative direction at the same time?</p>
          <p>Not AI for the sake of AI. Not branding for decoration. Not marketing as noise. Not content as daily posting. Not sales as pressure.</p>
          <p>The real work is sharper: make the brand easier to remember, make the message easier to understand, make the creative direction harder to ignore, make the website feel like a world, make the article useful enough to rank, make the newsletter worth opening, and make the whole system feel like it came from one mind.</p>
          <blockquote>AI made it easier to produce. It did not make it easier to matter.</blockquote>
        </div>
      </section>
      <section className="co-page-section">
        <h2>What I believe.</h2>
        <div className="co-page-grid">
          {beliefs.map(([title, copy], index) => <article className={`co-page-card belief-${index + 1}`} key={title}><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>
      <section className="co-page-section">
        <h2>What I’m building.</h2>
        <div className="co-page-grid">
          {creativeFiles.slice(0, 6).map(([num, title, type, status, description]) => <article className="co-page-card co-file-mini" key={num}><i className="co-file-tab" /><span>FILE {num}</span><h3>{title}</h3><b>{type} · {status}</b><p>{description}</p></article>)}
        </div>
      </section>
      <section className="co-page-section">
        <h2>What I refuse to become.</h2>
        <div className="co-page-grid">
          {["another AI tool-review account", "fake luxury content", "random motivation", "package-selling guru", "generic AI agency", "template portfolio", "content with no point", "branding with no taste", "marketing with no positioning", "sales without story"].map((item) => <article className="co-page-card" key={item}>{item}</article>)}
        </div>
        <div className="co-actions">
          <Link href="/articles" className="co-btn primary">Read the Articles</Link>
          <Link href="/newsletter" className="co-btn">Join the Newsletter</Link>
          <a href="#contact" className="co-btn">Send a Note</a>
        </div>
      </section>
      <ContactNote />
      <OperatorFooter />
    </main>
  );
}
