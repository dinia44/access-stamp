import { ADVICE_CATEGORIES, ADVICE_ARTICLES, SAMPLE_VENUES } from "@/lib/mock-data";

export type SearchItem = {
  title: string;
  description: string;
  category: "Venue" | "Guide" | "Rights" | "Equipment" | "Care" | "Transport" | "Workplace" | "Blog" | "AI Assistant";
  tags: string[];
  url: string;
  comingSoon?: boolean;
};

const corePages: SearchItem[] = [
  {
    title: "Venue Finder",
    description: "Search practical accessibility details before you travel.",
    category: "Venue",
    tags: ["venues", "toilets", "parking", "door width", "turning space"],
    url: "/venue-finder",
  },
  {
    title: "Suggest a venue",
    description: "Tell us about a place to help grow the directory.",
    category: "Venue",
    tags: ["submit", "suggest", "community", "directory"],
    url: "/submit-venue",
  },
  {
    title: "Advice Hub",
    description: "Plain-language UK accessibility guides across daily life.",
    category: "Guide",
    tags: ["guidance", "rights", "equipment", "care", "transport"],
    url: "/advice",
  },
  {
    title: "AI Toolkit",
    description: "Guided tools for action plans, letters, evidence checklists, and venue questions.",
    category: "AI Assistant",
    tags: ["toolkit", "letter", "checklist", "evidence", "action plan"],
    url: "/ai-toolkit",
  },
  {
    title: "Ask Access Stamp AI",
    description: "Get practical help with venues, rights, equipment, and support routes.",
    category: "AI Assistant",
    tags: ["chat", "ai", "assistant", "voice"],
    url: "/ai",
  },
  {
    title: "Blog",
    description: "Practical explainers, walkthroughs, and lived-experience updates.",
    category: "Blog",
    tags: ["updates", "guides", "stories"],
    url: "/blog",
  },
  {
    title: "About",
    description: "How Access Stamp is built and why practical detail matters.",
    category: "Guide",
    tags: ["about", "mission", "trust"],
    url: "/about",
  },
  {
    title: "Directory",
    description: "Search contacts for services, support organisations, and practical help.",
    category: "Guide",
    tags: ["directory", "contacts", "support"],
    url: "/directory",
  },
  {
    title: "Glossary",
    description: "Plain-English definitions for disability terms and acronyms.",
    category: "Guide",
    tags: ["glossary", "jargon", "definitions"],
    url: "/glossary",
  },
];

const adviceCategories: SearchItem[] = ADVICE_CATEGORIES.map((c) => {
  const label = c.title.toLowerCase();
  let category: SearchItem["category"] = "Guide";
  if (label.includes("rights")) category = "Rights";
  else if (label.includes("equipment")) category = "Equipment";
  else if (label.includes("care")) category = "Care";
  else if (label.includes("transport")) category = "Transport";
  else if (label.includes("workplace")) category = "Workplace";

  return {
    title: c.title,
    description: c.desc,
    category,
    tags: [c.title, c.icon],
    url: c.href,
  };
});

const adviceArticles: SearchItem[] = ADVICE_ARTICLES.map((a) => {
  const slug = a.categorySlug;
  let category: SearchItem["category"] = "Guide";
  if (slug === "rights") category = "Rights";
  else if (slug === "equipment") category = "Equipment";
  else if (slug === "care") category = "Care";
  else if (slug === "transport" || slug === "travel" || slug === "cars") category = "Transport";
  else if (slug === "workplace") category = "Workplace";

  return {
    title: a.title,
    description: `Updated ${a.updated.replaceAll("-", "/")} · ${a.tags.slice(0, 3).join(", ")}`,
    category,
    tags: a.tags,
    url: `/advice/${a.slug}`,
  };
});

const venues: SearchItem[] = SAMPLE_VENUES.map((v) => ({
  title: v.name,
  description: `${v.location} · ${v.summary}`,
  category: "Venue",
  tags: v.tags,
  url: `/venue/${v.slug}`,
}));

const blogPosts: SearchItem[] = [
  {
    title: "What I wish I'd known in my first year as a wheelchair user",
    description: "Practical first-year lessons and early equipment decisions.",
    category: "Blog",
    tags: ["personal", "wheelchair", "first year"],
    url: "/blog/what-i-wish-id-known",
  },
  {
    title: "Wheelchair basics: daily transfers",
    description: "Safe transfer basics, positioning, and confidence building.",
    category: "Blog",
    tags: ["tutorial", "transfers", "wheelchair"],
    url: "/blog/wheelchair-basics-daily-transfers",
  },
  {
    title: "Why 'wheelchair accessible' means almost nothing",
    description: "Why specific access detail matters more than vague labels.",
    category: "Blog",
    tags: ["opinion", "venues", "access detail"],
    url: "/blog/why-accessible-means-nothing",
  },
];

export const SEARCH_INDEX: SearchItem[] = [
  ...corePages,
  ...adviceCategories,
  ...adviceArticles,
  ...venues,
  ...blogPosts,
];
