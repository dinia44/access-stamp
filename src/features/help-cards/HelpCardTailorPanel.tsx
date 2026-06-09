"use client";

import { useState } from "react";
import { useChat } from "@/components/chat/provider";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import type { HelpCard } from "@/lib/help-cards";
import {
  HC_INNER_CARD,
  HC_PAGE_SECTION,
  HC_SECTION_PADDING,
  HC_SECTION_TITLE,
} from "@/components/help-cards/help-cards-theme";

export function HelpCardTailorPanel({ card }: { card?: HelpCard }) {
  const { openChat } = useChat();
  const [where, setWhere] = useState("");
  const [who, setWho] = useState("");
  const [need, setNeed] = useState("");
  const [outcome, setOutcome] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [format, setFormat] = useState("short script");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function buildPrompt() {
    const title = card?.title ?? "a help card";
    return [
      `Tailor ${title} for my situation.`,
      where ? `Where I'm going: ${where}.` : "",
      who ? `Who I'm speaking to: ${who}.` : "",
      need ? `Access need to explain: ${need}.` : "",
      outcome ? `Outcome I want: ${outcome}.` : "",
      urgent ? "This is urgent." : "",
      `Please give me a ${format}.`,
      "Include: quick script, questions to ask, evidence checklist, follow-up wording, and important limits.",
    ]
      .filter(Boolean)
      .join(" ");
  }

  function handleTailor() {
    setLoading(true);
    setError(null);
    try {
      openChat({ prefill: buildPrompt() });
    } catch {
      setError("Could not open AI tailoring. Please try again.");
    } finally {
      window.setTimeout(() => setLoading(false), 1200);
    }
  }

  return (
    <section
      aria-labelledby="tailor-help-card"
      className={`${HC_PAGE_SECTION} ${HC_SECTION_PADDING}`}
    >
      <div className={`${HC_INNER_CARD} p-5 sm:p-7`}>
        <h2 id="tailor-help-card" className={HC_SECTION_TITLE}>
          Tailor a card with AI
        </h2>
        <p className="mt-3 text-base leading-7 text-[#5f6b76]">
          Answer a few questions and get a personalised script, checklist and follow-up wording.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <TextInput label="Where are you going?" value={where} onChange={(e) => setWhere(e.target.value)} />
          <TextInput label="Who are you speaking to?" value={who} onChange={(e) => setWho(e.target.value)} />
          <TextInput
            label="What access need do you need to explain?"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
          />
          <TextInput label="What outcome do you want?" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="flex min-h-11 items-center gap-2 text-sm font-semibold text-[#17212b]">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} />
            Is this urgent?
          </label>
          <label className="text-sm font-semibold text-[#17212b]">
            Output format
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="ml-2 min-h-11 rounded-xl border border-[#ead2bf] bg-white px-3 py-2"
            >
              <option value="short script">Short script</option>
              <option value="longer explanation">Longer explanation</option>
              <option value="checklist">Checklist</option>
              <option value="email">Email</option>
            </select>
          </label>
        </div>

        {error ? (
          <p className="mt-4 text-sm font-semibold text-[#b42318]" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-6">
          <Button
            variant="primary"
            isLoading={loading}
            onClick={handleTailor}
            aria-label={card ? `Tailor ${card.title} with AI` : "Tailor help card with AI"}
          >
            {loading ? "Opening AI…" : "Tailor with AI"}
          </Button>
        </div>
      </div>
    </section>
  );
}
