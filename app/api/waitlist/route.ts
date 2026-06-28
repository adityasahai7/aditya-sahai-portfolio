import type { NextRequest } from "next/server";
import { sendWaitlistNotification } from "@/lib/server/email";
import { insertRecord } from "@/lib/server/storage";
import { cleanEmail, cleanText, isEmail, jsonError, rateLimit, requestContext } from "@/lib/server/security";

const allowedTypes = new Set(["beyond-default", "thinking-beyond-club"]);
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.website, 80)) return Response.json({ message: "You’re on the list." });
    const context = requestContext(request);
    const limit = rateLimit(`waitlist:${context.ip}`, 8, 60_000);
    if (!limit.allowed) return jsonError("Too many attempts. Please wait a minute and try again.", 429, "rate_limited");
    const input = { name: cleanText(body.name, 120), email: cleanEmail(body.email), waitlistType: cleanText(body.waitlistType, 80), reason: cleanText(body.reason, 1200), sourcePage: cleanText(body.sourcePage, 160) || "website" };
    if (!isEmail(input.email)) return jsonError("Please enter a valid email address.");
    if (!allowedTypes.has(input.waitlistType)) return jsonError("Invalid waitlist type.");
    const storage = await insertRecord("waitlist_entries", { name: input.name || null, email: input.email, waitlist_type: input.waitlistType, reason: input.reason || null, source_page: input.sourcePage });
    if (storage.duplicate) return Response.json({ message: "You’re already on this waitlist.", code: "duplicate" });
    const notification = await sendWaitlistNotification(input);
    if (!storage.ok && !notification.ok) return jsonError("Waitlist signup is temporarily unavailable. Please try again later.", 503, "storage_unavailable");
    return Response.json({ message: "You’re on the list. I’ll share the next meaningful update." });
  } catch (error) {
    console.error("Waitlist signup failed", error);
    return jsonError("Something went wrong. Please try again.", 500, "server_error");
  }
}
