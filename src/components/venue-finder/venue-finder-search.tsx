"use client";

import { useMemo, useState } from "react";
import { useChat } from "@/components/chat/provider";

const FILTERS = [
  { label: "Step-free access", key: "Step-free entrance", tone: "blue" },
  { label: "Accessible toilet", key: "Accessible toilet", tone: "green" },
  { label: "Hearing loop", key: "Staff disability awareness", tone: "purple" },
  { label: "Lift access", key: "Lift access", tone: "teal" },
  { label: "Parking", key: "Nearby Blue Badge parking", tone: "orange" },
] as const;

const DEFAULT_ACTIVE = new Set<string>(["Step-free entrance", "Accessible toilet", "Nearby Blue Badge parking"]);

const RECENT_SEARCHES = [
  "Step-free restaurant in Leeds with parking",
  "Accessible museum in Liverpool",
  "Cinema with hearing loop near Manchester",
] as const;

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  location: string;
  onLocationChange: (value: string) => void;
  selectedFilters: string[];
  onToggleFilter: (key: string) => void;
  onClearFilters: () => void;
  onSearch: () => void;
  onUseLocation: () => void;
  locating: boolean;
};

export function VenueFinderSearchForm({
  query,
  onQueryChange,
  location,
  onLocationChange,
  selectedFilters,
  onToggleFilter,
  onClearFilters,
  onSearch,
  onUseLocation,
  locating,
}: Props) {
  const { openChat } = useChat();
  const active = useMemo(() => new Set(selectedFilters), [selectedFilters]);

  return (
    <div className="vf-search-form space-y-4">
      <div className="vf-search-row">
        <label htmlFor="vf-search-main" className="vf-search-field">
          <span className="vf-search-field-icon" aria-hidden>
            ⌕
          </span>
          <span className="vf-search-field-inner">
            <span className="vf-search-field-label">Search for a venue, place, or access need</span>
            <input
              id="vf-search-main"
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSearch();
              }}
              className="vf-search-field-input"
              placeholder="e.g. Step-free restaurant in Leeds with parking"
              autoComplete="off"
            />
          </span>
        </label>

        <label htmlFor="vf-search-location" className="vf-search-field">
          <span className="vf-search-field-icon" aria-hidden>
            ⌖
          </span>
          <span className="vf-search-field-inner">
            <span className="vf-search-field-label">Location</span>
            <input
              id="vf-search-location"
              type="search"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="vf-search-field-input"
              placeholder="Enter city, town or postcode"
              autoComplete="postal-code"
            />
          </span>
        </label>

        <button type="button" className="vf-btn-primary vf-search-submit" onClick={onSearch}>
          Find access-checked venues
        </button>
      </div>

      <div className="vf-search-quick-links">
        {RECENT_SEARCHES.map((item) => (
          <button
            key={item}
            type="button"
            className="vf-search-quick-link"
            onClick={() => onQueryChange(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="vf-search-ai-row">
        <button
          type="button"
          className="vf-search-ai"
          onClick={() =>
            openChat({
              prefill:
                query ||
                `Find accessible venues${location ? ` in ${location}` : ""}${active.size ? ` with ${Array.from(active).join(", ")}` : ""}.`,
            })
          }
        >
          <span className="vf-search-ai-icon" aria-hidden>
            ✦
          </span>
          <span className="vf-search-ai-copy">
            <span className="vf-search-ai-title">
              Ask Access Stamp AI <span className="vf-search-ai-beta">BETA</span>
            </span>
            <span className="vf-search-ai-sub">
              Get help finding venues, understanding accessibility, and planning your visit.
            </span>
          </span>
          <span className="vf-search-ai-chevron" aria-hidden>
            ›
          </span>
        </button>
        <button type="button" className="vf-search-location-btn" onClick={onUseLocation} disabled={locating}>
          {locating ? "Finding location…" : "Use my location"}
        </button>
      </div>

      <div>
        <div className="vf-search-filters-head">
          <p className="vf-search-filters-label">Access filters ({active.size})</p>
          {active.size > 0 ? (
            <button type="button" className="vf-search-filters-clear" onClick={onClearFilters}>
              Clear
            </button>
          ) : null}
        </div>
        <div className="vf-search-filters">
          {FILTERS.map(({ label, key, tone }) => {
            const on = active.has(key);
            return (
              <button
                key={key}
                type="button"
                className="vf-filter-chip"
                data-active={on ? "true" : "false"}
                data-tone={tone}
                aria-pressed={on}
                onClick={() => onToggleFilter(key)}
              >
                {on ? "✓ " : ""}
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="vf-search-hint">
        Or describe what you need, for example:{" "}
        <em>wheelchair-friendly museum in Liverpool with accessible toilets</em>
      </p>
    </div>
  );
}
