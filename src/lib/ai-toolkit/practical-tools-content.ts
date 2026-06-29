import type { ToolkitToolId } from "@/lib/ai-toolkit/types";

export const PRACTICAL_TOOLS_LABEL = "Practical Tools";

export const TRUST_STRIP_ITEMS = [
  "Plain-English",
  "UK-focused",
  "AI-assisted",
  "Not legal or medical advice",
] as const;

export type ChooserOption = {
  problem: string;
  toolId: ToolkitToolId;
  recommendedTool: string;
  cta: string;
  href: string;
};

export const CHOOSER_OPTIONS: ChooserOption[] = [
  {
    problem: "I need to write a letter or email",
    toolId: "letter-builder",
    recommendedTool: "Letter Builder",
    cta: "Build a letter",
    href: "/ai-toolkit/letter-builder",
  },
  {
    problem: "I need to understand my next steps",
    toolId: "access-needs-profiler",
    recommendedTool: "Access Needs Profiler",
    cta: "Start profiler",
    href: "/ai-toolkit/access-needs-profiler",
  },
  {
    problem: "I need evidence for a claim, complaint, or request",
    toolId: "evidence-checklist",
    recommendedTool: "Evidence Checklist Generator",
    cta: "Build checklist",
    href: "/ai-toolkit/evidence-checklist",
  },
  {
    problem: "I'm visiting somewhere and need access questions",
    toolId: "venue-questions",
    recommendedTool: "Venue Access Question Generator",
    cta: "Generate questions",
    href: "/ai-toolkit/venue-questions",
  },
  {
    problem: "I want to check if a venue may work for me",
    toolId: "venue-fit-planner",
    recommendedTool: "Venue Fit Planner",
    cta: "Plan my visit",
    href: "/ai-toolkit/venue-fit-planner",
  },
  {
    problem: "I'm reading a guide and need help applying it",
    toolId: "article-companion",
    recommendedTool: "Guide Companion",
    cta: "Open companion",
    href: "/ai-toolkit/article-companion",
  },
];

export type ToolGroup = {
  id: string;
  title: string;
  intro: string;
  toolIds: ToolkitToolId[];
};

export const TOOL_GROUPS: ToolGroup[] = [
  {
    id: "prepare-request",
    title: "Prepare a request",
    intro:
      "Create clear drafts, checklists, and supporting material for requests, complaints, applications, or reasonable adjustments.",
    toolIds: ["letter-builder", "evidence-checklist"],
  },
  {
    id: "plan-next-steps",
    title: "Plan your next steps",
    intro: "Turn a confusing access issue into a practical plan with suggested next steps and useful wording.",
    toolIds: ["access-needs-profiler", "article-companion"],
  },
  {
    id: "check-venue-access",
    title: "Check venue access",
    intro: "Prepare questions, check likely access barriers, and plan visits with more confidence.",
    toolIds: ["venue-questions", "venue-fit-planner"],
  },
];

export type ToolCardContent = {
  description: string;
  bestFor: string;
  time: string;
  youGet: string;
  cta: string;
};

export const TOOL_CARD_CONTENT: Record<ToolkitToolId, ToolCardContent> = {
  "access-needs-profiler": {
    description:
      "Answer a few questions and get a practical action plan with next steps, evidence to gather, useful wording, and related Access Stamp guides.",
    bestFor: "Understanding your situation, planning next steps, and finding the right guides.",
    time: "10–15 minutes",
    youGet: "A personalised action plan you can copy, edit, print, or save.",
    cta: "Start profiler",
  },
  "letter-builder": {
    description:
      "Create a calm, structured letter or email for work, benefits, education, care, travel, or access problems.",
    bestFor: "Reasonable adjustments, Access to Work, PIP, school support, care assessments, complaints.",
    time: "5–10 minutes",
    youGet: "A draft letter you can copy, edit, print, or save.",
    cta: "Build a letter",
  },
  "evidence-checklist": {
    description:
      "Generate a tailored checklist of documents, examples, notes, and supporting evidence before you make a request or challenge.",
    bestFor: "Benefits, appeals, formal requests, and complaints that need supporting material.",
    time: "5–10 minutes",
    youGet: "A structured evidence checklist you can work through and save.",
    cta: "Build checklist",
  },
  "article-companion": {
    description:
      "Turn an Access Stamp guide into a personalised checklist, next-step plan, or draft wording based on your situation.",
    bestFor: "Applying guide advice to your own circumstances without starting from scratch.",
    time: "5–10 minutes",
    youGet: "A personalised plan linked to the guide you are reading.",
    cta: "Open companion",
  },
  "venue-questions": {
    description:
      "Create practical questions to ask a venue before visiting, based on mobility, sensory, toilet, parking, seating, or assistance needs.",
    bestFor: "Planning visits and confirming access details before you travel.",
    time: "3–5 minutes",
    youGet: "A ready-to-use question list for calls, emails, or social messages.",
    cta: "Generate questions",
  },
  "venue-fit-planner": {
    description:
      "For a specific venue, generate a practical fit summary, red flags, and a short call script based on your access needs.",
    bestFor: "Checking whether a venue may work for you before you commit to visiting.",
    time: "5–10 minutes",
    youGet: "A venue fit summary and call script you can use straight away.",
    cta: "Plan my visit",
  },
  "tribunal-bundle-helper": {
    description:
      "Turn a benefits dispute into a structured chronology, key submission points, and hearing-day checklist.",
    bestFor: "Benefits disputes and appeals that need organised evidence.",
    time: "15–20 minutes",
    youGet: "A chronology and hearing checklist to support your preparation.",
    cta: "Start bundle helper",
  },
};
