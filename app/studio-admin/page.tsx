import type { Metadata } from "next";
import { AdminLogin, AdminLogout } from "@/components/admin/AdminLogin";
import { Composer } from "@/components/admin/Composer";
import { isAdminAuthenticated } from "@/lib/server/admin";
import { hasPrivilegedStorage, listRecords, queryRecords } from "@/lib/server/storage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Studio Admin", robots: { index: false, follow: false } };

type Row = Record<string, unknown>;

function Table({ title, columns, rows }: { title: string; columns: string[]; rows: Row[] }) {
  return (
    <section>
      <h2 className="h-md" style={{ margin: "0 0 14px" }}>{title}</h2>
      <div className="admin-table-wrap">
        {rows.length ? (
          <table className="admin-table">
            <thead><tr>{columns.map((c) => <th key={c}>{c.replaceAll("_", " ")}</th>)}</tr></thead>
            <tbody>{rows.map((r, i) => <tr key={String(r.id ?? i)}>{columns.map((c) => <td key={c}>{String(r[c] ?? "—")}</td>)}</tr>)}</tbody>
          </table>
        ) : <p style={{ padding: 16, margin: 0 }}>Nothing here yet.</p>}
      </div>
    </section>
  );
}

export default async function StudioAdminPage() {
  if (!(await isAdminAuthenticated())) return <section className="admin"><div className="wrap"><AdminLogin /></div></section>;
  const privileged = hasPrivilegedStorage();
  const [contacts, subscribers, issues] = privileged
    ? await Promise.all([
        listRecords<Row>("contacts", 100).catch(() => []),
        listRecords<Row>("newsletter_subscribers", 500).catch(() => []),
        queryRecords<Row>("newsletter_issues", "select=number,subject,status,sent_at,recipients,failures&order=number.desc&limit=50").catch(() => []),
      ])
    : [[], [], []];
  const active = subscribers.filter((s) => s.status === "active").length;
  return (
    <section className="admin">
      <div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div><p className="label">🔒 PRIVATE COMMAND ROOM</p><h1 className="h-xl" style={{ margin: 0 }}>STUDIO ADMIN</h1></div>
          <AdminLogout />
        </div>
        {!privileged && <p className="warn" style={{ marginTop: 20 }}>The site can save signups but can&apos;t read them yet. Add <b>SUPABASE_SECRET_KEY</b> in Vercel (Supabase → Project Settings → API keys → secret) to see your list and send letters.</p>}
        <div className="admin-stats">
          <span>💌 {active} active subscribers</span>
          <span>👋 {subscribers.length - active} unsubscribed</span>
          <span>📨 {contacts.length} notes</span>
          <span>🗂️ {issues.length} letters</span>
        </div>
        <Composer active={active} ready={{ secret: privileged, from: Boolean(process.env.EMAIL_FROM) }} />
        <Table title="Letters sent" columns={["number", "subject", "status", "sent_at", "recipients", "failures"]} rows={issues} />
        <Table title="Subscribers" columns={["created_at", "name", "email", "status", "source_page"]} rows={subscribers} />
        <Table title="Notes" columns={["created_at", "name", "email", "help_type", "message", "source_page"]} rows={contacts} />
      </div>
    </section>
  );
}
