import { FALLBACK_BLOG_POSTS } from "@/lib/content/blog-fallback";
import type { BlogPost } from "@/lib/content/types";
import { getSanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { mapSanityBlogDoc } from "@/lib/sanity/map-blog";
import { BLOG_POST_BY_SLUG_QUERY, BLOG_POSTS_QUERY } from "@/lib/sanity/queries";

let cachedPosts: BlogPost[] | null = null;

async function fetchBlogFromSanity(): Promise<BlogPost[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const docs = await client.fetch<unknown[]>(BLOG_POSTS_QUERY);
    return docs
      .map((doc) => mapSanityBlogDoc(doc as Parameters<typeof mapSanityBlogDoc>[0]))
      .filter((p): p is BlogPost => Boolean(p));
  } catch (err) {
    console.error("[content] Sanity blog fetch failed", err);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) return FALLBACK_BLOG_POSTS;

  if (cachedPosts) return cachedPosts;

  const remote = await fetchBlogFromSanity();
  cachedPosts = remote.length > 0 ? remote : FALLBACK_BLOG_POSTS;
  return cachedPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!isSanityConfigured()) {
    return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
  }

  const client = getSanityClient();
  if (!client) return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);

  try {
    const doc = await client.fetch<unknown | null>(BLOG_POST_BY_SLUG_QUERY, { slug });
    const mapped = doc ? mapSanityBlogDoc(doc as Parameters<typeof mapSanityBlogDoc>[0]) : null;
    if (mapped) return mapped;
  } catch (err) {
    console.error("[content] Sanity blog by slug failed", err);
  }

  return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug);
}

export { FALLBACK_BLOG_POSTS as BLOG_POSTS_STATIC };
