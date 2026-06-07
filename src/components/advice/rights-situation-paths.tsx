import Link from "next/link";
import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

const PATHS: {
  title: string;
  description: string;
  href: string;
  accent: "blue" | "amber" | "violet";
  icon: string;
  chips: string[];
}[] = [
  {
    title: "Work and volunteering",
    description:
      "Reasonable adjustments, Access to Work, occupational health, and what to put in writing when HR moves slowly.",
    href: "/advice/workplace",
    accent: "blue",
    icon: "💼",
    chips: ["Workplace hub", "Adjustments"],
  },
  {
    title: "NHS, GP, and hospitals",
    description:
      "Appointments, communication formats, complaints, discharge safety, and wheelchair services when waits harm independence.",
    href: "/advice/gp-access",
    accent: "amber",
    icon: "🩺",
    chips: ["GP access", "NHS complaints"],
  },
  {
    title: "Benefits and assessments",
    description:
      "PIP and Universal Credit health elements, mandatory reconsideration, and when assessments must adapt to your needs.",
    href: "/advice/pip-in-plain-english",
    accent: "violet",
    icon: "📬",
    chips: ["PIP primer", "UC / LCWRA"],
  },
  {
    title: "Home, housing, and adaptations",
    description:
      "Council priority, grants, rented-home changes, and equipment from social care when the building is the barrier.",
    href: "/advice/council-housing-priority",
    accent: "blue",
    icon: "🏠",
    chips: ["Housing", "DFG"],
  },
  {
    title: "Education",
    description:
      "SEND, EHCPs, exams, and university disability services — timelines, reviews, and escalation when support slips.",
    href: "/advice/education",
    accent: "violet",
    icon: "🎓",
    chips: ["Schools", "Higher ed"],
  },
  {
    title: "Transport and getting around",
    description:
      "Buses, trains, stations, and assistance bookings — practical complaints and equality duties when journeys break down.",
    href: "/advice/transport",
    accent: "amber",
    icon: "🚆",
    chips: ["Public transport", "Travel hub"],
  },
];

function accentClass(accent: (typeof PATHS)[number]["accent"]) {
  switch (accent) {
    case "blue":
      return "border-l-[var(--blue)] bg-gradient-to-br from-blue-pale/60 to-background";
    case "amber":
      return "border-l-[var(--amber)] bg-gradient-to-br from-amber-pale/70 to-background";
    case "violet":
      return "border-l-[var(--color-secondary)] bg-gradient-to-br from-[#EDF7ED] to-background";
    default:
      return "border-l-border bg-background-2";
  }
}

export function RightsSituationPaths() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PATHS.map((path) => (
        <Link key={path.href} href={path.href} className="group block h-full">
          <Card
            className={cn(
              "flex h-full flex-col rounded-[var(--radius-card)] border border-border p-5 shadow-[var(--shadow-soft)] transition",
              "border-l-4 hover:-translate-y-0.5 hover:shadow-[var(--shadow)]",
              accentClass(path.accent),
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl leading-none transition group-hover:scale-105" aria-hidden>
                {path.icon}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <h3 className="font-[var(--font-heading)] text-base font-semibold text-heading group-hover:text-blue">
                  {path.title}
                </h3>
                <p className="text-sm text-muted">{path.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {path.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-semibold text-heading"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="pt-1 text-sm font-semibold text-blue underline-offset-2 group-hover:underline">
                  Browse this track →
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
