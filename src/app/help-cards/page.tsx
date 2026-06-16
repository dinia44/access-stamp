import type { Metadata } from "next";
import Link from "next/link";
import { SetChatContext } from "@/components/chat/set-context";
import { Container } from "@/components/container";
import { CoreHelpCardsGrid } from "@/components/help-cards/core-help-card";
import { helpCardPacks } from "@/data/helpCardPacks";
import { CORE_HELP_CARDS } from "@/data/core-help-cards";
import { HelpCardPackPreview } from "@/components/help-cards/HelpCardComponents";
import { staticPageMetadata } from "@/lib/seo/static-pages";

export const metadata: Metadata = staticPageMetadata("helpCards");

export default function HelpCardsPage() {
  return (
    <>
      <SetChatContext page={{ kind: "none" }} />
      <main className="min-h-screen bg-[#FDFBF8] text-[#20242E]">
        <Container className="py-12 md:py-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Help cards</p>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
              Help cards for real access situations
            </h1>
            <p className="text-base leading-7 text-[#4A5263] sm:text-lg">
              Quick, practical cards you can copy, save, print, or use when you need to explain an access need clearly.
            </p>
          </div>

          <div className="mt-12">
            <CoreHelpCardsGrid cards={CORE_HELP_CARDS} />
          </div>

          <section className="mt-20" aria-labelledby="packs-heading">
            <div className="mb-8 max-w-2xl">
              <h2 id="packs-heading" className="text-2xl font-semibold text-[#20242E] sm:text-3xl">
                More card packs
              </h2>
              <p className="mt-3 text-base leading-7 text-[#4A5263]">
                Situation-based packs with scripts, checklists, and evidence summaries for common access moments.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {helpCardPacks.map((pack) => (
                <HelpCardPackPreview key={pack.slug} pack={pack} />
              ))}
            </div>
          </section>

          <p className="mt-12 max-w-3xl text-sm leading-6 text-[#4A5263]">
            Access Stamp provides practical prompts and source-backed summaries. It does not provide medical, legal, or
            financial advice.{" "}
            <Link href="/ai-toolkit" className="font-semibold text-[#C8430F] hover:underline">
              Use Access Stamp tools
            </Link>{" "}
            for longer drafts and checklists.
          </p>
        </Container>
      </main>
    </>
  );
}
