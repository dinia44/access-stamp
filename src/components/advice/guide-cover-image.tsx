"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Advice card / hero imagery. Local `.svg` covers use `unoptimized`.
 * Failed remote images fall back to a calm typographic surface — never raw alt text.
 */
export function GuideCoverImage({
  src,
  alt,
  className,
  sizes,
  priority,
  decorative = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
  /** When true, image is decorative (empty alt) even if a string was passed. */
  decorative?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const unoptimized = src.endsWith(".svg");
  const resolvedAlt = decorative ? "" : alt;

  if (failed) {
    return (
      <div
        className="absolute inset-0 flex items-end bg-[var(--color-surface-subtle)] p-4"
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : resolvedAlt || "Guide illustration unavailable"}
      >
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-text-muted)]">
          Access Stamp guide
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
      onError={() => setFailed(true)}
    />
  );
}
