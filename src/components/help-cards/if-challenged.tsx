import type { HelpCardRule, HelpCardSource } from "@/data/help-cards/types";
import { HelpCardCopyButton } from "@/components/help-cards/help-card-copy-button";

export function IfChallenged({
  rules,
  sources,
  cardTitle,
}: {
  rules: HelpCardRule[];
  sources: HelpCardSource[];
  cardTitle: string;
}) {
  const relevant = rules.filter((rule) => rule.ifChallenged || rule.suggestedWording);
  if (relevant.length === 0) return null;

  return (
    <section aria-labelledby="if-challenged-heading">
      <h2 id="if-challenged-heading" className="text-2xl font-semibold text-[var(--color-ink)]">
        If you are challenged
      </h2>
      <p className="mt-2 max-w-[68ch] text-sm leading-6 text-[var(--color-text-muted)]">
        Point calmly to the source. This wording is a suggestion, not a legal quotation — the official
        sources below are what matters.
      </p>
      <ul className="mt-4 list-none space-y-4 p-0" role="list">
        {relevant.map((rule) => {
          const ruleSources = rule.sourceIds
            .map((id) => sources.find((source) => source.id === id))
            .filter((source): source is HelpCardSource => Boolean(source));
          return (
            <li
              key={rule.id}
              className="help-card-print-area rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5"
            >
              <p className="text-sm font-semibold text-[var(--color-ink)]">{rule.headline}</p>
              {rule.ifChallenged ? (
                <p className="mt-1.5 text-sm leading-6 text-[var(--color-text-muted)]">{rule.ifChallenged}</p>
              ) : null}
              {rule.suggestedWording ? (
                <>
                  <blockquote className="mt-3 max-w-[62ch] rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-3 text-sm leading-6 text-[var(--color-ink)]">
                    {rule.suggestedWording}
                  </blockquote>
                  <HelpCardCopyButton
                    text={rule.suggestedWording}
                    label="Copy wording"
                    accessibleName={`Copy suggested wording for ${rule.headline.toLowerCase()} in ${cardTitle}`}
                    variant="quiet"
                    className="mt-3 no-print"
                  />
                </>
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
        })}
      </ul>
    </section>
  );
}
