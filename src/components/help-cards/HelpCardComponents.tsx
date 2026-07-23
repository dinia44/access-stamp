import Link from "next/link";
import type { HelpCard, HelpCardPack } from "@/data/helpCardPacks";
import { getPackCardTypes } from "@/data/helpCardPacks";
import { HelpCardCopyButton } from "@/components/help-cards/help-card-copy-button";
import { getPackCardCopyLabel, getPackCardCopyText } from "@/lib/help-cards/copy-text";
import { formatReviewDate, isPlaceholderValue, isValidIsoDate } from "@/lib/help-cards/format";
import { helpCardTaskCategoryLabel } from "@/lib/help-cards/categories";

const typeStyles: Record<
  string,
  {
    label: string;
    className: string;
  }
> = {
  "quick-script": {
    label: "Quick script",
    className: "border-[var(--color-brand)]/30 bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]",
  },
  "adjustment-request": {
    label: "Checklist",
    className: "border-[var(--color-information)]/30 bg-[var(--color-information-soft)] text-[var(--color-information)]",
  },
  "evidence-summary": {
    label: "Evidence summary",
    className: "border-[var(--color-trust)]/30 bg-[var(--color-trust-soft)] text-[var(--color-trust)]",
  },
  "carry-with": {
    label: "Checklist",
    className: "border-[var(--color-information)]/30 bg-[var(--color-information-soft)] text-[var(--color-information)]",
  },
  emergency: {
    label: "Urgent wording",
    className: "border-[var(--color-warning)]/40 bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  },
  "follow-up": {
    label: "Follow-up",
    className: "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)]",
  },
};

function CardTypeIcon({ type }: { type: HelpCard["type"] }) {
  const common = "h-4 w-4 shrink-0";
  if (type === "carry-with" || type === "adjustment-request") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 7h11M8 12h11M8 17h11M5 7h.01M5 12h.01M5 17h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "evidence-summary") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M7 4h7l3 3v13H7V4Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "emergency") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4 3.5 19h17L12 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 10v4M12 16.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 7h9a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H9l-4 4V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function CardTypePill({ type }: { type: HelpCard["type"] }) {
  const style = typeStyles[type] ?? typeStyles["quick-script"];

  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${style.className}`}
    >
      <CardTypeIcon type={type} />
      {style.label}
    </span>
  );
}

function CardPrimaryCopy({ card, dark = false }: { card: HelpCard; dark?: boolean }) {
  const label = getPackCardCopyLabel(card);
  return (
    <HelpCardCopyButton
      text={getPackCardCopyText(card)}
      label={label}
      accessibleName={`${label} for ${card.title}`}
      variant={dark ? "onDark" : "primary"}
      className="mt-6"
    />
  );
}

function SafeReviewDate({ value }: { value?: string }) {
  if (!value || isPlaceholderValue(value) || !isValidIsoDate(value)) {
    return <span>Review date unavailable — check official sources</span>;
  }
  return <time dateTime={value}>{formatReviewDate(value)}</time>;
}

export function HelpCardPackPreview({ pack }: { pack: HelpCardPack }) {
  const types = getPackCardTypes(pack).slice(0, 4);
  const hasReviewDate = isValidIsoDate(pack.lastReviewed);

  return (
    <article className="flex h-full flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-pressed)]">
          {helpCardTaskCategoryLabel(pack.categoryKey)}
        </span>
        <span className="text-sm text-[var(--color-text-muted)]">{pack.cards.length} cards</span>
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{pack.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{pack.description}</p>

      <ul className="mt-4 flex list-none flex-wrap gap-2 p-0" role="list">
        {types.map((type) => (
          <li
            key={type}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)]"
          >
            {type}
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-1 text-sm text-[var(--color-text-muted)]">
        {pack.jurisdiction ? <p>Jurisdiction: {pack.jurisdiction}</p> : null}
        {(pack.highStakes || pack.urgency === "high") && (
          <p>
            Last reviewed:{" "}
            {hasReviewDate && pack.lastReviewed ? (
              <time dateTime={pack.lastReviewed}>{formatReviewDate(pack.lastReviewed)}</time>
            ) : (
              "Unavailable — check official sources"
            )}
          </p>
        )}
      </div>

      <div className="mt-auto pt-5">
        <Link
          href={`/help-cards/${pack.slug}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-brand)] bg-[var(--color-brand)] px-4 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        >
          Open {pack.title}
        </Link>
      </div>
    </article>
  );
}

export function QuickScriptCard({ card }: { card: HelpCard }) {
  return (
    <article className="help-card-print-area rounded-[var(--radius-lg)] border border-[var(--color-brand)]/25 bg-[var(--color-brand-soft)] p-5 sm:p-7">
      <CardTypePill type={card.type} />
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{card.title}</h3>
      <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">{card.shortDescription}</p>

      {card.keyLine ? (
        <blockquote className="mt-5 max-w-[40rem] rounded-[var(--radius-md)] border border-[var(--color-brand)]/20 bg-[var(--color-surface)] p-4 text-lg font-medium leading-8 text-[var(--color-ink)]">
          {card.keyLine}
        </blockquote>
      ) : null}

      {card.body ? <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)]">{card.body}</p> : null}
      <CardPrimaryCopy card={card} />
    </article>
  );
}

