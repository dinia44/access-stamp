import Link from "next/link";
import type { AdviceArticle } from "@/lib/mock-data";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Badge, Card } from "@/components/ui";
import { cn } from "@/lib/utils";

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
  const categoryLabel =
    ADVICE_CATEGORIES.find((c) => c.href === `/advice/${article.categorySlug}`)?.title ?? "Advice";
  return (
    <Link href={`/advice/${article.slug}`} className={cn("group block h-full", className)}>
      <Card
        accent={badgeTone === "amber" ? "amber" : "blue"}
        className="flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]"
      >
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
          <div className="line-clamp-3 text-sm font-semibold text-heading">{article.title}</div>
          {article.excerpt ? (
            <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
          ) : null}
          {meta ?? (
            <div className="mt-2 text-xs font-semibold text-muted">
              {article.readTimeMinutes ? `${article.readTimeMinutes} min read` : `Updated: ${article.updated}`}
            </div>
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
