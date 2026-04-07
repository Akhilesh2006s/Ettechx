/**
 * Central place to resolve the backend API base URL.
 *
 * This frontend runs under Vite, so environment variables must be read from `import.meta.env`.
 *
 * Configure via `.env` (recommended):
 * - VITE_API_URL=http://localhost:3001/api
 */
const DEFAULT_API_BASE_URL = 'https://ettechx-backend-production.up.railway.app/api';
const LOCAL_API_BASE_URL = 'http://localhost:3001/api';

export function getApiBaseUrl(): string {
  const fromVite = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env?.VITE_API_URL;
  if (fromVite && fromVite.trim()) return fromVite.trim();

  // In local development, prefer the local API so uploads can work without touching production.
  if (typeof window !== "undefined") {
    const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalHost) return LOCAL_API_BASE_URL;
  }

  return DEFAULT_API_BASE_URL;
}

