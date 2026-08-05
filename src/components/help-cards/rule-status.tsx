import type { RuleStatus } from "@/data/help-cards/types";
import { ruleStatusMeta, type RuleStatusMeta } from "@/lib/help-cards/authority";

const toneClasses: Record<RuleStatusMeta["tone"], string> = {
  trust: "border-[var(--color-trust)]/30 bg-[var(--color-trust-soft)] text-[var(--color-trust)]",
  warning: "border-[var(--color-warning)]/40 bg-[var(--color-warning-soft)] text-[var(--color-warning)]",
  information: "border-[var(--color-information)]/30 bg-[var(--color-information-soft)] text-[var(--color-information)]",
  danger: "border-[var(--color-danger)]/40 bg-[var(--color-danger-soft)] text-[var(--color-danger)]",
  neutral: "border-[var(--color-border)] bg-[var(--color-surface-subtle)] text-[var(--color-ink)]",
};

function StatusIcon({ status }: { status: RuleStatus }) {
  const common = "h-3.5 w-3.5 shrink-0";
  if (status === "entitlement") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12.5 10 17l9-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === "restriction") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M7 7l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (status === "condition") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4 3.5 19h17L12 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M12 10v4M12 16.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  // provider-variable / needs-confirmation
  return (
    <svg className={common} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.25-1.2.9-1.2 1.6v.4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function RuleStatusBadge({ status }: { status: RuleStatus }) {
  const meta = ruleStatusMeta(status);
  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[meta.tone]}`}
    >
      <StatusIcon status={status} />
      {meta.label}
    </span>
  );
}