export function AdjustmentRequestCard({ card }: { card: HelpCard }) {
  return (
    <article className="help-card-print-area rounded-[var(--radius-lg)] border border-[var(--color-information)]/25 bg-[var(--color-information-soft)] p-5 sm:p-7">
      <CardTypePill type={card.type} />
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{card.title}</h3>
      <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">{card.shortDescription}</p>

      {card.keyPoints ? (
        <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-[var(--color-information)]" role="list">
          {card.keyPoints.map((point) => (
            <li key={point} className="text-base leading-7 text-[var(--color-ink)]">
              {point}
            </li>
          ))}
        </ul>
      ) : null}

      <CardPrimaryCopy card={card} />
    </article>
  );
}

export function EvidenceSummaryCard({ card }: { card: HelpCard }) {
  const reviewValue =
    card.lastChecked && !isPlaceholderValue(card.lastChecked) && isValidIsoDate(card.lastChecked)
      ? card.lastChecked
      : undefined;

  return (
    <article className="help-card-print-area relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-trust)]/30 bg-[var(--color-trust-soft)] p-5 sm:p-7">
      <div className="mb-5 flex flex-col gap-3 border-b border-[var(--color-trust)]/20 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-trust)]">Access Stamp</p>
          <p className="mt-1 text-sm font-medium text-[var(--color-text-muted)]">Evidence summary card</p>
        </div>
        <div className="inline-flex w-fit rounded-full border border-[var(--color-trust)]/30 bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">
          Not a legal document
        </div>
      </div>

      <CardTypePill type={card.type} />
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)] sm:text-3xl">{card.title}</h3>

      {card.body ? (
        <p className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-trust)]/20 bg-[var(--color-surface)] p-4 text-base font-medium leading-7 text-[var(--color-ink)]">
          {card.body}
        </p>
      ) : null}

      {card.keyPoints ? (
        <div className="mt-5">
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">Key points</h4>
          <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-[var(--color-trust)]" role="list">
            {card.keyPoints.map((point) => (
              <li key={point} className="text-base leading-7 text-[var(--color-ink)]">
                {point}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 rounded-[var(--radius-md)] border border-[var(--color-trust)]/20 bg-[var(--color-surface)] p-4 sm:grid-cols-[1fr_auto]">
        {card.sources?.length ? (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-ink)]">Official sources</h4>
            <ul className="mt-3 list-disc space-y-2 pl-5" role="list">
              {card.sources.map((source) => (
                <li key={source.label}>
                  {source.href ? (
                    <a
                      href={source.href}
                      className="text-sm font-semibold leading-6 text-[var(--color-brand)] underline underline-offset-4"
                    >
                      {source.label}
                    </a>
                  ) : (
                    <span className="text-sm font-semibold leading-6 text-[var(--color-ink)]">{source.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Last checked</p>
          <p className="mt-2 text-sm font-semibold text-[var(--color-ink)]">
            <SafeReviewDate value={reviewValue} />
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-[var(--radius-md)] border border-[var(--color-warning)]/40 bg-[var(--color-warning-soft)] p-3 text-sm leading-6 text-[var(--color-ink)]">
        {card.disclaimer ||
          "Access Stamp provides practical prompts and source-backed summaries. This card is not legal, medical or financial advice. Always check the official source before relying on it."}
      </div>

      <CardPrimaryCopy card={card} />
    </article>
  );
}

export function CarryWithCard({ card }: { card: HelpCard }) {
  return (
    <article className="help-card-print-area rounded-[var(--radius-lg)] border border-[var(--color-information)]/25 bg-[var(--color-information-soft)] p-5 sm:p-7">
      <CardTypePill type={card.type} />
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{card.title}</h3>
      <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">{card.shortDescription}</p>

      {card.checklist ? (
        <ul className="mt-5 list-disc space-y-2 pl-5 marker:text-[var(--color-information)]" role="list">
          {card.checklist.map((item) => (
            <li key={item} className="text-base font-medium leading-7 text-[var(--color-ink)]">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      <CardPrimaryCopy card={card} />
    </article>
  );
}

export function EmergencyCard({ card }: { card: HelpCard }) {
  return (
    <article className="help-card-print-area rounded-[var(--radius-lg)] border border-[var(--color-warning)] bg-[var(--color-warning-soft)] p-5 sm:p-7">
      <CardTypePill type={card.type} />
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-ink)]">{card.title}</h3>
      <p className="mt-2 text-base leading-7 text-[var(--color-text-muted)]">{card.shortDescription}</p>

      {card.keyLine ? (
        <blockquote className="mt-5 max-w-[40rem] rounded-[var(--radius-md)] border border-[var(--color-warning)]/40 bg-[var(--color-surface)] p-4 text-xl font-semibold leading-8 text-[var(--color-ink)]">
          {card.keyLine}
        </blockquote>
      ) : null}

      <CardPrimaryCopy card={card} />
    </article>
  );
}

export function RenderHelpCard({ card }: { card: HelpCard }) {
  if (card.type === "quick-script") return <QuickScriptCard card={card} />;
  if (card.type === "adjustment-request") return <AdjustmentRequestCard card={card} />;
  if (card.type === "evidence-summary") return <EvidenceSummaryCard card={card} />;
  if (card.type === "carry-with") return <CarryWithCard card={card} />;
  if (card.type === "emergency") return <EmergencyCard card={card} />;
  return <QuickScriptCard card={card} />;
}
