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
  useWhen?: string;
  body?: string;
};

export type GuideOfficialLink = {
  label: string;
  href: string;
};

export type GuideCopyableTemplate = {
  title: string;
  useWhen: string;
  body: string;
};

export type GuideFaq = {
  id: string;
  question: string;
  explanation: string;
  whatToDoNext?: string[];
  exampleWording?: string;
  evidenceChecklist?: string[];
  relatedHelpCardHref?: string;
  relatedHelpCardLabel?: string;
};

export type PracticalGuideWorkflow = {
  displayTitle?: string;
  subtitle: string;
  quickAnswer?: string;
  whoThisIsFor?: string[];
  firstThreeActions?: string[];
  warningBox?: { title: string; text: string };
  currentStep: number;
  totalSteps: number;
  completedCount: number;
  steps: GuideStep[];
  summary: string[];
  atAGlance: string[];
  evidenceChecklist?: string[];
  copyableTemplates?: GuideCopyableTemplate[];
  commonMistakes?: string[];
  escalation?: string[];
  relatedGuides?: Array<{ label: string; href: string }>;
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
  faqs?: GuideFaq[];
};

export function step(
  partial: Omit<GuideStep, "content"> & { content: GuideStepContent },
): GuideStep {
  return partial;
}
