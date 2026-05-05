import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export default function CarePage() {
  return (
    <AdviceCategoryLanding
      categorySlug="care"
      breadcrumbLabel="Care & Support"
      badge="Care & Support"
      title="Care that stays safe when systems are stretched"
      subtitle="Personal budgets, employing PAs, Care Act assessments, and what to do when care fails — written for disabled people and families managing risk at home."
      quickActions={[
        { label: "Personal budgets", href: "/advice/personal-budgets-and-direct-payments" },
        { label: "Employing a PA", href: "/advice/employing-a-personal-assistant-basics" },
        { label: "Care Act assessments", href: "/advice/care-act-assessments-and-eligibility" },
      ]}
      featuredSlugs={[
        "personal-budgets-and-direct-payments",
        "employing-a-personal-assistant-basics",
        "when-care-plans-break-down",
      ]}
      topicAreas={[
        {
          title: "Direct payments",
          desc: "Control, paperwork, backups when PAs disappear.",
          href: "/advice/personal-budgets-and-direct-payments",
        },
        {
          title: "Employing PAs",
          desc: "Roles, boundaries, and stopping unsafe care.",
          href: "/advice/employing-a-personal-assistant-basics",
        },
        {
          title: "When care breaks",
          desc: "Escalation, safeguarding, and discharge gaps.",
          href: "/advice/when-care-plans-break-down",
        },
      ]}
      checklistTitle="If care feels unsafe"
      checklistItems={[
        "Write the risk plainly: who should act, by when.",
        "Keep names and reference numbers for every call.",
        "Use safeguarding routes where harm is likely, not only inconvenient.",
      ]}
    />
  );
}
