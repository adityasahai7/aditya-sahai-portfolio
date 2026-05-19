"use client";

import { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  href?: string;
  as?: "button" | "a";
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  radius?: number;
  maxDisplacement?: number;
}

export default function MagneticButton({
  children,
  className = "",
  style,
  onClick,
  href,
  as: Tag = "button",
  target,
  rel,
  type = "button",
  disabled = false,
  radius = 60,
  maxDisplacement = 12,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });

  const textX = useTransform(x, (v) => v * 0.4);
  const textY = useTransform(y, (v) => v * 0.4);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < radius) {
      const strength = (1 - dist / radius) * maxDisplacement;
      if (dist === 0) return;
      x.set((distX / dist) * strength);
      y.set((distY / dist) * strength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const props = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseEnter: () => setIsHovered(true),
    onClick,
    className,
    style,
    ...(Tag === "button" ? { type, disabled } : { href, target, rel }),
  };

  return (
    <motion.div
      style={{ x, y, display: "inline-block" }}
      className="relative"
    >
      <Tag {...(props as any)}>
        <motion.span
          style={{ x: textX, y: textY, display: "block" }}
        >
          {children}
        </motion.span>
      </Tag>
    </motion.div>
  );
}
