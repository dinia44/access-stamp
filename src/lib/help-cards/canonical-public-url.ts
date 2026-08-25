import { SITE_CONFIG } from "@/lib/site-config";

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function hostnameOf(value: string): string | null {
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/** Preview, local, and platform hostnames must never be printed on a Help Card. */
export function isNonCanonicalPublicHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".vercel.app") ||
    host === SITE_CONFIG.vercelHostname
  );
}

export type CanonicalPublicSiteUrl = {
  url: string;
  source: "env" | "approved-domain";
  warning?: string;
};

/**
 * Public origin for printed Help Cards, QR codes and live-source links.
 * Never uses a Vercel preview hostname, even if NEXT_PUBLIC_SITE_URL points there.
 */
export function getCanonicalPublicSiteUrl(): CanonicalPublicSiteUrl {
  const approved = SITE_CONFIG.approvedDomain.replace(/\/$/, "");
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (env && isValidHttpUrl(env)) {
    const host = hostnameOf(env);
    if (host && !isNonCanonicalPublicHost(host)) {
      return { url: env.replace(/\/$/, ""), source: "env" };
    }
    return {
      url: approved,
      source: "approved-domain",
      warning:
        "NEXT_PUBLIC_SITE_URL is a preview or local host. Printed Help Cards use the approved public domain instead. Set NEXT_PUBLIC_SITE_URL=https://accessstamp.co.uk in production.",
    };
  }

  return {
    url: approved,
    source: "approved-domain",
    warning:
      "NEXT_PUBLIC_SITE_URL is unset. Printed Help Cards use the approved public domain. Set NEXT_PUBLIC_SITE_URL=https://accessstamp.co.uk in production.",
  };
}

export function helpCardLiveUrl(slug: string): { url: string; label: string; warning?: string } {
  const site = getCanonicalPublicSiteUrl();
  const path = `/help-cards/${slug}`;
  const url = `${site.url}${path}`;
  const label = `${new URL(site.url).host}${path}`;
  return { url, label, warning: site.warning };
}

export function toAbsolutePublicUrl(href: string): string {
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  const { url } = getCanonicalPublicSiteUrl();
  return `${url}${href.startsWith("/") ? href : `/${href}`}`;
}
