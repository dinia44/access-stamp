import type { GuideOfficialLink } from "@/lib/guide-resources";
import { cn } from "@/lib/utils";

type GuideOfficialLinksProps = {
  links: GuideOfficialLink[];
  className?: string;
};

export function GuideOfficialLinks({ links, className }: GuideOfficialLinksProps) {
  return (
    <section
      id="guide-official-links"
      className={cn(
        "scroll-mt-28 rounded-2xl border border-[#F1D8C7] bg-white p-5 shadow-[var(--shadow-soft)]",
        className,
      )}
      aria-labelledby="official-guidance-heading"
    >
      <h2 id="official-guidance-heading" className="text-sm font-bold text-heading">
        Official guidance
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#59682A] underline-offset-2 hover:text-[#F04A16] hover:underline focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
            >
              {link.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
