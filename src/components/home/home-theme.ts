/** Shared dark homepage palette — navy, blue, and cyan only (no white/grey surfaces) */

export const HOME_COLORS = {
  pageBase: "#071E3D",
  pageMid: "#0A2A52",
  pageBright: "#0D3568",
  pageGlow: "#103B6E",
  heroTop: "#0A2A52",
  heroMid: "#0D3568",
  heroBottom: "#0F3D75",
  primaryBlue: "#2563EB",
  accentCyan: "#22D3EE",
  accentPurple: "#8B5CF6",
  textPrimary: "#E0F7FF",
  textSecondary: "#BAE6FD",
  textMuted: "#7DD3FC",
} as const;

export const HOME_PAGE_SHELL = "min-h-screen bg-[#071E3D] text-[#E0F7FF]";

export const HOME_SECTION = "border-t border-[#22D3EE]/10 py-16";

export const HOME_SECTION_ALT = "border-t border-[#22D3EE]/10 bg-[#0A2A52] py-16";

export const HOME_SECTION_PANEL = "border-t border-[#22D3EE]/10 bg-[#0D3568]/55 py-16";

export const HOME_PANEL =
  "rounded-2xl border border-[#22D3EE]/15 bg-[#103B6E]/70 backdrop-blur-sm shadow-xl shadow-[#030B1A]/30";

export const HOME_GLASS_PANEL =
  "rounded-3xl border border-[#22D3EE]/20 bg-[#0D3568]/75 backdrop-blur-xl shadow-2xl shadow-[#030B1A]/35";

export const HOME_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#22d3ee] focus-visible:outline-offset-4";

export const HOME_INPUT = `h-14 min-h-[44px] w-full rounded-2xl border border-[#2563EB]/35 bg-[#0A2A52]/80 px-4 text-base text-[#E0F7FF] placeholder:text-[#38BDF8]/70 transition-all duration-200 focus:border-[#22D3EE] focus:outline-none focus:ring-4 focus:ring-[#22D3EE]/20 ${HOME_FOCUS}`;

export const HOME_BTN_PRIMARY = `inline-flex min-h-[44px] h-14 items-center justify-center rounded-2xl bg-blue-600 px-6 text-base font-semibold text-[#E0F7FF] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-lg hover:shadow-[#2563EB]/30 ${HOME_FOCUS}`;

export const HOME_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#22D3EE]/30 bg-[#2563EB]/15 px-5 text-base font-semibold text-[#E0F7FF] backdrop-blur transition-all duration-200 hover:border-[#22D3EE]/50 hover:bg-[#2563EB]/25 ${HOME_FOCUS}`;

export function homeChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} border-blue-600 bg-blue-600 text-[#E0F7FF] shadow-sm shadow-[#2563EB]/25`
    : `${base} border-[#2563EB]/30 bg-[#0D3568]/50 text-[#BAE6FD] hover:border-[#22D3EE]/40 hover:bg-[#2563EB]/20 hover:text-[#E0F7FF]`;
}

export function homeTabClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full px-5 text-base font-semibold transition-all duration-200 ${HOME_FOCUS}`;
  return active
    ? `${base} bg-blue-600 text-[#E0F7FF] shadow-sm shadow-[#2563EB]/25`
    : `${base} border border-[#2563EB]/30 bg-[#0D3568]/50 text-[#BAE6FD] hover:border-[#22D3EE]/40 hover:text-[#E0F7FF]`;
}
