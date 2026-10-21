import type { NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin";
import { letterEmail, renderMarkdown, sendIssue, sendTest, type Recipient } from "@/lib/server/newsletter";
import { hasPrivilegedStorage, insertReturning, queryRecords, updateRecords } from "@/lib/server/storage";
import { cleanText, jsonError } from "@/lib/server/security";

export const maxDuration = 300;

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "issue";
}

async function nextNumber() {
  const rows = await queryRecords<{ number: number }>("newsletter_issues", "select=number&order=number.desc&limit=1").catch(() => []);
  return (rows[0]?.number ?? 0) + 1;
}

/**
 * Admin-only. Body: { action: "preview" | "test" | "send", subject, preview, markdown, testTo? }
 * "send" emails every active subscriber, then publishes the issue to the public archive.
 */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return jsonError("Not signed in.", 401, "unauthorized");
  const body = await request.json().catch(() => ({}));
  const action = cleanText(body.action, 20);
  const subject = cleanText(body.subject, 160);
  const preview = cleanText(body.preview, 200);
  const markdown = cleanText(body.markdown, 60_000);
  if (!subject || markdown.length < 20) return jsonError("Add a subject and at least a few lines.");
  const number = await nextNumber();
  const html = renderMarkdown(markdown);

  if (action === "preview") {
    return Response.json({ html: letterEmail({ kicker: `THINKING BEYOND LETTER · NO. ${number}`, title: subject, bodyHtml: html.replace(/\{\{\s*name\s*\}\}/g, "friend"), preview, unsubscribe: "#" }), number });
  }

  if (action === "test") {
    const to = cleanText(body.testTo, 320) || process.env.CONTACT_TO_EMAIL || "adityasahai037@gmail.com";
    const r = await sendTest(to, { number, subject, preview, html });
    return r.ok ? Response.json({ message: `Test sent to ${to} ✅` }) : jsonError(`Test failed: ${r.error}`, 502, "send_failed");
  }

  if (action === "send") {
    if (!hasPrivilegedStorage()) return jsonError("Add SUPABASE_SECRET_KEY on Vercel first, so the site can read your subscriber list.", 503, "not_configured");
    if (!process.env.EMAIL_FROM) return jsonError("Add EMAIL_FROM (on your verified Resend domain) on Vercel first.", 503, "not_configured");
    if (body.confirm !== "SEND") return jsonError("Type SEND to confirm.");
    const recipients = await queryRecords<Recipient>("newsletter_subscribers", "status=eq.active&select=email,name,unsubscribe_token&limit=10000");
    const valid = recipients.filter((r) => r.unsubscribe_token);
    if (!valid.length) return jsonError("No active subscribers yet.");
    const slug = `${number}-${slugify(subject)}`;
    const issue = await insertReturning<{ id: string }>("newsletter_issues", { slug, number, subject, preview, markdown, html, status: "draft" });
    const result = await sendIssue({ number, subject, preview, html }, valid);
    if (issue) await updateRecords("newsletter_issues", `id=eq.${issue.id}`, { status: result.sent ? "sent" : "draft", sent_at: new Date().toISOString(), recipients: result.sent, failures: result.failed });
    if (!result.sent) return jsonError(`Nothing was sent: ${result.error}`, 502, "send_failed");
    return Response.json({ message: `Issue #${number} sent to ${result.sent} people 🎉${result.failed ? ` (${result.failed} failed: ${result.error})` : ""}`, slug });
  }

  return jsonError("Unknown action.");
}
