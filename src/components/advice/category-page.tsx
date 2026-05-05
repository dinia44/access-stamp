import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

export function CategoryPage({
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
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === categorySlug);

  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Advice Hub", href: "/advice" },
              { label: title },
            ]}
          />

          <div className="space-y-2">
            <Badge tone="amber">{title}</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">{title}</h1>
            <p className="max-w-[85ch] text-muted">{description}</p>
          </div>

          {tabs ? (
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Browse by category</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {tabs.map((t) => (
                  <a
                    key={t.label}
                    href={`#tab-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="rounded-full bg-blue-pale px-3 py-2 text-xs font-semibold text-blue"
                  >
                    {t.label}
                  </a>
                ))}
              </div>

              <div className="mt-6 grid gap-4">
                {tabs.map((t) => (
                  <div
                    key={t.label}
                    id={`tab-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="scroll-mt-24"
                  >
                    <div className="text-sm font-semibold text-heading">{t.label}</div>
                    <div className="mt-2 grid gap-3 md:grid-cols-2">
                      {t.articleSlugs.map((slug) => {
                        const a = ADVICE_ARTICLES.find((x) => x.slug === slug);
                        if (!a) return null;
                        return (
                          <Link key={a.slug} href={`/advice/${a.slug}`}>
                            <Card className="p-4 hover:shadow-[var(--shadow-soft)]">
                              <div className="text-sm font-semibold text-heading">{a.title}</div>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {a.tags.slice(0, 3).map((tag) => (
                                  <Badge key={tag} tone="blue">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          <div className="grid gap-3 md:grid-cols-3">
            {articles.map((a) => (
              <Link key={a.slug} href={`/advice/${a.slug}`} className="group">
                <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                  <div className="text-sm font-semibold text-heading">{a.title}</div>
                  <div className="mt-2 text-xs font-semibold text-muted">Updated: {a.updated}</div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {a.tags.slice(0, 3).map((t) => (
                      <Badge key={t} tone="blue">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 text-sm font-semibold text-blue">Read →</div>
                </Card>
              </Link>
            ))}
          </div>

          <Card className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-heading">Not sure where to start?</div>
                <div className="mt-1 text-sm text-muted">
                  Ask the AI a question in your own words, it will guide you.
                </div>
              </div>
              <Button href="/ai" variant="secondary">
                Ask the AI
              </Button>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

