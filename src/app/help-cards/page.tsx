import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { HelpCardsHub } from "@/components/help-cards-hub";
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
    <div className="bg-background">
      <SetChatContext page={{ kind: "none" }} />
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Downloadable support tools</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Access Stamp Help Cards</h1>
            <p className="max-w-[80ch] text-muted">
              Free practical cards you can download and carry. Use them in interviews, school meetings, travel issues,
              care reviews, transport complaints, and emergency situations.
            </p>
          </div>

          <Card className="p-5">
            <p className="text-sm text-text">
              These cards are practical prompts, not legal advice. For formal legal disputes, use specialist support.
            </p>
          </Card>

          <HelpCardsHub initialConcern={concern} />
        </div>
      </Container>
    </div>
  );
}
