"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { HelpCardAccessibleContent } from "@/components/help-cards/help-card-accessible-content";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardsHowItWorks } from "@/components/help-cards/help-cards-how-it-works";
import {
  HC_BTN_GHOST,
  HC_BTN_PRIMARY,
  HC_BTN_SECONDARY,
  HC_EYEBROW,
  HC_FEATURED_PANEL,
  HC_INPUT,
  HC_MUTED,
  HC_PANEL,
  HC_GRID_CARD,
  HC_SECTION_TITLE,
  hcChipClass,
} from "@/components/help-cards/help-cards-theme";
import { HELP_CARDS, HELP_CARD_CONCERNS, type HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng, printHelpCard } from "@/lib/help-card-png";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Driving", "Work", "Education", "Travel", "Care", "Rights", "Emergency"] as const;
const FEATURED_SLUG = "job-interview-adjustments-card";
const CATEGORY_ORDER = ["Work", "Education", "Driving", "Travel", "Care", "Rights", "Emergency"];

const FEATURED_BENEFITS = [
  "Ask the right questions",
  "Carry key lines into meetings",
  "Save to phone in seconds",
] as const;

function cardMatchesConcern(card: HelpCard, concern: string) {
  if (!concern.trim()) return true;
  const haystack =
    `${card.title} ${card.summary} ${card.tags.join(" ")} ${card.category} ${card.checklist.join(" ")} ${card.mustAsk.join(" ")}`.toLowerCase();
  const needle = concern.toLowerCase();
  if (haystack.includes(needle)) return true;
  return needle
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .some((word) => haystack.includes(word));
}

function categoryPill(card: HelpCard) {
  const tag = card.tags[0];
  return tag ? `${card.category} / ${tag}` : card.category;
}

