import Link from "next/link";

const PILLARS = [
  {
    title: "Find venues",
    description: "Search access-checked places before you go.",
    href: "/venue-finder",
    accent: "border-blue-200 bg-blue-50/50",
  },
  {
    title: "Plan your visit",
    description: "Check toilets, parking, routes, seating and support needs.",
    href: "/ai-toolkit/venue-fit-planner",
    accent: "border-slate-200 bg-white",
  },
  {
    title: "Understand your rights",
    description: "Get practical guidance on adjustments, travel, work and services.",
    href: "/advice/rights",
    accent: "border-violet-200 bg-violet-50/40",
  },
  {
    title: "Compare access information",
    description: "Use access scores, reports and real-world details.",
    href: "/venue-finder",
    accent: "border-emerald-200 bg-emerald-50/40",
  },
  {
    title: "Support for carers and families",
    description: "Find practical information for care, planning and daily life.",
    href: "/advice/care",
    accent: "border-slate-200 bg-white",
  },
  {
    title: "For venues",
    description: "Help venues improve and explain their accessibility clearly.",
    href: "/submit-venue",
    accent: "border-slate-200 bg-white",
  },
] as const;

export function PlatformPillarsGrid() {
  return (
    <section className="bg-slate-50 pb-14 pt-12" aria-labelledby="platform-helps-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="platform-helps-heading" className="text-2xl font-bold tracking-[-0.025em] text-slate-950">
            What Access Stamp helps with
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            One platform for finding places, planning visits, understanding rights, and improving access information.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className={`group block rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2 ${pillar.accent}`}
            >
              <h3 className="text-base font-bold text-slate-950 group-hover:text-[#2563EB]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{pillar.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
