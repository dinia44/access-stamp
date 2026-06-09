import { HelpCardIcon } from "@/features/help-cards/help-card-icons";

const TRUST_ITEMS = [
  { label: "Source-backed", icon: "shield-check" as const },
  { label: "Plain English", icon: "book" as const },
  { label: "Save offline", icon: "download" as const },
  { label: "Print-friendly", icon: "print" as const },
  { label: "Disability-led", icon: "care" as const },
];

export function TrustStrip() {
  return (
    <section
      aria-labelledby="trust-strip-title"
      className="border-t border-[#EAD7C5]/80 bg-[rgba(255,255,255,0.55)] px-5 py-12 sm:px-8 md:py-16 lg:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <h2 id="trust-strip-title" className="sr-only">
          Why you can trust Access Stamp help cards
        </h2>

        <ul className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {TRUST_ITEMS.map((item) => (
            <li key={item.label}>
              <span className="inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-[#EAD7C5] bg-[rgba(255,255,255,0.78)] px-4 py-2.5 text-sm font-semibold text-[#132033]">
                <HelpCardIcon name={item.icon} className="h-4 w-4 text-[#F97316]" />
                {item.label}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-[#5B6472]">
          Access Stamp provides practical prompts, not medical, legal or financial advice.
        </p>
      </div>
    </section>
  );
}
