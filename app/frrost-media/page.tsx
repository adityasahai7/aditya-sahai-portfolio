import type { Metadata } from "next";
import Link from "next/link";
import { ContactNote, OperatorFooter, OperatorNav, Sticker } from "@/components/CreativeOperatorSite";

export const metadata: Metadata = {
  title: { absolute: "FRROST Media — AI Creative Studio Layer" },
  description: "FRROST Media is the studio layer Aditya Sahai is building around AI branding, AI marketing, websites, sales stories, content systems, and creative direction.",
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
    <main className="co-simple-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <OperatorNav />
      <section className="co-page-hero co-frrost">
        <Sticker variant="stamp">FRROST MEDIA</Sticker>
        <h1>FRROST Media is the studio layer.</h1>
        <p>FRROST Media is where the creative operator thinking turns into brand worlds, websites, content systems, campaigns, sales stories, and AI-assisted creative direction.</p>
      </section>
      <section className="co-page-section co-frrost">
        <div className="co-frrost-grid">
          <article><h3>What it is</h3><p>An AI creative studio built around branding, marketing, sales storytelling, websites, content, and creative output.</p></article>
          <article><h3>What it believes</h3><p>AI does not replace taste. It multiplies the people who have it.</p></article>
          <article><h3>What it builds around</h3><p>Brand worlds, website experiences, campaign ideas, founder-led content, visual direction, sales stories, content engines, and creative systems.</p></article>
        </div>
        <div className="co-actions">
          <a href="#contact" className="co-btn frost">Send a note</a>
          <Link href="/articles/what-we-are-building-with-frrost-media" className="co-btn ghost">Read the FRROST file</Link>
        </div>
      </section>
      <ContactNote />
      <OperatorFooter />
    </main>
  );
}
