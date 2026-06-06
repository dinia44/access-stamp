import Link from "next/link";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY, HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomeForVenues() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="for-venues-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-[#93C5FD]/50 bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-white text-[#0B1D3A] shadow-xl shadow-[#2563EB]/10">
          <div
            className="pointer-events-none absolute inset-0 opacity-50"
            aria-hidden
            style={{
              background: "radial-gradient(circle at 80% 20%, rgba(37,99,235,0.1), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#0891B2]">For venues</p>
              <h2 id="for-venues-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#0B1D3A]">
                Help visitors know what to expect
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#1E3A5F]">
                Share clearer access information, suggest a venue for listing, or work with Access Stamp to improve how
                your venue describes step-free routes, toilets, parking and staff support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/submit-venue" className={HOME_BTN_PRIMARY}>
                Suggest a venue
              </Link>
              <Link href="/ai-toolkit/venue-questions" className={HOME_BTN_GHOST}>
                Venue access checklist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
