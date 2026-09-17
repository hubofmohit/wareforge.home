import { supabase, STATS_CONFIGURED } from "./supabaseClient";

// Uses sendBeacon when available so the request survives the page
// unloading right after a click (e.g. the mailto link handing off to the
// OS mail client) — falls back to a fire-and-forget fetch with keepalive.
function sendTrackingBeacon(payload) {
  const url = "/api/track-event";
  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(url, blob);
      return;
    }
  } catch (e) {
    // fall through to fetch
  }
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {
    // Landing-page analytics failing silently is the right behavior
    // here — it should never surface an error to a visitor just browsing.
  });
}

// Records one visit per browser session (sessionStorage guard), so
// refreshing the page or navigating between anchors doesn't inflate the
// count.
export function trackVisit() {
  if (!STATS_CONFIGURED) return;
  try {
    if (sessionStorage.getItem("wf_visit_tracked")) return;
    sessionStorage.setItem("wf_visit_tracked", "1");
  } catch (e) {
    // sessionStorage unavailable (e.g. private browsing) — fine to just
    // track every load in that case, nothing to fall back to.
  }
  sendTrackingBeacon({ type: "visit", path: location.pathname || "/" });
}

// Called from the real CTAs (Explore Features, the mailto link, Copy
// email) — not wired to every click on the page.
export function trackClick(target) {
  if (!STATS_CONFIGURED) return;
  sendTrackingBeacon({ type: "click", target });
}

// Fetches the aggregated counts from the site_public_stats() RPC.
// Resolves to null if stats aren't configured or the RPC isn't reachable
// yet (e.g. the supabase-schema.sql migration hasn't been run) — callers
// should show "–" rather than an invented number in that case.
export async function fetchLiveStats() {
  if (!STATS_CONFIGURED) return null;
  const { data, error } = await supabase.rpc("site_public_stats");
  if (error || !data || !data.length) return null;
  const row = data[0];
  return {
    totalVisits: Number(row.total_visits) || 0,
    totalClicks: Number(row.total_clicks) || 0,
    authorizedUsers: Number(row.authorized_users) || 0,
    activeWarehouses: Number(row.active_warehouses) || 0,
    configuredZones: Number(row.configured_zones) || 0,
    trackedItems: Number(row.tracked_items) || 0,
  };
}
