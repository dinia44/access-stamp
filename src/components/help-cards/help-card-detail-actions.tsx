"use client";

import { useId, useState } from "react";
import type { HelpCard } from "@/data/help-cards/types";
import type { HelpCardDownloadResolveResult } from "@/data/help-cards/download-types";
import { helpCardDownloadFilename } from "@/lib/help-cards/download-filename";

type SaveState = "idle" | "preparing" | "saved" | "failed" | "unavailable";
type Format = "pdf" | "txt";

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function announcementFor(state: SaveState, format: Format | null, title: string): string {
  if (!format) return "";
  const label = format === "pdf" ? "PDF" : "text file";
  if (state === "preparing") return `Preparing the ${label} of ${title}`;
  if (state === "saved") return `${title} ${label} download started`;
  if (state === "failed") return `Could not download the ${label} of ${title}. You can try again.`;
  if (state === "unavailable") {
    return `The PDF of ${title} is unavailable because curated card content has not been approved.`;
  }
  return "";
}

export function HelpCardDetailActions({
  card,
  download,
}: {
  card: HelpCard;
  download: HelpCardDownloadResolveResult;
}) {
  const liveId = useId();
  const [pdfState, setPdfState] = useState<SaveState>(download.ok ? "idle" : "unavailable");
  const [txtState, setTxtState] = useState<SaveState>(download.ok ? "idle" : "unavailable");
  const [activeFormat, setActiveFormat] = useState<Format | null>(null);

  const available = download.ok;
  const reviewedAt = available ? download.document.reviewedAt : "";

  async function downloadFormat(format: Format) {
    if (!available) {
      setActiveFormat(format);
      if (format === "pdf") setPdfState("unavailable");
      else setTxtState("unavailable");
      return;
    }

    const setState = format === "pdf" ? setPdfState : setTxtState;
    setActiveFormat(format);
    setState("preparing");

    try {
      const response = await fetch(`/api/help-cards/${card.slug}/${format}`, {
        method: "GET",
        headers: { Accept: format === "pdf" ? "application/pdf" : "text/plain" },
      });

      if (response.status === 409) {
        setState("unavailable");
        return;
      }
      if (!response.ok) {
        setState("failed");
        return;
      }

      const blob = await response.blob();
      triggerBlobDownload(blob, helpCardDownloadFilename(card.slug, reviewedAt, format));
      setState("saved");
      window.setTimeout(() => setState("idle"), 2500);
    } catch {
      setState("failed");
    }
  }

  const pdfLabel =
    pdfState === "preparing"
      ? "Preparing PDF…"
      : pdfState === "saved"
        ? "PDF download started"
        : pdfState === "failed"
          ? "PDF failed — try again"
          : pdfState === "unavailable"
            ? "PDF unavailable"
            : "Download this card";

  const txtLabel =
    txtState === "preparing"
      ? "Preparing text…"
      : txtState === "saved"
        ? "Text download started"
        : txtState === "failed"
          ? "Text failed — try again"
          : txtState === "unavailable"
            ? "Plain text unavailable"
            : "Download as text";

  const buttonClass =
    "inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="no-print space-y-3">
      <p className="text-sm leading-6 text-[var(--color-text-muted)]">
        Take a short version with you — something you can show, read aloud, or keep on your phone.
      </p>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => downloadFormat("pdf")}
          disabled={pdfState === "preparing" || pdfState === "unavailable"}
          aria-label={`Download this card as a PDF of ${card.title}`}
          className={`${buttonClass} border-[var(--color-brand)] bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-hover)]`}
        >
          {pdfLabel}
        </button>
        <button
          type="button"
          onClick={() => downloadFormat("txt")}
          disabled={txtState === "preparing" || txtState === "unavailable"}
          aria-label={`Download ${card.title} as text`}
          className={`${buttonClass} border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand)]`}
        >
          {txtLabel}
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          disabled={!available}
          aria-label={`Print ${card.title} card`}
          className={`${buttonClass} border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-brand)]`}
        >
          Print card
        </button>
      </div>
      {!available ? (
        <p role="status" className="text-sm leading-6 text-[var(--color-ink)]">
          The downloadable card is not ready yet. The page above is still the reviewed source.
        </p>
      ) : (
        <p className="text-sm leading-6 text-[var(--color-text-muted)]">
          Downloads are saved to this device and may be visible to other people who use it. Access Stamp does not
          save them to an account.
        </p>
      )}
      <p
        id={liveId}
        className="sr-only"
        data-help-card-download-status=""
        aria-live="polite"
        aria-atomic="true"
      >
        {announcementFor(activeFormat === "txt" ? txtState : pdfState, activeFormat, card.title)}
      </p>
    </div>
  );
}
