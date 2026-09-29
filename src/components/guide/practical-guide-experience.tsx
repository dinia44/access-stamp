import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import type { GuideResourcePack } from "@/lib/guide-resources";
import type { PracticalGuideWorkflow } from "@/lib/practical-guide";
import { GuideFaqSection } from "@/components/guide/guide-faq-section";
import { GuideFullGuideCta } from "@/components/guide/guide-full-guide-cta";
import { GuideOverview } from "@/components/guide/guide-overview";
import { InteractiveChecklist } from "@/components/guide/interactive-checklist";

export function PracticalGuideExperience({
  article,
  workflow,
  resources,
}: {
  article: AdviceArticle;
  workflow: PracticalGuideWorkflow;
  resources?: GuideResourcePack | null;
}) {
  const title = workflow.displayTitle ?? article.title;
  const readText = [
    title,
    workflow.subtitle,
    ...workflow.summary,
    ...(workflow.firstThreeActions ?? []),
    ...workflow.steps.flatMap((step) => [
      step.title,
      step.content.intro,
      ...(step.content.introExtra ?? []),
      ...step.content.whatThisMeans,
      ...step.content.checklist,
      step.content.example,
    ]),
    ...(workflow.evidenceChecklist ?? []),
    ...(workflow.escalation ?? []),
  ].join(". ");
  const summary = (workflow.atAGlance.length ? workflow.atAGlance : workflow.summary).slice(0, 5);
  const actions = (
    workflow.firstThreeActions?.length
      ? workflow.firstThreeActions
      : workflow.steps.slice(0, 3).map((step) => step.content.checklist[0] ?? step.title)
  ).slice(0, 3);
  const sections = [
    ["guide-start-here", "Start here"],
    ["guide-steps", "Step-by-step"],
    ...(workflow.evidenceChecklist?.length ? [["guide-evidence", "What to prepare"]] : []),
    ...(workflow.copyableTemplates?.length || workflow.templates.some((template) => template.href || template.body) || resources
      ? [["guide-templates", "Templates"]]
      : []),
    ...(workflow.escalation?.length || workflow.commonMistakes?.length ? [["guide-escalation", "If things go wrong"]] : []),
    ...(workflow.faqs?.length ? [["guide-faq", "Questions"]] : []),
    ["guide-sources", "Official sources"],
  ];
  const aiHref = (mode: string) => `/ask?guide=${encodeURIComponent(article.slug)}&mode=${mode}`;

  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:px-6 sm:py-12">
      <GuideOverview
        article={article}
        title={title}
        subtitle={workflow.subtitle}
        summary={summary}
        actions={actions}
        readText={readText}
        guideAnchor="guide-steps"
      />

      {workflow.warningBox ? (
        <aside className="rounded-[var(--radius-lg)] border border-[var(--color-warning)]/30 bg-[var(--color-warning-soft)] p-5" role="note">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-warning)]">Important</p>
          <h2 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">{workflow.warningBox.title}</h2>
          <p className="mt-2 leading-7 text-[var(--color-text)]">{workflow.warningBox.text}</p>
        </aside>
      ) : null}

      <nav
        aria-label="On this page"
        className="sticky top-20 z-20 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]/95 p-3 shadow-[var(--shadow-soft)] backdrop-blur lg:top-24"
      >
        <details>
          <summary className="min-h-11 cursor-pointer py-2 font-semibold text-[var(--color-ink)]">On this page</summary>
          <ul className="border-t border-[var(--color-border)] pt-2">
            {sections.map(([id, label]) => (
              <li key={id}>
                <a className="inline-flex min-h-11 items-center text-sm font-semibold text-[var(--color-brand)] hover:underline" href={`#${id}`}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>

      <section id="guide-steps" className="scroll-mt-44 space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Full guide</p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.025em] text-[var(--color-ink)]">Step-by-step</h2>
        </div>
        {workflow.steps.map((step) => (
          <section key={step.id} className="space-y-4 border-b border-[var(--color-border)] pb-8 last:border-b-0">
            <div className="flex gap-4">
              <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full bg-[var(--color-brand-soft)] text-sm font-bold text-[var(--color-brand)]">
                {step.number}
              </span>
              <h3 id={`step-${step.id}`} className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
                {step.title}
              </h3>
            </div>
            <p className="leading-8 text-[var(--color-text)]">{step.content.intro}</p>
            {step.content.introExtra?.map((paragraph) => (
              <p key={paragraph} className="leading-8 text-[var(--color-text)]">{paragraph}</p>
            ))}
            {step.content.whatThisMeans.length ? (
              <ul className="list-disc space-y-2 pl-5 leading-7 text-[var(--color-text)] marker:text-[var(--color-brand)]">
                {step.content.whatThisMeans.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            {step.content.checklist.length ? (
              <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5">
                <p className="mb-3 text-sm font-semibold text-[var(--color-ink)]">What to do</p>
                <InteractiveChecklist items={step.content.checklist} labelledBy={`step-${step.id}`} />
              </div>
            ) : null}
            {step.content.extraSections?.map((extra) => (
              <div key={extra.title}>
                <h4 className="font-semibold text-[var(--color-ink)]">{extra.title}</h4>
                <ul className="mt-2 list-disc space-y-2 pl-5 leading-7 marker:text-[var(--color-brand)]">
                  {extra.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
            {step.content.example ? (
              <blockquote className="rounded-r-[var(--radius-lg)] border-l-4 border-[var(--color-trust)] bg-[var(--color-trust-soft)] px-5 py-4 text-sm leading-7 text-[var(--color-text)]">
                {step.content.example}
              </blockquote>
            ) : null}
          </section>
        ))}
      </section>

      <section className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)]" aria-labelledby={`guide-ai-${article.slug}`}>
        <div className="p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-trust)]">Access Stamp AI</p>
          <h2 id={`guide-ai-${article.slug}`} className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">Use this guide, don’t just read it</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">These tools stay grounded in this guide and its sources. Choose the job you need help with.</p>
        </div>
        <div className="grid border-t border-[var(--color-border)] sm:grid-cols-2">
          <Link href={aiHref("personalise")} className="min-h-32 p-5 hover:bg-[var(--color-trust-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-r sm:border-[var(--color-border)]">
            <span className="text-sm font-semibold text-[var(--color-ink)]">Make this relevant to me</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--color-text-muted)]">Get a sourced plan based on what is happening to you.</span>
          </Link>
          <Link href={aiHref("explain")} className="min-h-32 border-t border-[var(--color-border)] p-5 hover:bg-[var(--color-information-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-t-0">
            <span className="text-sm font-semibold text-[var(--color-ink)]">Explain this simply</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--color-text-muted)]">Tell us which part is confusing and get a plain-English explanation.</span>
          </Link>
          <Link href={aiHref("draft")} className="min-h-32 border-t border-[var(--color-border)] p-5 hover:bg-[var(--color-brand-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-r">
            <span className="text-sm font-semibold text-[var(--color-ink)]">Draft this for me</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--color-text-muted)]">Turn the guide into wording for an email, request or complaint.</span>
          </Link>
          <Link href={aiHref("checklist")} className="min-h-32 border-t border-[var(--color-border)] p-5 hover:bg-[var(--color-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)]">
            <span className="text-sm font-semibold text-[var(--color-ink)]">Build my checklist</span>
            <span className="mt-1 block text-sm leading-6 text-[var(--color-text-muted)]">Reduce the guide to the actions and evidence you need to keep track of.</span>
          </Link>
        </div>
      </section>

      {workflow.evidenceChecklist?.length ? (
        <section id="guide-evidence" className="scroll-mt-44 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-trust)]">Preparation</p>
          <h2 id="evidence-heading" className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">What to prepare</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">Only gather what genuinely helps with this process; you do not need paperwork for the sake of it.</p>
          <div className="mt-4">
            <InteractiveChecklist items={workflow.evidenceChecklist} labelledBy="evidence-heading" />
          </div>
        </section>
      ) : null}

      {sections.some((section) => section[0] === "guide-templates") ? (
        <section id="guide-templates" className="scroll-mt-44 space-y-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Ready-to-use wording</p>
            <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">Templates</h2>
          </div>
          {workflow.copyableTemplates?.map((template) => (
            <div key={template.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h3 className="font-semibold text-[var(--color-ink)]">{template.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{template.useWhen}</p>
              <pre className="mt-3 whitespace-pre-wrap break-words rounded-[var(--radius-md)] bg-[var(--color-surface-subtle)] p-4 font-sans text-sm leading-7">{template.body}</pre>
            </div>
          ))}
          {workflow.templates
            .filter((template) => template.href || template.body)
            .map((template) => (
              <div key={template.title} className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                {template.href ? (
                  <a href={template.href} className="inline-flex min-h-11 items-center font-semibold text-[var(--color-brand)] hover:underline">
                    {template.title} ({template.format}) →
                  </a>
                ) : (
                  <>
                    <h3 className="font-semibold text-[var(--color-ink)]">{template.title}</h3>
                    <p className="mt-3 whitespace-pre-wrap leading-7 text-[var(--color-text)]">{template.body}</p>
                  </>
                )}
              </div>
            ))}
          {resources ? <GuideFullGuideCta resources={resources} /> : null}
        </section>
      ) : null}

      {sections.some((section) => section[0] === "guide-escalation") ? (
        <section id="guide-escalation" className="scroll-mt-44 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-danger)]">Problems and refusals</p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">If things go wrong</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[var(--color-text)] marker:text-[var(--color-danger)]">
            {[...(workflow.escalation ?? []), ...(workflow.commonMistakes ?? [])].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {workflow.faqs?.length ? (
        <div id="guide-faq" className="scroll-mt-44">
          <GuideFaqSection faqs={workflow.faqs} headingId={`guide-faq-${article.slug}`} />
        </div>
      ) : null}

      <section id="guide-sources" className="scroll-mt-44 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-trust)]">Trust and checking</p>
        <h2 className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">Official sources</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">Use these to check the underlying rule or process, especially if your circumstances are unusual.</p>
        <ul className="mt-3 space-y-1">
          {(workflow.officialLinks ?? article.sections.flatMap((section) => (section.type === "links" ? section.items : []))).map((source) => (
            <li key={source.href}>
              <a href={source.href} className="inline-flex min-h-11 items-center font-semibold text-[var(--color-brand)] hover:underline">
                {source.label} →
              </a>
            </li>
          ))}
        </ul>
      </section>

      {workflow.relatedGuides?.length ? (
        <section>
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">Related guides</h2>
          <ul className="mt-3 divide-y divide-[var(--color-border)] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] px-5">
            {workflow.relatedGuides.slice(0, 3).map((guide) => (
              <li key={guide.href}>
                <Link href={guide.href} className="flex min-h-14 items-center justify-between gap-4 font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)]">
                  <span>{guide.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
