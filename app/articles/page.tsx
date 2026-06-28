import type { Metadata } from "next";
import { SiteShell } from "@/components/site/Chrome";
import { PageHero } from "@/components/site/UI";
import ArticleExplorer from "@/components/site/ArticleExplorer";

export const metadata: Metadata = {
  title: { absolute: "Articles by Aditya Sahai — AI Branding, AI Marketing & Creative Operator Notes" },
  description: "Read essays by Aditya Sahai on AI branding, AI marketing, creative direction, founder personal branding, sales pages, content strategy, and building modern brands with AI.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <SiteShell><main><PageHero eyebrow="PUBLIC THINKING" title="Articles for brands building in the AI age." copy="Essays on AI, branding, marketing, creative direction, founder brands, sales pages, content systems, FRROST Media, and operator thinking." /><section className="ice-page-section"><div className="ice-container"><ArticleExplorer /></div></section></main></SiteShell>
  );
}
