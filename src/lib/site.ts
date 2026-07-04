import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";

export type NavItem = { label: string; href: string; description?: string };

/** Access Stamp brand logo. Override with NEXT_PUBLIC_LOGO_URL if needed. */
export const SITE_LOGO_SRC =
  typeof process.env.NEXT_PUBLIC_LOGO_URL === "string" && process.env.NEXT_PUBLIC_LOGO_URL.trim().length > 0
    ? process.env.NEXT_PUBLIC_LOGO_URL.trim()
    : CLOUDINARY_MEDIA.siteLogo;

/** Intrinsic SVG dimensions (400×537) — header sizes by width so the portrait mark stays readable. */
export const SITE_LOGO_WIDTH = 400;
export const SITE_LOGO_HEIGHT = 537;

/** Access Stamp Venue Finder promo (16:9, Cloudinary). */
export const VENUE_FINDER_PROMO_VIDEO_SRC =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/v1780700109/accessstamp_16x9_correct_end_screen_osaycc.mp4";

/** First-frame poster for the Venue Finder promo video. */
export const VENUE_FINDER_PROMO_VIDEO_POSTER =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/so_0,f_jpg,q_auto/accessstamp_16x9_correct_end_screen_osaycc.jpg";

/** @deprecated Use MAIN_NAV_LINKS from @/lib/navigation */
export { MAIN_NAV_LINKS as NAV_ITEMS, PRIMARY_NAV_CTA } from "@/lib/navigation";

/** Resources dropdown — grouped for homepage header */
export type ResourceGroup = { label: string; description?: string; items: NavItem[] };

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "AI Tools",
    description: "Practical AI helpers for planning, wording, and next steps.",
    items: [
      {
        label: "AI Toolkit",
        href: "/ai-toolkit",
        description: "Ask Access Stamp for practical next steps and visit planning.",
      },
    ],
  },
  {
    label: "Reference",
    description: "Quick reference tools, organisations, and rights guidance.",
    items: [
      {
        label: "Help Cards",
        href: "/help-cards",
        description: "Create quick support summaries for carers, work, or services.",
      },
      {
        label: "Directory",
        href: "/directory",
        description: "Find organisations and services that can help.",
      },
      {
        label: "Glossary",
        href: "/glossary",
        description: "Understand disability and access terms in plain English.",
      },
      {
        label: "Laws & Guidance",
        href: "/laws-guidance",
        description: "Learn your rights, duties, and where official guidance applies.",
      },
    ],
  },
];

/** Flat list for mobile nav */
export const MORE_ITEMS: NavItem[] = RESOURCE_GROUPS.flatMap((group) => group.items);

/** Hero background — London street scene (Unsplash, no local asset required) */
export const HOME_HERO_IMAGE =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&crop=entropy&w=1400&q=82";
