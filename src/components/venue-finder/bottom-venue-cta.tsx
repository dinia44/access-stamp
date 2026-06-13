import Link from "next/link";
import { VF_BTN_PRIMARY } from "@/lib/venue-finder-cro";

export function BottomVenueCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 rounded-[2rem] border border-border bg-background-2 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <div
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-secondary)] text-white"
            aria-hidden="true"
          >
            <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
              <path d="M12 21s-6.7-4.4-9.2-8.6C1.1 9.2 2.6 5.5 6.2 5.1c1.9-.2 3.7.8 4.6 2.4.9-1.6 2.7-2.6 4.6-2.4 3.6.4 5.1 4.1 3.4 7.3C18.7 16.6 12 21 12 21z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-heading">Love a venue?</h2>
            <p className="mt-1 text-sm text-muted">
              Save it, share it, and help others travel with confidence.
            </p>
          </div>
        </div>

        <Link href="/submit-venue" className={VF_BTN_PRIMARY}>
          List your venue
        </Link>
      </div>
    </section>
  );
}
