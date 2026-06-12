import type { AdviceArticle, AdviceSection } from "@/lib/content/types";
import { absoluteUrl } from "@/lib/seo/site-url";
import { defaultOgImageUrl } from "@/lib/seo/default-images";

function articleDescription(article: AdviceArticle): string {
  const firstParagraph = article.sections.find((s) => s.type === "p");
  if (firstParagraph && "text" in firstParagraph) return firstParagraph.text.slice(0, 160);
  return article.excerpt ?? article.metaDescription ?? article.title;
}

function extractFaqPairs(sections: AdviceSection[]): Array<{ question: string; answer: string }> {
  const pairs: Array<{ question: string; answer: string }> = [];

  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    if (section.type !== "h2" || !section.text.trim().endsWith("?")) continue;
    const next = sections[i + 1];
    if (next?.type === "p") {
      pairs.push({ question: section.text.trim(), answer: next.text.trim() });
    }
  }

  return pairs;
}

export function buildAdviceArticleJsonLd(article: AdviceArticle, imageUrl?: string) {
  const url = absoluteUrl(`/advice/${article.slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: articleDescription(article),
    dateModified: article.updated,
    author: { "@type": "Organization", name: "Access Stamp", url: absoluteUrl("/about") },
    publisher: {
      "@type": "Organization",
      name: "Access Stamp",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: defaultOgImageUrl() },
    },
    image: imageUrl ?? defaultOgImageUrl(),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

export function buildAdviceFaqJsonLd(article: AdviceArticle) {
  const pairs = extractFaqPairs(article.sections);
  if (pairs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
    url: absoluteUrl(`/advice/${article.slug}`),
  };
}
