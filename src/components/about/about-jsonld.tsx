import { JsonLdScript } from "@/components/seo/json-ld-script";
import { absoluteUrl } from "@/lib/seo/site-url";

export function AboutJsonLd() {
  const url = absoluteUrl("/about");

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Access Stamp",
    url: absoluteUrl("/"),
    description:
      "A disability-led platform helping disabled people, wheelchair users, carers, families, and venues make better access decisions.",
  };

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Access Stamp",
    url,
    description:
      "Access Stamp is a disability-led platform helping disabled people, wheelchair users, carers, families, and venues make better access decisions through practical guides, venue information, verification labels, and AI tools.",
    isPartOf: {
      "@type": "WebSite",
      name: "Access Stamp",
      url: absoluteUrl("/"),
    },
    about: organization,
  };

  return (
    <>
      <JsonLdScript data={organization} />
      <JsonLdScript data={aboutPage} />
    </>
  );
}
