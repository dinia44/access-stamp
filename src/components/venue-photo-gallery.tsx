"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type VenuePhoto = {
  src: string;
  alt: string;
  label: string;
  measurement?: string;
};

export function VenuePhotoGallery({ photos }: { photos: VenuePhoto[] }) {
  const [active, setActive] = useState(0);
  const current = photos[active];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-background-2">
        <div className="relative h-[280px] sm:h-[360px]">
          <Image src={current.src} alt={current.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 840px" />
        </div>
        <div className="absolute left-3 top-3 rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-heading shadow-[var(--shadow-soft)]">
          {current.label}
        </div>
        {current.measurement ? (
          <div className="absolute bottom-3 left-3 rounded-full bg-blue px-3 py-1 text-xs font-semibold text-white">
            {current.measurement}
          </div>
        ) : null}
      </div>

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
  );
}
