import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { adviceTopicLabel } from "@/lib/advice-topics";
import { getGuideCardPreviewBullets, getGuideIncludesLabel, formatGuideCardMeta } from "@/lib/guide-card-meta";
import { GuideMetaLine } from "@/components/advice/guide-meta-line";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";
import { isPracticalGuide } from "@/lib/practical-guide";

function isPracticalGuideCard(article: AdviceArticle) {
  return isPracticalGuide(article.slug, article.categorySlug);
}

export function AdviceArticleCard({
  article,
  badgeTone = "blue",
  className,
  meta,
  tagLimit = 3,
  showReadCta = true,
  readCtaLabel = "Read →",
}: {
  article: AdviceArticle;
  badgeTone?: "blue" | "amber";
  className?: string;
  /** Replaces default “Updated” line */
  meta?: React.ReactNode;
  tagLimit?: number;
  showReadCta?: boolean;
  readCtaLabel?: string;
}) {
  const img = getAdviceArticleCardImage(article);
  const categoryLabel = adviceTopicLabel(article.categorySlug);
  return (
    <Link href={`/advice/${article.slug}`} className={cn("group block h-full", className)}>
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
        <AdviceMediaFrame>
          <GuideCoverImage
            src={img.src}
            alt={img.alt}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes={ADVICE_CARD_IMAGE_SIZES}
          />
        </AdviceMediaFrame>
        <div className="flex flex-1 flex-col p-5">
          <Badge tone={badgeTone} className="mb-2 w-fit">
            {categoryLabel}
          </Badge>
          <div className="line-clamp-3 text-base font-semibold leading-snug text-heading">{article.title}</div>
          {article.excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
          ) : null}
          {isPracticalGuideCard(article) ? (
            <div className="mt-3 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#59682A]">What this helps with</p>
              <ul className="space-y-1">
                {getGuideCardPreviewBullets(article).map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2 text-xs leading-5 text-text">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                    {bullet}
                  </li>
                ))}
              </ul>
              <p className="text-xs font-semibold text-muted">
                Includes: {getGuideIncludesLabel(article)} · {formatGuideCardMeta(article)}
              </p>
            </div>
          ) : null}
          {meta ?? (
            !isPracticalGuideCard(article) ? (
            <div className="mt-2">
              <GuideMetaLine article={article} categoryLabel={categoryLabel} className="text-xs font-semibold text-muted" />
            </div>
            ) : null
          )}
          {tagLimit > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {article.tags.slice(0, tagLimit).map((tag) => (
                <Badge key={tag} tone={badgeTone}>
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}
          {showReadCta ? <div className="mt-4 text-sm font-semibold text-blue">{readCtaLabel}</div> : null}
        </div>
      </Card>
    </Link>
  );
}
