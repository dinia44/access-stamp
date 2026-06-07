import Link from "next/link";
import { HelpCardsHub } from "@/components/help-cards-hub";
import { PageHero, PageLayout } from "@/components/page-layout";
import { Badge, Card } from "@/components/ui";
import { SetChatContext } from "@/components/chat/set-context";

export default async function HelpCardsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = searchParams ? await searchParams : {};
  const concernRaw = sp.concern;
  const concern = typeof concernRaw === "string" ? concernRaw : Array.isArray(concernRaw) ? concernRaw[0] : "";

  return (
    <PageLayout stack="relaxed" hero>
      <SetChatContext page={{ kind: "none" }} />
      <PageHero
        badge={<Badge tone="blue">Downloadable support tools</Badge>}
        title="Help cards you can carry"
        subtitle="Practical prompts for interviews, school meetings, travel issues, care reviews, and emergencies — download, print, or tailor with AI."
      />

      <Card className="p-6">
        <p className="text-sm leading-7 text-text">
          These cards are practical prompts, not legal advice. For formal legal disputes, use specialist support.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/help-cards?concern=Equality%20Act%20rights"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#F1D8C7] bg-white px-4 text-sm font-semibold text-[#F04A16] transition-colors hover:border-[#E8C4A8] hover:bg-[#FFF3E8]"
          >
            Equality Act cards
          </Link>
          <Link
            href="/advice/rights"
            className="inline-flex min-h-[44px] items-center rounded-full border border-[#F1D8C7] bg-[#FFF7ED] px-4 text-sm font-semibold text-warning transition-colors hover:border-[#FDE68A]"
          >
            Rights advice hub
          </Link>
        </div>
      </Card>

      <HelpCardsHub initialConcern={concern} />
    </PageLayout>
  );
}
