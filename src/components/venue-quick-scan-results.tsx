import type { QuickScanResult } from "@/lib/venue-quick-scan";

type Props = {
  result: QuickScanResult;
};

function ListSection({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: "good" | "warn" | "action";
}) {
  if (!items.length) return null;

  const styles = {
    good: "border-[#D7E8D8] bg-[#F3FAF3] text-[#1B5E20]",
    warn: "border-[#F6DCC8] bg-[#FFF6EF] text-[#8A3B12]",
    action: "border-[#E8DFF5] bg-[#F8F5FC] text-[#4A3D6B]",
  } as const;

  return (
    <div className={`rounded-xl border p-4 ${styles[tone]}`}>
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="mt-2 space-y-1.5 text-sm leading-6">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function VenueQuickScanResults({ result }: Props) {
  const hasStructured =
    result.alreadyAccessible.length > 0 ||
    result.needsImprovement.length > 0 ||
    result.smallSteps.length > 0;

  if (!hasStructured && !result.measurements?.length && !result.notes) return null;

  return (
    <div className="space-y-3" role="region" aria-label="Quick Scan results">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Quick Scan results</p>

      <ListSection title="Already looks accessible" items={result.alreadyAccessible} tone="good" />
      <ListSection title="May need improvement" items={result.needsImprovement} tone="warn" />
      <ListSection title="Small steps you could take" items={result.smallSteps} tone="action" />

      {result.measurements?.length ? (
        <div className="rounded-xl border border-[#EFE5DA] bg-white p-4">
          <h4 className="text-sm font-semibold text-heading">Visible measurements (estimates only)</h4>
          <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted">
            {result.measurements.map((item) => (
              <li key={`${item.label}-${item.value}`}>
                <span className="font-medium text-heading">{item.label}:</span> {item.value}
                {item.confidence === "unclear" ? " — unclear from photo" : " — approximate from photo"}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {result.notes ? (
        <p className="text-sm leading-6 text-muted">
          <span className="font-semibold text-heading">Note:</span> {result.notes}
        </p>
      ) : null}

      <p className="text-xs leading-5 text-muted">
        This is an AI-assisted beta scan, not a verified Access Stamp audit. We review submissions before publishing.
      </p>
    </div>
  );
}
