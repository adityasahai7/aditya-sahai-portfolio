import type { NextRequest } from "next/server";
import { publicConfig } from "@/lib/server/storage";

/** Public realtime settings (the publishable key is public by design) + the visitor's rough city. */
export async function GET(request: NextRequest) {
  const config = publicConfig();
  const city = decodeURIComponent(request.headers.get("x-vercel-ip-city") || "").slice(0, 40) || null;
  return Response.json({ config, city }, { headers: { "Cache-Control": "no-store" } });
}
