"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface DraggableStickerProps {
  shape: "circle" | "pill" | "square";
  bgColor: string;
  textColor?: string;
  label?: string;
  size?: number;
  initialX?: number;
  initialY?: number;
  initialRotate?: number;
  bobDelay?: number;
  constraintsRef?: React.RefObject<HTMLElement>;
}

export default function DraggableSticker({
  shape,
  bgColor,
  textColor = "#0F0E0C",
  label,
  size = 80,
  initialX = 0,
  initialY = 0,
  initialRotate = 0,
  bobDelay = 0,
  constraintsRef,
}: DraggableStickerProps) {
  const [isDragging, setIsDragging] = useState(false);

  const borderRadius = {
    circle:  "50%",
    pill:    "999px",
    square:  "8px",
  }[shape];

  const w = shape === "pill" ? size * 1.8 : size;
  const h = size;

  return (
    <motion.div
      data-cursor="drag"
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      dragTransition={{ bounceStiffness: 260, bounceDamping: 22 }}
      whileDrag={{ scale: 1.12, zIndex: 50 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={()   => setIsDragging(false)}
      initial={{ x: initialX, y: initialY, rotate: initialRotate, opacity: 0, scale: 0.6 }}
      animate={{
        opacity: 1,
        scale:   1,
        y:       isDragging ? 0 : [0, -8, 0],
      }}
      transition={{
        opacity: { duration: 0.4, delay: 0.1 },
        scale:   { duration: 0.4, delay: 0.1 },
        y:       { duration: 3 + bobDelay, repeat: Infinity, ease: "easeInOut" },
      }}
      className="absolute cursor-none touch-none select-none flex items-center justify-center"
      style={{
        width:        w,
        height:       h,
        borderRadius,
        backgroundColor: bgColor,
        zIndex:       10,
        border:       "1px solid rgba(255,255,255,0.18)",
        boxShadow:    "0 18px 60px -28px rgba(0,0,0,0.85)",
      }}
    >
      {label && (
        <span
          className="font-mono font-medium text-center"
          style={{
            fontSize:      size > 60 ? 13 : 11,
            letterSpacing: "0.1em",
            color:         textColor,
            textTransform: "uppercase",
            userSelect:    "none",
          }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}
