"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type JumpSection = {
  id: string;
  label: string;
};

type GuideJumpNavProps = {
  sections: JumpSection[];
  className?: string;
};

export function GuideJumpNav({ sections, className }: GuideJumpNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const jumpTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  }, []);

  if (!sections.length) return null;

  return (
    <>
      <div className={cn("xl:hidden", className)}>
        <label htmlFor="guide-jump-select" className="sr-only">
          Jump to section
        </label>
        <select
          id="guide-jump-select"
          value={activeId}
          onChange={(e) => jumpTo(e.target.value)}
          className="h-12 w-full rounded-2xl border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-heading focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
      </div>

      <nav
        aria-label="Guide sections"
        className={cn("hidden xl:block xl:sticky xl:top-28", className)}
      >
        <div className="rounded-2xl border border-[#F1D8C7] bg-white p-4 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-bold uppercase tracking-wide text-muted">On this page</p>
          <ul className="mt-3 space-y-1">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => jumpTo(section.id)}
                  aria-current={activeId === section.id ? "true" : undefined}
                  className={cn(
                    "flex w-full min-h-[44px] items-center rounded-xl px-3 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-2",
                    activeId === section.id
                      ? "bg-[#EDF7ED] text-[#59682A]"
                      : "text-muted hover:bg-[#FFF8F1] hover:text-heading",
                  )}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export function buildGuideJumpSections(workflow: {
  firstThreeActions?: string[];
  quickAnswer?: string;
  evidenceChecklist?: string[];
  copyableTemplates?: unknown[];
  escalation?: string[];
  officialLinks?: unknown[];
}): JumpSection[] {
  const sections: JumpSection[] = [];
  if (workflow.firstThreeActions?.length) sections.push({ id: "guide-start-here", label: "Start here" });
  if (workflow.quickAnswer) sections.push({ id: "guide-quick-answer", label: "Quick answer" });
  sections.push({ id: "guide-steps", label: "Steps" });
  if (workflow.evidenceChecklist?.length) sections.push({ id: "guide-evidence", label: "Evidence" });
  if (workflow.copyableTemplates?.length) sections.push({ id: "guide-copy-templates", label: "Templates" });
  if (workflow.escalation?.length) sections.push({ id: "guide-escalation", label: "Escalation" });
  if (workflow.officialLinks?.length) sections.push({ id: "guide-official-links", label: "Official sources" });
  sections.push({ id: "guide-ai-panel", label: "AI prompts" });
  return sections;
}
