import type { AdviceArticle } from "@/lib/content/types";
import {
  formatGuideMetaLine,
  getGuidePrimaryTag,
  getGuideLastReviewed,
  getNationSuffix,
} from "@/lib/advice-guide-meta";
import { adviceTopicLabel } from "@/lib/advice-topics";

export function GuideMetaLine({
  article,
  categoryLabel,
  className = "text-sm text-[#76808F]",
}: {
  article: AdviceArticle;
  categoryLabel?: string;
  className?: string;
}) {
  const nationSuffix = getNationSuffix(article);
  return (
    <p className={className}>
      {formatGuideMetaLine(article, categoryLabel)}
      {nationSuffix ? (
        <span className="font-semibold text-[#C8430F]"> {nationSuffix}</span>
      ) : null}
    </p>
  );
}

export function GuideReviewedPill({ article }: { article: AdviceArticle }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#EFF3E7] px-2.5 py-1 text-xs font-semibold text-[#5F7444]">
      Reviewed {getGuideLastReviewed(article)}
    </span>
  );
}

export function GuideTagEyebrow({ article }: { article: AdviceArticle }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C8430F]">
      {getGuidePrimaryTag(article)}
    </span>
  );
}

export function GuideCategoryEyebrow({
  article,
  className = "text-xs font-semibold uppercase tracking-[0.08em] text-[#C8430F]",
}: {
  article: AdviceArticle;
  className?: string;
}) {
  return <span className={className}>{adviceTopicLabel(article.categorySlug)}</span>;
}
