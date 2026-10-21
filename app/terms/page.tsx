import type { Metadata } from "next";
import { PageHero } from "@/components/pages/PageKit";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms for using AdityaSahai.com and beginning a direct collaboration with Aditya Sahai or FRROST Media.", alternates: { canonical: "/terms" } };
const sections = [
  ["Website information", "The content on this website is general information and public thinking. It is not a guarantee of business, marketing, legal, financial, or technical outcomes."],
  ["Early-stage collaborations", "Aditya Sahai and FRROST Media are early-stage. Any paid collaboration begins only after written agreement on scope, deliverables, timing, responsibilities, revisions, and payment terms."],
  ["No guaranteed results", "Branding, websites, content, marketing, and AI-assisted creative work depend on many factors outside one person’s control. No revenue, growth, ranking, or conversion result is guaranteed."],
  ["Intellectual property", "Website copy, visual systems, articles, and original materials remain protected by applicable intellectual-property law. Project ownership and portfolio permissions are agreed separately for each engagement."],
  ["Third-party tools", "Projects may use third-party software, fonts, media, AI tools, hosting, or licensed assets. Their own terms and availability continue to apply."],
  ["Acceptable use", "Do not attempt to abuse forms, bypass protected areas, scrape private data, disrupt the site, or use site content in a misleading way."],
  ["Limitation", "To the extent permitted by law, Aditya Sahai is not responsible for indirect losses arising from use of this public website. Any project-specific liability is governed by the written project agreement."],
  ["Changes", "These terms may change as the website, newsletter, FRROST Media, and collaboration model develop. The current version will remain available here."],
  ["Contact", "Questions can be sent to adityasahai037@gmail.com or via WhatsApp at +91 62071 26091."],
] as const;
export default function TermsPage() {
  return (
    <>
      <PageHero label="LEGAL 📜" lines={["TERMS."]} lead="The plain-language version. No tricks." tone="paper" />
      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap"><div className="prose">
          <p><b>Last updated: 21 October 2026</b></p>
          {sections.map(([heading, copy], index) => <section key={heading}><h2>{index + 1}. {heading}</h2><p>{copy}</p></section>)}
        </div></div>
      </section>
    </>
  );
}
