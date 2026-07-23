import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { InteractiveChecklist } from "@/components/guide/interactive-checklist";
import { CopyableScript } from "@/components/design-system/copyable-script";
import {
  getGuideEvidenceItems,
  getGuideKeySteps,
  getGuideMistakes,
  getGuideOfficialLinks,
  getGuideSummary,
  getGuideTemplates,
  getGuideUseIfItems,
  getRelatedToolsForGuide,
} from "@/lib/guide-article-structure";
import { getGuideLastReviewed } from "@/lib/advice-guide-meta";
import { adviceTopicLabel } from "@/lib/advice-topics";
import { Card } from "@/components/ui";

export function GuideArticleIntro({ article }: { article: AdviceArticle }) {
  const summary = getGuideSummary(article);
  const useIf = getGuideUseIfItems(article);

  return (
    <div className="space-y-6">
      <p className="text-base leading-7 text-text">{summary}</p>

      {useIf.length ? (
        <section aria-labelledby="guide-use-if-heading">
          <h2 id="guide-use-if-heading" className="text-lg font-semibold text-heading">
            Use this guide if…
          </h2>
          <ul className="mt-3 space-y-2">
            {useIf.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

export function GuideArticleStructuredSections({ article }: { article: AdviceArticle }) {
  const steps = getGuideKeySteps(article);
  const evidence = getGuideEvidenceItems(article);
  const mistakes = getGuideMistakes(article);
  const templates = getGuideTemplates(article);
  const officialLinks = getGuideOfficialLinks(article);
  const tools = getRelatedToolsForGuide(article);

  return (
    <div className="space-y-8">
      {steps.length ? (
        <section aria-labelledby="guide-key-steps-heading">
          <h2 id="guide-key-steps-heading" className="text-lg font-semibold text-heading">
            Key steps
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-text">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      ) : null}

      {evidence.length ? (
        <section aria-labelledby="guide-evidence-heading">
          <h2 id="guide-evidence-heading" className="text-lg font-semibold text-heading">
            Evidence / checklist
          </h2>
          <InteractiveChecklist
            items={evidence}
            labelledBy="guide-evidence-heading"
            className="mt-3 space-y-2 rounded-2xl border border-border bg-background-2 p-4"
          />
        </section>
      ) : null}

      {templates.length ? (
        <section aria-labelledby="guide-templates-heading" className="space-y-4">
          <h2 id="guide-templates-heading" className="text-lg font-semibold text-heading">
            Copyable template
          </h2>
          {templates.map((template) => (
            <div key={template.title}>
              <CopyableScript script={template.body} label="Copy template" />
            </div>
          ))}
        </section>
      ) : null}

      {mistakes.length ? (
        <section aria-labelledby="guide-mistakes-heading">
          <h2 id="guide-mistakes-heading" className="text-lg font-semibold text-heading">
            Common mistakes
          </h2>
          <ul className="mt-3 space-y-2">
            {mistakes.map((item) => (
              <li key={item} className="rounded-xl border border-border bg-card px-4 py-3 text-sm leading-6 text-text">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {officialLinks.length ? (
        <section aria-labelledby="guide-official-heading">
          <h2 id="guide-official-heading" className="text-lg font-semibold text-heading">
            Official sources
          </h2>
          <ul className="mt-3 grid gap-2 text-sm">
            {officialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue underline-offset-2 hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {tools.length ? (
        <section aria-labelledby="guide-tools-heading">
          <h2 id="guide-tools-heading" className="text-lg font-semibold text-heading">
            Related tools
          </h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Card className="h-full p-4">
                  <Link href={tool.href} className="font-semibold text-blue hover:underline">
                    {tool.label}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{tool.description}</p>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="text-xs text-muted">
        Reviewed {getGuideLastReviewed(article)} · {adviceTopicLabel(article.categorySlug)}
      </p>
    </div>
  );
}
