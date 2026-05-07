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

/** Primary nav — matches website build prompt */
export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Advice Hub", href: "/advice" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

/** “More” dropdown — Education through Glossary */
export const MORE_ITEMS: NavItem[] = [
  { label: "Education", href: "/advice/education" },
  { label: "Transport", href: "/advice/transport" },
  { label: "Workplace", href: "/advice/workplace" },
  { label: "Travel", href: "/advice/travel" },
  { label: "Help Cards", href: "/help-cards" },
  { label: "Directory", href: "/directory" },
  { label: "Glossary", href: "/glossary" },
];

