import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function DemoBanner({ className }: Props) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950",
        className,
      )}
    >
      <p className="font-semibold">Demo listing</p>
      <p className="mt-1">
        This page demonstrates how an Access Stamp venue report could work. It has not been independently audited and
        must not be relied on as current venue information.
      </p>
    </div>
  );
}
