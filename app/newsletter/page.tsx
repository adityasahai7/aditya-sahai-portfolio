import type { Metadata } from "next";
import { ContactNote, OperatorFooter, OperatorNav, Sticker } from "@/components/CreativeOperatorSite";

export const metadata: Metadata = {
  title: { absolute: "Thinking Beyond Letter — Newsletter by Aditya Sahai" },
  description: "Join Thinking Beyond Letter, Aditya Sahai’s Sunday read for Indian operators on AI, branding, marketing, creative direction, articles, FRROST Media, and operator thinking.",
};

export default function NewsletterPage() {
  return (
    <main className="co-simple-page">
      <OperatorNav />
      <section className="co-page-hero">
        <Sticker variant="file-tag">NEWSLETTER FILE</Sticker>
        <h1>Thinking Beyond Letter.</h1>
        <p>The Sunday read for Indian operators who refuse the default path. One creative build, one sharp lesson, and three things worth your attention.</p>
      </section>
      <section className="co-page-section">
        <h2>What you get.</h2>
        <div className="co-news-grid">
          <article><h3>The Build</h3><p>What I’m building in AI, branding, marketing, FRROST Media, content, or creative direction.</p></article>
          <article><h3>The Lesson</h3><p>One practical idea on taste, story, strategy, sales, creativity, or operator life.</p></article>
          <article><h3>The Round-up</h3><p>Three links, campaigns, tools, books, videos, or ideas worth your attention.</p></article>
        </div>
      </section>
      <section className="co-page-section">
        <h2>Past letter files opening soon.</h2>
        <div className="co-letter">
          {["The week AI made average content worthless", "What I learned building FRROST’s brand world", "Why your website is the first sales conversation", "AI is not the brand. It is the lever.", "Content is positioning at scale", "Sales pages are stories under pressure"].map((issue) => <span key={issue}>{issue}</span>)}
        </div>
        <p className="co-section-copy">The backend subscription room is being wired cleanly. Until then, send a note and I’ll add you manually.</p>
      </section>
      <ContactNote />
      <OperatorFooter />
    </main>
  );
}
