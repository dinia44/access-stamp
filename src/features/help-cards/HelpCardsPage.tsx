"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { HelpCardsHowItWorks } from "@/components/help-cards/help-cards-how-it-works";
import { CardPackSection } from "@/features/help-cards/CardPackSection";
import { FeaturedHelpCard } from "@/features/help-cards/FeaturedHelpCard";
import { HelpCardDetail } from "@/features/help-cards/HelpCardDetail";
import { HelpCardFilters } from "@/features/help-cards/HelpCardFilters";
import { HelpCardGrid } from "@/features/help-cards/HelpCardGrid";
import { HelpCardSearch } from "@/features/help-cards/HelpCardSearch";
import { HelpCardTailorPanel } from "@/features/help-cards/HelpCardTailorPanel";
import { HelpCardsHero } from "@/features/help-cards/HelpCardsHero";
import { HighPressureCards } from "@/features/help-cards/HighPressureCards";
import { RealWorldMoments } from "@/features/help-cards/RealWorldMoments";
import {
  FEATURED_RESEARCH_CARD_SLUG,
  HELP_CARD_PACKS,
} from "@/features/help-cards/helpCards.data";
import { useHelpCardSearch } from "@/features/help-cards/useHelpCardSearch";
import { SOURCE_BACKED_HELP_CARDS } from "@/lib/help-cards";
import {
  HC_BTN_SECONDARY,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

export function HelpCardsPageClient() {
  const cards = SOURCE_BACKED_HELP_CARDS;
  const {
    query,
    setQuery,
    category,
    setCategory,
    filtered,
    highPressure,
    hasActiveFilters,
    clearFilters,
  } = useHelpCardSearch(cards);

  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const browseRef = useRef<HTMLDivElement | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const featured = useMemo(
    () => cards.find((card) => card.slug === FEATURED_RESEARCH_CARD_SLUG) ?? cards[0],
    [cards],
  );

  const cardsBySlug = useMemo(() => new Map(cards.map((card) => [card.slug, card])), [cards]);

  const activeCard = useMemo(
    () => (activeSlug ? cards.find((card) => card.slug === activeSlug) ?? null : null),
    [activeSlug, cards],
  );

  useEffect(() => {
    if (activeCard && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCard]);

  function openCard(slug: string) {
    setActiveSlug(slug);
  }

  function scrollToBrowse() {
    browseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="pointer-events-none fixed -left-[9999px] top-0 w-[960px]" aria-hidden>
        {cards.map((card) => (
          <HelpCardPreview key={card.slug} card={card} forExport />
        ))}
      </div>

      <HelpCardsHero featured={featured} onBrowse={scrollToBrowse} />

      <section
        aria-label="Search and filter help cards"
        className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}
      >
        <HelpCardSearch value={query} onChange={setQuery} />
        <div className="mt-6">
          <HelpCardFilters category={category} onCategoryChange={setCategory} />
        </div>
      </section>

      <HighPressureCards cards={highPressure} onOpenCard={openCard} />
      <RealWorldMoments cards={cards} onSelectCategory={setCategory} />
      <CardPackSection packs={HELP_CARD_PACKS} cardsBySlug={cardsBySlug} onOpenCard={openCard} />
      <FeaturedHelpCard card={featured} />
      <HelpCardsHowItWorks />

      <div ref={browseRef}>
        <HelpCardGrid
          cards={filtered}
          onOpenCard={openCard}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>

      <HelpCardTailorPanel card={activeCard ?? featured} />

      {activeCard ? (
        <div ref={detailRef} className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING} scroll-mt-24 space-y-6`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className={HC_SECTION_TITLE}>{activeCard.title}</h2>
            <button type="button" className={HC_BTN_SECONDARY} onClick={() => setActiveSlug(null)}>
              Close
            </button>
          </div>

          <div className="help-card-print-area">
            <HelpCardPreview card={activeCard} size="large" />
          </div>

          <HelpCardActions card={activeCard} />
          <HelpCardDetail card={activeCard} />
        </div>
      ) : null}
    </>
  );
}
