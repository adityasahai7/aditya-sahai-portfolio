"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const HYPHEN = /(\w)-(?=\w)/g;

/** Hyphenated words (cross-site, 22-year-old) never split across two lines: swap in a non-breaking hyphen. */
export function KeepWords() {
  const path = usePathname();
  useEffect(() => {
    const fix = () => {
      const main = document.getElementById("main");
      if (!main) return;
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      let n: Node | null;
      while ((n = walker.nextNode())) {
        const el = (n as Text).parentElement;
        if (!el || el.closest("script,style,textarea,input,code,pre")) continue;
        const t = n.textContent ?? "";
        if (HYPHEN.test(t)) { HYPHEN.lastIndex = 0; n.textContent = t.replace(HYPHEN, "$1‑"); }
        HYPHEN.lastIndex = 0;
      }
    };
    const a = window.setTimeout(fix, 50), b = window.setTimeout(fix, 1200);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, [path]);
  return null;
}
