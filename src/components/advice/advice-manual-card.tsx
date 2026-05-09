import Link from "next/link";
import { ADVICE_ARTICLES } from "@/lib/mock-data";
import type { AdviceArticle } from "@/lib/mock-data";
import { Badge, Card } from "@/components/ui";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { getAdviceArticleCardImage, getAdviceSceneImage } from "@/lib/advice-card-images";
import { cn } from "@/lib/utils";

/** Non-link card with a thematic image (e.g. cars topic grid). */
export function AdviceIllustratedCard({
  title,
  description,
  categorySlug,
  className,
}: {
  title: string;
  description: string;
  categorySlug: AdviceArticle["categorySlug"];
  className?: string;
}) {
  const img = {
    ...getAdviceSceneImage(categorySlug, title),
    alt: `Illustration for: ${title}`,
  };
  return (
    <Card className={cn("overflow-hidden border-border p-0", className)}>
      <AdviceMediaFrame>
        <GuideCoverImage src={img.src} alt={img.alt} className="object-cover" sizes={ADVICE_CARD_IMAGE_SIZES} />
      </AdviceMediaFrame>
      <div className="p-5">
        <div className="text-sm font-semibold text-heading">{title}</div>
        <p className="mt-2 text-sm text-muted">{description}</p>
      </div>
    </Card>
  );
}

/**
 * Topic pathway cards where the link may resolve to a real advice article (uses its image) or a thematic stock photo.
 */
export function AdviceManualCard({
  href,
  title,
  description,
  categorySlug,
  badge,
  cta = "Open guide",
  className,
  variant = "pathway",
}: {
  href: string;
  title: string;
  description: string;
  categorySlug: AdviceArticle["categorySlug"];
  badge?: string;
  cta?: string;
  className?: string;
  /** pathway = section eyebrow + optional badge corner; explore = title row + badge (workplace-style tiles) */
  variant?: "pathway" | "explore";
}) {
  const slug = href.startsWith("/advice/") ? href.slice(8).split("?")[0] ?? "" : "";
  const article = slug ? ADVICE_ARTICLES.find((a) => a.slug === slug) : undefined;
  const img = article
    ? getAdviceArticleCardImage(article)
    : {
        ...getAdviceSceneImage(categorySlug, `${title}:${href}`),
        alt: `Illustration for: ${title}`,
      };

  return (
    <Link href={href} className={cn("group block h-full", className)}>
      <Card className="flex h-full flex-col overflow-hidden border-border p-0 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
        <AdviceMediaFrame>
          <GuideCoverImage
            src={img.src}
            alt={img.alt}
            className="object-cover transition duration-300 group-hover:scale-[1.03]"
            sizes={ADVICE_CARD_IMAGE_SIZES}
          />
        </AdviceMediaFrame>
        <div className="flex flex-1 flex-col p-5">
          {variant === "explore" ? (
            <div className="flex items-center justify-between gap-2">
              <div className="text-sm font-semibold text-heading">{title}</div>
              {badge ? (
                <Badge tone="amber" className="shrink-0">
                  {badge}
                </Badge>
              ) : null}
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2">
              <div className="text-sm font-semibold uppercase tracking-wide text-muted">{title}</div>
              {badge ? (
                <Badge tone="amber" className="shrink-0">
                  {badge}
                </Badge>
              ) : null}
            </div>
          )}
          <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          <div className="mt-4 text-sm font-semibold text-blue">{cta} →</div>
        </div>
      </Card>
    </Link>
  );
}
