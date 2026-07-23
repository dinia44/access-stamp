import type { AdviceCategorySlug } from "@/lib/content/types";

/** Line-icon topic glyph — decorative; parent should set aria-hidden. */
export function AdviceTopicIcon({
  slug,
  className = "h-5 w-5",
}: {
  slug: AdviceCategorySlug;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    className,
    "aria-hidden": true as const,
  };

  switch (slug) {
    case "rights":
      return (
        <svg {...common}>
          <path d="M12 3v18M7 7h10M8 12h8M9 17h6" />
          <path d="M5 21h14" />
        </svg>
      );
    case "education":
      return (
        <svg {...common}>
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 12v4c0 1.5 2.2 3 5 3s5-1.5 5-3v-4" />
        </svg>
      );
    case "transport":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="12" rx="2" />
          <path d="M5 10h14M8 20h2M14 20h2M9 16v4M15 16v4" />
        </svg>
      );
    case "cars":
      return (
        <svg {...common}>
          <path d="M4 14h16l-1.5-5.5A2 2 0 0 0 16.6 7H7.4a2 2 0 0 0-1.9 1.5L4 14z" />
          <circle cx="7.5" cy="16.5" r="1.5" />
          <circle cx="16.5" cy="16.5" r="1.5" />
        </svg>
      );
    case "sport":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 4v16M4 12h16" />
        </svg>
      );
    case "workplace":
      return (
        <svg {...common}>
          <rect x="3" y="8" width="18" height="12" rx="1.5" />
          <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18" />
        </svg>
      );
    case "care":
      return (
        <svg {...common}>
          <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "equipment":
      return (
        <svg {...common}>
          <circle cx="8" cy="16" r="3" />
          <circle cx="17" cy="16" r="3" />
          <path d="M11 16h3M8 13V8h6l3 5" />
        </svg>
      );
    case "emergency":
      return (
        <svg {...common}>
          <path d="M12 3 3 20h18L12 3z" />
          <path d="M12 10v4M12 17h.01" />
        </svg>
      );
    case "new-to-disability":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    case "travel":
      return (
        <svg {...common}>
          <path d="M10 20V9l11-3v11" />
          <path d="M10 9 3 7v10l7 2" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}
