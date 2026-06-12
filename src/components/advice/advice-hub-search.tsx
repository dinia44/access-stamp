"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";
import { ADVICE_TOPICS, adviceTopicLabel } from "@/lib/advice-topics";
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
    ? "border-[#F6CFB8] bg-[#FDE9DD] text-[#C8430F]"
    : "border-[#EFE5DA] bg-white text-[#4A5263] hover:border-[#F6CFB8] hover:bg-[#FDFBF8]";
}

export function AdviceHubSearch({ articles }: AdviceHubSearchProps) {
  const [query, setQuery] = useState("");
  const [topicSlug, setTopicSlug] = useState<AdviceCategorySlug | null>(null);
  const [nation, setNation] = useState<NationFilter | null>(null);

  const results = useMemo(
    () => searchAdviceGuides(articles, { query, topicSlug, nation }),
    [articles, query, topicSlug, nation],
  );

  const isActive = Boolean(query.trim() || topicSlug || nation);
  const visible = results.slice(0, VISIBLE_RESULTS);
  const hiddenCount = Math.max(0, results.length - visible.length);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  function toggleTopic(slug: AdviceCategorySlug) {
    setTopicSlug((current) => (current === slug ? null : slug));
  }

  function toggleNation(value: NationFilter) {
    setNation((current) => (current === value ? null : value));
  }

  return (
    <div className="rounded-[20px] border border-[#EFE5DA] bg-white p-4 shadow-[0_20px_48px_-24px_rgba(122,80,48,0.22)] sm:p-5">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="advice-hub-search" className="sr-only">
          Search guides
        </label>
        <input
          id="advice-hub-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={`Search guides — try "PIP renewal" or "Blue Badge"`}
          className="h-11 flex-1 rounded-full border border-[#EFE5DA] bg-[#FDFBF8] px-4 text-sm text-[#20242E] placeholder:text-[#76808F] focus:border-[#F6CFB8] focus:outline-none focus:ring-2 focus:ring-[#FDE9DD]"
        />
        <button
          type="submit"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white transition hover:bg-[#D94E1C]"
        >
          Search
        </button>
      </form>

      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        {ADVICE_TOPICS.map((topic) => {
          const active = topicSlug === topic.slug;
          return (
            <button
              key={topic.slug}
              type="button"
              aria-pressed={active}
              onClick={() => toggleTopic(topic.slug)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${chipClass(active)}`}
            >
              {topic.title}
            </button>
          );
        })}
      </div>

      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by nation">
        {NATION_FILTER_OPTIONS.map((option) => {
          const active = nation === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => toggleNation(option.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${chipClass(active)}`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {isActive ? (
        <div aria-live="polite" className="mt-4 border-t border-[#EFE5DA] pt-4">
          {visible.length ? (
            <ul className="space-y-3">
              {visible.map((article) => {
                const nationSuffix = getNationSuffix(article);
                return (
                  <li key={article.slug}>
                    <Link
                      href={`/advice/${article.slug}`}
                      className="block rounded-xl px-2 py-2 transition hover:bg-[#FAF4ED]"
                    >
                      <div className="font-[family-name:var(--font-heading)] text-base font-medium text-[#20242E]">
                        {article.title}
                      </div>
                      <div className="mt-1 text-sm text-[#76808F]">
                        {formatGuideMetaLine(article, adviceTopicLabel(article.categorySlug))}
                        {nationSuffix ? (
                          <span className="font-semibold text-[#C8430F]"> {nationSuffix}</span>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm leading-6 text-[#4A5263]">
              No guides match yet — try a benefit name or topic, or browse by topic below.
            </p>
          )}

          {hiddenCount > 0 ? (
            <p className="mt-3 text-sm font-semibold text-[#C8430F]">
              See all {results.length} results
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
