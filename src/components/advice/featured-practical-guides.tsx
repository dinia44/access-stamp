import Link from "next/link";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Badge, Card } from "@/components/ui";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import {
  FEATURED_BATCH_3_SLUGS,
  FEATURED_MORE_GUIDE_SLUGS,
  FEATURED_PRACTICAL_GUIDE_SLUGS,
} from "@/lib/featured-practical-guides";
import { getAdviceArticles } from "@/lib/content/advice";
import type { AdviceArticle } from "@/lib/content/types";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";

function categoryLabel(categorySlug: string) {
  return ADVICE_CATEGORIES.find((c) => c.href === `/advice/${categorySlug}`)?.title ?? "Advice";
}

function GuideCardGrid({ articles, theme = "light" }: { articles: AdviceArticle[]; theme?: "light" | "dark" }) {
  const isDark = theme === "dark";
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => {
        const img = getAdviceArticleCardImage(article);
        const label = categoryLabel(article.categorySlug);
        return (
          <Link key={article.slug} href={`/advice/${article.slug}`} className="group block h-full">
            <Card
              className={`flex h-full flex-col overflow-hidden p-0 transition-all group-hover:-translate-y-0.5 ${
                isDark
                  ? "border-white/10 bg-slate-900/70 shadow-xl shadow-black/20 group-hover:border-white/20 group-hover:shadow-2xl group-hover:shadow-black/30"
                  : "border-border group-hover:shadow-[var(--shadow)]"
              }`}
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
                <Badge tone="blue" className="w-fit">
                  {label}
                </Badge>
                <div
                  className={`mt-2 line-clamp-2 text-sm font-semibold ${isDark ? "text-[#F8FAFC]" : "text-heading"}`}
                >
                  {article.title}
                </div>
                {article.excerpt ? (
                  <p className={`mt-2 line-clamp-3 text-sm ${isDark ? "text-[#94A3B8]" : "text-muted"}`}>
                    {article.excerpt}
                  </p>
                ) : null}
                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  {article.readTimeMinutes ? (
                    <span className={`text-xs font-semibold ${isDark ? "text-[#64748B]" : "text-muted"}`}>
                      {article.readTimeMinutes} min read
                    </span>
                  ) : (
                    <span className={`text-xs font-semibold ${isDark ? "text-[#64748B]" : "text-muted"}`}>
                      Updated {article.updated}
                    </span>
                  )}
                  <span className={`text-sm font-semibold ${isDark ? "text-[#22D3EE]" : "text-blue"}`}>
                    Read guide →
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

function resolveArticles(all: AdviceArticle[], slugs: readonly string[]) {
  return slugs.map((slug) => all.find((a) => a.slug === slug)).filter((a): a is AdviceArticle => Boolean(a));
}

export async function FeaturedPracticalGuides({
  limit,
  hideHeading,
  theme = "light",
}: {
  limit?: number;
  hideHeading?: boolean;
  theme?: "light" | "dark";
}) {
  const all = await getAdviceArticles();
  const primarySlugs = limit ? FEATURED_PRACTICAL_GUIDE_SLUGS.slice(0, limit) : [...FEATURED_PRACTICAL_GUIDE_SLUGS];
  const primary = resolveArticles(all, primarySlugs);
  const more = limit ? [] : resolveArticles(all, FEATURED_MORE_GUIDE_SLUGS);
  const batch3 = limit ? [] : resolveArticles(all, FEATURED_BATCH_3_SLUGS);

  if (!primary.length && !more.length && !batch3.length) return null;

  return (
    <div className="space-y-10">
      {primary.length ? (
        <section className="space-y-4" aria-labelledby={hideHeading ? undefined : "featured-practical-guides-heading"}>
          {hideHeading ? null : (
            <div className="space-y-2">
              <h2 id="featured-practical-guides-heading" className="font-[var(--font-heading)] text-2xl text-heading">
                Popular practical guides
              </h2>
              <p className="max-w-[80ch] text-sm text-muted">
                High-intent topics people search when they need urgent, practical next steps — benefits, work, travel,
                education, and care.
              </p>
            </div>
          )}
          <GuideCardGrid articles={primary} theme={theme} />
        </section>
      ) : null}

      {more.length ? (
        <section className="space-y-4" aria-labelledby="featured-more-guides-heading">
          <div className="space-y-2">
            <h2 id="featured-more-guides-heading" className="font-[var(--font-heading)] text-2xl text-heading">
              Appeals, NHS care funding, and older-age support
            </h2>
            <p className="max-w-[80ch] text-sm text-muted">
              When decisions, care costs, or health funding need a clear next step.
            </p>
          </div>
          <GuideCardGrid articles={more} theme={theme} />
        </section>
      ) : null}

      {batch3.length ? (
        <section className="space-y-4" aria-labelledby="featured-batch3-guides-heading">
          <div className="space-y-2">
            <h2 id="featured-batch3-guides-heading" className="font-[var(--font-heading)] text-2xl text-heading">
              Carers, children, and Universal Credit health
            </h2>
            <p className="max-w-[80ch] text-sm text-muted">
              Support for unpaid carers, DLA for children, and work capability on Universal Credit.
            </p>
          </div>
          <GuideCardGrid articles={batch3} theme={theme} />
        </section>
      ) : null}

      {hideHeading ? null : (
        <p className="text-sm text-muted">
          <Link href="/advice" className="font-semibold text-blue underline-offset-2 hover:underline">
            Browse all advice topics →
          </Link>
        </p>
      )}
    </div>
  );
}
