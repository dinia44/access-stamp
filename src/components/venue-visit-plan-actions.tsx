"use client";

import { useMemo } from "react";

type Props = {
  venueName: string;
  location: string;
  summary: string;
  tags: string[];
  beforeYouGo: string[];
};

export function VenueVisitPlanActions({
  venueName,
  location,
  summary,
  tags,
  beforeYouGo,
}: Props) {
  const textPlan = useMemo(
    () =>
      [
        `${venueName} - Visit Plan`,
        `Location: ${location}`,
        "",
        "Overview:",
        summary,
        "",
        "Access tags:",
        tags.join(", "),
        "",
        "Before you go:",
        ...beforeYouGo.map((item) => `- ${item}`),
      ].join("\n"),
    [beforeYouGo, location, summary, tags, venueName],
  );

  function savePlan() {
    const blob = new Blob([textPlan], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${venueName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-visit-plan.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="venue-report-plan-actions">
      <button
        type="button"
        className="text-heading"
        onClick={() => window.print()}
      >
        Print visit plan
      </button>
      <button type="button" className="text-heading" onClick={savePlan}>
        Save visit plan
      </button>
    </div>
  );
}
