import type { AdviceArticle, AdviceSection } from "@/lib/content/types";

function findH2Index(sections: AdviceSection[], titles: string[]) {
  return sections.findIndex((s) => s.type === "h2" && titles.some((title) => s.text.toLowerCase().includes(title.toLowerCase())));
}

function itemsAfterH2(sections: AdviceSection[], h2Titles: string[]): string[] {
  const start = findH2Index(sections, h2Titles);
  if (start === -1) return [];

  for (let i = start + 1; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type === "h2") break;
    if (section.type === "ul") return section.items;
    if (section.type === "callout" && section.body) {
      return section.body
        .split(/\n+/)
        .map((line) => line.replace(/^\d+\)\s*/, "").trim())
        .filter(Boolean);
    }
  }
  return [];
}

function firstParagraph(sections: AdviceSection[]): string | null {
  const paragraph = sections.find((s) => s.type === "p");
  return paragraph && "text" in paragraph ? paragraph.text : null;
}

export function getGuideSummary(article: AdviceArticle): string {
  return article.excerpt ?? firstParagraph(article.sections) ?? article.title;
}

export function getGuideUseIfItems(article: AdviceArticle): string[] {
  const explicit = itemsAfterH2(article.sections, [
    "who this is for",
    "use this guide if",
    "when to use this guide",
  ]);
  if (explicit.length) return explicit;

  const prepare = itemsAfterH2(article.sections, ["what to prepare", "what you need before"]);
  if (prepare.length) return prepare;

  if (article.excerpt) return [article.excerpt];
  return [];
}

export function getGuideKeySteps(article: AdviceArticle): string[] {
  return itemsAfterH2(article.sections, ["step-by-step", "key steps", "what to do next"]);
}

export function getGuideEvidenceItems(article: AdviceArticle): string[] {
  return itemsAfterH2(article.sections, ["evidence", "checklist", "what to gather", "documents"]);
}

export function getGuideMistakes(article: AdviceArticle): string[] {
  return itemsAfterH2(article.sections, ["common mistakes", "mistakes to avoid"]);
}

export function getGuideOfficialLinks(article: AdviceArticle) {
  const start = findH2Index(article.sections, ["useful official links", "official sources", "official links"]);
  if (start === -1) return [];

  for (let i = start + 1; i < article.sections.length; i += 1) {
    const section = article.sections[i];
    if (section.type === "h2") break;
    if (section.type === "links") return section.items;
  }
  return [];
}

export function getGuideTemplates(article: AdviceArticle) {
  return article.sections
    .filter((s): s is Extract<AdviceSection, { type: "pre" }> => s.type === "pre")
    .map((section, index) => ({
      title: `Template ${index + 1}`,
      body: section.text,
    }));
}

export type GuideToolLink = { label: string; href: string; description: string };

export function getRelatedToolsForGuide(article: AdviceArticle): GuideToolLink[] {
  const tools: GuideToolLink[] = [
    {
      label: "Letter Builder",
      href: "/ai-toolkit/letter-builder",
      description: "Draft a letter or email for this situation.",
    },
    {
      label: "Evidence Checklist",
      href: "/ai-toolkit/evidence-checklist",
      description: "Build a checklist of documents and notes.",
    },
  ];

  if (article.categorySlug === "workplace" || article.categorySlug === "rights") {
    tools.unshift({
      label: "Reasonable Adjustment Letter Builder",
      href: "/ai-toolkit/letter-builder",
      description: "Structured draft for work, education, or services.",
    });
  }

  if (article.categorySlug === "transport" || article.tags.some((t) => /venue|travel|visit/i.test(t))) {
    tools.push({
      label: "Venue Questions",
      href: "/ai-toolkit/venue-questions",
      description: "Generate questions to ask before visiting.",
    });
  }

  const seen = new Set<string>();
  return tools.filter((tool) => {
    if (seen.has(tool.href)) return false;
    seen.add(tool.href);
    return true;
  });
}
