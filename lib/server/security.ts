import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

const buckets = new Map<string, { count: number; resetAt: number }>();

export function cleanText(value: unknown, max = 2000) {
  if (typeof value !== "string") return "";
  return value.replace(/\0/g, "").replace(/\r\n/g, "\n").trim().slice(0, max);
}

export function cleanEmail(value: unknown) {
  return cleanText(value, 320).toLowerCase();
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[character] || character));
}

export function requestContext(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const salt = process.env.IP_HASH_SALT || process.env.ADMIN_SESSION_SECRET || "adityasahai-site";
  return {
    ip: forwarded,
    ipHash: createHash("sha256").update(`${salt}:${forwarded}`).digest("hex"),
    userAgent: cleanText(request.headers.get("user-agent"), 500),
  };
}

export function rateLimit(key: string, limit = 8, windowMs = 60_000) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }
  current.count += 1;
  if (current.count > limit) return { allowed: false, retryAfter: Math.ceil((current.resetAt - now) / 1000) };
  return { allowed: true, retryAfter: 0 };
}

export function jsonError(error: string, status = 400, code = "validation_error") {
  return Response.json({ error, code }, { status });
}
