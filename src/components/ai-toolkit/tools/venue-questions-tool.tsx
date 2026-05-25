"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui";
import {
  ToolkitCheckboxGroup,
  ToolkitField,
  ToolkitTextarea,
} from "@/components/ai-toolkit/toolkit-field";
import { ToolkitListSection, ToolkitSectionCard } from "@/components/ai-toolkit/toolkit-section-card";
import {
  ToolkitEmptyResults,
  ToolkitError,
  ToolkitSourceNote,
  ToolkitToolShell,
} from "@/components/ai-toolkit/toolkit-tool-shell";
import { useToolkitSubmit } from "@/components/ai-toolkit/use-toolkit-submit";
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";
import type { VenueAccessNeed } from "@/lib/ai-toolkit/types";

const meta = getToolkitToolMeta("venue-questions")!;

const ACCESS_OPTIONS: { value: VenueAccessNeed; label: string }[] = [
  { value: "wheelchair access", label: "Wheelchair access" },
  { value: "powered wheelchair", label: "Powered wheelchair" },
  { value: "manual wheelchair", label: "Manual wheelchair" },
  { value: "walking aid", label: "Walking aid" },
  { value: "fatigue", label: "Fatigue / limited walking" },
  { value: "sensory needs", label: "Sensory needs" },
  { value: "assistance dog", label: "Assistance dog" },
  { value: "accessible toilet", label: "Accessible toilet" },
  { value: "parking", label: "Parking / Blue Badge" },
  { value: "step-free access", label: "Step-free access" },
  { value: "quiet space", label: "Quiet space" },
  { value: "seating", label: "Seating" },
  { value: "other", label: "Other" },
];

export function VenueQuestionsTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("venue-questions");

  const [venueType, setVenueType] = useState("");
  const [visitPurpose, setVisitPurpose] = useState("");
  const [accessNeeds, setAccessNeeds] = useState<VenueAccessNeed[]>([]);
  const [specificConcern, setSpecificConcern] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      venueType,
      visitPurpose,
      accessNeeds,
      specificConcern: specificConcern || undefined,
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
            <ToolkitListSection title="Questions to ask the venue" items={out.questionsToAsk} />
            <ToolkitSectionCard title="Short message or email" copyText={out.shortMessage}>
              <p className="whitespace-pre-wrap">{out.shortMessage}</p>
            </ToolkitSectionCard>
            <ToolkitListSection title="Red flags to watch for" items={out.redFlags} />
            <ToolkitListSection title="What photos to request" items={out.photosToRequest} />
            <ToolkitListSection title="Booking notes" items={out.bookingNotes} />
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="Venue type" htmlFor="venueType" required>
          <ToolkitTextarea
            id="venueType"
            value={venueType}
            onChange={setVenueType}
            required
            rows={2}
            placeholder="Restaurant, theatre, hotel, GP surgery, wedding venue…"
          />
        </ToolkitField>
        <ToolkitField label="Visit purpose" htmlFor="visitPurpose" required>
          <ToolkitTextarea id="visitPurpose" value={visitPurpose} onChange={setVisitPurpose} required rows={2} />
        </ToolkitField>
        <ToolkitField label="Access needs" hint="Select all that apply">
          <ToolkitCheckboxGroup
            options={ACCESS_OPTIONS}
            selected={accessNeeds}
            onChange={(v) => setAccessNeeds(v as VenueAccessNeed[])}
          />
        </ToolkitField>
        <ToolkitField label="Any specific concern?" htmlFor="specificConcern">
          <ToolkitTextarea id="specificConcern" value={specificConcern} onChange={setSpecificConcern} rows={2} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate questions"}
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
