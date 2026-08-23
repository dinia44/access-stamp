/** Central website configuration — single source of truth for public contact details. */
export const SITE_CONFIG = {
  name: "Access Stamp",
  email: "hello@accessstamp.co.uk",
  /**
   * Fallback public origin when NEXT_PUBLIC_SITE_URL is unset.
   * Keep the live Vercel hostname here until accessstamp.co.uk DNS + Vercel domain
   * are attached; then set NEXT_PUBLIC_SITE_URL=https://accessstamp.co.uk in production.
   */
  url: "https://access-stamp-allister-diniz-s-projects.vercel.app",
  /** Approved custom domain — use via NEXT_PUBLIC_SITE_URL once DNS is live. */
  approvedDomain: "https://accessstamp.co.uk",
  vercelHostname: "access-stamp-allister-diniz-s-projects.vercel.app",
  location: "United Kingdom",
} as const;
