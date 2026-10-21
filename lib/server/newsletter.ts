import { marked } from "marked";
import { escapeHtml } from "@/lib/server/security";

/**
 * Thinking Beyond Letter engine.
 * Needs: RESEND_API_KEY (send access), EMAIL_FROM on a domain verified in Resend
 * (e.g. "Aditya Sahai <letter@adityasahai.com>"), and SUPABASE_SECRET_KEY for
 * unsubscribe + sending to the list.
 */

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://adityasahai.com").replace(/\/$/, "");
}

export function letterReady() {
  return { resend: Boolean(process.env.RESEND_API_KEY), from: Boolean(process.env.EMAIL_FROM) };
}

/** Link in the email body: a confirm page (so link scanners can't unsubscribe people). */
export function unsubscribeUrl(token: string) {
  return `${siteUrl()}/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

/** List-Unsubscribe header target: mail clients POST here for one-click unsubscribe. */
export function oneClickUrl(token: string) {
  return `${siteUrl()}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`;
}

export function renderMarkdown(md: string) {
  return marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
}

/** Playful TBC-palette email shell. Table layout + inline styles for every mail client. */
export function letterEmail({ kicker, title, bodyHtml, unsubscribe, preview }: { kicker: string; title: string; bodyHtml: string; unsubscribe?: string; preview?: string }) {
  const site = siteUrl();
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${escapeHtml(title)}</title>
<style>
  .tb-body p{margin:0 0 16px;font-size:17px;line-height:1.65}
  .tb-body h2{font-family:'Arial Black',Impact,sans-serif;font-size:24px;line-height:1.15;margin:28px 0 12px;text-transform:uppercase}
  .tb-body h3{font-size:19px;margin:22px 0 10px}
  .tb-body a{color:#176D70;font-weight:700}
  .tb-body blockquote{margin:20px 0;padding:14px 18px;background:#F5D46D;border:2px solid #202727;border-radius:12px;font-weight:700}
  .tb-body ul,.tb-body ol{padding-left:22px;font-size:17px;line-height:1.65}
  .tb-body img{max-width:100%;border:2px solid #202727;border-radius:12px}
  .tb-body hr{border:0;border-top:2px dashed #202727;margin:28px 0}
</style></head>
<body style="margin:0;padding:0;background:#F7F1E7;">
${preview ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(preview)}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F7F1E7;padding:28px 12px;font-family:Helvetica,Arial,sans-serif;color:#202727">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px">
    <tr><td style="padding:0 0 14px">
      <span style="display:inline-block;background:#F18179;border:2px solid #202727;border-radius:999px;padding:6px 14px;font:700 12px monospace;letter-spacing:.08em">💌 ${escapeHtml(kicker)}</span>
    </td></tr>
    <tr><td style="background:#FFFAF2;border:2.5px solid #202727;border-radius:18px;box-shadow:6px 6px 0 #202727;padding:30px 28px">
      <h1 style="font-family:'Arial Black',Impact,sans-serif;font-size:32px;line-height:1.05;margin:0 0 20px;text-transform:uppercase">${escapeHtml(title)}</h1>
      <div class="tb-body">${bodyHtml}</div>
      <p style="margin:26px 0 0;font-size:17px">Think Beyond Default,<br><b>Aditya</b> 🧠</p>
    </td></tr>
    <tr><td style="padding:20px 6px;font-size:13px;line-height:1.6;color:#4a5252">
      <span style="display:inline-block;background:#9CE8F2;border:2px solid #202727;border-radius:8px;padding:2px 8px;font-weight:700;color:#202727">For Good, Towards Greatness ✨</span><br><br>
      You get this because you joined the Thinking Beyond Letter at <a href="${site}" style="color:#176D70">adityasahai.com</a>.
      ${unsubscribe ? `<br><a href="${unsubscribe}" style="color:#202727">Unsubscribe in one click</a>.` : ""}
    </td></tr>
  </table>
</td></tr></table></body></html>`;
}

type Mail = { from: string; to: string; subject: string; html: string; headers?: Record<string, string>; reply_to?: string };

async function resendPost(path: string, body: unknown) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

