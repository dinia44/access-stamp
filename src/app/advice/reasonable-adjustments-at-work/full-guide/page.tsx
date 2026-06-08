import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideFullGuideToolbar, GuideFullGuideReadAloud } from "@/components/guide/guide-full-guide-client";
import { GuideFullGuideContent } from "@/components/guide/guide-full-guide-content";
import { SetChatContext } from "@/components/chat/set-context";
import {
  buildGuideToc,
  getGuideFullGuideMarkdown,
  getGuideFullGuideTitle,
  getGuideResourcePack,
  markdownToPlainText,
} from "@/lib/guide-resources";

const SLUG = "reasonable-adjustments-at-work";

export const metadata: Metadata = {
  title: "Reasonable adjustments at work — full guide",
  description:
    "The complete Access Stamp guide to reasonable adjustments at work: examples, template wording, common mistakes, and next steps.",
};

export default function ReasonableAdjustmentsFullGuidePage() {
  const resources = getGuideResourcePack(SLUG);
  const markdown = getGuideFullGuideMarkdown(SLUG);
  if (!resources || !markdown) return notFound();

  const toc = buildGuideToc(markdown);
  const plainText = markdownToPlainText(markdown);
  const title = getGuideFullGuideTitle(markdown);

  return (
    <div className="bg-[#FFF8F1] print:bg-white">
      <SetChatContext
        page={{
          kind: "advice-article",
          slug: SLUG,
          title,
          category: "workplace",
        }}
      />
      <GuideFullGuideContent
        markdown={markdown}
        toc={toc}
        downloads={resources.downloads}
        backHref={`/advice/${SLUG}`}
        toolbarSlot={<GuideFullGuideToolbar />}
        readAloudSlot={<GuideFullGuideReadAloud text={plainText} />}
      />
    </div>
  );
}
