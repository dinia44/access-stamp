/** Homepage tokens — aligned with design-system */

export {
  AS as HOME_COLORS,
  AS_PAGE as HOME_PAGE_SHELL,
  AS_SECTION as HOME_SECTION,
  AS_SECTION_TIGHT as HOME_SECTION_ALT,
  AS_SECTION as HOME_SECTION_PANEL,
  AS_CARD as HOME_PANEL,
  AS_PANEL as HOME_GLASS_PANEL,
  AS_FOCUS as HOME_FOCUS,
  AS_INPUT as HOME_INPUT,
  AS_BTN_PRIMARY as HOME_BTN_PRIMARY,
  AS_BTN_SECONDARY as HOME_BTN_SECONDARY,
  AS_BTN_GHOST as HOME_BTN_GHOST,
  asChipClass as homeChipClass,
} from "@/lib/design-system";

export function homeTabClass(active: boolean) {
  const base = `inline-flex min-h-[44px] shrink-0 items-center justify-center border-b-2 px-2 pb-3 pt-1 text-sm font-semibold transition-all duration-200 sm:px-3 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#2563EB] focus-visible:outline-offset-4`;
  return active
    ? `${base} border-[#2563EB] text-[#2563EB]`
    : `${base} border-transparent text-[#617080] hover:text-[#102033]`;
}
