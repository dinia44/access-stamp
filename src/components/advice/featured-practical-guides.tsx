import Link from "next/link";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Badge, Card } from "@/components/ui";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { FEATURED_PRACTICAL_GUIDE_SLUGS } from "@/lib/featured-practical-guides";
import { ADVICE_ARTICLES, ADVICE_CATEGORIES } from "@/lib/mock-data";

function categoryLabel(categorySlug: string) {
  return ADVICE_CATEGORIES.find((c) => c.href === `/advice/${categorySlug}`)?.title ?? "Advice";
}

export function FeaturedPracticalGuides({ limit }: { limit?: number }) {
  const slugs = limit ? FEATURED_PRACTICAL_GUIDE_SLUGS.slice(0, limit) : [...FEATURED_PRACTICAL_GUIDE_SLUGS];
  const articles = slugs
    .map((slug) => ADVICE_ARTICLES.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  if (!articles.length) return null;

  return (
    <section className="space-y-4" aria-labelledby="featured-practical-guides-heading">
      <div className="space-y-2">
        <h2 id="featured-practical-guides-heading" className="font-[var(--font-heading)] text-2xl text-heading">
          Popular practical guides
        </h2>
        <p className="max-w-[80ch] text-sm text-muted">
          High-intent topics people search when they need urgent, practical next steps — benefits, work, travel,
          education, and care.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => {
          const img = getAdviceArticleCardImage(article);
          const label = categoryLabel(article.categorySlug);
          return (
            <Link key={article.slug} href={`/advice/${article.slug}`} className="group block h-full">
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
                  <Badge tone="blue" className="w-fit">
                    {label}
                  </Badge>
                  <div className="mt-2 line-clamp-2 text-sm font-semibold text-heading">{article.title}</div>
                  {article.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-muted">{article.excerpt}</p>
                  ) : null}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    {article.readTimeMinutes ? (
                      <span className="text-xs font-semibold text-muted">{article.readTimeMinutes} min read</span>
                    ) : (
                      <span className="text-xs font-semibold text-muted">Updated {article.updated}</span>
                    )}
                    <span className="text-sm font-semibold text-blue">Read guide →</span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <p className="text-sm text-muted">
        <Link href="/advice" className="font-semibold text-blue underline-offset-2 hover:underline">
          Browse all advice topics →
        </Link>
      </p>
    </section>
  );
}
