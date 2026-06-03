/**
 * Upload in-repo advice articles and blog posts to Sanity.
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx \
 *   NEXT_PUBLIC_SANITY_DATASET=production \
 *   SANITY_API_TOKEN=xxx \
 *   npx tsx scripts/seed-sanity.ts
 */
import { createClient } from "@sanity/client";
import { ADVICE_ARTICLES } from "../src/lib/mock-data";
import { FALLBACK_BLOG_POSTS } from "../src/lib/content/blog-fallback";
import type { AdviceArticle, AdviceSection } from "../src/lib/content/types";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
const token = process.env.SANITY_API_TOKEN?.trim();

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (Editor token).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

function mapSection(section: AdviceSection) {
  if (section.type === "h2") return { _type: "adviceSection", type: "h2", text: section.text };
  if (section.type === "p") return { _type: "adviceSection", type: "p", text: section.text };
  if (section.type === "ul") return { _type: "adviceSection", type: "ul", items: section.items };
  if (section.type === "pre") return { _type: "adviceSection", type: "pre", text: section.text };
  if (section.type === "links") {
    return {
      _type: "adviceSection",
      type: "links",
      linkItems: section.items.map((item) => ({ label: item.label, href: item.href })),
    };
  }
  return {
    _type: "adviceSection",
    type: "callout",
    tone: section.tone,
    title: section.title,
    body: section.body,
  };
}

function adviceDoc(article: AdviceArticle) {
  return {
    _id: `adviceArticle-${article.slug}`,
    _type: "adviceArticle",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    categorySlug: article.categorySlug,
    updated: article.updated,
    tags: article.tags,
    ...(article.excerpt ? { excerpt: article.excerpt } : {}),
    ...(article.readTimeMinutes ? { readTimeMinutes: article.readTimeMinutes } : {}),
    ...(article.seoTitle ? { seoTitle: article.seoTitle } : {}),
    ...(article.metaDescription ? { metaDescription: article.metaDescription } : {}),
    ...(article.heroImage ? { heroImage: article.heroImage } : {}),
    sections: article.sections.map(mapSection),
  };
}

async function main() {
  const adviceTx = client.transaction();
  for (const article of ADVICE_ARTICLES) {
    adviceTx.createOrReplace(adviceDoc(article));
  }

  const blogTx = client.transaction();
  for (const post of FALLBACK_BLOG_POSTS) {
    blogTx.createOrReplace({
      _id: `blogPost-${post.slug}`,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      date: post.date,
      excerpt: post.excerpt,
      readTime: post.readTime,
      sections: post.sections.map((s) => ({
        _type: "blogSection",
        ...(s.heading ? { heading: s.heading } : {}),
        body: s.body,
      })),
    });
  }

  console.log(`Seeding ${ADVICE_ARTICLES.length} advice articles…`);
  await adviceTx.commit();
  console.log(`Seeding ${FALLBACK_BLOG_POSTS.length} blog posts…`);
  await blogTx.commit();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
