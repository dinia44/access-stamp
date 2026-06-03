import { ADVICE_ARTICLES as FALLBACK_ARTICLES } from "@/lib/mock-data";
import type { AdviceArticle } from "@/lib/content/types";
import { getSanityClient } from "@/lib/sanity/client";
import { isSanityConfigured } from "@/lib/sanity/env";
import { mapSanityAdviceDoc } from "@/lib/sanity/map-advice";
import { ADVICE_ARTICLE_BY_SLUG_QUERY, ADVICE_ARTICLES_QUERY } from "@/lib/sanity/queries";

let cachedArticles: AdviceArticle[] | null = null;

async function fetchAdviceFromSanity(): Promise<AdviceArticle[]> {
  const client = getSanityClient();
  if (!client) return [];

  try {
    const docs = await client.fetch<unknown[]>(ADVICE_ARTICLES_QUERY);
    return docs
      .map((doc) => mapSanityAdviceDoc(doc as Parameters<typeof mapSanityAdviceDoc>[0]))
      .filter((a): a is AdviceArticle => Boolean(a));
  } catch (err) {
    console.error("[content] Sanity advice fetch failed", err);
    return [];
  }
}

/** All advice articles — Sanity when configured, otherwise in-repo mock data. */
export async function getAdviceArticles(): Promise<AdviceArticle[]> {
  if (!isSanityConfigured()) return FALLBACK_ARTICLES;

  if (cachedArticles) return cachedArticles;

  const remote = await fetchAdviceFromSanity();
  cachedArticles = remote.length > 0 ? remote : FALLBACK_ARTICLES;
  return cachedArticles;
}

export async function getAdviceArticleBySlug(slug: string): Promise<AdviceArticle | undefined> {
  if (!isSanityConfigured()) {
    return FALLBACK_ARTICLES.find((a) => a.slug === slug);
  }

  const client = getSanityClient();
  if (!client) return FALLBACK_ARTICLES.find((a) => a.slug === slug);

  try {
    const doc = await client.fetch<unknown | null>(ADVICE_ARTICLE_BY_SLUG_QUERY, { slug });
    const mapped = doc ? mapSanityAdviceDoc(doc as Parameters<typeof mapSanityAdviceDoc>[0]) : null;
    if (mapped) return mapped;
  } catch (err) {
    console.error("[content] Sanity advice by slug failed", err);
  }

  return FALLBACK_ARTICLES.find((a) => a.slug === slug);
}

/** Sync fallback for client components and build-time utilities. */
export { FALLBACK_ARTICLES as ADVICE_ARTICLES_STATIC };
