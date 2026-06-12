import type { MetadataRoute } from "next";
import { VENUES } from "@/data/venues";
import { helpCardPacks } from "@/data/helpCardPacks";
import { getAdviceArticles } from "@/lib/content/advice";
import { getBlogPosts } from "@/lib/content/blog";
import { getSiteUrl } from "@/lib/seo/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const [articles, posts] = await Promise.all([getAdviceArticles(), getBlogPosts()]);

  const staticRoutes = [
    "",
    "/venue-finder",
    "/submit-venue",
    "/for-venues",
    "/accessibility",
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
    "/advice/reasonable-adjustments-at-work/full-guide",
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

  const venueRoutes = VENUES.map((venue) => ({
    url: `${base}/venue/${venue.slug}`,
    lastModified: new Date(venue.lastUpdated),
  }));

  const helpCardRoutes = helpCardPacks.map((pack) => ({
    url: `${base}/help-cards/${pack.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...blogRoutes, ...adviceRoutes, ...venueRoutes, ...helpCardRoutes];
}
