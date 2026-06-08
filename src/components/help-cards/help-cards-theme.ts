/** Help Cards page — warm premium toolkit tokens */

export const HC = {
  ink: "#17212b",
  muted: "#5f6b76",
  bg: "#fbf3ea",
  panel: "#fffaf4",
  border: "#ead2bf",
  borderSoft: "#e5c8b2",
  orange: "#ef5b2a",
  orangeHover: "#d94d22",
  blue: "#2563eb",
  gold: "#c8953d",
} as const;

export const HC_PAGE_BG =
  "bg-[#fbf3ea] [background:radial-gradient(circle_at_top_right,rgba(255,109,64,0.14),transparent_34%),radial-gradient(circle_at_8%_20%,rgba(37,99,235,0.08),transparent_28%),linear-gradient(180deg,#fbf3ea_0%,#f8efe4_48%,#f6ebdf_100%)]";

export const HC_CONTAINER = "mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10";

export const HC_FOCUS =
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef5b2a]/25 focus-visible:ring-offset-2";

export const HC_HERO_TITLE =
  "text-[clamp(2.6rem,5vw,5.2rem)] font-black leading-[0.95] tracking-[-0.06em] text-[#17212b]";

export const HC_SECTION_TITLE =
  "text-[clamp(1.6rem,2.5vw,2.4rem)] font-extrabold leading-none tracking-[-0.04em] text-[#17212b]";

export const HC_BODY = "text-base leading-[1.65] text-[#17212b]";

export const HC_MUTED = "text-base leading-[1.65] text-[#5f6b76]";

export const HC_EYEBROW = "text-xs font-bold uppercase tracking-[0.16em] text-[#ef5b2a]";

export const HC_BTN_PRIMARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#ef5b2a] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(239,91,42,0.28)] transition hover:bg-[#d94d22] focus:outline-none focus:ring-4 focus:ring-[#ef5b2a]/25 ${HC_FOCUS}`;

export const HC_BTN_SECONDARY = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#d8bba3] bg-white/75 px-5 py-3 text-sm font-bold text-[#17212b] transition hover:border-[#ef5b2a]/50 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#ef5b2a]/15 ${HC_FOCUS}`;

export const HC_BTN_GHOST = `inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#5f6b76] transition hover:bg-white/60 focus:outline-none focus:ring-4 focus:ring-[#ef5b2a]/15 ${HC_FOCUS}`;

export const HC_INPUT = `mt-2 h-12 min-h-[44px] w-full rounded-2xl border border-[#ead2bf] bg-white/90 px-4 text-base text-[#17212b] placeholder:text-[#5f6b76]/75 transition focus:border-[#ef5b2a] focus:outline-none focus:ring-4 focus:ring-[#ef5b2a]/20 ${HC_FOCUS}`;

export const HC_PANEL =
  "rounded-[2rem] border border-[#ead2bf] bg-white/70 p-4 shadow-sm sm:p-5";

export const HC_FEATURED_PANEL =
  "rounded-[2rem] border border-[#ead2bf]/80 bg-[#fffaf4]/88 p-5 shadow-[0_24px_80px_rgba(69,42,18,0.08)] backdrop-blur sm:p-8 lg:p-10";

export const HC_GRID_CARD =
  "rounded-[1.5rem] border border-[#ead2bf] bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg";

export const HC_NOTICE =
  "rounded-2xl border border-[#ead2bf] bg-white/65 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6";

export function hcChipClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 text-sm font-bold transition ${HC_FOCUS}`;
  return active
    ? `${base} border-[#17212b] bg-[#17212b] text-white`
    : `${base} border-[#e5c8b2] bg-white/70 text-[#17212b] hover:border-[#ef5b2a]/60`;
}
