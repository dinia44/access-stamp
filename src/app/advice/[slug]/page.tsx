import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { ADVICE_ARTICLES, ADVICE_CATEGORIES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

function slugToCategoryLabel(categorySlug: string) {
  const match = ADVICE_CATEGORIES.find((c) => c.href === `/advice/${categorySlug}`);
  return match?.title ?? "Advice";
}

function slugifyHeading(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function AdviceArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const a = ADVICE_ARTICLES.find((x) => x.slug === params.slug);
  if (!a) return notFound();

  const categoryLabel = slugToCategoryLabel(a.categorySlug);
  const toc = a.sections
    .filter((s) => s.type === "h2")
    .map((s) => ({
      text: (s as { type: "h2"; text: string }).text,
      id: slugifyHeading((s as { type: "h2"; text: string }).text),
    }));

  return (
    <div className="bg-background">
      <SetChatContext
        page={{
          kind: "advice-article",
          slug: a.slug,
          title: a.title,
          category: a.categorySlug,
        }}
      />
      <Container className="py-10">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Advice Hub", href: "/advice" },
              { label: categoryLabel, href: `/advice/${a.categorySlug}` },
              { label: a.title },
            ]}
          />

          <div className="space-y-3">
            <h1 className="font-[var(--font-heading)] text-4xl leading-tight text-heading">
              {a.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="amber">{categoryLabel}</Badge>
              {a.tags.map((t) => (
                <Badge key={t} tone="blue">
                  {t}
                </Badge>
              ))}
              <span className="text-xs font-semibold text-muted">
                Last updated: {a.updated}
              </span>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
            <Card className="p-6">
              <article className="prose max-w-none">
                {a.sections.map((s, idx) => {
                  if (s.type === "h2") {
                    const id = slugifyHeading(s.text);
                    return (
                      <h2
                        key={idx}
                        id={id}
                        className="mt-8 scroll-mt-24 font-[var(--font-heading)] text-2xl text-heading"
                      >
                        {s.text}
                      </h2>
                    );
                  }
                  if (s.type === "p") {
                    return (
                      <p key={idx} className="mt-3 text-sm leading-7 text-text">
                        {s.text}
                      </p>
                    );
                  }
                  if (s.type === "ul") {
                    return (
                      <ul key={idx} className="mt-3 list-disc pl-5 text-sm text-text">
                        {s.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (s.type === "callout") {
                    const tone =
                      s.tone === "warning"
                        ? "border-amber bg-amber-pale"
                        : s.tone === "contact"
                          ? "border-blue bg-blue-pale"
                          : s.tone === "steps"
                            ? "border-border bg-background"
                            : "border-border bg-background-2";

                    const icon =
                      s.tone === "warning"
                        ? "⚠️"
                        : s.tone === "contact"
                          ? "📞"
                          : s.tone === "steps"
                            ? "📋"
                            : "💡";
                    return (
                      <div
                        key={idx}
                        className={`mt-4 rounded-[var(--radius-card)] border p-4 ${tone}`}
                      >
                        <div className="text-sm font-semibold text-heading">
                          {icon} {s.title}
                        </div>
                        <p className="mt-2 text-sm text-text">{s.body}</p>
                      </div>
                    );
                  }
                  return null;
                })}
              </article>

              <div className="mt-8 grid gap-3 border-t border-border pt-6">
                <div className="flex flex-wrap gap-2">
                  <Button href="/ai">Ask the AI about this topic</Button>
                  <Button variant="secondary">Was this helpful?</Button>
                  <Button variant="ghost">Share</Button>
                  <Button variant="ghost">Print / Download</Button>
                </div>
                <div className="text-xs text-muted">
                  This is informational content. It’s not medical advice or legal advice.
                </div>
              </div>
            </Card>

            <div className="grid gap-4">
              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">Table of contents</div>
                <ol className="mt-3 grid gap-2 text-sm">
                  {toc.map((t) => (
                    <li key={t.id}>
                      <a className="font-semibold text-blue hover:underline" href={`#${t.id}`}>
                        {t.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </Card>

              <Card className="p-5">
                <div className="text-sm font-semibold text-heading">Related</div>
                <div className="mt-2 text-sm text-muted">
                  Related articles will be shown here (by tags/category) once the CMS is connected.
                </div>
                <div className="mt-3">
                  <Link className="text-sm font-semibold text-blue" href={`/advice/${a.categorySlug}`}>
                    Back to {categoryLabel} →
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
