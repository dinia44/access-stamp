import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { CertificationStampMark } from "@/components/for-venues/certification-stamp-mark";
import { ForVenuesFaqJsonLd } from "@/components/for-venues/for-venues-faq-jsonld";
import { ForVenuesLeadForm } from "@/components/for-venues/for-venues-lead-form";
import { RouteDecoration } from "@/components/home/route-decoration";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import {
  CERTIFICATION_PRICING,
  CERTIFICATION_TIERS,
  FOR_VENUES_FAQ,
  WHAT_VENUES_RECEIVE,
  WHAT_WE_CHECK,
} from "@/lib/for-venues-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Show access clearly before customers have to ask",
  description:
    "Access Stamp helps venues turn vague accessibility claims into practical, confidence-building access information.",
  path: "/for-venues",
});

const CASE_STATS = [
  { value: "1 in 4", label: "UK adults are disabled" },
  { value: "£274bn", label: "annual spending power of disabled households (Purple Pound)" },
  {
    value: "June 2025",
    label: "European Accessibility Act — in force since June 2025",
  },
] as const;

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Book your audit",
    body: "We visit at a time that suits you and agree which areas matter most for your customers.",
  },
  {
    step: "2",
    title: "We measure what matters",
    body: "Entrances, doorways, toilets, routes, parking, and hearing support — photographed and measured on site.",
  },
  {
    step: "3",
    title: "Get your Stamp",
    body: "Bronze, Silver, or Gold certification with a public access report your customers can trust.",
  },
  {
    step: "4",
    title: "Get found",
    body: "Your venue appears in the Access Stamp finder that disabled customers and AI assistants use to choose where to go.",
  },
] as const;

const DELIVERABLES = [
  {
    title: "Window stamp",
    body: "Physical Bronze, Silver, or Gold stamp for your entrance — a clear signal to customers.",
  },
  {
    title: "Public access report",
    body: "A shareable listing on Access Stamp with scores, features, and photos.",
  },
  {
    title: "Measured PDF report",
    body: "Detailed doorway widths, routes, and facilities for your team (Silver and Gold).",
  },
  {
    title: "Venue finder listing",
    body: "Discovered by disabled customers searching by town, need, and access feature.",
  },
] as const;

