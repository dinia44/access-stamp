import type { ToolkitToolId } from "@/lib/ai-toolkit/types";

export const TOOLKIT_DISCLAIMER =
  "This tool gives general information and practical wording support. It is not legal advice. Check official guidance or get specialist advice for your situation.";

export type ToolkitToolMeta = {
  id: ToolkitToolId;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  badge: string;
};

export const AI_TOOLKIT_TOOLS: ToolkitToolMeta[] = [
  {
    id: "access-needs-profiler",
    href: "/ai-toolkit/access-needs-profiler",
    title: "Access Needs Profiler",
    shortTitle: "Access Needs Profiler",
    description:
      "Answer a few simple questions and get a personalised action plan with next steps, evidence to gather, useful wording, and related Access Stamp guides.",
    badge: "Action plan",
  },
  {
    id: "letter-builder",
    href: "/ai-toolkit/letter-builder",
    title: "Letter Builder",
    shortTitle: "Letter Builder",
    description:
      "Create a clear draft letter or email for PIP, Access to Work, reasonable adjustments, school support, train assistance, care assessments, Blue Badge, or home adaptations.",
    badge: "Letters",
  },
  {
    id: "evidence-checklist",
    href: "/ai-toolkit/evidence-checklist",
    title: "Evidence Checklist Generator",
    shortTitle: "Evidence Checklist",
    description:
      "Generate a tailored checklist of documents, examples, notes, and supporting evidence to prepare before making a request or challenge.",
    badge: "Checklists",
  },
  {
    id: "article-companion",
    href: "/ai-toolkit/article-companion",
    title: "AI Article Companion",
    shortTitle: "Article Companion",
    description:
      "Turn any Access Stamp guide into a personalised checklist, next-step plan, or draft wording based on your situation.",
    badge: "Guides",
  },
  {
    id: "venue-questions",
    href: "/ai-toolkit/venue-questions",
    title: "Venue Access Question Generator",
    shortTitle: "Venue Questions",
    description:
      "Create practical questions to ask a venue before visiting, based on mobility, sensory, toilet, parking, seating, or assistance needs.",
    badge: "Venues",
  },
  {
    id: "venue-fit-planner",
    href: "/ai-toolkit/venue-fit-planner",
    title: "Venue Fit Planner",
    shortTitle: "Venue Fit Planner",
    description:
      "For a specific venue, generate a practical fit summary, red flags, and a short call script based on your access needs and known listing details.",
    badge: "Venue fit",
  },
  {
    id: "tribunal-bundle-helper",
    href: "/ai-toolkit/tribunal-bundle-helper",
    title: "Tribunal Bundle Helper",
    shortTitle: "Tribunal Helper",
    description:
      "Turn a benefits dispute into a structured chronology, key submission points, and hearing-day checklist.",
    badge: "Appeals",
  },
];

export function getToolkitToolMeta(id: string): ToolkitToolMeta | undefined {
  return AI_TOOLKIT_TOOLS.find((t) => t.id === id);
}
