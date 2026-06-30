"use client";

import { useRef, useState } from "react";
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
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";

const meta = getToolkitToolMeta("tribunal-bundle-helper")!;

export function TribunalBundleHelperTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("tribunal-bundle-helper");
  const [benefitArea, setBenefitArea] = useState("PIP");
  const [decisionDate, setDecisionDate] = useState("");
  const [issueSummary, setIssueSummary] = useState("");
  const [evidenceHave, setEvidenceHave] = useState("");
  const [evidenceMissing, setEvidenceMissing] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({ benefitArea, decisionDate, issueSummary, evidenceHave, evidenceMissing });
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
            <ToolkitListSection title="Chronology" items={out.chronology} />
            <ToolkitListSection title="Key points for submission" items={out.keyPointsForSubmission} />
            <ToolkitListSection title="Evidence bundle checklist" items={out.evidenceBundleChecklist} />
            <ToolkitListSection title="Likely gaps" items={out.likelyGaps} />
            <ToolkitListSection title="Hearing-day checklist" items={out.hearingDayChecklist} />
            <ToolkitSectionCard title="Short submission opening" copyText={out.shortSubmissionOpening}>
              <p className="whitespace-pre-wrap">{out.shortSubmissionOpening}</p>
            </ToolkitSectionCard>
            <ToolkitSectionCard title="Disclaimer">
              <p>{out.disclaimer}</p>
            </ToolkitSectionCard>
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="Benefit or appeal area" required>
          <ToolkitTextarea value={benefitArea} onChange={setBenefitArea} rows={2} required />
        </ToolkitField>
        <ToolkitField label="Decision date (optional)">
          <ToolkitTextarea value={decisionDate} onChange={setDecisionDate} rows={2} />
        </ToolkitField>
        <ToolkitField label="What is in dispute?" required>
          <ToolkitTextarea value={issueSummary} onChange={setIssueSummary} rows={3} required />
        </ToolkitField>
        <ToolkitField label="Evidence you already have">
          <ToolkitTextarea value={evidenceHave} onChange={setEvidenceHave} rows={3} />
        </ToolkitField>
        <ToolkitField label="Evidence you are missing">
          <ToolkitTextarea value={evidenceMissing} onChange={setEvidenceMissing} rows={3} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Build tribunal plan"}
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
