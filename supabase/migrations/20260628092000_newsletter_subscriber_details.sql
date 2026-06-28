alter table public.newsletter_subscribers
  add column if not exists source_component text,
  add column if not exists subscriber_type text not null default 'newsletter',
  add column if not exists interests text[],
  add column if not exists referral_source text;

create index if not exists newsletter_status_created_at_idx
  on public.newsletter_subscribers (status, created_at desc);

grant insert on public.analytics_events to anon;

create policy "website can submit approved analytics events"
on public.analytics_events for insert to anon
with check (
  event_name in (
    'frrost_visit_click',
    'frrost_learn_click',
    'newsletter_submit',
    'newsletter_success',
    'newsletter_duplicate',
    'loader_seen'
  )
  and char_length(page) between 1 and 160
);
