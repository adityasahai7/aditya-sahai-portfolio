import type { NextRequest } from "next/server";
import { insertRecord, publicSelect } from "@/lib/server/storage";
import { cleanText, jsonError, rateLimit, requestContext } from "@/lib/server/security";

const TONES = new Set(["yellow", "red", "cyan", "mint", "fuchsia", "paper"]);
const BANNED = /(https?:\/\/|www\.|\.com\b|<|>)/i;

export async function GET() {
  const notes = await publicSelect<Record<string, unknown>>("wall_notes", "select=id,created_at,emoji,note,name,tone&order=created_at.desc&limit=80");
  return Response.json({ notes }, { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=300" } });
}

export async function POST(request: NextRequest) {
  const context = requestContext(request);
  if (!rateLimit(`wall:${context.ip}`, 3, 10 * 60_000).allowed) return jsonError("One sticker at a time! Try again in a few minutes.", 429, "rate_limited");
  const body = await request.json().catch(() => ({}));
  if (cleanText(body.website, 80)) return Response.json({ ok: true });
  const note = cleanText(body.note, 120);
  const emoji = cleanText(body.emoji, 16) || "⭐";
  const name = cleanText(body.name, 40) || null;
  const tone = TONES.has(body.tone) ? body.tone : "yellow";
  if (note.length < 2) return jsonError("Write a little something first.");
  if (BANNED.test(note) || (name && BANNED.test(name))) return jsonError("No links please. Just words. 🙂");
  const r = await insertRecord("wall_notes", { note, emoji, name, tone, status: "pending" });
  if (!r.ok) return jsonError("The wall is closed for a moment. Try later?", 503, "storage_unavailable");
  return Response.json({ ok: true, message: "Pinned! It shows up once Aditya approves it. 📌" });
}
