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
  return `<div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;background:#F7F1E7;color:#202727;padding:36px;border:2.5px solid #202727;border-radius:18px"><div style="font:600 11px monospace;letter-spacing:.12em;color:#176D70;margin-bottom:22px">👋 ADITYA SAHAI · NEW NOTE</div>${content}</div>`;
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
