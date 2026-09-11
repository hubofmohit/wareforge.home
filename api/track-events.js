// Records a landing-page visit or a CTA click. Called from Home.js on
// the public marketing site — deliberately unauthenticated, since
// that page has no access token of its own and visitors aren't
// tenants or members.
//
// Writes go through the service role key, the same way every other
// write-only table in the main app works (see the "backups" table
// there): the client can never insert into site_visits/site_clicks
// directly, only through this function, and can never read individual
// rows back — only the aggregated counts exposed by site_public_stats()
// (see supabase-schema.sql).
//
// No CAPTCHA or rate limiting here — someone determined could inflate
// the counters by hitting this endpoint directly. That's an accepted
// trade-off for a simple landing-page counter, not an authoritative
// metric. Revisit if that ever actually becomes a problem.
//
// This is a Vercel serverless function (not a Netlify one): it lives
// at api/track-event.js, uses the (req, res) handler signature Vercel
// expects, and is reachable at /api/track-event once deployed — see
// the matching fetch URL in Home.js.

const { createClient } = require("@supabase/supabase-js");

const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Only these targets are recordable — keeps the click table meaningful
// (real CTAs) instead of an open-ended free-text field anyone could
// spam with arbitrary strings.
const CLICK_TARGETS = new Set(["explore_features", "get_access_email", "copy_email"]);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let type, target, path;
  try {
    // Vercel parses a JSON body into req.body automatically when the
    // request's Content-Type is application/json — which is what both
    // sendBeacon (via the Blob type below) and the fetch fallback in
    // Home.js send. Handling the string case too costs nothing and
    // guards against any client that sends it unparsed.
    const parsed = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    type = String(parsed.type || "").trim();
    target = String(parsed.target || "").trim();
    path = String(parsed.path || "/").trim().slice(0, 200);
  } catch (e) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  try {
    if (type === "visit") {
      const { error } = await supabaseAdmin.from("site_visits").insert({ path: path || "/" });
      if (error) throw error;
    } else if (type === "click") {
      if (!CLICK_TARGETS.has(target)) {
        res.status(400).json({ error: "Unknown click target" });
        return;
      }
      const { error } = await supabaseAdmin.from("site_clicks").insert({ target });
      if (error) throw error;
    } else {
      res.status(400).json({ error: "type must be 'visit' or 'click'" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("track-event error:", err);
    res.status(500).json({ error: "Couldn't record event" });
  }
};