// Local stand-in for api/track-event.js / netlify/functions/track-event.js
// during development. `npm run dev` (plain Vite) has no way to run a
// serverless function, so without this, every POST to /api/track-event
// 404s and nothing ever gets written to Supabase — which is why the
// counts were resetting to the old value on every refresh.
//
// This is dev-only. When you actually deploy to Vercel or Netlify, THAT
// platform runs api/track-event.js or netlify/functions/track-event.js
// for you and this file isn't involved at all.
//
// Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from .env (see the
// example in .env.example) — the service role key must NEVER be
// prefixed with VITE_ or it would end up bundled into client code.

import "dotenv/config";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PORT = 8787 } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "[track-event dev server] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env — " +
      "requests will fail until both are set."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/track-event", async (req, res) => {
  const { type, path, target } = req.body || {};

  try {
    if (type === "visit") {
      const { error } = await supabase.from("site_visits").insert({ path: path || "/" });
      if (error) throw error;
    } else if (type === "click") {
      const { error } = await supabase
        .from("site_clicks")
        .insert({ target: target || "unknown" });
      if (error) throw error;
    } else {
      return res.status(400).json({ error: "Unknown event type" });
    }
    res.status(204).end();
  } catch (err) {
    // Log loudly in the dev server (unlike the frontend, which fails
    // silently on purpose) so schema mismatches are easy to spot.
    console.error("[track-event dev server] insert failed:", err.message || err);
    res.status(500).json({ error: "Failed to record event" });
  }
});

app.listen(PORT, () => {
  console.log(`[track-event dev server] listening on http://localhost:${PORT}`);
});