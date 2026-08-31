import { SITE_CONFIG } from "@/lib/site-config";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type ResourceNavGroup = {
  label: string;
  description?: string;
  items: NavLink[];
};

/** Peer-level header links. Venue Finder is the primary CTA, not a duplicate text link. */
export const MAIN_NAV_LINKS: NavLink[] = [
  { label: "For venues", href: "/for-venues" },
  { label: "About", href: "/about" },
];

export const RESOURCE_NAV_GROUPS: ResourceNavGroup[] = [
  {
    label: "Guidance and planning",
    description: "Support after you have checked a venue.",
    items: [
      { label: "Guides", href: "/advice", description: "Understand rights, access, and available support" },
      { label: "Help cards", href: "/help-cards", description: "Prepare wording and checklists for conversations" },
      { label: "Planning tools", href: "/ai-toolkit", description: "Work through a practical access situation" },
      { label: "Letters", href: "/ai-toolkit/letter-builder", description: "Draft a clear access request" },
    ],
  },
  {
    label: "Reference",
    items: [
      { label: "Directory", href: "/directory", description: "Find organisations and services that can help" },
      { label: "Glossary", href: "/glossary", description: "Disability and access terms in plain English" },
    ],
  },
];

export const RESOURCE_NAV_ITEMS: NavLink[] = RESOURCE_NAV_GROUPS.flatMap((group) => group.items);

export const PRIMARY_NAV_CTA = {
  label: "Check a venue",
  href: "/venue-finder",
} as const;

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Guides", href: "/advice" },
  { label: "Help cards", href: "/help-cards" },
  { label: "Planning tools", href: "/ai-toolkit" },
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

export function resourcesNavActive(path: string): boolean {
  return RESOURCE_NAV_ITEMS.some((item) => navLinkActive(path, item.href));
}

/** Prefer the most specific resource item so hub and nested routes are not both current. */
export function resourceNavItemActive(path: string, href: string): boolean {
  if (!navLinkActive(path, href)) return false;
  return !RESOURCE_NAV_ITEMS.some(
    (item) => item.href !== href && item.href.length > href.length && navLinkActive(path, item.href),
  );
}

export { SITE_CONFIG };
