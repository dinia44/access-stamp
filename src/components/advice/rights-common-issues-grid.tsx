import Link from "next/link";
import { Card } from "@/components/ui";
import { RIGHTS_COMMON_ISSUES } from "@/lib/rights-hub-common-issues";
import { cn } from "@/lib/utils";

function accentStyles(accent: (typeof RIGHTS_COMMON_ISSUES)[number]["accent"]) {
  switch (accent) {
    case "blue":
      return "border-l-[var(--blue)] bg-blue-pale/50";
    case "amber":
      return "border-l-[var(--amber)] bg-amber-pale/70";
    case "violet":
      return "border-l-[#6b5cae] bg-[#f3f0ff]";
    default:
      return "border-l-border bg-background-2";
  }
}

function issueGuideHref(issue: (typeof RIGHTS_COMMON_ISSUES)[number]): string {
  if (issue.articleHref) return issue.articleHref;
  if (issue.guideSlug) return `/advice/${issue.guideSlug}`;
  return "/advice/rights";
}

export function RightsCommonIssuesGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {RIGHTS_COMMON_ISSUES.map((issue) => (
        <Card
          key={issue.id}
          className={cn(
            "flex h-full flex-col border border-border p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
            "border-l-4",
            accentStyles(issue.accent),
          )}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl leading-none" aria-hidden>
              {issue.icon}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <h3 className="font-[var(--font-heading)] text-base font-semibold text-heading">{issue.title}</h3>
              <p className="text-sm text-muted">{issue.summary}</p>
              <div>
                <Link href={issueGuideHref(issue)} className="text-sm font-semibold text-blue underline-offset-2 hover:underline">
                  Open guide →
                </Link>
              </div>
              {issue.external?.length ? (
                <div className="border-t border-border/80 pt-3">
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
