import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { helpCardPacks } from "@/data/helpCardPacks";
import { RenderHelpCard } from "@/components/help-cards/HelpCardComponents";
import { SetChatContext } from "@/components/chat/set-context";
import "../help-cards.css";

type PageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return helpCardPacks.map((pack) => ({
    slug: pack.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const pack = helpCardPacks.find((item) => item.slug === slug);

  if (!pack) {
    return {};
  }

  return {
    title: pack.title,
    description: pack.description,
  };
}

export default async function HelpCardPackPage({ params }: PageProps) {
  const { slug } = await Promise.resolve(params);
  const pack = helpCardPacks.find((item) => item.slug === slug);

  if (!pack) {
    notFound();
  }

  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <main className="hc-landing min-h-screen bg-[#FFF7EF] text-[#132033]">
        <section className="border-b border-[#EED8C6] bg-[linear-gradient(180deg,#FFF1E6_0%,#FFF8F1_58%,#FFF7EF_100%)] px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-[1100px]">
            <Link
              href="/help-cards"
              className="inline-flex min-h-[44px] items-center rounded-2xl border border-[#E0C8B3] bg-white/70 px-4 text-sm font-extrabold text-[#132033] transition hover:border-[#F05A1A] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
            >
              ← Back to help cards
            </Link>

            <p className="mt-10 text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">
              {pack.category}
            </p>

            <h1 className="mt-4 max-w-[880px] text-balance text-[clamp(3rem,6vw,6rem)] font-black leading-[0.94] tracking-[-0.06em] text-[#132033]">
              {pack.title}
            </h1>

            <p className="mt-6 max-w-[760px] text-lg leading-8 text-[#5F6875] sm:text-xl sm:leading-9">
              {pack.description}
            </p>

            <div className="mt-7 rounded-[28px] border border-[#EAD5C2] bg-white/70 p-5">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#F05A1A]">
                Use this when
              </p>
              <p className="mt-2 text-base font-semibold leading-7 text-[#132033]">
                {pack.useWhen}
              </p>
            </div>

            <div className="no-print mt-7 flex flex-wrap gap-3">
              {["Save pack", "Print pack", "Copy quick line", "Tailor with AI"].map((action) => (
                <button
                  key={action}
                  type="button"
                  className="inline-flex min-h-[46px] items-center justify-center rounded-2xl border border-[#E0C8B3] bg-white/70 px-5 text-sm font-extrabold text-[#132033] transition hover:border-[#F05A1A] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <div className="mx-auto grid max-w-[1100px] gap-6">
            {pack.cards.map((card) => (
              <RenderHelpCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        <section className="px-5 pb-20 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1100px] rounded-[28px] border border-[#EAD5C2] bg-white/70 p-6 text-sm leading-7 text-[#68717E]">
            <strong className="text-[#132033]">Important:</strong> Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal or financial advice. Always check the official source before relying on a card.
          </div>
        </section>
      </main>
    </>
  );
}
