"use client";

import { useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui";

const STORAGE_KEY = "access-stamp-saved-venues";
const SAVED_CHANGE_EVENT = "access-stamp-saved-change";

function readSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const run = () => cb();
  window.addEventListener("storage", run);
  window.addEventListener(SAVED_CHANGE_EVENT, run);
  return () => {
    window.removeEventListener("storage", run);
    window.removeEventListener(SAVED_CHANGE_EVENT, run);
  };
}

type Props = {
  slug: string;
  venueName: string;
};

export function VenueDetailActions({ slug, venueName }: Props) {
  const [shareLabel, setShareLabel] = useState("Share");

  const saved = useSyncExternalStore(
    subscribe,
    () => readSaved().includes(slug),
    () => false,
  );

  function toggleSave() {
    const next = readSaved();
    const has = next.includes(slug);
    const updated = has ? next.filter((s) => s !== slug) : [...next, slug];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event(SAVED_CHANGE_EVENT));
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
