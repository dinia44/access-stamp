"use client";

import { useId, useState } from "react";

type InteractiveChecklistProps = {
  items: string[];
  labelledBy: string;
  className?: string;
};

/** Real labelled checkboxes for actionable guide checklists. */
export function InteractiveChecklist({ items, labelledBy, className }: InteractiveChecklistProps) {
  const baseId = useId();
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <ul className={className ?? "mt-3 space-y-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4"} aria-labelledby={labelledBy}>
      {items.map((item, index) => {
        const id = `${baseId}-${index}`;
        return (
          <li key={item}>
            <label htmlFor={id} className="flex min-h-[44px] cursor-pointer items-start gap-3 text-sm leading-6 text-text">
              <input
                id={id}
                type="checkbox"
                checked={Boolean(checked[index])}
                onChange={(event) => setChecked((prev) => ({ ...prev, [index]: event.target.checked }))}
                className="mt-1 h-5 w-5 shrink-0 rounded border-[var(--color-border-mid)] text-[var(--color-trust)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:outline-offset-2"
              />
              <span className={checked[index] ? "text-[var(--color-text-muted)] line-through" : undefined}>{item}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
