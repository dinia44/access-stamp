import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export default function TransportPage() {
  return (
    <AdviceCategoryLanding
      categorySlug="transport"
      breadcrumbLabel="Transport"
      badge="Transport"
      title="Move around with clearer rights and fewer nasty surprises"
      subtitle="Trains, buses, driving, taxis, flying, and scooter rules — practical steps for Passenger Assist, refusals, parking disputes, and airline battery checks."
      quickActions={[
        { label: "Trains & Passenger Assist", href: "/advice/trains-and-passenger-assistance" },
        { label: "Flying with a wheelchair", href: "/advice/flying-with-a-wheelchair-uk" },
        { label: "Mobility scooters on public transport", href: "/advice/mobility-scooters-on-buses-and-trains" },
      ]}
      featuredSlugs={[
        "trains-and-passenger-assistance",
        "flying-with-a-wheelchair-uk",
        "taxis-and-private-hire-wheelchairs",
      ]}
      topicAreas={[
        {
          title: "Local buses",
          desc: "Ramps, wheelchair space, and what to record when access is refused.",
          href: "/advice/buses-and-local-access",
        },
        {
          title: "Driving & parking",
          desc: "Blue Badge use, enforcement tickets, and evidence for appeals.",
          href: "/advice/driving-parking-enforcement-basics",
        },
        {
          title: "Taxis & PHV",
          desc: "Wheelchair duties, refusals, and reporting to licensing.",
          href: "/advice/taxis-and-private-hire-wheelchairs",
        },
      ]}
      checklistTitle="Three checks before you travel"
      checklistItems={[
        "Have you confirmed assistance or turn-up-and-go rules for each operator?",
        "Do you have operator phone numbers and your chair dimensions written down?",
        "If something fails, can someone safe support you while you escalate the complaint?",
      ]}
    />
  );
}
