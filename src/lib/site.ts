export type NavItem = { label: string; href: string };

/**
 * Cloudinary delivery URL. The asset must allow **unsigned** delivery (public) or the image will not load.
 * In Cloudinary: Dashboard → Settings → Security → “Restricted media types” / delivery, or set folder to public.
 */
const CLOUDINARY_LOGO_URL =
  "https://res.cloudinary.com/dnjaoqv42/image/upload/v1778020323/hf_20260316_194533_646e53ea-1b19-46ee-a852-28090cc321e7_1_w1vnzs.png";

export const SITE_LOGO_SRC =
  typeof process.env.NEXT_PUBLIC_LOGO_URL === "string" && process.env.NEXT_PUBLIC_LOGO_URL.trim().length > 0
    ? process.env.NEXT_PUBLIC_LOGO_URL.trim()
    : CLOUDINARY_LOGO_URL;

/** Layout size for next/image; adjust if your hosted asset has different proportions. */
export const SITE_LOGO_WIDTH = 190;
export const SITE_LOGO_HEIGHT = 48;

/** Access Stamp Venue Finder promo (16:9, Cloudinary). */
export const VENUE_FINDER_PROMO_VIDEO_SRC =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/v1780700109/accessstamp_16x9_correct_end_screen_osaycc.mp4";

/** First-frame poster for the Venue Finder promo video. */
export const VENUE_FINDER_PROMO_VIDEO_POSTER =
  "https://res.cloudinary.com/dtl4syjuh/video/upload/so_0,f_jpg,q_auto/accessstamp_16x9_correct_end_screen_osaycc.jpg";

/** Primary navigation — platform-first structure */
export const NAV_ITEMS: NavItem[] = [
  { label: "Find venues", href: "/venue-finder" },
  { label: "Guides & advice", href: "/advice" },
  { label: "Plan your visit", href: "/ai-toolkit/venue-fit-planner" },
  { label: "For venues", href: "/submit-venue" },
  { label: "Resources", href: "/directory" },
];

/** Secondary links for mobile menu and footer */
export const MORE_ITEMS: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "AI Assistant", href: "/ai" },
  { label: "AI Toolkit", href: "/ai-toolkit" },
  { label: "Help Cards", href: "/help-cards" },
  { label: "Laws & Guidance", href: "/laws-guidance" },
  { label: "Glossary", href: "/glossary" },
];

export const SUGGEST_VENUE_HREF = "/submit-venue";

/** Hero background — London street scene (Unsplash, no local asset required) */
export const HOME_HERO_IMAGE =
  "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&crop=entropy&w=1400&q=82";
