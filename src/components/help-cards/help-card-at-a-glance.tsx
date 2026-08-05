import type { HelpCardRule } from "@/data/help-cards/types";
import { RuleStatusBadge } from "@/components/help-cards/rule-status";

export function HelpCardAtAGlance({ rules }: { rules: HelpCardRule[] }) {
  const highlights = rules.filter(
    (rule) => rule.atAGlance || rule.status === "entitlement" || rule.status === "restriction",
  );
  const items = highlights.length > 0 ? highlights : rules.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="at-a-glance-heading"
      className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-4 sm:p-5"
    >
      <h2 id="at-a-glance-heading" className="text-lg font-semibold text-[var(--color-ink)]">
        At a glance
      </h2>
      <ul className="mt-3 list-none space-y-2.5 p-0" role="list">
        {items.map((rule) => (
          <li key={rule.id} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
            <span className="sm:pt-0.5">
              <RuleStatusBadge status={rule.status} />
            </span>
            <span className="text-sm font-medium leading-6 text-[var(--color-ink)]">{rule.headline}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
