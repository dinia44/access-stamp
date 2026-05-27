import { Card } from "@/components/ui";

export function ToolkitTrustPanel() {
  return (
    <Card className="p-4">
      <div className="text-sm font-semibold text-heading">Why this suggestion?</div>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-muted">
        <li>Based on the information you entered in this form.</li>
        <li>Grounded in Access Stamp guidance structure and UK-focused practical flows.</li>
        <li>Not legal advice — always check official guidance for your case.</li>
      </ul>
    </Card>
  );
}
