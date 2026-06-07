import Link from "next/link";
import { HOME_PANEL } from "@/components/home/home-theme";

const STATS = [
  {
    value: "18,450+",
    label: "Access reports",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
  },
  {
    value: "160+",
    label: "Practical guide topics",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    value: "95%",
    label: "Community trust",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: "Verified",
    label: "Independently verified",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
] as const;

export function HomeTrustStats() {
  return (
    <section className="border-t border-[#BFDBFE] py-16 sm:py-20" aria-labelledby="trust-stats-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-[#BFDBFE] bg-gradient-to-br from-[#DBEAFE] via-[#EFF6FF] to-[#F8FBFF] p-8 shadow-lg shadow-[#2563EB]/5 sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
            <div>
              <h2 id="trust-stats-heading" className="text-2xl font-bold tracking-[-0.03em] text-[#0B1D3A] sm:text-3xl">
                Built from lived experience, designed for real access decisions.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#1E3A5F]">
                We combine community insight with practical information so you can make informed choices every time you
                go out.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#0891B2] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#0891B2] focus-visible:outline-offset-4"
              >
                Learn more about us →
              </Link>
            </div>

            <ul className="grid gap-4 sm:grid-cols-2">
              {STATS.map((stat) => (
                <li key={stat.label} className={`flex items-start gap-4 p-5 ${HOME_PANEL}`}>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]">
                    {stat.icon}
                  </span>
                  <div>
                    <p className="text-2xl font-bold tracking-tight text-[#0B1D3A]">{stat.value}</p>
                    <p className="mt-0.5 text-sm font-medium text-[#3B6B9A]">{stat.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
