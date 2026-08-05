import type { HelpCard, HelpCardVariant } from "@/data/help-cards/types";
import { formatReviewDate, isValidIsoDate } from "@/lib/help-cards/format";
import { authorityLabel, isAuthoritativeSource } from "@/lib/help-cards/authority";

export function HelpCardReviewMetadata({
  card,
  variant,
  sourcesHref = "#official-sources",
}: {
  card: HelpCard;
  variant: HelpCardVariant;
  sourcesHref?: string;
}) {
  const hasReviewDate = isValidIsoDate(variant.reviewedAt);
  const highStakes = Boolean(card.highStakes);
  const hasAuthoritative = card.sources.some((source) => isAuthoritativeSource(source.authorityType));
  const authorityTypes = Array.from(new Set(card.sources.map((source) => source.authorityType)));

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold text-[var(--color-ink)]">Applies to</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">{variant.contextLabel}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[var(--color-ink)]">Last reviewed</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">
            {hasReviewDate && variant.reviewedAt ? (
              <time dateTime={variant.reviewedAt}>{formatReviewDate(variant.reviewedAt)}</time>
            ) : (
              <span>Unavailable{highStakes ? " — check official sources before relying on this card" : ""}</span>
            )}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-[var(--color-ink)]">Authority</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">
            {authorityTypes.map((type) => authorityLabel(type)).join(" · ")}
            {". "}
            <a href={sourcesHref} className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline">
              Check the latest official information
            </a>
          </dd>
        </div>
      </dl>
      {highStakes && !hasAuthoritative ? (
        <p className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] px-3 py-2 text-sm leading-6 text-[var(--color-ink)]">
          This high-stakes card does not yet have a verified official source. Treat it as a prompt only and
          check the official information.
        </p>
      ) : null}
      {highStakes ? (
        <p className="mt-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-2 text-sm leading-6 text-[var(--color-ink)]">
          This is not an official document and does not prove entitlement, legal status or eligibility.
        </p>
      ) : null}
    </div>
  );
}
