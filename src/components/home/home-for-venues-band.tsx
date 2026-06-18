import Link from "next/link";
import { PageContainer } from "@/components/layout/PageContainer";
import { RouteDecoration } from "@/components/home/route-decoration";
import { HOME_FOCUS } from "@/components/home/home-theme";

const STATS = [
  { value: "1 in 4", label: "UK adults are disabled" },
  { value: "£274bn", label: "Purple Pound spending power" },
  { value: "June 2025", label: "European Accessibility Act — EU member states from 28 June 2025" },
  { value: "3 tiers", label: "Access Snapshot, Measured Access Report, Full Access Review" },
] as const;

export function HomeForVenuesBand() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#20242E] py-16 text-white sm:py-20" aria-labelledby="for-venues-band-heading">
      <PageContainer>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#20242E] px-6 py-10 sm:px-10 sm:py-12">
          <RouteDecoration className="right-0 top-0 h-24 w-64 opacity-40" />
          <RouteDecoration className="bottom-0 left-0 h-20 w-56 opacity-25" flip />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#F6CFB8]">For venue owners</p>
              <h2 id="for-venues-band-heading" className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Show customers your venue works for them
              </h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-[#c8d0dc]">
                Access Stamp reviews UK venues and publishes practical access information so disabled customers can choose
                you with confidence — and you can show accessibility, not just claim it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/for-venues"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,91,37,0.5)] transition hover:bg-[#D93E10] ${HOME_FOCUS}`}
                >
                  For venues
                </Link>
                <Link
                  href="/submit-venue"
                  className={`inline-flex min-h-[48px] items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10 ${HOME_FOCUS}`}
                >
                  List your venue free
                </Link>
              </div>
            </div>

            <ul className="grid grid-cols-2 gap-3">
              {STATS.map((stat) => (
                <li key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-5 text-[#94a3b8]">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
