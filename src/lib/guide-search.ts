import type { AdviceArticle, AdviceCategorySlug } from "@/lib/content/types";

export const GUIDE_CATEGORY_FILTERS: { value: AdviceCategorySlug | "all"; label: string }[] = [
  { value: "all", label: "All topics" },
  { value: "rights", label: "Rights & benefits" },
  { value: "workplace", label: "Work" },
  { value: "care", label: "Care & support" },
  { value: "transport", label: "Transport" },
  { value: "travel", label: "Travel" },
  { value: "equipment", label: "Equipment & home" },
  { value: "education", label: "Education" },
  { value: "emergency", label: "Urgent help" },
  { value: "new-to-disability", label: "New to disability" },
  { value: "cars", label: "Driving & cars" },
  { value: "sport", label: "Sport & leisure" },
];

export const SUGGESTED_GUIDE_SLUGS = [
  "pip-in-plain-english",
  "blue-badge",
  "reasonable-adjustments-at-work",
  "access-to-work",
  "wheelchair-breakdown-what-to-do",
] as const;

const RECENT_GUIDES_KEY = "as-recent-guides";
const MAX_RECENT = 5;
export const MAX_GUIDE_SEARCH_RESULTS = 10;

export function filterGuideArticles(
  articles: AdviceArticle[],
  { query, category }: { query: string; category: AdviceCategorySlug | "all" },
): AdviceArticle[] {
  const q = query.trim().toLowerCase();
  let items = articles.filter((article) => article.editorialStatus !== "draft");

  if (category !== "all") {
    items = items.filter((article) => article.categorySlug === category);
  }

  if (q) {
    items = items.filter((article) => {
      const haystack = [
        article.title,
        article.excerpt ?? "",
        article.metaDescription ?? "",
        ...article.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  return items.slice(0, MAX_GUIDE_SEARCH_RESULTS);
}

export function readRecentGuideSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_GUIDES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export function saveRecentGuideSlug(slug: string) {
  if (typeof window === "undefined") return;
  const next = [slug, ...readRecentGuideSlugs().filter((item) => item !== slug)].slice(0, MAX_RECENT);
  window.localStorage.setItem(RECENT_GUIDES_KEY, JSON.stringify(next));
}
