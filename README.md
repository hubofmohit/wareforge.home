# WareForge — React

The WareForge marketing site, rebuilt from static HTML/CSS/JS into a
Vite + React app. Same design, same animations and behavior — now as
components with real state instead of manual DOM manipulation.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

```bash
npm run build   # production build, output to dist/
npm run preview # locally preview the production build
```

Requires Node 18+.

## What changed vs. the static site

- **Componentized.** Every section (`Hero`, `About`, `Tour`, `Skills`,
  `Projects`, `Contact`, `LiveAnalysis`, `Access`, `Navbar`, `Footer`) is
  its own file under `src/components/`, instead of one long HTML file +
  one long `Home.js`.
- **State instead of DOM queries.** The mobile menu, scroll-spy active
  link, "scrolled" navbar state, skill bar fill, hero/skill counters,
  project/image modals, and the cycling status text are all React state
  now, not `classList.add/remove` calls scattered through a script.
- **Reusable hooks** (`src/hooks/`): `useCountUp` (count-up-on-scroll
  stats), `useAnimatedNumber` (Live Analysis numbers), `useTilt` (the 3D
  hover tilt used on the expertise/contact/project/access cards),
  `useScrollSpy`, `useBodyScrollLock` (the iOS-safe modal scroll lock).
- **Content extracted to data files** (`src/data/`) — `projects.js`,
  and `content.js` for nav links, expertise items, tour steps, skills,
  hero stats, and the "Under the Hood" / "Live Analysis" card copy.
  Edit these to change copy without touching component code.
- **Supabase config via env vars** (`src/lib/supabaseClient.js`), with
  the original project's public anon key kept as a fallback default so
  it still works out of the box. See below to point it at your own
  project instead.

## Required assets (not included)

Copy these three files from your original site's `assets/` folder into
`public/assets/` (see `public/assets/README.md`):

- `hero-floor-plan.svg`
- `floor-plan-designer.png`
- `stock-table.png`

## Live Analysis / Supabase

`src/lib/supabaseClient.js` and `src/lib/analytics.js` reproduce the
original `initLiveAnalysis()` / `trackVisit()` / `trackClick()` logic:

- Visit/click events POST to `/api/track-event` (a serverless function
  you deploy separately, using the Supabase **service role** key —
  never exposed to the browser).
- The six Live Analysis numbers come from the `site_public_stats()`
  Postgres RPC, called with the public anon key.

**Clicking "Explore Features" / "Copy email" doesn't move the numbers,
and refreshing resets them?** That's fixed now for local dev — see
"Running Live Analysis locally" below. In short: `npm run dev` (plain
Vite) can't run a serverless function, so `/api/track-event` was
404ing and nothing ever reached Supabase; a refresh just re-fetched the
unchanged real count. `server/dev-track-event.js` is a small local
stand-in that actually performs the write while you develop.

### Running Live Analysis locally

1. `cp .env.example .env` and fill in all four values (see the file for
   which is used where — the service role key must **not** be
   `VITE_`-prefixed).
2. Make sure `site_visits` / `site_clicks` tables (and the
   `site_public_stats()` RPC) exist in that Supabase project — adjust
   the table names in `server/dev-track-event.js` if yours differ.
3. Run both the app and the local tracking server together:
   ```bash
   npm run dev:all
   ```
   (or in two terminals: `npm run dev` and `npm run dev:api`)

Now clicks actually insert rows in Supabase, and a refresh will show
the real, persisted count. This local server is **dev-only** — once you
deploy to Vercel or Netlify, that platform runs `api/track-event.js` or
`netlify/functions/track-event.js` for you instead (whichever matches
your host — delete the other one), reading `SUPABASE_URL` /
`SUPABASE_SERVICE_ROLE_KEY` from that platform's environment variable
settings, and `server/dev-track-event.js` isn't used in production at
all.



To point this at your own Supabase project instead of the original
site's, create a `.env.local` file:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

If you'd rather not wire up Supabase at all, clear both the env vars
and the fallback defaults in `supabaseClient.js` — the section will
just show "Live stats are unavailable right now." instead of erroring.

## Project structure

```
src/
  components/   one file per section + Icon.jsx (shared inline SVGs)
  data/         projects.js, content.js — all editable copy/config
  hooks/        useCountUp, useAnimatedNumber, useTilt, useScrollSpy,
                useBodyScrollLock
  lib/          supabaseClient.js, analytics.js
  App.jsx       wires sections together + modal/lightbox state
  index.css     global stylesheet (ported from the original Home.css)
public/
  assets/       put hero-floor-plan.svg + the two tour screenshots here
```