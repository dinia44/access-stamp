import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { GuideMetaLine, GuideTagEyebrow } from "@/components/advice/guide-meta-line";
import { PageContainer } from "@/components/layout/PageContainer";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { getFeaturedGuides } from "@/lib/advice-guide-meta";

const TOPIC_GROUPS = [
  {
    title: "Money, benefits & rights",
    description: "PIP, Blue Badge, discrimination, complaints and getting decisions challenged.",
    href: "/advice/rights",
  },
  {
    title: "Work & education",
    description: "Reasonable adjustments, Access to Work, study support and returning after illness or injury.",
    href: "/advice/workplace",
  },
  {
    title: "Care & support",
    description: "Assessments, direct payments, carers, support plans and arranging practical help.",
    href: "/advice/care",
  },
  {
    title: "Equipment & home",
    description: "Wheelchairs, equipment, adaptations, funding routes and choosing what actually works.",
    href: "/advice/equipment",
  },
  {
    title: "Travel & transport",
    description: "Flying, rail travel, driving, Motability, assistance and planning accessible journeys.",
    href: "/advice/travel",
  },
  {
    title: "Everyday disability",
    description: "New diagnoses, emergencies, staying active and practical day-to-day access questions.",
    href: "/advice/new-to-disability",
  },
] as const;

export function AdviceHubUrgentStrip() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-information-soft)] px-4 py-4 sm:px-6" aria-labelledby="advice-urgent-heading">
      <PageContainer>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="advice-urgent-heading" className="font-semibold text-[var(--color-ink)]">Need help today?</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">Urgent services, crisis support and time-sensitive disability advice.</p>
          </div>
          <Link href="/advice/emergency" className="inline-flex min-h-11 shrink-0 items-center font-semibold text-[var(--color-information)] hover:underline">
            Open urgent help →
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubTopicGrid() {
  return (
    <section className="bg-[var(--color-canvas)] px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="advice-topic-grid-heading">
      <PageContainer>
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Browse by situation</p>
          <h2 id="advice-topic-grid-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl">
            Start with the problem you’re trying to solve
          </h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">You do not need to know which service, benefit or legal route applies before you begin.</p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TOPIC_GROUPS.map((topic) => (
            <li key={topic.title}>
              <Link href={topic.href} className="group flex h-full min-h-44 flex-col rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition hover:border-[var(--color-brand)] hover:shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]">
                <h3 className="font-[family-name:var(--font-heading)] text-xl font-medium tracking-[-0.02em] text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">{topic.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">{topic.description}</p>
                <span className="mt-auto pt-5 text-sm font-semibold text-[var(--color-brand)]">See guides →</span>
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
    <Link href={`/advice/${article.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] transition hover:border-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]">
      <AdviceMediaFrame>
        <GuideCoverImage src={image.src} alt="" decorative className="object-cover transition duration-300 group-hover:scale-[1.02]" sizes={ADVICE_CARD_IMAGE_SIZES} />
      </AdviceMediaFrame>
      <div className="flex flex-1 flex-col p-5">
        <GuideTagEyebrow article={article} />
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-xl font-medium leading-snug tracking-[-0.015em] text-[var(--color-ink)]">{article.title}</h3>
        {article.excerpt ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--color-text-muted)]">{article.excerpt}</p> : null}
        <div className="mt-auto pt-4"><GuideMetaLine article={article} /></div>
      </div>
    </Link>
  );
}

export function AdviceHubMostRead({ articles }: { articles: AdviceArticle[] }) {
  const featured = getFeaturedGuides(articles, 6);
  if (!featured.length) return null;
  return (
    <section className="bg-[var(--color-surface-subtle)] px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="advice-most-read-heading">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Useful starting points</p>
          <h2 id="advice-most-read-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl">Common questions, answered clearly</h2>
          <p className="mt-3 text-base leading-7 text-[var(--color-text-muted)]">A small set of guides people often need first. Search above if you already know your question.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((article) => <MostReadCard key={article.slug} article={article} />)}</div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubEditorialStandards() {
  return (
    <section className="bg-[var(--color-canvas)] px-4 py-12 sm:px-6 sm:py-16" aria-labelledby="advice-editorial-heading">
      <PageContainer>
        <div className="grid gap-6 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-trust)]">Why trust these guides</p>
            <h2 id="advice-editorial-heading" className="mt-3 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)] sm:text-3xl">Clear about what we know — and what you should verify</h2>
          </div>
          <ul className="space-y-3 text-sm leading-7 text-[var(--color-text-muted)]">
            <li><strong className="text-[var(--color-ink)]">Plain language:</strong> written for people dealing with the issue, not professionals already familiar with the system.</li>
            <li><strong className="text-[var(--color-ink)]">Primary sources:</strong> official rules and services are linked where they matter.</li>
            <li><strong className="text-[var(--color-ink)]">Review dates:</strong> guides show when they were last checked so stale information is easier to spot.</li>
            <li><strong className="text-[var(--color-ink)]">Corrections:</strong> email <a href="mailto:hello@accessstamp.co.uk" className="font-semibold text-[var(--color-brand)] hover:underline">hello@accessstamp.co.uk</a> if something looks wrong.</li>
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
        <div className="flex flex-col gap-4 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 id="advice-useful-links-heading" className="font-[family-name:var(--font-heading)] text-xl font-medium text-[var(--color-ink)]">Need something other than a guide?</h2>
            <p className="mt-1 text-sm leading-6 text-[var(--color-text-muted)]">Use Access Stamp’s practical tools or find an organisation that can help directly.</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
            <Link className="text-[var(--color-brand)] hover:underline" href="/ai-toolkit">Open tools →</Link>
            <Link className="text-[var(--color-brand)] hover:underline" href="/directory">Find support →</Link>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
