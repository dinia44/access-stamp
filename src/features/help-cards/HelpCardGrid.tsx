import type { HelpCard } from "@/lib/help-cards";
import { HelpCardQuickActions } from "@/components/help-cards/help-card-quick-actions";
import {
  HC_BROWSE_CARD,
  HC_BTN_PRIMARY,
  HC_INNER_CARD,
  HC_MUTED_SM,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

function categoryPill(card: HelpCard) {
  return card.badge ?? card.category;
}

export function HelpCardGrid({
  cards,
  onOpenCard,
  hasActiveFilters,
  onClearFilters,
}: {
  cards: HelpCard[];
  onOpenCard: (slug: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <section aria-labelledby="browse-help-cards" className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="browse-help-cards" className={HC_SECTION_TITLE}>
            Browse all Help Cards
          </h2>
          <p className={`${HC_MUTED_SM} mt-2`}>
            Source-backed pocket cards you can save, print, and carry.
          </p>
        </div>
        <p className="text-sm font-bold text-[#5f6b76]" aria-live="polite">
          {cards.length} card{cards.length === 1 ? "" : "s"} available
        </p>
      </div>

      {cards.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.slug} className={HC_BROWSE_CARD}>
              <span className="inline-flex w-fit rounded-full bg-[#fffaf4] px-3 py-1.5 text-xs font-bold text-[#5f6b76]">
                {categoryPill(card)}
              </span>
              <h3 className="mt-4 text-xl font-black leading-tight tracking-[-0.03em] text-[#17212b]">
                {card.title}
              </h3>
              <p className={`${HC_MUTED_SM} mt-3`}>{card.summary}</p>
              <ul className="mt-4 space-y-2.5">
                {card.checklist.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm leading-6 text-[#17212b]">
                    <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[#ef5b2a]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                <button
                  type="button"
                  className={HC_BTN_PRIMARY}
                  aria-label={`Open ${card.title}`}
                  onClick={() => onOpenCard(card.slug)}
                >
                  Open card →
                </button>
                <HelpCardQuickActions card={card} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={`${HC_INNER_CARD} mt-6 bg-[#fffaf4]/90 p-6 sm:p-8`}>
          <h3 className="text-xl font-black text-[#17212b]">No cards match those filters yet.</h3>
          <p className={`${HC_MUTED_SM} mt-3`}>Try clearing your search or choosing another situation.</p>
          {hasActiveFilters ? (
            <button type="button" className={`${HC_BTN_PRIMARY} mt-6`} onClick={onClearFilters}>
              Clear filters
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
