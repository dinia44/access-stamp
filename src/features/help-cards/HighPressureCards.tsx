import type { HelpCard } from "@/lib/help-cards";
import { HelpCardQuickActions } from "@/components/help-cards/help-card-quick-actions";
import {
  HC_BROWSE_CARD,
  HC_BTN_PRIMARY,
  HC_EYEBROW,
  HC_MUTED_SM,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

export function HighPressureCards({
  cards,
  onOpenCard,
}: {
  cards: HelpCard[];
  onOpenCard: (slug: string) => void;
}) {
  if (cards.length === 0) return null;

  return (
    <section
      aria-labelledby="high-pressure-cards"
      className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}
    >
      <p className={HC_EYEBROW}>High-pressure moments</p>
      <h2 id="high-pressure-cards" className={`${HC_SECTION_TITLE} mt-3`}>
        Cards for urgent real-world situations
      </h2>
      <p className={`${HC_MUTED_SM} mt-2`}>
        Police stops, parking challenges, and moments when you need a calm script fast.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article key={card.slug} className={HC_BROWSE_CARD}>
            <span className="inline-flex w-fit rounded-full bg-[#fff0e8] px-3 py-1.5 text-xs font-bold text-[#ef5b2a]">
              {card.badge ?? card.category}
            </span>
            <h3 className="mt-4 text-xl font-black leading-tight tracking-[-0.03em] text-[#17212b]">
              {card.title}
            </h3>
            <p className={`${HC_MUTED_SM} mt-3`}>{card.situation ?? card.summary}</p>
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
    </section>
  );
}
