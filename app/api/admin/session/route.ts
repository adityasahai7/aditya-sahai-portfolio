import type { NextRequest } from "next/server";
import { ADMIN_COOKIE, expectedAdminToken, validPassword } from "@/lib/server/admin";
import { cleanText, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  const context = requestContext(request);
  const limit = rateLimit(`admin:${context.ip}`, 5, 15 * 60_000);
  if (!limit.allowed) return jsonError("Too many attempts. Try again later.", 429, "rate_limited");
  const body = await request.json();
  if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return jsonError("Admin access has not been configured.", 503, "not_configured");
  if (!validPassword(cleanText(body.password, 300))) return jsonError("Invalid password.", 401, "unauthorized");
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", `${ADMIN_COOKIE}=${expectedAdminToken()}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=43200`);
  return response;
}

export async function DELETE() {
  const response = Response.json({ ok: true });
  response.headers.append("Set-Cookie", `${ADMIN_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
  return response;
}
