import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LetterSection } from "@/components/home/Blocks";
import { PageHero } from "@/components/pages/PageKit";
import { getIssue } from "@/lib/server/issues";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issue = await getIssue((await params).slug);
  if (!issue) return {};
  return { title: `No. ${issue.number}: ${issue.subject}`, description: issue.preview ?? undefined, alternates: { canonical: `/newsletter/${issue.slug}` } };
}

export default async function IssuePage({ params }: Props) {
  const issue = await getIssue((await params).slug);
  if (!issue) notFound();
  const html = issue.html.replace(/\{\{\s*name\s*\}\}/g, "friend");
  return (
    <>
      <PageHero label={`THINKING BEYOND LETTER · NO. ${issue.number}`} lines={[issue.subject]} lead={issue.preview ?? undefined} tone="paper" size="lg" />
      <article className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap"><div className="prose" dangerouslySetInnerHTML={{ __html: html }} /></div>
      </article>
      <LetterSection source={`issue-${issue.slug}`} />
    </>
  );
}
