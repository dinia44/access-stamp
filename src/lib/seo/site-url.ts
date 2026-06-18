import { SITE_CONFIG } from "@/lib/site-config";

const DEFAULT_SITE_URL = SITE_CONFIG.url;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && raw.length > 0) return raw.replace(/\/$/, "");
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
