import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import { AdviceManualCard } from "@/components/advice/advice-manual-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { getAdviceArticles } from "@/lib/content/advice";
import type { AdviceArticle } from "@/lib/content/types";

export type AdviceCategoryLandingProps = {
  categorySlug: AdviceArticle["categorySlug"];
  breadcrumbLabel: string;
  badge: string;
  title: string;
  subtitle: string;
  quickActions: { label: string; href: string }[];
  featuredSlugs: string[];
  topicAreas: { title: string; desc: string; href: string }[];
  checklistTitle?: string;
  checklistItems?: string[];
};

export async function AdviceCategoryLanding({
  categorySlug,
  breadcrumbLabel,
  badge,
  title,
  subtitle,
  quickActions,
  featuredSlugs,
  topicAreas,
  checklistTitle,
  checklistItems,
}: AdviceCategoryLandingProps) {
  const all = await getAdviceArticles();
  const articles = all.filter((a) => a.categorySlug === categorySlug);
  const featured = featuredSlugs
    .map((slug) => articles.find((a) => a.slug === slug))
    .filter((a): a is AdviceArticle => Boolean(a));

  function readMinutes(article: AdviceArticle) {
    const words = article.sections
      .map((s) => (s.type === "ul" ? s.items.join(" ") : "text" in s ? s.text : ""))
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(2, Math.round(words / 180));
  }

  return (
    <PageLayout>
      <SetChatContext page={{ kind: "advice" }} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Advice Hub", href: "/advice" },
          { label: breadcrumbLabel },
        ]}
      />

      <PageHero badge={<Badge tone="blue">{badge}</Badge>} title={title} subtitle={subtitle} />

      <Card className="border-border p-6 shadow-[var(--shadow-soft)] sm:p-7">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_.9fr]">
              <div className="space-y-5">
                <div className="space-y-3">
                  <div className="text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</div>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((item) => (
                      <Button key={item.href} href={item.href} variant="ghost" className="border border-border bg-white hover:bg-blue-pale">
                        {item.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-heading">Featured guides</div>
                    <Badge tone="blue">Popular</Badge>
                  </div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {featured.map((a) => (
                      <AdviceArticleCard
                        key={a.slug}
                        article={a}
                        badgeTone="blue"
                        tagLimit={2}
                        meta={
                          <div className="mt-2 text-[11px] font-medium text-muted">
                            {readMinutes(a)} min read · Updated {a.updated}
                          </div>
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>

              {checklistItems?.length ? (
                <div className="rounded-[var(--radius-card)] border border-border bg-amber-pale p-5">
                  <div className="text-sm font-semibold text-heading">{checklistTitle ?? "Before you start"}</div>
                  <ul className="mt-3 space-y-3 text-sm text-text">
                    {checklistItems.map((item, index) => (
                      <li key={item} className="flex gap-3">
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card text-xs font-semibold text-warning">
                          {index + 1}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button href="/ai" variant="secondary" className="mt-5 w-full sm:w-auto">
                    Ask the AI about this topic
                  </Button>
                </div>
              ) : (
                <div className="rounded-[var(--radius-card)] border border-blue-pale bg-blue-pale/50 p-5">
                  <div className="text-sm font-semibold text-heading">Ask in your own words</div>
                  <p className="mt-2 text-sm text-text">
                    If your situation does not fit a neat category, describe what happened and what you need next — the
                    assistant can help you sort escalation routes.
                  </p>
                  <Button href="/" variant="secondary" className="mt-4 w-full sm:w-auto">
                    Open assistant
                  </Button>
                </div>
              )}
            </div>
          </Card>

          <section className="space-y-3">
            <PageSectionTitle
              title="Explore topics"
              description="Pick the area closest to your barrier — you can move between guides freely."
            />
            <div className="grid gap-3 md:grid-cols-3">
              {topicAreas.map((item) => (
                <AdviceManualCard
                  key={item.title}
                  href={item.href}
                  title={item.title}
                  description={item.desc}
                  categorySlug={categorySlug}
                  badge="Guide"
                  cta="Open guide"
                />
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <PageSectionTitle
              title="All guides in this section"
              description="Plain-language routes through transport, paperwork, and practical barriers."
            />

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <AdviceArticleCard
                  key={a.slug}
                  article={a}
                  badgeTone="blue"
                  meta={
                    <div className="mt-2 text-xs font-semibold text-muted">
                      Updated: {a.updated} · {readMinutes(a)} min read
                    </div>
                  }
                />
              ))}
            </div>
          </section>
    </PageLayout>
  );
}
