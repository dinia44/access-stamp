import { helpCardPacks, type HelpCardPack } from "@/data/helpCardPacks";
import { isPlaceholderValue, isValidIsoDate } from "@/lib/help-cards/format";

export type HelpCardValidationIssue = {
  packSlug: string;
  cardId?: string;
  message: string;
  severity: "error" | "warning";
};

function packIsHighStakes(pack: HelpCardPack): boolean {
  return Boolean(pack.highStakes || pack.urgency === "high");
}

export function validateHelpCardPacks(packs: HelpCardPack[] = helpCardPacks): HelpCardValidationIssue[] {
  const issues: HelpCardValidationIssue[] = [];

  for (const pack of packs) {
    if (isPlaceholderValue(pack.lastReviewed)) {
      issues.push({
        packSlug: pack.slug,
        severity: "error",
        message: `Pack has placeholder lastReviewed value "${pack.lastReviewed}".`,
      });
    }

    if (packIsHighStakes(pack) && pack.lastReviewed && !isValidIsoDate(pack.lastReviewed)) {
      issues.push({
        packSlug: pack.slug,
        severity: "error",
        message: `High-stakes pack has invalid lastReviewed date "${pack.lastReviewed}".`,
      });
    }

    for (const card of pack.cards) {
      if (isPlaceholderValue(card.lastChecked)) {
        issues.push({
          packSlug: pack.slug,
          cardId: card.id,
          severity: "error",
          message: `Card has placeholder lastChecked value "${card.lastChecked}".`,
        });
      }

      if (card.lastChecked && !isPlaceholderValue(card.lastChecked) && !isValidIsoDate(card.lastChecked)) {
        issues.push({
          packSlug: pack.slug,
          cardId: card.id,
          severity: "error",
          message: `Card has invalid lastChecked date "${card.lastChecked}".`,
        });
      }

      for (const source of card.sources ?? []) {
        if (!source.label?.trim()) {
          issues.push({
            packSlug: pack.slug,
            cardId: card.id,
            severity: "error",
            message: "Official source is missing a label.",
          });
        }
        if (source.href !== undefined) {
          if (!source.href.trim() || source.href.trim() === "#" || isPlaceholderValue(source.href)) {
            issues.push({
              packSlug: pack.slug,
              cardId: card.id,
              severity: "error",
              message: `Official source "${source.label}" has an empty or placeholder URL.`,
            });
          }
        }
      }

      const highStakesCard =
        packIsHighStakes(pack) || card.type === "evidence-summary" || card.type === "emergency";

      if (highStakesCard && card.type === "evidence-summary") {
        const hasValidSource = (card.sources ?? []).some(
          (source) =>
            source.href && source.href.trim() && source.href.trim() !== "#" && !isPlaceholderValue(source.href),
        );
        if (!hasValidSource) {
          issues.push({
            packSlug: pack.slug,
            cardId: card.id,
            severity: "error",
            message: "High-stakes evidence card requires at least one valid official source URL.",
          });
        }
      }
    }
  }

  return issues;
}

export function assertHelpCardsValid(packs: HelpCardPack[] = helpCardPacks): void {
  const errors = validateHelpCardPacks(packs).filter((issue) => issue.severity === "error");
  if (errors.length === 0) return;

  const details = errors
    .map((issue) => `- ${issue.packSlug}${issue.cardId ? ` / ${issue.cardId}` : ""}: ${issue.message}`)
    .join("\n");
  throw new Error(`Help Cards validation failed:\n${details}`);
}
