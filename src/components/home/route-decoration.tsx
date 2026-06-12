type RouteDecorationProps = {
  className?: string;
  flip?: boolean;
};

/** Dashed orange route line used in hero and B2B bands. */
export function RouteDecoration({ className = "", flip = false }: RouteDecorationProps) {
  return (
    <svg
      viewBox="0 0 400 120"
      className={`pointer-events-none absolute text-[#EF5B25]/35 ${flip ? "scale-x-[-1]" : ""} ${className}`}
      aria-hidden
      fill="none"
    >
      <path
        d="M8 92 C 60 20, 120 108, 180 48 S 300 12, 392 64"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="10 8"
        strokeLinecap="round"
      />
      <circle cx="8" cy="92" r="5" fill="currentColor" opacity="0.5" />
      <circle cx="392" cy="64" r="5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
