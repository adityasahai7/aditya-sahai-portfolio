"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { categories, articles } from "@/lib/operator-content";
import { Badge } from "@/components/site/UI";

export default function ArticleExplorer() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return articles.filter((article) => {
      const categoryMatch = category === "All" || article.category === category;
      const searchMatch = !normalized || [article.title, article.excerpt, article.category, ...article.tags].join(" ").toLowerCase().includes(normalized);
      return categoryMatch && searchMatch;
    });
  }, [category, query]);

  return (
    <>
      <div className="ice-article-controls">
        <label className="ice-search"><Search size={17} /><span className="sr-only">Search articles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search AI, branding, sales stories..." /></label>
        <div className="ice-filter-list" aria-label="Article categories">{categories.map((item) => <button className={item === category ? "is-active" : ""} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      </div>
      {visible.length ? <div className="ice-grid ice-articles-grid">{visible.map((article) => <Link className="ice-card ice-article-card" href={`/articles/${article.slug}`} key={article.slug}><div><Badge tone="quiet">{article.category}</Badge><span>{article.readingTime}</span></div><h3>{article.title}</h3><p>{article.excerpt}</p><small>{article.publishedAt} · {article.tags.slice(0, 3).join(" · ")}</small><b>Read Article <ArrowRight size={16} /></b></Link>)}</div> : <div className="ice-empty-state"><h2>No article matches that search yet.</h2><p>Try a broader phrase or clear the active category.</p></div>}
    </>
  );
}
