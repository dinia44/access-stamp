"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { EXAMPLE_VENUE_PHOTOS } from "@/lib/venue-photo-examples";

type VenuePhoto = {
  src: string;
  alt: string;
  label: string;
  measurement?: string;
};
type Props = {
  photos: VenuePhoto[];
  isExample?: boolean;
  initialIndex?: number;
};

function imageSource(src: string, width: number) {
  return src.includes("/upload/")
    ? src.replace("/upload/", `/upload/f_auto,q_auto:good,c_limit,w_${width}/`)
    : src;
}
function Chevron({ previous = false }: { previous?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden="true"
    >
      <path d={previous ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} />
    </svg>
  );
}

export function VenuePhotoGallery(props: Props) {
  if (!props.photos.length) return <p>No venue photos are available yet.</p>;
  return <Gallery {...props} />;
}

function Gallery({ photos, isExample = false, initialIndex = 0 }: Props) {
  const [active, setActive] = useState(
    Math.min(Math.max(initialIndex, 0), photos.length - 1),
  );
  const [expanded, setExpanded] = useState(false);
  const [broken, setBroken] = useState<Record<number, boolean>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const thumbnailsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const current = photos[active];
  const credit = isExample
    ? Object.values(EXAMPLE_VENUE_PHOTOS).find(
        (photo) => photo.src === current.src,
      )
    : undefined;
  const multiple = photos.length > 1;

  function move(direction: number) {
    setActive((index) => (index + direction + photos.length) % photos.length);
  }
  function markBroken(index: number) {
    setBroken((old) => ({ ...old, [index]: true }));
  }
  function openGallery(trigger: HTMLElement) {
    openerRef.current = trigger;
    setExpanded(true);
  }
  function closeGallery() {
    setExpanded(false);
  }

  // Reveal the selected thumbnail without moving the page itself.
  useEffect(() => {
    const strip = stripRef.current;
    const button = thumbnailsRef.current[active];
    if (!strip || !button) return;
    const bounds = strip.getBoundingClientRect();
    const item = button.getBoundingClientRect();
    if (item.left < bounds.left) strip.scrollLeft -= bounds.left - item.left;
    else if (item.right > bounds.right)
      strip.scrollLeft += item.right - bounds.right;
  }, [active]);

  // Native modal makes the background inert. Restore scroll and focus on close.
  useEffect(() => {
    if (!expanded) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus({ preventScroll: true });
    };
  }, [expanded]);

  function onPointerDown(event: PointerEvent) {
    suppressClick.current = false;
    touchStart.current =
      event.pointerType === "touch" || event.pointerType === "pen"
        ? { x: event.clientX, y: event.clientY }
        : null;
  }
  function onPointerUp(event: PointerEvent) {
    if (!touchStart.current) return;
    const dx = event.clientX - touchStart.current.x;
    const dy = event.clientY - touchStart.current.y;
    touchStart.current = null;
    if (multiple && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      suppressClick.current = true;
      move(dx < 0 ? 1 : -1);
    }
  }
  function onDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") {
      onGalleryKeyDown(event);
      return;
    }
    // Keep Tab within the viewer instead of cycling through browser chrome.
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function onGalleryKeyDown(event: KeyboardEvent) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    }
  }
  function onThumbnailKeyDown(event: KeyboardEvent, index: number) {
    let target: number;
    if (event.key === "ArrowRight") target = (index + 1) % photos.length;
    else if (event.key === "ArrowLeft")
      target = (index - 1 + photos.length) % photos.length;
    else if (event.key === "Home") target = 0;
    else if (event.key === "End") target = photos.length - 1;
    else return;
    event.preventDefault();
    setActive(target);
    thumbnailsRef.current[target]?.focus({ preventScroll: true });
    thumbnailsRef.current[target]?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    });
  }

  return (
    <div
      className="venue-gallery"
      role="region"
      aria-label="Venue photo gallery"
      aria-roledescription="carousel"
    >
      <figure className="venue-gallery-figure">
        <div className="venue-gallery-stage" onKeyDown={onGalleryKeyDown}>
          <button
            type="button"
            className="venue-gallery-image-button"
            aria-label={`Expand photo: ${current.label}`}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
            onClick={(event) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                return;
              }
              openGallery(event.currentTarget);
            }}
          >
            {broken[active] ? (
              <span className="venue-gallery-fallback">
                This photo is unavailable. Try another photo.
              </span>
            ) : (
              <Image
                key={current.src}
                src={imageSource(current.src, 1600)}
                alt={current.alt}
                fill
                className={
                  isExample && current.src.endsWith("/seating.webp")
                    ? "object-cover"
                    : "object-contain"
                }
                sizes="(max-width: 1200px) 100vw, 1180px"
                priority={active === initialIndex}
                onError={() => markBroken(active)}
              />
            )}
          </button>
          {isExample ? (
            <span className="venue-gallery-example">Example photo</span>
          ) : null}
          {multiple ? (
            <>
              <button
                type="button"
                className="venue-gallery-arrow venue-gallery-previous"
                aria-label="Previous photo"
                onClick={() => move(-1)}
              >
                <Chevron previous />
              </button>
              <button
                type="button"
                className="venue-gallery-arrow venue-gallery-next"
                aria-label="Next photo"
                onClick={() => move(1)}
              >
                <Chevron />
              </button>
            </>
          ) : null}
          <button
            type="button"
            className="venue-gallery-expand"
            onClick={(event) => openGallery(event.currentTarget)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
            >
              <path d="M14 3h7v7M21 3l-7 7M10 21H3v-7m0 7 7-7" />
            </svg>
            View {multiple ? `all ${photos.length} photos` : "photo"}
          </button>
        </div>
        <figcaption className="venue-gallery-caption">
          <span>
            {current.label}
            {!isExample && current.measurement ? (
              <small> · {current.measurement}</small>
            ) : null}
          </span>
          <span>
            {active + 1} of {photos.length}
          </span>
        </figcaption>
      </figure>
      <p
        className="sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        Photo {active + 1} of {photos.length}: {current.label}
        {isExample ? ". Example photo, not this venue." : ""}
      </p>
      {multiple ? (
        <div
          ref={stripRef}
          className="venue-gallery-thumbnails"
          role="group"
          aria-label="Choose a venue photo"
        >
          {photos.map((photo, index) => (
            <button
              key={`${photo.src}-${photo.label}`}
              ref={(element) => {
                thumbnailsRef.current[index] = element;
              }}
              type="button"
              aria-pressed={active === index}
              aria-label={`Show photo: ${photo.label}`}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onThumbnailKeyDown(event, index)}
            >
              <span className="venue-gallery-thumbnail-image">
                {broken[index] ? (
                  <span className="venue-gallery-fallback">Unavailable</span>
                ) : (
                  <Image
                    src={imageSource(photo.src, 320)}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 600px) 100px, 152px"
                    onError={() => markBroken(index)}
                  />
                )}
              </span>
              <span className="venue-gallery-thumbnail-label">
                {photo.label}
              </span>
            </button>
          ))}
        </div>
      ) : null}
      {credit ? (
        <p className="venue-gallery-credit">
          Photo:{" "}
          <a href={credit.source} target="_blank" rel="noreferrer">
            {credit.credit} / Unsplash
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      ) : null}

      <dialog
        ref={dialogRef}
        className="venue-gallery-dialog"
        aria-label="Venue photo viewer"
        onCancel={(event) => {
          event.preventDefault();
          closeGallery();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeGallery();
        }}
        onKeyDown={onDialogKeyDown}
      >
        <div className="venue-gallery-dialog-inner">
          <div className="venue-gallery-dialog-toolbar">
            <span>{isExample ? "Example photos" : "Venue photos"}</span>
            <button type="button" autoFocus onClick={closeGallery}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            className="venue-gallery-dialog-stage"
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={() => {
              touchStart.current = null;
            }}
          >
            {expanded && !broken[active] ? (
              <Image
                src={imageSource(current.src, 2200)}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="95vw"
                onError={() => markBroken(active)}
              />
            ) : (
              <span className="venue-gallery-fallback">
                This photo could not be loaded.
              </span>
            )}
          </div>
          <div className="venue-gallery-dialog-controls">
            <button
              type="button"
              aria-label="Previous image"
              disabled={!multiple}
              onClick={() => move(-1)}
            >
              <Chevron previous />
            </button>
            <p aria-live="polite" aria-atomic="true">
              <strong>{current.label}</strong>
              <span>
                {active + 1} of {photos.length}
                {isExample ? " · Example photo from another location" : ""}
              </span>
            </p>
            <button
              type="button"
              aria-label="Next image"
              disabled={!multiple}
              onClick={() => move(1)}
            >
              <Chevron />
            </button>
          </div>
          {credit ? (
            <p className="venue-gallery-dialog-credit">
              Photo:{" "}
              <a href={credit.source} target="_blank" rel="noreferrer">
                {credit.credit} / Unsplash
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          ) : null}
        </div>
      </dialog>
    </div>
  );
}
