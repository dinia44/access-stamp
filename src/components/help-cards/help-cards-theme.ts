/** Help Cards page — warm premium toolkit tokens */

export const HC = {
  ink: "#132033",
  muted: "#5B6472",
  bg: "#FFF7EF",
  panel: "#fffaf4",
  border: "#EAD7C5",
  borderSoft: "#e5c8b2",
  orange: "#F97316",
  orangeHover: "#ea580c",
  blue: "#2563eb",
  gold: "#c8953d",
} as const;

export const HC_PAGE_BG =
  "bg-[#FFF7EF] [background:radial-gradient(circle_at_20%_0%,rgba(255,221,200,0.45),transparent_32%),linear-gradient(180deg,#FFF7EF_0%,#FFF0E4_52%,#FFF7EF_100%)]";

export const HC_CONTAINER =
  "mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 md:py-14 space-y-8 md:space-y-10";

export const HC_PAGE_SECTION =
  "rounded-[2rem] border border-[#ead2bf]/70 bg-white/55 shadow-[0_18px_60px_rgba(69,42,18,0.06)] backdrop-blur";

export const HC_IMPORTANT_SECTION =
  "rounded-[2.25rem] border border-[#e8c6ad] bg-[#fffaf4]/90 shadow-[0_26px_90px_rgba(69,42,18,0.10)]";

export const HC_INNER_CARD =
  "rounded-[1.35rem] border border-[#ead2bf]/70 bg-white/75 shadow-sm";

export const HC_SOFT_SURFACE = "rounded-[1.25rem] bg-white/55";

export const HC_SECTION_PADDING = "p-5 sm:p-6 lg:p-8";

export const HC_COMPACT_PADDING = "p-4 sm:p-5";

export const HC_CARD_PADDING = "p-5";

export const HC_FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef5b2a]/25 focus-visible:ring-offset-2";

export const HC_HERO_TITLE =
  "text-[clamp(2.5rem,5.5vw,4.5rem)] font-black leading-[1.02] tracking-[-0.05em] text-[#132033]";

export const HC_SECTION_TITLE =
  "text-[clamp(1.75rem,2.8vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#132033]";

export const HC_BODY = "text-base leading-[1.65] text-[#17212b]";

export const HC_MUTED = "text-lg leading-8 text-[#5f6b76]";

export const HC_MUTED_SM = "text-sm leading-6 text-[#5f6b76]";

export const HC_EYEBROW = "text-xs font-bold uppercase tracking-[0.16em] text-[#F97316]";

export const HC_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#F97316] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(249,115,22,0.28)] transition hover:bg-[#ea580c] focus:outline-none focus:ring-4 focus:ring-[#F97316]/25 ${HC_FOCUS}`;

export const HC_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#EAD7C5] bg-white px-5 py-3 text-sm font-bold text-[#132033] transition hover:border-[#F97316]/50 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/15 ${HC_FOCUS}`;

export const HC_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#5f6b76] transition hover:bg-white/60 focus:outline-none focus:ring-4 focus:ring-[#ef5b2a]/15 ${HC_FOCUS}`;

export const HC_INPUT = `mt-2 h-12 min-h-[44px] w-full rounded-2xl border border-[#d9bca4] bg-white px-4 text-sm text-[#17212b] outline-none transition focus:border-[#ef5b2a] focus:ring-4 focus:ring-[#ef5b2a]/15 ${HC_FOCUS}`;

/** @deprecated Use HC_PAGE_SECTION + HC_SECTION_PADDING */
export const HC_PANEL = `${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`;

/** @deprecated Use HC_IMPORTANT_SECTION */
export const HC_FEATURED_PANEL = HC_IMPORTANT_SECTION;

/** @deprecated Use HC_INNER_CARD or browse card classes */
export const HC_GRID_CARD =
  "rounded-[1.6rem] border border-[#ead2bf]/80 bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ef5b2a]/35 hover:shadow-[0_18px_50px_rgba(69,42,18,0.09)]";

export const HC_BROWSE_CARD =
  "group flex min-h-[260px] flex-col rounded-[1.6rem] border border-[#ead2bf]/80 bg-white/75 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#ef5b2a]/35 hover:shadow-[0_18px_50px_rgba(69,42,18,0.09)]";

export const HC_STEP_CARD =
  "rounded-[1.5rem] border border-[#ead2bf]/80 bg-white/70 p-5 shadow-sm";

export const HC_NOTICE = `${HC_PAGE_SECTION} ${HC_COMPACT_PADDING}`;

export const HC_PREVIEW_CARD =
  "rounded-[1.75rem] border border-[#efc8b2] bg-white p-5 sm:p-6 shadow-[0_20px_60px_rgba(53,30,12,0.10)]";

export function hcChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center rounded-full px-5 text-sm font-bold transition ${HC_FOCUS}`;
  return active
    ? `${base} bg-[#17212b] text-white shadow-sm`
    : `${base} border border-[#e2c5ae] bg-white/70 text-[#17212b] hover:border-[#ef5b2a]/60 hover:bg-white`;
}
