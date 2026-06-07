import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, PageLayout } from "@/components/page-layout";
import { Badge, Button, Card } from "@/components/ui";
import { ToolkitDisclaimer } from "@/components/ai-toolkit/toolkit-disclaimer";
import { AI_TOOLKIT_TOOLS } from "@/lib/ai-toolkit/tools-meta";

export const metadata: Metadata = {
  title: "AI Toolkit — practical plans, letters, and checklists",
  description:
    "Turn your disability problem into a practical action plan, letter, checklist, or support request. Guided tools grounded in UK access and benefits knowledge.",
};

export default function AiToolkitPage() {
  return (
    <PageLayout stack="relaxed" hero>
      <PageHero
        badge={<Badge tone="blue">AI Toolkit</Badge>}
        title="AI Toolkit"
        subtitle="Turn your disability problem into a practical action plan, letter, checklist, or support request. Each tool starts with a short guided form — not a blank chat box."
      />

      <Card className="border-blue/20 bg-gradient-to-br from-blue-pale/60 to-card p-5 md:p-6">
        <p className="text-sm leading-relaxed text-text">
          Access Stamp AI Toolkit is built for <strong className="text-heading">structured outcomes</strong>: next
          steps, evidence lists, draft letters, and venue questions. On Vercel it uses the same{" "}
          <code className="text-sm text-heading">OPENAI_API_KEY</code> as the chat assistant — no extra setup. Use it
          alongside our{" "}
          <Link href="/advice" className="font-semibold text-blue underline-offset-2 hover:underline">
            advice guides
          </Link>{" "}
          and{" "}
          <Link href="/ai" className="font-semibold text-blue underline-offset-2 hover:underline">
            voice assistant
          </Link>{" "}
          when you need open conversation.
        </p>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        {AI_TOOLKIT_TOOLS.map((tool) => (
          <Card key={tool.id} className="flex flex-col p-5">
            <Badge tone="navy" className="w-fit">
              {tool.badge}
            </Badge>
            <h2 className="mt-3 text-xl font-bold tracking-[-0.02em] text-heading">{tool.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{tool.description}</p>
            <div className="mt-4">
              <Button href={tool.href} variant="primary">
                Open tool
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <ToolkitDisclaimer className="max-w-[85ch]" />
    </PageLayout>
  );
}
