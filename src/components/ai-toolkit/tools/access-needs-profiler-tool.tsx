"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import {
  ToolkitField,
  ToolkitSelect,
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
import type { ProfilerArea, ProfilerOutputType } from "@/lib/ai-toolkit/types";

const meta = getToolkitToolMeta("access-needs-profiler")!;

const AREAS: ProfilerArea[] = [
  "Benefits",
  "Work",
  "Travel",
  "Education",
  "Housing",
  "Care",
  "Venue Visit",
  "Other",
];

const OUTPUT_TYPES: ProfilerOutputType[] = ["letter", "checklist", "action plan", "questions to ask"];

export function AccessNeedsProfilerTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("access-needs-profiler");

  const [area, setArea] = useState<ProfilerArea>("Benefits");
  const [whatHappened, setWhatHappened] = useState("");
  const [supportNeeded, setSupportNeeded] = useState("");
  const [alreadyTried, setAlreadyTried] = useState("");
  const [outputType, setOutputType] = useState<ProfilerOutputType>("action plan");
  const [conditionOrNeeds, setConditionOrNeeds] = useState("");
  const [urgency, setUrgency] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({
      area,
      whatHappened,
      supportNeeded,
      alreadyTried,
      outputType,
      conditionOrNeeds: conditionOrNeeds || undefined,
      urgency: urgency || undefined,
    });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const out = result?.output;

  return (
    <ToolkitToolShell
      meta={meta}
      resultsRef={resultsRef}
      onPrint={() => window.print()}
      hasResult={Boolean(error || out)}
      results={
        error ? (
          <ToolkitError message={error} />
        ) : out ? (
          <>
            <ToolkitSourceNote source={result!.source} />
            <ToolkitSectionCard title="Situation summary" copyText={out.situationSummary}>
              <p>{out.situationSummary}</p>
            </ToolkitSectionCard>
            <ToolkitSectionCard title="Likely route" copyText={out.likelyRoute}>
              <p>{out.likelyRoute}</p>
            </ToolkitSectionCard>
            <ToolkitListSection title="Next 3 steps" items={out.nextSteps} />
            <ToolkitListSection title="Evidence to gather" items={out.evidenceToGather} />
            <ToolkitSectionCard title="Suggested wording" copyText={out.suggestedWording}>
              <p className="whitespace-pre-wrap">{out.suggestedWording}</p>
            </ToolkitSectionCard>
            {out.relatedGuides?.length ? (
              <ToolkitSectionCard title="Related Access Stamp guides">
                <ul className="space-y-2">
                  {out.relatedGuides.map((g) => (
                    <li key={g.href}>
                      <Link href={g.href} className="font-semibold text-blue underline-offset-2 hover:underline">
                        {g.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </ToolkitSectionCard>
            ) : null}
            <ToolkitSectionCard title="Important note">
              <p>{out.importantNote}</p>
            </ToolkitSectionCard>
          </>
        ) : (
          <ToolkitEmptyResults />
        )
      }
    >
      <form className="space-y-5" onSubmit={onSubmit}>
        <ToolkitField label="What area is this about?" htmlFor="area" required>
          <ToolkitSelect
            id="area"
            value={area}
            onChange={(v) => setArea(v as ProfilerArea)}
            options={AREAS.map((a) => ({ value: a, label: a }))}
          />
        </ToolkitField>
        <ToolkitField label="What has happened?" htmlFor="whatHappened" required>
          <ToolkitTextarea
            id="whatHappened"
            value={whatHappened}
            onChange={setWhatHappened}
            required
            placeholder="Brief facts: dates, who was involved, what was refused or delayed…"
            rows={4}
          />
        </ToolkitField>
        <ToolkitField label="What support do you need?" htmlFor="supportNeeded" required>
          <ToolkitTextarea
            id="supportNeeded"
            value={supportNeeded}
            onChange={setSupportNeeded}
            required
            placeholder="Outcome you want: award, adjustment, assessment, refund, access confirmation…"
          />
        </ToolkitField>
        <ToolkitField label="What have you already tried?" htmlFor="alreadyTried">
          <ToolkitTextarea id="alreadyTried" value={alreadyTried} onChange={setAlreadyTried} rows={3} />
        </ToolkitField>
        <ToolkitField label="What do you need most?" htmlFor="outputType" required>
          <ToolkitSelect
            id="outputType"
            value={outputType}
            onChange={(v) => setOutputType(v as ProfilerOutputType)}
            options={OUTPUT_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
          />
        </ToolkitField>
        <ToolkitField label="Condition or access needs (optional)" htmlFor="conditionOrNeeds">
          <ToolkitTextarea id="conditionOrNeeds" value={conditionOrNeeds} onChange={setConditionOrNeeds} rows={2} />
        </ToolkitField>
        <ToolkitField label="Urgency (optional)" htmlFor="urgency" hint="e.g. appointment next week, rent due, hospital discharge">
          <ToolkitTextarea id="urgency" value={urgency} onChange={setUrgency} rows={2} />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate action plan"}
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
