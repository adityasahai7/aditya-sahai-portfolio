import type { NextRequest } from "next/server";
import { publicSelect, rpc } from "@/lib/server/storage";
import { rateLimit, requestContext } from "@/lib/server/security";

export async function GET() {
  const [row] = await publicSelect<{ count: number }>("chai_counter", "select=count&id=eq.1");
  return Response.json({ count: row?.count ?? null }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const context = requestContext(request);
  if (!rateLimit(`chai:${context.ip}`, 20, 60_000).allowed) return Response.json({ count: null, limited: true }, { status: 429 });
  const count = await rpc<number>("increment_chai");
  return Response.json({ count });
}
