"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui";
import { RIGHTS_COMMON_ISSUES } from "@/lib/rights-hub-common-issues";
import { cn } from "@/lib/utils";

const INITIAL_VISIBLE = 6;

/** Top accent reads wider than a heavy left stripe on dense text cards. */
function accentStyles(accent: (typeof RIGHTS_COMMON_ISSUES)[number]["accent"]) {
  switch (accent) {
    case "blue":
      return "border-t-[var(--blue)] bg-blue-pale/40";
    case "amber":
      return "border-t-[var(--amber)] bg-amber-pale/50";
    case "violet":
      return "border-t-[var(--color-secondary)] bg-[#EDF7ED]/80";
    default:
      return "border-t-border bg-background-2";
  }
}

function issueGuideHref(issue: (typeof RIGHTS_COMMON_ISSUES)[number]): string {
  if (issue.articleHref) return issue.articleHref;
  if (issue.guideSlug) return `/advice/${issue.guideSlug}`;
  return "/advice/rights";
}

export function RightsCommonIssuesGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = useMemo(
    () => (expanded ? RIGHTS_COMMON_ISSUES : RIGHTS_COMMON_ISSUES.slice(0, INITIAL_VISIBLE)),
    [expanded],
  );
  const hiddenCount = Math.max(0, RIGHTS_COMMON_ISSUES.length - INITIAL_VISIBLE);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {visible.map((issue) => (
          <Card
            key={issue.id}
            className={cn(
              "flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
              "border-t-4 pt-0",
              accentStyles(issue.accent),
            )}
          >
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] border border-border bg-card text-sm font-bold text-[var(--color-brand)] shadow-[var(--shadow-soft)]"
                aria-hidden
              >
                {issue.title.slice(0, 1)}
              </span>
              <div className="min-w-0 flex-1 space-y-2 sm:pt-0.5">
                <h3 className="font-[var(--font-heading)] text-base font-semibold text-heading sm:text-lg">{issue.title}</h3>
                <p className="max-w-none text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{issue.summary}</p>
                <div>
                  <Link href={issueGuideHref(issue)} className="inline-flex min-h-[44px] items-center text-sm font-semibold text-blue underline-offset-2 hover:underline">
                    Open guide →
                  </Link>
                </div>
                {issue.external?.length ? (
                  <details className="rounded-[var(--radius-card)] border border-border/80 bg-card px-3 py-2.5">
                    <summary className="cursor-pointer text-[11px] font-semibold uppercase tracking-wide text-muted">
                      Trusted sources
                    </summary>
                    <ul className="mt-2 space-y-1.5">
                      {issue.external.map((ex) => (
                        <li key={ex.href}>
                          <a
                            href={ex.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-heading underline-offset-2 hover:text-blue hover:underline"
                          >
                            {ex.label} (opens in a new tab)
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {hiddenCount > 0 ? (
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center rounded-full border border-border bg-card px-4 text-sm font-semibold text-heading hover:border-[var(--color-brand)]"
          aria-expanded={expanded}
          onClick={() => setExpanded((value) => !value)}
        >
          {expanded ? "Show fewer sticking points" : `Show ${hiddenCount} more sticking points`}
        </button>
      ) : null}
    </div>
  );
}
