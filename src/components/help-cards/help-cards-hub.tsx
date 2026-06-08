"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { HOME_INPUT } from "@/components/home/home-theme";
import { HelpCardAccessibleContent } from "@/components/help-cards/help-card-accessible-content";
import { HelpCardActions } from "@/components/help-cards/help-card-actions";
import { HelpCardPreview } from "@/components/help-cards/help-card-preview";
import { HelpCardsHowItWorks } from "@/components/help-cards/help-cards-how-it-works";
import { HELP_CARDS, HELP_CARD_CONCERNS, type HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng } from "@/lib/help-card-png";
import { SITE_FOCUS } from "@/lib/site-design";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Driving", "Work", "Education", "Travel", "Care", "Rights", "Emergency"] as const;
const FEATURED_SLUG = "job-interview-adjustments-card";
const CATEGORY_ORDER = ["Work", "Education", "Driving", "Travel", "Care", "Rights", "Emergency"];

const FEATURED_BENEFITS = [
  "Ask the right questions",
  "Carry key lines into meetings",
  "Save to phone in seconds",
] as const;

function CategoryIcon({ category }: { category: HelpCard["category"] }) {
  const icons: Record<HelpCard["category"], string> = {
    Driving: "🚗",
    Work: "💼",
    Education: "🎓",
    Travel: "✈️",
    Care: "🏥",
    Rights: "⚖️",
    Emergency: "🆘",
  };
  return <span aria-hidden>{icons[category]}</span>;
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
      if (
        concern &&
        !`${card.title} ${card.summary} ${card.tags.join(" ")} ${card.checklist.join(" ")}`.toLowerCase().includes(concern.toLowerCase())
      ) {
        return false;
      }
      if (!q) return true;
      return (
        card.title.toLowerCase().includes(q) ||
        card.summary.toLowerCase().includes(q) ||
        card.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        card.checklist.some((item) => item.toLowerCase().includes(q))
      );
    }).sort((a, b) => CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category));
  }, [query, category, concern]);

  const activeCard = useMemo(
    () => (activeSlug ? HELP_CARDS.find((card) => card.slug === activeSlug) ?? null : null),
    [activeSlug],
  );

  useEffect(() => {
    if (activeCard && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeCard]);

  function openCard(slug: string) {
    setActiveSlug(slug);
  }

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Hidden full-size preview for PNG export of any card */}
      <div className="pointer-events-none fixed -left-[9999px] top-0 w-[960px]" aria-hidden>
        {HELP_CARDS.map((card) => (
          <HelpCardPreview key={card.slug} card={card} forExport />
        ))}
      </div>

      <section aria-label="Search and filter help cards" className="rounded-3xl border border-[#F1D8C7] bg-white p-5 shadow-[0_16px_40px_-24px_rgba(240,74,22,0.12)] sm:p-6">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <label className="block text-sm font-semibold text-[#13201F]">
            Search
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by situation, topic, or concern"
              className={cn(HOME_INPUT, "mt-2 h-12")}
            />
          </label>
          <label className="block text-sm font-semibold text-[#13201F]">
            I am worried about…
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              className={cn(HOME_INPUT, "mt-2 h-12")}
            >
              <option value="">Choose a concern</option>
              {HELP_CARD_CONCERNS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5">
          <p className="text-sm font-semibold text-[#13201F]">Category</p>
          <div
            className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="group"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((option) => {
              const active = category === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setCategory(option)}
                  className={cn(
                    "inline-flex min-h-[44px] shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition-all duration-200",
                    SITE_FOCUS,
                    active
                      ? "border-[#F04A16] bg-[#F04A16] text-white shadow-sm shadow-[#F04A16]/20"
                      : "border-[#F1D8C7] bg-[#FFF8F1] text-[#13201F] hover:border-[#E8C4A8] hover:bg-[#FFF3E8]",
                  )}
                  aria-pressed={active}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <FadeIn>
        <section
          aria-labelledby="featured-help-card"
          className="overflow-hidden rounded-3xl border border-[#F1D8C7] bg-gradient-to-br from-white via-[#FFF8F1] to-[#FFF3E8] p-5 shadow-[0_20px_50px_-28px_rgba(240,74,22,0.15)] sm:p-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#F04A16]">Featured help card</p>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="help-card-print-area">
              <HelpCardPreview card={featured} />
            </div>
            <div>
              <h2 id="featured-help-card" className="text-2xl font-bold tracking-[-0.02em] text-[#13201F] sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-[#2A3836]">{featured.summary}</p>
              <ul className="mt-5 space-y-2">
                {FEATURED_BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-base text-[#13201F]">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE2D3] text-xs font-bold text-[#F04A16]" aria-hidden>
                      ✓
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <HelpCardActions card={featured} />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <HelpCardsHowItWorks />

      <section aria-labelledby="browse-help-cards">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 id="browse-help-cards" className="text-2xl font-bold tracking-[-0.02em] text-[#13201F] sm:text-3xl">
              Browse all Help Cards
            </h2>
            <p className="mt-1 text-base text-[#5E6A66]">Practical prompts you can save, print, and carry.</p>
          </div>
          <p className="text-sm font-semibold text-[#5E6A66]">{filtered.length} available</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((card) => (
            <article
              key={card.slug}
              className="group flex flex-col overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white shadow-[0_8px_24px_-16px_rgba(240,74,22,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#F04A16]/35 hover:shadow-[0_20px_40px_-20px_rgba(240,74,22,0.18)]"
            >
              <div className="border-b border-[#F1D8C7] bg-[#FFF8F1] p-3">
                <HelpCardPreview card={card} compact />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#F1D8C7] bg-[#FFF3E8] px-3 py-1 text-xs font-semibold text-[#59682A]">
                  <CategoryIcon category={card.category} />
                  {card.category}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-[#13201F]">{card.title}</h3>
                <p className="mt-2 flex-1 text-base text-[#5E6A66]">{card.summary}</p>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    className="inline-flex min-h-[44px] items-center rounded-2xl bg-[#F04A16] px-4 text-sm font-semibold text-white transition hover:bg-[#D93E10] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
                    onClick={() => openCard(card.slug)}
                  >
                    View card
                  </button>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-2xl border border-[#E8C4A8] bg-white text-[#F04A16] transition hover:border-[#F04A16]/40 hover:bg-[#FFF3E8]",
                      SITE_FOCUS,
                    )}
                    aria-label={`Save ${card.title} to phone`}
                    onClick={() => downloadHelpCardAsPng(card)}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-6 rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8] p-5 text-base text-[#2A3836]">
            No cards match your search. Try a different category or clear your filters.
          </p>
        ) : null}
      </section>

      {activeCard ? (
        <div ref={detailRef} className="scroll-mt-24 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-2xl font-bold text-[#13201F]">{activeCard.title}</h2>
            <button
              type="button"
              className={cn(
                "inline-flex min-h-[44px] items-center rounded-2xl border border-[#E8C4A8] bg-white px-4 text-sm font-semibold text-[#13201F]",
                SITE_FOCUS,
              )}
              onClick={() => setActiveSlug(null)}
            >
              Close
            </button>
          </div>

          <div className="help-card-print-area rounded-3xl border border-[#F1D8C7] bg-white p-4 sm:p-6">
            <HelpCardPreview card={activeCard} />
          </div>

          <HelpCardActions card={activeCard} />
          <HelpCardAccessibleContent card={activeCard} />
        </div>
      ) : null}
    </div>
  );
}
