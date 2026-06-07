/** Site-wide premium design tokens — navy, blue, pale blue, white, cyan accents */

export const SITE_COLORS = {
  navy: "#0B1D3A",
  navyMid: "#1E3A5F",
  muted: "#3B6B9A",
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  accent: "#0891B2",
  page: "#EFF6FF",
  pageAlt: "#F8FBFF",
  section: "#EEF6FC",
  border: "#BFDBFE",
  borderMid: "#93C5FD",
  white: "#FFFFFF",
} as const;

export const SITE_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4";

export const SITE_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center rounded-2xl bg-blue-600 px-6 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 ${SITE_FOCUS}`;

export const SITE_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#93C5FD] bg-white px-6 text-sm font-semibold text-[#1E3A5F] transition-all duration-200 hover:border-[#2563EB]/40 hover:bg-[#EFF6FF] hover:text-[#0B1D3A] ${SITE_FOCUS}`;

export const SITE_CARD =
  "rounded-2xl border border-[#BFDBFE] bg-white/95 shadow-lg shadow-[#2563EB]/[0.06] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93C5FD] hover:shadow-xl hover:shadow-[#2563EB]/10";

export const SITE_PANEL =
  "rounded-3xl border border-[#93C5FD]/50 bg-white/95 shadow-xl shadow-[#2563EB]/10 backdrop-blur-xl";

export const SITE_SECTION = "border-t border-[#BFDBFE]";

export const SITE_SECTION_ALT = `${SITE_SECTION} bg-[#F8FBFF]`;

export const SITE_SECTION_PANEL = `${SITE_SECTION} bg-[#EEF6FC]`;

export const SITE_PAGE_BG = "bg-[#EFF6FF] text-[#0B1D3A]";

export const SITE_HERO_GRADIENT = "bg-gradient-to-b from-[#DBEAFE] via-[#EFF6FF] to-[#F8FBFF]";
