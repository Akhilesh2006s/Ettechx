import { getApiBaseUrl } from "./apiBaseUrl";

const API_BASE_URL = getApiBaseUrl();
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");
const mediaPrefixes = ["/gallery/", "/speakers/", "/sponsors/", "/newsletters/"];

export function resolveMediaUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  if (src.startsWith("/")) {
    // Prefer current frontend origin first (works for assets in Vite public/).
    return src;
  }
  return src;
}

export function resolveMediaFallbackUrl(src: string): string {
  if (!src) return src;
  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("data:")) {
    return src;
  }
  if (src.startsWith("/") && mediaPrefixes.some((prefix) => src.startsWith(prefix))) {
    return `${API_ORIGIN}${src}`;
  }
  return src;
}

