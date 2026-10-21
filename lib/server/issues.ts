import { queryRecords } from "@/lib/server/storage";

export type Issue = { slug: string; number: number; subject: string; preview: string | null; html: string; sent_at: string };

/** Sent issues for the public archive. Empty (not an error) until the table and secret key exist. */
export async function listIssues(): Promise<Issue[]> {
  return queryRecords<Issue>("newsletter_issues", "status=eq.sent&select=slug,number,subject,preview,html,sent_at&order=number.desc&limit=200").catch(() => []);
}

export async function getIssue(slug: string): Promise<Issue | null> {
  if (!/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const rows = await queryRecords<Issue>("newsletter_issues", `status=eq.sent&slug=eq.${slug}&select=slug,number,subject,preview,html,sent_at&limit=1`).catch(() => []);
  return rows[0] ?? null;
}
