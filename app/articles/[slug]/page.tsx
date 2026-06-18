import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkerUnderline, OperatorFooter, OperatorNav, Sticker } from "@/components/CreativeOperatorSite";
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
  return (
    <main className="co-article-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <OperatorNav />
      <article className="co-article-layout">
        <Sticker variant="file-tag">{article.category}</Sticker>
        <h1>{article.title}</h1>
        <MarkerUnderline />
        <p className="co-section-copy">{article.subtitle}</p>
        <div className="co-article-meta">
          <span>{article.author}</span>
          <span>{article.publishedAt}</span>
          <span>{article.readingTime}</span>
        </div>
        <div className="co-loader-tabs">
          {article.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="co-article-body">
          {article.body.map((section, index) => (
            <section key={section.heading || index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.note && <div className="co-callout">{section.note}</div>}
              {index === 1 && <blockquote>Creative Operator Note: the first draft is not the file. The decision is the file.</blockquote>}
            </section>
          ))}
          <div className="co-callout">
            Open the File: Join the Thinking Beyond Letter for more notes on AI branding, AI marketing, creative direction, sales stories, and building modern brands with taste.
          </div>
        </div>
        <div className="co-actions">
          <Link href="/articles" className="co-btn">Back to Articles</Link>
          <Link href="/newsletter" className="co-btn primary">Join the Newsletter</Link>
        </div>
      </article>
      <OperatorFooter />
    </main>
  );
}
