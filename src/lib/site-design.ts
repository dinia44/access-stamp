/** Site-wide premium design tokens — warm ivory, burnt orange, olive accents */

export const SITE_COLORS = {
  ink: "#13201F",
  textMid: "#2A3836",
  muted: "#5E6A66",
  primary: "#F04A16",
  primaryHover: "#D93E10",
  secondary: "#59682A",
  secondaryHover: "#45521F",
  page: "#FFF8F1",
  pageAlt: "#FFF3E8",
  section: "#FFF0E4",
  border: "#F1D8C7",
  borderMid: "#E8C4A8",
  white: "#FFFFFF",
} as const;

export const SITE_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4";

export const SITE_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl bg-[#F04A16] px-6 text-sm font-semibold text-white shadow-sm shadow-[#F04A16]/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D93E10] hover:shadow-lg hover:shadow-[#F04A16]/25 ${SITE_FOCUS}`;

export const SITE_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-[#E8C4A8] bg-white px-6 text-sm font-semibold text-[#13201F] transition-all duration-200 hover:border-[#F04A16]/40 hover:bg-[#FFF3E8] hover:text-[#13201F] ${SITE_FOCUS}`;

export const SITE_CARD =
  "rounded-2xl border border-[#F1D8C7] bg-white/95 shadow-lg shadow-[#F04A16]/[0.05] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#E8C4A8] hover:shadow-xl hover:shadow-[#F04A16]/10";

export const SITE_PANEL =
  "rounded-3xl border border-[#F1D8C7]/80 bg-white/95 shadow-xl shadow-[#F04A16]/8 backdrop-blur-xl";

export const SITE_SECTION = "border-t border-[#F1D8C7]";

export const SITE_SECTION_ALT = `${SITE_SECTION} bg-[#FFF3E8]`;

export const SITE_SECTION_PANEL = `${SITE_SECTION} bg-[#FFF0E4]`;

export const SITE_PAGE_BG = "bg-[#FFF8F1] text-[#13201F]";

export const SITE_HERO_GRADIENT = "bg-gradient-to-b from-[#FFE8D6] via-[#FFF8F1] to-[#FFF3E8]";
