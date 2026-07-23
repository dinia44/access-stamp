import Link from "next/link";
import { Suspense } from "react";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceHubSearch } from "@/components/advice/advice-hub-search";
import { GuideMetaLine } from "@/components/advice/guide-meta-line";
import { RouteDecoration } from "@/components/home/route-decoration";
import { adviceTopicLabel } from "@/lib/advice-topics";

type AdviceHubHeroProps = {
  articles: AdviceArticle[];
  mostReadGuide: AdviceArticle;
};

function SearchFallback() {
  return (
    <div
      className="min-h-[220px] rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
      aria-hidden
    />
  );
}

export function AdviceHubHero({ articles, mostReadGuide }: AdviceHubHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-canvas)] px-4 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
      <RouteDecoration className="right-[-4%] top-10 hidden h-28 w-[min(50vw,400px)] opacity-70 lg:block" />

      <div className="relative mx-auto max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Advice hub</p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-heading)] text-[clamp(1.75rem,4.5vw,3.25rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--color-ink)]">
          Practical guides in <span className="italic text-[var(--color-brand)]">plain language.</span>
        </h1>
        <p className="mt-3 max-w-[62ch] text-base leading-7 text-[var(--color-text-muted)]">
          Rights, benefits, equipment, care, education, transport and work — written from lived experience, checked
          against official guidance, and dated so you know it&apos;s current.
        </p>

        <div className="mt-6 max-w-3xl">
          <Suspense fallback={<SearchFallback />}>
            <AdviceHubSearch articles={articles} />
          </Suspense>
        </div>

        {/* Featured guide — secondary to search; sits below on all widths */}
        <aside className="mt-6 max-w-3xl rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">
            Most-read guide
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-medium leading-snug text-[var(--color-ink)] sm:text-xl">
            <Link
              href={`/advice/${mostReadGuide.slug}`}
              className="hover:text-[var(--color-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)]"
            >
              {mostReadGuide.title}
            </Link>
          </h2>
          {mostReadGuide.excerpt ? (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--color-text-muted)]">{mostReadGuide.excerpt}</p>
          ) : null}
          <div className="mt-3">
            <GuideMetaLine article={mostReadGuide} categoryLabel={adviceTopicLabel(mostReadGuide.categorySlug)} />
          </div>
          <Link
            href={`/advice/${mostReadGuide.slug}`}
            className="mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--color-brand)] hover:underline"
          >
            Open guide →
          </Link>
        </aside>
      </div>
    </section>
  );
}
