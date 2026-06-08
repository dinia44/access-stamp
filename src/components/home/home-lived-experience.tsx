import Link from "next/link";
import { HOME_FOCUS, HOME_SECTION_PANEL } from "@/components/home/home-theme";

const PROOF_POINTS = [
  {
    title: "Built from lived experience",
    description: "Guidance shaped by disabled people, carers, and families — not generic compliance copy.",
  },
  {
    title: "Access report preview",
    description: "Every featured venue shows scores, photos, and feature chips before you open a full listing.",
    href: "/venue-finder",
    cta: "See access reports",
  },
  {
    title: "Practical, not performative",
    description: "Templates, checklists, and AI support designed for real decisions — benefits, travel, care, and work.",
    href: "/advice",
    cta: "Browse guides",
  },
] as const;

export function HomeLivedExperience() {
  return (
    <section className={`${HOME_SECTION_PANEL} py-16 sm:py-20`} aria-labelledby="lived-experience-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]">Why Access Stamp</p>
          <h2 id="lived-experience-heading" className="mt-3 text-3xl font-bold tracking-[-0.03em] text-[#13201F] sm:text-4xl">
            Built from lived experience and practical access needs
          </h2>
          <p className="mt-4 text-base leading-7 text-[#5E6A66]">
            We show the value upfront so you can trust what is here — not hunt for it behind clicks.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {PROOF_POINTS.map((point) => (
            <li
              key={point.title}
              className="rounded-2xl border border-[#F1D8C7] bg-white p-6 shadow-lg shadow-[#F04A16]/[0.05]"
            >
              <h3 className="text-lg font-bold text-[#13201F]">{point.title}</h3>
              <p className="mt-2 text-base leading-7 text-[#5E6A66]">{point.description}</p>
              {"href" in point && point.href ? (
                <Link
                  href={point.href}
                  className={`mt-4 inline-flex min-h-[44px] items-center text-sm font-bold text-[#59682A] hover:text-[#F04A16] ${HOME_FOCUS}`}
                >
                  {point.cta} →
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
