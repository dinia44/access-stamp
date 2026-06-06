"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { useChat } from "@/components/chat/provider";
import type { AdvisorAnswer, EquipmentCategory, FundingRoute } from "@/lib/equipment-funding-routes";
import { getRecommendedRoutes } from "@/lib/equipment-funding-routes";

const CATEGORIES: Array<{ value: EquipmentCategory; label: string; icon: string }> = [
  { value: "wheelchair", label: "Wheelchair or powered chair", icon: "🦽" },
  { value: "home", label: "Home adaptation or equipment", icon: "🏠" },
  { value: "vehicle", label: "Vehicle or Motability", icon: "🚗" },
  { value: "tech", label: "Assistive technology", icon: "💻" },
  { value: "other", label: "Something else", icon: "📦" },
];

type Step = "category" | "pip" | "work" | "home" | "results";

function RouteCard({ route }: { route: FundingRoute }) {
  return (
    <Card className="p-5">
      <h3 className="font-[var(--font-heading)] text-lg text-heading">{route.name}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{route.summary}</p>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-semibold text-blue hover:underline">
          Eligibility ({route.eligibility.length} points)
        </summary>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
          {route.eligibility.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      </details>

      <div className="mt-3">
        <div className="text-sm font-semibold text-heading">Next steps</div>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-muted">
          {route.nextSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      {route.links.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {route.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[var(--radius-ui)] border border-border bg-card px-3 py-1 text-xs font-semibold text-blue hover:bg-blue-pale"
            >
              {l.label} ↗
            </a>
          ))}
        </div>
      )}

      <p className="mt-3 rounded-[var(--radius-ui)] border border-amber bg-amber-pale px-3 py-2 text-xs text-warning">
        {route.caveats}
      </p>
    </Card>
  );
}

function YesNoQuestion({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: (yes: boolean) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-heading">{question}</p>
      <div className="flex gap-3">
        <Button variant="secondary" className="border border-border" onClick={() => onAnswer(true)}>
          Yes
        </Button>
        <Button variant="secondary" className="border border-border" onClick={() => onAnswer(false)}>
          No
        </Button>
      </div>
    </div>
  );
}

export function EquipmentFundingAdvisor() {
  const { openChat } = useChat();
  const [step, setStep] = useState<Step>("category");
  const [answers, setAnswers] = useState<AdvisorAnswer>({
    category: "other",
    receivingPip: null,
    inWork: null,
    needsHomeAdaptation: false,
  });
  const [results, setResults] = useState<FundingRoute[]>([]);

  function pickCategory(cat: EquipmentCategory) {
    const next = { ...answers, category: cat };
    setAnswers(next);
    setStep("pip");
  }

  function answerPip(yes: boolean) {
    const next = { ...answers, receivingPip: yes };
    setAnswers(next);
    setStep("work");
  }

  function answerWork(yes: boolean) {
    const next = { ...answers, inWork: yes };
    setAnswers(next);
    if (next.category === "home") {
      const final = { ...next, needsHomeAdaptation: true };
      setAnswers(final);
      setResults(getRecommendedRoutes(final));
      setStep("results");
    } else {
      setStep("home");
    }
  }

  function answerHome(yes: boolean) {
    const final = { ...answers, needsHomeAdaptation: yes };
    setAnswers(final);
    setResults(getRecommendedRoutes(final));
    setStep("results");
  }

  function reset() {
    setStep("category");
    setAnswers({ category: "other", receivingPip: null, inWork: null, needsHomeAdaptation: false });
    setResults([]);
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-blue-pale px-5 py-4 sm:px-6">
        <h2 className="font-[var(--font-heading)] text-xl text-heading">Equipment funding advisor</h2>
        <p className="mt-1 text-sm text-muted">
          Answer a few questions — we&apos;ll show the UK funding routes that are most likely relevant.
          This is guidance, not a guarantee; always confirm with the provider.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        {step === "category" && (
          <div className="space-y-3">
            <p className="text-sm font-semibold text-heading">What kind of equipment or adaptation do you need?</p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => pickCategory(c.value)}
                  className="flex items-center gap-3 rounded-[var(--radius-ui)] border border-border bg-card p-4 text-left text-sm font-semibold text-heading transition-colors hover:bg-blue-pale cursor-pointer"
                >
                  <span className="text-xl" aria-hidden>{c.icon}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "pip" && (
          <YesNoQuestion
            question="Do you currently receive the enhanced mobility component of PIP (or the higher-rate mobility component of DLA)?"
            onAnswer={answerPip}
          />
        )}

        {step === "work" && (
          <YesNoQuestion
            question="Are you currently in paid work or about to start a job (including self-employment)?"
            onAnswer={answerWork}
          />
        )}

        {step === "home" && (
          <YesNoQuestion
            question="Do you also need a home adaptation (e.g. ramp, bathroom, stairlift, door widening)?"
            onAnswer={answerHome}
          />
        )}

        {step === "results" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-heading">
                Based on your answers, here are the routes worth exploring:
              </p>
              <Button variant="ghost" className="shrink-0 border border-border text-xs" onClick={reset}>
                Start again
              </Button>
            </div>

            <div className="grid gap-4">
              {results.map((r) => (
                <RouteCard key={r.name} route={r} />
              ))}
            </div>

            <div className="rounded-[var(--radius-card)] border border-border bg-background-2 p-4">
              <p className="text-sm text-muted">
                <strong className="text-heading">Want help with a specific route?</strong> The AI can walk you through
                eligibility checks, what to say to your council or GP, and what evidence to prepare.
              </p>
              <Button
                variant="secondary"
                className="mt-3 border border-border"
                onClick={() =>
                  openChat({
                    prefill: `I need help with equipment funding. I'm looking at: ${results.slice(0, 3).map((r) => r.name).join(", ")}. Can you help me understand eligibility and next steps?`,
                  })
                }
              >
                Ask Access Stamp AI
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
