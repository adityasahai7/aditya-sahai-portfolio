import type { NextRequest } from "next/server";
import { sendContactEmails } from "@/lib/server/email";
import { insertRecord } from "@/lib/server/storage";
import { cleanEmail, cleanText, isEmail, jsonError, rateLimit, requestContext } from "@/lib/server/security";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (cleanText(body.website, 80)) return Response.json({ message: "Got it. Your note has been sent." });
    const context = requestContext(request);
    const limit = rateLimit(`contact:${context.ip}`, 5, 60_000);
    if (!limit.allowed) return Response.json({ error: "Too many attempts. Please wait a minute and try again.", code: "rate_limited" }, { status: 429, headers: { "Retry-After": String(limit.retryAfter) } });
    const input = {
      name: cleanText(body.name, 120), email: cleanEmail(body.email), company: cleanText(body.company, 160),
      projectDescription: cleanText(body.projectDescription, 700), helpType: cleanText(body.helpType, 120),
      budgetRange: cleanText(body.budgetRange, 80), timeline: cleanText(body.timeline, 80), message: cleanText(body.message, 5000),
      sourcePage: cleanText(body.sourcePage, 160) || "website",
    };
    if (input.name.length < 2) return jsonError("Please enter your name.");
    if (!isEmail(input.email)) return jsonError("Please enter a valid email address.");
    if (!input.projectDescription) return jsonError("Please tell me what you are building.");
    if (!input.helpType) return jsonError("Please select what you need help with.");
    if (input.message.length < 20) return jsonError("Please add a little more detail to your message.");
    const [storage, email] = await Promise.all([
      insertRecord("contacts", { name: input.name, email: input.email, company: input.company || null, project_description: input.projectDescription, help_type: input.helpType, budget_range: input.budgetRange || null, timeline: input.timeline || null, message: input.message, source_page: input.sourcePage, user_agent: context.userAgent, ip_hash: context.ipHash }),
      sendContactEmails(input),
    ]);
    if (!storage.ok && !email.ok) return jsonError("The note could not be delivered. Please email me directly at adityasahai037@gmail.com.", 503, "delivery_unavailable");
    return Response.json({ message: "Got it. Your note has been sent. I’ll read it and reply if it feels aligned." });
  } catch (error) {
    console.error("Contact submission failed", error);
    return jsonError("Something went wrong. Please try again or email me directly.", 500, "server_error");
  }
}
