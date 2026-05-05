import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

export default function AiPage() {
  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="blue">AI Assistant</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Access Stamp AI</h1>
            <p className="max-w-[85ch] text-muted">
              Ask questions, search venues in plain language, or get step-by-step guidance through advice topics.
              The chat widget is available on every page.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Chatbot</div>
              <p className="mt-2 text-sm text-muted">
                Links to relevant advice articles and venue results, with clear next steps.
              </p>
            </Card>
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Voice</div>
              <p className="mt-2 text-sm text-muted">
                Use voice input via the Web Speech API (where supported), and optional read-aloud responses.
              </p>
            </Card>
            <Card className="p-5">
              <div className="text-sm font-semibold text-heading">Trained on real detail</div>
              <p className="mt-2 text-sm text-muted">
                Grounded in Access Stamp venue data and practical guidance so answers stay useful and specific.
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <div className="text-sm font-semibold text-heading">What this helps with</div>
            <p className="mt-2 text-sm text-muted">
              Ask questions in plain language to get practical next steps for venues, rights, equipment, transport,
              care support, and common UK accessibility processes.
            </p>
          </Card>
        </div>
      </Container>
    </div>
  );
}

