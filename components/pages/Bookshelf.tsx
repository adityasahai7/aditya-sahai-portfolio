"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { sfx } from "@/components/fun/sound";

type Book = { slug: string; title: string; category: string; readingTime: string; excerpt: string };
const COVERS = ["#F18179", "#F5D46D", "#9CE8F2", "#BDEFD5", "#E56AA6", "#38A997", "#176D70", "#FFFAF2"];
const EMOJI: Record<string, string> = { "Creative AI Operator": "🤖", "Build in Public": "🛠️", "Thinking Beyond": "🧠", Storytelling: "📖", "FRROST Notes": "📈" };

/** Writing as real 3D book spines. Hover pulls a book out; click opens it and flips into the article. */
export function Bookshelf({ books }: { books: Book[] }) {
  const router = useRouter();
  const [hover, setHover] = useState<number | null>(null);
  const [opening, setOpening] = useState<Book | null>(null);
  function open(b: Book) {
    sfx.pop();
    setOpening(b);
    window.setTimeout(() => router.push(`/articles/${b.slug}`), 900);
  }
  return (
    <div className="bookshelf">
      <div className="books">
        {books.map((b, i) => {
          const h = 230 + ((i * 37) % 70);
          const color = COVERS[i % COVERS.length];
          return (
            <motion.button key={b.slug} type="button" className="book" data-cursor="READ" aria-label={`Read: ${b.title}`}
              style={{ height: h, background: color, color: color === "#176D70" ? "#F7F1E7" : "#202727" }}
              initial={{ y: -300, rotate: (i % 2 ? 1 : -1) * 20, opacity: 0 }} whileInView={{ y: 0, rotate: i % 5 === 3 ? -6 : 0, opacity: 1 }} viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: i * 0.05 }}
              whileHover={{ y: -28, rotateY: -18, transition: { type: "spring", stiffness: 300, damping: 18 } }}
              onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} onClick={() => open(b)}>
              <span className="book-emoji">{EMOJI[b.category] ?? "✍️"}</span>
              <span className="book-title">{b.title}</span>
              <span className="book-band" />
            </motion.button>
          );
        })}
      </div>
      <div className="shelf-plank" />
      <AnimatePresence>
        {hover !== null && books[hover] && (
          <motion.div className="book-peek" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <b>{books[hover].title}</b> · {books[hover].readingTime}
          </motion.div>
        )}
        {opening && (
          <motion.div className="book-open" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="book-open-book">
              <motion.div className="book-cover" initial={{ rotateY: 0 }} animate={{ rotateY: -160 }} transition={{ duration: 0.8, ease: [0.6, 0, 0.3, 1] }}>
                <span>{EMOJI[opening.category] ?? "✍️"}</span><b>{opening.title}</b>
              </motion.div>
              <div className="book-page"><p>{opening.excerpt}</p></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
