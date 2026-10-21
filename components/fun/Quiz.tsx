"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sides } from "@/lib/content";
import { brutalBox, dotGrid, fonts, shareCanvas, wrap } from "./canvasKit";
import { unlock } from "./achievements";
import { sfx } from "./sound";

// Each answer scores sides by index: 0 Storyteller, 1 Builder, 2 Explorer, 3 Explainer, 4 Documentarian, 5 Entertainer, 6 Conversationalist
const QUESTIONS: { q: string; a: [string, number[]][] }[] = [
  { q: "It's Sunday. Free day. You…", a: [["Build something random 🛠️", [1]], ["Go down a Wikipedia rabbit hole 🕳️", [2, 4]], ["Call a friend for 3 hours 📞", [6]], ["Make everyone laugh at brunch 😂", [5]]] },
  { q: "Your friends text you when they need…", a: [["Something explained simply 💡", [3]], ["A story to cheer them up 📖", [0]], ["Someone to fix it 🔧", [1]], ["The full research, with sources 🔍", [4]]] },
  { q: "Pick a superpower:", a: [["Make anyone cry with a story 🥲", [0]], ["Learn any skill in a day ⚡", [2, 1]], ["Make the room laugh, instantly 🎭", [5]], ["Get anyone to open up 🎙️", [6]]] },
  { q: "Your YouTube history is mostly…", a: [["Documentaries 🎥", [4]], ["Explainers 🧠", [3]], ["Podcasts 🎧", [6]], ["Builds and tutorials 💻", [1]]] },
  { q: "In a group project you're the one who…", a: [["Pitches the story 🎬", [0]], ["Makes the deck make sense 📊", [3]], ["Keeps everyone sane 😄", [5]], ["Finds a wild new angle 🧭", [2]]] },
  { q: "Finish the sentence: \"I'd love to…\"", a: [["…tell a story millions remember", [0]], ["…ship something people use", [1]], ["…see every corner of the world", [2]], ["…have a conversation that changes someone", [6]]] },
];
const COLORS = ["#F18179", "#F5D46D", "#9CE8F2", "#BDEFD5", "#E56AA6", "#38A997", "#FFFAF2"];

export function Quiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(7).fill(0));
  const [name, setName] = useState("");
  const [fontsReady, setFontsReady] = useState(0);
  useEffect(() => { void document.fonts?.ready.then(() => setFontsReady(1)); }, []);
  const canvas = useRef<HTMLCanvasElement>(null);
  const done = step >= QUESTIONS.length;
  const winner = scores.indexOf(Math.max(...scores));
  const side = sides.cards[winner];

  function answer(idx: number[]) {
    sfx.pop();
    setScores((s) => s.map((v, i) => v + (idx.includes(i) ? 1 : 0) + (idx[0] === i ? 0.5 : 0)));
    setStep((x) => x + 1);
  }

  useEffect(() => {
    if (!done || !canvas.current) return;
    unlock("quiz");
    const c = canvas.current;
    c.width = 1080; c.height = 1350;
    const ctx = c.getContext("2d")!;
    const f = fonts();
    dotGrid(ctx, 1080, 1350);
    ctx.fillStyle = "#202727"; ctx.font = `700 34px ${f.mono}`; ctx.fillText("WHICH SIDE OF ADITYA ARE YOU?", 90, 140);
    brutalBox(ctx, 90, 200, 900, 860, COLORS[winner], 40, 18);
    ctx.font = "260px serif"; ctx.fillText(side.emoji, 140, 470);
    ctx.fillStyle = "#202727"; ctx.font = `400 46px ${f.mono}`;
    ctx.fillText(name ? `${name.toUpperCase().slice(0, 18)} IS…` : "I'M…", 150, 580);
    ctx.font = `400 104px ${f.display}`;
    const end = wrap(ctx, side.name.toUpperCase(), 150, 690, 800, 104);
    ctx.font = `500 42px ${f.body}`;
    wrap(ctx, side.body, 150, end + 10, 790, 56);
    brutalBox(ctx, 90, 1120, 900, 130, "#202727", 30, 0);
    ctx.fillStyle = "#F5D46D"; ctx.font = `400 44px ${f.display}`; ctx.fillText("TAKE IT: ADITYASAHAI.COM/QUIZ", 130, 1202);
  }, [done, winner, side, name, fontsReady]);

  if (done) {
    return (
      <motion.div className="quiz-result" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 160, damping: 14 }}>
        <canvas ref={canvas} className="quiz-card" aria-label={`Result: ${side.name}`} />
        <div className="quiz-actions">
          <label className="field"><span>Your name on the card (optional)</span><input value={name} maxLength={18} onChange={(e) => setName(e.target.value)} placeholder="Your name" /></label>
          <button type="button" className="btn btn-red btn-lg" onClick={() => canvas.current && shareCanvas(canvas.current, "my-side-adityasahai.png", "I took the quiz on adityasahai.com 🧭")}>📲 Share / download</button>
          <button type="button" className="btn btn-paper btn-md" onClick={() => { setStep(0); setScores(Array(7).fill(0)); }}>🔁 Retake</button>
        </div>
      </motion.div>
    );
  }
  const q = QUESTIONS[step];
  return (
    <div className="quiz">
      <div className="quiz-progress"><motion.span animate={{ width: `${(step / QUESTIONS.length) * 100}%` }} /></div>
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ x: 120, rotate: 6, opacity: 0 }} animate={{ x: 0, rotate: 0, opacity: 1 }} exit={{ x: -120, rotate: -6, opacity: 0 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
          <p className="label">QUESTION {step + 1} / {QUESTIONS.length}</p>
          <h2 className="h-lg" style={{ margin: "0 0 26px" }}>{q.q}</h2>
          <div className="quiz-answers">
            {q.a.map(([label, idx], i) => (
              <motion.button key={label} type="button" className={`quiz-answer tone-${["red", "yellow", "cyan", "mint"][i]}`} onClick={() => answer(idx)} whileHover={{ scale: 1.03, rotate: i % 2 ? 1 : -1 }} whileTap={{ scale: 0.95 }}>{label}</motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
