import type { Metadata } from "next";
import { AdminLogin, AdminLogout } from "@/components/site/AdminLogin";
import { isAdminAuthenticated } from "@/lib/server/admin";
import { hasDurableStorage, listRecords } from "@/lib/server/storage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Studio Admin", robots: { index: false, follow: false } };

type Contact = { id: string; created_at: string; name: string; email: string; company?: string; help_type?: string; budget_range?: string; timeline?: string; message: string; source_page?: string; status?: string };
type Subscriber = { id: string; created_at: string; name?: string; email: string; source_page?: string; status?: string };
type Waitlist = { id: string; created_at: string; name?: string; email: string; waitlist_type: string; reason?: string; source_page?: string; status?: string };

function Table({ title, columns, rows }: { title: string; columns: string[]; rows: Record<string, unknown>[] }) {
  return <section><h2>{title}</h2><div className="ice-admin-table-wrap">{rows.length ? <table className="ice-admin-table"><thead><tr>{columns.map((column)=><th key={column}>{column.replaceAll("_", " ")}</th>)}</tr></thead><tbody>{rows.map((row,index)=><tr key={String(row.id || index)}>{columns.map((column)=><td key={column}>{String(row[column] ?? "—")}</td>)}</tr>)}</tbody></table> : <p className="ice-admin-empty">No records yet.</p>}</div></section>;
}

export default async function StudioAdminPage() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) return <main className="ice-admin-shell"><div className="ice-container"><AdminLogin /></div></main>;
  const configured = hasDurableStorage();
  const [contacts, subscribers, waitlists] = configured ? await Promise.all([listRecords<Contact>("contacts"), listRecords<Subscriber>("newsletter_subscribers"), listRecords<Waitlist>("waitlist_entries")]) : [[], [], []];
  return <main className="ice-admin-shell"><div className="ice-container"><header className="ice-admin-header"><div><p className="ice-section-label">PRIVATE COMMAND ROOM</p><h1>Studio Admin</h1><p>{configured ? "Live submissions from the connected database." : "The dashboard is ready, but Supabase is not connected yet."}</p></div><AdminLogout /></header><div className="ice-admin-tables"><Table title="Contact submissions" columns={["created_at","name","email","company","help_type","budget_range","timeline","source_page","status"]} rows={contacts as unknown as Record<string, unknown>[]} /><Table title="Newsletter subscribers" columns={["created_at","name","email","source_page","status"]} rows={subscribers as unknown as Record<string, unknown>[]} /><Table title="Waitlist entries" columns={["created_at","name","email","waitlist_type","reason","source_page","status"]} rows={waitlists as unknown as Record<string, unknown>[]} /></div></div></main>;
}
