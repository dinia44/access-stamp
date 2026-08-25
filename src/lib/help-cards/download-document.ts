import type { HelpCard, HelpCardVariant } from "@/data/help-cards/types";
import type {
  HelpCardDownloadCopy,
  HelpCardDownloadDocument,
  HelpCardDownloadResolveResult,
} from "@/data/help-cards/download-types";
import { getHelpCardDownloadCopy } from "@/data/help-cards/download-copy";
import { AUTHORITY_ORDER, authorityLabel, isAuthoritativeSource } from "@/lib/help-cards/authority";
import { isPlaceholderValue, isValidIsoDate } from "@/lib/help-cards/format";
import { helpCardLiveUrl, toAbsolutePublicUrl } from "@/lib/help-cards/canonical-public-url";
import { helpCardDownloadFilename } from "@/lib/help-cards/download-filename";

export { helpCardDownloadFilename };

const DEFAULT_DISCLAIMER =
  "Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice. Always check the official source before relying on a card.";

export function downloadCopyIssues(copy: HelpCardDownloadCopy, card: HelpCard, variant: HelpCardVariant): string[] {
  const issues: string[] = [];
  if (!copy.title?.trim()) issues.push("Download copy is missing a title.");
  if (!copy.purpose?.trim()) issues.push("Download copy is missing a purpose.");
  if (!copy.keyMessage?.trim()) issues.push("Download copy is missing a key message.");
  if (!copy.actions?.length || copy.actions.some((item) => !item.trim())) {
    issues.push("Download copy is missing actions.");
  }
  if (!card.region?.trim()) issues.push("Card is missing a region.");
  if (!isValidIsoDate(variant.reviewedAt) || isPlaceholderValue(variant.reviewedAt)) {
    issues.push("Card is missing a valid review date.");
  }
  if (!card.sources.length) issues.push("Card is missing an official source.");
  const usableSources = card.sources.filter((source) => source.url?.trim() && source.url.trim() !== "#");
  if (usableSources.length === 0) issues.push("Card is missing an official source URL.");
  if (card.highStakes) {
    const hasAuthoritative = card.sources.some((source) => isAuthoritativeSource(source.authorityType));
    if (!hasAuthoritative) issues.push("High-stakes card needs an authoritative source.");
  }
  if (copy.suggestedWording && (!copy.suggestedWording.label?.trim() || !copy.suggestedWording.text?.trim())) {
    issues.push("Suggested wording is incomplete.");
  }
  return issues;
}

export function isDownloadCopyApproved(copy: HelpCardDownloadCopy): boolean {
  return copy.status === "reviewed" || copy.status === "published";
}

function classifyAuthority(card: HelpCard): string {
  const types = [...new Set(card.sources.map((source) => source.authorityType))];
  const ordered = AUTHORITY_ORDER.filter((type) => types.includes(type));
  if (ordered.length === 0) return "Needs confirmation";
  return ordered.map((type) => authorityLabel(type)).join("; ");
}

export function resolveHelpCardDownloadDocument(
  card: HelpCard | undefined,
  variant?: HelpCardVariant,
): HelpCardDownloadResolveResult {
  if (!card) {
    return { ok: false, reason: "missing-card", issues: ["Help Card was not found."] };
  }
  if (card.publicationState !== "published") {
    return { ok: false, reason: "unpublished-card", issues: ["Help Card is not published."] };
  }

  const activeVariant = variant ?? card.variants[0];
  if (!activeVariant) {
    return { ok: false, reason: "invalid", issues: ["Help Card has no variants."] };
  }

  const copy = getHelpCardDownloadCopy(card.slug);
  if (!copy) {
    return { ok: false, reason: "missing-copy", issues: ["Curated download copy has not been added."] };
  }
  if (!isDownloadCopyApproved(copy)) {
    return {
      ok: false,
      reason: "draft",
      issues: ["Curated download copy has not been approved for PDF or print."],
    };
  }

  const issues = downloadCopyIssues(copy, card, activeVariant);
  if (issues.length > 0) {
    return { ok: false, reason: "invalid", issues };
  }

  const live = helpCardLiveUrl(card.slug);
  const document: HelpCardDownloadDocument = {
    ...copy,
    slug: card.slug,
    category: card.category,
    appliesTo: card.region,
    authorityLabel: classifyAuthority(card),
    reviewedAt: activeVariant.reviewedAt!,
    sources: card.sources.map((source) => ({
      title: source.title,
      url: toAbsolutePublicUrl(source.url),
      publisher: source.authority,
      authorityType: source.authorityType,
    })),
    disclaimer: card.disclaimer?.trim() || DEFAULT_DISCLAIMER,
    liveUrl: live.url,
    liveUrlLabel: live.label,
  };

  return { ok: true, document };
}

export function validatePublishedDownloadDocuments(cards: HelpCard[]): string[] {
  const issues: string[] = [];
  for (const card of cards) {
    if (card.publicationState !== "published") continue;
    const result = resolveHelpCardDownloadDocument(card);
    if (!result.ok) {
      issues.push(`${card.slug}: ${result.issues.join(" ")}`);
    }
  }
  return issues;
}
