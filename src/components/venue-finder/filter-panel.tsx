"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { FILTER_GROUPS } from "@/lib/venue-finder";

type Props = {
  selected: string[];
  onChange: (next: string[]) => void;
  idPrefix?: string;
  className?: string;
};

export function FilterPanel({ selected, onChange, idPrefix = "vf", className }: Props) {
  const baseId = useId().replace(/:/g, "");
  const prefix = idPrefix || baseId;
  const selectedSet = new Set(selected);

  function toggle(key: string) {
    const next = new Set(selectedSet);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    onChange(Array.from(next));
  }

  return (
    <nav aria-label="Filter venue results" className={className}>
      {FILTER_GROUPS.map((group) => (
        <section key={group.title} className="border-b border-border py-4 first:pt-0 last:border-b-0">
          <h3 className="text-sm font-semibold text-[var(--color-ink)]">{group.title}</h3>
          <ul className="mt-3 space-y-2">
            {group.filters.map((filter) => {
              const inputId = `${prefix}-${filter.key.replace(/[^a-z0-9]+/gi, "-")}`;
              const checked = selectedSet.has(filter.key);
              return (
                <li key={`${group.title}-${filter.label}`}>
                  <label
                    htmlFor={inputId}
                    className="flex cursor-pointer items-start gap-2 text-sm text-muted"
                  >
                    <input
                      id={inputId}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(filter.key)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--color-primary)]"
                    />
                    <span className={cn(checked && "font-semibold text-[var(--color-ink)]")}>
                      {filter.label}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      {selected.length > 0 ? (
        <button
          type="button"
          className="mt-4 w-full rounded-[var(--radius-ui)] border border-border px-3 py-2 text-sm font-semibold text-[var(--color-ink)] hover:bg-background-2"
          onClick={() => onChange([])}
        >
          Clear all filters
        </button>
      ) : null}
    </nav>
  );
}
