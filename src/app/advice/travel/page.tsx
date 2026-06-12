import type { Metadata } from "next";
import { adviceCategoryMetadata } from "@/lib/seo/advice-categories";

import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export const metadata: Metadata = adviceCategoryMetadata("travel");

export default function TravelPage() {
  return (
    <AdviceCategoryLanding
      categorySlug="travel"
      breadcrumbLabel="Travel"
      badge="Travel"
      title="Holidays and trips without gambling on “accessible” labels"
      subtitle="Ask accommodation the boring-but-critical questions, insure equipment properly, plan airport battery rules, and understand ferry and coach limits before you pay."
      quickActions={[
        { label: "Accessible accommodation", href: "/advice/booking-accessible-accommodation" },
        { label: "Travel insurance", href: "/advice/travel-insurance-and-medical-equipment" },
        { label: "Airports & batteries", href: "/advice/airports-batteries-and-spare-parts" },
      ]}
      featuredSlugs={[
        "booking-accessible-accommodation",
        "travel-insurance-and-medical-equipment",
        "airports-batteries-and-spare-parts",
      ]}
      topicAreas={[
        {
          title: "Insurance & kit",
          desc: "Declaring conditions, equipment limits, and emergency numbers.",
          href: "/advice/travel-insurance-and-medical-equipment",
        },
        {
          title: "Flying tech",
          desc: "Batteries, hand baggage, and labels for mobility devices.",
          href: "/advice/airports-batteries-and-spare-parts",
        },
        {
          title: "Ferries & coaches",
          desc: "Lifts, evacuation limits, and terminal assistance.",
          href: "/advice/ferries-and-coaches-access",
        },
      ]}
      checklistTitle="Before you pay a deposit"
      checklistItems={[
        "Have you confirmed step-free routes and bathroom measurements in writing?",
        "Does insurance cover your wheelchair or scooter value?",
        "Do you have offline copies of prescriptions and equipment letters?",
      ]}
    />
  );
}
