import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";
import { FEATURED_PRACTICAL_GUIDE_SLUGS } from "@/lib/featured-practical-guides";
import { adviceTopicLabel } from "@/lib/advice-topics";

export type AdviceNation = "England" | "Scotland" | "Wales" | "Northern Ireland";
export type GuideNations = AdviceNation[] | "UK-wide";

export const NATION_FILTER_OPTIONS = [
  { id: "UK-wide" as const, label: "UK-wide" },
  { id: "England" as const, label: "England" },
  { id: "Scotland" as const, label: "Scotland" },
  { id: "Wales" as const, label: "Wales" },
  { id: "Northern Ireland" as const, label: "NI" },
] as const;

export type NationFilter = (typeof NATION_FILTER_OPTIONS)[number]["id"];

export function getGuideNations(article: AdviceArticle): GuideNations {
  return article.nations ?? "UK-wide";
}

export function getGuideLastReviewed(article: AdviceArticle): string {
  if (article.lastReviewed) return article.lastReviewed;
  const parsed = new Date(article.updated);
  if (Number.isNaN(parsed.getTime())) return article.updated;
  return parsed.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function getGuidePrimaryTag(article: AdviceArticle): string {
  return article.tags[0] ?? adviceTopicLabel(article.categorySlug);
}

export function formatGuideMetaLine(article: AdviceArticle, categoryLabel?: string): string {
  const label = categoryLabel ?? adviceTopicLabel(article.categorySlug);
  const parts = [label];
  if (article.readTimeMinutes) parts.push(`${article.readTimeMinutes} min read`);
  parts.push(`Reviewed ${getGuideLastReviewed(article)}`);
  return parts.join(" · ");
}

export function getNationSuffix(article: AdviceArticle): string | null {
  const nations = getGuideNations(article);
  if (nations === "UK-wide") return null;
  if (nations.length === 1 && nations[0] === "Scotland") return "· Differs in Scotland";
  if (nations.length === 1 && nations[0] === "England") return "· England only";
  if (nations.length === 1 && nations[0] === "Wales") return "· Wales only";
  if (nations.length === 1 && nations[0] === "Northern Ireland") return "· Northern Ireland only";
  return `· ${nations.join(" & ")}`;
}

function guideMatchesNation(article: AdviceArticle, nation: NationFilter): boolean {
  const guideNations = getGuideNations(article);
  if (nation === "UK-wide") return guideNations === "UK-wide";
  if (guideNations === "UK-wide") return true;
  return guideNations.includes(nation);
}

function guideSearchHaystack(article: AdviceArticle): string {
  const firstParagraph = article.sections.find((section) => section.type === "p");
  const blurb =
    article.excerpt ??
    (firstParagraph && "text" in firstParagraph ? firstParagraph.text : "");
  return [article.title, blurb, ...article.tags].join(" ").toLowerCase();
}

export function searchAdviceGuides(
  articles: AdviceArticle[],
  {
    query = "",
    topicSlug = null,
    nation = null,
  }: {
    query?: string;
    topicSlug?: AdviceCategorySlug | null;
    nation?: NationFilter | null;
  },
): AdviceArticle[] {
  let results = articles;

  if (topicSlug) {
    results = results.filter((article) => article.categorySlug === topicSlug);
  }

  if (nation) {
    results = results.filter((article) => guideMatchesNation(article, nation));
  }

  const trimmed = query.trim().toLowerCase();
  if (trimmed) {
    results = results.filter((article) => guideSearchHaystack(article).includes(trimmed));
  }

  return results;
}

export function getMostReadGuide(articles: AdviceArticle[]): AdviceArticle | undefined {
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  for (const slug of FEATURED_PRACTICAL_GUIDE_SLUGS) {
    const match = bySlug.get(slug);
    if (match) return match;
  }
  return articles[0];
}

export function getFeaturedGuides(articles: AdviceArticle[], limit = 6): AdviceArticle[] {
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const featured = FEATURED_PRACTICAL_GUIDE_SLUGS.map((slug) => bySlug.get(slug)).filter(
    (article): article is AdviceArticle => Boolean(article),
  );
  if (featured.length >= limit) return featured.slice(0, limit);
  const rest = articles.filter((article) => !featured.some((item) => item.slug === article.slug));
  return [...featured, ...rest].slice(0, limit);
}
