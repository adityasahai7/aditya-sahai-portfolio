"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  Layers, FileText, Play, Film, BarChart2, User,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Layers, FileText, Play, Film, BarChart2, User,
};

const EXPO = [0.16, 1, 0.3, 1] as const;

interface BentoCardProps {
  service: Service;
  variant?: "default" | "large" | "wide" | "small";
  index: number;
}

export default function BentoCard({ service, variant = "default", index }: BentoCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef   = useRef<HTMLDivElement>(null);
  const followerX = useMotionValue(0);
  const followerY = useMotionValue(0);
  const fx        = useSpring(followerX, { stiffness: 300, damping: 24 });
  const fy        = useSpring(followerY, { stiffness: 300, damping: 24 });

  const Icon = ICON_MAP[service.iconName] ?? Layers;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    followerX.set(e.clientX - rect.left);
    followerY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative overflow-hidden rounded-card cursor-none group noise-card"
      data-cursor="view"
      aria-label="View Service"
      style={{
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.105), rgba(255,255,255,0.045))",
        border:          "1px solid rgba(255,255,255,0.14)",
        boxShadow:       "0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 70px -38px rgba(0,0,0,0.9)",
        backdropFilter:  "blur(14px)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 60, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay:    index * 0.07,
        type:     "spring",
        stiffness: 80,
        damping: 14,
      }}
    >
      {/* Cobalt fill on hover */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(650px circle at center, rgba(110,158,255,0.18), transparent 52%), linear-gradient(135deg, rgba(110,158,255,0.22), rgba(196,168,255,0.10))",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: EXPO }}
      />

      {/* Cursor follower "VIEW SERVICE →" */}
      <motion.div
        className="absolute pointer-events-none z-20 px-3 py-1.5 rounded-pill font-mono text-[10px] tracking-[0.12em] uppercase"
        style={{
          x:                fx,
          y:                fy,
          translateX:       "-50%",
          translateY:       "-50%",
          backgroundColor:  hovered ? "rgba(5,5,5,0.72)" : "transparent",
          color:            "#F7F7F8",
          border:           hovered ? "1px solid rgba(255,255,255,0.16)" : "1px solid transparent",
          opacity:          hovered ? 1 : 0,
          whiteSpace:       "nowrap",
        }}
        transition={{ opacity: { duration: 0.18 } }}
      >
        View Service →
      </motion.div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full p-6 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between">
          <span
            className="font-mono font-medium text-[28px] leading-none"
            style={{ color: hovered ? "rgba(247,247,248,0.42)" : "#6E9EFF" }}
          >
            {service.num}
          </span>

          {/* Icon — rotates on hover */}
          <motion.div
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: 0.55, ease: EXPO }}
            style={{ color: hovered ? "#FFFFFF" : "#F7F7F8" }}
          >
            <Icon size={28} strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Title — scrambles on hover */}
        <div className="flex-1">
          <h3
            className="font-grotesk font-medium leading-tight text-[20px] md:text-[22px]"
            style={{ color: hovered ? "#FFFFFF" : "#F7F7F8" }}
          >
            {service.title}
          </h3>
          <p
            className="font-grotesk text-[14px] mt-2 leading-relaxed"
            style={{ color: hovered ? "rgba(255,255,255,0.76)" : "rgba(247,247,248,0.58)" }}
          >
            {service.description}
          </p>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t"
          style={{ borderColor: hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)" }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-pill"
            style={{
              backgroundColor: hovered ? "rgba(255,255,255,0.14)" : "rgba(110,158,255,0.14)",
              color:           hovered ? "#FFFFFF"                : "#6E9EFF",
            }}
          >
            {service.delivery}
          </span>
          <motion.span
            className="font-mono text-[16px]"
            style={{ color: hovered ? "#FFFFFF" : "#6E9EFF" }}
            animate={{ x: hovered ? 8 : 0 }}
            transition={{ duration: 0.3, ease: EXPO }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}
