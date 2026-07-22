import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function DemoBanner({ className }: Props) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-[var(--radius-md)] border border-[var(--color-information)] bg-[var(--color-information-soft)] px-4 py-3 text-sm leading-6 text-[var(--color-ink)]",
        className,
      )}
    >
      <p className="font-semibold text-[var(--color-information)]">Demonstration listing</p>
      <p className="mt-1 text-[var(--color-text-muted)]">
        This page shows how an Access Stamp venue report could work. It has not been independently audited and must not be
        relied on as current venue information.
      </p>
    </div>
  );
}
