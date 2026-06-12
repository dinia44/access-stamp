import Image from "next/image";
import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceHubSearch } from "@/components/advice/advice-hub-search";
import { GuideReviewedPill } from "@/components/advice/guide-meta-line";
import { RouteDecoration } from "@/components/home/route-decoration";
import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { formatGuideMetaLine } from "@/lib/advice-guide-meta";
import { adviceTopicLabel } from "@/lib/advice-topics";

type AdviceHubHeroProps = {
  articles: AdviceArticle[];
  mostReadGuide: AdviceArticle;
};

export function AdviceHubHero({ articles, mostReadGuide }: AdviceHubHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 pb-12 pt-10 sm:px-6 sm:pb-16 sm:pt-12">
      <RouteDecoration className="right-[-4%] top-10 h-28 w-[min(50vw,400px)] opacity-80" />
      <RouteDecoration className="bottom-16 left-[-6%] h-24 w-[min(42vw,340px)] opacity-60" flip />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
        <div className="order-2 lg:order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Advice Hub</p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-[36px] font-medium leading-[1.05] tracking-[-0.03em] text-[#20242E] sm:text-[52px]">
            Practical guides in <span className="italic text-[#C8430F]">plain language.</span>
          </h1>
          <p className="mt-4 max-w-[58ch] text-base leading-7 text-[#4A5263]">
            Rights, benefits, equipment, care, education, transport and work — written from lived experience, checked
            against official guidance, and dated so you know it&apos;s current.
          </p>
          <div className="mt-8">
            <AdviceHubSearch articles={articles} />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="overflow-hidden rounded-[24px] border-8 border-white bg-white shadow-[0_24px_64px_-24px_rgba(122,80,48,0.28)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={CLOUDINARY_MEDIA.adviceHubHero}
                  alt="Accessible city street with step-free library entrance and a wheelchair user on tactile paving"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
              </div>
            </div>

            <Link
              href={`/advice/${mostReadGuide.slug}`}
              className="relative z-10 mx-auto mt-[-3.5rem] block w-[min(100%,340px)] rounded-[18px] border border-[#EFE5DA] bg-white p-5 shadow-[0_20px_48px_-24px_rgba(122,80,48,0.24)] transition hover:-translate-y-0.5 lg:absolute lg:bottom-6 lg:left-[-1.5rem] lg:mt-0"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C8430F]">
                Most-read guide
              </p>
              <div className="mt-2">
                <GuideReviewedPill article={mostReadGuide} />
              </div>
              <h2 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-medium leading-snug text-[#20242E]">
                {mostReadGuide.title}
              </h2>
              <p className="mt-2 text-sm text-[#76808F]">
                {formatGuideMetaLine(mostReadGuide, adviceTopicLabel(mostReadGuide.categorySlug))}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
