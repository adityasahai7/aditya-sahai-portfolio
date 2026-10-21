export type TableName = "contacts" | "newsletter_subscribers" | "waitlist_entries" | "analytics_events" | "newsletter_issues" | "wall_notes" | "chai_counter" | "voice_notes";
type SiteRecord = Record<string, unknown>;

function getConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const key = secret || process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key, privileged: Boolean(secret) };
}

function headers(key: string, prefer?: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...(prefer ? { Prefer: prefer } : {}),
  };
}

export function hasDurableStorage() {
  return Boolean(getConfig());
}

export async function insertRecord(table: TableName, record: SiteRecord) {
  const config = getConfig();
  if (!config) return { configured: false, ok: false, duplicate: false };
  const response = await fetch(`${config.url}/rest/v1/${table}`, {
    method: "POST",
    headers: headers(config.key, "return=minimal"),
    body: JSON.stringify(record),
    cache: "no-store",
  });
  const body = response.ok ? null : await response.text();
  return { configured: true, ok: response.ok, duplicate: response.status === 409, error: body };
}

export async function listRecords<T>(table: TableName, limit = 100): Promise<T[]> {
  const config = getConfig();
  if (!config?.privileged) return [];
  const response = await fetch(`${config.url}/rest/v1/${table}?select=*&order=created_at.desc&limit=${limit}`, {
    headers: headers(config.key),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Storage read failed for ${table}: ${response.status}`);
  return response.json() as Promise<T[]>;
}

export function hasPrivilegedStorage() {
  return Boolean(getConfig()?.privileged);
}

/** Privileged read with a raw PostgREST query string (e.g. "status=eq.active&select=email"). */
export async function queryRecords<T>(table: TableName, query: string): Promise<T[]> {
  const config = getConfig();
  if (!config?.privileged) return [];
  const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, { headers: headers(config.key), cache: "no-store" });
  if (!response.ok) throw new Error(`Storage query failed for ${table}: ${response.status}`);
  return response.json() as Promise<T[]>;
}

/** Privileged update of rows matching a PostgREST filter (e.g. "unsubscribe_token=eq.abc"). */
export async function updateRecords(table: TableName, filter: string, patch: SiteRecord) {
  const config = getConfig();
  if (!config?.privileged) return { ok: false, count: 0 };
  const response = await fetch(`${config.url}/rest/v1/${table}?${filter}`, {
    method: "PATCH",
    headers: headers(config.key, "return=representation"),
    body: JSON.stringify(patch),
    cache: "no-store",
  });
  if (!response.ok) return { ok: false, count: 0 };
  const rows = (await response.json()) as unknown[];
  return { ok: true, count: rows.length };
}

/** Privileged insert that returns the created row. */
export async function insertReturning<T>(table: TableName, record: SiteRecord): Promise<T | null> {
  const config = getConfig();
  if (!config?.privileged) return null;
  const response = await fetch(`${config.url}/rest/v1/${table}`, { method: "POST", headers: headers(config.key, "return=representation"), body: JSON.stringify(record), cache: "no-store" });
  if (!response.ok) throw new Error(`Insert failed for ${table}: ${response.status} ${await response.text()}`);
  const rows = (await response.json()) as T[];
  return rows[0] ?? null;
}

/** Read with whatever key is configured (publishable is enough where RLS allows public reads). */
export async function publicSelect<T>(table: TableName, query: string): Promise<T[]> {
  const config = getConfig();
  if (!config) return [];
  const response = await fetch(`${config.url}/rest/v1/${table}?${query}`, { headers: headers(config.key), cache: "no-store" });
  if (!response.ok) return [];
  return response.json() as Promise<T[]>;
}

/** Call a Postgres function exposed through PostgREST. */
export async function rpc<T>(fn: string, args: Record<string, unknown> = {}): Promise<T | null> {
  const config = getConfig();
  if (!config) return null;
  const response = await fetch(`${config.url}/rest/v1/rpc/${fn}`, { method: "POST", headers: headers(config.key), body: JSON.stringify(args), cache: "no-store" });
  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export function publicConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return url && key ? { url: url.replace(/\/$/, ""), key } : null;
}