export async function sendWelcome(email: string, name: string, token: string | null) {
  const from = process.env.EMAIL_FROM;
  if (!process.env.RESEND_API_KEY || !from) return { configured: false, ok: false };
  const unsub = token ? unsubscribeUrl(token) : undefined;
  const html = letterEmail({
    kicker: "WELCOME TO THE LETTER",
    title: `You're in${name ? `, ${name}` : ""}! 🎉`,
    preview: "One story, one idea, one build. Every Sunday.",
    unsubscribe: unsub,
    bodyHtml: `<p>Thank you for letting me into your inbox. I'll treat it well.</p>
<p>Here's the deal. <b>One email, every Sunday:</b></p>
<ul><li>📖 <b>One story</b> worth knowing</li><li>💡 <b>One idea</b> worth stealing</li><li>🛠️ <b>One thing I'm building</b>, and what broke</li></ul>
<p>Short enough to read with your chai ☕. No spam, no fake urgency, no "10 AI tools you need".</p>
<blockquote>Hit reply and tell me one thing you're building right now. I read every reply.</blockquote>
<p>While you wait for Sunday, come say hi on <a href="https://youtube.com/@adityasahai37">YouTube</a> or <a href="https://instagram.com/adityasahai37">Instagram</a>.</p>`,
  });
  const r = await resendPost("/emails", { from, to: email, subject: "You're in 💌 Welcome to the Thinking Beyond Letter", html, headers: token ? { "List-Unsubscribe": `<${oneClickUrl(token)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" } : undefined } satisfies Mail);
  return { configured: true, ok: r.ok };
}

export type Recipient = { email: string; name?: string | null; unsubscribe_token: string };

/** Send an issue to recipients in batches of 100, each with a personal unsubscribe link. */
export async function sendIssue(issue: { number: number; subject: string; preview: string; html: string }, recipients: Recipient[]) {
  const from = process.env.EMAIL_FROM;
  if (!process.env.RESEND_API_KEY || !from) return { sent: 0, failed: recipients.length, error: "EMAIL_FROM or RESEND_API_KEY missing" };
  let sent = 0;
  let failed = 0;
  let lastError = "";
  for (let i = 0; i < recipients.length; i += 100) {
    const chunk = recipients.slice(i, i + 100);
    const mails: Mail[] = chunk.map((r) => {
      const unsub = unsubscribeUrl(r.unsubscribe_token);
      const personal = issue.html.replace(/\{\{\s*name\s*\}\}/g, escapeHtml(r.name || "friend"));
      return {
        from,
        to: r.email,
        subject: issue.subject,
        html: letterEmail({ kicker: `THINKING BEYOND LETTER · NO. ${issue.number}`, title: issue.subject, bodyHtml: personal, unsubscribe: unsub, preview: issue.preview }),
        headers: { "List-Unsubscribe": `<${oneClickUrl(r.unsubscribe_token)}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
      };
    });
    const r = await resendPost("/emails/batch", mails);
    if (r.ok) sent += chunk.length;
    else { failed += chunk.length; lastError = `${r.status} ${r.text.slice(0, 200)}`; }
    if (i + 100 < recipients.length) await new Promise((res) => setTimeout(res, 600));
  }
  return { sent, failed, error: lastError };
}

export async function sendTest(to: string, issue: { number: number; subject: string; preview: string; html: string }) {
  const from = process.env.EMAIL_FROM || "Aditya Sahai <onboarding@resend.dev>";
  if (!process.env.RESEND_API_KEY) return { ok: false, error: "RESEND_API_KEY missing" };
  const html = letterEmail({ kicker: `TEST · NO. ${issue.number}`, title: issue.subject, bodyHtml: issue.html.replace(/\{\{\s*name\s*\}\}/g, "Aditya"), preview: issue.preview, unsubscribe: `${siteUrl()}/newsletter` });
  const r = await resendPost("/emails", { from, to, subject: `[TEST] ${issue.subject}`, html } satisfies Mail);
  return { ok: r.ok, error: r.ok ? "" : `${r.status} ${r.text.slice(0, 200)}` };
}
