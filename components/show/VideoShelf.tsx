"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Video } from "@/lib/server/youtube";
import { LINKS } from "@/lib/content";
import { Btn } from "@/components/motion/kit";

/** Latest Beyond Default episodes. Hover tilts, click plays in a lightbox (youtube-nocookie). */
export function VideoShelf({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<Video | null>(null);
  if (!videos.length) {
    return (
      <div className="shelf-empty">
        <motion.span animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🎬</motion.span>
        <p className="h-md">EPISODE ONE IS IN THE EDIT.</p>
        <p className="lead">Subscribe so it lands the second it&apos;s out.</p>
        <Btn href={LINKS.youtube} tone="red" size="lg" cursor="SUBSCRIBE">▶️ Subscribe @adityasahai37</Btn>
      </div>
    );
  }
  return (
    <>
      <div className="video-grid">
        {videos.map((v, i) => (
          <motion.button key={v.id} type="button" className="video-card" onClick={() => setPlaying(v)} data-cursor="PLAY"
            initial={{ y: 80, rotate: i % 2 ? 4 : -4, opacity: 0 }} whileInView={{ y: 0, rotate: i % 2 ? 1 : -1, opacity: 1 }} viewport={{ once: true }}
            whileHover={{ y: -12, rotate: 0, scale: 1.03 }} transition={{ type: "spring", stiffness: 140, damping: 15, delay: i * 0.06 }}>
            <span className="video-thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="video-play">▶</span>
            </span>
            <b>{v.title}</b>
            <small>{new Date(v.published).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</small>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {playing && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlaying(null)}>
            <motion.div className="lightbox-frame" initial={{ scale: 0.6, rotate: -6 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ type: "spring", stiffness: 180, damping: 18 }} onClick={(e) => e.stopPropagation()}>
              <iframe src={`https://www.youtube-nocookie.com/embed/${playing.id}?autoplay=1&rel=0`} title={playing.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
              <button type="button" className="lightbox-close" onClick={() => setPlaying(null)} aria-label="Close video">✖️</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
