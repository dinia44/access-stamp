import type { MetadataRoute } from "next";
import { ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";

const BLOG_SLUGS = [
  "what-i-wish-id-known",
  "wheelchair-basics-daily-transfers",
  "why-accessible-means-nothing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://access-stamp-mxao.vercel.app";
  const now = new Date();

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

  const blogRoutes = BLOG_SLUGS.map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
  }));

  const adviceRoutes = ADVICE_ARTICLES.map((article) => ({
    url: `${base}/advice/${article.slug}`,
    lastModified: now,
  }));

  const venueRoutes = SAMPLE_VENUES.map((venue) => ({
    url: `${base}/venue/${venue.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...blogRoutes, ...adviceRoutes, ...venueRoutes];
}
