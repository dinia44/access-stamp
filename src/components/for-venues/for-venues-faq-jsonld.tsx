import { FOR_VENUES_FAQ } from "@/lib/for-venues-config";

function absoluteUrl(path: string) {
  const base =
    typeof process.env.NEXT_PUBLIC_SITE_URL === "string" && process.env.NEXT_PUBLIC_SITE_URL.trim().length > 0
      ? process.env.NEXT_PUBLIC_SITE_URL.trim().replace(/\/$/, "")
      : "";
  if (!base) return null;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ForVenuesFaqJsonLd() {
  const url = absoluteUrl("/for-venues");
  if (!url) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FOR_VENUES_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    url,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />;
}
