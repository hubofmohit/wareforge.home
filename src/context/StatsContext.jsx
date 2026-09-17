import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  fetchLiveStats,
  trackVisit as sendVisitBeacon,
  trackClick as sendClickBeacon,
} from "../lib/analytics";
import { STATS_CONFIGURED } from "../lib/supabaseClient";

const StatsContext = createContext(null);

// Centralizes Live Analysis state so a click anywhere on the page (Explore
// Features, the mailto link, Copy email) can update the numbers shown in
// the Live Analysis section immediately, instead of only reflecting on
// the next page load. The write to Supabase still happens for real (via
// sendClickBeacon -> /api/track-event), this just also updates the local
// number optimistically so the UI *feels* live while that request is
// in flight — the two will agree again next time the page is loaded and
// the real aggregate is refetched.
export function StatsProvider({ children }) {
  const [stats, setStats] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    sendVisitBeacon();

    if (!STATS_CONFIGURED) {
      setNote("Live stats are unavailable right now.");
      return;
    }

    fetchLiveStats()
      .then((data) => {
        if (!data) throw new Error("No stats returned");
        // The visit we just recorded above won't be reflected in the
        // numbers we just fetched (it's an async write), so bump it
        // locally by one to account for the current visit.
        setStats({ ...data, totalVisits: data.totalVisits + 1 });
      })
      .catch((err) => {
        console.warn("Live Analysis stats unavailable:", err);
        setNote(
          "Live stats couldn't be loaded — the analytics tables may not be set up yet."
        );
      });
  }, []);

  const trackClick = useCallback((target) => {
    sendClickBeacon(target);
    setStats((prev) => (prev ? { ...prev, totalClicks: prev.totalClicks + 1 } : prev));
  }, []);

  return (
    <StatsContext.Provider value={{ stats, note, trackClick }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used within a StatsProvider");
  return ctx;
}