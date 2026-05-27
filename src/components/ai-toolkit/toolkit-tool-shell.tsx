"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge, Button, Card } from "@/components/ui";
import { ToolkitDisclaimer } from "@/components/ai-toolkit/toolkit-disclaimer";
import { ToolkitTrustPanel } from "@/components/ai-toolkit/toolkit-trust-panel";
import type { ToolkitResultSource } from "@/lib/ai-toolkit/types";
import type { ToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";

export function ToolkitToolShell({
  meta,
  children,
  results,
  resultsRef,
  onPrint,
}: {
  meta: ToolkitToolMeta;
  children: React.ReactNode;
  results?: React.ReactNode;
  resultsRef?: React.RefObject<HTMLDivElement | null>;
  onPrint?: () => void;
}) {
  return (
    <div className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI Toolkit", href: "/ai-toolkit" },
            { label: meta.shortTitle },
          ]}
        />

        <div className="mt-6 space-y-3">
          <Badge tone="blue">{meta.badge}</Badge>
          <h1 className="font-[var(--font-heading)] text-3xl text-heading sm:text-4xl">{meta.title}</h1>
          <p className="text-sm text-muted">{meta.description}</p>
        </div>

        <Card className="mt-8 p-5 md:p-6">{children}</Card>

        {results ? (
          <div ref={resultsRef} className="toolkit-results-print mt-8 space-y-4" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-[var(--font-heading)] text-xl text-heading">Your results</h2>
              <div className="flex flex-wrap gap-2 print:hidden">
                {onPrint ? (
                  <Button variant="ghost" type="button" onClick={onPrint}>
                    Print / save as PDF
                  </Button>
                ) : null}
                <Link
                  href="/ai-toolkit"
                  className="inline-flex items-center justify-center rounded-[var(--radius-ui)] px-4 py-2 text-sm font-semibold text-blue hover:bg-blue-pale"
                >
                  All tools
                </Link>
              </div>
            </div>
            {results}
            <ToolkitTrustPanel />
            <ToolkitDisclaimer className="mt-4 border-t border-border pt-4" />
          </div>
        ) : (
          <div className="mt-6 print:hidden">
            <ToolkitDisclaimer />
          </div>
        )}
      </div>
    </div>
  );
}

export function ToolkitEmptyResults() {
  return (
    <Card className="p-5 text-sm text-muted">
      Complete the form above and select <strong className="text-heading">Generate</strong> to see your structured
      plan here.
    </Card>
  );
}

export function ToolkitError({ message }: { message: string }) {
  return (
    <div role="alert">
      <Card className="border-amber bg-amber-pale p-4 text-sm text-heading">{message}</Card>
    </div>
  );
}

export function ToolkitSourceNote({ source }: { source: ToolkitResultSource }) {
  if (source === "openai") return null;
  if (source === "fallback") {
    return (
      <p className="text-xs text-muted print:hidden" role="status">
        We used a structured template because the AI request did not complete. Try generating again in a moment.
      </p>
    );
  }
  return (
    <p className="text-xs text-muted print:hidden">
      Showing structured preview output. Connect <code className="text-text">OPENAI_API_KEY</code> on the server for
      AI-personalised results (same variable as the chat assistant).
    </p>
  );
}
