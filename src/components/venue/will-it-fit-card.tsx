"use client";

import { useMemo, useState } from "react";
import type { Venue } from "@/lib/mock-data";
import { assessChairAgainstVenue, DOOR_CLEARANCE_CM } from "@/lib/venue-fit";
import { Button, Card } from "@/components/ui";
import { useChat } from "@/components/chat/provider";

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.+)\*\*$/);
        if (m) {
          return (
            <strong key={i} className="text-heading">
              {m[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export function WillItFitCard({ venue }: { venue: Venue }) {
  const { openChat } = useChat();
  const [widthCm, setWidthCm] = useState("");

  const widthNum = parseFloat(widthCm.replace(",", "."));
  const assessment = useMemo(() => {
    if (!Number.isFinite(widthNum) || widthNum <= 0 || widthNum > 200) return null;
    return assessChairAgainstVenue({ overallWidthCm: widthNum }, venue);
  }, [widthNum, venue]);

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-xl font-bold tracking-[-0.02em] text-heading">Will it fit?</h2>
      <p className="mt-2 text-sm text-muted">
        Your chair&apos;s <strong className="text-heading">widest outer width</strong> (cm), compared to{" "}
        <strong className="text-heading">audited measurements</strong> on this listing where we have them — not a guarantee on the day
        (approach angle, temporary clutter, alternative entrances).
      </p>
      <p className="mt-2 text-xs text-muted">
        Built-in clearance margin: <strong className="text-heading">{DOOR_CLEARANCE_CM} cm</strong> for hinges and safe passage.
      </p>
      <label className="mt-4 block text-sm font-semibold text-heading" htmlFor={`chair-width-${venue.slug}`}>
        Overall chair width (cm)
      </label>
      <input
        id={`chair-width-${venue.slug}`}
        type="number"
        inputMode="decimal"
        min={40}
        max={130}
        step={1}
        value={widthCm}
        onChange={(e) => setWidthCm(e.target.value)}
        className="mt-2 w-full max-w-xs rounded-[var(--radius-ui)] border border-border bg-card px-3 py-2 text-sm text-heading outline-none ring-blue focus:ring-2"
        placeholder="e.g. 68"
      />

      {assessment ? (
        <div className="mt-4 space-y-3 text-sm leading-6 text-text">
          <p>
            <InlineBold text={assessment.summary} />
          </p>
          {assessment.detailLines.length ? (
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {assessment.detailLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : widthCm.trim() ? (
        <p className="mt-4 text-sm text-muted">Enter a width between 40 and 130 cm.</p>
      ) : null}

      <Button
        type="button"
        variant="secondary"
        className="mt-5 w-full max-w-md"
        onClick={() =>
          openChat({
            prefill:
              widthCm.trim() !== ""
                ? `I'm viewing ${venue.name}. My wheelchair outer width is about ${widthCm.trim()} cm — what should I double-check before I go?`
                : `I'm viewing ${venue.name}. Help me plan my visit for wheelchair access (doors, turning, toilets).`,
          })
        }
      >
        Ask Access Stamp AI about this venue
      </Button>
    </Card>
  );
}
