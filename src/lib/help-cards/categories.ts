export const HELP_CARD_TASK_CATEGORIES = [
  { id: "all", label: "All cards" },
  { id: "venues", label: "Venues" },
  { id: "work", label: "Work and interviews" },
  { id: "healthcare", label: "Healthcare and appointments" },
  { id: "driving", label: "Driving and parking" },
  { id: "care", label: "Care and support" },
  { id: "information", label: "Accessible information" },
] as const;

export type HelpCardTaskCategoryId = (typeof HELP_CARD_TASK_CATEGORIES)[number]["id"];

export function isHelpCardTaskCategoryId(value: string | null): value is HelpCardTaskCategoryId {
  return Boolean(value && HELP_CARD_TASK_CATEGORIES.some((category) => category.id === value));
}

export function helpCardTaskCategoryLabel(id: HelpCardTaskCategoryId): string {
  return HELP_CARD_TASK_CATEGORIES.find((category) => category.id === id)?.label ?? "All cards";
}
