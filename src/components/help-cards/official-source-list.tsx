import type { HelpCardSource } from "@/data/help-cards/types";
import { AuthorityLabel } from "@/components/help-cards/authority-label";
import { formatReviewDate, isValidIsoDate } from "@/lib/help-cards/format";

export function OfficialSourceList({
  sources,
  headingId,
}: {
  sources: HelpCardSource[];
  headingId?: string;
}) {
  if (sources.length === 0) return null;

  return (
    <ul className="list-none space-y-3 p-0" role="list" aria-labelledby={headingId}>
      {sources.map((source) => (
        <li
          key={source.id}
          className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3"
        >
          <a
            href={source.url}
            className="text-sm font-semibold text-[var(--color-brand)] underline underline-offset-4"
          >
            {source.title}
          </a>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <AuthorityLabel type={source.authorityType} authority={source.authority} />
            <span className="text-xs text-[var(--color-text-muted)]">{source.jurisdiction}</span>
            {source.reference ? (
              <span className="text-xs text-[var(--color-text-muted)]">{source.reference}</span>
            ) : null}
            {isValidIsoDate(source.checkedAt) ? (
              <span className="text-xs text-[var(--color-text-muted)]">
                Link checked <time dateTime={source.checkedAt}>{formatReviewDate(source.checkedAt)}</time>
              </span>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
