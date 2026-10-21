"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { contact, letter } from "@/lib/content";
import { Magnetic } from "@/components/motion/kit";

type State = "idle" | "loading" | "success" | "error";

export function track(eventName: string, metadata: Record<string, string> = {}) {
  void fetch("/api/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ eventName, page: window.location.pathname, metadata }), keepalive: true }).catch(() => undefined);
}

async function post(endpoint: string, data: Record<string, unknown>) {
  const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
  const json = (await res.json().catch(() => ({}))) as { message?: string; error?: string; code?: string };
  return { ok: res.ok, ...json };
}

/** Newsletter: the letter slides into an envelope, the flap shuts, a stamp thuds. */
export function NewsletterForm({ source = "website" }: { source?: string }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("loading");
    track("newsletter_submit", { sourcePage: source });
    const r = await post("/api/newsletter", { ...fd, sourcePage: source, sourceComponent: "envelope" });
    if (r.ok) { setState("success"); setMsg(r.code === "duplicate" ? "You're already on the list. Good taste. 😌" : letter.success); track(r.code === "duplicate" ? "newsletter_duplicate" : "newsletter_success", { sourcePage: source }); }
    else { setState("error"); setMsg(r.error ?? "Something broke. Try again?"); }
  }
  const done = state === "success";
  return (
    <div className={`envelope ${done ? "is-sent" : ""}`}>
      <div className="env-back" aria-hidden="true" />
      <motion.form className="env-letter" onSubmit={submit} animate={done ? { y: 150, scale: 0.86 } : { y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 90, damping: 15 }}>
        <p className="env-to">To: you 💌</p>
        <label className="field"><span>First name</span><input name="name" autoComplete="given-name" placeholder="Aditya" maxLength={80} /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
        <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
        <Magnetic><button className="btn btn-red btn-lg" type="submit" disabled={state === "loading" || done} data-cursor="SEND">{state === "loading" ? "Sealing… ✉️" : "Send me the letter 💌"}</button></Magnetic>
        {state === "error" && <p className="form-msg is-error" role="alert">{msg}</p>}
      </motion.form>
      <div className="env-front" aria-hidden="true" />
      <motion.div className="env-flap" aria-hidden="true" animate={{ rotateX: done ? 0 : 180 }} transition={{ duration: 0.6, delay: done ? 0.45 : 0, ease: "easeInOut" }} />
      <AnimatePresence>
        {done && (
          <motion.div className="env-stamp" initial={{ scale: 3, rotate: -40, opacity: 0 }} animate={{ scale: 1, rotate: -12, opacity: 1 }} transition={{ delay: 1, type: "spring", stiffness: 300, damping: 12 }} role="status">
            <b>SENT! 🎉</b><span>{msg}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Contact: fields draw underlines, sending launches a paper plane. */
export function ContactForm({ source = "contact" }: { source?: string }) {
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");
  const [topic, setTopic] = useState(contact.options[0]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget).entries());
    setState("loading");
    const r = await post("/api/contact", { ...fd, helpType: topic, sourcePage: source });
    if (r.ok) { setState("success"); setMsg("Note sent! I read every one. 🙌"); (e.target as HTMLFormElement).reset(); }
    else { setState("error"); setMsg(r.error ?? "Something broke. Email me directly?"); }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="chips" role="radiogroup" aria-label="What's this about?">
        {contact.options.map((o) => (
          <button key={o} type="button" role="radio" aria-checked={topic === o} className={`chip ${topic === o ? "is-on" : ""}`} onClick={() => setTopic(o)}>{o}</button>
        ))}
      </div>
      <div className="contact-grid">
        <label className="field"><span>Your name</span><input name="name" required minLength={2} autoComplete="name" placeholder="What should I call you?" /></label>
        <label className="field"><span>Email</span><input name="email" type="email" required autoComplete="email" placeholder="you@example.com" /></label>
      </div>
      <label className="field"><span>Your note</span><textarea name="message" required minLength={20} rows={5} placeholder="Tell me what's on your mind…" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="contact-send">
        <Magnetic><button className="btn btn-ink btn-lg" type="submit" disabled={state === "loading"} data-cursor="SEND">{state === "loading" ? "Folding the plane…" : "Send it ✈️"}</button></Magnetic>
        <AnimatePresence>
          {state === "success" && (
            <motion.span className="plane" initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }} animate={{ x: [0, 160, 520, 1200], y: [0, -60, -20, -420], rotate: [0, -12, 8, -30], opacity: [1, 1, 1, 0] }} transition={{ duration: 1.8, ease: "easeInOut" }} aria-hidden="true">✈️</motion.span>
          )}
        </AnimatePresence>
      </div>
      {msg && <p className={`form-msg ${state === "error" ? "is-error" : "is-ok"}`} role="status">{msg}</p>}
    </form>
  );
}
