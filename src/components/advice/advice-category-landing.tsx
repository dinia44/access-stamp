import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES, type AdviceArticle } from "@/lib/mock-data";

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

export function AdviceCategoryLanding({
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
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === categorySlug);
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
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <Container className="py-10">
        <div className="space-y-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Advice Hub", href: "/advice" },
              { label: breadcrumbLabel },
            ]}
          />

          <div className="max-w-4xl space-y-4">
            <Badge tone="amber" className="w-fit">
              {badge}
            </Badge>
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading sm:text-5xl">{title}</h1>
            <p className="max-w-[82ch] text-base leading-7 text-muted">{subtitle}</p>
          </div>

          <Card className="border-[#dce6f4] p-6 shadow-[0_10px_24px_-16px_rgba(12,29,52,0.2)] sm:p-7">
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

                <div className="rounded-[var(--radius-card)] border border-[#dce6f4] bg-background-2 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-semibold text-heading">Featured guides</div>
                    <Badge tone="blue">Popular</Badge>
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {featured.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/advice/${a.slug}`}
                        className="rounded-[var(--radius-ui)] border border-[#dce6f4] bg-card px-3 py-3 text-sm font-semibold text-heading transition-all hover:-translate-y-0.5 hover:bg-blue-pale hover:text-blue hover:shadow-[var(--shadow-soft)]"
                      >
                        <div>{a.title}</div>
                        <div className="mt-1 text-[11px] font-medium text-muted">{readMinutes(a)} min read · Updated {a.updated}</div>
                      </Link>
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
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-card text-xs font-semibold text-amber">
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
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">Explore topics</h2>
              <p className="text-sm text-muted">Pick the area closest to your barrier — you can move between guides freely.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {topicAreas.map((item) => (
                <Link key={item.title} href={item.href} className="group">
                  <Card className="h-full border-[#dce6f4] p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold uppercase tracking-wide text-muted">{item.title}</div>
                      <Badge tone="amber">Guide</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted">{item.desc}</p>
                    <div className="mt-4 text-sm font-semibold text-blue">Open guide</div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <h2 className="font-[var(--font-heading)] text-2xl text-heading">All guides in this section</h2>
              <p className="text-sm text-muted">Plain-language routes through transport, paperwork, and practical barriers.</p>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <Link key={a.slug} href={`/advice/${a.slug}`} className="group">
                  <Card className="h-full border-[#dce6f4] p-5 transition-all group-hover:-translate-y-0.5 group-hover:shadow-[var(--shadow)]">
                    <div className="text-sm font-semibold text-heading">{a.title}</div>
                    <div className="mt-2 text-xs font-semibold text-muted">Updated: {a.updated} · {readMinutes(a)} min read</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {a.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} tone="blue">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
