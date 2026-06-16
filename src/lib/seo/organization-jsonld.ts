import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { absoluteUrl } from "@/lib/seo/site-url";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Access Stamp",
    url: absoluteUrl("/"),
    logo: CLOUDINARY_MEDIA.siteLogo,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@accessstamp.co.uk",
      areaServed: "GB",
      availableLanguage: "English",
    },
  };
}
