import type { NextRequest } from "next/server";
import { addToResendAudience, sendWelcomeEmail } from "@/lib/server/email";
import { insertRecord } from "@/lib/server/storage";
import { cleanEmail, cleanText, isEmail, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.website, 80)) return Response.json({ message: "You’re in. Welcome to Thinking Beyond Letter." });
    const context = requestContext(request);
    const limit = rateLimit(`newsletter:${context.ip}`, 8, 60_000);
    if (!limit.allowed) return jsonError("Too many attempts. Please wait a minute and try again.", 429, "rate_limited");
    const email = cleanEmail(body.email);
    const name = cleanText(body.name, 120);
    const sourcePage = cleanText(body.sourcePage, 160) || "website";
    const sourceComponent = cleanText(body.sourceComponent, 120) || "newsletter-form";
    const referralSource = cleanText(body.referralSource, 160) || null;
    if (!isEmail(email)) return jsonError("Please enter a valid email address.");
    const storage = await insertRecord("newsletter_subscribers", {
      name: name || null,
      email,
      source_page: sourcePage,
      source_component: sourceComponent,
      status: "active",
      subscriber_type: "newsletter",
      interests: null,
      referral_source: referralSource,
      confirmed_at: null,
      unsubscribe_token: crypto.randomUUID(),
    });
    if (storage.duplicate) return Response.json({ message: "You’re already on the list. Good taste.", code: "duplicate" });
    if (!storage.ok) {
      console.error("Newsletter database insert failed", { configured: storage.configured });
      return jsonError("Something broke while joining. Try again or send me a note.", 503, "storage_unavailable");
    }

    const [welcomeEmail] = await Promise.all([
      sendWelcomeEmail(email, name, sourcePage),
      addToResendAudience(email, name),
    ]);
    if (!welcomeEmail.configured) console.info("Newsletter welcome email skipped: EMAIL_FROM or RESEND_API_KEY is not configured.");

    return Response.json({
      message: "You’re in. Welcome to Thinking Beyond Letter.",
      code: "success",
      emailSent: welcomeEmail.ok,
    });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return jsonError("Something went wrong. Please try again.", 500, "server_error");
  }
}
