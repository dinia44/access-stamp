import type { Metadata } from "next";
import { AdviceHubHero } from "@/components/advice/advice-hub-hero";
import {
  AdviceHubEditorialStandards,
  AdviceHubMostRead,
  AdviceHubTopicGrid,
  AdviceHubUrgentStrip,
  AdviceHubUsefulLinks,
} from "@/components/advice/advice-hub-sections";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { SetChatContext } from "@/components/chat/set-context";
import { getAdviceArticles } from "@/lib/content/advice";
import { getMostReadGuide } from "@/lib/advice-guide-meta";
import { buildAdviceHubCollectionJsonLd } from "@/lib/seo/advice-jsonld";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("advice");

export default async function AdviceHubPage() {
  const articles = await getAdviceArticles();
  const mostReadGuide = getMostReadGuide(articles);

  return (
    <>
      <SetChatContext page={{ kind: "advice" }} />
      <JsonLdScript data={buildAdviceHubCollectionJsonLd(articles)} />
      {mostReadGuide ? <AdviceHubHero articles={articles} mostReadGuide={mostReadGuide} /> : null}
      <AdviceHubUrgentStrip />
      <AdviceHubTopicGrid />
      <AdviceHubMostRead articles={articles} />
      <AdviceHubEditorialStandards />
      <AdviceHubUsefulLinks />
    </>
  );
}
