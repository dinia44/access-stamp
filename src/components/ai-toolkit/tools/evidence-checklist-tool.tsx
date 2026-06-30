"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { ToolkitField, ToolkitTextarea } from "@/components/ai-toolkit/toolkit-field";
import { ToolkitListSection, ToolkitSectionCard } from "@/components/ai-toolkit/toolkit-section-card";
import {
  ToolkitEmptyResults,
  ToolkitError,
  ToolkitSourceNote,
  ToolkitToolShell,
} from "@/components/ai-toolkit/toolkit-tool-shell";
import { useToolkitSubmit } from "@/components/ai-toolkit/use-toolkit-submit";
import { guidesForTopic } from "@/lib/ai-toolkit/related-guides";
import type { ToolkitGuideLink } from "@/lib/ai-toolkit/types";
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";

const meta = getToolkitToolMeta("evidence-checklist")!;

export function EvidenceChecklistTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("evidence-checklist");

  const [topicArea, setTopicArea] = useState("");
  const [situationSummary, setSituationSummary] = useState("");
  const [decisionOrRequest, setDecisionOrRequest] = useState("");
  const [evidenceHave, setEvidenceHave] = useState("");
  const [evidenceMissing, setEvidenceMissing] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({ topicArea, situationSummary, decisionOrRequest, evidenceHave, evidenceMissing });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const out = result?.output;
  const related: ToolkitGuideLink[] = guidesForTopic(topicArea);

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
            <ToolkitListSection title="Essential evidence" items={out.essentialEvidence} />
            <ToolkitListSection title="Helpful evidence" items={out.helpfulEvidence} />
            <ToolkitListSection title="Personal examples to write down" items={out.personalExamples} />
            <ToolkitListSection title="Questions to ask professionals" items={out.questionsForProfessionals} />
            <ToolkitListSection title="What to avoid" items={out.whatToAvoid} />
            <ToolkitSectionCard title="Next step" copyText={out.nextStep}>
              <p>{out.nextStep}</p>
            </ToolkitSectionCard>
            {related.length ? (
              <ToolkitSectionCard title="Related guides">
                <ul className="space-y-2">
                  {related.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href} className="font-semibold text-blue underline-offset-2 hover:underline">
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ToolkitSectionCard>
            ) : null}
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="Topic area" htmlFor="topicArea" required hint="e.g. PIP, Blue Badge, EHCP, DFG, workplace">
          <ToolkitTextarea id="topicArea" value={topicArea} onChange={setTopicArea} required rows={2} />
        </ToolkitField>
        <ToolkitField label="Situation summary" htmlFor="situationSummary" required>
          <ToolkitTextarea id="situationSummary" value={situationSummary} onChange={setSituationSummary} required rows={3} />
        </ToolkitField>
        <ToolkitField label="What decision or request is being made?" htmlFor="decisionOrRequest" required>
          <ToolkitTextarea id="decisionOrRequest" value={decisionOrRequest} onChange={setDecisionOrRequest} required rows={2} />
        </ToolkitField>
        <ToolkitField label="What evidence do you already have?" htmlFor="evidenceHave">
          <ToolkitTextarea id="evidenceHave" value={evidenceHave} onChange={setEvidenceHave} rows={3} />
        </ToolkitField>
        <ToolkitField label="What evidence are you missing?" htmlFor="evidenceMissing">
          <ToolkitTextarea id="evidenceMissing" value={evidenceMissing} onChange={setEvidenceMissing} rows={3} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate checklist"}
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
