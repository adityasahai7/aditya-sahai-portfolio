"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  once?: boolean;
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.06,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function RevealText({
  text,
  as: Tag = "p",
  className = "",
  style,
  delay = 0,
  stagger = 0.06,
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.4 });

  const words = text.split(" ");

  const customVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: delay + i * stagger,
        duration: 1.0,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: "inline-block", overflow: "hidden" }}
        >
          <motion.span
            custom={i}
            variants={customVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
