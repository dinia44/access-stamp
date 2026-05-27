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

const meta = getToolkitToolMeta("venue-fit-planner")!;

export function VenueFitPlannerTool({
  prefill,
}: {
  prefill?: {
    venueName: string;
    location: string;
    venueSummary: string;
    confirmedFeatures: string[];
    unknownFeatureCount: number;
  };
}) {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("venue-fit-planner");
  const [venueName, setVenueName] = useState(prefill?.venueName ?? "");
  const [location, setLocation] = useState(prefill?.location ?? "");
  const [venueSummary, setVenueSummary] = useState(prefill?.venueSummary ?? "");
  const [confirmedFeatures, setConfirmedFeatures] = useState((prefill?.confirmedFeatures ?? []).join(", "));
  const [unknownFeatureCount, setUnknownFeatureCount] = useState(String(prefill?.unknownFeatureCount ?? 0));
  const [userNeeds, setUserNeeds] = useState("");
  const [travelContext, setTravelContext] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      venueName,
      location,
      venueSummary,
      confirmedFeatures: confirmedFeatures.split(",").map((s) => s.trim()).filter(Boolean),
      unknownFeatureCount: Number.parseInt(unknownFeatureCount, 10) || 0,
      userNeeds,
      travelContext: travelContext || undefined,
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
            <ToolkitSectionCard title={`Fit summary (${out.confidenceLevel} confidence)`} copyText={out.fitSummary}>
              <p>{out.fitSummary}</p>
            </ToolkitSectionCard>
            <ToolkitListSection title="Questions to ask before visiting" items={out.askBeforeVisit} />
            <ToolkitListSection title="Red flags" items={out.redFlags} />
            <ToolkitListSection title="Backup plan" items={out.backupPlan} />
            <ToolkitSectionCard title="Short call script" copyText={out.shortCallScript}>
              <p className="whitespace-pre-wrap">{out.shortCallScript}</p>
            </ToolkitSectionCard>
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="Venue name" required>
          <ToolkitTextarea value={venueName} onChange={setVenueName} rows={2} required />
        </ToolkitField>
        <ToolkitField label="Location" required>
          <ToolkitTextarea value={location} onChange={setLocation} rows={2} required />
        </ToolkitField>
        <ToolkitField label="Venue summary">
          <ToolkitTextarea value={venueSummary} onChange={setVenueSummary} rows={3} />
        </ToolkitField>
        <ToolkitField label="Confirmed features (comma-separated)">
          <ToolkitTextarea value={confirmedFeatures} onChange={setConfirmedFeatures} rows={2} />
        </ToolkitField>
        <ToolkitField label="Unknown feature count">
          <ToolkitTextarea value={unknownFeatureCount} onChange={setUnknownFeatureCount} rows={2} />
        </ToolkitField>
        <ToolkitField label="Your access needs" required>
          <ToolkitTextarea value={userNeeds} onChange={setUserNeeds} rows={3} required />
        </ToolkitField>
        <ToolkitField label="Travel context (optional)">
          <ToolkitTextarea value={travelContext} onChange={setTravelContext} rows={2} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate venue fit plan"}
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
