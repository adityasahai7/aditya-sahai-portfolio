import type { NextRequest } from "next/server";
import { addToResendAudience, sendWelcomeEmail } from "@/lib/server/email";
import { insertRecord } from "@/lib/server/storage";
import { cleanEmail, cleanText, isEmail, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.website, 80)) return Response.json({ message: "Welcome to Thinking Beyond Letter." });
    const context = requestContext(request);
    const limit = rateLimit(`newsletter:${context.ip}`, 8, 60_000);
    if (!limit.allowed) return jsonError("Too many attempts. Please wait a minute and try again.", 429, "rate_limited");
    const email = cleanEmail(body.email); const name = cleanText(body.name, 120); const sourcePage = cleanText(body.sourcePage, 160) || "website";
    if (!isEmail(email)) return jsonError("Please enter a valid email address.");
    const storage = await insertRecord("newsletter_subscribers", { name: name || null, email, source_page: sourcePage, unsubscribe_token: crypto.randomUUID() });
    if (storage.duplicate) return Response.json({ message: "You’re already on the list. Good signal.", code: "duplicate" });
    const audience = storage.ok ? { configured: false, ok: false, duplicate: false } : await addToResendAudience(email, name);
    if (audience.duplicate) return Response.json({ message: "You’re already on the list. Good signal.", code: "duplicate" });
    if (!storage.ok && !audience.ok) return jsonError("Newsletter signup is temporarily unavailable. Please try again later.", 503, "storage_unavailable");
    await sendWelcomeEmail(email, name);
    return Response.json({ message: "Welcome to Thinking Beyond Letter. Check your inbox for the first note soon." });
  } catch (error) {
    console.error("Newsletter signup failed", error);
    return jsonError("Something went wrong. Please try again.", 500, "server_error");
  }
}
