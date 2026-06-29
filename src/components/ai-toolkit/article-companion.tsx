"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Badge, Button, Card } from "@/components/ui";
import { ToolkitField, ToolkitTextarea } from "@/components/ai-toolkit/toolkit-field";
import { ToolkitListSection, ToolkitSectionCard } from "@/components/ai-toolkit/toolkit-section-card";
import { ToolkitDisclaimer } from "@/components/ai-toolkit/toolkit-disclaimer";
import { ToolkitEmptyResults, ToolkitError, ToolkitSourceNote } from "@/components/ai-toolkit/toolkit-tool-shell";
import { useToolkitSubmit } from "@/components/ai-toolkit/use-toolkit-submit";

export function ArticleCompanion({
  articleSlug,
  articleTitle,
  sectionHeadings = [],
}: {
  articleSlug: string;
  articleTitle: string;
  sectionHeadings?: string[];
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("article-companion");

  const [situation, setSituation] = useState("");
  const [desiredOutcome, setDesiredOutcome] = useState("");
  const [alreadyTried, setAlreadyTried] = useState("");
  const [expanded, setExpanded] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      articleSlug,
      articleTitle,
      situation,
      desiredOutcome,
      alreadyTried,
      sectionHeadings,
    });
    setExpanded(true);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const out = result?.output;

  return (
    <Card className="mt-8 border-blue/30 bg-gradient-to-br from-blue-pale/80 to-card p-5 md:p-6 print:hidden">
      <div className="space-y-2">
        <Badge tone="blue">Guide Companion</Badge>
        <h2 className="text-xl font-bold tracking-[-0.02em] text-heading">Make this guide personal to me</h2>
        <p className="text-sm text-muted">
          Answer three questions to get a checklist, next steps, and draft wording based on this article — not a generic
          chat.
        </p>
      </div>

      {!expanded ? (
        <Button type="button" variant="primary" className="mt-4" onClick={() => setExpanded(true)}>
          Personalise this guide
        </Button>
      ) : (
        <form className="mt-5 space-y-4" onSubmit={onSubmit}>
          <ToolkitField label="What is your situation?" htmlFor={`sit-${articleSlug}`} required>
            <ToolkitTextarea
              id={`sit-${articleSlug}`}
              value={situation}
              onChange={setSituation}
              required
              rows={3}
              placeholder="Briefly describe your circumstances and what is difficult right now."
            />
          </ToolkitField>
          <ToolkitField label="What outcome do you want?" htmlFor={`out-${articleSlug}`} required>
            <ToolkitTextarea
              id={`out-${articleSlug}`}
              value={desiredOutcome}
              onChange={setDesiredOutcome}
              required
              rows={2}
            />
          </ToolkitField>
          <ToolkitField label="What have you already tried?" htmlFor={`tried-${articleSlug}`}>
            <ToolkitTextarea id={`tried-${articleSlug}`} value={alreadyTried} onChange={setAlreadyTried} rows={2} />
          </ToolkitField>
          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
              {loading ? "Generating…" : "Generate my plan"}
            </Button>
            {result ? (
              <Button type="button" variant="ghost" onClick={reset}>
                Clear
              </Button>
            ) : null}
            <Link href="/ai-toolkit/article-companion" className="text-sm font-semibold text-blue hover:underline self-center">
              Open full tool →
            </Link>
          </div>
        </form>
      )}

      <div ref={resultsRef} className="mt-6 space-y-4" aria-live="polite">
        {error ? <ToolkitError message={error} /> : null}
        {out ? (
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
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="ghost" onClick={() => window.print()}>
                Print / save as PDF
              </Button>
            </div>
            <ToolkitDisclaimer />
          </>
        ) : expanded && !loading && !error ? (
          <ToolkitEmptyResults />
        ) : null}
      </div>
    </Card>
  );
}
