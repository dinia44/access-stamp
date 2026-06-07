export type NavItem = { label: string; href: string };

/**
 * Cloudinary delivery URL for the Access Stamp wordmark (icon + stacked text).
 * Override with NEXT_PUBLIC_LOGO_URL if needed.
 */
const CLOUDINARY_LOGO_URL =
  "https://res.cloudinary.com/dtl4syjuh/image/upload/q_auto/f_auto/v1780836346/access-stamp/brand/access-stamp-logo-2026.png";

export const SITE_LOGO_SRC =
  typeof process.env.NEXT_PUBLIC_LOGO_URL === "string" && process.env.NEXT_PUBLIC_LOGO_URL.trim().length > 0
    ? process.env.NEXT_PUBLIC_LOGO_URL.trim()
    : CLOUDINARY_LOGO_URL;

/** Intrinsic logo dimensions (1083×1453); layout uses max-height + auto width. */
export const SITE_LOGO_WIDTH = 1083;
export const SITE_LOGO_HEIGHT = 1453;

/** Access Stamp Venue Finder promo (16:9, Cloudinary). */
export const VENUE_FINDER_PROMO_VIDEO_SRC =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/v1780700109/accessstamp_16x9_correct_end_screen_osaycc.mp4";

/** First-frame poster for the Venue Finder promo video. */
export const VENUE_FINDER_PROMO_VIDEO_POSTER =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/so_0,f_jpg,q_auto/accessstamp_16x9_correct_end_screen_osaycc.jpg";

/** Primary nav — matches website build prompt */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Advice Hub", href: "/advice" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/** Resources dropdown — grouped for homepage header */
export type ResourceGroup = { label: string; items: NavItem[] };

export const RESOURCE_GROUPS: ResourceGroup[] = [
  {
    label: "AI Tools",
    items: [{ label: "AI Toolkit", href: "/ai-toolkit" }],
  },
  {
    label: "Reference",
    items: [
      { label: "Help Cards", href: "/help-cards" },
      { label: "Directory", href: "/directory" },
      { label: "Glossary", href: "/glossary" },
      { label: "Laws & Guidance", href: "/laws-guidance" },
    ],
  },
];

/** Flat list for mobile nav */
export const MORE_ITEMS: NavItem[] = RESOURCE_GROUPS.flatMap((group) => group.items);

/** Hero background — London street scene (Unsplash, no local asset required) */
export const HOME_HERO_IMAGE =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&crop=entropy&w=1400&q=82";
