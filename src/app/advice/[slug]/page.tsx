import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdviceArticleJsonLd } from "@/components/advice-article-jsonld";
import { ArticleActions } from "@/components/article-actions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { Container } from "@/components/container";
import { Badge, Button, Card } from "@/components/ui";
import { getAdviceArticleBySlug, getAdviceArticles } from "@/lib/content/advice";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { LAWS_GUIDANCE_LINKS } from "@/lib/laws-guidance";
import { SetChatContext } from "@/components/chat/set-context";
import { ArticleCompanion } from "@/components/ai-toolkit/article-companion";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getAdviceArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const a = await getAdviceArticleBySlug(slug);
  if (!a) return {};
  const firstParagraph = a.sections.find((s) => s.type === "p");
  const fallbackDesc =
    firstParagraph && "text" in firstParagraph ? firstParagraph.text.slice(0, 160) : a.title;
  const title = a.seoTitle ?? a.title;
  const description = a.metaDescription ?? a.excerpt ?? fallbackDesc;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

async function relatedFor(slug: string, categorySlug: string, limit = 4) {
  const all = await getAdviceArticles();
  return all.filter((x) => x.slug !== slug && x.categorySlug === categorySlug).slice(0, limit);
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
  const a = await getAdviceArticleBySlug(resolved.slug);
  if (!a) return notFound();

  /** Matches hub cards: explicit hero in data, else pooled image for this slug/category */
  const guideHero = a.heroImage
    ? { src: a.heroImage.src, alt: a.heroImage.alt }
    : getAdviceArticleCardImage(a);

  const categoryLabel = slugToCategoryLabel(a.categorySlug);
  const related = await relatedFor(a.slug, a.categorySlug);
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
    <div className="bg-background advice-article-page">
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
          <div className="print:hidden">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Advice Hub", href: "/advice" },
                { label: categoryLabel, href: `/advice/${a.categorySlug}` },
                { label: a.title },
              ]}
            />
          </div>

          <Card className="advice-article-hero overflow-hidden border-border shadow-[var(--shadow-soft)] print:hidden">
            <div className="relative aspect-[21/9] w-full min-h-[180px] sm:min-h-[220px]">
              <GuideCoverImage
                src={guideHero.src}
                alt={guideHero.alt}
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, min(1152px, 96vw)"
                priority
              />
            </div>
          </Card>

          <div className="space-y-3">
            <h1 className="advice-print-title font-[var(--font-heading)] text-4xl leading-tight text-heading">
              {a.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 print:hidden">
              <Badge tone="blue">{categoryLabel}</Badge>
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

          <div className="grid gap-4 print:grid-cols-1 lg:grid-cols-[1fr_320px]">
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
                  if (s.type === "pre") {
                    return (
                      <pre
                        key={idx}
                        className="mt-4 overflow-x-auto rounded-[var(--radius-card)] border border-border bg-background-2 p-4 font-mono text-xs leading-relaxed text-text whitespace-pre-wrap print:break-inside-avoid-page print:border print:bg-white print:text-[8.5pt]"
                      >
                        {s.text}
                      </pre>
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
                  if (s.type === "links") {
                    return (
                      <ul key={idx} className="mt-3 grid gap-2 text-sm">
                        {s.items.map((link) => {
                          const internal = link.href.startsWith("/");
                          return (
                            <li key={link.href}>
                              {internal ? (
                                <Link href={link.href} className="font-semibold text-blue underline-offset-2 hover:underline">
                                  {link.label}
                                </Link>
                              ) : (
                                <a
                                  href={link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-blue underline-offset-2 hover:underline"
                                >
                                  {link.label}
                                </a>
                              )}
                            </li>
                          );
                        })}
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
                        className={cn(
                          "advice-callout-print mt-4 rounded-[var(--radius-card)] border p-4",
                          tone,
                        )}
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

              <ArticleCompanion
                articleSlug={a.slug}
                articleTitle={a.title}
                sectionHeadings={a.sections
                  .filter((s): s is { type: "h2"; text: string } => s.type === "h2")
                  .map((s) => s.text)}
              />

              <div className="mt-8 grid gap-3 border-t border-border pt-6 print:hidden">
                <div className="flex flex-wrap gap-2">
                  <Button href="/ai-toolkit">AI Toolkit</Button>
                  <Button href="/?openChat=1">Open AI Assistant</Button>
                  {a.slug === "employing-a-personal-assistant-basics" ? (
                    <>
                      <a
                        href="/api/downloads/pa-recruitment-pack/pdf"
                        download="access-stamp-pa-recruitment-pack.pdf"
                        className={cn(
                          "inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold transition-colors",
                          "bg-navy text-white hover:bg-[#0f2648]",
                        )}
                      >
                        Download pack (PDF)
                      </a>
                      <a
                        href="/api/downloads/pa-recruitment-pack"
                        download="access-stamp-pa-recruitment-pack.txt"
                        className={cn(
                          "inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold transition-colors",
                          "border border-border bg-card text-heading hover:bg-background-2",
                        )}
                      >
                        Plain text (.txt)
                      </a>
                    </>
                  ) : null}
                  <Button variant="secondary">Was this helpful?</Button>
                  <ArticleActions title={a.title} />
                </div>
                {a.slug === "employing-a-personal-assistant-basics" ? (
                  <p className="text-xs text-muted">
                    <strong className="text-heading">PDF</strong> and <strong className="text-heading">.txt</strong> are built from the same templates as this page.
                    Use <strong className="text-heading">Print or save as PDF</strong> for a styled browser printout (hero and sidebar hidden on paper). Informational
                    only — not medical or legal advice.
                  </p>
                ) : (
                  <div className="text-xs text-muted">
                    This is informational content. It’s not medical advice or legal advice.
                  </div>
                )}
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
                            <GuideCoverImage src={img.src} alt="" className="object-cover" sizes="56px" />
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
