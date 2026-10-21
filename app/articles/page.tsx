import type { Metadata } from "next";
import { articles, categories } from "@/lib/operator-content";
import { LetterSection } from "@/components/home/Blocks";
import { ArticleExplorer } from "@/components/pages/ArticleExplorer";
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
      <PageHero label="WRITING ✍️" lines={["THINGS", "I WROTE."]} lead="Essays on AI, taste, storytelling, brands and building in public. Pick a sticker to filter." emoji="✍️" tone="paper" accent={1}>
        <ArticleExplorer articles={list} categories={categories} />
      </PageHero>
      <LetterSection source="articles" />
    </>
  );
}
