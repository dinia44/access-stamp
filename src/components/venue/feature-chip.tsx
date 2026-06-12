import type { Venue } from "@/lib/mock-data";

export type FeatureChipIcon = "step-free" | "toilet" | "parking" | "lift" | "hearing" | "quiet";

export type FeatureChipItem = {
  icon: FeatureChipIcon;
  label: string;
};

function FeatureIcon({ icon }: { icon: FeatureChipIcon }) {
  const cls = "h-3.5 w-3.5 shrink-0 text-[#5F7444]";
  if (icon === "step-free") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="8" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
        <path d="M10 18h5M12 6v6m-2 0h4" />
      </svg>
    );
  }
  if (icon === "toilet") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M8 3v3M16 3v3M5 8h14v12H5z" />
      </svg>
    );
  }
  if (icon === "parking") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8h3a2 2 0 0 1 0 4h-3V8Z" />
      </svg>
    );
  }
  if (icon === "lift") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M7 10v10M17 10v10M12 4v16M9 7l3-3 3 3" />
      </svg>
    );
  }
  if (icon === "hearing") {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M12 4a8 8 0 0 0-8 8v4a4 4 0 0 0 4 4h1" />
        <path d="M12 4a8 8 0 0 1 8 8v4a4 4 0 0 1-4 4h-1" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 10v4M20 10v4M7 8v8M12 6v12M17 8v8" />
    </svg>
  );
}

export function FeatureChip({
  icon,
  label,
  className = "",
}: {
  icon: FeatureChipIcon;
  label: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-[#EFE5DA] bg-[#FAF4ED] px-2.5 py-1 text-[11px] font-medium text-[#4A5263] ${className}`}
    >
      <FeatureIcon icon={icon} />
      {label}
    </span>
  );
}

export function getVenueFeatureChipItems(venue: Venue): FeatureChipItem[] {
  const chips: FeatureChipItem[] = [];
  if (venue.features["Step-free entrance"] === "yes") {
    chips.push({ icon: "step-free", label: "Step-free" });
  }
  if (venue.features["Accessible toilet"] === "yes") {
    chips.push({ icon: "toilet", label: "Toilet" });
  }
  if (venue.features["Nearby Blue Badge parking"] === "yes") {
    chips.push({ icon: "parking", label: "Parking" });
  }
  if (venue.features["Lift access"] === "yes") {
    chips.push({ icon: "lift", label: "Lift" });
  }
  if (venue.tags.some((tag) => /hearing\s*loop/i.test(tag))) {
    chips.push({ icon: "hearing", label: "Hearing loop" });
  }
  if (venue.features["Quiet environment"] === "yes") {
    chips.push({ icon: "quiet", label: "Quiet space" });
  }
  return chips.slice(0, 5);
}
