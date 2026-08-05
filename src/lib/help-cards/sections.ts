export const HELP_CARD_SECTIONS = [
  { id: "what-you-can-do", label: "What you can do" },
  { id: "conditions", label: "Conditions and limits" },
  { id: "evidence", label: "What to carry" },
] as const;

export type HelpCardSectionId = (typeof HELP_CARD_SECTIONS)[number]["id"];

export function helpCardSectionLabel(id: string): string {
  return HELP_CARD_SECTIONS.find((section) => section.id === id)?.label ?? id;
}
