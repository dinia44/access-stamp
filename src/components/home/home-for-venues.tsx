import Link from "next/link";
import { HOME_BTN_GHOST, HOME_BTN_PRIMARY, HOME_SECTION_ALT } from "@/components/home/home-theme";

export function HomeForVenues() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="for-venues-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#061A3A] via-[#04122B] to-[#0B1D46] text-[#F8FAFC] shadow-2xl shadow-black/30">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            aria-hidden
            style={{
              background: "radial-gradient(circle at 80% 20%, rgba(34,211,238,0.12), transparent 50%)",
            }}
          />
          <div className="relative grid gap-8 p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#22D3EE]">For venues</p>
              <h2 id="for-venues-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em]">
                Help visitors know what to expect
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[#CBD5E1]">
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
