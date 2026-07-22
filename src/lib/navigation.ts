import { SITE_CONFIG } from "@/lib/site-config";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

/** Primary desktop and mobile navigation — flat links, no dropdowns. */
export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Guides", href: "/advice" },
  { label: "Help cards", href: "/help-cards" },
  { label: "Tools", href: "/ai-toolkit" },
  { label: "For venues", href: "/for-venues" },
  { label: "About", href: "/about" },
];

export const PRIMARY_NAV_CTA = {
  label: "Check a venue",
  href: "/venue-finder",
} as const;

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Guides", href: "/advice" },
  { label: "Help cards", href: "/help-cards" },
  { label: "Tools", href: "/ai-toolkit" },
];

export const FOOTER_ACCESS_STAMP_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "For venues", href: "/for-venues" },
  { label: "Methodology", href: "/methodology" },
  { label: "Accessibility", href: "/accessibility" },
];

export const FOOTER_RESOURCE_LINKS: NavLink[] = [
  { label: "Directory", href: "/directory" },
  { label: "Glossary", href: "/glossary" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LEGAL_LINKS: NavLink[] = [
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Corrections", href: "/corrections" },
  { label: "Complaints", href: "/complaints" },
];

/** @deprecated Use MAIN_NAV_LINKS */
export const MAIN_NAV_GROUPS = MAIN_NAV_LINKS.map((link) => ({
  label: link.label,
  href: link.href,
  items: [link],
}));

export function navLinkActive(path: string, href: string): boolean {
  if (href.includes("#")) return path === href.split("#")[0];
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export { SITE_CONFIG };
