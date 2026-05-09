import Link from "next/link";
import { Card } from "@/components/ui";
import { RIGHTS_COMMON_ISSUES } from "@/lib/rights-hub-common-issues";
import { cn } from "@/lib/utils";

/** Top accent reads wider than a heavy left stripe on dense text cards. */
function accentStyles(accent: (typeof RIGHTS_COMMON_ISSUES)[number]["accent"]) {
  switch (accent) {
    case "blue":
      return "border-t-[var(--blue)] bg-blue-pale/40";
    case "amber":
      return "border-t-[var(--amber)] bg-amber-pale/50";
    case "violet":
      return "border-t-[#6b5cae] bg-[#f3f0ff]/80";
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
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {RIGHTS_COMMON_ISSUES.map((issue) => (
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
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-card)] border border-border bg-card text-2xl shadow-[var(--shadow-soft)]"
              aria-hidden
            >
              {issue.icon}
            </span>
            <div className="min-w-0 flex-1 space-y-2 sm:pt-0.5">
              <h3 className="font-[var(--font-heading)] text-base font-semibold text-heading sm:text-lg">{issue.title}</h3>
              <p className="max-w-none text-sm leading-relaxed text-muted sm:text-[0.9375rem]">{issue.summary}</p>
              <div>
                <Link href={issueGuideHref(issue)} className="text-sm font-semibold text-blue underline-offset-2 hover:underline">
                  Open guide →
                </Link>
              </div>
              {issue.external?.length ? (
                <div className="rounded-[var(--radius-card)] border border-border/80 bg-card px-3 py-2.5">
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-muted">Trusted sources</div>
                  <ul className="mt-2 space-y-1.5">
                    {issue.external.map((ex) => (
                      <li key={ex.href}>
                        <a
                          href={ex.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-heading underline-offset-2 hover:text-blue hover:underline"
                        >
                          {ex.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
