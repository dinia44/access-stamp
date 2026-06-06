import type { Venue } from "@/lib/mock-data";

export const QUICK_FILTERS = [
  "Step-free entrance",
  "Accessible toilet",
  "Blue Badge parking",
  "Powerchair suitable",
  "Changing Places",
  "Verified by Access Stamp",
] as const;

export type FilterGroup = {
  title: string;
  filters: { label: string; key: string }[];
};

export const FILTER_GROUPS: FilterGroup[] = [
  {
    title: "Access needs",
    filters: [
      { label: "Step-free entrance", key: "Step-free entrance" },
      { label: "Accessible toilet", key: "Accessible toilet" },
      { label: "Manual wheelchair suitable", key: "Turning space (150cm+)" },
      { label: "Powerchair suitable", key: "Powered wheelchair suitable" },
      { label: "Level access inside", key: "Step-free entrance" },
      { label: "Lift available", key: "Lift access" },
    ],
  },
  {
    title: "Parking & arrival",
    filters: [
      { label: "Blue Badge parking", key: "Nearby Blue Badge parking" },
      { label: "Drop-off nearby", key: "Drop-off nearby" },
      { label: "Public transport nearby", key: "Public transport nearby" },
      { label: "Parking within 50m", key: "Parking within 50m" },
    ],
  },
  {
    title: "Toilets",
    filters: [
      { label: "Accessible toilet", key: "Accessible toilet" },
      { label: "Changing Places", key: "Changing Places toilet" },
      { label: "Left-side transfer", key: "Left-side transfer" },
      { label: "Right-side transfer", key: "Right-side transfer" },
      { label: "Grab rails", key: "Grab rails" },
      { label: "Radar key", key: "Radar key" },
    ],
  },
  {
    title: "Confidence",
    filters: [
      { label: "Access Stamp checked", key: "__verified_checked" },
      { label: "Community reported", key: "__verified_community" },
      { label: "Recently updated", key: "__recently_updated" },
      { label: "High confidence only", key: "__high_confidence" },
    ],
  },
];

/** Maps quick-filter labels to internal filter keys */
export const QUICK_FILTER_KEYS: Record<string, string> = {
  "Step-free entrance": "Step-free entrance",
  "Accessible toilet": "Accessible toilet",
  "Blue Badge parking": "Nearby Blue Badge parking",
  "Powerchair suitable": "Powered wheelchair suitable",
  "Changing Places": "Changing Places toilet",
  "Quiet / sensory-friendly": "Quiet environment",
  "Verified by Access Stamp": "__verified_checked",
};

const SUMMARY_FEATURES = [
  "Step-free entrance",
  "Accessible toilet",
  "Nearby Blue Badge parking",
  "Lift access",
  "Changing Places toilet",
  "Powered wheelchair suitable",
  "Quiet environment",
] as const;

const FEATURE_DISPLAY: Record<string, string> = {
  "Step-free entrance": "Step-free entrance",
  "Accessible toilet": "Accessible toilet",
  "Nearby Blue Badge parking": "Blue Badge parking 30m from entrance",
  "Lift access": "Lift available to all public floors",
  "Changing Places toilet": "Changing Places toilet",
  "Powered wheelchair suitable": "Powerchair suitable",
  "Quiet environment": "Quiet / sensory-friendly area",
  "Wide doorways (80cm+)": "Door width 86cm+",
};

