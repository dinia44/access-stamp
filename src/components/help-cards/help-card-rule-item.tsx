import type { HelpCardRule, HelpCardSource } from "@/data/help-cards/types";
import { RuleStatusBadge } from "@/components/help-cards/rule-status";
import { ApplicabilityLabel, AuthorityLabel } from "@/components/help-cards/authority-label";

function resolveSources(rule: HelpCardRule, sources: HelpCardSource[]): HelpCardSource[] {
  return rule.sourceIds
    .map((id) => sources.find((source) => source.id === id))
    .filter((source): source is HelpCardSource => Boolean(source));
}

export function HelpCardRuleItem({
  rule,
  sources,
}: {
  rule: HelpCardRule;
  sources: HelpCardSource[];
}) {
  const ruleSources = resolveSources(rule, sources);
  const primaryAuthority = ruleSources[0];

  return (
    <li className="help-card-print-area rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <RuleStatusBadge status={rule.status} />
        {primaryAuthority ? (
          <AuthorityLabel type={primaryAuthority.authorityType} authority={primaryAuthority.authority} />
        ) : null}
      </div>

      <h4 className="mt-3 text-lg font-semibold leading-7 text-[var(--color-ink)]">{rule.headline}</h4>
      <p className="mt-1.5 text-sm leading-6 text-[var(--color-text-muted)]">{rule.plainEnglish}</p>

      <div className="mt-2">
        <ApplicabilityLabel applicability={rule.applicability} />
      </div>

      {rule.conditions?.length ? (
        <div className="mt-3">
          <p className="text-sm font-semibold text-[var(--color-ink)]">Conditions</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5" role="list">
            {rule.conditions.map((condition) => (
              <li key={condition} className="text-sm leading-6 text-[var(--color-ink)]">
                {condition}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rule.exceptions?.length ? (
        <div className="mt-3">
          <p className="text-sm font-semibold text-[var(--color-ink)]">Exceptions</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5" role="list">
            {rule.exceptions.map((exception) => (
              <li key={exception} className="text-sm leading-6 text-[var(--color-ink)]">
                {exception}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rule.evidenceToCarry?.length ? (
        <div className="mt-3">
          <p className="text-sm font-semibold text-[var(--color-ink)]">Useful to have</p>
          <ul className="mt-1.5 list-disc space-y-1 pl-5" role="list">
            {rule.evidenceToCarry.map((item) => (
              <li key={item} className="text-sm leading-6 text-[var(--color-ink)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {ruleSources.length ? (
        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
          {ruleSources.map((source) => (
            <a
              key={source.id}
              href={source.url}
              className="text-xs font-semibold text-[var(--color-brand)] underline underline-offset-4"
            >
              {source.title}
            </a>
          ))}
        </div>
      ) : null}
    </li>
  );
}
