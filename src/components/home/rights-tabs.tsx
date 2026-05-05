"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge, Card } from "@/components/ui";

type Tab = {
  key: string;
  label: string;
  slugs: string[];
};

const TABS: Tab[] = [
  {
    key: "driving",
    label: "Driving & Motoring",
    slugs: [
      "blue-badge",
      "motability",
      "vehicle-tax-exemption",
      "parking-rights",
      "wavs",
      "licence-conditions",
    ],
  },
  {
    key: "home",
    label: "Home & Housing",
    slugs: [
      "dfg",
      "council-housing-priority",
      "equipment-through-social-services",
      "adapting-a-rented-property",
      "smart-home",
      "housing-register",
    ],
  },
  {
    key: "benefits",
    label: "Benefits & Finance",
    slugs: [
      "pip-in-plain-english",
      "attendance-allowance",
      "uc-lcwra",
      "carers-allowance",
      "council-tax-disability-reduction",
      "prescription-exemptions",
    ],
  },
  {
    key: "legal",
    label: "Legal Rights",
    slugs: [
      "equality-act",
      "reasonable-adjustments",
      "formal-complaints",
      "eass",
      "advocacy",
      "public-services",
    ],
  },
  {
    key: "nhs",
    label: "NHS & Healthcare",
    slugs: [
      "nhs-wheelchair-services",
      "continuing-healthcare-chc",
      "gp-access",
      "nhs-complaints",
      "mental-health-crisis",
      "traveling-with-care",
    ],
  },
  {
    key: "family",
    label: "Family & Parenting",
    slugs: [
      "disabled-parents",
      "childcare",
      "childrens-benefits",
      "respite",
      "family-activities",
      "pregnancy",
    ],
  },
];

function titleFromSlug(slug: string) {
  const s = slug
    .replace(/-/g, " ")
    .replace(/\bchc\b/i, "CHC")
    .replace(/\bdfg\b/i, "DFG")
    .replace(/\bpip\b/i, "PIP")
    .replace(/\bnhs\b/i, "NHS")
    .replace(/\buc\b/i, "UC")
    .replace(/\bwavs\b/i, "WAVs")
    .replace(/\beass\b/i, "EASS");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function RightsTabs() {
  const [active, setActive] = useState<Tab>(TABS[0]);
  const items = useMemo(() => active.slugs.map((s) => ({ slug: s, title: titleFromSlug(s) })), [active]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((t) => {
          const on = t.key === active.key;
          return (
            <button
              key={t.key}
              type="button"
              className={
                "rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
                (on ? "bg-blue text-white" : "border border-border bg-white text-heading hover:bg-background-2")
              }
              onClick={() => setActive(t)}
              aria-pressed={on}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <Card className="mx-auto max-w-2xl p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-heading">{active.label}</div>
            <div className="mt-1 text-sm text-muted">Browse guides and step-by-step explainers.</div>
          </div>
          <Badge tone="blue">Your rights</Badge>
        </div>

        <div className="mt-4 grid gap-2">
          {items.map((it) => (
            <Link
              key={it.slug}
              href={`/advice/${it.slug}`}
              className="flex items-center justify-between gap-3 rounded-[var(--radius-ui)] border border-border bg-background px-4 py-3 text-sm font-semibold text-heading hover:bg-background-2"
            >
              <span className="flex items-center gap-2">
                <span className="text-blue" aria-hidden>
                  📄
                </span>
                {it.title}
              </span>
              <span className="text-blue" aria-hidden>
                →
              </span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

