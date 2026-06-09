"use client";

import { useState } from "react";
import { AccordionItem } from "@/components/ui/Accordion";

export type AdviceAccordionEntry = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export function AdviceAccordionSection({
  title,
  description,
  items,
  defaultOpenId,
  headingId = "advice-accordion-heading",
}: {
  title: string;
  description?: string;
  items: AdviceAccordionEntry[];
  defaultOpenId?: string;
  headingId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? items[0]?.id ?? null);

  if (!items.length) return null;

  return (
    <section aria-labelledby={headingId} className="space-y-4">
      <div>
        <h2 id={headingId} className="text-xl font-bold text-[var(--color-ink)]">
          {title}
        </h2>
        {description ? <p className="mt-2 text-base leading-7 text-[var(--color-muted)]">{description}</p> : null}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            id={item.id}
            title={item.title}
            isOpen={openId === item.id}
            onToggle={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}
