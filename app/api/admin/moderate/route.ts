import type { NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin";
import { updateRecords } from "@/lib/server/storage";
import { jsonError } from "@/lib/server/security";

/** Admin: approve/reject wall notes, mark voice notes heard. */
export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) return jsonError("Not signed in.", 401, "unauthorized");
  const { kind, id, status } = await request.json().catch(() => ({}));
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/.test(id)) return jsonError("Bad id.");
  if (kind === "wall" && ["approved", "rejected", "pending"].includes(status)) {
    const r = await updateRecords("wall_notes", `id=eq.${id}`, { status });
    return r.ok ? Response.json({ ok: true }) : jsonError("Update failed (is SUPABASE_SECRET_KEY set?)", 503);
  }
  if (kind === "voice" && ["heard", "archived", "new"].includes(status)) {
    const r = await updateRecords("voice_notes", `id=eq.${id}`, { status });
    return r.ok ? Response.json({ ok: true }) : jsonError("Update failed (is SUPABASE_SECRET_KEY set?)", 503);
  }
  return jsonError("Unknown action.");
}
