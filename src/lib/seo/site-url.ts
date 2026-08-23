import { SITE_CONFIG } from "@/lib/site-config";

const DEFAULT_SITE_URL = SITE_CONFIG.url;

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw && isValidHttpUrl(raw)) return raw.replace(/\/$/, "");
  return DEFAULT_SITE_URL.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Preview / non-production deployments should not become indexed duplicates. */
export function shouldNoIndexDeployment(): boolean {
  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === "preview" || vercelEnv === "development") return true;
  if (process.env.NEXT_PUBLIC_NOINDEX === "1" || process.env.NEXT_PUBLIC_NOINDEX === "true") {
    return true;
  }
  return false;
}
