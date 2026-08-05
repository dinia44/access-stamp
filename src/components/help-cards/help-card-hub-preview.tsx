import Link from "next/link";
import type { HelpCard } from "@/data/help-cards/types";
import { getHelpCardTopics } from "@/data/helpCards";
import { helpCardTaskCategoryLabel } from "@/lib/help-cards/categories";
import { formatReviewDate, isValidIsoDate } from "@/lib/help-cards/format";
import { isAuthoritativeSource } from "@/lib/help-cards/authority";

export function HelpCardHubPreview({ card }: { card: HelpCard }) {
  const topics = getHelpCardTopics(card).slice(0, 5);
  const reviewedAt = card.variants[0]?.reviewedAt;
  const hasReviewDate = isValidIsoDate(reviewedAt);
  const hasAuthoritative = card.sources.some((source) => isAuthoritativeSource(source.authorityType));

  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-pressed)]">
          {helpCardTaskCategoryLabel(card.categoryKey)}
        </span>
        <span className="text-xs font-medium text-[var(--color-text-muted)]">{card.region}</span>
      </div>

      <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{card.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{card.summary}</p>

      {topics.length ? (
        <ul className="mt-4 flex list-none flex-wrap gap-2 p-0" role="list">
          {topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}

      <p className="mt-4 text-xs text-[var(--color-text-muted)]">
        {hasAuthoritative ? "Source-backed" : "Practical prompt"}
        {" · "}
        {hasReviewDate && reviewedAt ? (
          <>
            reviewed <time dateTime={reviewedAt}>{formatReviewDate(reviewedAt)}</time>
          </>
        ) : (
          "review date unavailable"
        )}
      </p>

      <div className="mt-auto pt-5">
        <Link
          href={`/help-cards/${card.slug}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-brand)] bg-[var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Open {card.title}
        </Link>
      </div>
    </article>
  );
}
