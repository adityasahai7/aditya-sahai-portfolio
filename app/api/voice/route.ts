import type { NextRequest } from "next/server";
import { insertRecord } from "@/lib/server/storage";
import { cleanText, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  const context = requestContext(request);
  if (!rateLimit(`voice:${context.ip}`, 3, 10 * 60_000).allowed) return jsonError("Easy! Try again in a few minutes.", 429, "rate_limited");
  const body = await request.json().catch(() => ({}));
  const audio = typeof body.audio === "string" ? body.audio : "";
  const mime = cleanText(body.mime, 60);
  const duration = Math.min(15, Math.max(0, Number(body.duration) || 0));
  if (!/^audio\/[a-z0-9.+-]+(;.*)?$/i.test(mime)) return jsonError("Unsupported audio.");
  if (audio.length < 100 || audio.length > 900_000 || !/^[A-Za-z0-9+/=]+$/.test(audio)) return jsonError("That recording is too long or empty.");
  const r = await insertRecord("voice_notes", { name: cleanText(body.name, 40) || null, mime, audio_base64: audio, duration_seconds: duration, status: "new" });
  if (!r.ok) return jsonError("Couldn't save your hello right now. Try later?", 503, "storage_unavailable");
  return Response.json({ ok: true, message: "Sent! Aditya will hear it soon. 🎧" });
}
