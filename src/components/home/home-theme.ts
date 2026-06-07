/** Shared light-blue homepage palette — navy text, blue surfaces, cyan accents */

export const HOME_COLORS = {
  pageBase: "#EFF6FF",
  pageAlt: "#F8FBFF",
  pageSection: "#EEF6FC",
  heroTop: "#DBEAFE",
  heroMid: "#EFF6FF",
  heroBottom: "#F8FBFF",
  primaryBlue: "#2563EB",
  accentCyan: "#0891B2",
  accentPurple: "#7C3AED",
  textPrimary: "#0B1D3A",
  textSecondary: "#1E3A5F",
  textMuted: "#3B6B9A",
  borderLight: "#BFDBFE",
  borderMid: "#93C5FD",
} as const;

export const HOME_PAGE_SHELL = "min-h-screen bg-[#EFF6FF] text-[#0B1D3A]";

export const HOME_SECTION = "border-t border-[#BFDBFE] py-16";

export const HOME_SECTION_ALT = "border-t border-[#BFDBFE] bg-[#F8FBFF] py-16";

export const HOME_SECTION_PANEL = "border-t border-[#BFDBFE] bg-[#EEF6FC] py-16";

export const HOME_PANEL =
  "rounded-2xl border border-[#BFDBFE] bg-white shadow-lg shadow-[#2563EB]/[0.06]";

export const HOME_GLASS_PANEL =
  "rounded-3xl border border-[#93C5FD]/50 bg-white/95 shadow-xl shadow-[#2563EB]/10 backdrop-blur-xl";

export const HOME_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4";

export const HOME_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-[#93C5FD] bg-white px-4 text-base text-[#0B1D3A] placeholder:text-[#3B6B9A]/80 transition-all duration-200 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/15 ${HOME_FOCUS}`;

export const HOME_BTN_PRIMARY = `inline-flex min-h-[44px] h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-[#2563EB]/25 ${HOME_FOCUS}`;

export const HOME_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#93C5FD] bg-[#EFF6FF] px-5 text-base font-semibold text-[#1E3A5F] transition-all duration-200 hover:border-[#2563EB]/40 hover:bg-[#DBEAFE] hover:text-[#0B1D3A] ${HOME_FOCUS}`;

export function homeChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} border-blue-600 bg-blue-600 text-white shadow-sm shadow-[#2563EB]/20`
    : `${base} border-[#BFDBFE] bg-white text-[#1E3A5F] hover:border-[#93C5FD] hover:bg-[#EFF6FF] hover:text-[#0B1D3A]`;
}

export function homeTabClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl px-4 text-sm font-semibold transition-all duration-200 sm:px-5 ${HOME_FOCUS}`;
  return active
    ? `${base} bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25`
    : `${base} border border-[#BFDBFE] bg-white text-[#1E3A5F] hover:border-[#93C5FD] hover:bg-[#F8FBFF] hover:text-[#0B1D3A]`;
}
