-- ============================================================
-- Landing-page analytics (site_visits / site_clicks) — RUN THIS FILE
-- ON ITS OWN. It doesn't depend on anything in supabase-schema.sql
-- above the "Backup & disaster recovery" section, so there's no risk
-- of it touching the old workspace_id/locations draft that caused
-- the "column workspace_id does not exist" error.
--
-- It only reads from members/warehouses/zones/items (via
-- select count(*)) and creates two brand-new tables plus one new
-- function — nothing here alters or depends on any existing table's
-- structure.
--
-- Same trust model as `backups`: these two tables have RLS enabled
-- with NO policies at all for anon/authenticated — they can only be
-- written by the service role (the track-event.js / api/track-event.js
-- function) and can never be read row-by-row by a client.
--
-- Public reads go ONLY through site_public_stats() below, a
-- security-definer function in the same style as
-- tenant_members_public() — it returns pre-aggregated counts, never
-- individual rows.
--
-- Note on abuse: there is no CAPTCHA or rate limiting on the function
-- that writes to these tables — someone determined could inflate the
-- counters by calling it directly. Accepted trade-off for a simple
-- landing-page counter, not meant to be an authoritative metric.
-- ============================================================

create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  path text not null default '/'
);

create table if not exists site_clicks (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  target text not null
);

create index if not exists site_visits_created_idx on site_visits(created_at desc);
create index if not exists site_clicks_created_idx on site_clicks(created_at desc);

alter table site_visits enable row level security;
alter table site_clicks enable row level security;
-- No policies on purpose — see comment above.

create or replace function site_public_stats() returns table(
  total_visits bigint,
  total_clicks bigint,
  authorized_users bigint,
  active_warehouses bigint,
  configured_zones bigint,
  tracked_items bigint
)
language sql stable security definer
set search_path = public
as $$
  select
    (select count(*) from site_visits),
    (select count(*) from site_clicks),
    (select count(*) from members where is_active = true),
    (select count(*) from warehouses),
    (select count(*) from zones),
    (select count(*) from items);
$$;

revoke all on function site_public_stats() from public;
grant execute on function site_public_stats() to anon, authenticated;