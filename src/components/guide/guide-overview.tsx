import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { GuideReadAloud } from "@/components/guide/guide-read-aloud";
import { adviceTopicLabel } from "@/lib/advice-topics";

type GuideOverviewProps = {
  article: AdviceArticle;
  title: string;
  subtitle?: string;
  summary: string[];
  actions?: string[];
  readText: string;
};

const AUDIENCE_BY_CATEGORY: Record<AdviceArticle["categorySlug"], string> = {
  rights: "Disabled people, families and carers",
  workplace: "Disabled workers and jobseekers",
  care: "People arranging care and support",
  equipment: "People choosing equipment or home adaptations",
  transport: "Disabled travellers and companions",
  travel: "Disabled travellers and companions",
  cars: "Disabled drivers, passengers and families",
  education: "Disabled students, families and supporters",
  emergency: "Anyone needing urgent disability-related support",
  "new-to-disability": "People new to disability and their supporters",
  sport: "Disabled people getting active",
};

function jurisdiction(article: AdviceArticle) {
  if (Array.isArray(article.nations)) return article.nations.join(", ");
  if (article.nations === "UK-wide") return "UK-wide";
  return "Not specified — check the official sources below";
}

function readMinutes(article: AdviceArticle, readText: string) {
  return article.readTimeMinutes ?? Math.max(1, Math.ceil(readText.split(/\s+/).filter(Boolean).length / 200));
}

export function GuideOverview({
  article,
  title,
  subtitle,
  summary,
  actions = [],
  readText,
}: GuideOverviewProps) {
  const categoryLabel = adviceTopicLabel(article.categorySlug);

  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-text-muted)]">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link className="hover:text-[var(--color-brand)] hover:underline" href="/advice">
              Guides
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link className="hover:text-[var(--color-brand)] hover:underline" href={`/advice/${article.categorySlug}`}>
              {categoryLabel}
            </Link>
          </li>
        </ol>
      </nav>

      <header className="space-y-5">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">
            <span>Practical guide</span>
            <span aria-hidden="true">·</span>
            <span>{readMinutes(article, readText)} min read</span>
          </div>
          <h1 className="max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[var(--color-ink)]">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">{subtitle}</p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-text-muted)]">
            <span>Checked {article.lastReviewed ?? article.updated}</span>
            <GuideReadAloud text={readText} compact />
          </div>
        </div>

        <dl className="grid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] sm:grid-cols-3">
          <div className="p-4 sm:border-r sm:border-[var(--color-border)]">
            <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Applies to</dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-[var(--color-ink)]">{jurisdiction(article)}</dd>
          </div>
          <div className="border-t border-[var(--color-border)] p-4 sm:border-r sm:border-t-0">
            <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Who it’s for</dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-[var(--color-ink)]">{AUDIENCE_BY_CATEGORY[article.categorySlug]}</dd>
          </div>
          <div className="border-t border-[var(--color-border)] p-4 sm:border-t-0">
            <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]">Evidence</dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-[var(--color-ink)]">Official and primary sources linked below</dd>
          </div>
        </dl>
      </header>

      {summary.length ? (
        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-information-soft)] p-5 sm:p-6" aria-labelledby={`quick-answer-${article.slug}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-information)]">Quick answer</p>
          <h2 id={`quick-answer-${article.slug}`} className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
            The answer in 30 seconds
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--color-ink)]">
            {summary.slice(0, 5).map((item) => (
              <li key={item} className="flex gap-3">
                <span aria-hidden="true" className="mt-[0.65rem] h-2 w-2 shrink-0 rounded-full bg-[var(--color-information)]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {actions.length ? (
        <section className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-subtle)] p-5 sm:p-6" aria-labelledby={`do-now-${article.slug}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Next steps</p>
          <h2 id={`do-now-${article.slug}`} className="mt-2 font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[var(--color-ink)]">
            Do this now
          </h2>
          <ol className="mt-4 space-y-3">
            {actions.slice(0, 3).map((item, index) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-[var(--color-ink)]">
                <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}
