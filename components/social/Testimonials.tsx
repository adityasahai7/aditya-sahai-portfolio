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
        <span className="tm-empty-emoji" aria-hidden="true">⭐</span>
        <h2>Reviews coming soon.</h2>
        <p>Worked with me? Be the first to leave a review below.</p>
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
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: fd.name, email: fd.email, company: fd.role, message, helpType: "⭐ Testimonial", sourcePage: "testimonials", website: fd.website }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error ?? "Something broke.");
      setState("done"); setMsg("Thank you! Your review is with me. ⭐"); form.reset();
    } catch (err) { setState("error"); setMsg(err instanceof Error ? err.message : "Something broke. Email me instead?"); }
  }
  return (
    <form className="contact-form tm-form" onSubmit={submit}>
      <label className="field"><span>Your review</span><textarea name="quote" required minLength={20} maxLength={600} rows={5} placeholder="How was it working with me?" /></label>
      <div className="contact-grid">
        <label className="field"><span>Your name</span><input name="name" required minLength={2} autoComplete="name" /></label>
        <label className="field"><span>Email (stays private)</span><input name="email" type="email" required autoComplete="email" /></label>
      </div>
      <div className="contact-grid">
        <label className="field"><span>Role / company (optional)</span><input name="role" placeholder="Founder, Glow Skin" /></label>
        <label className="field"><span>Your link (optional)</span><input name="link" type="url" placeholder="https://" /></label>
      </div>
      <label className="tm-consent"><input type="checkbox" name="consent" defaultChecked /> OK to show this on the site with my name.</label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <button className="btn btn-red btn-lg" type="submit" disabled={state === "loading"}>{state === "loading" ? "Sending…" : "Send review ⭐"}</button>
      {msg && <p className={`form-msg ${state === "error" ? "is-error" : "is-ok"}`} role="status">{msg}</p>}
    </form>
  );
}

/** Red rubber-stamp mark on the hero. Click it to read the testimonials. */
export function TestimonialStamp({ variant = "photo" }: { variant?: "photo" | "inline" }) {
  return (
    <Link href="/testimonials" className={`ink-stamp ink-stamp--${variant}`} aria-label="Testimonials: reviews from people">
      <motion.svg viewBox="0 0 160 160" initial={{ scale: 2.2, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: -14 }} transition={{ delay: 1.7, duration: 0.35, ease: [0.3, 1.4, 0.5, 1] }}>
        <defs>
          <path id="ink-ring" d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
          <filter id="ink-worn" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.85" result="holes" />
            <feComposite in="SourceGraphic" in2="holes" operator="in" />
          </filter>
        </defs>
        <g filter="url(#ink-worn)" fill="none" stroke="currentColor">
          <circle cx="80" cy="80" r="74" strokeWidth="6" />
          <circle cx="80" cy="80" r="45" strokeWidth="3" />
          <text fill="currentColor" stroke="none" fontSize="12.5" fontWeight="900"><textPath href="#ink-ring" startOffset="0" textLength="352" lengthAdjust="spacingAndGlyphs">TESTIMONIALS ★ REVIEWS FROM PEOPLE ★</textPath></text>
          <rect x="31" y="65" width="98" height="30" fill="#fff7f2" stroke="currentColor" strokeWidth="3.5" />
          <text x="80" y="86.5" fill="currentColor" stroke="none" fontSize="17" fontWeight="900" textAnchor="middle" letterSpacing="0.6">REVIEWS</text>
        </g>
      </motion.svg>
    </Link>
  );
}
