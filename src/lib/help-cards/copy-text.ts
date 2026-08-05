import type { HelpCard, HelpCardVariant } from "@/data/help-cards/types";
import { helpCardSectionLabel } from "@/lib/help-cards/sections";
import { authorityLabel } from "@/lib/help-cards/authority";
import { HELP_CARD_SECTIONS } from "@/lib/help-cards/sections";
import { formatReviewDate, isValidIsoDate } from "@/lib/help-cards/format";

export function getHelpCardPlainText(card: HelpCard, variant: HelpCardVariant): string {
  const lines: string[] = [];
  lines.push(`Access Stamp — ${card.title}`);
  lines.push(card.summary);
  lines.push(`Context: ${variant.contextLabel}`);
  if (isValidIsoDate(variant.reviewedAt)) {
    lines.push(`Last reviewed: ${variant.reviewedAt}`);
  } else {
    lines.push("Last reviewed: unavailable — check official sources");
  }
  lines.push("");

  for (const section of HELP_CARD_SECTIONS) {
    const rules = variant.rules.filter((rule) => rule.section === section.id);
    if (rules.length === 0) continue;
    lines.push(`## ${helpCardSectionLabel(section.id)}`);
    for (const rule of rules) {
      lines.push(`- ${rule.headline}`);
      lines.push(`  ${rule.plainEnglish}`);
      lines.push(`  Applies to: ${rule.applicability}`);
      for (const condition of rule.conditions ?? []) lines.push(`  • ${condition}`);
      for (const exception of rule.exceptions ?? []) lines.push(`  (exception) ${exception}`);
      for (const item of rule.evidenceToCarry ?? []) lines.push(`  • ${item}`);
    }
    lines.push("");
  }

  const challenged = variant.rules.filter((rule) => rule.ifChallenged || rule.suggestedWording);
  if (challenged.length > 0) {
    lines.push("## If you are challenged");
    for (const rule of challenged) {
      if (rule.ifChallenged) lines.push(`- ${rule.ifChallenged}`);
      if (rule.suggestedWording) lines.push(`  "${rule.suggestedWording}"`);
    }
    lines.push("");
  }

  if (variant.confirm?.length) {
    lines.push("## What to confirm");
    for (const item of variant.confirm) lines.push(`- ${item}`);
    lines.push("");
  }

  if (card.sources.length > 0) {
    lines.push("## Official sources");
    for (const source of card.sources) {
      const checked = isValidIsoDate(source.checkedAt) ? ` (link checked ${formatReviewDate(source.checkedAt)})` : "";
      lines.push(`- ${source.title} — ${authorityLabel(source.authorityType)}, ${source.jurisdiction}${checked}`);
      lines.push(`  ${source.url}`);
    }
    lines.push("");
  }

  lines.push(
    card.disclaimer ||
      "Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice. Always check the official source before relying on a card.",
  );

  return lines.join("\n");
}
