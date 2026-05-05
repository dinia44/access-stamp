import type { AdviceArticle } from "@/lib/mock-data";

function absoluteUrl(path: string) {
  const base =
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0
      ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "")
      : "";
  if (!base) return null;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function AdviceArticleJsonLd({ article }: { article: AdviceArticle }) {
  const url = absoluteUrl(`/advice/${article.slug}`);
  if (!url) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    dateModified: article.updated,
    author: {
      "@type": "Organization",
      name: "Access Stamp",
    },
    publisher: {
      "@type": "Organization",
      name: "Access Stamp",
    },
    description: article.title,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
