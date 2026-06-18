import type { AdviceNation } from "@/lib/content/types";

export type EditorialStatus =
  | "draft"
  | "editorial_review"
  | "expert_review"
  | "published"
  | "update_required";

export type GuideFact = {
  label: string;
  value: string;
};

export type GuideStep = {
  title: string;
  body: string;
  actions?: string[];
};

export type ChecklistItem = {
  label: string;
  hint?: string;
};

export type GuideTemplate = {
  title: string;
  body: string;
  useWhen?: string;
};

export type GuideMistake = {
  mistake: string;
  whyItMatters: string;
};

export type EscalationRoute = {
  situation: string;
  actions: string[];
};

export type OfficialSource = {
  label: string;
  href: string;
  reviewedAt?: string;
};

/** Structured editorial guide model — maps to AdviceArticle + workflow overrides. */
export type Guide = {
  slug: string;
  title: string;
  summary: string;
  jurisdiction: string[];
  audience: string[];
  reviewedAt: string;
  nextReviewAt?: string;
  reviewedBy?: string;
  editorialStatus: EditorialStatus;
  keyFacts: GuideFact[];
  steps: GuideStep[];
  evidenceChecklist?: ChecklistItem[];
  templates?: GuideTemplate[];
  commonMistakes?: GuideMistake[];
  escalation?: EscalationRoute[];
  officialSources: OfficialSource[];
  relatedGuideSlugs: string[];
  relatedToolSlugs: string[];
};

export function isPublishedGuide(status: EditorialStatus): boolean {
  return status === "published";
}

export const GUIDE_JURISDICTION_UK: AdviceNation[] = ["England", "Wales"];
