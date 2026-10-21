import type { Metadata } from "next";
import Link from "next/link";
import { letter } from "@/lib/content";
import { LetterSection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";
import { Label, MaskLines, Reveal } from "@/components/motion/kit";
import { listIssues } from "@/lib/server/issues";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Thinking Beyond Letter",
  description: "The Thinking Beyond Letter by Aditya Sahai: one story, one idea and one build, every Sunday. Free, short, no spam.",
  alternates: { canonical: "/newsletter" },
};

export default async function NewsletterPage() {
  const issues = await listIssues();
  return (
    <>
      <PageHero label={letter.label} lines={["THE", "LETTER."]} lead={letter.body} emoji="💌" tone="red" accent={1} />
      <LetterSection source="newsletter" heading={false} />
      <section className="page-section" data-room="paper">
        <div className="wrap">
          <Label tone="teal">THE ARCHIVE 🗂️</Label>
          <MaskLines lines={["PAST", "LETTERS."]} className="h-xl" accent={1} />
          {issues.length ? (
            <div className="article-grid" style={{ marginTop: 40 }}>
              {issues.map((issue, i) => (
                <Reveal key={issue.slug} delay={i * 0.05}>
                  <Link href={`/newsletter/${issue.slug}`} className={`deal-card tone-${["yellow", "cyan", "mint", "fuchsia"][i % 4]}`} data-cursor="READ">
                    <span className="deal-cat">NO. {issue.number}</span>
                    <h3>{issue.subject}</h3>
                    <p>{issue.preview}</p>
                    <small>{new Date(issue.sent_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} →</small>
                  </Link>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal><p className="lead" style={{ marginTop: 30 }}>Issue #1 hasn&apos;t landed yet. 👀 Join now and it&apos;s in your inbox the moment it does.</p></Reveal>
          )}
        </div>
      </section>
    </>
  );
}
