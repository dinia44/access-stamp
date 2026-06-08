"use client";

import { useCallback, useMemo, useState } from "react";
import type { AdviceArticle } from "@/lib/content/types";
import type { PracticalGuideWorkflow } from "@/lib/practical-guide";
import { useChat } from "@/components/chat/provider";
import { GuideAiSidebar } from "@/components/guide/guide-ai-sidebar";
import { GuideBottomActionBar } from "@/components/guide/guide-bottom-action-bar";
import { GuideHeader } from "@/components/guide/guide-header";
import { GuideProgressStepper } from "@/components/guide/guide-progress-stepper";
import { GuideStepCard } from "@/components/guide/guide-step-card";
import { GuideSupportColumn } from "@/components/guide/guide-support-column";
import { cn } from "@/lib/utils";

type PracticalGuideExperienceProps = {
  article: AdviceArticle;
  workflow: PracticalGuideWorkflow;
};

export function PracticalGuideExperience({ article, workflow }: PracticalGuideExperienceProps) {
  const { openChat } = useChat();
  const title = workflow.displayTitle ?? article.title;

  const initialExpanded = useMemo(
    () => workflow.steps.find((s) => s.status === "active")?.id ?? workflow.steps[0]?.id,
    [workflow.steps],
  );

  const [activeStep, setActiveStep] = useState(workflow.currentStep);
  const [expandedStepId, setExpandedStepId] = useState<string | null>(initialExpanded ?? null);
  const [checklistState, setChecklistState] = useState<Record<string, boolean>>({});
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  const stepLabels = workflow.steps.map((s) => s.title);

  const askAi = useCallback(
    (prefill?: string) => {
      openChat({
        prefill: prefill ?? `I'm reading the guide "${title}". Can you help me with the next step?`,
      });
    },
    [openChat, title],
  );

  const jumpToStep = useCallback(
    (stepNum: number) => {
      setActiveStep(stepNum);
      const step = workflow.steps[stepNum - 1];
      if (step) setExpandedStepId(step.id);
    },
    [workflow.steps],
  );

  const toggleStep = useCallback((stepId: string) => {
    setExpandedStepId((prev) => (prev === stepId ? null : stepId));
  }, []);

  const toggleChecklist = useCallback((id: string) => {
    setChecklistState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const stepsWithStatus = workflow.steps.map((step, i) => {
    const stepNum = i + 1;
    let status = step.status;
    if (stepNum < activeStep) status = "completed";
    else if (stepNum === activeStep) status = "active";
    else status = "upcoming";
    return { ...step, status };
  });

  const completedCount = Math.max(workflow.completedCount, activeStep - 1);

  return (
    <div className="bg-[#FFF8F1]">
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <GuideHeader
          title={title}
          subtitle={workflow.subtitle}
          updated={article.updated}
          readTimeMinutes={article.readTimeMinutes}
        />

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px_300px] xl:gap-8">
          {/* Main column */}
          <div className="min-w-0 space-y-5 xl:col-span-1">
            <GuideProgressStepper
              currentStep={activeStep}
              totalSteps={workflow.totalSteps}
              stepLabels={stepLabels}
              onJumpToStep={jumpToStep}
            />

            <div className="space-y-3" role="list" aria-label="Guide steps">
              {stepsWithStatus.map((step) => (
                <div key={step.id} role="listitem">
                  <GuideStepCard
                    step={step}
                    expanded={expandedStepId === step.id}
                    onToggle={() => toggleStep(step.id)}
                    onAskAi={() => askAi(step.aiTip)}
                    checklistState={checklistState}
                    onChecklistToggle={toggleChecklist}
                  />
                </div>
              ))}
            </div>

            <GuideBottomActionBar
              completedCount={completedCount}
              totalSteps={workflow.totalSteps}
              primaryLabel={workflow.primaryCta.label}
              onPrimary={() => askAi("I'm ready to make my request. Help me plan what to say.")}
              onSave={() => askAi("I want to save my progress and come back later. Summarise where I am.")}
            />
          </div>

          {/* Support column — below main on tablet, middle on desktop */}
          <div className="order-3 xl:order-2">
            <GuideSupportColumn workflow={workflow} article={article} onAskAi={() => askAi()} />
          </div>

          {/* AI sidebar */}
          <div className={cn("order-2 xl:order-3", !aiPanelOpen && "hidden xl:block")}>
            <GuideAiSidebar
              suggestions={workflow.aiSuggestions}
              demoQuestion={workflow.aiDemoQuestion}
              demoAnswer={workflow.aiDemoAnswer}
              guideTitle={title}
              onClose={() => setAiPanelOpen(false)}
            />
          </div>
        </div>

        {/* Mobile AI toggle */}
        <div className="mt-4 xl:hidden">
          {!aiPanelOpen ? (
            <button
              type="button"
              onClick={() => setAiPanelOpen(true)}
              className="flex w-full min-h-[52px] items-center justify-center gap-2 rounded-2xl border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-heading shadow-[var(--shadow-soft)] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
            >
              <span aria-hidden>✦</span> Open Access Stamp AI
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
