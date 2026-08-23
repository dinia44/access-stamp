/** Central website configuration — single source of truth for public contact details. */
export const SITE_CONFIG = {
  name: "Access Stamp",
  email: "hello@accessstamp.co.uk",
  /**
   * Approved public origin used when NEXT_PUBLIC_SITE_URL is unset.
   * Prefer setting NEXT_PUBLIC_SITE_URL in each deployment environment.
   */
  url: "https://accessstamp.co.uk",
  /** Legacy Vercel project hostname — keep for redirect/docs only; do not use as canonical. */
  vercelHostname: "access-stamp-allister-diniz-s-projects.vercel.app",
  location: "United Kingdom",
} as const;
