"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FadeIn } from "@/components/fade-in";
import { SensitiveDataNotice, useSensitiveDataGate } from "@/components/ai/SensitiveDataNotice";
import { Badge, Button, Card } from "@/components/ui";
import { ToolkitDisclaimer } from "@/components/ai-toolkit/toolkit-disclaimer";
import { ToolkitTrustPanel } from "@/components/ai-toolkit/toolkit-trust-panel";
import { PRACTICAL_TOOLS_LABEL } from "@/lib/ai-toolkit/practical-tools-content";
import type { ToolkitResultSource } from "@/lib/ai-toolkit/types";
import type { ToolkitToolMeta } from "@/lib/ai-toolkit/tools-meta";

export function ToolkitToolShell({
  meta,
  children,
  results,
  resultsRef,
  onPrint,
  hasResult,
}: {
  meta: ToolkitToolMeta;
  children: React.ReactNode;
  results?: React.ReactNode;
  resultsRef?: React.RefObject<HTMLDivElement | null>;
  onPrint?: () => void;
  hasResult?: boolean;
}) {
  const requireAck = Boolean(meta.sensitiveDataAck);
  const { acknowledged, setAcknowledged, blocked } = useSensitiveDataGate(requireAck);

  return (
    <div className="premium-section-hero min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16 lg:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: PRACTICAL_TOOLS_LABEL, href: "/ai-toolkit" },
            { label: meta.shortTitle },
          ]}
        />

        <FadeIn>
          <div className="page-hero-panel mt-8 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="blue">{meta.badge}</Badge>
              <Badge tone="neutral">AI-assisted</Badge>
            </div>
            <h1 className="text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-heading sm:text-4xl">
              {meta.title}
            </h1>
            <p className="text-base leading-7 text-muted">{meta.description}</p>
          </div>
        </FadeIn>

        {requireAck ? (
          <FadeIn delayMs={60}>
            <div className="mt-6 max-w-3xl">
              <SensitiveDataNotice requireAcknowledgement onAcknowledgedChange={setAcknowledged} />
            </div>
          </FadeIn>
        ) : null}

        <FadeIn delayMs={80}>
          <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start">
            <Card
              className={`p-5 md:p-6 ${blocked ? "pointer-events-none opacity-60" : ""}`}
              aria-disabled={blocked || undefined}
            >
              {children}
            </Card>

            <div
              ref={resultsRef}
              className="toolkit-results-print space-y-5 lg:sticky lg:top-6"
              aria-live="polite"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-xl font-bold tracking-[-0.02em] text-heading">
                  {hasResult ? "Your result" : "Your result will appear here"}
                </h2>
                <div className="flex flex-wrap gap-2 print:hidden">
                  {onPrint && hasResult ? (
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

              {results ?? <ToolkitEmptyResults />}

              {hasResult ? <ToolkitTrustPanel /> : null}
              <ToolkitDisclaimer className="border-t border-border pt-4" />
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export function ToolkitEmptyResults() {
  return (
    <Card className="border-dashed border-border bg-background/60 p-5">
      <p className="text-sm leading-relaxed text-muted">
        Complete the form and select <strong className="font-semibold text-heading">Generate</strong>. You&apos;ll get
        a structured draft, checklist, or plan that you can copy, edit, print, or save.
      </p>
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
