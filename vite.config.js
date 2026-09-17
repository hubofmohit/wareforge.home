import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Plain `vite dev` can't run serverless functions, so /api/track-event
    // would 404 without this. Forward it to server/dev-track-event.js
    // (run separately via `npm run dev:api`, or both at once via
    // `npm run dev:all`). Not used in production — Vercel/Netlify run
    // api/track-event.js or netlify/functions/track-event.js instead.
    proxy: {
      '/api': 'http://localhost:8787',
    },
  },
})