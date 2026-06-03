import type { MetadataRoute } from "next";
import { getAdviceArticles } from "@/lib/content/advice";
import { getBlogPosts } from "@/lib/content/blog";
import { SAMPLE_VENUES } from "@/lib/mock-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://access-stamp-mxao.vercel.app";
  const now = new Date();

  const [articles, posts] = await Promise.all([getAdviceArticles(), getBlogPosts()]);

  const staticRoutes = [
    "",
    "/venue-finder",
    "/submit-venue",
    "/advice",
    "/advice/rights",
    "/advice/education",
    "/advice/transport",
    "/advice/workplace",
    "/advice/travel",
    "/advice/sport",
    "/advice/care",
    "/advice/emergency",
    "/advice/equipment",
    "/advice/cars",
    "/advice/new-to-disability",
    "/ai",
    "/ai-toolkit",
    "/ai-toolkit/access-needs-profiler",
    "/ai-toolkit/letter-builder",
    "/ai-toolkit/evidence-checklist",
    "/ai-toolkit/article-companion",
    "/ai-toolkit/venue-questions",
    "/ai-toolkit/venue-fit-planner",
    "/ai-toolkit/tribunal-bundle-helper",
    "/about",
    "/blog",
    "/glossary",
    "/directory",
    "/laws-guidance",
    "/help-cards",
    "/legal/privacy",
    "/legal/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const blogRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: now,
  }));

  const adviceRoutes = articles.map((article) => ({
    url: `${base}/advice/${article.slug}`,
    lastModified: article.updated ? new Date(article.updated) : now,
  }));

  const venueRoutes = SAMPLE_VENUES.map((venue) => ({
    url: `${base}/venue/${venue.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...blogRoutes, ...adviceRoutes, ...venueRoutes];
}
