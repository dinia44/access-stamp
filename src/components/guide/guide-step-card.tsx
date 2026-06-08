"use client";

import type { GuideStep } from "@/lib/guide-content/types";
import { cn } from "@/lib/utils";

type GuideStepCardProps = {
  step: GuideStep;
  expanded: boolean;
  onToggle: () => void;
  onAskAi?: (prompt: string) => void;
};

function StatusBadge({ label, status }: { label: string; status: GuideStep["status"] }) {
  const tone =
    status === "completed"
      ? "bg-[#EDF7ED] text-[#2F7D32] ring-[#C8E6C9]"
      : status === "active"
        ? "bg-[#FFE2D3] text-[#D93E10] ring-[#F1D8C7]"
        : "bg-[#FFF3E8] text-[#5E6A66] ring-[#F1D8C7]";

  return (
    <span className={cn("inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1", tone)}>
      {label}
    </span>
  );
}

export function GuideStepCard({ step, expanded, onToggle, onAskAi }: GuideStepCardProps) {
  const { content } = step;
  const panelId = `guide-step-panel-${step.id}`;

  if (!expanded) {
    return (
      <button
        type="button"
        id={`guide-step-trigger-${step.id}`}
        aria-expanded={false}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full min-h-[88px] items-start gap-4 rounded-2xl border border-[#F1D8C7] bg-white px-4 py-4 text-left shadow-[var(--shadow-soft)] transition-all hover:border-[#E8C4A8] hover:shadow-md focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2 sm:items-center sm:px-5"
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            step.status === "completed"
              ? "bg-[#EDF7ED] text-[#2F7D32]"
              : step.status === "active"
                ? "bg-[#F04A16] text-white"
                : "border-2 border-[#E8C4A8] bg-white text-muted",
          )}
          aria-hidden
        >
          {step.status === "completed" ? "✓" : step.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-heading">{step.title}</span>
          <span className="mt-1 block text-xs leading-5 text-muted">{step.preview}</span>
          <span className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-[#FFF8F1] px-2 py-0.5 text-[10px] font-semibold text-[#59682A] ring-1 ring-[#F1D8C7]">
              {step.outcome}
            </span>
            <StatusBadge label={step.statusLabel} status={step.status} />
          </span>
        </span>
        <span className="mt-1 shrink-0 text-muted sm:mt-0" aria-hidden>
          ▾
        </span>
      </button>
    );
  }

  return (
    <article
      className={cn(
        "overflow-hidden rounded-2xl border bg-white shadow-[var(--shadow-soft)]",
        step.status === "active" ? "border-[#E8C4A8] shadow-md" : "border-[#F1D8C7]",
      )}
    >
      <button
        type="button"
        id={`guide-step-trigger-${step.id}`}
        aria-expanded={true}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start gap-3 border-b border-[#F1D8C7] px-5 py-4 text-left transition-colors hover:bg-[#FFF8F1]/60 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-[-2px] sm:px-6"
      >
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            step.status === "active"
              ? "bg-[#F04A16] text-white"
              : step.status === "completed"
                ? "bg-[#EDF7ED] text-[#2F7D32]"
                : "border-2 border-[#E8C4A8] text-muted",
          )}
          aria-hidden
        >
          {step.status === "completed" ? "✓" : step.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-bold tracking-[-0.02em] text-heading">{step.title}</span>
          <span className="mt-1 block text-sm text-muted">{step.preview}</span>
        </span>
        <span className="shrink-0 text-muted" aria-hidden>
          ▴
        </span>
      </button>

      <div id={panelId} role="region" aria-labelledby={`guide-step-trigger-${step.id}`} className="space-y-6 p-5 sm:p-6">
        <div className="space-y-3 text-sm leading-7 text-text">
          <p>{content.intro}</p>
          {content.introExtra?.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>

        <section aria-labelledby={`${step.id}-what-means`}>
          <h3 id={`${step.id}-what-means`} className="text-sm font-bold text-heading">
            What this means
          </h3>
          <ul className="mt-3 space-y-2">
            {content.whatThisMeans.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${step.id}-checklist`}>
          <h3 id={`${step.id}-checklist`} className="text-sm font-bold text-heading">
            Practical checklist
          </h3>
          <ul className="mt-3 space-y-2 rounded-2xl border border-[#F1D8C7] bg-[#FFF8F1]/70 p-4">
            {content.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-text">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-[#E8C4A8] bg-white text-[10px] text-[#59682A]"
                  aria-hidden
                >
                  □
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {content.extraSections?.map((section) => (
          <section key={section.title} aria-labelledby={`${step.id}-${section.title}`}>
            <h3 id={`${step.id}-${section.title}`} className="text-sm font-bold text-heading">
              {section.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm leading-6 text-text">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#59682A]" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section
          aria-labelledby={`${step.id}-example`}
          className="rounded-2xl border border-[#F1D8C7] bg-[#FFFDF9] p-4"
        >
          <h3 id={`${step.id}-example`} className="text-sm font-bold text-heading">
            {content.exampleLabel ?? "Example"}
          </h3>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-text">{content.example}</p>
        </section>

        <div className="flex flex-col gap-3 rounded-2xl border border-[#F5E6B8] bg-[#FFFBEB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[#78350F]">
            <span className="font-bold text-[#92400E]">Ask the AI: </span>
            {content.aiPrompt}
          </p>
          <button
            type="button"
            onClick={() => onAskAi?.(content.aiPrompt)}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-[#59682A] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#45521F] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
          >
            Ask the AI →
          </button>
        </div>
      </div>
    </article>
  );
}
