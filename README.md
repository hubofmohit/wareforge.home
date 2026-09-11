# WareForge — Landing Page

The public-facing marketing page for **WareForge**, a warehouse floor-plan and inventory management app. This repo is intentionally separate from the app itself — it's a standalone static site (no build step, no framework) plus one small serverless function, deployed independently on Vercel.

Visitors can read about what WareForge does, walk through its features, see real usage numbers pulled live from the database, and request access — there's no self-service signup; access is granted directly by the admin.

## What's in here

```
├── api/
│   └── track-event.js   # Vercel serverless function — records page
│                         # visits and CTA clicks
├── Home.html             # the page itself
├── Home.css
├── Home.js                # interactivity, live-stats fetching, tracking
└── package.json           # declares @supabase/supabase-js for the function
```

## Live Analysis

The "Live Analysis" section shows real numbers — not placeholders:

- **Page Visits** / **CTA Clicks** — recorded by `api/track-event.js` into two write-only Supabase tables (`site_visits`, `site_clicks`)
- **Authorized Users** / **Active Warehouses** / **Configured Zones** /
  **Items Tracked** — read straight from the same Supabase project the main WareForge app uses, via a `site_public_stats()` database function that returns aggregated counts only (no row-level or per-visitor data)

This site shares its Supabase project with the main app — that's required, not incidental, since the usage numbers above only mean anything if they're reading the app's real data.

## Environment variables

Set these in the Vercel project's **Settings → Environment Variables**:

| Variable | Where to find it |
|---|---|
| `SUPABASE_URL` | Supabase dashboard → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Project Settings → API → `service_role` key (secret — never commit this) |

## Database setup

The two tables and the stats function this site depends on live in `site-analytics-migration.sql` at the root of the main app's repo — run that once in the Supabase SQL Editor if it hasn't been applied yet.

## Deploy

No build step — Vercel auto-detects the static files at the root and the serverless function in `api/`. Push to deploy.
