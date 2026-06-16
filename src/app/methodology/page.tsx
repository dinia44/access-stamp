import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "How Access Stamp access information works",
  description:
    "How Access Stamp records venue access details, what confidence labels mean, why unknowns are shown, and how to confirm information before travelling.",
  path: "/methodology",
});

const SECTIONS = [
  {
    id: "what-we-record",
    title: "What we record",
    body: "Access Stamp aims to capture practical access details that help disabled people decide whether a place may work — entrances, internal routes, toilets, parking and drop-off, seating and table access, staff support, hearing and sensory factors, and emergency considerations. We also note what is unknown rather than hiding gaps.",
  },
  {
    id: "confidence-labels",
    title: "How confidence labels work",
    body: "Each listing carries a confidence label so you know where information came from and how much to rely on it before travelling. Labels include Access Stamp checked, Community reported, Venue submitted, Demo listing, and Not yet verified.",
  },
  {
    id: "access-stamp-checked",
    title: 'What "Access Stamp checked" means',
    body: "Information has been reviewed against Access Stamp's access information framework — measured where possible, photographed where helpful, and checked for consistency. It is still worth confirming details that matter for your visit.",
  },
  {
    id: "community-reported",
    title: 'What "Community reported" means',
    body: "Information has been submitted or suggested by users and may need confirmation. It can be useful for planning, but important details should be verified with the venue before you travel.",
  },
  {
    id: "demo-listing",
    title: 'What "Demo listing" means',
    body: "The listing is used to demonstrate how Access Stamp venue reports work. It should not be relied on as live venue data.",
  },
  {
    id: "unknown-details",
    title: "Why unknown details are shown",
    body: "Missing access information matters. If doorway width, toilet layout, or seating flexibility is unknown, that uncertainty is part of the decision — not something to hide behind a generic accessible label.",
  },
  {
    id: "confirm-before-travel",
    title: "Why users should confirm important details",
    body: "Access can change — building works, staffing, furniture layout, or temporary closures. If a visit is important, confirm the details that matter for your equipment, fatigue, support needs, and safety before travelling.",
  },
  {
    id: "venue-updates",
    title: "How venues can update their details",
    body: "Venues and community members can suggest corrections or submit new information. Access Stamp reviews submissions and updates listings when details are confirmed.",
    cta: true,
  },
] as const;

export default function MethodologyPage() {
  return (
    <div className="bg-[#FDFBF8] text-[#20242E]">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Methodology</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            How Access Stamp access information works
          </h1>
          <p className="text-base leading-7 text-[#4A5263] sm:text-lg">
            Plain-English explanation of what we record, how confidence labels work, and why honesty about unknowns
            matters.
          </p>
        </div>

        <div className="mt-12 max-w-3xl space-y-8">
          {SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.08)]"
            >
              <h2 className="text-xl font-semibold text-[#20242E]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5263]">{section.body}</p>
              {"cta" in section && section.cta ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href="/submit-venue">Submit or update venue information</ButtonLink>
                  <Link
                    href="/for-venues"
                    className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline"
                  >
                    Venue support
                  </Link>
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </Container>
    </div>
  );
}
