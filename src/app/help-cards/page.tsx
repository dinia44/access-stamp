import Link from "next/link";
import { Atkinson_Hyperlegible } from "next/font/google";
import { HelpCardsPageClient } from "@/features/help-cards/HelpCardsPage";
import { HC_BTN_GHOST, HC_CONTAINER, HC_NOTICE, HC_PAGE_BG } from "@/components/help-cards/help-cards-theme";
import { SetChatContext } from "@/components/chat/set-context";

const helpCardsFont = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-help-cards",
  display: "swap",
});

export default async function HelpCardsPage() {
  return (
    <div className={`${HC_PAGE_BG} ${helpCardsFont.variable} font-[family-name:var(--font-help-cards),Inter,system-ui,sans-serif] text-[#17212b]`}>
      <SetChatContext page={{ kind: "none" }} />
      <div className={HC_CONTAINER}>
        <aside className={`${HC_NOTICE} sm:flex sm:items-center sm:justify-between sm:gap-6`} aria-label="About these cards">
          <div className="flex items-start gap-4 sm:items-center">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff0e8] text-sm text-[#ef5b2a]"
              aria-hidden
            >
              i
            </span>
            <p className="text-base leading-7 text-[#17212b]">
              Source-backed practical prompts, not legal advice. Each card shows sources checked and last reviewed.
              For formal legal disputes, use specialist support.
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 sm:mt-0 sm:shrink-0">
            <Link href="/help-cards" className={HC_BTN_GHOST}>
              Source-backed cards →
            </Link>
            <Link href="/advice/rights" className={HC_BTN_GHOST}>
              Rights advice hub →
            </Link>
          </div>
        </aside>

        <HelpCardsPageClient />
      </div>
    </div>
  );
}
