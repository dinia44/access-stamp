"use client";

import { useState } from "react";
import { readSubmissions } from "@/lib/submission-store";

type QueueItem = {
  id: string;
  name: string;
  location: string;
  moderationStatus: string;
  submittedAt: string;
};

export function SubmissionQueuePreview() {
  const [items] = useState<QueueItem[]>(() => readSubmissions().slice(0, 5));

  return (
    <div>
      <h2 className="text-lg font-semibold text-heading">Moderation queue preview</h2>
      <p className="mt-1 text-sm text-muted">Recent submissions from this device.</p>
      <div className="mt-4 space-y-2">
        {items.length ? (
          items.map((item) => (
            <div key={item.id} className="rounded-[var(--radius-ui)] border border-border bg-background-2 px-3 py-2 text-sm">
              <div className="font-semibold text-heading">{item.name}</div>
              <div className="text-xs text-muted">
                {item.location} · {item.moderationStatus} · {new Date(item.submittedAt).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No queued submissions yet.</p>
        )}
      </div>
    </div>
  );
}
