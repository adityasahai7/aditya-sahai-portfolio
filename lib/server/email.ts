import { Resend } from "resend";
import { escapeHtml } from "@/lib/server/security";

let resendClient: Resend | null = null;

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

function emailShell(content: string) {
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;background:#F3FAFB;color:#0A0D11;padding:36px;border:1px solid #D4E5E8;border-radius:18px"><div style="font:600 11px monospace;letter-spacing:.12em;color:#167986;margin-bottom:22px">ADITYA SAHAI · WEBSITE SIGNAL</div>${content}</div>`;
}

export async function sendContactEmails(input: Record<string, string>) {
  const resend = getResend();
  if (!resend) return { configured: false, ok: false };
  const to = process.env.CONTACT_TO_EMAIL || "adityasahai037@gmail.com";
  const from = process.env.EMAIL_FROM || "Aditya Sahai <onboarding@resend.dev>";
  const rows = ["name", "email", "company", "projectDescription", "helpType", "budgetRange", "timeline", "sourcePage"].map((key) => `<tr><td style="padding:9px 12px 9px 0;color:#5D6B70;vertical-align:top">${escapeHtml(key)}</td><td style="padding:9px 0">${escapeHtml(input[key] || "—")}</td></tr>`).join("");
  const result = await resend.emails.send({
    from,
    to,
    reply_to: input.email,
    subject: `New website note from ${input.name}`,
    html: emailShell(`<h1 style="margin:0 0 18px;font-size:26px">A new note arrived.</h1><table style="border-collapse:collapse;width:100%">${rows}</table><div style="margin-top:22px;padding:18px;background:white;border:1px solid #D4E5E8;border-radius:12px;white-space:pre-wrap">${escapeHtml(input.message)}</div>`),
  });
  if (result.error) return { configured: true, ok: false, error: result.error.message };
  if (process.env.EMAIL_FROM) {
    await resend.emails.send({
      from,
      to: input.email,
      subject: "Got your note — Aditya",
      html: emailShell(`<p>Hey ${escapeHtml(input.name)},</p><p>Thanks for sending a note. I’ve received it and will read it properly. If it feels aligned, I’ll reply soon.</p><p>— Aditya</p>`),
    });
  }
  return { configured: true, ok: true };
}

export async function sendWelcomeEmail(email: string, name: string, sourcePage: string) {
  const resend = getResend();
  if (!resend || !process.env.EMAIL_FROM) return { configured: false, ok: false };
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Welcome to Thinking Beyond Letter",
    html: emailShell(`<p>Hey ${escapeHtml(name || "there")},</p><p>You’re in.</p><p>Thinking Beyond Letter is where I share one creative build, one sharp lesson, and three things worth your attention — across AI, branding, content, websites, business, and operator thinking.</p><p>No spam. No generic AI news. Just useful signal.</p><p>— Aditya</p><p style="margin-top:28px;color:#5D6B70;font-size:12px">You joined from ${escapeHtml(sourcePage)}. You can unsubscribe by replying to this email.</p>`),
  });
  return { configured: true, ok: !result.error };
}

export async function addToResendAudience(email: string, firstName: string) {
  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) return { configured: false, ok: false, duplicate: false };
  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, first_name: firstName || undefined, unsubscribed: false }),
  });
  const text = response.ok ? "" : await response.text();
  return { configured: true, ok: response.ok, duplicate: response.status === 409 || /already exists/i.test(text) };
}

export async function sendWaitlistNotification(input: { name: string; email: string; waitlistType: string; reason: string }) {
  const resend = getResend();
  if (!resend) return { configured: false, ok: false };
  const result = await resend.emails.send({
    from: process.env.EMAIL_FROM || "Aditya Sahai <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL || "adityasahai037@gmail.com",
    reply_to: input.email,
    subject: `New ${input.waitlistType} waitlist entry`,
    html: emailShell(`<h1 style="font-size:24px">New waitlist signal</h1><p><b>${escapeHtml(input.name || "Unnamed")}</b> · ${escapeHtml(input.email)}</p><p>${escapeHtml(input.reason || "No reason supplied.")}</p>`),
  });
  return { configured: true, ok: !result.error };
}
