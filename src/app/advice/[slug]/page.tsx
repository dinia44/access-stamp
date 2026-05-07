import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AdviceArticleJsonLd } from "@/components/advice-article-jsonld";
import { ArticleActions } from "@/components/article-actions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { ADVICE_ARTICLES, ADVICE_CATEGORIES } from "@/lib/mock-data";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { LAWS_GUIDANCE_LINKS } from "@/lib/laws-guidance";
import { SetChatContext } from "@/components/chat/set-context";

function relatedFor(slug: string, categorySlug: string, limit = 4) {
  return ADVICE_ARTICLES.filter((x) => x.slug !== slug && x.categorySlug === categorySlug).slice(0, limit);
}

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

export default async function AdviceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const resolved = await Promise.resolve(params);
  const a = ADVICE_ARTICLES.find((x) => x.slug === resolved.slug);
  if (!a) return notFound();

  /** Matches hub cards: explicit hero in data, else pooled image for this slug/category */
  const guideHero = a.heroImage
    ? { src: a.heroImage.src, alt: a.heroImage.alt }
    : getAdviceArticleCardImage(a);

  const categoryLabel = slugToCategoryLabel(a.categorySlug);
  const related = relatedFor(a.slug, a.categorySlug);
  const toc = a.sections
    .filter((s) => s.type === "h2")
    .map((s) => ({
      text: (s as { type: "h2"; text: string }).text,
      id: slugifyHeading((s as { type: "h2"; text: string }).text),
    }));
  const relevantLaws =
    a.categorySlug === "education"
      ? LAWS_GUIDANCE_LINKS.filter((item) => item.audience === "Education" || item.audience === "General").slice(0, 4)
      : a.categorySlug === "workplace" || a.categorySlug === "rights"
        ? LAWS_GUIDANCE_LINKS.filter((item) => item.audience === "Work" || item.audience === "General").slice(0, 4)
        : [];

  return (
    <div className="bg-background">
      <AdviceArticleJsonLd article={a} />
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

          <Card className="overflow-hidden border-border shadow-[var(--shadow-soft)]">
            <div className="relative aspect-[21/9] w-full min-h-[180px] sm:min-h-[220px]">
              <Image
                src={guideHero.src}
                alt={guideHero.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, min(1152px, 96vw)"
                priority
              />
            </div>
          </Card>

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
            <Card className="advice-article-print p-6 print:border-0 print:shadow-none">
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

              <div className="mt-8 grid gap-3 border-t border-border pt-6 print:hidden">
                <div className="flex flex-wrap gap-2">
                  <Button href="/ai">Ask the AI about this topic</Button>
                  <Button variant="secondary">Was this helpful?</Button>
                  <ArticleActions title={a.title} />
                </div>
                <div className="text-xs text-muted">
                  This is informational content. It’s not medical advice or legal advice.
                </div>
              </div>
            </Card>

            <div className="grid gap-4 self-start print:hidden lg:sticky lg:top-24">
              <Card className="border-[#dce6f4] p-5 shadow-[0_8px_18px_-14px_rgba(12,29,52,0.2)]">
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

              <Card className="border-[#dce6f4] p-5 shadow-[0_8px_18px_-14px_rgba(12,29,52,0.2)]">
                <div className="text-sm font-semibold text-heading">Related</div>
                {related.length ? (
                  <ul className="mt-3 grid gap-2 text-sm">
                    {related.map((r) => {
                      const img = getAdviceArticleCardImage(r);
                      return (
                        <li key={r.slug} className="flex gap-3 rounded-md py-1">
                          <div className="relative h-11 w-14 shrink-0 overflow-hidden rounded-md bg-background-2">
                            <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
                          </div>
                          <Link className="self-center font-semibold text-blue hover:underline" href={`/advice/${r.slug}`}>
                            {r.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-muted">More guides in this section are coming soon.</p>
                )}
                <div className="mt-4">
                  <Link className="text-sm font-semibold text-blue hover:underline" href={`/advice/${a.categorySlug}`}>
                    Back to {categoryLabel} →
                  </Link>
                </div>
              </Card>
              {relevantLaws.length ? (
                <Card className="border-[#dce6f4] p-5 shadow-[0_8px_18px_-14px_rgba(12,29,52,0.2)]">
                  <div className="text-sm font-semibold text-heading">Useful laws and guidance</div>
                  <ul className="mt-3 grid gap-2 text-sm">
                    {relevantLaws.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} target="_blank" rel="noreferrer" className="font-semibold text-blue hover:underline">
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4">
                    <Link className="text-sm font-semibold text-blue hover:underline" href="/laws-guidance">
                      Open full laws list →
                    </Link>
                  </div>
                </Card>
              ) : null}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
