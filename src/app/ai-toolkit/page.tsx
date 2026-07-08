import type { Metadata } from "next";
import { ToolkitHubHero } from "@/components/ai-toolkit/toolkit-hub-hero";
import { ToolkitTrustStrip } from "@/components/ai-toolkit/toolkit-trust-strip";
import { ToolCard } from "@/components/design-system/tool-card";
import { PageContainer } from "@/components/layout/PageContainer";
import { PUBLIC_AI_TOOLKIT_TOOLS } from "@/lib/ai-toolkit/tools-meta";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Access Stamp tools — practical plans, letters, and checklists",
  description:
    "Guided tools to create drafts, checklists, and next steps for work, venues, benefits, and access planning. Designed to support preparation, not replace professional advice.",
  path: "/ai-toolkit",
});

const TOOL_CREATES: Record<string, string> = {
  "access-needs-profiler": "A personalised action plan",
  "letter-builder": "A structured draft letter",
  "evidence-checklist": "A tailored evidence checklist",
  "article-companion": "A personalised guide plan",
  "venue-questions": "Practical venue questions",
  "venue-fit-planner": "A venue fit summary and call script",
  "tribunal-bundle-helper": "A chronology and hearing checklist",
};

const TOOL_BEST_FOR: Record<string, string> = {
  "access-needs-profiler": "Understanding your situation and next steps",
  "letter-builder": "Work, education, appointments, and services",
  "evidence-checklist": "Benefits, appeals, and formal requests",
  "article-companion": "Turning a guide into your own plan",
  "venue-questions": "Planning visits and confirming access",
  "venue-fit-planner": "Checking whether a venue may work for you",
  "tribunal-bundle-helper": "Benefits disputes and appeals",
};

const TOOL_TIME: Record<string, string> = {
  "access-needs-profiler": "10–15 minutes",
  "letter-builder": "5–10 minutes",
  "evidence-checklist": "5–10 minutes",
  "article-companion": "5–10 minutes",
  "venue-questions": "3–5 minutes",
  "venue-fit-planner": "5–10 minutes",
  "tribunal-bundle-helper": "15–20 minutes",
};

const TOOL_CTA: Record<string, string> = {
  "letter-builder": "Build a draft letter",
  "evidence-checklist": "Build a checklist",
  "venue-questions": "Generate questions",
  "venue-fit-planner": "Plan my visit",
  "access-needs-profiler": "Start profiler",
  "article-companion": "Open companion",
  "tribunal-bundle-helper": "Start bundle helper",
};

export default function AiToolkitPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF8] text-[#20242E]">
      <ToolkitHubHero />
      <ToolkitTrustStrip />

      <section className="px-4 py-12 sm:px-6 sm:py-16" aria-label="Access Stamp tools">
        <PageContainer>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PUBLIC_AI_TOOLKIT_TOOLS.map((tool, index) => (
              <ToolCard
                key={tool.id}
                title={tool.title}
                creates={TOOL_CREATES[tool.id] ?? "Structured output"}
                bestFor={TOOL_BEST_FOR[tool.id] ?? "Practical planning"}
                time={TOOL_TIME[tool.id] ?? "5–10 minutes"}
                cta={TOOL_CTA[tool.id] ?? "Open tool"}
                href={tool.href}
                badge={tool.badge}
                index={index}
              />
            ))}
          </div>
        </PageContainer>
      </section>
    </div>
  );
}
