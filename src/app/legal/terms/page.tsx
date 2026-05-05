import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

export default function TermsPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">Legal</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Terms</h1>
            <p className="max-w-[85ch] text-muted">
              Placeholder terms of use. We’ll replace this with the real terms once features (accounts, reviews,
              submissions) are finalised.
            </p>
          </div>
          <Card className="p-6">
            <p className="text-sm text-muted">Coming soon.</p>
          </Card>
        </div>
      </Container>
    </div>
  );
}

