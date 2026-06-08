/** Featured access-checked venues shown on the homepage (max 6). */
export const HOME_FEATURED_ACCESS_REPORTS = [
  {
    slug: "harbour-kitchen-liverpool",
    displayName: "City Art Museum",
    city: "Manchester",
    score: 93,
    distance: "12 min drive",
  },
  {
    slug: "royal-armouries-leeds",
    displayName: "The Book Nook",
    city: "Leeds",
    score: 91,
    distance: "8 min drive",
  },
  {
    slug: "central-library-birmingham",
    displayName: "Vue Cinema",
    city: "Birmingham",
    score: 92,
    distance: "15 min drive",
  },
  {
    slug: "riverside-arts-centre-bristol",
    displayName: "Riverside Visitor Centre",
    city: "Bristol",
    score: 94,
    distance: "10 min drive",
  },
  {
    slug: "greenfield-shopping-village-leeds",
    displayName: "Greenfield Shopping Village",
    city: "Leeds",
    score: 90,
    distance: "6 min drive",
  },
  {
    slug: "botanical-gardens-manchester",
    displayName: "Botanical Gardens",
    city: "Manchester",
    score: 95,
    distance: "9 min drive",
  },
] as const;

export const HOME_FEATURED_VENUE_LIMIT = 6 as const;
