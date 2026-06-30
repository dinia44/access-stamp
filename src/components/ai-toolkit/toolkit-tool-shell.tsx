"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/fade-in";
import { SensitiveDataNotice, useSensitiveDataGate } from "@/components/ai/SensitiveDataNotice";
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
  const requireAck = Boolean(meta.sensitiveDataAck);
  const { acknowledged, setAcknowledged, blocked } = useSensitiveDataGate(requireAck);

  return (
    <div className="premium-section-hero min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI Toolkit", href: "/ai-toolkit" },
            { label: meta.shortTitle },
          ]}
        />

        <FadeIn>
          <div className="page-hero-panel mt-8 space-y-4">
            <Badge tone="blue">{meta.badge}</Badge>
            <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-heading sm:text-4xl">
              {meta.title}
            </h1>
            <p className="text-base leading-7 text-muted">{meta.description}</p>
          </div>
        </FadeIn>

        {requireAck ? (
          <FadeIn delayMs={60}>
            <div className="mt-6">
              <SensitiveDataNotice requireAcknowledgement onAcknowledgedChange={setAcknowledged} />
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delayMs={80}>
          <Card
            className={`mt-8 p-5 md:p-6 ${blocked ? "pointer-events-none opacity-60" : ""}`}
            aria-disabled={blocked || undefined}
          >
            {children}
          </Card>
        </FadeIn>

        {results ? (
          <div ref={resultsRef} className="toolkit-results-print mt-10 space-y-5" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-2xl font-bold tracking-[-0.02em] text-heading">Your results</h2>
              <div className="flex flex-wrap gap-2 print:hidden">
                {onPrint ? (
                  <Button variant="ghost" type="button" onClick={onPrint}>
                    Print / save as PDF
                  </Button>
                ) : null}
                <Link
                  href="/ai-toolkit"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-2xl px-4 text-sm font-semibold text-blue transition-colors hover:bg-blue-pale"
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
    <p className="text-xs text-muted print:hidden" role="status">
      Showing a structured template while personalised results are unavailable. Try generating again in a moment.
    </p>
  );
}
