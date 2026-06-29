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
import { guidesForLetterType } from "@/lib/ai-toolkit/related-guides";
import type { ToolkitGuideLink } from "@/lib/ai-toolkit/types";
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";
import type { LetterTone, LetterType } from "@/lib/ai-toolkit/types";

const meta = getToolkitToolMeta("letter-builder")!;

const LETTER_TYPES: LetterType[] = [
  "PIP renewal",
  "PIP mandatory reconsideration",
  "Access to Work",
  "Reasonable adjustments at work",
  "School reasonable adjustments",
  "EHCP assessment request",
  "Passenger Assist complaint",
  "Care needs assessment request",
  "Blue Badge support",
  "Disabled Facilities Grant enquiry",
  "Other",
];

const TONES: LetterTone[] = ["calm", "firm", "formal", "short"];
const LETTER_PRESETS: Partial<Record<LetterType, { askingFor: string; evidenceExamples: string }>> = {
  "PIP renewal": {
    askingFor: "A fair review of my current PIP award based on my current daily living and mobility needs.",
    evidenceExamples: "Recent care needs, support required, and examples of risks or limitations on typical days.",
  },
  "PIP mandatory reconsideration": {
    askingFor: "Mandatory reconsideration of the decision, with reasons linked to my functional limitations.",
    evidenceExamples: "Decision letter points I disagree with and supporting daily-impact examples.",
  },
  "Access to Work": {
    askingFor: "Workplace support through Access to Work, including equipment or travel support where eligible.",
    evidenceExamples: "Role duties, barriers at work, and adjustments needed to do my job safely.",
  },
  "Reasonable adjustments at work": {
    askingFor: "Reasonable adjustments under the Equality Act to remove barriers in my role.",
    evidenceExamples: "Specific tasks affected and adjustments that would reduce disadvantage.",
  },
};

export function LetterBuilderTool() {
  const resultsRef = useRef<HTMLDivElement>(null);
  const { submit, loading, error, result, reset } = useToolkitSubmit("letter-builder");

  const [letterType, setLetterType] = useState<LetterType>("Reasonable adjustments at work");
  const [recipient, setRecipient] = useState("");
  const [whatHappened, setWhatHappened] = useState("");
  const [askingFor, setAskingFor] = useState("");
  const [evidenceExamples, setEvidenceExamples] = useState("");
  const [tone, setTone] = useState<LetterTone>("calm");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submit({ letterType, recipient, whatHappened, askingFor, evidenceExamples, tone });
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function applyPreset() {
    const preset = LETTER_PRESETS[letterType];
    if (!preset) return;
    if (!askingFor.trim()) setAskingFor(preset.askingFor);
    if (!evidenceExamples.trim()) setEvidenceExamples(preset.evidenceExamples);
  }

  const out = result?.output;
  const related: ToolkitGuideLink[] = guidesForLetterType(letterType);

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
            <ToolkitSectionCard title="Subject line" copyText={out.subjectLine}>
              <p className="font-semibold text-heading">{out.subjectLine}</p>
            </ToolkitSectionCard>
            <ToolkitSectionCard title="Draft letter / email" copyText={out.draftLetter}>
              <pre className="whitespace-pre-wrap font-[var(--font-body)] text-sm text-text">{out.draftLetter}</pre>
            </ToolkitSectionCard>
            <ToolkitListSection title="Evidence to attach" items={out.evidenceToAttach} />
            <ToolkitSectionCard title="Follow-up reminder" copyText={out.followUpReminder}>
              <p>{out.followUpReminder}</p>
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
        <ToolkitField label="Letter type" htmlFor="letterType" required>
          <ToolkitSelect
            id="letterType"
            value={letterType}
            onChange={(v) => setLetterType(v as LetterType)}
            options={LETTER_TYPES.map((t) => ({ value: t, label: t }))}
          />
        </ToolkitField>
        {LETTER_PRESETS[letterType] ? (
          <div className="rounded-[var(--radius-ui)] border border-border bg-background p-3 text-xs text-muted">
            <div className="mb-2 font-semibold text-heading">Template helper for this letter type</div>
            <Button type="button" variant="ghost" onClick={applyPreset}>
              Insert suggested request + evidence wording
            </Button>
          </div>
        ) : null}
        <ToolkitField label="Who is it going to?" htmlFor="recipient" required>
          <ToolkitTextarea
            id="recipient"
            value={recipient}
            onChange={setRecipient}
            required
            rows={2}
            placeholder="Employer HR, school SENCO, DWP, council adult social care, train operator…"
          />
        </ToolkitField>
        <ToolkitField label="What happened?" htmlFor="whatHappened" required>
          <ToolkitTextarea id="whatHappened" value={whatHappened} onChange={setWhatHappened} required rows={4} />
        </ToolkitField>
        <ToolkitField label="What are you asking for?" htmlFor="askingFor" required>
          <ToolkitTextarea id="askingFor" value={askingFor} onChange={setAskingFor} required rows={3} />
        </ToolkitField>
        <ToolkitField label="Key evidence or examples" htmlFor="evidenceExamples">
          <ToolkitTextarea id="evidenceExamples" value={evidenceExamples} onChange={setEvidenceExamples} rows={3} />
        </ToolkitField>
        <ToolkitField label="Desired tone" htmlFor="tone" required>
          <ToolkitSelect
            id="tone"
            value={tone}
            onChange={(v) => setTone(v as LetterTone)}
            options={TONES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
          />
        </ToolkitField>
        <div className="flex flex-wrap gap-3 pt-2">
          <Button type="submit" variant="primary" className={loading ? "opacity-70" : ""}>
            {loading ? "Generating…" : "Generate letter"}
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
