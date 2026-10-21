"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

type A = { slug: string; title: string; excerpt: string; category: string; readingTime: string; publishedAt: string };
const TONES = ["yellow", "cyan", "red", "mint", "fuchsia", "paper"];

/** Category sticker filters; cards re-flow with a layout morph. */
export function ArticleExplorer({ articles, categories }: { articles: A[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const shown = articles.filter((a) => cat === "All" || a.category === cat);
  return (
    <>
      <div className="filters">
        {categories.map((c) => <button key={c} type="button" className={`chip ${cat === c ? "is-on" : ""}`} onClick={() => setCat(c)}>{c}</button>)}
      </div>
      <motion.div layout className="article-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((a, i) => (
            <motion.div key={a.slug} layout initial={{ opacity: 0, scale: 0.8, rotate: -6 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: 0.8, rotate: 6 }} transition={{ type: "spring", stiffness: 160, damping: 18 }} whileHover={{ y: -10, rotate: i % 2 ? 1.5 : -1.5 }}>
              <Link href={`/articles/${a.slug}`} className={`deal-card tone-${TONES[i % TONES.length]}`} data-cursor="READ">
                <span className="deal-cat">{a.category}</span>
                <h3>{a.title}</h3>
                <p>{a.excerpt}</p>
                <small>{a.readingTime} →</small>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
