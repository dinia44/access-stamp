export type HelpCardIconName =
  | "shield"
  | "car"
  | "badge"
  | "chat"
  | "clock"
  | "briefcase"
  | "users"
  | "stethoscope"
  | "hospital"
  | "care"
  | "pound"
  | "venue"
  | "bus"
  | "check"
  | "question"
  | "sliders"
  | "quote"
  | "phone"
  | "print"
  | "spark"
  | "copy"
  | "book"
  | "shield-check"
  | "download";

const stroke = {
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function HelpCardIcon({
  name,
  className = "h-5 w-5",
}: {
  name: HelpCardIconName;
  className?: string;
}) {
  const common = { ...stroke, className, "aria-hidden": true as const, viewBox: "0 0 24 24" };

  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M5 17h14" />
          <path d="M7 17v2" />
          <path d="M17 17v2" />
          <path d="M4 13l2-5h12l2 5" />
          <path d="M6 13h12" />
          <circle cx="7.5" cy="15.5" r="1" />
          <circle cx="16.5" cy="15.5" r="1" />
        </svg>
      );
    case "badge":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="16" rx="2" />
          <path d="M9 8h6" />
          <path d="M9 12h6" />
          <path d="M9 16h3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4.5A8 8 0 1 1 21 12Z" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "stethoscope":
      return (
        <svg {...common}>
          <path d="M6 3v5a4 4 0 0 0 8 0V3" />
          <path d="M14 8a4 4 0 0 0 8 0v-.5" />
          <circle cx="20" cy="7" r="2" />
          <path d="M10 12v2a6 6 0 0 0 12 0v-4" />
        </svg>
      );
    case "hospital":
      return (
        <svg {...common}>
          <path d="M4 21V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16" />
          <path d="M9 21v-6h6v6" />
          <path d="M10 8h4" />
          <path d="M12 6v4" />
        </svg>
      );
    case "care":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-9-9.5C1.5 7.5 4 4 7.5 4c2 0 3.5 1.2 4.5 2.5C13 5.2 14.5 4 16.5 4 20 4 22.5 7.5 21 11.5 19 16.5 12 21 12 21Z" />
        </svg>
      );
    case "pound":
      return (
        <svg {...common}>
          <path d="M7 11h8" />
          <path d="M8 21h8" />
          <path d="M8 21c3-3 4-6 2-12a4 4 0 0 1 7-3" />
        </svg>
      );
    case "venue":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V8l7-4 7 4v13" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "bus":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="15" rx="2" />
          <path d="M7 18v3" />
          <path d="M17 18v3" />
          <path d="M5 9h14" />
          <circle cx="8" cy="15" r="1" />
          <circle cx="16" cy="15" r="1" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8 12 2.5 2.5L16 9" />
        </svg>
      );
    case "question":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.8 2.8 0 0 1 5 1.7c0 2-2.5 2.2-2.5 4" />
          <path d="M12 18h.01" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <path d="M4 6h10" />
          <path d="M18 6h2" />
          <circle cx="16" cy="6" r="2" />
          <path d="M4 12h3" />
          <path d="M11 12h9" />
          <circle cx="9" cy="12" r="2" />
          <path d="M4 18h12" />
          <circle cx="18" cy="18" r="2" />
        </svg>
      );
    case "quote":
      return (
        <svg {...common}>
          <path d="M9 7H5v5h4v5H4" />
          <path d="M20 7h-4v5h4v5h-5" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <rect x="7" y="2" width="10" height="20" rx="2" />
          <path d="M11 18h2" />
        </svg>
      );
    case "print":
      return (
        <svg {...common}>
          <path d="M6 9V3h12v6" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <path d="M6 14h12v7H6z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        </svg>
      );
    case "copy":
      return (
        <svg {...common}>
          <rect x="9" y="9" width="11" height="11" rx="2" />
          <rect x="4" y="4" width="11" height="11" rx="2" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 5 3.4 8.4 7 10 3.6-1.6 7-5 7-10V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v12" />
          <path d="m7 10 5 5 5-5" />
          <path d="M5 21h14" />
        </svg>
      );
  }
}
