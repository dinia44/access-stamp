import type { AdviceArticle } from "@/lib/content/types";

function itemsAfterH2(article: AdviceArticle, h2Title: string): string[] {
  const { sections } = article;
  const start = sections.findIndex((s) => s.type === "h2" && s.text === h2Title);
  if (start === -1) return [];

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "ul") return section.items;
    if (section.type === "callout" && h2Title === "Step-by-step process") {
      return section.body
        .split(/\n+/)
        .map((line) => line.replace(/^\d+\)\s*/, "").trim())
        .filter(Boolean);
    }
  }
  return [];
}

export function getGuideCardPreviewBullets(article: AdviceArticle): string[] {
  if (article.cardPreviewBullets?.length) return article.cardPreviewBullets.slice(0, 3);

  const available = itemsAfterH2(article, "What you can ask for or what may be available");
  if (available.length >= 2) return available.slice(0, 3);

  const steps = itemsAfterH2(article, "Step-by-step process");
  if (steps.length >= 2) return steps.slice(0, 3);

  if (article.excerpt) return [article.excerpt];
  return ["Practical steps you can take today", "Evidence prompts and copyable wording", "Official links where available"];
}

export function getGuideIncludesLabel(article: AdviceArticle): string {
  if (article.includesLabel) return article.includesLabel;

  const hasTemplate = article.sections.some((s) => s.type === "pre");
  const hasSteps = itemsAfterH2(article, "Step-by-step process").length > 0;
  const hasOfficial = article.sections.some(
    (s) => s.type === "h2" && s.text === "Useful official links",
  );

  const parts: string[] = [];
  if (hasSteps) parts.push("checklist");
  if (hasTemplate) parts.push("template");
  if (hasOfficial) parts.push("official links");
  return parts.length ? parts.join(", ") : "practical guide";
}

export function formatGuideCardMeta(article: AdviceArticle): string {
  const reviewed = article.lastReviewed ?? article.updated;
  const readTime = article.readTimeMinutes
    ? `${article.readTimeMinutes} min practical guide`
    : "Practical guide";
  return `Reviewed ${reviewed} · ${readTime}`;
}
