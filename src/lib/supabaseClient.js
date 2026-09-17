import { createClient } from "@supabase/supabase-js";

// Same Supabase project the main WareForge app uses — same URL and anon
// key. The anon key is meant to be public/embedded in client code; every
// table it can touch is protected by Row Level Security, and the
// analytics tables in particular have NO anon policies at all (writes go
// through the api/track-event serverless function using the service
// role key, which never reaches the browser).
//
// Set these in a `.env.local` file at the project root:
//   VITE_SUPABASE_URL=https://your-project.supabase.co
//   VITE_SUPABASE_ANON_KEY=your-anon-key
// Falls back to the same project/anon-key the original static site
// shipped with (anon keys are safe to expose — see note above). Override
// via .env.local if you point this at a different Supabase project.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://berahbwqlnntncgiterv.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlcmFoYndxbG5udG5jZ2l0ZXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0MjEyNjAsImV4cCI6MjEwMzk5NzI2MH0.Vjs76cbSjafoNE8vHIG4D91v5XjplNyJeqY651dbsHk";

export const STATS_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = STATS_CONFIGURED
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
