import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export default function WorkplacePage() {
  return (
    <AdviceCategoryLanding
      categorySlug="workplace"
      breadcrumbLabel="Workplace"
      badge="Workplace"
      title="Work adjustments that survive real workplaces"
      subtitle="Access to Work, reasonable adjustments, discrimination routes, returning after illness, flexible working, and Occupational Health — written for employees navigating imperfect HR processes."
      quickActions={[
        { label: "Access to Work basics", href: "/advice/access-to-work-basics" },
        { label: "Reasonable adjustments", href: "/advice/reasonable-adjustments-you-can-ask-for" },
        { label: "Returning to work", href: "/advice/returning-to-work-after-disability" },
      ]}
      featuredSlugs={[
        "access-to-work-basics",
        "reasonable-adjustments-you-can-ask-for",
        "disability-discrimination-and-grievances",
      ]}
      topicAreas={[
        {
          title: "Discrimination & grievances",
          desc: "Timelines, evidence, and when to get specialist advice.",
          href: "/advice/disability-discrimination-and-grievances",
        },
        {
          title: "Flexible working",
          desc: "Requests that name barriers and propose workable patterns.",
          href: "/advice/flexible-working-and-health",
        },
        {
          title: "Occupational Health",
          desc: "Reading reports, correcting facts, and following up.",
          href: "/advice/occupational-health-and-workplace-assessments",
        },
      ]}
      checklistTitle="Make paperwork work for you"
      checklistItems={[
        "Describe barriers using tasks and outcomes, not only diagnosis labels.",
        "Put important agreements in email after meetings.",
        "Note dates for tribunal deadlines — early advice beats late panic.",
      ]}
    />
  );
}
