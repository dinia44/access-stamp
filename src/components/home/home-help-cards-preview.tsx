import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { CORE_HELP_CARDS } from "@/data/core-help-cards";
import { HOME_FOCUS } from "@/components/home/home-theme";

export function HomeHelpCardsPreview() {
  const preview = CORE_HELP_CARDS.slice(0, 2);

  return (
    <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20" aria-labelledby="help-cards-preview-heading">
      <PageContainer>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Help cards</p>
            <h2 id="help-cards-preview-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl">
              Quick cards for real access situations
            </h2>
            <p className="mt-3 text-base leading-7 text-[#4A5263]">
              Copyable scripts and checklists for venues, work, appointments, and inaccessible information.
            </p>
          </div>
          <Link
            href="/help-cards"
            className={`link-arrow inline-flex min-h-[44px] shrink-0 items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
          >
            View all help cards
          </Link>
        </div>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {preview.map((card) => (
            <li key={card.id}>
              <article className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]">
                <h3 className="text-lg font-semibold text-[#20242E]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5263]">{card.situation}</p>
                <Link
                  href={`/help-cards#${card.id}`}
                  className={`link-arrow mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline ${HOME_FOCUS}`}
                >
                  Open help card
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </PageContainer>
    </section>
  );
}
