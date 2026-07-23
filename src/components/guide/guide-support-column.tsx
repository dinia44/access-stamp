"use client";

import Image from "next/image";
import type { GuideResourcePack } from "@/lib/guide-resources";
import type { PracticalGuideWorkflow } from "@/lib/guide-content/types";
import { GuideDownloadCard } from "@/components/guide/guide-download-card";
import { GuideOfficialLinks } from "@/components/guide/guide-official-links";
import { GuideSummaryCard } from "@/components/guide/guide-summary-card";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import type { AdviceArticle } from "@/lib/content/types";

type GuideSupportColumnProps = {
  workflow: PracticalGuideWorkflow;
  article: AdviceArticle;
  resources?: GuideResourcePack | null;
  onAskAi: () => void;
};

export function GuideSupportColumn({ workflow, article, resources, onAskAi }: GuideSupportColumnProps) {
  const templatesImage = getAdviceArticleCardImage({
    ...article,
    slug: `${article.slug}-templates`,
  });

  const downloads = (resources?.downloads ??
    workflow.templates.map((t) => ({
      id: t.title,
      title: t.title,
      description: t.description ?? "",
      file: t.href ?? "",
      filename: t.title,
      format: t.format,
    }))).filter((d) => Boolean(d.file) && d.file !== "#");

  const unavailableTemplates = workflow.templates.filter((t) => !t.href || t.href === "#");
  const officialLinks = resources?.officialLinks ?? workflow.officialLinks ?? [];

  return (
    <div className="space-y-4">
      {workflow.atAGlance?.length ? (
        <GuideSummaryCard title="At a glance" items={workflow.atAGlance} variant="glance" />
      ) : null}

      {downloads.length || unavailableTemplates.length ? (
        <section id="guide-templates" className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-bold text-heading">Helpful templates</h2>
          {downloads.length ? (
            <div className="mt-3 space-y-2">
              {downloads.map((d) => (
                <GuideDownloadCard
                  key={d.id}
                  title={d.title}
                  description={d.description || undefined}
                  format={d.format}
                  href={d.file}
                  buttonLabel={`Download ${d.format}`}
                />
              ))}
            </div>
          ) : null}
          {unavailableTemplates.length ? (
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {unavailableTemplates.map((t) => (
                <li key={t.title} className="rounded-xl border border-dashed border-[var(--color-border)] px-3 py-2">
                  <span className="font-semibold text-heading">{t.title}</span>
                  <span className="mt-1 block text-xs">Download not available yet — use the copyable wording in this guide.</span>
                </li>
              ))}
            </ul>
          ) : null}
          {downloads.length ? (
            <div className="relative mt-4 aspect-[16/7] overflow-hidden rounded-xl bg-[var(--color-surface-subtle)]">
              <Image
                src={templatesImage.src}
                alt=""
                fill
                className="object-cover"
                sizes="320px"
                unoptimized={templatesImage.src.endsWith(".svg")}
              />
            </div>
          ) : null}
        </section>
      ) : (
        <section id="guide-templates" className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
          <h2 className="text-sm font-bold text-heading">Helpful templates</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Use the step checklists in this guide, or ask the AI to draft wording for your situation.
          </p>
          <button
            type="button"
            onClick={onAskAi}
            className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[var(--color-trust)] px-4 text-sm font-semibold text-white transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-focus-ring)] focus-visible:outline-offset-2"
          >
            Ask the AI for template wording →
          </button>
        </section>
      )}

      {officialLinks.length ? <GuideOfficialLinks links={officialLinks} /> : null}
    </div>
  );
}
