import Link from "next/link";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";

const TOOLS = [
  {
    title: "Venue fit planner",
    description: "Match your access needs to what a venue can realistically offer.",
    href: "/ai-toolkit/venue-fit-planner",
  },
  {
    title: "Venue questions",
    description: "Generate the right questions to ask before you visit.",
    href: "/ai-toolkit/venue-questions",
  },
  {
    title: "Access needs profiler",
    description: "Build a clear profile of your practical access requirements.",
    href: "/ai-toolkit/access-needs-profiler",
  },
] as const;

export function HomeGuidesPlanning() {
  return (
    <section className="bg-slate-50 py-16" aria-labelledby="guides-planning-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.04em] text-slate-500">Guides & planning</p>
            <h2 id="guides-planning-heading" className="mt-2 text-2xl font-bold tracking-[-0.025em] text-slate-900">
              Practical guides and planning tools
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              UK-focused advice on rights, travel, equipment and everyday access — plus tools to plan visits with
              confidence.
            </p>
          </div>
          <Link
            href="/advice"
            className="inline-flex min-h-11 shrink-0 items-center text-sm font-bold text-blue-700 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
          >
            Browse all guides →
          </Link>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
            >
              <h3 className="text-sm font-bold text-slate-950">{tool.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <FeaturedPracticalGuides />
        </div>
      </div>
    </section>
  );
}
