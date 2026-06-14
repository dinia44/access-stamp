"use client";

import Link from "next/link";
import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { Button } from "@/components/ui/Button";

type GuideDetailSectionsProps = {
  workflow: PracticalGuideWorkflow;
  onAskAi: (prefill?: string) => void;
  part?: "intro" | "detail" | "all";
};

function CopyBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-[#F1D8C7] bg-[#FFFDF9] p-5">
      <h3 className="text-sm font-bold text-heading">{title}</h3>
      <pre className="mt-3 overflow-x-auto whitespace-pre-wrap font-sans text-sm leading-7 text-text">{body}</pre>
    </article>
  );
}

export function GuideDetailSections({ workflow, onAskAi, part = "all" }: GuideDetailSectionsProps) {
  const {
    quickAnswer,
    whoThisIsFor,
    firstThreeActions,
    warningBox,
    evidenceChecklist,
    copyableTemplates,
    commonMistakes,
    escalation,
    relatedGuides,
  } = workflow;

  const showIntro = part === "all" || part === "intro";
  const showDetail = part === "all" || part === "detail";

  return (
    <div className="space-y-8">
      {showIntro && warningBox ? (
        <aside
          id="guide-trust"
          className="rounded-2xl border border-[#E8C4A8] bg-[#FFF8F1] p-5"
          aria-label="Guide information"
        >
          <p className="text-sm font-bold text-heading">{warningBox.title}</p>
          <p className="mt-2 text-sm leading-6 text-muted">{warningBox.text}</p>
        </aside>
      ) : null}

      {showIntro && firstThreeActions?.length ? (
        <section id="guide-start-here" className="scroll-mt-28" aria-labelledby="guide-start-here-heading">
          <div className="rounded-2xl border border-[#59682A]/20 bg-[#EDF7ED]/40 p-6 shadow-[var(--shadow-soft)]">
            <h2 id="guide-start-here-heading" className="text-lg font-bold text-heading">
              Start here
            </h2>
            <p className="mt-1 text-sm text-muted">Three immediate actions before you work through the full guide.</p>
            <ol className="mt-4 space-y-3">
              {firstThreeActions.map((action, idx) => (
                <li key={action} className="flex gap-3 rounded-xl border border-[#C8E6C9] bg-white/80 px-4 py-3 text-sm leading-6 text-text">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#59682A] text-xs font-bold text-white">
                    {idx + 1}
                  </span>
                  {action}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {showIntro && quickAnswer ? (
        <section id="guide-quick-answer" className="scroll-mt-28" aria-labelledby="guide-quick-answer-heading">
          <h2 id="guide-quick-answer-heading" className="text-lg font-bold text-heading">
            Quick answer
          </h2>
          <p className="mt-3 text-base leading-7 text-text">{quickAnswer}</p>
        </section>
      ) : null}

      {showIntro && whoThisIsFor?.length ? (
        <section id="guide-who" className="scroll-mt-28" aria-labelledby="guide-who-heading">
          <h2 id="guide-who-heading" className="text-lg font-bold text-heading">
            Who this guide is for
          </h2>
          <ul className="mt-3 space-y-2">
            {whoThisIsFor.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDetail && evidenceChecklist?.length ? (
        <section id="guide-evidence" className="scroll-mt-28" aria-labelledby="guide-evidence-heading">
          <h2 id="guide-evidence-heading" className="text-lg font-bold text-heading">
            Evidence checklist
          </h2>
          <p className="mt-1 text-sm text-muted">Keep or gather these before you contact an organisation or submit a form.</p>
          <ul className="mt-4 space-y-2 rounded-2xl border border-[#F1D8C7] bg-white p-4">
            {evidenceChecklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#E8C4A8] bg-[#FFF8F1] text-[10px] text-[#59682A]"
                  aria-hidden
                >
                  □
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDetail && copyableTemplates?.length ? (
        <section id="guide-copy-templates" className="scroll-mt-28 space-y-4" aria-labelledby="guide-copy-templates-heading">
          <div>
            <h2 id="guide-copy-templates-heading" className="text-lg font-bold text-heading">
              Copy-and-adapt templates
            </h2>
            <p className="mt-1 text-sm text-muted">Wording you can paste into email, letters, or conversation notes.</p>
          </div>
          {copyableTemplates.map((template) => (
            <CopyBlock key={template.title} title={template.title} body={template.body} />
          ))}
        </section>
      ) : null}

      {showDetail && commonMistakes?.length ? (
        <section id="guide-mistakes" className="scroll-mt-28" aria-labelledby="guide-mistakes-heading">
          <h2 id="guide-mistakes-heading" className="text-lg font-bold text-heading">
            Common mistakes
          </h2>
          <ul className="mt-3 space-y-2">
            {commonMistakes.map((item) => (
              <li key={item} className="flex items-start gap-2 rounded-xl border border-[#F1D8C7] bg-white px-4 py-3 text-sm leading-6 text-text">
                <span className="font-bold text-[#D93E10]" aria-hidden>
                  ×
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDetail && escalation?.length ? (
        <section id="guide-escalation" className="scroll-mt-28" aria-labelledby="guide-escalation-heading">
          <h2 id="guide-escalation-heading" className="text-lg font-bold text-heading">
            If they refuse, delay, or ignore you
          </h2>
          <ul className="mt-3 space-y-2">
            {escalation.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#59682A]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDetail && relatedGuides?.length ? (
        <section id="guide-related" className="scroll-mt-28" aria-labelledby="guide-related-heading">
          <h2 id="guide-related-heading" className="text-lg font-bold text-heading">
            Related guides
          </h2>
          <ul className="mt-3 grid gap-2">
            {relatedGuides.map((guide) => (
              <li key={guide.href}>
                <Link
                  href={guide.href}
                  className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] underline-offset-2 hover:text-[#F04A16] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
                >
                  {guide.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {showDetail ? (
      <section id="guide-ai-panel" className="scroll-mt-28 rounded-2xl border border-[#F5E6B8] bg-[#FFFBEB] p-5" aria-labelledby="guide-ai-panel-heading">
        <h2 id="guide-ai-panel-heading" className="text-lg font-bold text-heading">
          Access Stamp AI
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#78350F]">{workflow.aiIntro}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {workflow.aiSuggestions.slice(0, 3).map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => onAskAi(prompt)}
              className="rounded-full border border-[#F1D8C7] bg-white px-3 py-2 text-xs font-semibold text-[#59682A] transition-colors hover:border-[#F04A16] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              {prompt}
            </button>
          ))}
        </div>
        <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={() => onAskAi()}>
          Open AI assistant →
        </Button>
      </section>
      ) : null}
    </div>
  );
}
