import type { AdviceArticle } from "@/lib/content/types";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { buildAdviceArticleJsonLd, buildAdviceFaqJsonLd } from "@/lib/seo/advice-jsonld";

export function AdviceArticleJsonLd({
  article,
  imageUrl,
}: {
  article: AdviceArticle;
  imageUrl?: string;
}) {
  const articleJson = buildAdviceArticleJsonLd(article, imageUrl);
  const faqJson = buildAdviceFaqJsonLd(article);

  return (
    <>
      <JsonLdScript data={articleJson} />
      <JsonLdScript data={faqJson} />
    </>
  );
}
