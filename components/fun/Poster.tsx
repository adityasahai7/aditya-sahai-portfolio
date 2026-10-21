"use client";

import { useEffect, useRef, useState } from "react";
import { brutalBox, dotGrid, fonts, roundRect, shareCanvas, wrap } from "./canvasKit";
import { unlock } from "./achievements";

const THEMES = [
  { name: "Coral", bg: "#F18179", card: "#FFFAF2", accent: "#F5D46D" },
  { name: "Sunny", bg: "#F5D46D", card: "#FFFAF2", accent: "#9CE8F2" },
  { name: "Mint", bg: "#BDEFD5", card: "#FFFAF2", accent: "#E56AA6" },
  { name: "Night", bg: "#202727", card: "#F5D46D", accent: "#F18179" },
];

/** Type your name + one goal → a TBC-style poster to share on stories. */
export function PosterMaker() {
  const [name, setName] = useState("");
  const [fontsReady, setFontsReady] = useState(0);
  useEffect(() => { void document.fonts?.ready.then(() => setFontsReady(1)); }, []);
  const [goal, setGoal] = useState("Sending 10 cold emails");
  const [theme, setTheme] = useState(0);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    c.width = 1080; c.height = 1920;
    const ctx = c.getContext("2d")!;
    const f = fonts();
    const t = THEMES[theme];
    dotGrid(ctx, 1080, 1920, t.bg);
    const ink = theme === 3 ? "#F7F1E7" : "#202727";
    ctx.fillStyle = ink; ctx.font = `700 40px ${f.mono}`; ctx.fillText("THE MONDAY NOTE 📝", 90, 170);
    ctx.font = `400 150px ${f.display}`;
    ctx.fillText("THIS WEEK", 80, 340);
    ctx.fillText("I'M…", 80, 490);
    brutalBox(ctx, 90, 600, 900, 620, t.card, 44, 18);
    ctx.fillStyle = "#202727"; ctx.font = `400 92px ${f.display}`;
    wrap(ctx, (goal || "…").toUpperCase().slice(0, 70), 150, 740, 790, 100);
    ctx.save(); ctx.translate(600, 1300); ctx.rotate(-0.06);
    ctx.fillStyle = "#202727"; roundRect(ctx, 10, 10, 420, 120, 20); ctx.fill();
    ctx.fillStyle = t.accent; roundRect(ctx, 0, 0, 420, 120, 20); ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = "#202727"; ctx.stroke();
    ctx.fillStyle = "#202727"; ctx.font = `400 46px ${f.display}`; ctx.fillText(name ? `— ${name.toUpperCase().slice(0, 12)}` : "— ME", 30, 78);
    ctx.restore();
    ctx.fillStyle = ink; ctx.font = `400 64px ${f.display}`;
    ["SHOW UP.", "SAY IT.", "DO IT.", "SHOW IT."].forEach((w, i) => ctx.fillText(w, 90, 1560 + i * 76));
    ctx.font = `700 34px ${f.mono}`; ctx.fillText("made on adityasahai.com · Thinking Beyond Club", 90, 1870);
  }, [name, goal, theme, fontsReady]);

  return (
    <div className="poster-maker">
      <div className="poster-controls">
        <label className="field"><span>Your name</span><input value={name} maxLength={12} onChange={(e) => setName(e.target.value)} placeholder="Aditya" /></label>
        <label className="field"><span>This week I&apos;m…</span><input value={goal} maxLength={70} onChange={(e) => setGoal(e.target.value)} placeholder="Sending 10 cold emails" /></label>
        <div className="chips">{THEMES.map((t, i) => <button key={t.name} type="button" className={`chip ${theme === i ? "is-on" : ""}`} onClick={() => setTheme(i)}>{t.name}</button>)}</div>
        <button type="button" className="btn btn-ink btn-lg" onClick={() => { if (ref.current) { void shareCanvas(ref.current, "my-monday-note.png", "My Monday Note 📝 adityasahai.com"); unlock("poster"); } }}>📲 Share / download</button>
      </div>
      <canvas ref={ref} className="poster-canvas" aria-label="Your poster preview" />
    </div>
  );
}
