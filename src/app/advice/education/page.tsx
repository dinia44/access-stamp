import { EducationGuidesLanding } from "@/components/advice/education-guides-landing";
import { SetChatContext } from "@/components/chat/set-context";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

export default function EducationPage() {
  const articles = ADVICE_ARTICLES.filter((a) => a.categorySlug === "education").map((a) => ({
    slug: a.slug,
    title: a.title,
    updated: a.updated,
    tags: a.tags,
    heroImage: a.heroImage,
    categorySlug: "education" as const,
  }));

  return (
    <div className="bg-background">
      <SetChatContext page={{ kind: "advice" }} />
      <div className="mx-auto w-full max-w-[1280px] px-[clamp(1.25rem,4.5vw,4rem)] py-10">
        <EducationGuidesLanding articles={articles} />
      </div>
    </div>
  );
}
