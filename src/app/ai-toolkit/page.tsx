import type { Metadata } from "next";
import Link from "next/link";
import { ToolCard } from "@/components/design-system/tool-card";
import { TrustPanel } from "@/components/design-system/trust-panel";
import { PageHero, PageLayout } from "@/components/page-layout";
import { Badge } from "@/components/ui";
import { ToolkitDisclaimer } from "@/components/ai-toolkit/toolkit-disclaimer";
import { AI_TOOLKIT_TOOLS, PUBLIC_AI_TOOLKIT_TOOLS } from "@/lib/ai-toolkit/tools-meta";
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
    <PageLayout stack="relaxed" hero>
      <PageHero
        badge={<Badge tone="blue">Access Stamp tools</Badge>}
        title="Access Stamp tools"
        subtitle="Turn your disability problem into a practical action plan, letter, checklist, or support request. Each tool starts with a short guided form — not a blank chat box."
      />

      <TrustPanel />

      <p className="max-w-[85ch] text-sm leading-relaxed text-muted">
        Access Stamp tools use guided questions to help you create practical drafts, checklists, and next steps. They
        are designed to support preparation, not replace professional legal, medical, emergency, or official advice. Use
        them alongside our{" "}
        <Link href="/advice" className="font-semibold text-blue underline-offset-2 hover:underline">
          practical guides
        </Link>{" "}
        when you need fuller context.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {PUBLIC_AI_TOOLKIT_TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            creates={TOOL_CREATES[tool.id] ?? "Structured output"}
            bestFor={TOOL_BEST_FOR[tool.id] ?? "Practical planning"}
            time={TOOL_TIME[tool.id] ?? "5–10 minutes"}
            cta={TOOL_CTA[tool.id] ?? "Open tool"}
            href={tool.href}
            badge={tool.badge}
          />
        ))}
      </div>

      <ToolkitDisclaimer className="max-w-[85ch]" />
    </PageLayout>
  );
}
