"use client";

import { Badge, Button, Card } from "@/components/ui";
import { HELP_CARDS, type HelpCard } from "@/lib/help-cards";
import { downloadHelpCardAsPng } from "@/lib/help-card-png";
import { useChat } from "@/components/chat/provider";
import { cn } from "@/lib/utils";

const POCKET_CARD_GROUPS: { heading: string; blurb: string; slugs: readonly string[] }[] = [
  {
    heading: "Core rights and complaints",
    blurb: "Equality Act framing, adjustments, and building a complaint trail that organisations find harder to ignore.",
    slugs: [
      "equality-act-core-rights-card",
      "reasonable-adjustments-card",
      "services-and-public-places-rights-card",
      "formal-complaint-and-evidence-card",
    ],
  },
  {
    heading: "Work and education",
    blurb: "When employers or education providers delay support, or treatment crosses into discrimination.",
    slugs: [
      "workplace-discrimination-response-card",
      "access-to-work-setup-card",
      "education-discrimination-card",
      "school-start-parent-card",
    ],
  },
  {
    heading: "Health, housing, and care",
    blurb: "NHS access, discharge safety, social care friction, and housing refusals that affect independence.",
    slugs: [
      "nhs-communication-reasonable-adjustments-card",
      "hospital-discharge-access-card",
      "care-review-card",
      "housing-access-refusal-card",
    ],
  },
  {
    heading: "Benefits and getting around",
    blurb: "Challenging benefit decisions and standing your ground on buses, trains, and in public spaces.",
    slugs: ["pip-mandatory-reconsideration-basics-card", "public-transport-refusal-card"],
  },
];

function resolveCards(slugs: readonly string[]): HelpCard[] {
  return slugs.map((slug) => HELP_CARDS.find((c) => c.slug === slug)).filter(Boolean) as HelpCard[];
}

function PocketCardTile({ card, openChat }: { card: HelpCard; openChat: ReturnType<typeof useChat>["openChat"] }) {
  return (
    <Card className="flex h-full flex-col border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow)]">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="blue">Pocket card</Badge>
        {card.tags.slice(0, 2).map((tag) => (
          <Badge key={tag} tone="blue" className="text-[11px]">
            {tag}
          </Badge>
        ))}
      </div>
      <h3 className="mt-3 font-[var(--font-heading)] text-lg font-semibold text-heading">{card.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{card.summary}</p>
      <p className="mt-3 rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-xs text-text">
        <span className="font-semibold text-heading">Key line: </span>
        {card.keyLine}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => downloadHelpCardAsPng(card)}>
          Download PNG
        </Button>
        <Button href="/help-cards?concern=Equality%20Act%20rights" variant="secondary">
          All help cards
        </Button>
        <Button
          type="button"
          variant="ghost"
          className={cn("text-sm")}
          onClick={() =>
            openChat({
              prefill: `Tailor this help card for my situation: ${card.title}. `,
            })
          }
        >
          Tailor with AI
        </Button>
      </div>
    </Card>
  );
}

export function RightsPocketCards() {
  const { openChat } = useChat();
  return (
    <div className="space-y-10">
      {POCKET_CARD_GROUPS.map((group) => {
        const cards = resolveCards(group.slugs);
        if (!cards.length) return null;
        return (
          <div key={group.heading} className="space-y-4">
            <div className="max-w-3xl space-y-1">
              <h3 className="font-[var(--font-heading)] text-lg font-semibold text-heading">{group.heading}</h3>
              <p className="text-sm text-muted">{group.blurb}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {cards.map((card) => (
                <PocketCardTile key={card.slug} card={card} openChat={openChat} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
