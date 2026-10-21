"use client";

import { useState } from "react";

const STARTER = `Hey {{name}},

## 📖 The story
Write the story worth knowing this week.

## 💡 The idea
One idea worth stealing.

## 🛠️ The build
What I built, and what broke.

> One line you want them to remember.
`;

/** Write in Markdown → preview → send yourself a test → send to everyone. */
export function Composer({ active, ready }: { active: number; ready: { secret: boolean; from: boolean } }) {
  const [subject, setSubject] = useState("");
  const [preview, setPreview] = useState("");
  const [markdown, setMarkdown] = useState(STARTER);
  const [html, setHtml] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState("");
  const [confirm, setConfirm] = useState("");

  async function call(action: "preview" | "test" | "send") {
    setBusy(action); setMsg("");
    const r = await fetch("/api/admin/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, subject, preview, markdown, confirm }) });
    const j = await r.json().catch(() => ({}));
    setBusy("");
    if (!r.ok) { setMsg(`❌ ${j.error ?? "Failed"}`); return; }
    if (action === "preview") setHtml(j.html);
    else setMsg(`✅ ${j.message}`);
    if (action === "send") setConfirm("");
  }

  return (
    <div className="composer">
      <h2 className="h-md">✍️ Write a letter</h2>
      {(!ready.secret || !ready.from) && (
        <p className="warn">Sending is locked until Vercel has {[!ready.secret && "SUPABASE_SECRET_KEY", !ready.from && "EMAIL_FROM (on a domain verified in Resend)"].filter(Boolean).join(" and ")}. Preview works now.</p>
      )}
      <label className="field"><span>Subject</span><input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="The guy who sold ice to Hyderabad 🧊" /></label>
      <label className="field"><span>Inbox preview line</span><input value={preview} onChange={(e) => setPreview(e.target.value)} placeholder="One story, one idea, one build." /></label>
      <label className="field"><span>Body (Markdown · {"{{name}}"} = first name)</span><textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} /></label>
      <div className="composer-actions">
        <button type="button" className="btn btn-cyan btn-md" disabled={!!busy} onClick={() => call("preview")}>{busy === "preview" ? "Rendering…" : "👀 Preview"}</button>
        <button type="button" className="btn btn-yellow btn-md" disabled={!!busy} onClick={() => call("test")}>{busy === "test" ? "Sending…" : "🧪 Send me a test"}</button>
        <input aria-label="Type SEND to confirm" className="field" style={{ width: 150, padding: "10px 12px", border: "2.5px solid #202727", borderRadius: 12 }} value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Type SEND" />
        <button type="button" className="btn btn-red btn-md" disabled={!!busy || confirm !== "SEND" || !ready.secret || !ready.from} onClick={() => call("send")}>{busy === "send" ? "Sending…" : `🚀 Send to ${active} people`}</button>
      </div>
      {msg && <p className="form-msg" role="status">{msg}</p>}
      {html && <iframe title="Email preview" className="preview-frame" srcDoc={html} sandbox="" />}
    </div>
  );
}
