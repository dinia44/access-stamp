/** Shared content types — aligned with Sanity schemas and mock-data fallbacks. */

export type AdviceSection =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "pre"; text: string }
  | { type: "links"; items: Array<{ label: string; href: string }> }
  | { type: "callout"; tone: "warning" | "tip" | "contact" | "steps"; title: string; body: string };

export type AdviceCategorySlug =
  | "rights"
  | "education"
  | "transport"
  | "workplace"
  | "care"
  | "equipment"
  | "emergency"
  | "new-to-disability"
  | "travel"
  | "cars"
  | "sport";

export type AdviceNation = "England" | "Scotland" | "Wales" | "Northern Ireland";

export type AdviceArticle = {
  slug: string;
  title: string;
  categorySlug: AdviceCategorySlug;
  updated: string;
  tags: string[];
  /** Display date e.g. "May 2026" — falls back to formatted `updated` when omitted. */
  lastReviewed?: string;
  /** Nations this guide applies to; omit or use UK-wide for all-nation content. */
  nations?: AdviceNation[] | "UK-wide";
  excerpt?: string;
  readTimeMinutes?: number;
  featured?: boolean;
  seoTitle?: string;
  metaDescription?: string;
  heroImage?: { src: string; alt: string };
  sections: AdviceSection[];
  /** Card preview bullets for category/hub listings */
  cardPreviewBullets?: string[];
  /** e.g. "checklist, template, official links" */
  includesLabel?: string;
  quickAnswer?: string;
  firstThreeActions?: string[];
  canonicalGuideHref?: string;
  /** Editorial lifecycle — only `published` should appear in production listings when enforced. */
  editorialStatus?: "draft" | "editorial_review" | "expert_review" | "published" | "update_required";
};

export type BlogSection = { heading?: string; body: string };

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  readTime: string;
  sections: BlogSection[];
};
