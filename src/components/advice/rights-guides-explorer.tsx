"use client";

import { useMemo, useState } from "react";
import { AdviceArticleCard } from "@/components/advice/advice-article-card";
import type { AdviceArticle } from "@/lib/mock-data";

function articleSearchText(a: AdviceArticle): string {
  const chunks = [a.title, ...a.tags];
  for (const s of a.sections) {
    if (s.type === "p") chunks.push(s.text);
    if (s.type === "h2") chunks.push(s.text);
    if (s.type === "callout") chunks.push(s.title, s.body);
  }
  return chunks.join(" ").toLowerCase();
}

export function RightsGuidesExplorer({ articles }: { articles: AdviceArticle[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) => articleSearchText(a).includes(q));
  }, [articles, query]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-muted">
        Search all rights guides
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mt-1 h-11 w-full max-w-xl rounded-[var(--radius-ui)] border border-border bg-white px-3 text-heading"
          placeholder="Try NHS, housing, UC, complaint, advocacy…"
          autoComplete="off"
        />
      </label>
      <p className="text-sm text-muted">
        Showing {filtered.length} of {articles.length} guides
        {query.trim() ? ` for “${query.trim()}”` : ""}.
      </p>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <AdviceArticleCard key={a.slug} article={a} badgeTone="amber" showReadCta={false} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No guides match that search. Try a shorter word or browse the topics above.</p>
      ) : null}
    </div>
  );
}
