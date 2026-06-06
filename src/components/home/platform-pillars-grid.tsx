import Link from "next/link";
import { HOME_PANEL, HOME_SECTION_ALT } from "@/components/home/home-theme";

const PILLARS = [
  {
    title: "Find venues",
    description: "Search access-checked places before you go.",
    href: "/venue-finder",
    accent: "hover:border-cyan-400/30",
  },
  {
    title: "Plan visits",
    description: "Check entrances, toilets, parking, routes and support needs.",
    href: "/ai-toolkit/venue-fit-planner",
    accent: "hover:border-blue-400/30",
  },
  {
    title: "Understand your rights",
    description: "Get practical guidance on adjustments, travel, work and services.",
    href: "/advice/rights",
    accent: "hover:border-[#8B5CF6]/40",
  },
  {
    title: "Use practical guides",
    description: "Plain-language UK advice on everyday access, care and equipment.",
    href: "/advice",
    accent: "hover:border-cyan-400/30",
  },
  {
    title: "Get care & support help",
    description: "Find practical information for care, planning and daily life.",
    href: "/advice/care",
    accent: "hover:border-blue-400/30",
  },
  {
    title: "For venues",
    description: "Help venues improve and explain their accessibility clearly.",
    href: "/submit-venue",
    accent: "hover:border-[#8B5CF6]/40",
  },
] as const;

export function PlatformPillarsGrid() {
  return (
    <section className={HOME_SECTION_ALT} aria-labelledby="platform-helps-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 id="platform-helps-heading" className="text-2xl font-bold tracking-[-0.025em] text-[#0B1D3A]">
            What you can do on Access Stamp
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#3B6B9A]">
            One platform for finding places, planning visits, understanding rights, and getting practical support.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className={`group block p-5 transition-all duration-200 hover:-translate-y-1 hover:border-[#93C5FD] hover:shadow-xl hover:shadow-[#2563EB]/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0891B2]/20 ${HOME_PANEL} ${pillar.accent}`}
            >
              <h3 className="text-base font-bold text-[#0B1D3A] group-hover:text-[#2563EB]">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#3B6B9A]">{pillar.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
