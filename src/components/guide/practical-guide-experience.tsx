"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdviceArticle } from "@/lib/content/types";
import type { GuideResourcePack } from "@/lib/guide-resources";
import { buildGuideHeroProps } from "@/lib/guide-hero";
import type { PracticalGuideWorkflow } from "@/lib/practical-guide";
import { useChat } from "@/components/chat/provider";
import { GuideAiSidebar } from "@/components/guide/guide-ai-sidebar";
import { GuideBottomActionBar } from "@/components/guide/guide-bottom-action-bar";
import { GuideDetailSections } from "@/components/guide/guide-detail-sections";
import { buildGuideJumpSections, GuideJumpNav } from "@/components/guide/guide-jump-nav";
import { GuideFaqSection } from "@/components/guide/guide-faq-section";
import { GuideFullGuideCta } from "@/components/guide/guide-full-guide-cta";
import { GuideHeroHeader } from "@/components/guide/guide-hero-header";
import { GuideOverviewSection } from "@/components/guide/guide-overview-section";
import { GuideProgressStepper } from "@/components/guide/guide-progress-stepper";
import { GuideScrollProgress } from "@/components/guide/guide-scroll-progress";
import { GuideStepCard } from "@/components/guide/guide-step-card";
import { GuideSupportColumn } from "@/components/guide/guide-support-column";
import { Button } from "@/components/ui/Button";

type PracticalGuideExperienceProps = {
  article: AdviceArticle;
  workflow: PracticalGuideWorkflow;
  resources?: GuideResourcePack | null;
};

export function PracticalGuideExperience({ article, workflow, resources }: PracticalGuideExperienceProps) {
  const { openChat } = useChat();
  const router = useRouter();
  const title = workflow.displayTitle ?? article.title;
  const stepsRef = useRef<HTMLDivElement>(null);
  const heroProps = buildGuideHeroProps(article, workflow, resources);
  const jumpSections = useMemo(() => buildGuideJumpSections(workflow), [workflow]);

  const initialExpanded = useMemo(
    () => workflow.steps.find((s) => s.status === "active")?.id ?? workflow.steps[0]?.id,
    [workflow.steps],
  );

  const [activeStep, setActiveStep] = useState(workflow.currentStep);
  const [expandedStepId, setExpandedStepId] = useState<string | null>(initialExpanded ?? null);
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

  const stepsWithStatus = workflow.steps.map((step, i) => {
    const stepNum = i + 1;
    let status = step.status;
    if (stepNum < activeStep) status = "completed";
    else if (stepNum === activeStep) status = "active";
    else status = "upcoming";
    return { ...step, status };
  });

  const completedCount = Math.max(workflow.completedCount, activeStep - 1);

  const startGuide = useCallback(() => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const listenToGuide = useCallback(() => {
    if (heroProps.fullGuideHref) {
      router.push(`${heroProps.fullGuideHref}#read-aloud`);
      return;
    }
    const cta = document.getElementById("guide-full-guide-cta");
    if (cta) {
      cta.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [heroProps.fullGuideHref, router]);

  return (
    <div className="bg-[#FFF8F1]">
      <GuideScrollProgress />
      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <GuideHeroHeader
          {...heroProps}
          onStartGuide={startGuide}
          onListen={listenToGuide}
        />

        <div className="mt-8">
          <GuideOverviewSection
            workflow={workflow}
            categoryHref={`/advice/${article.categorySlug}`}
            onAskAi={() => askAi()}
          />
        </div>

        <div className="mt-8">
          {/* One primary in-page nav on mobile; sticky TOC on wide screens only */}
          <GuideJumpNav sections={jumpSections} className="mb-6" />
          <GuideDetailSections workflow={workflow} onAskAi={(prefill) => askAi(prefill)} part="intro" />
        </div>

        {workflow.faqs?.length ? (
          <div className="mt-8">
            <GuideFaqSection faqs={workflow.faqs} headingId={`guide-faq-${article.slug}`} />
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
          <div className="min-w-0 space-y-5">
            <div ref={stepsRef} id="guide-steps" className="scroll-mt-28 space-y-5">
              <h2 className="text-xl font-bold text-heading">Step-by-step</h2>
              {/* Desktop-only progress dots — mobile uses On this page + step cards */}
              <GuideProgressStepper
                currentStep={activeStep}
                totalSteps={workflow.totalSteps}
                stepLabels={stepLabels}
                onJumpToStep={jumpToStep}
                className="hidden lg:block"
              />

              <div className="space-y-3" role="list" aria-label="Guide steps">
                {stepsWithStatus.map((step) => (
                  <div key={step.id} role="listitem">
                    <GuideStepCard
                      step={step}
                      expanded={expandedStepId === step.id}
                      onToggle={() => toggleStep(step.id)}
                      onAskAi={(prompt) => askAi(prompt)}
                    />
                  </div>
                ))}
              </div>

              <GuideBottomActionBar
                completedCount={completedCount}
                totalSteps={workflow.totalSteps}
                primaryLabel={workflow.primaryCta.label}
                onPrimary={() => askAi("I'm ready to make my request. Help me plan what to say.")}
              />

              {resources ? (
                <div id="guide-full-guide-cta">
                  <GuideFullGuideCta resources={resources} className="print:hidden" />
                </div>
              ) : null}

              <GuideDetailSections workflow={workflow} onAskAi={(prefill) => askAi(prefill)} part="detail" />
            </div>
          </div>

          <div>
            <GuideSupportColumn workflow={workflow} article={article} resources={resources} onAskAi={() => askAi()} />
          </div>
        </div>

        {/* Single AI assistance panel — after substantive content */}
        <div className="mt-8 max-w-3xl">
          {!aiPanelOpen ? (
            <Button
              type="button"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => setAiPanelOpen(true)}
              aria-label="Open Access Stamp AI assistant for this guide"
            >
              Open Access Stamp AI for this guide
            </Button>
          ) : (
            <GuideAiSidebar
              intro={workflow.aiIntro}
              suggestions={workflow.aiSuggestions}
              demoQuestion={workflow.aiDemoQuestion}
              demoIntro={workflow.aiDemoIntro}
              demoAnswer={workflow.aiDemoAnswer}
              disclaimer={workflow.aiDisclaimer}
              guideTitle={title}
              onClose={() => setAiPanelOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
