import type { ScoreBandLabel } from "@/data/venues";
import { getScoreBand } from "@/data/venues";

export type ScoreBandStyle = {
  label: ScoreBandLabel;
  text: string;
  background: string;
};

const BAND_STYLES: Record<ScoreBandLabel, Omit<ScoreBandStyle, "label">> = {
  "Excellent access": { text: "#5F7444", background: "#EFF3E7" },
  "Good access": { text: "#C07F1F", background: "#FBF0DC" },
  "Limited access": { text: "#B0512E", background: "#F8E8E0" },
};

export function getScoreBandStyle(score: number): ScoreBandStyle {
  const label = getScoreBand(score);
  return { label, ...BAND_STYLES[label] };
}

export function formatScoreLabel(score: number | null): string {
  if (score === null) return "Score not published";
  const { label } = getScoreBandStyle(score);
  return `${score}/100 · ${label}`;
}

export function getScoreBandStyleOrNull(score: number | null): ScoreBandStyle | null {
  if (score === null) return null;
  return getScoreBandStyle(score);
}
