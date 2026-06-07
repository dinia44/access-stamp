import Link from "next/link";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/fade-in";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { Badge, Button, Card } from "@/components/ui";
import { getAdviceArticles } from "@/lib/content/advice";

export async function CategoryPage({
  categorySlug,
  title,
  description,
  tabs,
}: {
  categorySlug: string;
  title: string;
  description: string;
  tabs?: Array<{ label: string; articleSlugs: string[] }>;
}) {
  const all = await getAdviceArticles();
  const articles = all.filter((a) => a.categorySlug === categorySlug);

  return (
    <PageLayout stack="relaxed" hero>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Advice Hub", href: "/advice" },
          { label: title },
        ]}
      />

      <PageHero badge={<Badge tone="blue">{title}</Badge>} title={title} subtitle={description} />

      {tabs ? (
        <FadeIn delayMs={100}>
          <Card className="p-6">
            <PageSectionTitle title="Browse by category" className="mb-4" />
            <div className="flex flex-wrap gap-2">
              {tabs.map((t) => (
                <a
                  key={t.label}
                  href={`#tab-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-[#F04A16] transition-colors hover:border-[#E8C4A8] hover:bg-[#FFF3E8]"
                >
                  {t.label}
                </a>
              ))}
            </div>

            <div className="mt-8 grid gap-6">
              {tabs.map((t) => (
                <div key={t.label} id={`tab-${t.label.toLowerCase().replace(/\s+/g, "-")}`} className="scroll-mt-28">
                  <h3 className="text-lg font-semibold text-heading">{t.label}</h3>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {t.articleSlugs.map((slug) => {
                      const a = all.find((x) => x.slug === slug);
                      if (!a) return null;
                      return <AdviceArticleCard key={a.slug} article={a} showReadCta readCtaLabel="Read guide →" />;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      ) : null}

      <div className="space-y-6">
        <PageSectionTitle title="All guides in this topic" description="Curated articles for this life area." />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <AdviceArticleCard key={a.slug} article={a} showReadCta readCtaLabel="Read guide →" />
          ))}
        </div>
      </div>

      <Card className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-heading">Not sure where to start?</div>
            <p className="mt-1 text-sm leading-6 text-muted">Ask the AI a question in your own words — it will guide you.</p>
          </div>
          <Button href="/ai" variant="secondary">
            Ask the AI
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
}
