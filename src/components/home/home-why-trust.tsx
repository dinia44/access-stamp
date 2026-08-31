import Link from "next/link";
import { MethodologyLink } from "@/components/design-system/methodology-link";
import { PageContainer } from "@/components/layout/PageContainer";
import { HOME_FOCUS } from "@/components/home/home-theme";

const EVIDENCE_POINTS = [
  "Measured and photographed details",
  "Clear confidence and unknown states",
  "Disability-led perspective",
  "Free for visitors",
] as const;

export function HomeWhyTrust() {
  return (
    <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-12 sm:py-14" aria-labelledby="why-trust-heading">
      <PageContainer>
        <div className="max-w-3xl">
          <h2
            id="why-trust-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            Built from lived experience. Supported by measurements, photographs, and honest unknowns.
          </h2>
          <p className="mt-3 text-base leading-7 text-[#4A5263]">
            We label confidence, show what is unconfirmed, and explain how access information is gathered.
          </p>
        </div>

        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {EVIDENCE_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm leading-6 text-[#4A5263]">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand)]" />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
          <MethodologyLink className="mt-0" />
          <Link href="/about#founder" className={`inline-flex min-h-[44px] items-center text-[var(--color-brand)] hover:underline ${HOME_FOCUS}`}>
            Read the founder story
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}
