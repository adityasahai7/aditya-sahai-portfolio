"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";
import type { Testimonial } from "@/lib/testimonials";

const TONES = ["yellow", "cyan", "mint", "fuchsia", "red", "paper"] as const;

/** Approved testimonials as tilted note cards. */
export function TestimonialWall({ items }: { items: Testimonial[] }) {
  if (!items.length) {
    return (
      <div className="tm-empty">
        <span className="tm-empty-emoji" aria-hidden="true">💌</span>
        <h2>The first ones are being written.</h2>
        <p>I only put up real words from real people, after I&apos;ve checked them. If we&apos;ve worked together, built something, or a Beyond Default episode stayed with you, you could be first.</p>
      </div>
    );
  }
  return (
    <div className="tm-grid">
      {items.map((t, i) => (
        <motion.figure key={`${t.name}${i}`} className={`tm-card tone-${t.tone ?? TONES[i % TONES.length]}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.6, delay: (i % 3) * 0.08 }} style={{ rotate: [-1.5, 1, -0.5, 1.5][i % 4] }}>
          <span className="tm-quote-mark" aria-hidden="true">“</span>
          <blockquote>{t.quote}</blockquote>
          <figcaption><b>{t.link ? <a href={t.link} target="_blank" rel="noreferrer">{t.name} ↗</a> : t.name}</b>{t.role && <span>{t.role}</span>}</figcaption>
        </motion.figure>
      ))}
    </div>
  );
}

/** "Leave yours": goes to Aditya's inbox. Nothing is published until he approves it. */
export function TestimonialForm() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setState("loading");
    const message = `${fd.quote}\n\n— ${fd.name}${fd.role ? `, ${fd.role}` : ""}${fd.link ? ` (${fd.link})` : ""}\nOK to show on the site: ${fd.consent ? "yes" : "no"}`;
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fd.name, email: fd.email, company: fd.role, message, helpType: "💌 Testimonial", sourcePage: "testimonials", website: fd.website }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error ?? "Something broke.");
      setState("done"); setMsg("Thank you. That genuinely made my day. I'll read it and put it up soon. 💌"); form.reset();
    } catch (err) { setState("error"); setMsg(err instanceof Error ? err.message : "Something broke. Email me instead?"); }
  }
  return (
    <form className="contact-form tm-form" onSubmit={submit}>
      <label className="field"><span>What would you say about working with me, or my work?</span><textarea name="quote" required minLength={20} maxLength={600} rows={5} placeholder="Be honest. Short is great." /></label>
      <div className="contact-grid">
        <label className="field"><span>Your name</span><input name="name" required minLength={2} autoComplete="name" /></label>
        <label className="field"><span>Email (stays private)</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="contact-grid">
        <label className="field"><span>Role / company (optional)</span><input name="role" placeholder="Founder, Glow Skin" /></label>
        <label className="field"><span>Your link (optional)</span><input name="link" type="url" placeholder="https://" /></label>
      </div>
      <label className="tm-consent"><input type="checkbox" name="consent" defaultChecked /> You can show this on adityasahai.com with my name.</label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn btn-red btn-lg" type="submit" disabled={state === "loading"}>{state === "loading" ? "Sending…" : "Send my words 💌"}</button>
      {msg && <p className={`form-msg ${state === "error" ? "is-error" : "is-ok"}`} role="status">{msg}</p>}
    </form>
  );
}

/** The postage stamp on the home page. Click it to read the testimonials. */
export function TestimonialStamp() {
  return (
    <Link href="/testimonials" className="tm-stamp" aria-label="Read testimonials: kind words from people I've worked with">
      <span className="tm-stamp-inner">
        <span className="tm-stamp-k">KIND WORDS</span>
        <span className="tm-stamp-e" aria-hidden="true">💌</span>
        <span className="tm-stamp-t">What people say</span>
        <span className="tm-stamp-go">Read them →</span>
      </span>
    </Link>
  );
}
