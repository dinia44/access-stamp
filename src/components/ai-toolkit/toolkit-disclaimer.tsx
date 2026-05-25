import { TOOLKIT_DISCLAIMER } from "@/lib/ai-toolkit/tools-meta";

export function ToolkitDisclaimer({ className }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-muted ${className ?? ""}`} role="note">
      {TOOLKIT_DISCLAIMER}
    </p>
  );
}
