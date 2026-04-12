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

function pathnameIsBackendMedia(pathname: string): boolean {
  return pathname.startsWith("/") && mediaPrefixes.some((prefix) => pathname.startsWith(prefix));
}

function isBackendMediaPath(src: string): boolean {
  return pathnameIsBackendMedia(src);
}

/**
 * Gallery/admin data sometimes stores full marketing-site URLs (e.g. https://www.ettechx.com/gallery/...).
 * Those must be served from the API host, not Vercel — rewrite when pathname is API media.
 */
function rewriteAbsoluteMediaUrlToApiIfNeeded(src: string): string {
  if (!src.startsWith("http://") && !src.startsWith("https://")) return src;
  try {
    const u = new URL(src);
    if (!pathnameIsBackendMedia(u.pathname)) return src;
    const apiOrigin = getApiOrigin();
    const apiOriginNormalized = apiOrigin.replace(/\/$/, "");
    if (u.origin === new URL(apiOriginNormalized).origin) return src;
    return `${apiOriginNormalized}${u.pathname}${u.search}${u.hash}`;
  } catch {
    return src;
  }
}

/**
 * Resolves image URLs. Paths under /gallery/, /speakers/, etc. are stored on the API server,
 * not on the static frontend host. In production, requesting them from the site domain (e.g.
 * Vercel) returns 404 — use the API origin instead. On localhost, keep same-origin first so
 * Vite `public/` assets still work; onError can fall back to the API.
 */
export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("data:")) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return rewriteAbsoluteMediaUrlToApiIfNeeded(src);
  }
  if (src.startsWith("/")) {
    if (isBackendMediaPath(src) && !isLocalDevHost()) {
      return `${getApiOrigin().replace(/\/$/, "")}${src}`;
    }
    return src;
  }
  return src;
}

export function resolveMediaFallbackUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("data:")) return src;
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return rewriteAbsoluteMediaUrlToApiIfNeeded(src);
  }
  if (isBackendMediaPath(src)) {
    return `${getApiOrigin().replace(/\/$/, "")}${src}`;
  }
  return src;
}

