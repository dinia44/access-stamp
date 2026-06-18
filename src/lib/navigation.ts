import { SITE_CONFIG } from "@/lib/site-config";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  items: NavLink[];
};

/** Primary desktop navigation with dropdown groups. */
export const MAIN_NAV_GROUPS: NavGroup[] = [
  {
    label: "Venue Access",
    href: "/venue-finder",
    items: [
      { label: "Find venues", href: "/venue-finder", description: "Search venue access information before you travel." },
      { label: "How venue information works", href: "/methodology", description: "Verification labels, evidence, and known unknowns." },
      { label: "Submit a venue", href: "/submit-venue", description: "Suggest a venue or share access details." },
    ],
  },
  {
    label: "Guides",
    href: "/advice",
    items: [
      { label: "Browse all guides", href: "/advice" },
      { label: "Rights and benefits", href: "/advice/rights" },
      { label: "Work and education", href: "/advice/workplace" },
      { label: "Care and support", href: "/advice/care" },
      { label: "Transport and travel", href: "/advice/transport" },
      { label: "Equipment and home", href: "/advice/equipment" },
      { label: "Urgent help", href: "/advice/emergency" },
    ],
  },
  {
    label: "Practical Tools",
    href: "/ai-toolkit",
    items: [
      { label: "Letter Builder", href: "/ai-toolkit/letter-builder" },
      { label: "Evidence Checklist", href: "/ai-toolkit/evidence-checklist" },
      { label: "Venue Questions", href: "/ai-toolkit/venue-questions" },
      { label: "Guide Search", href: "/ai-toolkit/article-companion" },
    ],
  },
  {
    label: "Help Cards",
    href: "/help-cards",
    items: [{ label: "Browse Help Cards", href: "/help-cards" }],
  },
  {
    label: "For Organisations",
    href: "/for-venues",
    items: [
      { label: "For Venues", href: "/for-venues" },
      { label: "Pilot programme", href: "/for-venues#pilot-programme" },
      { label: "Sample report", href: "/venue/harbour-kitchen-liverpool" },
    ],
  },
  {
    label: "About",
    href: "/about",
    items: [
      { label: "About Access Stamp", href: "/about" },
      { label: "Founder", href: "/about#founder" },
      { label: "Methodology", href: "/methodology" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const PRIMARY_NAV_CTA = {
  label: "Check venue access",
  href: "/venue-finder",
} as const;

export const FOOTER_EXPLORE_LINKS: NavLink[] = [
  { label: "Venue Access", href: "/venue-finder" },
  { label: "Guides", href: "/advice" },
  { label: "Practical Tools", href: "/ai-toolkit" },
  { label: "Help Cards", href: "/help-cards" },
];

export const FOOTER_ABOUT_LINKS: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "For Organisations", href: "/for-venues" },
];

export const FOOTER_VENUE_LINKS: NavLink[] = [
  { label: "List your venue", href: "/submit-venue" },
  { label: "Methodology", href: "/methodology" },
  { label: "Corrections", href: "/corrections" },
];

export const FOOTER_RESOURCE_LINKS: NavLink[] = [
  { label: "Directory", href: "/directory" },
  { label: "Glossary", href: "/glossary" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Methodology", href: "/methodology" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "Corrections policy", href: "/corrections" },
  { label: "Complaints policy", href: "/complaints" },
];

export function navGroupActive(path: string, group: NavGroup): boolean {
  if (path === group.href || path.startsWith(`${group.href}/`)) return true;
  return group.items.some((item) => path === item.href || path.startsWith(`${item.href}/`));
}

export function navLinkActive(path: string, href: string): boolean {
  if (href.includes("#")) return path === href.split("#")[0];
  if (href === "/") return path === "/";
  return path === href || path.startsWith(`${href}/`);
}

export { SITE_CONFIG };
