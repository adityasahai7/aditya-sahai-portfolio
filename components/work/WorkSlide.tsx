"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { Project } from "@/types";

interface WorkSlideProps {
  project: Project;
  index: number;
  isCurrent: boolean;
}

const EXPO = [0.16, 1, 0.3, 1] as const;

export default function WorkSlide({ project, index, isCurrent }: WorkSlideProps) {
  const [imgHovered, setImgHovered] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={slideRef}
      className="work-slide relative flex-shrink-0 w-screen h-screen flex flex-col md:flex-row justify-center md:justify-start items-start md:items-center px-6 md:px-16 gap-8 md:gap-16"
    >
      {/* Giant background number */}
      <div
        className="absolute left-6 bottom-0 font-editorial select-none pointer-events-none leading-none"
        style={{
          fontSize:        "clamp(200px, 28vw, 380px)",
          color:           "transparent",
          WebkitTextStroke: "1px rgba(110,158,255,0.22)",
          zIndex:          0,
        }}
        aria-hidden="true"
      >
        {project.number}
      </div>

      {/* Image */}
      <motion.div
        className="relative flex-shrink-0 rounded-card overflow-hidden"
        style={{
          width:  "min(86vw, 820px)",
          height: "clamp(240px, 38vw, 560px)",
          zIndex: 1,
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: "0 30px 100px -44px rgba(0,0,0,0.95), 0 0 80px -46px rgba(110,158,255,0.5)",
        }}
        onMouseEnter={() => setImgHovered(true)}
        onMouseLeave={() => setImgHovered(false)}
        data-cursor="view"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Butter glow behind on reveal */}
        <motion.div
          className="absolute -inset-8 pointer-events-none"
          style={{
            background:   "radial-gradient(circle at center, rgba(110,158,255,0.18) 0%, transparent 70%)",
            filter:       "blur(24px)",
            zIndex:       -1,
          }}
          animate={{ opacity: imgHovered ? 0.9 : 0.4 }}
        />

        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, 56vw"
          priority={index === 0}
        />

        {/* Hover glow overlay */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(110,158,255,0.16), rgba(196,168,255,0.10))", mixBlendMode: "screen" }}
          animate={{ opacity: imgHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-4 max-w-xs">
        {/* Category pill */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
        >
          <span className="eyebrow text-accent/80 border border-acid/25 px-3 py-1.5 rounded-pill inline-block">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="font-grotesk font-medium text-ink leading-tight"
          style={{ fontSize: "clamp(28px,3vw,44px)", letterSpacing: "0" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4, ease: EXPO }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="font-grotesk text-[15px] text-ink/58 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5, ease: EXPO }}
        >
          {project.description}
        </motion.p>

        {/* Year + link */}
        <motion.div
          className="flex items-center gap-4 mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="eyebrow text-accent/55">{project.year}</span>
          <span className="font-mono text-[12px] text-accent tracking-widest cursor-pointer hover:text-ink transition-colors">
            View Case Study →
          </span>
        </motion.div>
      </div>
    </div>
  );
}
