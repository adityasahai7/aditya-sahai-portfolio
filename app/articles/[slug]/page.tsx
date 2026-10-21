import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LetterSection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero label={`${article.category.toUpperCase()} · ${article.readingTime.toUpperCase()}`} lines={[article.title]} lead={article.subtitle} tone="paper" size="lg" />
      <article className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap"><div className="prose">
          <p className="hint">By {article.author} · {article.publishedAt}</p>
          {article.body.map((section, index) => (
            <section key={section.heading || index}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.note && <p className="note-box">💡 {section.note}</p>}
            </section>
          ))}
          <div className="filters">{article.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
        </div></div>
      </article>
      {related.length > 0 && (
        <section className="page-section tone-mint" data-room="mint">
          <div className="wrap">
            <p className="label">KEEP READING 📚</p>
            <div className="article-grid">
              {related.map((r, i) => (
                <Link key={r.slug} href={`/articles/${r.slug}`} className={`deal-card tone-${["yellow", "cyan", "red"][i]}`}>
                  <span className="deal-cat">{r.category}</span><h3>{r.title}</h3><p>{r.excerpt}</p><small>{r.readingTime} →</small>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <LetterSection source={`article-${article.slug}`} />
    </>
  );
}
