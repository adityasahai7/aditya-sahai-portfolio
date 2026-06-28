type TableName = "contacts" | "newsletter_subscribers" | "waitlist_entries" | "analytics_events";
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
