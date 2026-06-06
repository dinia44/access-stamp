/** Shared dark homepage palette and utility classes */

export const HOME_COLORS = {
  pageBase: "#030B1A",
  heroNavy: "#061A3A",
  darkNavy: "#04122B",
  primaryBlue: "#2563EB",
  accentCyan: "#22D3EE",
  accentPurple: "#8B5CF6",
  textPrimary: "#F8FAFC",
  textSecondary: "#E2E8F0",
  textMuted: "#CBD5E1",
} as const;

export const HOME_PAGE_SHELL = "min-h-screen bg-[#030B1A] text-[#F8FAFC]";

export const HOME_SECTION = "border-t border-white/5 py-16";

export const HOME_SECTION_ALT = "border-t border-white/5 bg-[#061224] py-16";

export const HOME_SECTION_PANEL = "border-t border-white/5 bg-slate-950/50 py-16";

export const HOME_PANEL =
  "rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-sm shadow-xl shadow-black/20";

export const HOME_GLASS_PANEL =
  "rounded-3xl border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-2xl shadow-black/30";

export const HOME_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#22d3ee] focus-visible:outline-offset-4";

export const HOME_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-base text-white placeholder:text-[#A8B8CC] transition-all duration-200 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-500/15 ${HOME_FOCUS}`;

export const HOME_BTN_PRIMARY = `inline-flex min-h-[44px] h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg ${HOME_FOCUS}`;

export const HOME_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 text-base font-semibold text-[#F8FAFC] backdrop-blur transition-all duration-200 hover:bg-white/10 ${HOME_FOCUS}`;

export function homeChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} border-blue-600 bg-blue-600 text-white shadow-sm`
    : `${base} border-white/10 bg-white/5 text-[#E2E8F0] hover:border-white/20 hover:bg-white/10 hover:text-white`;
}

export function homeTabClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-5 text-base font-semibold transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} bg-blue-600 text-white shadow-sm`
    : `${base} border border-white/10 bg-white/5 text-[#E2E8F0] hover:border-white/20 hover:text-white`;
}
