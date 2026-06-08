/** Access Stamp — premium disability-led design system (navy · blue · gold · cream) */

export const AS = {
  navy: "#071826",
  navySecondary: "#0B2233",
  blue: "#2563EB",
  blueSoft: "#60A5FA",
  gold: "#D4A84F",
  cream: "#F8F5EE",
  white: "#FFFFFF",
  ink: "#102033",
  text: "#102033",
  muted: "#617080",
  border: "rgba(16, 32, 51, 0.12)",
  success: "#168A5B",
  successSoft: "#E8F5EF",
} as const;

export const AS_FOCUS =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2563EB] focus-visible:outline-offset-4";

export const AS_CONTAINER = "mx-auto w-full max-w-[1180px] px-4 sm:px-6";

export const AS_SECTION =
  "py-[clamp(4rem,8vw,7rem)] border-t border-[rgba(16,32,51,0.12)]";

export const AS_SECTION_TIGHT = "py-[clamp(2.5rem,5vw,4rem)] border-t border-[rgba(16,32,51,0.12)]";

export const AS_CARD = "rounded-2xl border border-[rgba(16,32,51,0.12)] bg-white p-[clamp(1.25rem,2vw,2rem)] shadow-[0_12px_40px_-20px_rgba(7,24,38,0.12)]";

export const AS_PANEL =
  "rounded-2xl border border-[rgba(16,32,51,0.12)] bg-white/95 p-[clamp(1.25rem,2vw,2rem)] shadow-[0_20px_50px_-24px_rgba(7,24,38,0.15)] backdrop-blur-xl";

export const AS_PAGE = "min-h-screen bg-[#F8F5EE] text-[#102033]";

export const AS_HERO_DISPLAY = "text-[clamp(3rem,7vw,6.25rem)] font-bold leading-[1.02] tracking-[-0.04em]";

export const AS_PAGE_H1 = "text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.035em]";

export const AS_SECTION_H2 = "text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.08] tracking-[-0.03em]";

export const AS_CARD_TITLE = "text-xl font-bold leading-snug sm:text-2xl";

export const AS_BODY = "text-base leading-7 sm:text-[1.0625rem]";

export const AS_LABEL = "text-sm font-semibold";

export const AS_EYEBROW = "text-xs font-bold uppercase tracking-[0.14em] text-[#2563EB]";

export const AS_INPUT = `h-12 min-h-[44px] w-full rounded-2xl border border-[rgba(16,32,51,0.18)] bg-white px-4 text-base text-[#102033] placeholder:text-[#617080]/80 transition-all duration-200 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/15 ${AS_FOCUS}`;

const BTN_BASE = `inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 ${AS_FOCUS}`;

/** Primary — one per section max */
export const AS_BTN_PRIMARY = `${BTN_BASE} min-h-[48px] bg-[#2563EB] px-6 text-base text-white shadow-sm shadow-[#2563EB]/20 hover:bg-[#1D4ED8] hover:shadow-lg hover:shadow-[#2563EB]/25`;

export const AS_BTN_PRIMARY_GOLD = `${BTN_BASE} min-h-[48px] bg-[#D4A84F] px-6 text-base text-[#071826] shadow-sm hover:brightness-105`;

export const AS_BTN_SECONDARY = `${BTN_BASE} min-h-[48px] border border-[rgba(16,32,51,0.18)] bg-[#F8F5EE] px-6 text-base text-[#102033] hover:border-[#2563EB]/30 hover:bg-white`;

export const AS_BTN_GHOST = `${BTN_BASE} min-h-[44px] px-1 text-base text-[#2563EB] hover:underline underline-offset-4`;

export const AS_BTN_SM = `${BTN_BASE} min-h-[40px] px-4 text-sm`;

export const AS_BTN_LG = `${BTN_BASE} min-h-[56px] px-8 text-base`;

export function asChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-all duration-200 ${AS_FOCUS}`;
  return active
    ? `${base} border-[#2563EB] bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/15`
    : `${base} border-[rgba(16,32,51,0.12)] bg-white text-[#102033] hover:border-[#2563EB]/25 hover:bg-[#F8F5EE]`;
}

export const AS_NAVY_BAND = "bg-[#071826] text-white";

export const AS_TRUST_STRIP =
  "rounded-2xl border border-[rgba(16,32,51,0.12)] bg-[#E8F5EF] px-4 py-3 text-sm font-medium text-[#102033]";
