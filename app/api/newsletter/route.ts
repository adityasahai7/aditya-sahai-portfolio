import type { NextRequest } from "next/server";
import { sendWelcome } from "@/lib/server/newsletter";
import { insertRecord, queryRecords, updateRecords } from "@/lib/server/storage";
import { cleanEmail, cleanText, isEmail, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.website, 80)) return Response.json({ message: "You're in!", code: "success" });
    const context = requestContext(request);
    if (!rateLimit(`newsletter:${context.ip}`, 6, 60_000).allowed) return jsonError("Easy there! Wait a minute and try again.", 429, "rate_limited");
    const email = cleanEmail(body.email);
    const name = cleanText(body.name, 80);
    if (!isEmail(email)) return jsonError("That email doesn't look right. Try again?");
    const token = crypto.randomUUID();
    const storage = await insertRecord("newsletter_subscribers", {
      name: name || null,
      email,
      source_page: cleanText(body.sourcePage, 160) || "website",
      source_component: cleanText(body.sourceComponent, 120) || "newsletter-form",
      status: "active",
      subscriber_type: "newsletter",
      referral_source: cleanText(body.referralSource, 160) || null,
      confirmed_at: new Date().toISOString(),
      unsubscribe_token: token,
    });

    if (storage.duplicate) {
      // Someone who unsubscribed earlier can come back.
      const [existing] = await queryRecords<{ status: string; unsubscribe_token: string | null }>("newsletter_subscribers", `email=eq.${encodeURIComponent(email)}&select=status,unsubscribe_token`).catch(() => []);
      if (existing && existing.status !== "active") {
        await updateRecords("newsletter_subscribers", `email=eq.${encodeURIComponent(email)}`, { status: "active", ...(name ? { name } : {}) });
        await sendWelcome(email, name, existing.unsubscribe_token);
        return Response.json({ message: "Welcome back! 🎉", code: "success" });
      }
      return Response.json({ message: "You're already on the list.", code: "duplicate" });
    }
    if (!storage.ok) {
      console.error("Newsletter insert failed", { configured: storage.configured, error: storage.error });
      return jsonError("Something broke while joining. Try again in a bit?", 503, "storage_unavailable");
    }

    const welcome = await sendWelcome(email, name, token);
    if (!welcome.configured) console.info("Welcome email skipped: EMAIL_FROM not configured.");
    return Response.json({ message: "You're in! 🎉", code: "success", emailSent: welcome.ok });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return jsonError("Something went wrong. Please try again.", 500, "server_error");
  }
}
