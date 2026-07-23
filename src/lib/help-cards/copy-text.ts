import type { HelpCard } from "@/data/helpCardPacks";
import type { CoreHelpCard } from "@/data/core-help-cards";

export function getPackCardCopyLabel(card: HelpCard): string {
  switch (card.type) {
    case "carry-with":
      return "Copy checklist";
    case "evidence-summary":
    case "adjustment-request":
      return "Copy evidence summary";
    default:
      return "Copy wording";
  }
}

export function getPackCardCopyText(card: HelpCard): string {
  if (card.keyLine?.trim()) {
    const parts = [card.keyLine.trim()];
    if (card.body?.trim()) parts.push(card.body.trim());
    return parts.join("\n\n");
  }

  if (card.checklist?.length) {
    return card.checklist.map((item) => `• ${item}`).join("\n");
  }

  if (card.keyPoints?.length) {
    const parts: string[] = [];
    if (card.body?.trim()) parts.push(card.body.trim());
    parts.push(card.keyPoints.map((item) => `• ${item}`).join("\n"));
    return parts.join("\n\n");
  }

  return card.body?.trim() || card.shortDescription;
}

export function getCoreCardCopyText(card: CoreHelpCard): string {
  return card.script;
}
