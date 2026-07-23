"use client";

import { useMemo, useState } from "react";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import type { AdviceArticle } from "@/lib/content/types";

const PAGE_SIZE = 9;

function readMinutes(article: AdviceArticle) {
  const words = article.sections
    .map((s) => (s.type === "ul" ? s.items.join(" ") : "text" in s ? s.text : ""))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(2, Math.round(words / 180));
}

type Props = {
  articles: AdviceArticle[];
};

/** Paginated topic guide list — Load more instead of dumping the full index. */
export function AdviceCategoryGuideList({ articles }: Props) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visible = useMemo(() => articles.slice(0, visibleCount), [articles, visibleCount]);
  const remaining = Math.max(0, articles.length - visibleCount);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((a) => (
          <AdviceArticleCard
            key={a.slug}
            article={a}
            badgeTone="blue"
            tagLimit={2}
            meta={
              <div className="mt-2 text-xs font-semibold text-muted">
                {readMinutes(a)} min read · Updated {a.updated}
              </div>
            }
          />
        ))}
      </div>
      {remaining > 0 ? (
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-heading hover:border-[var(--color-brand)]"
          onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
        >
          Load {Math.min(PAGE_SIZE, remaining)} more guides
        </button>
      ) : null}
    </div>
  );
}
