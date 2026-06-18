"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";
import {
  filterGuideArticles,
  GUIDE_CATEGORY_FILTERS,
  readRecentGuideSlugs,
  saveRecentGuideSlug,
  SUGGESTED_GUIDE_SLUGS,
} from "@/lib/guide-search";

type Props = {
  articles: AdviceArticle[];
  value: string;
  onChange: (slug: string) => void;
};

export function GuideSearchCombobox({ articles, value, onChange }: Props) {
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<AdviceCategorySlug | "all">("all");
  const [open, setOpen] = useState(false);
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  const selected = articles.find((article) => article.slug === value);

  useEffect(() => {
    setRecentSlugs(readRecentGuideSlugs());
  }, []);

  useEffect(() => {
    if (selected && !query) {
      setQuery(selected.title);
    }
  }, [selected, query]);

  const filtered = useMemo(
    () => filterGuideArticles(articles, { query, category }),
    [articles, query, category],
  );

  const suggested = useMemo(
    () =>
      SUGGESTED_GUIDE_SLUGS.map((slug) => articles.find((article) => article.slug === slug)).filter(
        (article): article is AdviceArticle => Boolean(article),
      ),
    [articles],
  );

  const recent = useMemo(
    () =>
      recentSlugs
        .map((slug) => articles.find((article) => article.slug === slug))
        .filter((article): article is AdviceArticle => Boolean(article)),
    [articles, recentSlugs],
  );

  function selectGuide(article: AdviceArticle) {
    onChange(article.slug);
    setQuery(article.title);
    setOpen(false);
    saveRecentGuideSlug(article.slug);
    setRecentSlugs(readRecentGuideSlugs());
  }

  const showSuggestions = open && !query.trim();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {GUIDE_CATEGORY_FILTERS.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`min-h-9 rounded-full border px-3 text-xs font-semibold transition ${
              category === option.value
                ? "border-[#F04A16] bg-[#FDE9DD] text-[#C8430F]"
                : "border-border bg-card text-muted hover:border-[#F04A16]/40"
            }`}
            aria-pressed={category === option.value}
            onClick={() => setCategory(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="relative">
        <label htmlFor={`${listId}-input`} className="sr-only">
          Search guides
        </label>
        <input
          ref={inputRef}
          id={`${listId}-input`}
          type="search"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          placeholder="Search by title, topic, or tag…"
          className="form-input h-11 w-full px-3 text-sm"
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpen(false);
              inputRef.current?.blur();
            }
          }}
          onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        />

        {open ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-border bg-card py-2 shadow-lg"
          >
            {showSuggestions && recent.length ? (
              <li className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">Recently used</li>
            ) : null}
            {(showSuggestions ? recent : filtered).map((article) => (
              <li key={article.slug} role="option" aria-selected={article.slug === value}>
                <button
                  type="button"
                  className="flex w-full flex-col gap-0.5 px-3 py-2 text-left hover:bg-blue-pale/40"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => selectGuide(article)}
                >
                  <span className="text-sm font-semibold text-heading">{article.title}</span>
                  <span className="text-xs text-muted">
                    {GUIDE_CATEGORY_FILTERS.find((item) => item.value === article.categorySlug)?.label ??
                      article.categorySlug}
                  </span>
                </button>
              </li>
            ))}

            {!showSuggestions && !filtered.length ? (
              <li className="px-3 py-3 text-sm text-muted">No guides match your search. Try another topic or keyword.</li>
            ) : null}
          </ul>
        ) : null}
      </div>

      {showSuggestions ? (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">Suggested guides</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {suggested.map((article) => (
              <li key={article.slug}>
                <button
                  type="button"
                  className="min-h-9 rounded-full border border-border bg-card px-3 text-xs font-semibold text-heading hover:border-[#F04A16]/40"
                  onClick={() => selectGuide(article)}
                >
                  {article.title.length > 42 ? `${article.title.slice(0, 39)}…` : article.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {selected ? (
        <p className="text-xs text-muted">
          Selected: <span className="font-semibold text-heading">{selected.title}</span>
        </p>
      ) : null}
    </div>
  );
}
