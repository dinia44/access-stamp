"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CoreHelpCardsGrid } from "@/components/help-cards/core-help-card";
import { HelpCardPackPreview } from "@/components/help-cards/HelpCardComponents";
import { CORE_HELP_CARDS, type CoreHelpCard } from "@/data/core-help-cards";
import { helpCardPacks, type HelpCardPack } from "@/data/helpCardPacks";
import {
  HELP_CARD_TASK_CATEGORIES,
  helpCardTaskCategoryLabel,
  isHelpCardTaskCategoryId,
  type HelpCardTaskCategoryId,
} from "@/lib/help-cards/categories";
import { cn } from "@/lib/utils";

function chipClass(active: boolean) {
  return active
    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-subtle)]";
}

function matchesQuery(haystack: string, query: string): boolean {
  if (!query) return true;
  return haystack.toLowerCase().includes(query.toLowerCase());
}

function coreHaystack(card: CoreHelpCard): string {
  return [card.title, card.situation, card.script, card.checklist.join(" "), card.cardTypeLabel].join(" ");
}

function packHaystack(pack: HelpCardPack): string {
  return [
    pack.title,
    pack.description,
    pack.useWhen,
    pack.category,
    pack.jurisdiction ?? "",
    ...pack.cards.flatMap((card) => [card.title, card.shortDescription, card.keyLine ?? "", ...(card.checklist ?? [])]),
  ].join(" ");
}

function HelpCardsDiscoveryInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusId = useId();
  const categoryGroupId = useId();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<HelpCardTaskCategoryId>(() => {
    const value = searchParams.get("category");
    return isHelpCardTaskCategoryId(value) ? value : "all";
  });

  const syncUrl = useCallback(
    (next: { q?: string; category?: HelpCardTaskCategoryId }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextQuery = next.q ?? query;
      const nextCategory = next.category ?? category;

      if (nextQuery.trim()) params.set("q", nextQuery.trim());
      else params.delete("q");

      if (nextCategory && nextCategory !== "all") params.set("category", nextCategory);
      else params.delete("category");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [category, pathname, query, router, searchParams],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    const value = searchParams.get("category");
    setCategory(isHelpCardTaskCategoryId(value) ? value : "all");
  }, [searchParams]);

  const filteredCards = useMemo(() => {
    return CORE_HELP_CARDS.filter((card) => {
      if (category !== "all" && card.categoryKey !== category) return false;
      return matchesQuery(coreHaystack(card), query.trim());
    });
  }, [category, query]);

  const filteredPacks = useMemo(() => {
    return helpCardPacks.filter((pack) => {
      if (category !== "all" && pack.categoryKey !== category) return false;
      return matchesQuery(packHaystack(pack), query.trim());
    });
  }, [category, query]);

  const totalResults = filteredCards.length + filteredPacks.length;
  const filtersActive = Boolean(query.trim() || category !== "all");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    syncUrl({ q: query });
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    syncUrl({ q: "", category: "all" });
  }

  return (
    <div className="space-y-10">
      <section aria-labelledby="find-help-card-heading" className="space-y-5">
        <div>
          <h2 id="find-help-card-heading" className="text-xl font-semibold text-[var(--color-ink)]">
            Find a help card
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Search a situation or choose what you need help with.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" role="search">
          <div>
            <label htmlFor="help-card-search" className="block text-sm font-semibold text-[var(--color-ink)]">
              Search situations or wording
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="help-card-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => syncUrl({ q: query })}
                className="min-h-[44px] w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-base text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                placeholder="e.g. wheelchair access, interview, Blue Badge"
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-brand)] bg-[var(--color-brand)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                Search
              </button>
            </div>
          </div>

          <fieldset>
            <legend id={categoryGroupId} className="text-sm font-semibold text-[var(--color-ink)]">
              What do you need help with?
            </legend>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-labelledby={categoryGroupId}>
              {HELP_CARD_TASK_CATEGORIES.map((option) => {
                const active = category === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    className={cn(
                      "inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
                      chipClass(active),
                    )}
                    onClick={() => {
                      setCategory(option.id);
                      syncUrl({ category: option.id });
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <p id={statusId} className="text-sm text-[var(--color-text-muted)]" aria-live="polite">
            Showing {totalResults} result{totalResults === 1 ? "" : "s"}
            {category !== "all" ? ` in ${helpCardTaskCategoryLabel(category)}` : ""}
            {query.trim() ? ` for “${query.trim()}”` : ""}.
          </p>
          {filtersActive ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </section>

      {totalResults === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">No matching help cards</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Try another search, clear filters, or browse practical guides for longer checklists and templates.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-4 text-sm font-semibold text-[var(--color-ink)]"
            >
              Clear filters
            </button>
            <Link
              href="/advice"
              className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--color-brand)] bg-[var(--color-brand)] px-4 text-sm font-semibold text-white"
            >
              Browse guides
            </Link>
          </div>
        </div>
      ) : (
        <>
          {filteredCards.length > 0 ? (
            <section aria-labelledby="quick-cards-heading">
              <h2 id="quick-cards-heading" className="text-xl font-semibold text-[var(--color-ink)]">
                Quick cards
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                Compact wording you can copy now. Open details for the full checklist and related guide.
              </p>
              <div className="mt-5">
                <CoreHelpCardsGrid cards={filteredCards} />
              </div>
            </section>
          ) : null}

          {filteredPacks.length > 0 ? (
            <section aria-labelledby="packs-heading">
              <h2 id="packs-heading" className="text-xl font-semibold text-[var(--color-ink)] sm:text-2xl">
                Card packs
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
                Situation packs with scripts, checklists and evidence summaries.
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                {filteredPacks.map((pack) => (
                  <HelpCardPackPreview key={pack.slug} pack={pack} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

export function HelpCardsDiscovery() {
  return (
    <Suspense
      fallback={
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-sm text-[var(--color-text-muted)]">
          Loading help card search…
        </div>
      }
    >
      <HelpCardsDiscoveryInner />
    </Suspense>
  );
}
