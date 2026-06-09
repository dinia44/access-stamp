"use client";

import type { HelpCard } from "@/lib/help-cards";
import type { HelpCardPack } from "@/features/help-cards/helpCardTypes";

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
      className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1200px] rounded-[36px] border border-[#EAD5C2] bg-[linear-gradient(135deg,rgba(255,255,255,0.84),rgba(255,243,234,0.72))] p-6 shadow-sm sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">Ready-made packs</p>
            <h2
              id="card-packs-title"
              className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-4xl"
            >
              Card packs for difficult conversations
            </h2>
            <p className="mt-3 max-w-[640px] text-base leading-7 text-[#68717E]">
              Everything you need in one place when the conversation matters.
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {packs.map((pack) => {
            const cardCount = pack.cardSlugs.filter((slug) => cardsBySlug.has(slug)).length;
            const firstSlug = pack.cardSlugs.find((slug) => cardsBySlug.has(slug)) ?? pack.cardSlugs[0];

            return (
              <article
                key={pack.id}
                className="rounded-[30px] border border-[#EAD5C2] bg-white/84 p-7 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(19,32,51,0.10)]"
              >
                <span className="inline-flex rounded-full border border-[#F2D1BE] bg-[#FFF3EA] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#F05A1A]">
                  {cardCount} card{cardCount === 1 ? "" : "s"}
                </span>
                <h3 className="mt-5 text-2xl font-black tracking-[-0.04em] text-[#132033]">{pack.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#68717E]">{pack.description}</p>
                <button
                  type="button"
                  onClick={() => onOpenPack(firstSlug)}
                  className="mt-7 inline-flex min-h-[46px] items-center justify-center rounded-2xl bg-[#132033] px-5 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-[#1D2B42] focus:outline-none focus:ring-4 focus:ring-[#132033]/20"
                  aria-label={`Open ${pack.title}`}
                >
                  Open pack
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
