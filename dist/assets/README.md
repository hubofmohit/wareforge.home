# Assets

Copy these files from your original static site's `assets/` folder into
this directory (paths are referenced exactly as before):

- `hero-floor-plan.svg` — fetched at runtime by `Hero.jsx` and injected
  inline so its `.wf-zone` / `#wfScene` / `#wfStatusText` elements stay
  interactive (hover states, parallax, cycling status text).
- `floor-plan-designer.png` — Tour section, step 1 screenshot.
- `stock-table.png` — Tour section, step 2 screenshot.

Everything under `public/` is served as-is at the site root, so no code
changes are needed once these three files are in place.
