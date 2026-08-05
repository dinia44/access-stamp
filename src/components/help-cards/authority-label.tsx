import type { AuthorityType } from "@/data/help-cards/types";
import { authorityLabel, isAuthoritativeSource } from "@/lib/help-cards/authority";

export function AuthorityLabel({ type, authority }: { type: AuthorityType; authority?: string }) {
  const official = isAuthoritativeSource(type);
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]">
      <span
        className={`inline-flex h-2 w-2 shrink-0 rounded-full ${
          official ? "bg-[var(--color-trust)]" : "bg-[var(--color-information)]"
        }`}
        aria-hidden="true"
      />
      {authorityLabel(type)}
      {authority ? <span className="text-[var(--color-text-muted)]">· {authority}</span> : null}
    </span>
  );
}

export function ApplicabilityLabel({ applicability }: { applicability: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-muted)]">
      <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 12h17M12 3.5c2.5 2.4 2.5 14.6 0 17M12 3.5c-2.5 2.4-2.5 14.6 0 17" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      Applies to: {applicability}
    </span>
  );
}
