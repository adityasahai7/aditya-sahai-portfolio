import type { Metadata } from "next";
import { SiteShell } from "@/components/site/Chrome";
import { Badge, ButtonLink, PageHero, SectionHeading, StatusDot } from "@/components/site/UI";
import { labGroups, proofCards } from "@/lib/site-content";

export const metadata: Metadata = { title: "Builds, Experiments & Notes", description: "A living lab of what Aditya Sahai is building, studying, designing, and testing.", alternates: { canonical: "/work" } };

export default function WorkPage() {
  return <SiteShell><main><PageHero eyebrow="THE OPERATOR LAB" title="Builds, Experiments & Notes" copy="I’m early, so this is not a fake portfolio. It is a living lab of what I’m building, studying, designing, and testing."><StatusDot>All work is self-initiated or build in public unless stated otherwise</StatusDot></PageHero><section className="ice-page-section"><div className="ice-container"><SectionHeading label="PROOF OF THINKING" title="The current lab." copy="Visible thinking before big claims. Every card tells you what it is and where it stands." /><div className="ice-grid ice-proof-grid">{proofCards.map(({ title, category, status, copy, icon: Icon }) => <article className="ice-card ice-proof-card" key={title}><div className="ice-proof-top"><Badge tone="quiet">{category}</Badge><StatusDot>{status}</StatusDot></div><Icon size={26} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section><section className="ice-page-section is-tint"><div className="ice-container"><SectionHeading label="LAB MAP" title="What I’m studying through the work." /><div className="ice-lab-grid">{labGroups.map(([label, title, copy]) => <article className="ice-card ice-lab-card" key={title}><small>{label}</small><h3>{title}</h3><p>{copy}</p></article>)}</div><div className="ice-actions"><ButtonLink href="/contact">Start an aligned early project</ButtonLink><ButtonLink href="/articles" variant="secondary">Read the thinking</ButtonLink></div></div></section></main></SiteShell>;
}