export function HelpCardsHub({ initialConcern = "" }: { initialConcern?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [concern, setConcern] = useState(initialConcern);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement | null>(null);

  const featured = useMemo(
    () => HELP_CARDS.find((card) => card.slug === FEATURED_SLUG) ?? HELP_CARDS[0],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return HELP_CARDS.filter((card) => {
      if (category !== "All" && card.category !== category) return false;
      if (!cardMatchesConcern(card, concern)) return false;
      if (!q) return true;
      return (
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        card.checklist.some((item) => item.toLowerCase().includes(q))
      );
    }).sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
  }, [query, category, concern]);

  const hasActiveFilters = Boolean(query.trim() || concern.trim() || category !== "All");

  const activeCard = useMemo(
    () => (activeSlug ? HELP_CARDS.find((card) => card.slug === activeSlug) ?? null : null),
    [activeSlug],
  );

  useEffect(() => {
    if (activeCard && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCard]);

  function clearFilters() {
    setQuery("");
    setConcern("");
    setCategory("All");
  }

  function openCard(slug: string) {
    setActiveSlug(slug);
  }

  return (
    <div className="space-y-16 sm:space-y-20 lg:space-y-24">
      <div className="pointer-events-none fixed -left-[9999px] top-0 w-[960px]" aria-hidden>
        {HELP_CARDS.map((card) => (
          <HelpCardPreview key={card.slug} card={card} forExport />
        ))}
      </div>

      <section aria-label="Search and filter help cards" className={HC_PANEL}>
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <label className="block text-sm font-bold text-[#17212b]">
            Search
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by situation, topic, or concern"
              className={HC_INPUT}
            />
          </label>
          <label className="block text-sm font-bold text-[#17212b]">
            I want cards about…
            <select value={concern} onChange={(e) => setConcern(e.target.value)} className={HC_INPUT}>
              <option value="">Choose a topic</option>
              {HELP_CARD_CONCERNS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-[#17212b]">Category</p>
          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={hcChipClass(category === option)}
                aria-pressed={category === option}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <FadeIn>
        <section aria-labelledby="featured-help-card" className={HC_FEATURED_PANEL}>
          <p className={HC_EYEBROW}>Featured help card</p>
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div className="help-card-print-area">
              <HelpCardPreview card={featured} size="large" />
            </div>
            <div>
              <h2 id="featured-help-card" className={`${HC_SECTION_TITLE} text-[clamp(1.8rem,3vw,2.5rem)]`}>
                {featured.title}
              </h2>
              <p className={`${HC_MUTED} mt-4`}>{featured.summary}</p>
              <ul className="mt-6 space-y-3">
                {FEATURED_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-base font-semibold text-[#17212b]">
                    <span
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ef5b2a]/15 text-xs font-bold text-[#ef5b2a]"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <HelpCardActions card={featured} />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <HelpCardsHowItWorks />

      <section aria-labelledby="browse-help-cards">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="browse-help-cards" className={HC_SECTION_TITLE}>
              Browse all Help Cards
            </h2>
            <p className={`${HC_MUTED} mt-2`}>Practical prompts you can save, print, and carry.</p>
          </div>
          <p className="text-sm font-bold text-[#5f6b76]" aria-live="polite">
            {filtered.length} card{filtered.length === 1 ? "" : "s"} available
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((card) => (
              <article key={card.slug} className={`${HC_GRID_CARD} flex flex-col`}>
                <span className="inline-flex w-fit rounded-full border border-[#ead2bf] bg-[#fffaf4] px-3 py-1 text-xs font-bold text-[#5f6b76]">
                  {categoryPill(card)}
                </span>
                <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-[-0.03em] text-[#17212b]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5f6b76]">{card.summary}</p>
                <ul className="mt-4 space-y-2">
                  {card.checklist.slice(0, 3).map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-[#17212b]">
                      <span className="mt-[0.45em] h-2 w-2 shrink-0 rounded-full bg-[#ef5b2a]" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-[#ead2bf]/80 pt-5">
                  <button type="button" className={HC_BTN_GHOST} onClick={() => openCard(card.slug)}>
                    Open card →
                  </button>
                  <button
                    type="button"
                    className={cn(HC_BTN_SECONDARY, "min-h-[44px] px-4 py-2 text-xs")}
                    aria-label={`Save ${card.title} to phone`}
                    onClick={() => void downloadHelpCardAsPng(card)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className={cn(HC_BTN_SECONDARY, "min-h-[44px] px-4 py-2 text-xs")}
                    aria-label={`Print ${card.title}`}
                    onClick={() => void printHelpCard(card)}
                  >
                    Print
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className={`${HC_GRID_CARD} mt-8 bg-[#fffaf4]/90 p-6 sm:p-8`}>
            <h3 className="text-xl font-extrabold text-[#17212b]">No cards match those filters yet.</h3>
            <p className="mt-2 text-base leading-relaxed text-[#5f6b76]">
              Try clearing your search or choosing another category.
            </p>
            {hasActiveFilters ? (
              <button type="button" className={`${HC_BTN_PRIMARY} mt-5`} onClick={clearFilters}>
                Clear filters
              </button>
            ) : null}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="mt-10 flex justify-center">
            <Link href="/help-cards" className={HC_BTN_GHOST}>
              View all cards →
            </Link>
          </div>
        ) : null}
      </section>

      {activeCard ? (
        <div ref={detailRef} className="scroll-mt-24 space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className={HC_SECTION_TITLE}>{activeCard.title}</h2>
            <button type="button" className={HC_BTN_SECONDARY} onClick={() => setActiveSlug(null)}>
              Close
            </button>
          </div>

          <div className="help-card-print-area rounded-[2rem] border border-[#ead2bf] bg-white/80 p-4 sm:p-6">
            <HelpCardPreview card={activeCard} size="large" />
          </div>

          <HelpCardActions card={activeCard} />
          <HelpCardAccessibleContent card={activeCard} />
        </div>
      ) : null}
    </div>
  );
}
