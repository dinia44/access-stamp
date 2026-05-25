import type { ProfilerArea } from "@/lib/ai-toolkit/types";
import type { ToolkitGuideLink } from "@/lib/ai-toolkit/types";
import { ADVICE_ARTICLES } from "@/lib/mock-data";

const AREA_SLUGS: Record<ProfilerArea, string[]> = {
  Benefits: [
    "pip-renewal-form-what-to-write",
    "pip-mandatory-reconsideration",
    "pip-tribunal-appeal-guide",
    "blue-badge-application-renewal",
    "attendance-allowance-application-guide",
    "universal-credit-lcwra-work-capability",
    "dla-for-children-claim-guide",
  ],
  Work: ["reasonable-adjustments-at-work", "access-to-work-application-guide"],
  Travel: ["book-train-assistance-passenger-assist"],
  Education: ["school-reasonable-adjustments", "request-ehcp-needs-assessment", "dla-for-children-claim-guide"],
  Housing: ["disabled-facilities-grant-home-adaptations"],
  Care: [
    "care-needs-assessment-social-services",
    "carers-assessment-request-guide",
    "carers-allowance-application-guide",
    "nhs-continuing-healthcare-chc-screening",
  ],
  "Venue Visit": ["venue-finder"],
  Other: ["pip-in-plain-english", "care-needs-assessment-social-services"],
};

export function guidesForArea(area: ProfilerArea, limit = 5): ToolkitGuideLink[] {
  const slugs = AREA_SLUGS[area] ?? AREA_SLUGS.Other;
  const links: ToolkitGuideLink[] = [];
  for (const slug of slugs) {
    if (slug === "venue-finder") {
      links.push({ label: "Venue Finder", href: "/venue-finder" });
      continue;
    }
    const article = ADVICE_ARTICLES.find((a) => a.slug === slug);
    if (article) links.push({ label: article.title, href: `/advice/${article.slug}` });
    if (links.length >= limit) break;
  }
  return links;
}

export function guidesForLetterType(letterType: string): ToolkitGuideLink[] {
  const map: Record<string, string[]> = {
    "PIP renewal": ["pip-renewal-form-what-to-write"],
    "PIP mandatory reconsideration": ["pip-mandatory-reconsideration", "pip-tribunal-appeal-guide"],
    "Access to Work": ["access-to-work-application-guide"],
    "Reasonable adjustments at work": ["reasonable-adjustments-at-work"],
    "School reasonable adjustments": ["school-reasonable-adjustments"],
    "EHCP assessment request": ["request-ehcp-needs-assessment"],
    "Passenger Assist complaint": ["book-train-assistance-passenger-assist"],
    "Care needs assessment request": ["care-needs-assessment-social-services", "carers-assessment-request-guide"],
    "Blue Badge support": ["blue-badge-application-renewal"],
    "Disabled Facilities Grant enquiry": ["disabled-facilities-grant-home-adaptations"],
  };
  const slugs = map[letterType] ?? [];
  return slugs
    .map((slug) => {
      const a = ADVICE_ARTICLES.find((x) => x.slug === slug);
      return a ? { label: a.title, href: `/advice/${slug}` } : null;
    })
    .filter((x): x is ToolkitGuideLink => x !== null);
}

export function guidesForTopic(topic: string): ToolkitGuideLink[] {
  const low = topic.toLowerCase();
  const scored = ADVICE_ARTICLES.map((a) => {
    const hay = `${a.title} ${a.tags.join(" ")} ${a.categorySlug}`.toLowerCase();
    let score = 0;
    for (const token of low.split(/\s+/)) {
      if (token.length > 3 && hay.includes(token)) score += 1;
    }
    return { a, score };
  })
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 4);
  if (!scored.length) {
    return [{ label: "Advice Hub", href: "/advice" }];
  }
  return scored.map((x) => ({ label: x.a.title, href: `/advice/${x.a.slug}` }));
}

export function articleBySlug(slug: string) {
  return ADVICE_ARTICLES.find((a) => a.slug === slug);
}
