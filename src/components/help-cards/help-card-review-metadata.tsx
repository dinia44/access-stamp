import type { HelpCardPack } from "@/data/helpCardPacks";
import { formatReviewDate, isValidIsoDate } from "@/lib/help-cards/format";

export function HelpCardReviewMetadata({
  pack,
  sourcesHref = "#official-sources",
}: {
  pack: HelpCardPack;
  sourcesHref?: string;
}) {
  const hasReviewDate = isValidIsoDate(pack.lastReviewed);
  const highStakes = Boolean(pack.highStakes || pack.urgency === "high");
  const hasOfficialSources = pack.cards.some((card) =>
    (card.sources ?? []).some((source) => Boolean(source.href?.trim())),
  );

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        {pack.jurisdiction ? (
          <div>
            <dt className="font-semibold text-[var(--color-ink)]">Jurisdiction</dt>
            <dd className="mt-1 text-[var(--color-text-muted)]">{pack.jurisdiction}</dd>
          </div>
        ) : null}
        <div>
          <dt className="font-semibold text-[var(--color-ink)]">Last reviewed</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">
            {hasReviewDate && pack.lastReviewed ? (
              <time dateTime={pack.lastReviewed}>{formatReviewDate(pack.lastReviewed)}</time>
            ) : (
              <span>
                Unavailable
                {highStakes ? " — check official sources before relying on this pack" : ""}
              </span>
            )}
          </dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="font-semibold text-[var(--color-ink)]">Source status</dt>
          <dd className="mt-1 text-[var(--color-text-muted)]">
            {hasOfficialSources && hasReviewDate ? (
              <>
                Checked against official sources.{" "}
                <a href={sourcesHref} className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline">
                  View official sources
                </a>
              </>
            ) : hasOfficialSources ? (
              <>
                Official sources are listed below. A full Access Stamp review date is not yet available.{" "}
                <a href={sourcesHref} className="font-semibold text-[var(--color-brand)] underline-offset-2 hover:underline">
                  View official sources
                </a>
              </>
            ) : (
              "Practical prompts only — no official source links are attached to this pack."
            )}
          </dd>
        </div>
      </dl>
      {highStakes ? (
        <p className="mt-4 rounded-[var(--radius-md)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] px-3 py-2 text-sm leading-6 text-[var(--color-ink)]">
          This is not an official document and does not prove entitlement, legal status or eligibility.
        </p>
      ) : null}
    </div>
  );
}
