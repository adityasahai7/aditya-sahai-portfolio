import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "aditya_studio_admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function expectedAdminToken() {
  const password = process.env.ADMIN_PASSWORD;
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!password || !secret) return null;
  return createHash("sha256").update(`${secret}:${password}`).digest("hex");
}

export function validPassword(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  const a = digest(candidate); const b = digest(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  const expected = expectedAdminToken();
  if (!expected) return false;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value || "";
  const a = digest(token); const b = digest(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
