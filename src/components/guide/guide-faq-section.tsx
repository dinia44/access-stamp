"use client";

import Link from "next/link";
import type { GuideFaq } from "@/lib/guide-content/types";
import { AdviceAccordionSection } from "@/features/advice/AdviceAccordionSection";

function FaqPanel({ faq }: { faq: GuideFaq }) {
  return (
    <div className="space-y-4 text-sm leading-7 text-[var(--color-text)]">
      <p>{faq.explanation}</p>

      {faq.whatToDoNext?.length ? (
        <div>
          <h3 className="text-sm font-bold text-[var(--color-ink)]">What to do next</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            {faq.whatToDoNext.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {faq.exampleWording ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--background-2)] p-4">
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Example wording</h3>
          <p className="mt-2 whitespace-pre-wrap">{faq.exampleWording}</p>
        </div>
      ) : null}

      {faq.evidenceChecklist?.length ? (
        <div>
          <h3 className="text-sm font-bold text-[var(--color-ink)]">Evidence checklist</h3>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            {faq.evidenceChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {faq.relatedHelpCardHref && faq.relatedHelpCardLabel ? (
        <p>
          <Link
            href={faq.relatedHelpCardHref}
            className="font-semibold text-[var(--color-primary)] underline-offset-2 hover:underline"
          >
            {faq.relatedHelpCardLabel}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function GuideFaqSection({
  faqs,
  headingId = "guide-faq-heading",
}: {
  faqs: GuideFaq[];
  headingId?: string;
}) {
  if (!faqs.length) return null;

  return (
    <AdviceAccordionSection
      headingId={headingId}
      title="Common questions"
      description="Practical answers you can use straight away — expand any question for next steps, example wording, and related help."
      defaultOpenId={faqs[0]?.id}
      items={faqs.map((faq) => ({
        id: faq.id,
        title: faq.question,
        content: <FaqPanel faq={faq} />,
      }))}
    />
  );
}
