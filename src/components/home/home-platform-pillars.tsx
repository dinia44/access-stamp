import Link from "next/link";

const PILLARS = [
  {
    title: "Find accessible venues",
    description: "Search places by step-free access, toilets, parking, lifts and more.",
    href: "/venue-finder",
  },
  {
    title: "Plan your visit",
    description: "Check practical access information before travelling.",
    href: "/ai-toolkit/venue-fit-planner",
  },
  {
    title: "Read accessibility guides",
    description: "Understand rights, travel support, venue access and planning.",
    href: "/advice",
  },
  {
    title: "Improve venue access",
    description: "Help venues collect clearer, more useful access information.",
    href: "/submit-venue",
  },
] as const;

function PlatformPillar({ title, description, href }: (typeof PILLARS)[number]) {
  return (
    <Link
      href={href}
      className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
    >
      <h3 className="text-base font-bold text-slate-950 group-hover:text-blue-800">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </Link>
  );
}

export function HomePlatformPillars() {
  return (
    <section className="bg-slate-50 pb-12 pt-20" aria-labelledby="platform-pillars-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="platform-pillars-heading" className="sr-only">
          What you can do on Access Stamp
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((pillar) => (
            <PlatformPillar key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  );
}
