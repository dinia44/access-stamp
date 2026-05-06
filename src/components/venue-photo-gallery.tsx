"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type VenuePhoto = {
  src: string;
  alt: string;
  label: string;
  measurement?: string;
};

export function VenuePhotoGallery({ photos }: { photos: VenuePhoto[] }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const current = photos[active];

  function goNext() {
    setActive((prev) => (prev + 1) % photos.length);
  }

  function goPrev() {
    setActive((prev) => (prev - 1 + photos.length) % photos.length);
  }

  useEffect(() => {
    if (!expanded) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setExpanded(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded, photos.length]);

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="relative block w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-background-2 text-left"
          aria-label={`Expand photo: ${current.label}`}
        >
          <div className="relative h-[280px] sm:h-[360px]">
            <Image src={current.src} alt={current.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 840px" />
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-heading shadow-[var(--shadow-soft)]">
            Expand
          </div>
          <div className="absolute left-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-heading shadow-[var(--shadow-soft)]">
            {current.label}
          </div>
          {current.measurement ? (
            <div className="absolute bottom-3 left-3 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
              {current.measurement}
            </div>
          ) : null}
        </button>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {photos.map((photo, idx) => (
            <button
              key={`${photo.src}-${photo.label}`}
              type="button"
              onClick={() => setActive(idx)}
              className={cn(
                "relative overflow-hidden rounded-[var(--radius-ui)] border bg-background-2 text-left",
                idx === active ? "border-blue ring-2 ring-blue/25" : "border-border",
              )}
              aria-label={`Open photo: ${photo.label}`}
            >
              <div className="relative h-20">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="140px" />
              </div>
              <div className="truncate px-2 py-1 text-[11px] font-semibold text-heading">{photo.label}</div>
            </button>
          ))}
        </div>
      </div>

      {expanded ? (
        <div className="fixed inset-0 z-[120] bg-black/85 p-4 sm:p-8" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setExpanded(false)}
          >
            Close
          </button>

          <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-center">
            <button
              type="button"
              aria-label="Previous image"
              onClick={goPrev}
              className="mr-3 rounded-full bg-white/15 p-3 text-2xl font-bold text-white"
            >
              ←
            </button>

            <div className="relative flex-1 overflow-hidden rounded-[var(--radius-card)] bg-black">
              <div className="relative h-[55vh] sm:h-[68vh]">
                <Image src={current.src} alt={current.alt} fill className="object-contain" sizes="90vw" />
              </div>
              <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white">
                {current.label}
              </div>
              {current.measurement ? (
                <div className="absolute bottom-3 left-3 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
                  {current.measurement}
                </div>
              ) : null}
            </div>

            <button
              type="button"
              aria-label="Next image"
              onClick={goNext}
              className="ml-3 rounded-full bg-white/15 p-3 text-2xl font-bold text-white"
            >
              →
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

