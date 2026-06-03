import type { BlogPost, BlogSection } from "@/lib/content/types";

type SanityBlogDoc = {
  slug?: string;
  title?: string;
  date?: string;
  excerpt?: string;
  readTime?: string;
  sections?: Array<{ heading?: string; body?: string }>;
};

export function mapSanityBlogDoc(doc: SanityBlogDoc): BlogPost | null {
  const slug = doc.slug?.trim();
  const title = doc.title?.trim();
  const excerpt = doc.excerpt?.trim();
  if (!slug || !title || !excerpt) return null;

  const sections: BlogSection[] = (doc.sections ?? [])
    .filter((s) => s.body?.trim())
    .map((s) => ({
      ...(s.heading?.trim() ? { heading: s.heading.trim() } : {}),
      body: s.body!.trim(),
    }));

  if (!sections.length) return null;

  return {
    slug,
    title,
    date: doc.date?.trim() || "",
    excerpt,
    readTime: doc.readTime?.trim() || "5 min read",
    sections,
  };
}
