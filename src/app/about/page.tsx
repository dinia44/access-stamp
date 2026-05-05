import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";
import { Badge, Card } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">About</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">About Access Stamp</h1>
            <p className="max-w-[85ch] text-muted">
              Access Stamp is a practical resource platform for disabled people, wheelchair users, carers, older people,
              and families in the UK. Built from lived experience.
            </p>
          </div>

          <Card className="p-6">
            <div className="grid gap-6 md:grid-cols-[200px_1fr] md:items-start">
              <SiteLogo className="h-auto w-full max-w-[190px] object-contain" />
              <div className="space-y-3">
                <div className="text-sm font-semibold text-heading">What we are</div>
                <p className="text-sm leading-7 text-text">
                  Not a charity. Not a corporate compliance tool. A serious platform for people who need accurate,
                  practical information.
                </p>
                <div className="grid gap-3 md:grid-cols-3">
                  {["Treat people as capable adults", "Be specific and useful", "Be honest about system failures"].map(
                    (v) => (
                      <div key={v} className="rounded-[var(--radius-card)] border border-border bg-background p-4">
                        <div className="text-sm font-semibold text-heading">{v}</div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

