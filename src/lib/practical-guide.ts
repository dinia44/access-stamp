import type { AdviceArticle } from "@/lib/content/types";
import { getAdviceArticleCardImage, getAdviceSceneImage } from "@/lib/advice-card-images";
import { PRACTICAL_GUIDE_ARTICLES } from "@/lib/practical-guides-articles";

export const PRACTICAL_GUIDE_SLUGS = PRACTICAL_GUIDE_ARTICLES.map((a) => a.slug);

export function isPracticalGuide(slug: string): boolean {
  return PRACTICAL_GUIDE_SLUGS.includes(slug);
}

export type GuideStepStatus = "completed" | "active" | "upcoming";

export type GuideChecklistItem = {
  id: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export type GuideStep = {
  id: string;
  number: number;
  title: string;
  description?: string;
  status: GuideStepStatus;
  image?: { src: string; alt: string };
  checklist?: GuideChecklistItem[];
  aiTip?: string;
};

export type GuideTemplate = {
  title: string;
  format: string;
  href?: string;
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
  aiSuggestions: string[];
  aiDemoQuestion: string;
  aiDemoAnswer: string[];
  primaryCta: { label: string };
  learnMoreHref?: string;
};

const WORKPLACE_IMG = (seed: string) => getAdviceSceneImage("workplace", seed);

const REASONABLE_ADJUSTMENTS_WORKFLOW: PracticalGuideWorkflow = {
  displayTitle: "Reasonable adjustments at work: your rights",
  subtitle: "A practical, step-by-step guide with AI support",
  currentStep: 2,
  totalSteps: 6,
  completedCount: 1,
  steps: [
    {
      id: "know-rights",
      number: 1,
      title: "Know your rights",
      status: "completed",
      image: WORKPLACE_IMG("rights"),
    },
    {
      id: "identify-adjustments",
      number: 2,
      title: "Identify adjustments that could help",
      description:
        "Think about the barriers you face and what could make work more accessible.",
      status: "active",
      checklist: [
        {
          id: "environment",
          title: "Work environment",
          description:
            "Physical workspace, noise levels, lighting, temperature, and equipment that affects how you work.",
          image: WORKPLACE_IMG("environment"),
        },
        {
          id: "patterns",
          title: "Work patterns",
          description:
            "Hours, breaks, workload, flexibility, hybrid working, and how your energy varies through the week.",
          image: WORKPLACE_IMG("patterns"),
        },
        {
          id: "communication",
          title: "Communication",
          description:
            "Meetings, shared information, email vs calls, and formats that help you understand and contribute.",
          image: WORKPLACE_IMG("communication"),
        },
      ],
      aiTip: "Not sure what to ask for? Ask our AI assistant for tailored suggestions.",
    },
    {
      id: "plan-request",
      number: 3,
      title: "Plan your request",
      status: "upcoming",
      image: WORKPLACE_IMG("plan"),
    },
    {
      id: "talk-employer",
      number: 4,
      title: "Talk to your employer",
      status: "upcoming",
      image: WORKPLACE_IMG("talk"),
    },
    {
      id: "if-agreed",
      number: 5,
      title: "If your request is agreed",
      status: "upcoming",
      image: WORKPLACE_IMG("agreed"),
    },
    {
      id: "if-wrong",
      number: 6,
      title: "If things go wrong",
      status: "upcoming",
      image: WORKPLACE_IMG("wrong"),
    },
  ],
  summary: [
    "Understand what reasonable adjustments are",
    "Identify the workplace barriers affecting you",
    "Match each barrier to practical support",
    "Write a clear request without oversharing",
    "Track your employer's response",
    "Know what to do if your request is delayed or refused",
  ],
  atAGlance: [
    "You have the right to equal treatment at work",
    "Employers must make reasonable adjustments",
    "You don't need to have a diagnosis to make a request",
  ],
  templates: [
    {
      title: "Reasonable adjustment request template",
      format: "DOCX",
      href: "/downloads/reasonable-adjustment-request-template.docx",
    },
    {
      title: "Workplace barriers checklist",
      format: "DOCX",
      href: "/downloads/workplace-barriers-checklist.docx",
    },
    {
      title: "Follow-up email template",
      format: "DOCX",
      href: "/downloads/follow-up-email-template.docx",
    },
    {
      title: "Adjustment review notes",
      format: "DOCX",
      href: "/downloads/reasonable-adjustment-review-notes.docx",
    },
  ],
  aiSuggestions: [
    "What adjustments might help with anxiety at work?",
    "How do I explain my needs to my employer?",
    "What if my employer says no?",
  ],
  aiDemoQuestion: "What adjustments might help with anxiety at work?",
  aiDemoAnswer: [
    "Flexible start times",
    "A quieter workspace",
    "More regular check-ins",
    "Adjusted workloads",
    "Extra time for tasks or deadlines",
  ],
  primaryCta: { label: "I'm ready to make my request" },
  learnMoreHref: "/laws-guidance",
};

const WORKFLOW_OVERRIDES: Partial<Record<string, PracticalGuideWorkflow>> = {
  "reasonable-adjustments-at-work": REASONABLE_ADJUSTMENTS_WORKFLOW,
};

function defaultAiSuggestions(article: AdviceArticle): string[] {
  const topic = article.title.split(":")[0]?.trim() ?? "this guide";
  return [
    `What should I focus on first in ${topic.toLowerCase()}?`,
    "How do I explain my situation clearly?",
    "What if I get refused or ignored?",
  ];
}

function buildStepsFromArticle(article: AdviceArticle): GuideStep[] {
  const hero = getAdviceArticleCardImage(article);
  const h2s = article.sections.filter((s) => s.type === "h2").map((s) => (s as { text: string }).text);
  const titles =
    h2s.length >= 3
      ? h2s.slice(0, 6)
      : [
          "Understand what applies to you",
          "Gather what you need",
          "Follow the step-by-step process",
          "Use the template wording",
          "If you are refused or delayed",
          "Official links and next steps",
        ];

  return titles.map((title, i) => ({
    id: `step-${i + 1}`,
    number: i + 1,
    title,
    status: (i === 0 ? "active" : "upcoming") as GuideStepStatus,
    image: i === 0 ? hero : getAdviceSceneImage(article.categorySlug, `${article.slug}-step-${i}`),
    description:
      i === 0 && article.excerpt
        ? article.excerpt
        : i === 1
          ? "Collect evidence and documents that support your request."
          : undefined,
    aiTip: i === 0 ? "Not sure where to start? Ask our AI assistant for tailored suggestions." : undefined,
  }));
}

function buildDefaultWorkflow(article: AdviceArticle): PracticalGuideWorkflow {
  const steps = buildStepsFromArticle(article);
  const summarySection = article.sections.find((s) => s.type === "ul");
  const summary =
    summarySection && summarySection.type === "ul"
      ? summarySection.items.slice(0, 4)
      : [
          "Understand your rights and options",
          "Prepare evidence and wording",
          "Take action with confidence",
          "Know what to do if things stall",
        ];

  const firstParagraph = article.sections.find((s) => s.type === "p");
  const atAGlance =
    firstParagraph && firstParagraph.type === "p"
      ? [firstParagraph.text.slice(0, 120) + (firstParagraph.text.length > 120 ? "…" : "")]
      : [article.excerpt ?? "Practical, plain-language guidance for your situation."];

  const templateSection = article.sections.find(
    (s) => s.type === "h2" && /template|example|wording/i.test((s as { text: string }).text),
  );
  const templateTitle =
    templateSection && templateSection.type === "h2" ? templateSection.text : "Request template";

  return {
    subtitle: "A practical, step-by-step guide with AI support",
    currentStep: 1,
    totalSteps: steps.length,
    completedCount: 0,
    steps,
    summary,
    atAGlance: atAGlance.length >= 2 ? atAGlance : [...atAGlance, "Written in plain language — not legal jargon", "UK-focused guidance you can act on"],
    templates: [{ title: templateTitle, format: "Guide" }],
    aiSuggestions: defaultAiSuggestions(article),
    aiDemoQuestion: defaultAiSuggestions(article)[0] ?? "What should I do first?",
    aiDemoAnswer: [
      "Start with one clear barrier at work or in daily life",
      "Note how it affects you on typical days",
      "List one or two adjustments that would help",
    ],
    primaryCta: { label: "I'm ready to take the next step" },
    learnMoreHref: `/advice/${article.categorySlug}`,
  };
}

export function getPracticalGuideWorkflow(article: AdviceArticle): PracticalGuideWorkflow {
  const override = WORKFLOW_OVERRIDES[article.slug];
  if (override) return override;
  return buildDefaultWorkflow(article);
}
