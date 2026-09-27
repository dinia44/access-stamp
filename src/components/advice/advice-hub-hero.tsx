import { Suspense } from "react";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceHubSearch } from "@/components/advice/advice-hub-search";
import { RouteDecoration } from "@/components/home/route-decoration";

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

export function AdviceHubHero({ articles }: AdviceHubHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-canvas)] px-4 pb-10 pt-8 sm:px-6 sm:pb-14 sm:pt-12">
      <RouteDecoration className="right-[-4%] top-10 hidden h-28 w-[min(50vw,400px)] opacity-60 lg:block" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-brand)]">Guides</p>
          <h1 className="mt-3 font-[family-name:var(--font-heading)] text-[clamp(2rem,5vw,3.75rem)] font-medium leading-[1.03] tracking-[-0.04em] text-[var(--color-ink)]">
            What do you need help with?
          </h1>
          <p className="mt-4 max-w-[62ch] text-base leading-7 text-[var(--color-text-muted)] sm:text-lg sm:leading-8">
            Practical disability guidance for real situations — with quick answers first, clear next steps, and official sources when the detail matters.
          </p>
        </div>

        <div className="mt-7 max-w-3xl">
          <Suspense fallback={<SearchFallback />}>
            <AdviceHubSearch articles={articles} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
