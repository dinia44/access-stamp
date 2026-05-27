"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ToolkitField, ToolkitSelect, ToolkitTextarea } from "@/components/ai-toolkit/toolkit-field";
import { ToolkitListSection, ToolkitSectionCard } from "@/components/ai-toolkit/toolkit-section-card";
import {
  ToolkitEmptyResults,
  ToolkitError,
  ToolkitSourceNote,
  ToolkitToolShell,
} from "@/components/ai-toolkit/toolkit-tool-shell";
import { useToolkitSubmit } from "@/components/ai-toolkit/use-toolkit-submit";
import { articleBySlug } from "@/lib/ai-toolkit/related-guides";
import { ADVICE_ARTICLES } from "@/lib/mock-data";
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";

const meta = getToolkitToolMeta("article-companion")!;

export function ArticleCompanionTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("article-companion");

  const [articleSlug, setArticleSlug] = useState(ADVICE_ARTICLES[0]?.slug ?? "");
  const [situation, setSituation] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [alreadyTried, setAlreadyTried] = useState("");

  const article = articleBySlug(articleSlug);
  const sectionHeadings =
    article?.sections
      .filter((s): s is { type: "h2"; text: string } => s.type === "h2")
      .map((s) => s.text) ?? [];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!article) return;
    await submit({
      articleSlug,
      articleTitle: article.title,
      situation,
      desiredOutcome,
      alreadyTried,
      sectionHeadings,
    });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const out = result?.output;

  return (
    <ToolkitToolShell
      meta={meta}
      resultsRef={resultsRef}
      onPrint={() => window.print()}
      results={
        error ? (
          <ToolkitError message={error} />
        ) : out ? (
          <>
            <ToolkitSourceNote source={result!.source} />
            <ToolkitListSection title="My checklist" items={out.checklist} />
            <ToolkitListSection title="My next 3 steps" items={out.nextSteps} />
            <ToolkitSectionCard title="Draft wording" copyText={out.draftWording}>
              <p className="whitespace-pre-wrap">{out.draftWording}</p>
            </ToolkitSectionCard>
            {out.simpleEnglishSummary ? (
              <ToolkitSectionCard title="Simple-English summary" copyText={out.simpleEnglishSummary}>
                <p>{out.simpleEnglishSummary}</p>
              </ToolkitSectionCard>
            ) : null}
            {out.phoneScript ? (
              <ToolkitSectionCard title="Phone script" copyText={out.phoneScript}>
                <p className="whitespace-pre-wrap">{out.phoneScript}</p>
              </ToolkitSectionCard>
            ) : null}
            {out.relatedSections?.length ? (
              <ToolkitSectionCard title="Related article sections">
                <ul className="list-disc space-y-1 pl-5">
                  {out.relatedSections.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </ToolkitSectionCard>
            ) : null}
            {article ? (
              <p className="text-sm">
                <Link href={`/advice/${article.slug}`} className="font-semibold text-blue hover:underline">
                  Back to: {article.title}
                </Link>
              </p>
            ) : null}
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="Which guide?" htmlFor="articleSlug" required>
          <ToolkitSelect
            id="articleSlug"
            value={articleSlug}
            onChange={setArticleSlug}
            options={ADVICE_ARTICLES.map((a) => ({
              value: a.slug,
              label: a.title.length > 60 ? `${a.title.slice(0, 57)}…` : a.title,
            }))}
          />
        </ToolkitField>
        <p className="text-xs text-muted">
          Or open any advice article and use <strong className="text-heading">Make this guide personal to me</strong> on
          that page.
        </p>
        <ToolkitField label="What is your situation?" htmlFor="situation" required>
          <ToolkitTextarea id="situation" value={situation} onChange={setSituation} required rows={4} />
        </ToolkitField>
        <ToolkitField label="What outcome do you want?" htmlFor="desiredOutcome" required>
          <ToolkitTextarea id="desiredOutcome" value={desiredOutcome} onChange={setDesiredOutcome} required rows={3} />
        </ToolkitField>
        <ToolkitField label="What have you already tried?" htmlFor="alreadyTried">
          <ToolkitTextarea id="alreadyTried" value={alreadyTried} onChange={setAlreadyTried} rows={3} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate my plan"}
          </Button>
          {result ? (
            <Button type="button" variant="ghost" onClick={reset}>
              Clear results
            </Button>
          ) : null}
        </div>
      </form>
    </ToolkitToolShell>
  );
}
