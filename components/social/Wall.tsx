"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";
import { sfx } from "@/components/fun/sound";

type Note = { id: string; emoji: string; note: string; name: string | null; tone: string; created_at: string };
const EMOJIS = ["⭐", "🔥", "💛", "🧠", "🎬", "🚀", "😂", "🫶", "✨", "👋", "🍕", "🤯"];
const TONES = ["yellow", "red", "cyan", "mint", "fuchsia", "paper"];

/** A shared corkboard. Visitors pin a sticker + one line; Aditya approves before it shows. */
export function Wall() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [emoji, setEmoji] = useState(EMOJIS[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => { void fetch("/api/wall").then((r) => r.json()).then((j) => setNotes(j.notes ?? [])).catch(() => undefined); }, []);
  async function pin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    setBusy(true);
    const r = await fetch("/api/wall", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...fd, emoji, tone }) });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    setMsg(r.ok ? j.message : `❌ ${j.error ?? "Couldn't pin it."}`);
    if (r.ok) { sfx.pop(); (e.target as HTMLFormElement).reset(); }
  }
  return (
    <div className="wall">
      <form className="wall-form" onSubmit={pin}>
        <div className="chips">{EMOJIS.map((x) => <button key={x} type="button" className={`chip ${emoji === x ? "is-on" : ""}`} onClick={() => setEmoji(x)} aria-label={`Sticker ${x}`}>{x}</button>)}</div>
        <div className="chips">{TONES.map((t) => <button key={t} type="button" className={`chip tone-${t} ${tone === t ? "is-on" : ""}`} onClick={() => setTone(t)} aria-label={`Colour ${t}`}>{tone === t ? "✓" : " "}</button>)}</div>
        <label className="field"><span>Your line (max 120)</span><input name="note" required minLength={2} maxLength={120} placeholder="Keep building, man! 🔥" /></label>
        <label className="field"><span>Name (optional)</span><input name="name" maxLength={40} placeholder="Riya from Pune" /></label>
        <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <button type="submit" className="btn btn-ink btn-lg" disabled={busy}>{busy ? "Pinning…" : "📌 Pin it to the wall"}</button>
        {msg && <p className="form-msg is-ok" role="status">{msg}</p>}
      </form>
      <div className="cork">
        <AnimatePresence>
          {notes.map((n, i) => (
            <motion.div key={n.id} className={`pin-note tone-${n.tone}`} drag dragMomentum={false} whileDrag={{ scale: 1.08, rotate: 0, zIndex: 20 }}
              initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: ((i * 37) % 14) - 7 }} transition={{ type: "spring", stiffness: 220, damping: 14, delay: Math.min(i * 0.04, 1) }} data-cursor="DRAG">
              <span className="pin-emoji">{n.emoji}</span>
              <p>{n.note}</p>
              {n.name && <small>— {n.name}</small>}
            </motion.div>
          ))}
        </AnimatePresence>
        {!notes.length && <p className="cork-empty">The wall is fresh. 🧱 Be the first sticker on it.</p>}
      </div>
    </div>
  );
}
