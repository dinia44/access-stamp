"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useChat } from "@/components/chat/provider";
import { searchAccessStamp } from "@/data/searchIndex";
import { Button } from "@/components/ui/Button";
import {
  HOME_GLASS_PANEL,
  HOME_INPUT,
  homeChipClass,
  homeTabClass,
} from "@/components/home/home-theme";

function ChipIcon({ label }: { label: string }) {
  const cls = "h-4 w-4 shrink-0 text-[#F04A16]";
  if (label === "Step-free access") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M10 18h5M12 6v6m-2 0h4" />
      </svg>
    );
  }
  if (label === "Accessible toilet") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M8 3v3M16 3v3M5 8h14v12H5z" />
      </svg>
    );
  }
  if (label === "Parking") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8Z" />
      </svg>
    );
  }
  if (label === "Seating") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 10v4M20 10v4M7 8v8M12 6v12M17 8v8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 3a9 9 0 0 0-9 9v7h18v-7a9 9 0 0 0-9-9z" />
      <path d="M8 14h8" />
    </svg>
  );
}

type SearchMode = "venue" | "ai" | "advice";

const SEARCH_MODES: { id: SearchMode; label: string }[] = [
  { id: "venue", label: "Find venues" },
  { id: "ai", label: "Ask AI" },
  { id: "advice", label: "Get advice" },
];

const VENUE_CHIPS = [
  { label: "Step-free access", key: "Step-free entrance", href: null },
  { label: "Accessible toilet", key: "Accessible toilet", href: null },
  { label: "Parking", key: "Nearby Blue Badge parking", href: null },
  { label: "Seating", key: "Turning space (150cm+)", href: null },
  { label: "Hearing support", key: null, href: "/venue-finder?filters=Hearing+loop" },
] as const;

const AI_PROMPT_CHIPS = [
  "Find step-free restaurants near me",
  "What should I check before visiting a new venue?",
  "Help me understand Blue Badge parking rules",
  "Explain PIP in plain English",
] as const;

const ADVICE_TOPIC_CHIPS = [
  { label: "Care support", href: "/advice/care" },
  { label: "Workplace", href: "/advice/workplace" },
  { label: "Education", href: "/advice/education" },
] as const;

type AccessStampSearchBoxProps = {
  integrated?: boolean;
};

