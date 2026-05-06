import type { MetadataRoute } from "next";
import { ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://access-stamp-mxao.vercel.app";

  const staticRoutes = [
    "",
    "/venue-finder",
    "/advice",
    "/advice/transport",
    "/advice/workplace",
    "/advice/travel",
    "/advice/sport",
    "/advice/care",
    "/advice/emergency",
    "/advice/equipment",
    "/advice/quick-help",
    "/ai",
    "/about",
    "/contact",
    "/submit-venue",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const adviceRoutes = ADVICE_ARTICLES.map((article) => ({
    url: `${base}/advice/${article.slug}`,
    lastModified: new Date(),
  }));

  const venueRoutes = SAMPLE_VENUES.map((venue) => ({
    url: `${base}/venue/${venue.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...adviceRoutes, ...venueRoutes];
}
