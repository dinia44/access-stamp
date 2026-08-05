"use client";

import Link from "next/link";
import { Suspense, useCallback, useEffect, useId, useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { HelpCardHubPreview } from "@/components/help-cards/help-card-hub-preview";
import { getPublishedHelpCards } from "@/data/helpCards";
import type { HelpCard } from "@/data/help-cards/types";
import {
  HELP_CARD_TASK_CATEGORIES,
  helpCardTaskCategoryLabel,
  isHelpCardTaskCategoryId,
  type HelpCardTaskCategoryId,
} from "@/lib/help-cards/categories";
import { cn } from "@/lib/utils";

const CARDS = getPublishedHelpCards();

const REGIONS = ["All regions", ...Array.from(new Set(CARDS.map((card) => card.region)))];

function chipClass(active: boolean) {
  return active
    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-subtle)]";
}

function haystack(card: HelpCard): string {
  return [
    card.title,
    card.summary,
    card.category,
    card.region,
    ...card.variants.flatMap((variant) =>
      variant.rules.flatMap((rule) => [rule.headline, rule.plainEnglish, rule.applicability]),
    ),
  ]
    .join(" ")
    .toLowerCase();
}

function HelpCardsDiscoveryInner() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const statusId = useId();
  const categoryGroupId = useId();
  const regionLabelId = useId();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [category, setCategory] = useState<HelpCardTaskCategoryId>(() => {
    const value = searchParams.get("category");
    return isHelpCardTaskCategoryId(value) ? value : "all";
  });
  const [region, setRegion] = useState<string>(() => {
    const value = searchParams.get("region");
    return value && REGIONS.includes(value) ? value : "All regions";
  });

  const syncUrl = useCallback(
    (next: { q?: string; category?: HelpCardTaskCategoryId; region?: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      const nextQuery = next.q ?? query;
      const nextCategory = next.category ?? category;
      const nextRegion = next.region ?? region;

      if (nextQuery.trim()) params.set("q", nextQuery.trim());
      else params.delete("q");
      if (nextCategory && nextCategory !== "all") params.set("category", nextCategory);
      else params.delete("category");
      if (nextRegion && nextRegion !== "All regions") params.set("region", nextRegion);
      else params.delete("region");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [category, pathname, query, region, router, searchParams],
  );

  useEffect(() => {
    setQuery(searchParams.get("q") ?? "");
    const cat = searchParams.get("category");
    setCategory(isHelpCardTaskCategoryId(cat) ? cat : "all");
    const reg = searchParams.get("region");
    setRegion(reg && REGIONS.includes(reg) ? reg : "All regions");
  }, [searchParams]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CARDS.filter((card) => {
      if (category !== "all" && card.categoryKey !== category) return false;
      if (region !== "All regions" && card.region !== region) return false;
      if (q && !haystack(card).includes(q)) return false;
      return true;
    });
  }, [category, query, region]);

  const filtersActive = Boolean(query.trim() || category !== "all" || region !== "All regions");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    syncUrl({ q: query });
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setRegion("All regions");
    syncUrl({ q: "", category: "all", region: "All regions" });
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="find-help-card-heading" className="space-y-5">
        <div>
          <h2 id="find-help-card-heading" className="text-xl font-semibold text-[var(--color-ink)]">
            What do you need to know about?
          </h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Search a situation, then narrow by topic or region.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4" role="search">
          <div>
            <label htmlFor="help-card-search" className="block text-sm font-semibold text-[var(--color-ink)]">
              Search situations
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="help-card-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onBlur={() => syncUrl({ q: query })}
                className="min-h-[44px] w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-base text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                placeholder="e.g. Section 88, interview, Blue Badge, GP"
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
              Category
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

          <div>
            <label id={regionLabelId} htmlFor="help-card-region" className="block text-sm font-semibold text-[var(--color-ink)]">
              Region
            </label>
            <select
              id="help-card-region"
              value={region}
              onChange={(event) => {
                setRegion(event.target.value);
                syncUrl({ region: event.target.value });
              }}
              className="mt-2 min-h-[44px] w-full max-w-sm rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 text-base text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {REGIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <p id={statusId} className="text-sm text-[var(--color-text-muted)]" aria-live="polite">
            Showing {results.length} card{results.length === 1 ? "" : "s"}
            {category !== "all" ? ` in ${helpCardTaskCategoryLabel(category)}` : ""}
            {region !== "All regions" ? ` for ${region}` : ""}
            {query.trim() ? ` matching “${query.trim()}”` : ""}.
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

      {results.length === 0 ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 className="text-lg font-semibold text-[var(--color-ink)]">No matching help cards</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
            Try another search, clear filters, or browse guides and official sources for more detail.
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
        <section aria-labelledby="results-heading">
          <h2 id="results-heading" className="sr-only">
            Help cards
          </h2>
          <ul className="grid list-none gap-5 p-0 md:grid-cols-2" role="list">
            {results.map((card) => (
              <li key={card.slug}>
                <HelpCardHubPreview card={card} />
              </li>
            ))}
          </ul>
        </section>
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
