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

/** Backend host that serves uploaded files (/gallery/, /speakers/, …). Never use the marketing domain. */
const DEFAULT_BACKEND_ORIGIN = 'https://ettechx-backend-production.up.railway.app';

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

/**
 * Origin for static uploads (gallery, speakers, …). If VITE_API_URL mistakenly points at
 * www.eduexpoglobal.com (or legacy ettechx.com), file URLs would 404 on Vercel — fall back to the real backend host.
 * Override with VITE_MEDIA_ORIGIN if needed.
 */
export function getMediaOrigin(): string {
  const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env;
  const mediaFromEnv = env?.VITE_MEDIA_ORIGIN?.trim();
  if (mediaFromEnv) return mediaFromEnv.replace(/\/$/, "");

  const apiOrigin = getApiBaseUrl().replace(/\/api\/?$/, "").replace(/\/$/, "");
  try {
    const host = new URL(apiOrigin).hostname;
    if (host === "www.eduexpoglobal.com" || host === "eduexpoglobal.com" || host === "www.ettechx.com" || host === "ettechx.com") {
      return DEFAULT_BACKEND_ORIGIN;
    }
  } catch {
    /* ignore */
  }
  return apiOrigin;
}

