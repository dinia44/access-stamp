"use client";

import Image from "next/image";
import type { GuideTemplate, PracticalGuideWorkflow } from "@/lib/practical-guide";
import { GuideDownloadCard } from "@/components/guide/guide-download-card";
import { GuideSummaryCard } from "@/components/guide/guide-summary-card";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import type { AdviceArticle } from "@/lib/content/types";

type GuideSupportColumnProps = {
  workflow: PracticalGuideWorkflow;
  article: AdviceArticle;
  onAskAi: () => void;
};

export function GuideSupportColumn({ workflow, article, onAskAi }: GuideSupportColumnProps) {
  const hero = getAdviceArticleCardImage(article);
  const templatesImage = getAdviceArticleCardImage({
    ...article,
    slug: `${article.slug}-templates`,
  });

  return (
    <div className="space-y-4">
      <GuideSummaryCard title="Guide summary" items={workflow.summary} image={hero} />

      <section className="overflow-hidden rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)]">
        <h2 className="text-sm font-bold text-heading">Helpful templates</h2>
        <div className="mt-3 space-y-2">
          {workflow.templates.map((t: GuideTemplate) => (
            <GuideDownloadCard key={t.title} title={t.title} format={t.format} href={t.href} />
          ))}
        </div>
        <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-xl">
          <Image
            src={templatesImage.src}
            alt="Desk with paperwork and planning materials"
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={templatesImage.src.endsWith(".svg")}
          />
        </div>
      </section>

      <GuideSummaryCard
        title="At a glance"
        items={workflow.atAGlance}
        variant="glance"
        linkLabel="Learn more about your rights"
        linkHref={workflow.learnMoreHref}
      />

      <GuideSummaryCard
        title="Need personalised help?"
        items={[]}
        variant="help"
        description="Ask the AI assistant for tailored advice based on your situation."
        actionLabel="Ask the AI"
        onAction={onAskAi}
      />
    </div>
  );
}
