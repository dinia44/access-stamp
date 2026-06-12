import { ScoreRing } from "@/components/venue/score-ring";
import { formatScoreLabel, getScoreBandStyle } from "@/lib/score-band";

type ScoreDisplayProps = {
  score: number;
  showRing?: boolean;
  size?: "sm" | "md";
  className?: string;
};

/** Visible score text with optional aria-hidden ring graphic. */
export function ScoreDisplay({ score, showRing = false, size = "sm", className = "" }: ScoreDisplayProps) {
  const label = formatScoreLabel(score);
  const band = getScoreBandStyle(score);

  if (showRing) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <ScoreRing score={score} size={size === "sm" ? "sm" : "md"} />
        <span className="text-sm font-semibold" style={{ color: band.text }}>
          {label}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${className}`}
      style={{ color: band.text, backgroundColor: band.background }}
    >
      {label}
    </span>
  );
}
