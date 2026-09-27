import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdviceArticleJsonLd } from "@/components/advice-article-jsonld";
import { PracticalGuideExperience } from "@/components/guide/practical-guide-experience";
import { ArticleGuide } from "@/components/guide/article-guide";
import {
  getAdviceArticleBySlug,
  getAdviceArticles,
} from "@/lib/content/advice";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import {
  getPracticalGuideWorkflow,
  isPracticalGuide,
} from "@/lib/practical-guide";
import { getGuideResourcePack } from "@/lib/guide-resources";
import { SetChatContext } from "@/components/chat/set-context";
export async function generateStaticParams() {
  const articles = await getAdviceArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getAdviceArticleBySlug(slug);
  if (!a) return {};
  const firstParagraph = a.sections.find((s) => s.type === "p");
  const fallbackDesc =
    firstParagraph && "text" in firstParagraph
      ? firstParagraph.text.slice(0, 160)
      : a.title;
  const title = a.seoTitle ?? a.title;
  const description = a.metaDescription ?? a.excerpt ?? fallbackDesc;
  const hero = a.heroImage ?? getAdviceArticleCardImage(a);
  return buildPageMetadata({
    title,
    description,
    path: `/advice/${a.slug}`,
    image: hero.src,
    type: "article",
  });
}

export default async function AdviceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getAdviceArticleBySlug(slug);
  if (!article) notFound();
  const image = article.heroImage ?? getAdviceArticleCardImage(article);
  return (
    <>
      <AdviceArticleJsonLd article={article} imageUrl={image.src} />
      <SetChatContext
        page={{
          kind: "advice-article",
          slug: article.slug,
          title: article.title,
          category: article.categorySlug,
        }}
      />
      {isPracticalGuide(article.slug, article.categorySlug) ? (
        <PracticalGuideExperience
          article={article}
          workflow={getPracticalGuideWorkflow(article)}
          resources={getGuideResourcePack(article.slug)}
        />
      ) : (
        <ArticleGuide article={article} />
      )}
    </>
  );
}
