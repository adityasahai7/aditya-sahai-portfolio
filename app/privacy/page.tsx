import type { Metadata } from "next";
import { SiteShell } from "@/components/site/Chrome";
import { PageHero } from "@/components/site/UI";

export const metadata: Metadata = { title: "Privacy Policy", description: "How AdityaSahai.com handles contact, newsletter, and waitlist data.", alternates: { canonical: "/privacy" } };
const sections = [
  ["Information collected", "When you use a contact, newsletter, or waitlist form, the site collects only the information you submit. This may include your name, email address, company or project, project description, help type, budget range, timeline, message, waitlist reason, source page, user agent, and a one-way hash of your IP address for abuse prevention."],
  ["How information is used", "Your information is used to respond to enquiries, evaluate potential collaborations, operate the newsletter, manage launch waitlists, prevent abuse, and improve the clarity of these experiences. It is not sold or rented."],
  ["Storage and email providers", "Form data may be stored in Supabase when the database integration is configured. Resend is used for form notifications, welcome emails, and subscriber handling where configured. These providers process data only to provide those services."],
  ["Cookies and analytics", "This website does not currently use third-party behavioral analytics or advertising cookies. The protected admin area may use a secure, HTTP-only session cookie solely for authentication."],
  ["Retention", "Contact and waitlist information is retained only while it remains useful for the stated purpose or required for legitimate business records. You may request deletion at any time."],
  ["External links", "Links to WhatsApp, LinkedIn, Instagram, X, YouTube, and other websites are governed by those services’ own privacy policies once you leave this site."],
  ["Security", "The site uses HTTPS, server-side validation, honeypot fields, rate limiting, restricted database credentials, and protected admin access. No internet service can guarantee absolute security."],
  ["Your choices", "You may request access, correction, or deletion of your submitted information, or unsubscribe from the newsletter, by emailing adityasahai037@gmail.com."],
  ["Contact", "Questions about privacy can be sent to adityasahai037@gmail.com or via WhatsApp at +91 62071 26091."],
] as const;
export default function PrivacyPage(){return <SiteShell><main><PageHero eyebrow="LEGAL" title="Privacy Policy" copy="A plain-language explanation of what this site collects and why." /><section className="ice-page-section"><div className="ice-container ice-prose"><p><b>Last updated: 28 June 2026</b></p>{sections.map(([title,copy],index)=><section key={title}><h2>{index+1}. {title}</h2><p>{copy}</p></section>)}</div></section></main></SiteShell>}
