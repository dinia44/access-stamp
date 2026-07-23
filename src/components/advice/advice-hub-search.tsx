"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";
import { ADVICE_TOPICS, PRIORITY_TOPIC_SLUGS, adviceTopicLabel } from "@/lib/advice-topics";
import {
  formatGuideMetaLine,
  getNationSuffix,
  NATION_FILTER_OPTIONS,
  searchAdviceGuides,
  type NationFilter,
} from "@/lib/advice-guide-meta";

const VISIBLE_RESULTS = 5;

type AdviceHubSearchProps = {
  articles: AdviceArticle[];
};

function chipClass(active: boolean) {
  return active
    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-brand)] hover:bg-[var(--color-surface-subtle)]";
}

function isTopicSlug(value: string | null): value is AdviceCategorySlug {
  return Boolean(value && ADVICE_TOPICS.some((topic) => topic.slug === value));
}

function isNationFilter(value: string | null): value is NationFilter {
  return Boolean(value && NATION_FILTER_OPTIONS.some((option) => option.id === value));
}

export function AdviceHubSearch({ articles }: AdviceHubSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const [topicSlug, setTopicSlug] = useState<AdviceCategorySlug | null>(() => {
    const value = searchParams.get("topic");
    return isTopicSlug(value) ? value : null;
  });
  const [nation, setNation] = useState<NationFilter | null>(() => {
    const value = searchParams.get("nation");
    return isNationFilter(value) ? value : null;
  });
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const syncUrl = useCallback(
    (next: { q?: string; topic?: AdviceCategorySlug | null; nation?: NationFilter | null }) => {
      const params = new URLSearchParams(searchParams.toString());
      const q = next.q ?? query;
      const topic = next.topic === undefined ? topicSlug : next.topic;
      const nationValue = next.nation === undefined ? nation : next.nation;

      if (q.trim()) params.set("q", q.trim());
      else params.delete("q");
      if (topic) params.set("topic", topic);
      else params.delete("topic");
      if (nationValue) params.set("nation", nationValue);
      else params.delete("nation");

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [nation, pathname, query, router, searchParams, topicSlug],
  );

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const topic = searchParams.get("topic");
    const nationValue = searchParams.get("nation");
    setQuery(q);
    setTopicSlug(isTopicSlug(topic) ? topic : null);
    setNation(isNationFilter(nationValue) ? nationValue : null);
    if (isTopicSlug(topic) && !PRIORITY_TOPIC_SLUGS.includes(topic)) {
      setMoreFiltersOpen(true);
    }
  }, [searchParams]);

  const results = useMemo(
    () => searchAdviceGuides(articles, { query, topicSlug, nation }),
    [articles, query, topicSlug, nation],
  );

  const isActive = Boolean(query.trim() || topicSlug || nation);
  const visible = results.slice(0, VISIBLE_RESULTS);
  const hiddenCount = Math.max(0, results.length - visible.length);

  const priorityTopics = ADVICE_TOPICS.filter((topic) => PRIORITY_TOPIC_SLUGS.includes(topic.slug));
  const extraTopics = ADVICE_TOPICS.filter((topic) => !PRIORITY_TOPIC_SLUGS.includes(topic.slug));

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    syncUrl({ q: query });
  }

  function selectTopic(slug: AdviceCategorySlug) {
    const next = topicSlug === slug ? null : slug;
    setTopicSlug(next);
    syncUrl({ topic: next });
  }

  function selectNation(value: NationFilter) {
    const next = nation === value ? null : value;
    setNation(next);
    syncUrl({ nation: next });
  }

  function clearFilters() {
    setQuery("");
    setTopicSlug(null);
    setNation(null);
    router.replace(pathname, { scroll: false });
  }

  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)] sm:p-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="min-w-0 flex-1">
          <label htmlFor="advice-hub-search" className="mb-1.5 block text-sm font-semibold text-[var(--color-ink)]">
            Search guides
          </label>
          <input
            id="advice-hub-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Try "PIP renewal" or "Blue Badge"`}
            className="min-h-[44px] w-full rounded-full border border-[var(--color-border)] bg-[var(--color-canvas)] px-4 text-base text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)]"
          />
        </div>
        <button
          type="submit"
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[var(--color-brand)] px-6 text-sm font-semibold text-white transition hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] focus-visible:ring-offset-2"
        >
          Search
        </button>
      </form>

      <div className="mt-4">
        <p id="advice-topic-filters-label" className="text-sm font-semibold text-[var(--color-ink)]">
          Topics
        </p>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-labelledby="advice-topic-filters-label"
        >
          {priorityTopics.map((topic) => {
            const active = topicSlug === topic.slug;
            return (
              <button
                key={topic.slug}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => selectTopic(topic.slug)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 text-sm font-semibold transition ${chipClass(active)}`}
              >
                {topic.title}
              </button>
            );
          })}
          <button
            type="button"
            aria-expanded={moreFiltersOpen}
            aria-controls="advice-more-topic-filters"
            onClick={() => setMoreFiltersOpen((open) => !open)}
            className="inline-flex min-h-[44px] items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-subtle)] px-3.5 text-sm font-semibold text-[var(--color-ink)] hover:border-[var(--color-brand)]"
          >
            {moreFiltersOpen ? "Fewer topics" : "More filters"}
          </button>
        </div>

        {moreFiltersOpen ? (
          <div id="advice-more-topic-filters" className="mt-2 flex flex-wrap gap-2">
            {extraTopics.map((topic) => {
              const active = topicSlug === topic.slug;
              return (
                <button
                  key={topic.slug}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectTopic(topic.slug)}
                  className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 text-sm font-semibold transition ${chipClass(active)}`}
                >
                  {topic.title}
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-4">
        <p id="advice-nation-filters-label" className="text-sm font-semibold text-[var(--color-ink)]">
          Nation
        </p>
        <p className="mt-1 text-xs leading-5 text-[var(--color-text-muted)]">
          Some guidance differs across the UK — pick a nation when that matters for your situation.
        </p>
        <div
          className="mt-2 flex flex-wrap gap-2"
          role="radiogroup"
          aria-labelledby="advice-nation-filters-label"
        >
          {NATION_FILTER_OPTIONS.map((option) => {
            const active = nation === option.id;
            return (
              <button
                key={option.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => selectNation(option.id)}
                className={`inline-flex min-h-[44px] items-center rounded-full border px-3.5 text-sm font-semibold transition ${chipClass(active)}`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {isActive ? (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] pt-4">
          <p aria-live="polite" className="text-sm font-semibold text-[var(--color-ink)]">
            {results.length} guide{results.length === 1 ? "" : "s"} match
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : null}

      {isActive ? (
        <div aria-live="polite" className="mt-3">
          {visible.length ? (
            <ul className="space-y-2">
              {visible.map((article) => {
                const nationSuffix = getNationSuffix(article);
                return (
                  <li key={article.slug}>
                    <Link
                      href={`/advice/${article.slug}`}
                      className="block rounded-[var(--radius-md)] px-2 py-2 transition hover:bg-[var(--color-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
                    >
                      <div className="font-[family-name:var(--font-heading)] text-base font-medium text-[var(--color-ink)]">
                        {article.title}
                      </div>
                      <div className="mt-1 text-sm text-[var(--color-text-muted)]">
                        {formatGuideMetaLine(article, adviceTopicLabel(article.categorySlug))}
                        {nationSuffix ? (
                          <span className="font-semibold text-[var(--color-brand)]"> {nationSuffix}</span>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-[var(--color-text-muted)]">
              No guides match yet — try a benefit name or topic, or clear filters and browse below.
            </p>
          )}

          {hiddenCount > 0 && topicSlug ? (
            <Link
              href={`/advice/${topicSlug}`}
              className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
            >
              See all {results.length} results in {adviceTopicLabel(topicSlug)} →
            </Link>
          ) : hiddenCount > 0 ? (
            <p className="mt-3 text-sm text-[var(--color-text-muted)]">
              Showing {VISIBLE_RESULTS} of {results.length}. Refine by topic to browse the full set.
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
