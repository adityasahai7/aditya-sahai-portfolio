import type { Metadata } from "next";
import Link from "next/link";
import { DoodleArrow, MarkerUnderline, OperatorFooter, OperatorNav, Sticker } from "@/components/CreativeOperatorSite";
import { articles, categories } from "@/lib/operator-content";

export const metadata: Metadata = {
  title: { absolute: "Articles by Aditya Sahai — AI Branding, AI Marketing & Creative Operator Notes" },
  description: "Read essays by Aditya Sahai on AI branding, AI marketing, creative direction, founder personal branding, sales pages, content strategy, and building modern brands with AI.",
};

export default function ArticlesPage() {
  return (
    <main className="co-simple-page">
      <OperatorNav />
      <section className="co-page-hero co-articles-hero">
        <div>
          <Sticker variant="file-tag">ARTICLES INDEX</Sticker>
          <h1>Articles for brands building in the AI age.</h1>
          <p>Essays on AI branding, marketing, sales stories, creative direction, founder brands, content systems, and the operator mindset behind modern creative work.</p>
          <DoodleArrow />
        </div>
        <div className="co-archive-wall" aria-hidden="true">
          {["AI BRANDING", "MARKETING", "SALES STORY", "TASTE", "FRROST"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>
      <section className="co-page-section">
        <div className="co-loader-tabs" aria-label="Article filters">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
        <label className="co-note-form" style={{ marginBottom: 28 }}>
          Search articles…
          <input placeholder="AI branding, founder brand, sales story..." />
        </label>
        <div className="co-article-grid">
          {articles.map((article) => (
            <Link href={`/articles/${article.slug}`} key={article.slug} className="co-article-card" data-cursor="READ">
              <span>{article.category}</span>
              <h3>{article.title}</h3>
              <MarkerUnderline />
              <p>{article.excerpt}</p>
              <small>{article.readingTime} · {article.publishedAt}</small>
              <small>{article.tags.join(" · ")}</small>
              <b>Read File →</b>
            </Link>
          ))}
        </div>
      </section>
      <OperatorFooter />
    </main>
  );
}
