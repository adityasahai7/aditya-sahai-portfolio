-- Thinking Beyond Letter: sent issues (public archive) + per-issue send log.
-- Only the server (secret/service key) reads or writes these tables.

create table if not exists public.newsletter_issues (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  slug text unique not null,
  number integer not null,
  subject text not null,
  preview text,
  markdown text not null,
  html text not null,
  status text not null default 'draft' check (status in ('draft', 'sent')),
  sent_at timestamptz,
  recipients integer not null default 0,
  failures integer not null default 0
);

create index if not exists newsletter_issues_sent_idx on public.newsletter_issues (status, sent_at desc);

alter table public.newsletter_issues enable row level security;
revoke all on public.newsletter_issues from anon, authenticated;
grant select, insert, update, delete on public.newsletter_issues to service_role;

-- Unsubscribe tokens must exist for every subscriber (older rows may be missing one).
update public.newsletter_subscribers set unsubscribe_token = gen_random_uuid()::text where unsubscribe_token is null;
