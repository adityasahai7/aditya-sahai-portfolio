"use client";

import { useEffect, useState, useCallback } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*!?";

interface ScrambleProps {
  text: string;
  trigger?: boolean;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function useScramble(text: string, trigger: boolean, speed = 35) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iteration)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      iteration += 0.35;

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [trigger, text, speed]);

  return display;
}

export default function Scramble({
  text,
  trigger = true,
  speed = 35,
  className = "",
  onComplete,
}: ScrambleProps) {
  const display = useScramble(text, trigger, speed);

  useEffect(() => {
    if (display === text && trigger && onComplete) {
      onComplete();
    }
  }, [display, text, trigger, onComplete]);

  return <span className={className}>{display}</span>;
}
