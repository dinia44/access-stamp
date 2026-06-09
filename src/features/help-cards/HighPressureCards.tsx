import type { HelpCard } from "@/lib/help-cards";
import { HelpCardIcon, type HelpCardIconName } from "@/features/help-cards/help-card-icons";

type HighPressureItem = {
  label: string;
  slug: string;
  icon: HelpCardIconName;
  description: string;
  tag: string;
};

const HIGH_PRESSURE_ITEMS: HighPressureItem[] = [
  {
    label: "Stopped by police",
    slug: "section-88-driving-licence",
    icon: "shield",
    description:
      "A calm card for explaining disability, communication needs, and support requirements.",
    tag: "Urgent",
  },
  {
    label: "Section 88 driving licence",
    slug: "section-88-driving-licence",
    icon: "car",
    description: "Simple wording for explaining your position while waiting for DVLA confirmation.",
    tag: "Travel",
  },
  {
    label: "Blue Badge issue",
    slug: "blue-badge-issue",
    icon: "badge",
    description: "Clear prompts for parking disputes, badge checks, and access misunderstandings.",
    tag: "Parking",
  },
  {
    label: "Communication support",
    slug: "communication-support-card",
    icon: "chat",
    description: "Ask for extra time, written information, or a quieter conversation.",
    tag: "Access",
  },
];

export function HighPressureCards({
  cardsBySlug,
  onOpenCard,
}: {
  cardsBySlug: Map<string, HelpCard>;
  onOpenCard: (slug: string) => void;
}) {
  const items = HIGH_PRESSURE_ITEMS.filter((item) => cardsBySlug.has(item.slug));
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="high-pressure-cards-title"
      className="px-5 py-12 sm:px-8 lg:px-10 lg:py-16"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F05A1A]">Fast support</p>
            <h2
              id="high-pressure-cards-title"
              className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#132033] sm:text-4xl"
            >
              High-pressure cards
            </h2>
            <p className="mt-3 max-w-[560px] text-base leading-7 text-[#68717E]">
              Quick support for real-life situations where you need clear wording quickly.
            </p>
          </div>
          <a
            href="#situations"
            className="inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-[#E0C8B3] bg-white/70 px-5 text-sm font-extrabold text-[#132033] transition hover:border-[#F05A1A] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
          >
            View all situations
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.label}
              className="group rounded-[28px] border border-[#EAD5C2] bg-white/76 p-6 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_60px_rgba(19,32,51,0.10)]"
            >
              <div className="mb-5 inline-flex rounded-full border border-[#F2D1BE] bg-[#FFF3EA] px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-[#F05A1A]">
                {item.tag}
              </div>
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#F2D1BE] bg-[#FFF3EA] text-[#F05A1A]">
                <HelpCardIcon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-black tracking-[-0.03em] text-[#132033]">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-[#68717E]">{item.description}</p>
              <button
                type="button"
                onClick={() => onOpenCard(item.slug)}
                className="mt-6 inline-flex min-h-[44px] items-center text-sm font-extrabold text-[#F05A1A] focus:outline-none focus:ring-4 focus:ring-[#F97316]/20"
                aria-label={`Open ${item.label} help card`}
              >
                Open card →
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
