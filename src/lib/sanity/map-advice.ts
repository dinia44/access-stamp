import type { AdviceArticle, AdviceCategorySlug, AdviceSection } from "@/lib/content/types";

type SanityAdviceSection = {
  type?: string;
  text?: string;
  items?: string[];
  linkItems?: Array<{ label?: string; href?: string }>;
  tone?: string;
  title?: string;
  body?: string;
};

type SanityAdviceDoc = {
  slug?: string;
  title?: string;
  categorySlug?: string;
  updated?: string;
  tags?: string[];
  excerpt?: string;
  readTimeMinutes?: number;
  seoTitle?: string;
  metaDescription?: string;
  heroImage?: { src?: string; alt?: string };
  sections?: SanityAdviceSection[];
};

const CATEGORY_SLUGS = new Set<AdviceCategorySlug>([
  "rights",
  "education",
  "transport",
  "workplace",
  "care",
  "equipment",
  "emergency",
  "new-to-disability",
  "travel",
  "cars",
  "sport",
]);

function mapSection(raw: SanityAdviceSection): AdviceSection | null {
  const type = raw.type;
  if (type === "h2" && raw.text) return { type: "h2", text: raw.text };
  if (type === "p" && raw.text) return { type: "p", text: raw.text };
  if (type === "ul" && raw.items?.length) return { type: "ul", items: raw.items.filter(Boolean) };
  if (type === "pre" && raw.text) return { type: "pre", text: raw.text };
  if (type === "links" && raw.linkItems?.length) {
    const items = raw.linkItems
      .filter((l) => l.label && l.href)
      .map((l) => ({ label: l.label!, href: l.href! }));
    if (items.length) return { type: "links", items };
  }
  if (type === "callout" && raw.title && raw.body && raw.tone) {
    const tone = raw.tone as "warning" | "tip" | "contact" | "steps";
    if (["warning", "tip", "contact", "steps"].includes(tone)) {
      return { type: "callout", tone, title: raw.title, body: raw.body };
    }
  }
  return null;
}

function formatUpdated(updated?: string) {
  if (!updated) return new Date().toISOString().slice(0, 10);
  return updated.length >= 10 ? updated.slice(0, 10) : updated;
}

export function mapSanityAdviceDoc(doc: SanityAdviceDoc): AdviceArticle | null {
  const slug = doc.slug?.trim();
  const title = doc.title?.trim();
  const categorySlug = doc.categorySlug as AdviceCategorySlug | undefined;
  if (!slug || !title || !categorySlug || !CATEGORY_SLUGS.has(categorySlug)) return null;

  const sections = (doc.sections ?? []).map(mapSection).filter((s): s is AdviceSection => Boolean(s));
  if (!sections.length) return null;

  const article: AdviceArticle = {
    slug,
    title,
    categorySlug,
    updated: formatUpdated(doc.updated),
    tags: doc.tags?.filter(Boolean) ?? [],
    sections,
  };

  if (doc.excerpt) article.excerpt = doc.excerpt;
  if (doc.readTimeMinutes) article.readTimeMinutes = doc.readTimeMinutes;
  if (doc.seoTitle) article.seoTitle = doc.seoTitle;
  if (doc.metaDescription) article.metaDescription = doc.metaDescription;
  if (doc.heroImage?.src && doc.heroImage?.alt) {
    article.heroImage = { src: doc.heroImage.src, alt: doc.heroImage.alt };
  }
  if ((doc as { lastReviewed?: string }).lastReviewed) {
    article.lastReviewed = (doc as { lastReviewed?: string }).lastReviewed;
  }
  if ((doc as { nations?: AdviceArticle["nations"] }).nations) {
    article.nations = (doc as { nations?: AdviceArticle["nations"] }).nations;
  }
  if ((doc as { featured?: boolean }).featured) {
    article.featured = (doc as { featured?: boolean }).featured;
  }

  return article;
}
