import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { FEATURED_PRACTICAL_GUIDE_SLUGS } from "@/lib/featured-practical-guides";
import { getAdviceArticles } from "@/lib/content/advice";
import { adviceTopicLabel } from "@/lib/advice-topics";

export async function HomePopularGuides() {
  const articles = await getAdviceArticles();
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const featured = FEATURED_PRACTICAL_GUIDE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (article): article is NonNullable<typeof article> => Boolean(article),
  ).slice(0, 5);

  return (
    <section className="border-t border-[#EFE5DA] bg-[#FDFBF8] py-16 sm:py-20" aria-labelledby="popular-guides-heading">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Popular guides</p>
            <h2 id="popular-guides-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Practical guides people read first
            </h2>
          </div>
          <Link
            href="/advice"
            className="link-arrow inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[#C8430F] hover:underline"
          >
            Browse all guides
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-[#EFE5DA] rounded-[24px] border border-[#EFE5DA] bg-white">
          {featured.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/advice/${article.slug}`}
                className="flex flex-col gap-2 px-5 py-5 transition hover:bg-[#FAF4ED] sm:flex-row sm:items-center sm:justify-between sm:gap-6"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#C8430F]">
                    {adviceTopicLabel(article.categorySlug)}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-[#20242E]">{article.title}</h3>
                  {article.excerpt ? (
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#4A5263]">{article.excerpt}</p>
                  ) : null}
                </div>
                <span className="shrink-0 text-sm font-medium text-[#76808F]">
                  {article.readTimeMinutes ? `${article.readTimeMinutes} min read` : `Updated ${article.updated}`}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
