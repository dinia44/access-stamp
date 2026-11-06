"use client";

import { useState, useSyncExternalStore } from "react";
import { useChat } from "@/components/chat/provider";
import { track } from "@/lib/analytics";
import {
  getSavedVenueSlugsSnapshot,
  subscribeSavedVenues,
  toggleSavedVenueSlug,
} from "@/lib/saved-venues";

const EMPTY_SLUGS: string[] = [];
const serverSnapshot = () => EMPTY_SLUGS;

type Props = {
  slug: string;
  venueName: string;
  variant?: "identity" | "planning";
};

export function VenueDetailActions({
  slug,
  venueName,
  variant = "identity",
}: Props) {
  const [message, setMessage] = useState("");
  const saved = useSyncExternalStore(
    subscribeSavedVenues,
    getSavedVenueSlugsSnapshot,
    serverSnapshot,
  ).includes(slug);
  const { openChat } = useChat();

  async function share() {
    const url = window.location.href;
    const title = `${venueName} · Access Stamp`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        if (!(error instanceof Error && error.name === "AbortError"))
          setMessage(
            "Sharing is unavailable. Copy the address from your browser.",
          );
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Link copied");
    } catch {
      setMessage(
        "Copy the page address from your browser to share this venue.",
      );
    }
  }

  if (variant === "planning")
    return (
      <button
        className="venue-report-text-link venue-report-ai"
        type="button"
        onClick={() => {
          track("ai_tool_started", {
            tool: "venue_chat",
            source: "venue_detail",
          });
          openChat({
            prefill: `I'm viewing ${venueName}. Help me understand its reported access details and what still needs confirming. Treat any demo data as illustrative only.`,
          });
        }}
      >
        Ask AI about this venue
      </button>
    );

  return (
    <div className="venue-report-actions">
      <div className="venue-report-actions-buttons">
        <button
          type="button"
          aria-pressed={saved}
          onClick={() => {
            try {
              const next = toggleSavedVenueSlug(slug);
              setMessage(
                next
                  ? "Venue saved on this device"
                  : "Venue removed from saved places",
              );
            } catch {
              setMessage(
                "Your browser could not save this venue. Please allow local storage and try again.",
              );
            }
          }}
        >
          <svg
            width="19"
            height="21"
            viewBox="0 0 20 24"
            fill={saved ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M4 3h12v18l-6-4-6 4z" />
          </svg>
          {saved ? "Saved" : "Save"}
        </button>
        <button type="button" onClick={share}>
          <svg
            width="20"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M7 8H4v13h16V8h-3M12 16V2m-4 4 4-4 4 4" />
          </svg>
          Share
        </button>
      </div>
      <p role="status" className="venue-report-action-status">
        {message}
      </p>
    </div>
  );
}
