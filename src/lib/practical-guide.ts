import type { AdviceArticle } from "@/lib/content/types";
import { ACCESS_TO_WORK_WORKFLOW } from "@/lib/guide-content/access-to-work";
import { getGuideFaqs } from "@/lib/guide-content/guide-faqs";
import { REASONABLE_ADJUSTMENTS_WORKFLOW } from "@/lib/guide-content/reasonable-adjustments-at-work";
import type { PracticalGuideWorkflow, GuideStep } from "@/lib/guide-content/types";
import { PRACTICAL_GUIDE_ARTICLES } from "@/lib/practical-guides-articles";

export type {
  GuideStep,
  GuideStepContent,
  GuideStepStatus,
  GuideTemplate,
  PracticalGuideWorkflow,
} from "@/lib/guide-content/types";

export const PRACTICAL_GUIDE_SLUGS = PRACTICAL_GUIDE_ARTICLES.map((a) => a.slug);

export function isPracticalGuide(slug: string): boolean {
  return PRACTICAL_GUIDE_SLUGS.includes(slug);
}

const WORKFLOW_OVERRIDES: Partial<Record<string, PracticalGuideWorkflow>> = {
  "access-to-work": ACCESS_TO_WORK_WORKFLOW,
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

function extractSectionBullets(article: AdviceArticle, h2Title: string): string[] {
  const sections = article.sections;
  const start = sections.findIndex((s) => s.type === "h2" && "text" in s && s.text === h2Title);
  if (start === -1) return [];

  const bullets: string[] = [];
  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "p" && "text" in section && section.text.trim()) {
      bullets.push(section.text.trim());
    }
    if (bullets.length >= 3) break;
  }
  return bullets;
}

function previewForStep(article: AdviceArticle, title: string, index: number, excerpt: string): string {
  const bullets = extractSectionBullets(article, title);
  if (bullets[0]) return bullets[0];
  if (index === 0) return excerpt;
  return `Learn what ${title.toLowerCase()} means in practice and what to prepare before you move on.`;
}

function buildDefaultWorkflow(article: AdviceArticle): PracticalGuideWorkflow {
  const excerpt = article.excerpt ?? "Practical guidance for your situation.";
  const h2s = article.sections.filter((s) => s.type === "h2").map((s) => (s as { text: string }).text);
  const stepTitles =
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

  const outcomes = [
    "You know what applies to your situation",
    "You have the evidence and notes you need",
    "You have taken the next practical action",
    "You have wording you can adapt and send",
    "You know what to do if things stall",
    "You know where to check official guidance",
  ];

  return {
    subtitle: "A practical, step-by-step guide with AI support",
    currentStep: 1,
    totalSteps: stepTitles.length,
    completedCount: 0,
    steps: stepTitles.map((title, i) => {
      const sectionBullets = extractSectionBullets(article, title);
      const checklist =
        sectionBullets.length >= 3
          ? sectionBullets.slice(0, 4)
          : [
              `Understand how ${title.toLowerCase()} applies to you`,
              "Note what evidence or wording you may need",
              "Decide your next action before moving on",
              "Use the example wording or ask the AI if stuck",
            ];

      return {
        id: `step-${i + 1}`,
        number: i + 1,
        title,
        preview: previewForStep(article, title, i, excerpt),
        outcome: outcomes[i] ?? `You have completed: ${title.toLowerCase()}`,
        statusLabel: i === 0 ? "Start here" : "To do",
        status: (i === 0 ? "active" : "upcoming") as GuideStep["status"],
        content: {
          intro: sectionBullets[0] ?? (i === 0 ? excerpt : `This step covers ${title.toLowerCase()}.`),
          whatThisMeans:
            sectionBullets.length >= 2
              ? sectionBullets.slice(0, 3)
              : [
                  "Focus on practical impact, not jargon.",
                  "Keep notes as you work through this step.",
                  "Use the checklist below before moving on.",
                ],
          checklist,
          example:
            sectionBullets[sectionBullets.length - 1] ??
            article.excerpt ??
            "Describe your situation in plain language, focusing on what is difficult and what would help.",
          exampleLabel: "Example approach",
          aiPrompt: `Help me with step ${i + 1}: ${title}`,
        },
      };
    }),
    summary: [
      "Understand your rights and options",
      "Prepare evidence and wording",
      "Take action with confidence",
      "Know what to do if things stall",
    ],
    atAGlance: [excerpt, "Written in plain language — not legal jargon", "UK-focused guidance you can act on"],
    templates: [],
    aiIntro: "Need help applying this guide to your situation? Ask a question about any step below.",
    aiSuggestions: defaultAiSuggestions(article),
    aiDemoQuestion: defaultAiSuggestions(article)[0] ?? "What should I do first?",
    aiDemoIntro: "A good starting point is to:",
    aiDemoAnswer: [
      "Name one clear barrier or task that is difficult.",
      "Explain how it affects your ability to act on equal terms.",
      "List one practical change that would help.",
    ],
    aiDisclaimer:
      "AI can make mistakes. Use this as practical guidance, not legal advice. Check important information with official sources or an adviser.",
    primaryCta: { label: "I'm ready to take the next step" },
    learnMoreHref: `/advice/${article.categorySlug}`,
  };
}

export function getPracticalGuideWorkflow(article: AdviceArticle): PracticalGuideWorkflow {
  const override = WORKFLOW_OVERRIDES[article.slug];
  const base = override ?? buildDefaultWorkflow(article);
  const faqs = base.faqs?.length ? base.faqs : getGuideFaqs(article);
  return faqs.length ? { ...base, faqs } : base;
}
