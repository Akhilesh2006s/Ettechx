import { getApiBaseUrl } from "./apiBaseUrl";

const mediaPrefixes = ["/gallery/", "/speakers/", "/sponsors/", "/newsletters/"];

function getApiOrigin(): string {
  return getApiBaseUrl().replace(/\/api\/?$/, "");
}

function isLocalDevHost(): boolean {
  if (typeof window === "undefined") return false;
  const h = window.location.hostname;
  return h === "localhost" || h === "127.0.0.1";
}

function isBackendMediaPath(src: string): boolean {
  return src.startsWith("/") && mediaPrefixes.some((prefix) => src.startsWith(prefix));
}

/**
 * Resolves image URLs. Paths under /gallery/, /speakers/, etc. are stored on the API server,
 * not on the static frontend host. In production, requesting them from the site domain (e.g.
 * Vercel) returns 404 — use the API origin instead. On localhost, keep same-origin first so
 * Vite `public/` assets still work; onError can fall back to the API.
 */
export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  if (src.startsWith("/")) {
    if (isBackendMediaPath(src) && !isLocalDevHost()) {
      return `${getApiOrigin()}${src}`;
    }
    return src;
  }
  return src;
}

export function resolveMediaFallbackUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  if (isBackendMediaPath(src)) {
    return `${getApiOrigin()}${src}`;
  }
  return src;
}

