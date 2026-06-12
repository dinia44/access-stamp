import type { Metadata } from "next";
import type { AdviceCategorySlug } from "@/lib/content/types";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

const CATEGORY_SEO: Record<
  AdviceCategorySlug,
  { title: string; description: string }
> = {
  rights: {
    title: "Disability rights advice",
    description:
      "Plain-English guides on the Equality Act, reasonable adjustments, complaints and advocacy in the UK.",
  },
  education: {
    title: "Education and SEND advice",
    description:
      "Support for schools, colleges and universities — EHCPs, adjustments and challenging decisions.",
  },
  transport: {
    title: "Transport accessibility advice",
    description:
      "Guides on public transport, Blue Badge, rail assistance and getting around with a disability in the UK.",
  },
  workplace: {
    title: "Workplace accessibility advice",
    description:
      "Reasonable adjustments, Access to Work, phased returns and staying in work with a disability.",
  },
  care: {
    title: "Care and social support advice",
    description:
      "Social care assessments, direct payments, carers' rights and navigating support systems in the UK.",
  },
  equipment: {
    title: "Disability equipment advice",
    description:
      "Wheelchairs, home adaptations, DFGs, VAT relief and funding routes for disability equipment.",
  },
  emergency: {
    title: "Emergency and crisis advice",
    description:
      "What to do in urgent situations — hospital access, safeguarding and getting help quickly.",
  },
  "new-to-disability": {
    title: "New to disability — where to start",
    description:
      "First steps after diagnosis or acquiring a disability — benefits, rights and practical support in the UK.",
  },
  travel: {
    title: "Accessible travel advice",
    description:
      "Planning accessible holidays, air travel assistance, hotels and travel insurance with a disability.",
  },
  cars: {
    title: "Motability and driving advice",
    description:
      "Motability schemes, driving with a disability, vehicle adaptations and licence rules in the UK.",
  },
  sport: {
    title: "Accessible sport and leisure advice",
    description:
      "Finding inclusive sport, leisure centres and activity providers that work for your access needs.",
  },
};

export function adviceCategoryMetadata(category: AdviceCategorySlug): Metadata {
  const seo = CATEGORY_SEO[category];
  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/advice/${category}`,
  });
}
