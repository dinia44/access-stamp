import Link from "next/link";
import { Atkinson_Hyperlegible } from "next/font/google";
import { HelpCardsHero } from "@/components/help-cards/help-cards-hero";
import { HelpCardsHub } from "@/components/help-cards/help-cards-hub";
import { HC_BTN_GHOST, HC_CONTAINER, HC_NOTICE, HC_PAGE_BG } from "@/components/help-cards/help-cards-theme";
import { SetChatContext } from "@/components/chat/set-context";

const helpCardsFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-help-cards",
  display: "swap",
});

export default async function HelpCardsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const concernRaw = sp.concern;
  const concern = typeof concernRaw === "string" ? concernRaw : Array.isArray(concernRaw) ? concernRaw[0] : "";

  return (
    <div className={`${HC_PAGE_BG} ${helpCardsFont.variable} font-[family-name:var(--font-help-cards),Inter,system-ui,sans-serif] text-[#17212b]`}>
      <SetChatContext page={{ kind: "none" }} />
      <div className={`${HC_CONTAINER} py-10 md:py-14 lg:py-16`}>
        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
          <HelpCardsHero />

          <div className={HC_NOTICE}>
            <div className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full bg-[#ef5b2a]" aria-hidden />
              <p className="text-base leading-[1.65] text-[#17212b]">
                These cards are practical prompts, not legal advice. For formal legal disputes, use specialist support.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 sm:mt-0">
              <Link href="/help-cards?concern=Equality%20Act%20rights" className={HC_BTN_GHOST}>
                Equality Act cards →
              </Link>
              <Link href="/advice/rights" className={HC_BTN_GHOST}>
                Rights advice hub →
              </Link>
            </div>
          </div>

          <HelpCardsHub initialConcern={concern} />
        </div>
      </div>
    </div>
  );
}
