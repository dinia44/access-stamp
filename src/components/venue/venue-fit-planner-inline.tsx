"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { ToolkitField, ToolkitTextarea } from "@/components/ai-toolkit/toolkit-field";
import { ToolkitListSection, ToolkitSectionCard } from "@/components/ai-toolkit/toolkit-section-card";
import { ToolkitError, ToolkitSourceNote } from "@/components/ai-toolkit/toolkit-tool-shell";
import { useToolkitSubmit } from "@/components/ai-toolkit/use-toolkit-submit";

export function VenueFitPlannerInline({
  venueName,
  location,
  venueSummary,
  confirmedFeatures,
  unknownFeatureCount,
}: {
  venueName: string;
  location: string;
  venueSummary: string;
  confirmedFeatures: string[];
  unknownFeatureCount: number;
}) {
  const { submit, loading, error, result, reset } = useToolkitSubmit("venue-fit-planner");
  const [userNeeds, setUserNeeds] = useState("");
  const [travelContext, setTravelContext] = useState("");
  const out = result?.output;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      venueName,
      location,
      venueSummary,
      confirmedFeatures,
      unknownFeatureCount,
      userNeeds,
      travelContext: travelContext || undefined,
    });
  }

  return (
    <Card className="space-y-4 p-5">
      <div>
        <h2 className="text-xl font-bold tracking-[-0.02em] text-heading">AI venue fit planner</h2>
        <p className="mt-1 text-sm text-muted">
          Tell us your needs and get a practical venue-fit summary, red flags, and a call script for this listing.
        </p>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <ToolkitField label="Your access needs" required>
          <ToolkitTextarea
            value={userNeeds}
            onChange={setUserNeeds}
            rows={3}
            required
            placeholder="E.g. powered chair 72cm, accessible toilet, step-free route, quieter seating."
          />
        </ToolkitField>
        <ToolkitField label="Travel context (optional)">
          <ToolkitTextarea
            value={travelContext}
            onChange={setTravelContext}
            rows={2}
            placeholder="E.g. travelling alone by taxi, evening visit, winter weather."
          />
        </ToolkitField>
        <div className="flex flex-wrap gap-3">
          <Button type="submit" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate fit plan"}
          </Button>
          {result ? (
            <Button type="button" variant="ghost" onClick={reset}>
              Clear
            </Button>
          ) : null}
        </div>
      </form>

      {error ? <ToolkitError message={error} /> : null}
      {out ? (
        <div className="space-y-4">
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
        </div>
      ) : null}
    </Card>
  );
}
