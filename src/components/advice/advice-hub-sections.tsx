import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { AdviceTopicIcon } from "@/components/advice/advice-topic-icon";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { GuideMetaLine, GuideTagEyebrow } from "@/components/advice/guide-meta-line";
import { PageContainer } from "@/components/layout/PageContainer";
import { ADVICE_TOPICS } from "@/lib/advice-topics";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { getFeaturedGuides } from "@/lib/advice-guide-meta";

export function AdviceHubUrgentStrip() {
  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-information-soft)] px-4 py-4 sm:px-6"
      aria-labelledby="advice-urgent-heading"
    >
      <PageContainer>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="advice-urgent-heading" className="text-sm font-semibold text-[var(--color-ink)]">
              Need help today?
            </h2>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              Helplines, NHS services and urgent rights cards — always visible, not behind an accordion.
            </p>
          </div>
          <Link
            href="/advice/emergency"
            className="inline-flex min-h-[44px] shrink-0 items-center font-semibold text-[var(--color-information)] hover:underline"
          >
            Open urgent help →
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubTopicGrid() {
  return (
    <section className="bg-[var(--color-canvas)] px-4 py-12 sm:px-6 sm:py-14" aria-labelledby="advice-topic-grid-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Browse by topic</p>
          <h2
            id="advice-topic-grid-heading"
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl"
          >
            Pick a life area
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
            Compact topic cards for browsing — use search above when you already know what you need.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {ADVICE_TOPICS.map((topic) => (
            <li key={topic.slug}>
              <Link
                href={`/advice/${topic.slug}`}
                className="group flex min-h-[72px] items-center gap-3 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-brand-soft)] text-[var(--color-brand)]"
                  aria-hidden
                >
                  <AdviceTopicIcon slug={topic.slug} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-[var(--color-ink)]">{topic.title}</span>
                  <span className="mt-0.5 block text-sm leading-5 text-[var(--color-text-muted)]">
                    {topic.shortDescription}
                  </span>
                </span>
                <span className="shrink-0 text-[var(--color-brand)]" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}

function MostReadCard({ article }: { article: AdviceArticle }) {
  const image = getAdviceArticleCardImage(article);
  return (
    <Link
      href={`/advice/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
    >
      <AdviceMediaFrame>
        <GuideCoverImage
          src={image.src}
          alt=""
          decorative
          className="object-cover transition duration-300 group-hover:scale-[1.02]"
          sizes={ADVICE_CARD_IMAGE_SIZES}
        />
      </AdviceMediaFrame>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <GuideTagEyebrow article={article} />
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-medium leading-snug text-[var(--color-ink)]">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">{article.excerpt}</p>
        ) : null}
        <div className="mt-auto pt-4">
          <GuideMetaLine article={article} />
        </div>
      </div>
    </Link>
  );
}

export function AdviceHubMostRead({ articles }: { articles: AdviceArticle[] }) {
  const featured = getFeaturedGuides(articles, 6);
  if (!featured.length) return null;

  return (
    <section className="bg-[var(--color-surface-subtle)] px-4 py-12 sm:px-6 sm:py-14" aria-labelledby="advice-most-read-heading">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Popular guides</p>
          <h2
            id="advice-most-read-heading"
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl"
          >
            Guides people open first
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">
            Benefits, work, travel, education and care — practical next steps when you need them.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <MostReadCard key={article.slug} article={article} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubEditorialStandards() {
  return (
    <section className="bg-[var(--color-canvas)] px-4 py-12 sm:px-6 sm:py-14" aria-labelledby="advice-editorial-heading">
      <PageContainer>
        <div className="mx-auto max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
          <h2
            id="advice-editorial-heading"
            className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]"
          >
            Our editorial standards
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li>Written by disabled people and carers, in plain English.</li>
            <li>Checked against GOV.UK and primary sources before publication.</li>
            <li>Every guide displays its review date so you can see when it was last checked.</li>
            <li>
              Spotted something wrong? Email{" "}
              <a href="mailto:hello@accessstamp.co.uk" className="font-semibold text-[var(--color-brand)] hover:underline">
                hello@accessstamp.co.uk
              </a>
              .
            </li>
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubUsefulLinks() {
  return (
    <section className="bg-[var(--color-surface-subtle)] px-4 py-10 sm:px-6" aria-labelledby="advice-useful-links-heading">
      <PageContainer>
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <h2 id="advice-useful-links-heading" className="text-base font-semibold text-[var(--color-ink)]">
            Useful links
          </h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold">
            <li>
              <Link className="text-[var(--color-brand)] hover:underline" href="/ai-toolkit">
                Tools →
              </Link>
            </li>
            <li>
              <Link className="text-[var(--color-brand)] hover:underline" href="/directory">
                Support organisations directory →
              </Link>
            </li>
            <li>
              <Link className="text-[var(--color-brand)] hover:underline" href="/glossary">
                Glossary →
              </Link>
            </li>
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
