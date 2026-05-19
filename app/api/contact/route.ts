import { Resend } from "resend";
import { NextResponse } from "next/server";

/** Strip HTML tags and escape special chars to prevent XSS in email HTML */
function sanitize(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .slice(0, 2000); // hard cap
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const name        = sanitize(body.name);
    const email       = sanitize(body.email);
    const projectType = sanitize(body.projectType);
    const budget      = sanitize(body.budget);
    const message     = sanitize(body.message);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    await resend.emails.send({
      from:     "Portfolio <onboarding@resend.dev>",
      to:       "adityasahai037@gmail.com",
      reply_to: email,
      subject:  `New Inquiry: ${projectType} — ${name}`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#F4EFE6;color:#0F0E0C;padding:40px;border-radius:12px;">
          <h2 style="color:#FF4D2E;margin:0 0 24px;font-size:22px;font-weight:500;letter-spacing:-0.01em;">
            New Portfolio Inquiry
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);color:rgba(15,14,12,0.5);font-size:12px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;width:130px;vertical-align:top;">Name</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);font-size:15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);color:rgba(15,14,12,0.5);font-size:12px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;vertical-align:top;">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);font-size:15px;">${email}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);color:rgba(15,14,12,0.5);font-size:12px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;vertical-align:top;">Project</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);font-size:15px;">${projectType}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);color:rgba(15,14,12,0.5);font-size:12px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;vertical-align:top;">Budget</td>
              <td style="padding:12px 0;border-bottom:1px solid rgba(15,14,12,0.1);font-size:15px;">${budget}</td>
            </tr>
          </table>
          <div style="margin-top:24px;">
            <div style="color:rgba(15,14,12,0.5);font-size:11px;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:10px;">Message</div>
            <div style="background:#FBF7EF;padding:20px;border-radius:8px;border:1px solid rgba(15,14,12,0.08);font-size:15px;line-height:1.65;">${message}</div>
          </div>
          <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(15,14,12,0.1);color:rgba(15,14,12,0.35);font-size:11px;font-family:monospace;letter-spacing:0.08em;">
            SENT VIA ADITYA SAHAI PORTFOLIO
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
