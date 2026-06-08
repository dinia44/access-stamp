import Link from "next/link";
import { HelpCardsHero } from "@/components/help-cards/help-cards-hero";
import { HelpCardsHub } from "@/components/help-cards/help-cards-hub";
import { Container } from "@/components/container";
import { SetChatContext } from "@/components/chat/set-context";
import { SITE_FOCUS } from "@/lib/site-design";

export default async function HelpCardsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const concernRaw = sp.concern;
  const concern = typeof concernRaw === "string" ? concernRaw : Array.isArray(concernRaw) ? concernRaw[0] : "";

  return (
    <div className="bg-[#FFF8F1] text-[#13201F]">
      <SetChatContext page={{ kind: "none" }} />
      <Container className="py-10 md:py-14 lg:py-16">
        <div className="space-y-10 sm:space-y-12 md:space-y-14">
          <HelpCardsHero />

          <div className="rounded-2xl border border-[#F1D8C7] bg-white/80 p-5 sm:p-6">
            <p className="text-base leading-7 text-[#2A3836]">
              These cards are practical prompts, not legal advice. For formal legal disputes, use specialist support.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/help-cards?concern=Equality%20Act%20rights"
                className={`inline-flex min-h-[44px] items-center rounded-full border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-[#F04A16] transition-colors hover:border-[#E8C4A8] hover:bg-[#FFF3E8] ${SITE_FOCUS}`}
              >
                Equality Act cards
              </Link>
              <Link
                href="/advice/rights"
                className={`inline-flex min-h-[44px] items-center rounded-full border border-[#F1D8C7] bg-[#FFF3E8] px-4 text-sm font-semibold text-[#59682A] transition-colors hover:border-[#E8C4A8] ${SITE_FOCUS}`}
              >
                Rights advice hub
              </Link>
            </div>
          </div>

          <HelpCardsHub initialConcern={concern} />
        </div>
      </Container>
    </div>
  );
}
