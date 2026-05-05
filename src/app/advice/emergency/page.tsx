import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export default function EmergencyPage() {
  return (
    <AdviceCategoryLanding
      categorySlug="emergency"
      breadcrumbLabel="Emergency & Quick Help"
      badge="Emergency & Quick Help"
      title="When things go wrong fast — routes that still work"
      subtitle="Breakdowns, urgent NHS choices, mental health crisis lines, power cuts with medical equipment, and simple planning so other people can help you communicate."
      quickActions={[
        { label: "Wheelchair breakdown", href: "/advice/wheelchair-breakdown-what-to-do" },
        { label: "111 vs 999", href: "/advice/nhs-111-and-999-how-to-choose" },
        { label: "Helplines & text", href: "/advice/helplines-text-lines-you-can-use-today" },
      ]}
      featuredSlugs={[
        "wheelchair-breakdown-what-to-do",
        "urgent-mental-health-support-uk",
        "nhs-111-and-999-how-to-choose",
      ]}
      topicAreas={[
        {
          title: "Mental health urgent support",
          desc: "NHS, charity, and crisis lines — know what to expect.",
          href: "/advice/urgent-mental-health-support-uk",
        },
        {
          title: "Power & equipment",
          desc: "Outages with chairs, beds, or powered medical kit.",
          href: "/advice/power-cuts-and-medical-equipment-plan-b",
        },
        {
          title: "Wallet card & contacts",
          desc: "Short written facts when speech or cognition drops.",
          href: "/advice/wallet-card-and-emergency-contacts",
        },
      ]}
      checklistTitle="Keep these reachable"
      checklistItems={[
        "Samaritans 116 123 and SHOUT 85258 saved on your phone.",
        "A written chair serial number and local repair contact.",
        "One person who can advocate for you if calls are hard.",
      ]}
    />
  );
}
