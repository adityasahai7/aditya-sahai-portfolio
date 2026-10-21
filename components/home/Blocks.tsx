"use client";

import { contact, letter, socials, LINKS } from "@/lib/content";
import { ContactForm, NewsletterForm } from "@/components/forms/Forms";
import { Doodle, Label, MaskLines } from "@/components/motion/kit";

export function LetterSection({ source = "website", heading = true }: { source?: string; heading?: boolean }) {
  return (
    <section className="letter" data-room="red" id="letter">
      <div className="wrap letter-grid">
        <div>
          {heading && <Label>{letter.label}</Label>}
          <MaskLines lines={letter.title} className="h-xl" />
          <p className="lead">{letter.body}</p>
          <ul className="letter-promises">{letter.promises.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
        <NewsletterForm source={source} />
      </div>
    </section>
  );
}

export function SaySection({ source = "website" }: { source?: string }) {
  return (
    <section className="say" data-room="yellow" id="contact">
      <div className="wrap">
        <Label>{contact.label}</Label>
        <h2 className="say-title" aria-label={contact.title}>{Array.from(contact.title).map((c, i) => <span key={i} aria-hidden="true">{c}</span>)}</h2>
        <div className="say-grid">
          <div style={{ position: "relative" }}>
            <p className="lead">{contact.body}</p>
            <div className="say-direct">
              <a href={LINKS.email} data-cursor="EMAIL">✉️ Email <small>adityasahai037@gmail.com</small></a>
              <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" data-cursor="CHAT">💬 WhatsApp <small>Say hi ↗</small></a>
              {socials.slice(0, 2).map((s) => <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.emoji} {s.label} <small>{s.handle} ↗</small></a>)}
            </div>
            <Doodle kind="squiggle" color="#E56AA6" className="say-squiggle" />
          </div>
          <ContactForm source={source} />
        </div>
      </div>
    </section>
  );
}
