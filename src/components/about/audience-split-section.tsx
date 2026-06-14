import { AboutSection } from "@/components/about/about-section";
import { ABOUT_BODY, ABOUT_PANEL } from "@/components/about/about-theme";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function AudienceSplitSection({
  id,
  tone = "default",
  title,
  body,
  bulletsTitle,
  bullets,
  cta,
  href,
}: {
  id?: string;
  tone?: "default" | "alt" | "panel";
  title: string;
  body: string[];
  bulletsTitle: string;
  bullets: readonly string[];
  cta: string;
  href: string;
}) {
  return (
    <AboutSection id={id} tone={tone} aria-labelledby={`${id ?? title}-heading`}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
        <div className="space-y-4">
          <h2
            id={`${id ?? title}-heading`}
            className="text-[1.875rem] font-bold leading-[1.12] tracking-[-0.025em] text-[#13201F] sm:text-4xl"
          >
            {title}
          </h2>
          {body.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className={ABOUT_BODY}>
              {paragraph}
            </p>
          ))}
        </div>

        <aside className={`${ABOUT_PANEL} p-6 sm:p-8`}>
          <p className="text-sm font-bold text-[#13201F]">{bulletsTitle}</p>
          <ul className="mt-4 space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-[#5E6A66]">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F04A16]" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <ButtonLink href={href} variant="secondary" className="mt-6 w-full sm:w-auto">
            {cta}
          </ButtonLink>
        </aside>
      </div>
    </AboutSection>
  );
}
