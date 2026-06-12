import type { Venue as CanonicalVenue, VenueCategory, VenueFeatureKey } from "@/data/venues";
import { absoluteUrl } from "@/lib/seo/site-url";

const CATEGORY_SCHEMA: Record<VenueCategory, string> = {
  Restaurant: "Restaurant",
  Café: "CafeOrCoffeeShop",
  "Arts & Culture": "Museum",
  Entertainment: "MovieTheater",
  Leisure: "SportsActivityLocation",
  Shopping: "Store",
  Outdoor: "Park",
  Other: "LocalBusiness",
};

const FEATURE_AMENITY: Partial<Record<VenueFeatureKey, string>> = {
  step_free: "Wheelchair accessible entrance",
  accessible_toilet: "Wheelchair accessible toilet",
  parking: "Accessible parking",
  lift: "Elevator",
  hearing_loop: "Hearing loop",
  quiet_space: "Quiet environment",
  seating: "Seating available",
  assistance: "Staff assistance available",
};

function amenityFeatures(venue: CanonicalVenue) {
  return venue.features
    .map((key) => FEATURE_AMENITY[key])
    .filter(Boolean)
    .map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    }));
}

export function buildVenueLocalBusinessJsonLd(venue: CanonicalVenue) {
  const url = absoluteUrl(`/venue/${venue.slug}`);
  const image = venue.images[0]?.src ?? venue.photos[0]?.src;
  const schemaType = CATEGORY_SCHEMA[venue.category] ?? "LocalBusiness";

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: venue.name,
    description: venue.summary,
    url,
    image: image ? [image] : undefined,
    address: {
      "@type": "PostalAddress",
      addressLocality: venue.town,
      addressRegion: venue.area,
      postalCode: venue.postcodePrefix,
      addressCountry: "GB",
    },
    amenityFeature: amenityFeatures(venue),
    keywords: venue.tags.join(", "),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; href?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? absoluteUrl(item.href) : undefined,
    })),
  };
}
