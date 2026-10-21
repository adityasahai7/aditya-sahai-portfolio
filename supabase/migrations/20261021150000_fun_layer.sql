-- Fun layer: sticker wall (moderated), chai counter, voice hellos.
-- The website uses the publishable key: anon can only INSERT notes/voice and
-- READ approved wall notes + the chai count. Moderation uses the secret key.

-- ── Sticker wall ──
create table if not exists public.wall_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  emoji text not null,
  note text not null,
  name text,
  tone text not null default 'yellow',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected'))
);
create index if not exists wall_notes_status_idx on public.wall_notes (status, created_at desc);
alter table public.wall_notes enable row level security;
revoke all on public.wall_notes from anon, authenticated;
grant insert on public.wall_notes to anon;
grant select (id, created_at, emoji, note, name, tone) on public.wall_notes to anon;
create policy "anyone can leave a pending note" on public.wall_notes for insert to anon
  with check (status = 'pending' and char_length(note) between 2 and 120 and char_length(emoji) between 1 and 16 and (name is null or char_length(name) <= 40) and tone in ('yellow', 'red', 'cyan', 'mint', 'fuchsia', 'paper'));
create policy "anyone can read approved notes" on public.wall_notes for select to anon using (status = 'approved');
grant select, insert, update, delete on public.wall_notes to service_role;

-- ── Chai counter ──
create table if not exists public.chai_counter (
  id integer primary key default 1 check (id = 1),
  count bigint not null default 0,
  updated_at timestamptz not null default now()
);
insert into public.chai_counter (id, count) values (1, 0) on conflict (id) do nothing;
alter table public.chai_counter enable row level security;
revoke all on public.chai_counter from anon, authenticated;
grant select on public.chai_counter to anon;
create policy "anyone can read the chai count" on public.chai_counter for select to anon using (true);
grant select, update on public.chai_counter to service_role;

create or replace function public.increment_chai()
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.chai_counter set count = count + 1, updated_at = now() where id = 1 returning count;
$$;
revoke all on function public.increment_chai() from public;
grant execute on function public.increment_chai() to anon;

-- ── Voice hellos ──
create table if not exists public.voice_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  mime text not null,
  audio_base64 text not null,
  duration_seconds numeric,
  status text not null default 'new' check (status in ('new', 'heard', 'archived'))
);
alter table public.voice_notes enable row level security;
revoke all on public.voice_notes from anon, authenticated;
grant insert on public.voice_notes to anon;
create policy "anyone can send a voice hello" on public.voice_notes for insert to anon
  with check (status = 'new' and char_length(audio_base64) between 100 and 900000 and mime like 'audio/%' and (name is null or char_length(name) <= 40));
grant select, insert, update, delete on public.voice_notes to service_role;
