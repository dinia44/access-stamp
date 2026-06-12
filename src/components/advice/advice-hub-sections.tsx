import Link from "next/link";
import type { AdviceArticle } from "@/lib/content/types";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { GuideMetaLine, GuideTagEyebrow } from "@/components/advice/guide-meta-line";
import { PageContainer } from "@/components/layout/PageContainer";
import { ADVICE_TOPICS } from "@/lib/advice-topics";
import { getAdviceArticleCardImage } from "@/lib/advice-card-images";
import { getFeaturedGuides } from "@/lib/advice-guide-meta";

export function AdviceHubUrgentStrip() {
  return (
    <div className="border-y border-[#F6CFB8] bg-[#FDE9DD] px-4 py-4 text-center sm:px-6">
      <p className="text-sm text-[#4A5263] sm:text-base">
        Need help today?{" "}
        <Link href="/advice/emergency" className="font-semibold text-[#C8430F] hover:underline">
          Helplines, NHS services and urgent rights cards →
        </Link>
      </p>
    </div>
  );
}

export function AdviceHubTopicGrid() {
  return (
    <section className="bg-[#FDFBF8] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="advice-topic-grid-heading">
      <PageContainer>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Browse by topic</p>
          <h2
            id="advice-topic-grid-heading"
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            Pick a life area, jump straight in
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4A5263]">
            Every topic collects its guides, templates and checklists in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {ADVICE_TOPICS.map((topic) => (
            <Link
              key={topic.slug}
              href={`/advice/${topic.slug}`}
              className="group flex items-center gap-4 rounded-[18px] border border-[#EFE5DA] bg-white p-4 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-24px_rgba(122,80,48,0.22)]"
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-[#F6CFB8] bg-[#FDE9DD] text-xl"
                aria-hidden
              >
                {topic.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-[family-name:var(--font-heading)] text-[17.5px] font-medium text-[#20242E]">
                  {topic.title}
                </div>
                <p className="mt-1 text-sm leading-6 text-[#4A5263]">{topic.description}</p>
                <span className="mt-2 inline-block text-sm font-semibold text-[#C8430F] group-hover:underline">
                  Open topic →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

function MostReadCard({ article }: { article: AdviceArticle }) {
  const image = getAdviceArticleCardImage(article);
  return (
    <Link
      href={`/advice/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#EFE5DA] bg-white shadow-[0_12px_32px_-20px_rgba(122,80,48,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_48px_-24px_rgba(122,80,48,0.22)]"
    >
      <AdviceMediaFrame>
        <GuideCoverImage
          src={image.src}
          alt={image.alt}
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes={ADVICE_CARD_IMAGE_SIZES}
        />
      </AdviceMediaFrame>
      <div className="flex flex-1 flex-col p-5">
        <GuideTagEyebrow article={article} />
        <h3 className="mt-2 font-[family-name:var(--font-heading)] text-lg font-medium leading-snug text-[#20242E]">
          {article.title}
        </h3>
        {article.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4A5263]">{article.excerpt}</p>
        ) : null}
        <div className="mt-auto pt-4">
          <GuideMetaLine article={article} />
        </div>
      </div>
    </Link>
  );
}

export function AdviceHubMostRead({ articles }: { articles: AdviceArticle[] }) {
  const featured = getFeaturedGuides(articles, 6);
  if (!featured.length) return null;

  return (
    <section className="bg-[#FAF4ED] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="advice-most-read-heading">
      <PageContainer>
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Most-read guides</p>
          <h2
            id="advice-most-read-heading"
            className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            Guides people open first
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4A5263]">
            Benefits, work, travel, education, and care — practical next steps when you need them.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article) => (
            <MostReadCard key={article.slug} article={article} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubEditorialStandards() {
  return (
    <section className="bg-[#FDFBF8] px-4 py-14 sm:px-6 sm:py-16" aria-labelledby="advice-editorial-heading">
      <PageContainer>
        <div className="mx-auto max-w-3xl rounded-[20px] border border-[#EFE5DA] bg-white p-6 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.16)] sm:p-8">
          <h2
            id="advice-editorial-heading"
            className="font-[family-name:var(--font-heading)] text-2xl font-medium tracking-[-0.02em] text-[#20242E]"
          >
            Our editorial standards
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4A5263]">
            <li>Written by disabled people and carers, in plain English.</li>
            <li>Checked against GOV.UK and primary sources before publication.</li>
            <li>Every guide displays its review date so you can see when it was last checked.</li>
            <li>
              Spotted something wrong? Email{" "}
              <a href="mailto:hello@accessstamp.com" className="font-semibold text-[#C8430F] hover:underline">
                hello@accessstamp.com
              </a>
              .
            </li>
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}

export function AdviceHubUsefulLinks() {
  return (
    <section className="bg-[#FAF4ED] px-4 py-10 sm:px-6" aria-labelledby="advice-useful-links-heading">
      <PageContainer>
        <div className="rounded-[18px] border border-[#EFE5DA] bg-white p-6">
          <h2 id="advice-useful-links-heading" className="text-base font-semibold text-[#20242E]">
            Useful links
          </h2>
          <ul className="mt-4 space-y-3 text-sm font-semibold">
            <li>
              <Link className="text-[#C8430F] hover:underline" href="/ai">
                AI Tools →
              </Link>
            </li>
            <li>
              <Link className="text-[#C8430F] hover:underline" href="/directory">
                Support organisations directory →
              </Link>
            </li>
            <li>
              <Link className="text-[#C8430F] hover:underline" href="/glossary">
                Glossary →
              </Link>
            </li>
          </ul>
        </div>
      </PageContainer>
    </section>
  );
}
