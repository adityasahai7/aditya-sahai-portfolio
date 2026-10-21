import type { Metadata } from "next";
import { articles, categories } from "@/lib/operator-content";
import { LetterSection } from "@/components/home/Blocks";
import { ArticleExplorer } from "@/components/pages/ArticleExplorer";
import { Bookshelf } from "@/components/pages/Bookshelf";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays by Aditya Sahai on AI, taste, storytelling, brands, content and building in public.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  const list = articles.map(({ slug, title, excerpt, category, readingTime, publishedAt }) => ({ slug, title, excerpt, category, readingTime, publishedAt }));
  return (
    <>
      <PageHero label="WRITING ✍️" lines={["THINGS", "I WROTE."]} lead="Essays on AI, taste, storytelling, brands and building in public. Pick a book off the shelf." emoji="✍️" tone="paper" accent={1}>
        <Bookshelf books={articles.map(({ slug, title, category, readingTime, excerpt }) => ({ slug, title, category, readingTime, excerpt }))} />
        <p className="hint" style={{ textAlign: "center" }}>Hover a book to pull it out 📚 · click to open</p>
      </PageHero>
      <section className="page-section" data-room="paper" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">OR BROWSE THE OLD-FASHIONED WAY 🗂️</p>
          <ArticleExplorer articles={list} categories={categories} />
        </div>
      </section>
      <LetterSection source="articles" />
    </>
  );
}
