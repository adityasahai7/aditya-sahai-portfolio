"use client";

import { useEffect, useState } from "react";

function getIndiaTime() {
  return new Date().toLocaleTimeString("en-IN", {
    timeZone:    "Asia/Kolkata",
    hour:        "2-digit",
    minute:      "2-digit",
    hour12:      true,
  });
}

const STATIC_ITEMS = [
  "AGENCY OUTPUT. STARTUP BUDGET.",
  "AI OPERATOR · INDIA",
  "BRAND SYSTEMS THAT SCALE",
  "TAKING NEW PROJECTS",
];

export default function LiveTicker() {
  const [time, setTime] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setTime(getIndiaTime());
    const id = setInterval(() => setTime(getIndiaTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  const items = [...STATIC_ITEMS, `${time ?? "--:-- --"} IST`];
  const text  = items.map((t) => `● ${t}`).join("    •    ") + "    •    ";
  // Duplicate for seamless loop
  const content = text.repeat(3);

  return (
    <div
      className="border-t border-b border-ink/10 overflow-hidden select-none"
      style={{ background: "rgba(255,255,255,0.035)", backdropFilter: "blur(18px)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Live status ticker"
    >
      <div
        className="flex whitespace-nowrap py-2.5"
        style={{
          animation: `ticker 22s linear infinite`,
          animationPlayState: hovered ? "paused" : "running",
        }}
      >
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-mono text-[13px] text-ink/58 tracking-wide shrink-0"
          >
            {content}
          </span>
        ))}
      </div>
    </div>
  );
}
