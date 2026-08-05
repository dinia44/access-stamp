"use client";

import type { HelpCardVariant } from "@/data/help-cards/types";
import { cn } from "@/lib/utils";

export function HelpCardContextSelector({
  variants,
  activeId,
  onChange,
}: {
  variants: HelpCardVariant[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  if (variants.length <= 1) return null;

  return (
    <div className="no-print rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <fieldset>
        <legend className="text-sm font-semibold text-[var(--color-ink)]">Choose your context</legend>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Rules can differ. Select the option that matches your situation.
        </p>
        <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Help card context">
          {variants.map((variant) => {
            const active = variant.id === activeId;
            return (
              <button
                key={variant.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(variant.id)}
                className={cn(
                  "inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]",
                  active
                    ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] text-[var(--color-brand-pressed)]"
                    : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:border-[var(--color-brand)]",
                )}
              >
                {variant.contextLabel}
              </button>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
