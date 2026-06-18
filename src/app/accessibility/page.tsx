import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import {
  ACCESSIBILITY_CONFORMANCE_TARGET,
  ACCESSIBILITY_FEEDBACK_EMAIL,
  ACCESSIBILITY_LAST_REVIEW,
  ACCESSIBILITY_LIMITATIONS,
  ACCESSIBILITY_TESTING,
} from "@/lib/accessibility-statement-content";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Accessibility Statement",
  description:
    "How Access Stamp approaches accessibility — WCAG 2.2 AA target, testing carried out, known limitations, and how to give feedback.",
  path: "/accessibility",
});

export default function AccessibilityStatementPage() {
  return (
    <div className="bg-[#FDFBF8] py-12 text-[#20242E] sm:py-16">
      <Container className="max-w-3xl">
        <h1 className="font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] sm:text-5xl">
          Accessibility statement
        </h1>
        <p className="mt-4 text-lg leading-8 text-[#4A5263]">
          Access Stamp exists to make practical accessibility information easier to find. This page explains our
          commitment, the testing we carry out, known limitations, and how to tell us when something is not working
          for you.
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
            We target <strong className="font-semibold text-[#20242E]">{ACCESSIBILITY_CONFORMANCE_TARGET}</strong> for
            the Access Stamp website. We review new features against that standard before release.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">What we have done</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-[#4A5263]">
            <li>Semantic HTML structure with landmarks, headings, and descriptive link text</li>
            <li>Keyboard-operable navigation, filters, comboboxes, and form controls</li>
            <li>Skip link to main content on every page</li>
            <li>Plain-English copy with text labels alongside colour-coded access scores</li>
            <li>Alt text on venue images and persistent labels on form fields</li>
            <li>Visible focus states and accessible error summaries on forms</li>
            <li>Demo listing banners so illustration content is not mistaken for live audits</li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">Testing carried out</h2>
          <p className="text-base leading-8 text-[#4A5263]">
            Last full review: <strong className="font-semibold text-[#20242E]">{ACCESSIBILITY_LAST_REVIEW}</strong>
          </p>

          <h3 className="text-lg font-semibold text-[#20242E]">Automated testing</h3>
          <p className="text-base leading-8 text-[#4A5263]">
            Tools: {ACCESSIBILITY_TESTING.automated.tools.join(", ")}. Last run:{" "}
            {ACCESSIBILITY_TESTING.automated.lastRun}.
          </p>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-[#4A5263]">
            {ACCESSIBILITY_TESTING.automated.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ul>
          <p className="text-sm text-[#76808F]">
            Key routes checked: {ACCESSIBILITY_TESTING.automated.routes.join(", ")}
          </p>

          <h3 className="text-lg font-semibold text-[#20242E]">Manual keyboard testing</h3>
          <p className="text-base leading-8 text-[#4A5263]">
            Date: {ACCESSIBILITY_TESTING.manual.keyboard.date}. Scope:{" "}
            {ACCESSIBILITY_TESTING.manual.keyboard.scope}.
          </p>

          <h3 className="text-lg font-semibold text-[#20242E]">Screen reader spot checks</h3>
          <p className="text-base leading-8 text-[#4A5263]">
            Date: {ACCESSIBILITY_TESTING.manual.screenReader.date}. Tools:{" "}
            {ACCESSIBILITY_TESTING.manual.screenReader.tools.join("; ")}. Scope:{" "}
            {ACCESSIBILITY_TESTING.manual.screenReader.scope}.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">Known limitations</h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-8 text-[#4A5263]">
            {ACCESSIBILITY_LIMITATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-semibold text-[#20242E]">How to give feedback</h2>
          <p className="text-base leading-8 text-[#4A5263]">
            If you find a barrier on Access Stamp — keyboard traps, missing labels, poor contrast, confusing language, or
            anything else — please email{" "}
            <a
              href={`mailto:${ACCESSIBILITY_FEEDBACK_EMAIL}`}
              className="font-semibold text-[#C8430F] underline-offset-2 hover:underline"
            >
              {ACCESSIBILITY_FEEDBACK_EMAIL}
            </a>{" "}
            or use our{" "}
            <Link href="/contact" className="font-semibold text-[#C8430F] underline-offset-2 hover:underline">
              contact form
            </Link>
            . We aim to respond within <strong className="font-semibold text-[#20242E]">five working days</strong> and
            will tell you what we can fix and when.
          </p>
        </section>

        <p className="mt-12 text-sm text-[#76808F]">Last reviewed: {ACCESSIBILITY_LAST_REVIEW}</p>
      </Container>
    </div>
  );
}
