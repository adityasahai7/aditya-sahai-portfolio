import type { NextRequest } from "next/server";
import { insertRecord } from "@/lib/server/storage";
import { cleanText, jsonError, rateLimit, requestContext } from "@/lib/server/security";

const allowedEvents = new Set([
  "frrost_visit_click",
  "frrost_learn_click",
  "newsletter_submit",
  "newsletter_success",
  "newsletter_duplicate",
  "loader_seen",
]);

export async function POST(request: NextRequest) {
  try {
    const context = requestContext(request);
    if (!rateLimit(`event:${context.ip}`, 50, 60_000).allowed) return new Response(null, { status: 204 });
    const body = await request.json();
    const eventName = cleanText(body.eventName, 80);
    if (!allowedEvents.has(eventName)) return jsonError("Unsupported event.");
    const page = cleanText(body.page, 160) || "/";
    const rawMetadata = body.metadata && typeof body.metadata === "object" ? body.metadata as Record<string, unknown> : {};
    const metadata = Object.fromEntries(Object.entries(rawMetadata).slice(0, 8).map(([key, value]) => [cleanText(key, 40), cleanText(value, 160)]).filter(([key]) => key));
    await insertRecord("analytics_events", { event_name: eventName, page, metadata });
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
