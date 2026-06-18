import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { METHODOLOGY_REVIEWED, METHODOLOGY_SECTIONS, METHODOLOGY_VERSION } from "@/lib/methodology-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Access Stamp methodology",
  description:
    "How Access Stamp collects venue access information, applies verification labels, scores features, handles unknowns, and manages corrections and appeals.",
  path: "/methodology",
});

export default function MethodologyPage() {
  return (
    <div className="bg-[#FDFBF8] text-[#20242E]">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">Methodology</p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
            Access Stamp methodology
          </h1>
          <p className="text-base leading-7 text-[#4A5263] sm:text-lg">
            How we record venue access information, label confidence, score features, treat unknowns, and handle
            corrections. Version {METHODOLOGY_VERSION} — reviewed {METHODOLOGY_REVIEWED}.
          </p>
          <nav aria-label="Methodology sections" className="rounded-2xl border border-[#EFE5DA] bg-white p-4 text-sm">
            <p className="font-semibold text-[#20242E]">On this page</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[#4A5263]">
              {METHODOLOGY_SECTIONS.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="hover:text-[#C8430F] hover:underline">
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="mt-12 max-w-3xl space-y-8">
          {METHODOLOGY_SECTIONS.map((section) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.08)]"
            >
              <h2 className="text-xl font-semibold text-[#20242E]">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[#4A5263]">{section.body}</p>
              {section.bullets?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[#4A5263]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
              {section.note ? <p className="mt-4 text-xs text-[#76808F]">{section.note}</p> : null}
            </section>
          ))}

          <section className="rounded-[24px] border border-[#EFE5DA] bg-[#FAF4ED] p-6">
            <h2 className="text-xl font-semibold text-[#20242E]">Suggest a correction or complain</h2>
            <p className="mt-3 text-sm leading-7 text-[#4A5263]">
              Venue owners and visitors can suggest updates or raise concerns about listings and review processes.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink href="/corrections">Corrections</ButtonLink>
              <ButtonLink href="/complaints" variant="secondary">
                Complaints
              </ButtonLink>
              <Link
                href="/submit-venue"
                className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline"
              >
                Submit venue information
              </Link>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