export default function ForVenuesPage() {
  return (
    <div className="bg-[#FDFBF8] text-[#20242E]">
      <ForVenuesFaqJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FDFBF8] via-[#FBEDE2] to-[#F7E0CE] px-4 py-16 sm:px-6 sm:py-20">
        <RouteDecoration className="right-0 top-8 h-28 w-72 opacity-50" />
        <Container>
          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#C8430F]">For venues</p>
            <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl font-medium leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Show access clearly before customers have to ask.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4A5263]">
              Access Stamp helps venues turn vague accessibility claims into practical, confidence-building access
              information.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#book-audit"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#EF5B25] px-6 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,91,37,0.45)] transition hover:bg-[#D93E10]"
              >
                Request pilot details
              </Link>
              <Link
                href="#what-we-check"
                className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-[#EFE5DA] bg-white px-6 text-sm font-semibold text-[#20242E] transition hover:bg-[#FAF4ED]"
              >
                See what we check
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* The case */}
      <section className="border-t border-[#EFE5DA] py-16 sm:py-20" aria-labelledby="the-case-heading">
        <Container>
          <h2 id="the-case-heading" className="sr-only">
            The business case
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {CASE_STATS.map((stat) => (
              <li
                key={stat.label}
                className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.1)]"
              >
                <p className="text-2xl font-semibold tracking-tight text-[#20242E]">{stat.value}</p>
                <p className="mt-2 text-sm leading-6 text-[#4A5263]">{stat.label}</p>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-3xl text-center text-base leading-7 text-[#4A5263]">
            Most venues lose this custom invisibly, because people check access before they travel and never arrive if
            they cannot be sure your venue will work for them.
          </p>
        </Container>
      </section>

      {/* What we check */}
      <section
        id="what-we-check"
        className="scroll-mt-24 border-t border-[#EFE5DA] py-16 sm:py-20"
        aria-labelledby="what-we-check-heading"
      >
        <Container>
          <h2
            id="what-we-check-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            What we check
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_WE_CHECK.map((item) => (
              <li
                key={item}
                className="rounded-[20px] border border-[#EFE5DA] bg-white px-4 py-3 text-sm font-medium text-[#20242E]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20"
        aria-labelledby="how-it-works-heading"
      >
        <Container>
          <h2
            id="how-it-works-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            How it works
          </h2>
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.map((item) => (
              <li
                key={item.step}
                className="rounded-[24px] border border-[#EFE5DA] bg-white p-6 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.08)]"
              >
                <p className="text-sm font-semibold text-[#C8430F]">Step {item.step}</p>
                <h3 className="mt-2 text-lg font-semibold text-[#20242E]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#4A5263]">{item.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Certification tiers */}
      <section className="border-t border-[#EFE5DA] py-16 sm:py-20" aria-labelledby="tiers-heading">
        <Container>
          <h2
            id="tiers-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            Certification tiers
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-[#4A5263]">
            Pilot programme pricing — request details for your venue size and scope.
          </p>

          <ul className="mt-10 grid gap-6 lg:grid-cols-3">
            {CERTIFICATION_TIERS.map((tier) => {
              const price = CERTIFICATION_PRICING[tier.id].label;
              return (
                <li
                  key={tier.id}
                  className={`relative flex h-full flex-col rounded-[24px] border bg-white p-6 shadow-[0_12px_32px_-20px_rgba(122,80,48,0.12)] ${
                    tier.mostPopular ? "border-[#EF5B25] ring-2 ring-[#EF5B25]/20" : "border-[#EFE5DA]"
                  }`}
                >
                  {tier.mostPopular ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-[#EF5B25] px-3 py-1 text-xs font-semibold text-white">
                      Most popular
                    </span>
                  ) : null}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#20242E]">{tier.name}</h3>
                      <p className="mt-1 text-sm text-[#76808F]">{price}</p>
                    </div>
                    <CertificationStampMark tone={tier.stampTone} />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#4A5263]">{tier.tagline}</p>
                  <ul className="mt-5 flex-1 space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-[#4A5263]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#5F7444]" aria-hidden />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#book-audit"
                    className="mt-6 inline-flex min-h-[44px] items-center text-sm font-semibold text-[#C8430F] hover:underline"
                  >
                    Request pilot details
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* What venues receive */}
      <section
        className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20"
        aria-labelledby="venues-receive-heading"
      >
        <Container>
          <h2
            id="venues-receive-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            What venues receive
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {WHAT_VENUES_RECEIVE.map((item) => (
              <li
                key={item}
                className="rounded-[20px] border border-[#EFE5DA] bg-white px-4 py-3 text-sm font-medium text-[#20242E]"
              >
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* What you receive */}
      <section
        className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20"
        aria-labelledby="deliverables-heading"
      >
        <Container>
          <h2
            id="deliverables-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            What you receive
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {DELIVERABLES.map((item) => (
              <li
                key={item.title}
                className="flex gap-4 rounded-[20px] border border-[#EFE5DA] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.08)]"
              >
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FDE9DD] text-sm font-bold text-[#C8430F]">
                  ✓
                </span>
                <div>
                  <h3 className="font-semibold text-[#20242E]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#4A5263]">{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#EFE5DA] py-16 sm:py-20" aria-labelledby="faq-heading">
        <Container>
          <h2
            id="faq-heading"
            className="font-[family-name:var(--font-heading)] text-3xl font-medium tracking-[-0.03em] text-[#20242E] sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-4">
            {FOR_VENUES_FAQ.map((item) => (
              <div
                key={item.question}
                className="rounded-[20px] border border-[#EFE5DA] bg-white p-5 shadow-[0_8px_24px_-16px_rgba(122,80,48,0.06)]"
              >
                <dt className="text-base font-semibold text-[#20242E]">{item.question}</dt>
                <dd className="mt-2 text-sm leading-7 text-[#4A5263]">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Lead form */}
      <section className="border-t border-[#EFE5DA] bg-[#FAF4ED] py-16 sm:py-20" id="book-audit">
        <Container className="max-w-2xl">
          <ForVenuesLeadForm />
        </Container>
      </section>
    </div>
  );
}
