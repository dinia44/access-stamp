import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import type { GuideResourcePack } from "@/lib/guide-resources";
import type { PracticalGuideWorkflow } from "@/lib/practical-guide";
import { GuideReadAloud } from "@/components/guide/guide-read-aloud";
import { GuideFaqSection } from "@/components/guide/guide-faq-section";
import { GuideFullGuideCta } from "@/components/guide/guide-full-guide-cta";
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
  const sections = [
    ["guide-start-here", "Start here"],
    ["guide-steps", "Step-by-step guide"],
    ...(workflow.evidenceChecklist?.length
      ? [["guide-evidence", "Evidence / what helps"]]
      : []),
    ...(workflow.copyableTemplates?.length ||
    workflow.templates.some((t) => t.href || t.body) ||
    resources
      ? [["guide-templates", "Templates"]]
      : []),
    ...(workflow.escalation?.length || workflow.commonMistakes?.length
      ? [["guide-escalation", "If things go wrong"]]
      : []),
    ["guide-sources", "Official sources"],
    ["guide-personal", "Make this guide personal"],
  ];
  const readText = [
    title,
    workflow.subtitle,
    ...workflow.summary,
    ...(workflow.firstThreeActions ?? []),
    ...workflow.steps.flatMap((s) => [
      s.title,
      s.content.intro,
      ...(s.content.introExtra ?? []),
      ...s.content.whatThisMeans,
      ...s.content.checklist,
      s.content.example,
    ]),
    ...(workflow.evidenceChecklist ?? []),
    ...(workflow.escalation ?? []),
  ].join(". ");
  const summary = (
    workflow.atAGlance.length ? workflow.atAGlance : workflow.summary
  ).slice(0, 5);
  return (
    <article className="mx-auto max-w-3xl space-y-8 px-4 py-10 sm:px-6">
      <Link
        href="/advice"
        className="inline-flex min-h-11 items-center underline"
      >
        All guides
      </Link>
      <header className="space-y-4">
        <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
        <p className="text-lg text-muted">{workflow.subtitle}</p>
        <p className="text-sm text-muted">
          Reviewed / updated {article.lastReviewed ?? article.updated} ·{" "}
          {Array.isArray(article.nations)
            ? article.nations.join(", ")
            : (article.nations ?? "Check jurisdiction in sources")}{" "}
          ·{" "}
          {article.readTimeMinutes ??
            Math.max(1, Math.ceil(readText.split(/\s+/).length / 200))}{" "}
          min read
        </p>
        <GuideReadAloud text={readText} compact />
      </header>
      <section>
        <h2 className="text-xl font-semibold">At a glance</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          {summary.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
      <nav
        aria-label="On this page"
        className="sticky top-20 z-20 rounded-xl border border-border bg-background p-3 lg:top-24"
      >
        <details>
          <summary className="min-h-11 cursor-pointer py-2 font-semibold">
            On this page
          </summary>
          <ul>
            {sections.map(([id, label]) => (
              <li key={id}>
                <a
                  className="inline-flex min-h-11 items-center underline"
                  href={`#${id}`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </nav>
      {workflow.warningBox ? (
        <aside className="border-l-4 border-amber-600 pl-4 text-sm">
          <strong>{workflow.warningBox.title}</strong>
          <p>{workflow.warningBox.text}</p>
        </aside>
      ) : null}
      <section id="guide-start-here" className="scroll-mt-44">
        <h2 className="text-xl font-semibold">Start here</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5">
          {(workflow.firstThreeActions?.length
            ? workflow.firstThreeActions
            : workflow.steps
                .slice(0, 3)
                .map((s) => s.content.checklist[0] ?? s.title)
          )
            .slice(0, 3)
            .map((s) => (
              <li key={s}>{s}</li>
            ))}
        </ol>
      </section>
      <section id="guide-steps" className="scroll-mt-44 space-y-7">
        <h2 className="text-2xl font-semibold">Step-by-step guide</h2>
        {workflow.steps.map((step) => (
          <section
            key={step.id}
            className="space-y-3 border-b border-border pb-6"
          >
            <h3 id={`step-${step.id}`} className="text-xl font-semibold">
              {step.number}. {step.title}
            </h3>
            <p>{step.content.intro}</p>
            {step.content.introExtra?.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="list-disc space-y-2 pl-5">
              {step.content.whatThisMeans.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <InteractiveChecklist
              items={step.content.checklist}
              labelledBy={`step-${step.id}`}
            />
            {step.content.extraSections?.map((s) => (
              <div key={s.title}>
                <h4 className="font-semibold">{s.title}</h4>
                <ul className="list-disc pl-5">
                  {s.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
            {step.content.example ? (
              <blockquote className="whitespace-pre-wrap border-l-2 border-border pl-4 text-sm">
                {step.content.example}
              </blockquote>
            ) : null}
          </section>
        ))}
      </section>
      {workflow.evidenceChecklist?.length ? (
        <section id="guide-evidence" className="scroll-mt-44 space-y-3">
          <h2 id="evidence-heading" className="text-xl font-semibold">
            Evidence / what helps
          </h2>
          <InteractiveChecklist
            items={workflow.evidenceChecklist}
            labelledBy="evidence-heading"
          />
        </section>
      ) : null}
      {sections.some((s) => s[0] === "guide-templates") ? (
        <section id="guide-templates" className="scroll-mt-44 space-y-4">
          <h2 className="text-xl font-semibold">Templates</h2>
          {workflow.copyableTemplates?.map((t) => (
            <div key={t.title}>
              <h3 className="font-semibold">{t.title}</h3>
              <p className="text-sm text-muted">{t.useWhen}</p>
              <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-background-2 p-4 font-sans text-sm">
                {t.body}
              </pre>
            </div>
          ))}
          {workflow.templates
            .filter((t) => t.href || t.body)
            .map((t) => (
              <div key={t.title}>
                {t.href ? (
                  <a
                    href={t.href}
                    className="inline-flex min-h-11 items-center underline"
                  >
                    {t.title} ({t.format})
                  </a>
                ) : (
                  <>
                    <h3 className="font-semibold">{t.title}</h3>
                    <p className="whitespace-pre-wrap">{t.body}</p>
                  </>
                )}
              </div>
            ))}
          {resources ? <GuideFullGuideCta resources={resources} /> : null}
        </section>
      ) : null}
      {sections.some((s) => s[0] === "guide-escalation") ? (
        <section id="guide-escalation" className="scroll-mt-44">
          <h2 className="text-xl font-semibold">If things go wrong</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {[
              ...(workflow.escalation ?? []),
              ...(workflow.commonMistakes ?? []),
            ].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      ) : null}
      {workflow.faqs?.length ? (
        <GuideFaqSection
          faqs={workflow.faqs}
          headingId={`guide-faq-${article.slug}`}
        />
      ) : null}
      <section id="guide-sources" className="scroll-mt-44">
        <h2 className="text-xl font-semibold">Official sources</h2>
        <ul>
          {(
            workflow.officialLinks ??
            article.sections.flatMap((s) => (s.type === "links" ? s.items : []))
          ).map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className="inline-flex min-h-11 items-center underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section
        id="guide-personal"
        className="scroll-mt-44 border-y border-border py-6"
      >
        <h2 className="text-xl font-semibold">Make this guide personal</h2>
        <p className="my-3">
          Tell Access Stamp what is happening and we’ll turn this guide into a
          practical plan for your situation.
        </p>
        <Link
          className="inline-flex min-h-11 items-center font-semibold underline"
          href={`/ask?guide=${encodeURIComponent(article.slug)}`}
        >
          Personalise this guide →
        </Link>
      </section>
      {workflow.relatedGuides?.length ? (
        <section>
          <h2 className="text-xl font-semibold">Related guides</h2>
          <ul>
            {workflow.relatedGuides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="inline-flex min-h-11 items-center underline"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
