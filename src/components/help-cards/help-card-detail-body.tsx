"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { HelpCard } from "@/data/help-cards/types";
import { HelpCardContextSelector } from "@/components/help-cards/help-card-context-selector";
import { HelpCardReviewMetadata } from "@/components/help-cards/help-card-review-metadata";
import { HelpCardAtAGlance } from "@/components/help-cards/help-card-at-a-glance";
import { HelpCardRuleSections } from "@/components/help-cards/help-card-rule-section";
import { IfChallenged } from "@/components/help-cards/if-challenged";
import { HelpCardDetailActions } from "@/components/help-cards/help-card-detail-actions";

function HelpCardDetailBodyInner({ card }: { card: HelpCard }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [activeId, setActiveId] = useState(() => {
    const value = searchParams.get("context");
    return card.variants.some((variant) => variant.id === value) ? value! : card.variants[0]?.id;
  });

  useEffect(() => {
    const value = searchParams.get("context");
    if (value && card.variants.some((variant) => variant.id === value)) {
      setActiveId(value);
    }
  }, [card.variants, searchParams]);

  const variant = useMemo(
    () => card.variants.find((item) => item.id === activeId) ?? card.variants[0],
    [activeId, card.variants],
  );

  function onChange(id: string) {
    setActiveId(id);
    const params = new URLSearchParams(searchParams.toString());
    if (card.variants[0]?.id === id) params.delete("context");
    else params.set("context", id);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  if (!variant) return null;

  return (
    <div className="space-y-8">
      <HelpCardContextSelector variants={card.variants} activeId={variant.id} onChange={onChange} />

      <HelpCardReviewMetadata card={card} variant={variant} />

      <HelpCardAtAGlance rules={variant.rules} />

      <section aria-labelledby="rules-heading">
        <h2 id="rules-heading" className="text-2xl font-semibold text-[var(--color-ink)]">
          What the rules say
        </h2>
        <div className="mt-4">
          <HelpCardRuleSections rules={variant.rules} sources={card.sources} />
        </div>
      </section>

      <IfChallenged rules={variant.rules} sources={card.sources} cardTitle={card.title} />

      {variant.confirm?.length ? (
        <section aria-labelledby="confirm-heading">
          <h2 id="confirm-heading" className="text-2xl font-semibold text-[var(--color-ink)]">
            What to confirm
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5" role="list">
            {variant.confirm.map((item) => (
              <li key={item} className="text-sm leading-6 text-[var(--color-ink)]">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-labelledby="save-print-heading">
        <h2 id="save-print-heading" className="sr-only">
          Save or print this card
        </h2>
        <HelpCardDetailActions card={card} variant={variant} />
      </section>
    </div>
  );
}

export function HelpCardDetailBody({ card }: { card: HelpCard }) {
  return (
    <Suspense fallback={<div className="text-sm text-[var(--color-text-muted)]">Loading card…</div>}>
      <HelpCardDetailBodyInner card={card} />
    </Suspense>
  );
}
