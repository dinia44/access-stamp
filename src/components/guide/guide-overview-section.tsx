import Link from "next/link";
import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/ButtonLink";

type GuideOverviewSectionProps = {
  workflow: PracticalGuideWorkflow;
  categoryHref?: string;
  onAskAi: () => void;
};

const DEFAULT_NEXT_STEPS = [
  {
    title: "Work through each step",
    description: "Follow the checklist in order — the first step is open so you can start immediately.",
    action: "Jump to steps",
    href: "#guide-steps",
    kind: "link" as const,
  },
  {
    title: "Use a template",
    description: "Download wording you can adapt for letters, emails, or conversations.",
    action: "See templates",
    href: "#guide-templates",
    kind: "link" as const,
  },
  {
    title: "Ask Access Stamp AI",
    description: "Get help applying this guide to your situation with plain-English suggestions.",
    action: "Ask the AI",
    kind: "button" as const,
  },
] as const;

export function GuideOverviewSection({ workflow, categoryHref, onAskAi }: GuideOverviewSectionProps) {
  return (
    <section className="space-y-6" aria-labelledby="guide-overview-heading">
      <div className="rounded-2xl border border-[#F1D8C7] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <h2 id="guide-overview-heading" className="text-xl font-bold tracking-[-0.02em] text-heading sm:text-2xl">
          Guide summary
        </h2>
        <p className="mt-2 text-base leading-7 text-muted">{workflow.subtitle}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {workflow.summary.map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-[#F1D8C7] bg-[#FFF8F1]/70 px-4 py-3 text-base text-text">
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        {categoryHref ? (
          <Link
            href={categoryHref}
            className="mt-5 inline-flex min-h-[44px] items-center text-sm font-bold text-[#59682A] hover:text-[#F04A16] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
          >
            More guides in this topic →
          </Link>
        ) : null}
      </div>

      <div>
        <h3 className="text-lg font-bold text-heading">Practical next steps</h3>
        <p className="mt-1 text-base text-muted">Visible actions you can take now — no accordion required.</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {DEFAULT_NEXT_STEPS.map((step) => (
            <li key={step.title} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)]">
                <h4 className="text-base font-bold text-heading">{step.title}</h4>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{step.description}</p>
                {step.kind === "link" ? (
                  <ButtonLink
                    href={step.href}
                    variant="ghost"
                    size="sm"
                    className="mt-4 px-0 text-[#59682A] hover:bg-transparent hover:text-[#F04A16]"
                  >
                    {step.action} →
                  </ButtonLink>
                ) : (
                  <Button type="button" variant="secondary" size="sm" className="mt-4" onClick={onAskAi}>
                    {step.action} →
                  </Button>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
