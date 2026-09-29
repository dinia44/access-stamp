import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { GuideReadAloud } from "@/components/guide/guide-read-aloud";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { adviceTopicLabel } from "@/lib/advice-topics";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";

type GuideOverviewProps = {
  article: AdviceArticle;
  title: string;
  subtitle?: string;
  summary: string[];
  actions?: string[];
  readText: string;
  guideAnchor?: string;
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
  guideAnchor = "guide-content",
}: GuideOverviewProps) {
  const categoryLabel = adviceTopicLabel(article.categorySlug);
  const image = article.heroImage ?? getAdviceArticleCardImage(article);
  const quickTarget = summary.length ? "#guide-quick-answer" : `#${guideAnchor}`;

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

        <figure className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)]">
          <div className="relative aspect-[16/8.5] min-h-[220px] w-full bg-[var(--color-surface-subtle)] sm:min-h-[300px]">
            <GuideCoverImage
              src={image.src}
              alt={image.alt}
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 rounded-full bg-[var(--color-canvas)]/95 px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)] shadow-sm backdrop-blur">
              {categoryLabel}
            </div>
          </div>
        </figure>

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

      <section
        id="guide-start-here"
        className="scroll-mt-44 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-brand)]/20 bg-[var(--color-brand-soft)] shadow-[var(--shadow-soft)]"
        aria-labelledby={`start-here-${article.slug}`}
      >
        <div className="p-5 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Start here</p>
          <h2 id={`start-here-${article.slug}`} className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.025em] text-[var(--color-ink)]">
            What do you need from this guide today?
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-muted)]">
            Choose the quickest route for you. You can always come back and read the full guide later.
          </p>
        </div>

        <div className="grid border-t border-[var(--color-brand)]/15 bg-[var(--color-surface)] sm:grid-cols-3">
          <a href={quickTarget} className="group min-h-36 p-5 transition-colors hover:bg-[var(--color-information-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-r sm:border-[var(--color-border)]">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-information)]">30 seconds</span>
            <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-information)]">Give me the quick answer</span>
            <span className="mt-2 block text-sm leading-6 text-[var(--color-text-muted)]">See the key answer and immediate next actions.</span>
          </a>
          <a href={`#${guideAnchor}`} className="group min-h-36 border-t border-[var(--color-border)] p-5 transition-colors hover:bg-[var(--color-surface-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-r sm:border-t-0">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-brand)]">Step by step</span>
            <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">Guide me through it</span>
            <span className="mt-2 block text-sm leading-6 text-[var(--color-text-muted)]">Work through the detail in a clear order.</span>
          </a>
          <Link href={`/ask?guide=${encodeURIComponent(article.slug)}&mode=personalise`} className="group min-h-36 border-t border-[var(--color-border)] p-5 transition-colors hover:bg-[var(--color-trust-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-focus-ring)] sm:border-t-0">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-trust)]">Access Stamp AI</span>
            <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-trust)]">Make this relevant to me</span>
            <span className="mt-2 block text-sm leading-6 text-[var(--color-text-muted)]">Tell us what is happening and get a sourced plan built around your situation.</span>
          </Link>
        </div>
      </section>

      {summary.length || actions.length ? (
        <section id="guide-quick-answer" className="scroll-mt-44 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7" aria-labelledby={`quick-answer-${article.slug}`}>
          <div className="grid gap-6 sm:grid-cols-[1.2fr_0.8fr] sm:gap-8">
            {summary.length ? (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-information)]">Your answer</p>
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
              </div>
            ) : null}

            {actions.length ? (
              <div className="border-t border-[var(--color-border)] pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">Your next moves</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">Do these first</h3>
                <ol className="mt-4 space-y-4">
                  {actions.slice(0, 3).map((item, index) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--color-ink)]">
                      <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-[var(--color-brand)] text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
