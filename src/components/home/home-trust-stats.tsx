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
    label: "Helpful guide topics",
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
    <section className="border-t border-[#F1D8C7] bg-[#FFF3E8] py-16 sm:py-20" aria-labelledby="trust-stats-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="trust-stats-heading" className="sr-only">
          Platform statistics
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <li key={stat.label} className={`flex items-start gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#F04A16]/8 ${HOME_PANEL}`}>
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#F1D8C7] bg-[#FFF3E8] text-[#F04A16]">
                {stat.icon}
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight text-[#13201F] sm:text-2xl">{stat.value}</p>
                <p className="mt-0.5 text-sm font-medium text-[#5E6A66]">{stat.label}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
