import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";
import { buildWorkflowFromArticle } from "@/lib/guide-content/article-workflow-builder";
import { ACCESS_TO_WORK_WORKFLOW } from "@/lib/guide-content/access-to-work";
import { getGuideFaqs } from "@/lib/guide-content/guide-faqs";
import { REASONABLE_ADJUSTMENTS_WORKFLOW } from "@/lib/guide-content/reasonable-adjustments-at-work";
import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { isPracticalGuideCategory } from "@/lib/practical-guide-categories";
import { PRACTICAL_GUIDE_ARTICLES } from "@/lib/practical-guides-articles";

export type {
  GuideStep,
  GuideStepContent,
  GuideStepStatus,
  GuideTemplate,
  PracticalGuideWorkflow,
} from "@/lib/guide-content/types";

export { PRACTICAL_GUIDE_CATEGORIES, isPracticalGuideCategory } from "@/lib/practical-guide-categories";

export const PRACTICAL_GUIDE_SLUGS = PRACTICAL_GUIDE_ARTICLES.map((a) => a.slug);

export function isPracticalGuide(slug: string, categorySlug?: AdviceCategorySlug): boolean {
  if (PRACTICAL_GUIDE_SLUGS.includes(slug)) return true;
  if (categorySlug && isPracticalGuideCategory(categorySlug)) return true;
  return false;
}

const WORKFLOW_OVERRIDES: Partial<Record<string, PracticalGuideWorkflow>> = {
  "access-to-work": ACCESS_TO_WORK_WORKFLOW,
  "reasonable-adjustments-at-work": REASONABLE_ADJUSTMENTS_WORKFLOW,
};

function mergeWorkflows(
  article: AdviceArticle,
  override: PracticalGuideWorkflow,
  articleBase: PracticalGuideWorkflow,
): PracticalGuideWorkflow {
  return {
    ...articleBase,
    ...override,
    steps: override.steps.length ? override.steps : articleBase.steps,
    aiSuggestions: override.aiSuggestions.length ? override.aiSuggestions : articleBase.aiSuggestions,
    evidenceChecklist: override.evidenceChecklist ?? articleBase.evidenceChecklist,
    commonMistakes: override.commonMistakes ?? articleBase.commonMistakes,
    escalation: override.escalation ?? articleBase.escalation,
    copyableTemplates: override.copyableTemplates ?? articleBase.copyableTemplates,
    relatedGuides: override.relatedGuides ?? articleBase.relatedGuides,
    officialLinks: override.officialLinks ?? articleBase.officialLinks,
    whoThisIsFor: override.whoThisIsFor ?? articleBase.whoThisIsFor,
    firstThreeActions: override.firstThreeActions ?? articleBase.firstThreeActions,
    quickAnswer: override.quickAnswer ?? articleBase.quickAnswer,
    warningBox: override.warningBox ?? articleBase.warningBox,
  };
}

export function getPracticalGuideWorkflow(article: AdviceArticle): PracticalGuideWorkflow {
  const articleBase = buildWorkflowFromArticle(article);
  const override = WORKFLOW_OVERRIDES[article.slug];
  const base = override ? mergeWorkflows(article, override, articleBase) : articleBase;
  const faqs = base.faqs?.length ? base.faqs : getGuideFaqs(article);
  return faqs.length ? { ...base, faqs } : base;
}
