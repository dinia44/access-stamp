import { AdviceCategoryLanding } from "@/components/advice/advice-category-landing";

export default function SportPage() {
  return (
    <AdviceCategoryLanding
      categorySlug="sport"
      breadcrumbLabel="Sport"
      badge="Sport & leisure"
      title="Sport and leisure that fits real bodies and real buildings"
      subtitle="Gyms, pools, grassroots clubs, and adaptive pathways — with practical questions about evacuation, changing, hoists, and fair treatment."
      quickActions={[
        { label: "Gyms & leisure centres", href: "/advice/leisure-centre-and-gym-access" },
        { label: "Adaptive sport clubs", href: "/advice/adaptive-sport-and-local-clubs" },
        { label: "Swimming access", href: "/advice/swimming-pools-changing-places-and-access" },
      ]}
      featuredSlugs={[
        "leisure-centre-and-gym-access",
        "adaptive-sport-and-local-clubs",
        "swimming-pools-changing-places-and-access",
      ]}
      topicAreas={[
        {
          title: "Joining a gym",
          desc: "Inductions, evacuation, and challenging blanket bans.",
          href: "/advice/leisure-centre-and-gym-access",
        },
        {
          title: "Adaptive pathways",
          desc: "Finding credible coaches and sustainable travel to sessions.",
          href: "/advice/adaptive-sport-and-local-clubs",
        },
        {
          title: "Fairness in clubs",
          desc: "Adjustments in grassroots sport under discrimination law.",
          href: "/advice/grassroots-sport-and-equality",
        },
      ]}
      checklistTitle="Questions worth asking up front"
      checklistItems={[
        "How does evacuation work if lifts or pool hoists are involved?",
        "Are Changing Places or suitable changing options actually available?",
        "Who maintains pool hoists and how do you book assistance?",
      ]}
    />
  );
}