export function AccessStampSearchBox({ integrated = false }: AccessStampSearchBoxProps) {
  const router = useRouter();
  const { openChat } = useChat();
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("venue");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const isVenueSearch = mode === "venue";
  const isAiSearch = mode === "ai";

  const venueSubmitLabel =
    selectedFilters.length === 0
      ? "Search venues"
      : `Search with ${selectedFilters.length} filter${selectedFilters.length > 1 ? "s" : ""}`;

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));
  };

  const selectMode = useCallback((id: SearchMode) => setMode(id), []);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const order: SearchMode[] = ["venue", "ai", "advice"];
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectMode(order[(index + 1) % order.length]);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectMode(order[(index - 1 + order.length) % order.length]);
    }
  };

  const goToVenueFinder = (extra?: { filters?: string[] }) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (location.trim()) params.set("location", location.trim());
    const filters = extra?.filters ?? selectedFilters;
    if (filters.length) params.set("filters", filters.join(","));
    router.push(params.toString() ? `/venue-finder?${params.toString()}` : "/venue-finder");
  };

  const handleAdviceSearch = () => {
    const trimmed = query.trim();

    if (trimmed) {
      const results = searchAccessStamp(trimmed, 5);
      const topHit = results.find((item) => !item.comingSoon);
      if (topHit) {
        router.push(topHit.url);
        return;
      }
      router.push(`/advice?q=${encodeURIComponent(trimmed)}`);
      return;
    }

    router.push("/advice");
  };

  const handlePlatformSearch = () => {
    if (isVenueSearch) {
      goToVenueFinder();
      return;
    }

    if (isAiSearch) {
      openChat({
        prefill: aiQuery.trim() || "Help me with a practical accessibility question for the UK.",
      });
      return;
    }

    handleAdviceSearch();
  };

  const panelClass = integrated
    ? "relative z-20 scroll-mt-28 w-full rounded-3xl border border-[#F1D8C7]/80 bg-white/95 p-6 shadow-xl shadow-[#F04A16]/8 backdrop-blur-xl sm:p-7 lg:p-8"
    : `relative z-20 scroll-mt-28 w-full ${HOME_GLASS_PANEL} p-6 lg:p-8`;

  const modeDescription = isVenueSearch
    ? "Search access-checked venues by place, town, or access need."
    : isAiSearch
      ? "Ask practical questions about venues, rights, travel, care, work, and equipment."
      : "Search practical UK guidance on rights, travel, care, work, and equipment.";

  return (
    <div id="platform-search" className={panelClass}>
      {integrated ? (
        <p id="platform-search-description" className="sr-only">
          {modeDescription}
        </p>
      ) : (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-[#13201F] sm:text-xl">What do you need help with?</h2>
          <p id="platform-search-description" className="mt-1.5 text-base leading-relaxed text-[#5E6A66]">
            {modeDescription}
          </p>
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-4 border-b border-[#EFE5DA]" role="tablist" aria-label="Search mode">
        {SEARCH_MODES.map(({ id, label }, index) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`search-tab-${id}`}
            aria-selected={mode === id}
            aria-controls={`search-panel-${id}`}
            tabIndex={mode === id ? 0 : -1}
            onClick={() => selectMode(id)}
            onKeyDown={(event) => onTabKeyDown(event, index)}
            className={homeTabClass(mode === id)}
          >
            {label}
          </button>
        ))}
      </div>

      {isAiSearch ? (
        <div
          role="tabpanel"
          id="search-panel-ai"
          aria-labelledby="search-tab-ai"
          className="space-y-4"
        >
          <div className="rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8]/80 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFE2D3] text-lg text-[#F04A16]"
                aria-hidden="true"
              >
                ✦
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-[#13201F]">Ask the AI Access Assistant</p>
                <p className="mt-1 text-sm leading-6 text-[#5E6A66]">
                  Get practical next steps on venues, rights, travel, care, and equipment — grounded in UK
                  accessibility guidance.
                </p>
              </div>
            </div>

            <label htmlFor="platform-ai-query" className="mt-4 block text-base font-medium text-[#2A3836]">
              Your question
            </label>
            <input
              id="platform-ai-query"
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="e.g. Find step-free cafés near Manchester with accessible toilets"
              className={`${HOME_INPUT} mt-2`}
              autoComplete="off"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  openChat({
                    prefill: aiQuery.trim() || "Help me with a practical accessibility question for the UK.",
                  });
                }
              }}
            />

            <Button
              type="button"
              className="mt-4 w-full sm:w-auto"
              aria-label="Ask the AI Access Assistant"
              onClick={() =>
                openChat({
                  prefill: aiQuery.trim() || "Help me with a practical accessibility question for the UK.",
                })
              }
            >
              Ask the AI Access Assistant
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {AI_PROMPT_CHIPS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => {
                  setAiQuery(prompt);
                  openChat({ prefill: prompt });
                }}
                className={homeChipClass(false)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <form
          role="tabpanel"
          id={`search-panel-${mode}`}
          aria-labelledby={`search-tab-${mode}`}
          onSubmit={(e) => {
            e.preventDefault();
            handlePlatformSearch();
          }}
        >
          <div className={`grid gap-4 ${isVenueSearch ? "lg:grid-cols-2" : "lg:grid-cols-[minmax(0,1fr)_auto]"}`}>
            <div>
              <label htmlFor="platform-search-query" className="mb-2 block text-base font-medium text-[#2A3836]">
                {isVenueSearch ? "Search for a venue or place" : "Search topic"}
              </label>
              <input
                id="platform-search-query"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isVenueSearch ? "Search for a venue or place" : "Search PIP, travel, care, work, equipment…"
                }
                className={HOME_INPUT}
                autoComplete="off"
                aria-describedby="platform-search-description"
              />
            </div>

            {isVenueSearch ? (
              <div>
                <label htmlFor="platform-search-location" className="mb-2 block text-base font-medium text-[#2A3836]">
                  Location or postcode
                </label>
                <input
                  id="platform-search-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location or postcode"
                  className={HOME_INPUT}
                  autoComplete="postal-code"
                  aria-describedby="platform-search-description"
                />
              </div>
            ) : null}

            {!isVenueSearch ? (
              <div className="flex items-end">
                <Button type="submit" className="w-full lg:min-w-[200px]">
                  Get advice
                </Button>
              </div>
            ) : null}
          </div>

          {isVenueSearch ? (
            <Button type="submit" className="mt-4 w-full">
              {venueSubmitLabel}
            </Button>
          ) : null}
        </form>
      )}

      {isVenueSearch ? (
        <>
          <div className="mt-5 flex flex-wrap gap-2">
            {VENUE_CHIPS.map(({ label, key, href }) => {
              if (href) {
                return (
                  <button key={label} type="button" onClick={() => router.push(href)} className={homeChipClass(false)}>
                    <ChipIcon label={label} />
                    {label}
                  </button>
                );
              }

              const active = key ? selectedFilters.includes(key) : false;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (!key) return;
                    toggleFilter(key);
                  }}
                  aria-pressed={active}
                  className={homeChipClass(active)}
                >
                  <ChipIcon label={label} />
                  {label}
                </button>
              );
            })}

          </div>

        </>
      ) : null}

      {!isAiSearch && !isVenueSearch ? (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {ADVICE_TOPIC_CHIPS.map(({ label, href }) => (
              <button key={label} type="button" onClick={() => router.push(href)} className={homeChipClass(false)}>
                {label}
              </button>
            ))}
          </div>
          <Link
            href="/advice"
            className="link-arrow inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline"
          >
            Browse all guides
          </Link>
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use AccessStampSearchBox */
export const VenueFinderBox = AccessStampSearchBox;
