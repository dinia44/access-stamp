"use client";

import type { HelpCard } from "@/lib/help-cards";
import type { HelpCardPack } from "@/features/help-cards/helpCardTypes";
import {
  HC_BTN_SECONDARY,
  HC_INNER_CARD,
  HC_MUTED_SM,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

export function CardPackSection({
  packs,
  cardsBySlug,
  onOpenCard,
}: {
  packs: HelpCardPack[];
  cardsBySlug: Map<string, HelpCard>;
  onOpenCard: (slug: string) => void;
}) {
  return (
    <section
      aria-labelledby="card-packs"
      className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}
    >
      <h2 id="card-packs" className={HC_SECTION_TITLE}>
        Card packs for difficult conversations
      </h2>
      <p className={`${HC_MUTED_SM} mt-2`}>
        Bundles of cards for interviews, appointments, assessments and venue visits.
      </p>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {packs.map((pack) => {
          const packCards = pack.cardSlugs
            .map((slug) => cardsBySlug.get(slug))
            .filter(Boolean) as HelpCard[];

          return (
            <article key={pack.id} className={`${HC_INNER_CARD} p-5 sm:p-6`}>
              <h3 className="text-xl font-black text-[#17212b]">{pack.title}</h3>
              <p className={`${HC_MUTED_SM} mt-3`}>{pack.description}</p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[#17212b]">
                {packCards.map((card) => (
                  <li key={card.slug} className="flex gap-2">
                    <span className="text-[#ef5b2a]" aria-hidden>
                      •
                    </span>
                    {card.title}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`${HC_BTN_SECONDARY} mt-6`}
                onClick={() => onOpenCard(packCards[0]?.slug ?? pack.cardSlugs[0])}
              >
                Open pack →
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
