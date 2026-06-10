"use client";

import { useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui";

import {
  readSavedVenueSlugs,
  subscribeSavedVenues,
  toggleSavedVenueSlug,
} from "@/lib/saved-venues";

type Props = {
  slug: string;
  venueName: string;
};

export function VenueDetailActions({ slug, venueName }: Props) {
  const [shareLabel, setShareLabel] = useState("Share");

  const saved = useSyncExternalStore(
    subscribeSavedVenues,
    () => readSavedVenueSlugs().includes(slug),
    () => false,
  );

  function toggleSave() {
    toggleSavedVenueSlug(slug);
  }

  async function onShare() {
    const url = window.location.href;
    const title = `${venueName} · Access Stamp`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* dismissed */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Link copied");
      window.setTimeout(() => setShareLabel("Share"), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  function onReport() {
    const subject = encodeURIComponent(`Venue listing issue: ${venueName}`);
    const body = encodeURIComponent(
      `Venue: ${venueName}\nURL: ${typeof window !== "undefined" ? window.location.href : ""}\n\nWhat’s wrong or missing?\n\n`,
    );
    window.location.href = `mailto:hello@accessstamp.uk?subject=${subject}&body=${body}`;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button href="/ai">Ask the AI about this venue</Button>
      <Button variant="secondary" onClick={toggleSave}>
        {saved ? "Saved" : "Save"}
      </Button>
      <Button variant="ghost" onClick={onShare}>
        {shareLabel}
      </Button>
      <Button variant="ghost" onClick={onReport}>
        Report an issue
      </Button>
    </div>
  );
}
