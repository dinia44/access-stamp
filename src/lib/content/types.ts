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

export type AdviceArticle = {
  slug: string;
  title: string;
  categorySlug: AdviceCategorySlug;
  updated: string;
  tags: string[];
  excerpt?: string;
  readTimeMinutes?: number;
  seoTitle?: string;
  metaDescription?: string;
  heroImage?: { src: string; alt: string };
  sections: AdviceSection[];
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
