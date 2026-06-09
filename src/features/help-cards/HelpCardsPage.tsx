"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { CardPacksSection } from "@/features/help-cards/CardPacksSection";
import { HelpCardDetail } from "@/features/help-cards/HelpCardDetail";
import { HelpCardGrid } from "@/features/help-cards/HelpCardGrid";
import { HelpCardsHero } from "@/features/help-cards/HelpCardsHero";
import { HighPressureCards } from "@/features/help-cards/HighPressureCards";
import { HowItWorksStrip } from "@/features/help-cards/HowItWorksStrip";
import { SituationChooser } from "@/features/help-cards/SituationChooser";
import { TrustStrip } from "@/features/help-cards/TrustStrip";
import { HELP_CARD_PACKS } from "@/features/help-cards/helpCards.data";
import { useHelpCardSearch } from "@/features/help-cards/useHelpCardSearch";
import type { HelpCardCategoryFilter } from "@/features/help-cards/useHelpCardSearch";
import { SOURCE_BACKED_HELP_CARDS } from "@/lib/help-cards";

export default function HelpCardsPage() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const browseRef = useRef<HTMLDivElement | null>(null);
  const situationsRef = useRef<HTMLDivElement | null>(null);
  const packsRef = useRef<HTMLDivElement | null>(null);

  const cards = SOURCE_BACKED_HELP_CARDS;
  const cardsBySlug = useMemo(() => new Map(cards.map((card) => [card.slug, card])), [cards]);

  const { filtered, hasActiveFilters, clearFilters, setCategory } = useHelpCardSearch(cards);

  const activeCard = useMemo(
    () => (activeSlug ? cardsBySlug.get(activeSlug) ?? null : null),
    [activeSlug, cardsBySlug],
  );

  useEffect(() => {
    if (activeCard && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCard]);

  function scrollToSituations() {
    situationsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToPacks() {
    packsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openCard(slug: string) {
    setActiveSlug(slug);
  }

  function handleSituationSelect(category: string) {
    setCategory(category as HelpCardCategoryFilter);
    browseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="hc-landing min-h-screen bg-[#FFF7EF] text-[#132033]">
      <div className="pointer-events-none fixed -left-[9999px] top-0 w-[960px]" aria-hidden>
        {cards.map((card) => (
          <HelpCardPreview key={card.slug} card={card} forExport />
        ))}
      </div>

      <HelpCardsHero onBrowse={scrollToSituations} onBuildPack={scrollToPacks} />
      <HowItWorksStrip />

      <HighPressureCards cardsBySlug={cardsBySlug} onOpenCard={openCard} />

      <div ref={situationsRef}>
        <SituationChooser cards={cards} onSelectCategory={handleSituationSelect} />
      </div>

      <div ref={packsRef}>
        <CardPacksSection packs={HELP_CARD_PACKS} cardsBySlug={cardsBySlug} onOpenPack={openCard} />
      </div>

      <TrustStrip />

      <div ref={browseRef} id="browse-cards" className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1200px]">
          <HelpCardGrid
            cards={filtered}
            onOpenCard={openCard}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />
        </div>
      </div>

      {activeCard ? (
        <div
          ref={detailRef}
          className="border-t border-[#EAD7C5]/80 bg-[rgba(255,255,255,0.55)] px-5 py-12 sm:px-8 md:py-16 lg:px-10"
        >
          <div className="mx-auto max-w-7xl space-y-8">
            <div className="help-card-print-area">
              <HelpCardPreview card={activeCard} size="large" />
            </div>
            <HelpCardActions card={activeCard} />
            <HelpCardDetail card={activeCard} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
