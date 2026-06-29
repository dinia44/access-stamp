import type { Metadata } from "next";
import { ToolCard } from "@/components/design-system/tool-card";
import { PracticalToolsChooser } from "@/components/ai-toolkit/practical-tools-chooser";
import { PracticalToolsFeatured } from "@/components/ai-toolkit/practical-tools-featured";
import { PracticalToolsSafetyNote } from "@/components/ai-toolkit/practical-tools-safety-note";
import { PracticalToolsTrustStrip } from "@/components/ai-toolkit/practical-tools-trust-strip";
import { FadeIn } from "@/components/fade-in";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { Badge } from "@/components/ui";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";
import {
  PRACTICAL_TOOLS_LABEL,
  TOOL_CARD_CONTENT,
  TOOL_GROUPS,
} from "@/lib/ai-toolkit/practical-tools-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Practical Tools — letters, checklists, and access plans",
  description:
    "Guided tools that help you prepare letters, checklists, questions, and access plans — without starting from a blank page.",
  path: "/ai-toolkit",
});

export default function AiToolkitPage() {
  return (
    <PageLayout stack="relaxed" hero>
      <PageHero
        badge={<Badge tone="blue">AI-assisted</Badge>}
        title={PRACTICAL_TOOLS_LABEL}
        subtitle="Guided tools that help you prepare letters, checklists, questions, and access plans — without starting from a blank page."
      />

      <FadeIn delayMs={40}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/ai-toolkit/access-needs-profiler">Start with Access Needs Profiler</ButtonLink>
          <ButtonLink href="#all-tools" variant="secondary">
            Browse all tools
          </ButtonLink>
        </div>
      </FadeIn>

      <PracticalToolsTrustStrip />
      <PracticalToolsChooser />

      <section id="all-tools" aria-labelledby="all-tools-title" className="scroll-mt-8 space-y-16">
        <h2 id="all-tools-title" className="sr-only">
          All practical tools
        </h2>
        {TOOL_GROUPS.map((group, groupIndex) => (
          <div key={group.id}>
            <PageSectionTitle title={group.title} description={group.intro} />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {group.toolIds.map((toolId, toolIndex) => {
                const meta = getToolkitToolMeta(toolId);
                const card = TOOL_CARD_CONTENT[toolId];
                if (!meta || !card) return null;
                return (
                  <FadeIn key={toolId} delayMs={groupIndex * 60 + toolIndex * 40}>
                    <ToolCard
                      title={meta.title}
                      description={card.description}
                      bestFor={card.bestFor}
                      time={card.time}
                      youGet={card.youGet}
                      cta={card.cta}
                      href={meta.href}
                      badge={meta.badge}
                    />
                  </FadeIn>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <PracticalToolsFeatured />
      <PracticalToolsSafetyNote />
    </PageLayout>
  );
}
