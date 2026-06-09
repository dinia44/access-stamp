"use client";

import type { HelpCard } from "@/lib/help-cards";
import type { HelpCardPack } from "@/features/help-cards/helpCardTypes";
import {
  HC_BTN_PRIMARY,
  HC_EYEBROW,
  HC_FOCUS,
  HC_MUTED_SM,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

export function CardPacksSection({
  packs,
  cardsBySlug,
  onOpenPack,
}: {
  packs: HelpCardPack[];
  cardsBySlug: Map<string, HelpCard>;
  onOpenPack: (slug: string) => void;
}) {
  return (
    <section
      id="card-packs"
      aria-labelledby="card-packs-title"
      className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-24 xl:py-[120px]"
    >
      <div className="mx-auto max-w-7xl">
        <p className={HC_EYEBROW}>Ready-made bundles</p>
        <h2 id="card-packs-title" className={`${HC_SECTION_TITLE} mt-3`}>
          Card packs for difficult conversations
        </h2>
        <p className={`${HC_MUTED_SM} mt-3 max-w-2xl text-base leading-7`}>
          Everything you need in one place.
        </p>

        <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {packs.map((pack) => {
            const cardCount = pack.cardSlugs.filter((slug) => cardsBySlug.has(slug)).length;
            const firstSlug = pack.cardSlugs.find((slug) => cardsBySlug.has(slug)) ?? pack.cardSlugs[0];

            return (
              <li key={pack.id}>
                <article className="flex h-full flex-col rounded-[1.5rem] border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_8px_32px_rgba(19,32,51,0.05)] transition hover:-translate-y-0.5 hover:border-[#F97316]/35 hover:shadow-[0_16px_48px_rgba(19,32,51,0.08)]">
                  <h3 className="text-lg font-bold leading-snug text-[#132033]">{pack.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#5B6472]">{pack.description}</p>
                  <p className="mt-4 text-sm font-semibold text-[#132033]">
                    {cardCount} card{cardCount === 1 ? "" : "s"}
                  </p>
                  <button
                    type="button"
                    onClick={() => onOpenPack(firstSlug)}
                    className={`${HC_BTN_PRIMARY} mt-5 w-fit ${HC_FOCUS}`}
                    aria-label={`Open ${pack.title}`}
                  >
                    Open pack
                  </button>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
