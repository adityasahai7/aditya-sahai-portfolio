import type { Metadata } from "next";
import { NewsletterForm } from "@/components/site/Forms";
import { SiteShell } from "@/components/site/Chrome";
import { PageHero, SectionHeading } from "@/components/site/UI";

export const metadata: Metadata = {
  title: { absolute: "Thinking Beyond Letter — Newsletter by Aditya Sahai" },
  description: "Join Thinking Beyond Letter, Aditya Sahai’s Sunday read for Indian operators on AI, branding, marketing, creative direction, articles, FRROST Media, and operator thinking.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <SiteShell><main><PageHero eyebrow="THINKING BEYOND LETTER" title="The Sunday read for Indian operators who refuse the default path." copy="One creative build, one sharp lesson, and three things worth your attention."><NewsletterForm source="newsletter-page" /></PageHero><section className="ice-page-section"><div className="ice-container"><SectionHeading label="THE READER PROMISE" title="Useful enough to keep opening." /><div className="ice-meta-grid"><article><h3>The Build</h3><p>What I’m building across AI, branding, FRROST Media, content, and creative direction.</p></article><article><h3>The Lesson</h3><p>One practical idea on taste, story, strategy, sales, creativity, or operator life.</p></article><article><h3>The Round-up</h3><p>Three campaigns, tools, books, videos, or ideas worth your attention.</p></article></div></div></section><section className="ice-page-section is-tint"><div className="ice-container"><SectionHeading label="ISSUE DIRECTIONS" title="What the letter will explore." copy="These are honest editorial directions, not fabricated past issues." /><div className="ice-lab-grid">{["The week AI made average content worthless","What I’m learning while building FRROST Media","Why your website is the first sales conversation","AI is not the brand. It is the lever.","Content is positioning at scale","Sales pages are stories under pressure"].map((issue, index) => <article className="ice-card ice-lab-card" key={issue}><small>ISSUE DIRECTION 0{index + 1}</small><h3>{issue}</h3><p>In development for a future edition of Thinking Beyond Letter.</p></article>)}</div></div></section><section className="ice-page-section"><div className="ice-container ice-newsletter-grid"><div><SectionHeading label="JOIN THE LETTER" title="Build beyond average." copy="Your email is used only for the newsletter. You can unsubscribe whenever you want." /></div><NewsletterForm source="newsletter-bottom" /></div></section></main></SiteShell>
  );
}
