import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  message,
  actions,
  className,
}: {
  title: string;
  message: string;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      aria-labelledby="empty-state-title"
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white/95 p-8 text-center shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <h2 id="empty-state-title" className="text-xl font-semibold text-[var(--color-ink)]">
        {title}
      </h2>
      <p className="mt-2 text-base leading-7 text-[var(--color-muted)]">{message}</p>
      {actions ? <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">{actions}</div> : null}
    </section>
  );
}
