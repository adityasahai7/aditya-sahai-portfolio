import type { NextRequest } from "next/server";
import { updateRecords } from "@/lib/server/storage";
import { cleanText } from "@/lib/server/security";

async function unsubscribe(token: string) {
  if (!/^[0-9a-f-]{20,64}$/i.test(token)) return { ok: false };
  const r = await updateRecords("newsletter_subscribers", `unsubscribe_token=eq.${encodeURIComponent(token)}`, { status: "unsubscribed" });
  return { ok: r.ok && r.count > 0 };
}

/** One-click unsubscribe (RFC 8058): mail clients POST here. */
export async function POST(request: NextRequest) {
  const token = cleanText(request.nextUrl.searchParams.get("token"), 80);
  const r = await unsubscribe(token);
  return Response.json({ ok: r.ok }, { status: r.ok ? 200 : 400 });
}

/** A plain GET (link scanners, previews) never unsubscribes. It sends people to the confirm page. */
export async function GET(request: NextRequest) {
  const token = cleanText(request.nextUrl.searchParams.get("token"), 80);
  return Response.redirect(new URL(`/newsletter/unsubscribe?token=${encodeURIComponent(token)}`, request.url), 303);
}
