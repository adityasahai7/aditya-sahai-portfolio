"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { trackSiteEvent } from "@/components/site/Experience";

type FormState = "idle" | "focused" | "loading" | "success" | "duplicate" | "validation" | "error";

type ApiResponse = {
  message?: string;
  error?: string;
  code?: string;
};

async function submitForm(endpoint: string, form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = await response.json() as ApiResponse;
  return { response, payload };
}

function SubmitButton({ loading, children, loadingLabel = "Sending…" }: { loading: boolean; children: string; loadingLabel?: string }) {
  return (
    <button className="ice-button ice-button-primary ice-submit" disabled={loading} type="submit">
      {loading ? <><LoaderCircle className="ice-spinner" size={17} />{loadingLabel}</> : <>{children}<ArrowRight size={17} /></>}
    </button>
  );
}

export function NewsletterForm({ source = "website", sourceComponent = "newsletter-form", compact = false }: { source?: string; sourceComponent?: string; compact?: boolean }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setMessage("");
    trackSiteEvent("newsletter_submit", { sourcePage: source, sourceComponent });
    try {
      const { response, payload } = await submitForm("/api/newsletter", form);
      if (response.ok) {
        const duplicate = payload.code === "duplicate";
        setState(duplicate ? "duplicate" : "success");
        setMessage(payload.message || (duplicate ? "You’re already on the list. Good taste." : "You’re in. Welcome to Thinking Beyond Letter."));
        trackSiteEvent(duplicate ? "newsletter_duplicate" : "newsletter_success", { sourcePage: source, sourceComponent });
        if (!duplicate) form.reset();
        return;
      }
      setState(payload.code === "validation_error" ? "validation" : "error");
      setMessage(payload.error || "Something broke while joining. Try again or send me a note.");
    } catch {
      setState("error");
      setMessage("Something broke while joining. Try again or send me a note.");
    }
  }

  const buttonLabel = state === "success" ? "You’re in" : state === "duplicate" ? "Already joined" : "Join the Letter";

  return (
    <form className={`ice-form ice-newsletter-form is-${state} ${compact ? "is-compact" : ""}`} onSubmit={handleSubmit} onFocusCapture={() => state === "idle" && setState("focused")} noValidate>
      <input type="hidden" name="sourcePage" value={source} />
      <input type="hidden" name="sourceComponent" value={sourceComponent} />
      <label className="ice-honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {!compact ? <label><span>Name <em>optional</em></span><input name="name" autoComplete="name" placeholder="Your name" /></label> : null}
      <label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="you@example.com" required aria-describedby="newsletter-status" /></label>
      <SubmitButton loading={state === "loading"} loadingLabel="Joining…">{buttonLabel}</SubmitButton>
      {message ? <p className={`ice-form-message is-${state}`} id="newsletter-status" role="status">{message}</p> : null}
      <small>No spam. No generic AI news. Only sharp operator thinking.</small>
    </form>
  );
}

export function ContactForm({ source = "contact" }: { source?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [helpType, setHelpType] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const { response, payload } = await submitForm("/api/contact", event.currentTarget);
      if (response.ok) {
        setState("success");
        setMessage(payload.message || "Got it. Your note has been sent. I’ll read it and reply if it feels aligned.");
        event.currentTarget.reset();
        setHelpType("");
        return;
      }
      setState("error");
      setMessage(payload.error || "Something went wrong. Please try again or email me directly.");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again or email me directly.");
    }
  }

  return (
    <form className="ice-form ice-contact-form" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="sourcePage" value={source} />
      <label className="ice-honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <div className="ice-form-row">
        <label><span>Name</span><input name="name" autoComplete="name" required placeholder="Your name" /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      </div>
      <label><span>Company / project name <em>optional</em></span><input name="company" autoComplete="organization" placeholder="What are you building?" /></label>
      <label><span>What are you building?</span><input name="projectDescription" required placeholder="A short description is enough" /></label>
      <div className="ice-form-row">
        <label><span>What do you need help with?</span><select name="helpType" required defaultValue="" onChange={(event) => setHelpType(event.target.value)}><option value="" disabled>Select one</option><option>Brand positioning</option><option>Website / landing page</option><option>Content system</option><option>AI workflow</option><option>Sales page / offer story</option><option>FRROST Media</option><option>Beyond Default</option><option>Thinking Beyond Club</option><option>Collaboration</option><option>Something else</option></select>{helpType === "FRROST Media" ? <small className="ice-field-help">Tell me what you want FRROST to build or improve.</small> : null}</label>
        <label><span>Budget range <em>optional</em></span><select name="budgetRange" defaultValue=""><option value="">Select one</option><option>Not sure yet</option><option>Under ₹25k</option><option>₹25k–₹75k</option><option>₹75k–₹2L</option><option>₹2L+</option></select></label>
      </div>
      <label><span>Timeline <em>optional</em></span><select name="timeline" defaultValue=""><option value="">Select one</option><option>This week</option><option>This month</option><option>1–3 months</option><option>Just exploring</option></select></label>
      <label><span>Message</span><textarea name="message" minLength={20} required placeholder="What feels unclear, and where would sharper thinking help?" rows={6} aria-describedby="contact-status" /></label>
      <SubmitButton loading={state === "loading"}>Send the Note</SubmitButton>
      {message ? <p className={`ice-form-message is-${state}`} id="contact-status" role="status">{message}</p> : null}
    </form>
  );
}

export function WaitlistForm({ type, source }: { type: "beyond-default" | "thinking-beyond-club"; source: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setMessage("");
    try {
      const { response, payload } = await submitForm("/api/waitlist", event.currentTarget);
      if (response.ok) {
        setState(payload.code === "duplicate" ? "duplicate" : "success");
        setMessage(payload.message || "You’re on the list. I’ll share the next meaningful update.");
        if (payload.code !== "duplicate") event.currentTarget.reset();
        return;
      }
      setState("error");
      setMessage(payload.error || "Something went wrong. Please try again.");
    } catch {
      setState("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form className="ice-form ice-waitlist-form" onSubmit={handleSubmit}>
      <input type="hidden" name="waitlistType" value={type} />
      <input type="hidden" name="sourcePage" value={source} />
      <label className="ice-honeypot" aria-hidden="true">Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
      <label><span>Name <em>optional</em></span><input name="name" autoComplete="name" placeholder="Your name" /></label>
      <label><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
      <label><span>Why do you want to join? <em>optional</em></span><textarea name="reason" rows={4} placeholder="A line or two is enough" /></label>
      <SubmitButton loading={state === "loading"}>Join the Waitlist</SubmitButton>
      {message ? <p className={`ice-form-message is-${state}`} role="status">{message}</p> : null}
    </form>
  );
}
