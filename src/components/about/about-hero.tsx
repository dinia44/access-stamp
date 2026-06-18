import { ButtonLink } from "@/components/ui/ButtonLink";
import { VerificationBadge } from "@/components/verification-badge";
import { FadeIn } from "@/components/fade-in";
import {
  ABOUT_BODY,
  ABOUT_CONTAINER,
  ABOUT_EYEBROW,
  ABOUT_FOCUS,
  ABOUT_H1,
  ABOUT_PANEL,
} from "@/components/about/about-theme";

function HeroAccessCard() {
  const rows = [
    { label: "Entrance", value: "Step-free side entrance" },
    { label: "Door width", value: "86cm" },
    { label: "Toilet", value: "Transfer space listed" },
    { label: "Parking", value: "Blue Badge bay nearby" },
    { label: "Quiet times", value: "Available on request" },
  ] as const;

  return (
    <div className="relative">
      <div className={`${ABOUT_PANEL} overflow-hidden p-6 sm:p-7`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59682A]">Access snapshot</p>
            <p className="mt-1 text-lg font-bold text-[#13201F]">Riverside Café</p>
          </div>
          <VerificationBadge status="Demo listing" />
        </div>

        <dl className="mt-5 space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex items-start justify-between gap-4 border-b border-[#F1D8C7]/80 pb-3 last:border-0 last:pb-0"
            >
              <dt className="text-sm font-medium text-[#5E6A66]">{row.label}</dt>
              <dd className="text-right text-sm font-semibold text-[#13201F]">{row.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 rounded-2xl border border-[#EDF7ED] bg-[#EDF7ED]/60 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2F7D32]">Status</p>
          <p className="mt-1 text-sm font-semibold text-[#13201F]">Sample report layout</p>
        </div>
      </div>

      <div
        className="absolute -bottom-4 -left-2 hidden max-w-[220px] rounded-2xl border border-[#F1D8C7] bg-white p-4 shadow-[0_12px_32px_-16px_rgba(240,74,22,0.18)] sm:block lg:-left-6"
        aria-hidden
      >
        <p className="text-sm font-bold text-[#13201F]">Will it fit?</p>
        <p className="mt-1 text-xs leading-5 text-[#5E6A66]">
          Use measurements to judge whether a venue may work for your chair, transfer needs, or support setup.
        </p>
      </div>

      <div
        className="absolute -right-2 -top-4 hidden max-w-[210px] rounded-2xl border border-[#F1D8C7] bg-[#FFF3E8] p-4 shadow-[0_12px_32px_-16px_rgba(240,74,22,0.14)] md:block lg:-right-4"
        aria-hidden
      >
        <p className="text-sm font-bold text-[#13201F]">Ask before you go</p>
        <p className="mt-1 text-xs leading-5 text-[#5E6A66]">
          Generate clear questions before visiting a venue.
        </p>
      </div>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF3E8] via-[#FFF8F1] to-[#FFF8F1] pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className={ABOUT_CONTAINER}>
        <FadeIn>
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div className="max-w-2xl">
              <p className={ABOUT_EYEBROW}>Disability-led access intelligence</p>
              <h1 className={`mt-4 ${ABOUT_H1}`}>Access information that works in real life.</h1>
              <p className={`mt-5 max-w-[62ch] ${ABOUT_BODY}`}>
                Access Stamp helps disabled people, wheelchair users, carers, families, and venues make better
                decisions with practical guides, clearer venue information, verification labels, and AI tools built
                around real access needs.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href="/venue-finder" size="lg" className="w-full sm:w-auto">
                  Find accessible venues
                </ButtonLink>
                <ButtonLink href="/advice" variant="secondary" size="lg" className="w-full sm:w-auto">
                  Read practical guides
                </ButtonLink>
                <ButtonLink
                  href="/submit-venue"
                  variant="outline"
                  size="lg"
                  className={`w-full sm:w-auto ${ABOUT_FOCUS}`}
                >
                  List your venue
                </ButtonLink>
              </div>

              <p className="mt-6 max-w-[58ch] text-sm leading-6 text-[#5E6A66]">
                Built from lived experience, practical detail, and the belief that access information should be clear
                before someone risks the journey.
              </p>
            </div>

            <div className="mx-auto w-full max-w-lg lg:max-w-none lg:pb-8">
              <HeroAccessCard />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
