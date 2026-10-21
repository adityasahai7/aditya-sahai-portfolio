import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = { title: "Privacy Policy", description: "How AdityaSahai.com handles contact, newsletter, and waitlist data.", alternates: { canonical: "/privacy" } };
const sections = [
  ["Information collected", "When you use a contact, newsletter, or waitlist form, the site collects only the information you submit. This may include your name, email address, company or project, project description, help type, budget range, timeline, message, waitlist reason, source page, source component, referral source, user agent, and a one-way hash of your IP address for abuse prevention."],
  ["How information is used", "Your information is used to respond to enquiries, evaluate potential collaborations, operate the newsletter, manage launch waitlists, prevent abuse, and improve the clarity of these experiences. It is not sold or rented."],
  ["Storage and email providers", "Contact, newsletter subscriber, waitlist, and limited interaction-event data is stored in Supabase. Resend is used to send form notifications, the welcome email and the Thinking Beyond Letter itself. These providers process data only to provide those services."],
  ["Cookies and analytics", "This website records a small set of first-party interaction events, such as newsletter submissions, FRROST link clicks, and whether the first-load experience was shown. It does not use third-party advertising cookies or cross-site behavioral tracking. The protected admin area may use a secure, HTTP-only session cookie solely for authentication."],
  ["Retention", "Contact, subscriber, waitlist, and limited event information is retained only while it remains useful for the stated purpose or required for legitimate business records. You may request deletion at any time."],
  ["External links", "Links to FRROST Media, WhatsApp, LinkedIn, Instagram, X, YouTube, and other websites are governed by those services’ own privacy policies once you leave this site."],
  ["Security", "The site uses HTTPS, server-side validation, honeypot fields, rate limiting, restricted database credentials, and protected admin access. No internet service can guarantee absolute security."],
  ["Your choices", "You may request access, correction, or deletion of your submitted information, by emailing adityasahai037@gmail.com. Every newsletter email has a one-click unsubscribe link."],
  ["Contact", "Questions about privacy can be sent to adityasahai037@gmail.com or via WhatsApp at +91 62071 26091."],
] as const;
export default function PrivacyPage() {
  return (
    <>
      <PageHero label="LEGAL 🔐" lines={["PRIVACY."]} lead="The plain-language version. No tricks." tone="paper" />
      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap"><div className="prose">
          <p><b>Last updated: 21 October 2026</b></p>
          {sections.map(([heading, copy], index) => <section key={heading}><h2>{index + 1}. {heading}</h2><p>{copy}</p></section>)}
        </div></div>
      </section>
    </>
  );
}
