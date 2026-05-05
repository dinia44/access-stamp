"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { SEARCH_INDEX } from "@/data/searchIndex";
import { cn } from "@/lib/utils";

type GlobalSearchProps = {
  className?: string;
  inputClassName?: string;
  onSelect?: () => void;
};

const EMPTY_STATE =
  "No results found. Try searching for venues, toilets, parking, rights, equipment or transport.";

export function GlobalSearch({ className, inputClassName, onSelect }: GlobalSearchProps) {
  const inputId = useId();
  const listboxId = `${inputId}-results`;
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return [] as typeof SEARCH_INDEX;
    return SEARCH_INDEX.filter((item) =>
      [item.title, item.description, item.category, ...item.tags].some((field) =>
        field.toLowerCase().includes(term),
      ),
    ).slice(0, 8);
  }, [query]);

  useEffect(() => {
    setActiveIndex(results.length ? 0 : -1);
  }, [results.length]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open) setOpen(true);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!results.length) return;
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!results.length) return;
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Escape") {
      setOpen(false);
    } else if (e.key === "Enter" && results[activeIndex]) {
      const selected = results[activeIndex];
      if (selected.comingSoon) return;
      window.location.href = selected.url;
    }
  }

  return (
    <div className={cn("relative w-full min-w-0", className)} ref={rootRef}>
      <label htmlFor={inputId} className="sr-only">
        Search Access Stamp content
      </label>
      <input
        id={inputId}
        type="search"
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onKeyDown={onKeyDown}
        placeholder="Search venues, rights, equipment, transport or care support…"
        aria-label="Search across venues, guides, rights, equipment, and blog"
        aria-expanded={open}
        aria-controls={listboxId}
        className={cn(
          "h-10 w-full rounded-[var(--radius-ui)] border border-border bg-white px-3 text-sm text-heading placeholder:text-muted",
          inputClassName,
        )}
      />

      {open && query.trim() ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 rounded-[var(--radius-card)] border border-border bg-card p-2 shadow-[var(--shadow)]"
        >
          {results.length ? (
            <div className="grid gap-1">
              {results.map((item, idx) => {
                const active = idx === activeIndex;
                const rowClass =
                  "block rounded-[var(--radius-ui)] px-3 py-2 text-left transition-colors " +
                  (active ? "bg-blue-pale" : "hover:bg-background-2");

                if (item.comingSoon) {
                  return (
                    <div key={`${item.url}-${item.title}`} role="option" aria-selected={active} className={rowClass}>
                      <div className="flex items-center justify-between gap-3">
                        <div className="text-sm font-semibold text-heading">{item.title}</div>
                        <span className="rounded-full bg-amber-pale px-2 py-0.5 text-[11px] font-semibold text-amber">
                          Coming soon
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-muted">{item.description}</div>
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-blue">{item.category}</div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={`${item.url}-${item.title}`}
                    href={item.url}
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      setOpen(false);
                      onSelect?.();
                    }}
                    className={rowClass}
                  >
                    <div className="text-sm font-semibold text-heading">{item.title}</div>
                    <div className="mt-1 text-xs text-muted">{item.description}</div>
                    <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-blue">{item.category}</div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="rounded-[var(--radius-ui)] bg-background-2 px-3 py-3 text-sm text-muted">{EMPTY_STATE}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