export function normalize(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function tokenize(input: string) {
  return normalize(input).split(" ").filter(Boolean);
}

const QUERY_SYNONYMS: Record<string, string[]> = {
  toilet: ["accessible toilet", "toilets", "bathroom", "wc"],
  parking: ["blue badge parking", "nearby blue badge parking", "car park"],
  quiet: ["quiet environment", "calm", "sensory"],
  stepfree: ["step free", "step-free entrance", "wheelchair access"],
};

export function credibilityScore(verification: string, confidence: string) {
  const verificationScore =
    verification === "Access Stamp checked" ? 3 : verification === "Community reported" ? 2 : 1;
  const confidenceScore = confidence === "High" ? 3 : confidence === "Medium" ? 2 : 1;
  return verificationScore + confidenceScore;
}

function matchesFeatureFilter(venue: Venue, key: string): boolean {
  if (key === "__verified_checked") return venue.verification === "Access Stamp checked";
  if (key === "__verified_community") return venue.verification === "Community reported";
  if (key === "__high_confidence") return venue.confidence === "High";
  if (key === "__recently_updated") return true;
  if (key === "__wheelchair_access") {
    return (
      venue.features["Step-free entrance"] === "yes" ||
      venue.features["Turning space (150cm+)"] === "yes" ||
      venue.features["Powered wheelchair suitable"] === "yes"
    );
  }
  if (key === "__hearing_loop") {
    return venue.tags.some((tag) => /hearing\s*loop/i.test(tag));
  }
  return venue.features[key] === "yes";
}

export function filterVenues(
  venues: Venue[],
  {
    query,
    selectedFilters,
    verifiedOnly,
    sortBy,
  }: {
    query: string;
    selectedFilters: string[];
    verifiedOnly: boolean;
    sortBy: string;
  },
): Venue[] {
  let items = [...venues];

  const q = query.trim();
  if (q) {
    const terms = tokenize(q);
    const expandedTerms = terms.flatMap((term) => [term, ...(QUERY_SYNONYMS[term] ?? [])]);
    items = items
      .map((v) => {
        const featureKeys = Object.entries(v.features)
          .filter(([, value]) => value === "yes")
          .map(([key]) => key.toLowerCase());
        const haystack = [
          v.name.toLowerCase(),
          v.location.toLowerCase(),
          v.type.toLowerCase(),
          v.summary.toLowerCase(),
          ...v.tags.map((t) => t.toLowerCase()),
          ...featureKeys,
        ];
        const score = expandedTerms.reduce((acc, term) => {
          if (haystack.some((field) => field.includes(term))) return acc + 3;
          return acc;
        }, 0);
        return { venue: v, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.venue);
  }

  if (selectedFilters.length) {
    items = items.filter((v) => selectedFilters.every((f) => matchesFeatureFilter(v, f)));
  }

  if (verifiedOnly) {
    items = items.filter((v) => v.verification === "Access Stamp checked");
  }

  if (sortBy === "Rating") {
    items.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Distance") {
    items.sort((a, b) => a.location.localeCompare(b.location));
  } else if (sortBy === "Credibility") {
    items.sort(
      (a, b) =>
        credibilityScore(b.verification, b.confidence) - credibilityScore(a.verification, a.confidence),
    );
  } else {
    items.sort((a, b) => b.confidence.localeCompare(a.confidence));
  }

  return items;
}

export function buildAccessSummary(venue: Venue): string {
  const parts = SUMMARY_FEATURES.filter((f) => venue.features[f] === "yes").map(
    (f) => FEATURE_DISPLAY[f] ?? f,
  );
  if (parts.length) return parts.join(" · ");
  return venue.summary;
}

export function buildBestFor(venue: Venue): string {
  const audiences: string[] = [];
  if (venue.features["Step-free entrance"] === "yes") audiences.push("people who need step-free access");
  if (venue.features["Turning space (150cm+)"] === "yes") audiences.push("manual wheelchair users");
  if (venue.features["Powered wheelchair suitable"] === "yes") audiences.push("powerchair users");
  if (venue.features["Quiet environment"] === "yes") audiences.push("people who need quieter spaces");
  if (venue.features["Changing Places toilet"] === "yes") audiences.push("people who need Changing Places");
  if (!audiences.length) return "Check the full access report for who this venue suits best.";
  const unique = [...new Set(audiences)];
  return unique.map((a) => a.charAt(0).toUpperCase() + a.slice(1)).join(", ");
}

export function buildWarning(venue: Venue): string | null {
  if (venue.verification === "Not yet verified") {
    return "Check before visiting: access details are not yet verified by Access Stamp.";
  }
  if (venue.confidence === "Low") {
    return "Check before visiting: confidence rating is low — confirm details before travel.";
  }
  const unknownToilet = venue.features["Accessible toilet"] === "unknown";
  const noTransfer =
    venue.features["Left-side transfer"] !== "yes" && venue.features["Right-side transfer"] !== "yes";
  if (unknownToilet) {
    return "Check before visiting: accessible toilet not confirmed.";
  }
  if (venue.features["Accessible toilet"] === "yes" && noTransfer) {
    return "Check before visiting: toilet transfer side not confirmed.";
  }
  if (venue.features["Turning space (150cm+)"] === "no") {
    return "Check before visiting: tight turning space reported near seating or counters.";
  }
  return null;
}

export function directionsUrl(venue: Venue): string {
  const q = encodeURIComponent(`${venue.name}, ${venue.location}, UK`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function mapIncomingFilters(input: string): string[] {
  if (!input.trim()) return [];
  const requested = input
    .split(",")
    .map((x) => normalize(x))
    .filter(Boolean);

  const allKeys = [
    ...FILTER_GROUPS.flatMap((g) => g.filters.map((f) => f.key)),
    ...Object.values(QUICK_FILTER_KEYS),
  ];

  return [...new Set(allKeys)].filter((key) => {
    const label =
      FILTER_GROUPS.flatMap((g) => g.filters).find((f) => f.key === key)?.label ??
      Object.entries(QUICK_FILTER_KEYS).find(([, v]) => v === key)?.[0] ??
      key;
    const n = normalize(label);
    return requested.some((r) => n.includes(r) || r.includes(n));
  });
}

export function mapQueryToFilters(query: string): string[] {
  const q = normalize(query);
  if (!q) return [];
  const keys: string[] = [];
  for (const group of FILTER_GROUPS) {
    for (const f of group.filters) {
      if (q.includes(normalize(f.label))) keys.push(f.key);
    }
  }
  for (const [label, key] of Object.entries(QUICK_FILTER_KEYS)) {
    if (q.includes(normalize(label))) keys.push(key);
  }
  return [...new Set(keys)];
}
