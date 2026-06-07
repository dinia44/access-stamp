"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useChat } from "@/components/chat/provider";
import { searchAccessStamp } from "@/data/searchIndex";
import {
  HOME_BTN_PRIMARY,
  HOME_GLASS_PANEL,
  HOME_INPUT,
  homeChipClass,
  homeTabClass,
} from "@/components/home/home-theme";

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
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);

  const isVenueSearch = mode === "venue";
  const isAiSearch = mode === "ai";

  const toggleFilter = (key: string) => {
    setSelectedFilters((prev) => (prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]));
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

  const handleMoreFilters = () => {
    if (isVenueSearch) {
      goToVenueFinder();
      return;
    }
    router.push("/advice");
  };

  const panelClass = integrated
    ? "relative z-20 scroll-mt-28 w-full rounded-3xl border border-[#93C5FD]/60 bg-white/95 p-6 shadow-xl shadow-[#2563EB]/10 backdrop-blur-xl sm:p-7 lg:p-8"
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
          <h2 className="text-lg font-semibold text-[#0B1D3A] sm:text-xl">What do you need help with?</h2>
          <p id="platform-search-description" className="mt-1.5 text-base leading-relaxed text-[#3B6B9A]">
            {modeDescription}
          </p>
        </div>
      )}

      <div className="mb-5 flex flex-wrap gap-2" role="tablist" aria-label="Search mode">
        {SEARCH_MODES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`search-tab-${id}`}
            aria-selected={mode === id}
            aria-controls={`search-panel-${id}`}
            onClick={() => setMode(id)}
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
          <div className="rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF]/80 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DBEAFE] text-lg text-[#0891B2]"
                aria-hidden="true"
              >
                ✦
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-base font-semibold text-[#0B1D3A]">Ask the AI Access Assistant</p>
                <p className="mt-1 text-sm leading-6 text-[#3B6B9A]">
                  Get practical next steps on venues, rights, travel, care, and equipment — grounded in UK
                  accessibility guidance.
                </p>
              </div>
            </div>

            <label htmlFor="platform-ai-query" className="mt-4 block text-base font-medium text-[#1E3A5F]">
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

            <button
              type="button"
              onClick={() =>
                openChat({
                  prefill: aiQuery.trim() || "Help me with a practical accessibility question for the UK.",
                })
              }
              className={`${HOME_BTN_PRIMARY} mt-4 w-full sm:w-auto`}
            >
              Ask the AI Access Assistant
            </button>
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
              <label htmlFor="platform-search-query" className="mb-2 block text-base font-medium text-[#1E3A5F]">
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
                <label htmlFor="platform-search-location" className="mb-2 block text-base font-medium text-[#1E3A5F]">
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
                <button type="submit" className={`${HOME_BTN_PRIMARY} w-full lg:min-w-[200px]`}>
                  Get advice
                </button>
              </div>
            ) : null}
          </div>

          {isVenueSearch ? (
            <button type="submit" className={`${HOME_BTN_PRIMARY} mt-4 w-full`}>
              Search accessible places
            </button>
          ) : null}
        </form>
      )}

      {isVenueSearch ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {VENUE_CHIPS.map(({ label, key, href }) => {
            if (href) {
              return (
                <button key={label} type="button" onClick={() => router.push(href)} className={homeChipClass(false)}>
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
                {label}
              </button>
            );
          })}

          {moreFiltersOpen ? (
            <>
              <button type="button" onClick={() => router.push("/advice/care")} className={homeChipClass(false)}>
                Care support
              </button>
              <button type="button" onClick={() => router.push("/advice/workplace")} className={homeChipClass(false)}>
                Workplace
              </button>
              <button type="button" onClick={() => router.push("/advice/education")} className={homeChipClass(false)}>
                Education
              </button>
            </>
          ) : null}

          <button
            type="button"
            onClick={() => {
              if (moreFiltersOpen) {
                handleMoreFilters();
                return;
              }
              setMoreFiltersOpen(true);
            }}
            className={homeChipClass(false)}
            aria-expanded={moreFiltersOpen}
          >
            {moreFiltersOpen ? "Search with filters" : "More filters"}
          </button>
        </div>
      ) : null}

      {!isAiSearch && !isVenueSearch ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {["PIP guidance", "Travel support", "Rights & adjustments", "Equipment funding"].map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => {
                setQuery(label);
                router.push(`/advice?q=${encodeURIComponent(label)}`);
              }}
              className={homeChipClass(false)}
            >
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** @deprecated Use AccessStampSearchBox */
export const VenueFinderBox = AccessStampSearchBox;
