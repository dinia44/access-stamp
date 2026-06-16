import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const DEFAULT_BULLETS = [
  "Tools create drafts, checklists, and next steps.",
  "They do not provide legal, medical, emergency, safeguarding, or crisis advice.",
  "Always check important decisions with official sources or qualified professionals.",
  "Avoid entering unnecessary sensitive information.",
] as const;

export function TrustPanel({
  title = "Built to support preparation, not replace advice.",
  bullets = DEFAULT_BULLETS,
  className,
}: {
  title?: string;
  bullets?: readonly string[];
  className?: string;
}) {
  return (
    <Card className={cn("border-blue/20 bg-gradient-to-br from-blue-pale/50 to-card p-5 md:p-6", className)}>
      <h2 className="text-base font-semibold text-heading">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
        {bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Card>
  );
}
