"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { CoreHelpCard } from "@/data/core-help-cards";
import { HelpCardCopyButton } from "@/components/help-cards/help-card-copy-button";
import { helpCardTaskCategoryLabel } from "@/lib/help-cards/categories";
import { getCoreCardCopyText } from "@/lib/help-cards/copy-text";
import { cn } from "@/lib/utils";

function previewText(script: string, max = 140): string {
  if (script.length <= max) return script;
  return `${script.slice(0, max).trimEnd()}…`;
}

export function HelpCardItem({ card, className }: { card: CoreHelpCard; className?: string }) {
  const detailsId = useId();
  const [open, setOpen] = useState(false);

  return (
    <article
      id={card.id}
      className={cn(
        "flex h-full scroll-mt-28 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-[var(--color-brand)]/25 bg-[var(--color-brand-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-pressed)]">
          {card.cardTypeLabel}
        </span>
        <span className="text-xs font-medium text-[var(--color-text-muted)]">
          {helpCardTaskCategoryLabel(card.categoryKey)}
        </span>
      </div>

      <h2 className="mt-3 text-lg font-semibold text-[var(--color-ink)]">{card.title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
        <span className="font-medium text-[var(--color-ink)]">Use this when: </span>
        {card.situation.replace(/^Use this when\s+/i, "")}
      </p>

      <blockquote className="mt-4 max-w-[40rem] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-sm leading-6 text-[var(--color-ink)]">
        {previewText(card.script)}
      </blockquote>

      <HelpCardCopyButton
        text={getCoreCardCopyText(card)}
        label="Copy wording"
        accessibleName={`Copy wording for ${card.title}`}
        className="mt-4"
      />

      <button
        type="button"
        className="mt-3 inline-flex min-h-[44px] items-center self-start text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
        aria-expanded={open}
        aria-controls={detailsId}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide card details" : "View card details"}
      </button>

      {open ? (
        <div id={detailsId} className="mt-4 space-y-4 border-t border-[var(--color-border)] pt-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Checklist</h3>
            <ul className="mt-2 list-disc space-y-1.5 pl-5" role="list">
              {card.checklist.map((item) => (
                <li key={item} className="text-sm leading-6 text-[var(--color-text-muted)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-ink)]">Full wording</h3>
            <blockquote className="mt-2 max-w-[40rem] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-sm leading-6 text-[var(--color-ink)]">
              {card.script}
            </blockquote>
          </div>
          {card.guideHref ? (
            <Link
              href={card.guideHref}
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline"
              aria-label={`Open related guide for ${card.title}`}
            >
              Open related guide
            </Link>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export function CoreHelpCardsGrid({ cards }: { cards: CoreHelpCard[] }) {
  if (cards.length === 0) return null;

  return (
    <ul className="grid list-none gap-4 p-0 md:grid-cols-2" role="list">
      {cards.map((card) => (
        <li key={card.id}>
          <HelpCardItem card={card} />
        </li>
      ))}
    </ul>
  );
}
