import { TRUST_STRIP_ITEMS } from "@/lib/ai-toolkit/practical-tools-content";

export function PracticalToolsTrustStrip() {
  return (
    <div
      className="flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4"
      role="list"
      aria-label="How these tools work"
    >
      {TRUST_STRIP_ITEMS.map((item) => (
        <span key={item} role="listitem" className="text-sm font-medium text-muted">
          {item}
        </span>
      ))}
    </div>
  );
}
