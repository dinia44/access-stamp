import { cn } from "@/lib/utils";

type SiteLogoMarkProps = {
  className?: string;
  /** Decorative stamp — parent should set aria-label on the figure if needed */
  decorative?: boolean;
};

/** Stamp mark only (no wordmark) — matches public/logo.svg */
export function SiteLogoMark({ className, decorative = true }: SiteLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 46 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-auto w-full max-w-[220px]", className)}
      aria-hidden={decorative}
      role={decorative ? undefined : "img"}
    >
      {!decorative ? <title>Access Stamp</title> : null}
      <path
        d="M23 7 L11 35 M23 7 L35 35 M13.5 24.5 H32.5"
        stroke="#13201F"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 22 H28 C29.5 22 30.5 23 30.5 24.5 C30.5 26 29 27 27.5 27.5 L26 28"
        stroke="#F04A16"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M29 15 L32 27" stroke="#59682A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
