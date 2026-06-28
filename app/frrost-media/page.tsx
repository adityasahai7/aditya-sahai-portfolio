import type { Metadata } from "next";
import { SiteShell } from "@/components/site/Chrome";
import { Badge, ButtonLink, PageHero, SectionHeading, StatusDot } from "@/components/site/UI";

export const metadata: Metadata = {
  title: { absolute: "FRROST Media — AI Creative Studio Layer" },
  description: "FRROST Media is the studio layer Aditya Sahai is building around AI branding, AI marketing, websites, sales stories, content systems, and creative direction.",
  alternates: { canonical: "/frrost-media" },
};

export default function FrrostMediaPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "FRROST Media",
    url: "https://adityasahai.com/frrost-media",
    founder: { "@type": "Person", name: "Aditya Sahai" },
    description: "An AI creative studio for brand worlds, marketing systems, websites, content, sales stories, and creative direction.",
  };
  return (
    <SiteShell className="ice-frrost-site"><main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero dark eyebrow="FRROST MEDIA · BUILD IN PUBLIC" title="The studio layer I’m building." copy="FRROST Media is the early-stage studio layer I’m building for brand worlds, websites, content systems, sales stories, and AI-assisted creative direction."><div><Badge tone="moss">Early-stage studio</Badge><p className="ice-frrost-note">It is early, but the direction is clear: help founders and brands look sharper, communicate better, and build creative systems that do not feel generic.</p></div></PageHero>
      <section className="ice-page-section is-dark"><div className="ice-container"><SectionHeading invert label="STUDIO CAPABILITIES" title="What FRROST is being built around." /><div className="ice-meta-grid ice-dark-cards">{["Brand worlds","Website experiences","Marketing systems","Content engines","Sales stories","Campaigns","Creative direction","AI-assisted workflows"].map((item) => <article key={item}><h3>{item}</h3><p>Strategy, story, system, and signal designed as one connected surface.</p></article>)}</div></div></section>
      <section className="ice-page-section"><div className="ice-container"><SectionHeading label="BUILD IN PUBLIC" title="What is being built now." copy="No giant-agency theatre. These are the actual operating pieces taking shape." /><div className="ice-lab-grid">{["Brand system","Website experiments","Content engine","Sales story framework","Client onboarding flow","AI creative workflow","Founder-led content system"].map((item) => <article className="ice-card ice-lab-card" key={item}><StatusDot>In Progress</StatusDot><h3>{item}</h3><p>Being designed, tested, documented, and improved as the studio becomes real.</p></article>)}</div></div></section>
      <section className="ice-page-section is-tint"><div className="ice-container"><SectionHeading label="WHO IT IS FOR" title="Aligned early projects." copy="Founders, creators, startups, local businesses, and personal brands that need clearer positioning, a sharper digital surface, or a practical creative system." /><div className="ice-process-list">{[["01","Diagnose","Find what is unclear or generic."],["02","Position","Build the message and story."],["03","Design","Shape the visual and experience system."],["04","Build","Turn direction into a real asset."],["05","Improve","Refine with honest feedback."]].map(([number,title,copy]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></li>)}</div><div className="ice-actions"><ButtonLink href="/contact">Send a FRROST Note</ButtonLink><ButtonLink href="/articles/what-we-are-building-with-frrost-media" variant="secondary">Read the studio thesis</ButtonLink></div></div></section>
    </main></SiteShell>
  );
}
