import { cn } from "@/lib/utils";
import { VENUE_FINDER_PROMO_VIDEO_POSTER, VENUE_FINDER_PROMO_VIDEO_SRC } from "@/lib/site";

type VenueFinderPromoVideoProps = {
  className?: string;
  /** Show caption below the player */
  showCaption?: boolean;
  /** Compact layout for sidebars or narrow columns */
  compact?: boolean;
};

export function VenueFinderPromoVideo({
  className,
  showCaption = true,
  compact = false,
}: VenueFinderPromoVideoProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-[var(--shadow-soft)] card-accent-blue",
        className,
      )}
    >
      <div className="aspect-video w-full bg-navy">
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          preload="metadata"
          poster={VENUE_FINDER_PROMO_VIDEO_POSTER}
          aria-label="Access Stamp Venue Finder — video explaining how to search venues by practical access features"
        >
          <source src={VENUE_FINDER_PROMO_VIDEO_SRC} type="video/mp4" />
          Your browser does not support embedded video.{" "}
          <a href={VENUE_FINDER_PROMO_VIDEO_SRC} className="font-semibold text-blue underline-offset-2 hover:underline">
            Download or open the Access Stamp Venue Finder video
          </a>
          .
        </video>
      </div>
      {showCaption ? (
        <figcaption className={cn("text-muted", compact ? "px-4 py-3 text-xs" : "px-5 py-4 text-sm")}>
          <span className="font-semibold text-heading">Access Stamp Venue Finder</span>
          {compact ? (
            <> — see how we search by step-free access, toilets, parking, and turning space.</>
          ) : (
            <>
              {" "}
              — a short intro to searching UK venues by the access details that actually matter: step-free routes,
              toilet quality, parking, turning space, and more. Not vague &ldquo;wheelchair accessible&rdquo; labels.
            </>
          )}
        </figcaption>
      ) : null}
    </figure>
  );
}
