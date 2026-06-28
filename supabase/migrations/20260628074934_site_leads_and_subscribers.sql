create extension if not exists pgcrypto;

create table if not exists public.contacts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  company text,
  project_description text,
  help_type text,
  budget_range text,
  timeline text,
  message text not null,
  source_page text,
  status text not null default 'new' check (status in ('new', 'replied', 'converted', 'archived')),
  user_agent text,
  ip_hash text
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text unique not null,
  source_page text,
  status text not null default 'active' check (status in ('active', 'unsubscribed', 'bounced')),
  unsubscribe_token text unique,
  confirmed_at timestamptz
);

create table if not exists public.waitlist_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  email text not null,
  waitlist_type text not null check (waitlist_type in ('beyond-default', 'thinking-beyond-club')),
  reason text,
  source_page text,
  status text not null default 'active' check (status in ('active', 'invited', 'archived')),
  unique (email, waitlist_type)
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  event_name text not null,
  page text,
  metadata jsonb,
  session_id text
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);
create index if not exists contacts_status_idx on public.contacts (status);
create index if not exists newsletter_created_at_idx on public.newsletter_subscribers (created_at desc);
create index if not exists waitlist_created_at_idx on public.waitlist_entries (created_at desc);
create index if not exists analytics_event_name_created_at_idx on public.analytics_events (event_name, created_at desc);

alter table public.contacts enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.waitlist_entries enable row level security;
alter table public.analytics_events enable row level security;

revoke all on public.contacts from anon, authenticated;
revoke all on public.newsletter_subscribers from anon, authenticated;
revoke all on public.waitlist_entries from anon, authenticated;
revoke all on public.analytics_events from anon, authenticated;

grant insert on public.contacts to anon;
grant insert on public.newsletter_subscribers to anon;
grant insert on public.waitlist_entries to anon;

create policy "website can submit contacts"
on public.contacts for insert to anon
with check (
  char_length(name) between 2 and 120
  and char_length(email) between 3 and 320
  and char_length(message) between 20 and 5000
);

create policy "website can subscribe"
on public.newsletter_subscribers for insert to anon
with check (
  char_length(email) between 3 and 320
  and status = 'active'
);

create policy "website can join waitlists"
on public.waitlist_entries for insert to anon
with check (
  char_length(email) between 3 and 320
  and waitlist_type in ('beyond-default', 'thinking-beyond-club')
  and status = 'active'
);

create policy "no public analytics access"
on public.analytics_events for all to anon, authenticated
using (false)
with check (false);

grant select, insert, update, delete on public.contacts to service_role;
grant select, insert, update, delete on public.newsletter_subscribers to service_role;
grant select, insert, update, delete on public.waitlist_entries to service_role;
grant select, insert, update, delete on public.analytics_events to service_role;
