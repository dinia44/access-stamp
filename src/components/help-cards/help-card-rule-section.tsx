import type { HelpCardRule, HelpCardSource } from "@/data/help-cards/types";
import { HelpCardRuleItem } from "@/components/help-cards/help-card-rule-item";
import { HELP_CARD_SECTIONS } from "@/lib/help-cards/sections";

export function HelpCardRuleSections({
  rules,
  sources,
}: {
  rules: HelpCardRule[];
  sources: HelpCardSource[];
}) {
  const sections = HELP_CARD_SECTIONS.map((section) => ({
    ...section,
    rules: rules.filter((rule) => rule.section === section.id),
  })).filter((section) => section.rules.length > 0);

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`section-${section.id}`}>
          <h3 id={`section-${section.id}`} className="text-lg font-semibold text-[var(--color-ink)]">
            {section.label}
          </h3>
          <ul className="mt-3 list-none space-y-3 p-0" role="list">
            {section.rules.map((rule) => (
              <HelpCardRuleItem key={rule.id} rule={rule} sources={sources} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
