import Link from "next/link";
import { AS_CARD, AS_CONTAINER, AS_EYEBROW, AS_SECTION, AS_SECTION_H2, AS_BODY, AS_BTN_GHOST } from "@/lib/design-system";

const PILLARS = [
  {
    title: "Find accessible places",
    description: "Search by step-free access, toilets, parking, and verified access reports before you leave home.",
    href: "/venue-finder",
    visual: "map",
    accent: "border-t-4 border-t-[#2563EB]",
  },
  {
    title: "Get practical guidance",
    description: "Plain-language UK advice on rights, travel, care, work, and equipment — written to be used, not admired.",
    href: "/advice",
    visual: "guide",
    accent: "border-t-4 border-t-[#D4A84F]",
  },
  {
    title: "Ask Access Stamp AI",
    description: "Get practical next steps for venues, adjustments, and planning — grounded in UK accessibility guidance.",
    href: "/ai",
    visual: "ai",
    accent: "border-t-4 border-t-[#168A5B]",
  },
] as const;

function PillarVisual({ type }: { type: (typeof PILLARS)[number]["visual"] }) {
  if (type === "map") {
    return (
      <div className="relative mt-6 h-32 overflow-hidden rounded-xl bg-[#071826] p-4" aria-hidden>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(#60A5FA 1px, transparent 1px), linear-gradient(90deg, #60A5FA 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <span className="absolute left-6 top-8 h-3 w-3 rounded-full bg-[#2563EB] shadow-[0_0_0_6px_rgba(37,99,235,0.25)]" />
        <span className="absolute right-10 top-14 h-3 w-3 rounded-full bg-[#168A5B]" />
        <span className="absolute bottom-6 left-1/3 h-3 w-3 rounded-full bg-[#D4A84F]" />
      </div>
    );
  }
  if (type === "guide") {
    return (
      <div className="mt-6 space-y-2" aria-hidden>
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-lg border border-[rgba(16,32,51,0.08)] bg-[#F8F5EE] px-3 py-2" style={{ marginLeft: `${i * 8}px` }}>
            <div className="h-2 w-3/4 rounded bg-[rgba(16,32,51,0.08)]" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="mt-6 rounded-xl border border-[rgba(16,32,51,0.08)] bg-[#F8F5EE] p-4" aria-hidden>
      <div className="flex gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB] text-xs font-bold text-white">AI</span>
        <div className="flex-1 rounded-2xl bg-white px-3 py-2 text-xs text-[#617080]">What should I check before visiting a new venue?</div>
      </div>
    </div>
  );
}

export function HomeProductPillars() {
  return (
    <section className={`${AS_SECTION} bg-[#F8F5EE]`} aria-labelledby="product-pillars-heading">
      <div className={AS_CONTAINER}>
        <p className={AS_EYEBROW}>Three ways we help</p>
        <h2 id="product-pillars-heading" className={`${AS_SECTION_H2} mt-3 max-w-2xl text-[#102033]`}>
          Practical support for real access decisions
        </h2>
        <p className={`${AS_BODY} mt-3 max-w-2xl text-[#617080]`}>
          Each path is designed for a different moment — finding a place, understanding your options, or getting help fast.
        </p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article key={pillar.title} className={`${AS_CARD} ${pillar.accent} flex flex-col`}>
              <h3 className="text-xl font-bold text-[#102033] sm:text-2xl">{pillar.title}</h3>
              <p className={`${AS_BODY} mt-3 flex-1 text-[#617080]`}>{pillar.description}</p>
              <PillarVisual type={pillar.visual} />
              <Link href={pillar.href} className={`${AS_BTN_GHOST} mt-5 self-start`}>
                {pillar.title} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
