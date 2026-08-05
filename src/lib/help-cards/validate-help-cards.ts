import type { HelpCard } from "@/data/help-cards/types";
import { HELP_CARDS } from "@/data/helpCards";
import { isPlaceholderValue, isValidIsoDate } from "@/lib/help-cards/format";
import { isAuthoritativeSource } from "@/lib/help-cards/authority";

export type HelpCardValidationIssue = {
  cardSlug: string;
  ruleId?: string;
  message: string;
  severity: "error" | "warning";
};

function urlIsUsable(url: string | undefined): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#" || isPlaceholderValue(trimmed)) return false;
  return trimmed.startsWith("http") || trimmed.startsWith("/");
}

export function validateHelpCards(cards: HelpCard[] = HELP_CARDS): HelpCardValidationIssue[] {
  const issues: HelpCardValidationIssue[] = [];
  const push = (cardSlug: string, message: string, ruleId?: string, severity: "error" | "warning" = "error") =>
    issues.push({ cardSlug, ruleId, message, severity });

  for (const card of cards) {
    const sourceIds = new Set(card.sources.map((source) => source.id));

    for (const source of card.sources) {
      if (!source.title?.trim()) push(card.slug, `Source ${source.id} is missing a title.`);
      if (!source.authority?.trim()) push(card.slug, `Source ${source.id} is missing an authority.`);
      if (!source.jurisdiction?.trim()) push(card.slug, `Source ${source.id} is missing a jurisdiction.`);
      if (!urlIsUsable(source.url)) push(card.slug, `Source ${source.id} has an empty or placeholder URL.`);
      if (!isValidIsoDate(source.checkedAt)) push(card.slug, `Source ${source.id} has an invalid checkedAt date.`);
      if (source.effectiveFrom && !isValidIsoDate(source.effectiveFrom))
        push(card.slug, `Source ${source.id} has an invalid effectiveFrom date.`);
    }

    if (card.variants.length === 0) push(card.slug, "Card has no variants.");

    for (const variant of card.variants) {
      const highStakesPublished = Boolean(card.highStakes) && card.publicationState === "published";

      if (isPlaceholderValue(variant.reviewedAt))
        push(card.slug, `Variant ${variant.id} has a placeholder reviewedAt value.`);
      if (variant.reviewedAt && !isPlaceholderValue(variant.reviewedAt) && !isValidIsoDate(variant.reviewedAt))
        push(card.slug, `Variant ${variant.id} has an invalid reviewedAt date.`);
      if (highStakesPublished && !isValidIsoDate(variant.reviewedAt))
        push(card.slug, `High-stakes published card variant ${variant.id} requires a valid reviewedAt date.`);

      for (const rule of variant.rules) {
        for (const value of [rule.headline, rule.plainEnglish, rule.applicability]) {
          if (isPlaceholderValue(value)) push(card.slug, `Rule has a placeholder value.`, rule.id);
        }
        if (!rule.applicability?.trim()) push(card.slug, "Rule is missing applicability.", rule.id);
        if (rule.sourceIds.length === 0) push(card.slug, "Rule has no source.", rule.id);
        for (const id of rule.sourceIds) {
          if (!sourceIds.has(id)) push(card.slug, `Rule references unknown source "${id}".`, rule.id);
        }
        if (card.highStakes) {
          const hasAuthoritative = rule.sourceIds
            .map((id) => card.sources.find((source) => source.id === id))
            .some((source) => source && isAuthoritativeSource(source.authorityType));
          if (!hasAuthoritative)
            push(card.slug, "High-stakes rule requires an official or primary authoritative source.", rule.id);
        }
      }
    }
  }

  return issues;
}

export function assertHelpCardsValid(cards: HelpCard[] = HELP_CARDS): void {
  const errors = validateHelpCards(cards).filter((issue) => issue.severity === "error");
  if (errors.length === 0) return;
  const details = errors
    .map((issue) => `- ${issue.cardSlug}${issue.ruleId ? ` / ${issue.ruleId}` : ""}: ${issue.message}`)
    .join("\n");
  throw new Error(`Help Cards validation failed:\n${details}`);
}
