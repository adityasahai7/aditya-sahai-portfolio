import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/site/Forms";
import { SiteShell } from "@/components/site/Chrome";
import { Badge, ButtonLink } from "@/components/site/UI";
import { articles, getArticle } from "@/lib/operator-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: article.metaTitle },
    description: article.metaDescription,
    keywords: article.targetKeywords,
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    keywords: article.targetKeywords.join(", "),
    mainEntityOfPage: `https://adityasahai.com/articles/${article.slug}`,
  };
  const related = articles.filter((item) => item.slug !== article.slug && (item.category === article.category || item.featured)).slice(0, 3);
  return (
    <SiteShell><main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <article className="ice-page-section">
        <div className="ice-container ice-article-layout"><div><header className="ice-article-header"><Badge tone="blue">{article.category}</Badge><h1>{article.title}</h1><p>{article.subtitle}</p><div className="ice-article-meta"><span>{article.author}</span><span>{article.publishedAt}</span><span>{article.readingTime}</span></div><div className="ice-filter-list ice-article-tags">{article.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></header>
        <div className="ice-article-body">
          {article.body.map((section, index) => (
            <section key={section.heading || index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.note && <div className="ice-callout">{section.note}</div>}
              {index === 1 && <div className="ice-callout">Creative operator note: the first draft is not the work. The decision is the work.</div>}
            </section>
          ))}
          <div className="ice-callout">Join Thinking Beyond Letter for more notes on AI, branding, creative direction, sales stories, and building modern brands with taste.</div>
        </div><div className="ice-actions"><ButtonLink href="/articles" variant="secondary">Back to Articles</ButtonLink><ButtonLink href="/newsletter">Join the Newsletter</ButtonLink></div></div>
        <aside className="ice-article-aside"><b>In this article</b>{article.body.filter((section) => section.heading).map((section) => <span key={section.heading}>{section.heading}</span>)}<NewsletterForm source={`article-${article.slug}`} compact /></aside></div>
      </article>
      <section className="ice-page-section is-tint"><div className="ice-container"><h2 className="ice-related-title">Related thinking.</h2><div className="ice-grid ice-articles-grid">{related.map((item)=><Link className="ice-card ice-article-card" href={`/articles/${item.slug}`} key={item.slug}><div><Badge tone="quiet">{item.category}</Badge><span>{item.readingTime}</span></div><h3>{item.title}</h3><p>{item.excerpt}</p><b>Read Article →</b></Link>)}</div></div></section>
    </main></SiteShell>
  );
}
