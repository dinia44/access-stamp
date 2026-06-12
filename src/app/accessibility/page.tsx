import type { Metadata } from "next";
import { Container } from "@/components/container";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Accessibility Statement",
  description:
    "How Access Stamp approaches accessibility — our WCAG 2.2 AA target, what we have done, known limitations, and how to give feedback.",
  path: "/accessibility",
});

const LAST_REVIEW = "June 2026";

export default function AccessibilityStatementPage() {
  return (
    <div className="bg-[#FDFBF8] py-12 text-[#20242E] sm:py-16">
      <Container className="max-w-3xl">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          Accessibility statement
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#4A5263]">
          Access Stamp exists to make practical accessibility information easier to find. This page explains our
          commitment, what we have done so far, and how to tell us when something is not working for you.
        </p>

        <section className="mt-12 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">Our commitment</h2>
          <p className="text-base leading-8 text-[#4A5263]">
            We aim to meet the needs of disabled people, older people, carers, and anyone who relies on clear access
            information. Accessibility is part of the product — not a separate checklist we bolt on at the end.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">Conformance target</h2>
          <p className="text-base leading-8 text-[#4A5263]">
            We target <strong className="font-semibold text-[#20242E]">WCAG 2.2 Level AA</strong> for the Access Stamp
            website. We review new features against that standard before release.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">What we have done</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-[#4A5263]">
            <li>Semantic HTML structure with landmarks, headings, and descriptive link text</li>
            <li>Keyboard-operable navigation, tabs, filter chips, and photo galleries</li>
            <li>Skip link to main content on every page</li>
            <li>Plain-English copy with text labels alongside colour-coded access scores</li>
            <li>Alt text on venue images and meaningful labels on form fields</li>
            <li>Visible focus states and sufficient contrast for text links on cream backgrounds</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">Known limitations</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-[#4A5263]">
            <li>
              Some venue photos are AI-generated placeholders during early development. Alt text describes the intended
              scene, but may not match a real photograph yet.
            </li>
            <li>Saved venues and account features are still in development and not yet available.</li>
            <li>Third-party map tiles on the venue finder may not meet the same contrast and keyboard standards as the rest
              of the site.</li>
            <li>We are still expanding measured venue data — not every listing has full doorway measurements.</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">How to give feedback</h2>
          <p className="text-base leading-8 text-[#4A5263]">
            If you find a barrier on Access Stamp — keyboard traps, missing labels, poor contrast, confusing language, or
            anything else — please email{" "}
            <a href="mailto:hello@accessstamp.com" className="font-semibold text-[#C8430F] underline-offset-2 hover:underline">
              hello@accessstamp.com
            </a>
            . We aim to respond within <strong className="font-semibold text-[#20242E]">five working days</strong> and
            will tell you what we can fix and when.
          </p>
        </section>

        <p className="mt-12 text-sm text-[#76808F]">Last reviewed: {LAST_REVIEW}</p>
      </Container>
    </div>
  );
}
