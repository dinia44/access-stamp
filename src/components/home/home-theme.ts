/** Shared warm homepage palette — charcoal text, burnt orange CTAs, olive accents */

export const HOME_COLORS = {
  pageBase: "#FFF8F1",
  pageAlt: "#FFF3E8",
  pageSection: "#FFF0E4",
  heroTop: "#FFE8D6",
  heroMid: "#FFF8F1",
  heroBottom: "#FFF3E8",
  primary: "#F04A16",
  primaryHover: "#D93E10",
  secondary: "#59682A",
  secondaryHover: "#45521F",
  textPrimary: "#13201F",
  textSecondary: "#2A3836",
  textMuted: "#5E6A66",
  borderLight: "#F1D8C7",
  borderMid: "#E8C4A8",
  success: "#2F7D32",
} as const;

export const HOME_PAGE_SHELL = "min-h-screen bg-[#FFF8F1] text-[#13201F]";

export const HOME_SECTION = "border-t border-[#F1D8C7] py-16";

export const HOME_SECTION_ALT = "border-t border-[#F1D8C7] bg-[#FFF3E8] py-16";

export const HOME_SECTION_PANEL = "border-t border-[#F1D8C7] bg-[#FFF0E4] py-16";

export const HOME_PANEL =
  "rounded-2xl border border-[#F1D8C7] bg-white shadow-lg shadow-[#F04A16]/[0.05]";

export const HOME_GLASS_PANEL =
  "rounded-3xl border border-[#F1D8C7]/80 bg-white/95 shadow-xl shadow-[#F04A16]/8 backdrop-blur-xl";

export const HOME_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4";

export const HOME_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-[#E8C4A8] bg-white px-4 text-base text-[#13201F] placeholder:text-[#5E6A66]/80 transition-all duration-200 focus:border-[#F04A16] focus:outline-none focus:ring-4 focus:ring-[#F04A16]/15 ${HOME_FOCUS}`;

export const HOME_BTN_PRIMARY = `inline-flex min-h-[44px] h-14 items-center justify-center gap-2 rounded-2xl bg-[#F04A16] px-6 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#D93E10] hover:shadow-lg hover:shadow-[#F04A16]/25 ${HOME_FOCUS}`;

export const HOME_BTN_SECONDARY = `inline-flex min-h-[44px] h-14 items-center justify-center gap-2 rounded-2xl bg-[#59682A] px-6 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#45521F] hover:shadow-lg hover:shadow-[#59682A]/20 ${HOME_FOCUS}`;

export const HOME_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-[#E8C4A8] bg-white px-5 text-base font-semibold text-[#13201F] transition-all duration-200 hover:border-[#F04A16]/40 hover:bg-[#FFF3E8] hover:text-[#13201F] ${HOME_FOCUS}`;

export function homeChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} border-[#F04A16] bg-[#FFE2D3] text-[#13201F] shadow-sm shadow-[#F04A16]/10`
    : `${base} border-[#F1D8C7] bg-white text-[#2A3836] hover:border-[#E8C4A8] hover:bg-[#FFF3E8] hover:text-[#13201F]`;
}

export function homeTabClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center border-b-2 px-2 pb-3 pt-1 text-sm font-semibold transition-all duration-200 sm:px-3 ${HOME_FOCUS}`;
  return active
    ? `${base} border-[#F04A16] text-[#F04A16]`
    : `${base} border-transparent text-[#5E6A66] hover:text-[#13201F]`;
}
