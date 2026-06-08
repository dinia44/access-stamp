"use client";

import Image from "next/image";
import type { GuideStep } from "@/lib/practical-guide";
import { GuideAiTipStrip } from "@/components/guide/guide-ai-tip-strip";
import { GuideChecklistCard } from "@/components/guide/guide-checklist-card";
import { cn } from "@/lib/utils";

type GuideStepCardProps = {
  step: GuideStep;
  expanded: boolean;
  onToggle: () => void;
  onAskAi?: () => void;
  checklistState?: Record<string, boolean>;
  onChecklistToggle?: (id: string) => void;
};

export function GuideStepCard({
  step,
  expanded,
  onToggle,
  onAskAi,
  checklistState = {},
  onChecklistToggle,
}: GuideStepCardProps) {
  const isCompact = !expanded;
  const isCompleted = step.status === "completed";

  if (isCompact) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full min-h-[72px] items-center gap-4 rounded-2xl border border-[#F1D8C7] bg-white px-4 py-3 text-left shadow-[var(--shadow-soft)] transition-all hover:border-[#E8C4A8] hover:shadow-md focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2 sm:px-5"
        aria-expanded={expanded}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold",
            isCompleted
              ? "bg-[#EDF7ED] text-[#2F7D32]"
              : "border-2 border-[#E8C4A8] bg-white text-muted",
          )}
          aria-hidden
        >
          {isCompleted ? "✓" : step.number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-heading">{step.title}</span>
          {!isCompleted ? (
            <span className="mt-0.5 inline-flex rounded-full bg-[#FFF3E8] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
              To do
            </span>
          ) : null}
        </span>
        {step.image ? (
          <span className="relative hidden h-12 w-16 shrink-0 overflow-hidden rounded-lg sm:block">
            <Image
              src={step.image.src}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
              unoptimized={step.image.src.endsWith(".svg")}
            />
          </span>
        ) : null}
        <span className="shrink-0 text-muted" aria-hidden>
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
      {isCompleted && !expanded ? (
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center gap-4 px-4 py-4 text-left sm:px-5"
          aria-expanded={expanded}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF7ED] text-[#2F7D32] font-bold" aria-hidden>
            ✓
          </span>
          <span className="flex-1 text-sm font-bold text-heading">{step.title}</span>
          {step.image ? (
            <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-lg">
              <Image src={step.image.src} alt="" fill className="object-cover" sizes="56px" unoptimized={step.image.src.endsWith(".svg")} />
            </span>
          ) : null}
        </button>
      ) : (
        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                step.status === "active"
                  ? "bg-[#F04A16] text-white"
                  : isCompleted
                    ? "bg-[#EDF7ED] text-[#2F7D32]"
                    : "border-2 border-[#E8C4A8] text-muted",
              )}
              aria-hidden
            >
              {isCompleted ? "✓" : step.number}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold tracking-[-0.02em] text-heading sm:text-xl">{step.title}</h2>
              {step.description ? (
                <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
              ) : null}
            </div>
          </div>

          {step.checklist?.length ? (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-heading">Practical checklist</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {step.checklist.map((item) => (
                  <GuideChecklistCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    checked={checklistState[item.id]}
                    onToggle={() => onChecklistToggle?.(item.id)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {step.aiTip ? <GuideAiTipStrip className="mt-6" text={step.aiTip} onAskAi={onAskAi} /> : null}
        </div>
      )}
    </article>
  );
}
