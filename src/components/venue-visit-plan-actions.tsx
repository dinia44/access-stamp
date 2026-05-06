"use client";

import { useMemo } from "react";

type Props = {
  venueName: string;
  location: string;
  summary: string;
  tags: string[];
  beforeYouGo: string[];
};

export function VenueVisitPlanActions({ venueName, location, summary, tags, beforeYouGo }: Props) {
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
    <div className="mt-4 flex flex-wrap gap-2">
      <button
        type="button"
        className="rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2 text-xs font-semibold text-heading hover:bg-background-2"
        onClick={() => window.print()}
      >
        Print visit plan
      </button>
      <button
        type="button"
        className="rounded-[var(--radius-ui)] border border-border bg-background px-3 py-2 text-xs font-semibold text-heading hover:bg-background-2"
        onClick={savePlan}
      >
        Save visit plan
      </button>
    </div>
  );
}
