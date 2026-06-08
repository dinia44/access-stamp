export type GuideStepStatus = "completed" | "active" | "upcoming";

export type GuideStepExtraSection = {
  title: string;
  items: string[];
};

export type GuideStepContent = {
  intro: string;
  introExtra?: string[];
  whatThisMeans: string[];
  checklist: string[];
  extraSections?: GuideStepExtraSection[];
  example: string;
  exampleLabel?: string;
  aiPrompt: string;
};

export type GuideStep = {
  id: string;
  number: number;
  title: string;
  preview: string;
  outcome: string;
  statusLabel: string;
  status: GuideStepStatus;
  content: GuideStepContent;
};

export type GuideTemplate = {
  title: string;
  format: string;
  description?: string;
  href?: string;
};

export type GuideOfficialLink = {
  label: string;
  href: string;
};

export type PracticalGuideWorkflow = {
  displayTitle?: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
  completedCount: number;
  steps: GuideStep[];
  summary: string[];
  atAGlance: string[];
  templates: GuideTemplate[];
  officialLinks?: GuideOfficialLink[];
  aiIntro: string;
  aiSuggestions: string[];
  aiDemoQuestion: string;
  aiDemoIntro: string;
  aiDemoAnswer: string[];
  aiDisclaimer: string;
  primaryCta: { label: string };
  learnMoreHref?: string;
};

export function step(
  partial: Omit<GuideStep, "content"> & { content: GuideStepContent },
): GuideStep {
  return partial;
}
