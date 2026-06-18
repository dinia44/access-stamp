import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const STATIC_PAGE_SEO = {
  home: {
    title: "Access Stamp — accessible venues, advice and AI tools",
    description:
      "Venue access information, plain-English advice on rights, benefits and equipment, and practical tools — built by disabled people.",
    path: "/",
  },
  venueFinder: {
    title: "Venue Finder — practical access information across the UK",
    description:
      "Search UK venues by step-free access, toilets, parking, hearing support and more. Confidence labels, known unknowns, and evidence where available.",
    path: "/venue-finder",
  },
  advice: {
    title: "Advice hub — disability rights, benefits and equipment",
    description:
      "Plain-English UK guides on rights, benefits, equipment, travel, work and care — written for disabled people, carers and families.",
    path: "/advice",
  },
  ai: {
    title: "AI assistant for accessibility planning",
    description:
      "Ask Access Stamp about venues, rights, equipment funding and travel — grounded in UK-specific guidance and audited venue data.",
    path: "/ai",
  },
  aiToolkit: {
    title: "AI toolkit — practical accessibility tools",
    description:
      "Letter builders, evidence checklists, venue-fit planners and more — AI tools designed for disabled people navigating UK systems.",
    path: "/ai-toolkit",
  },
  blog: {
    title: "Blog — lived experience and access insights",
    description:
      "Stories, guides and practical tips from disabled people navigating venues, equipment and everyday access in the UK.",
    path: "/blog",
  },
  about: {
    title: "About Access Stamp | Disability-led access guides, venue finder and practical accessibility tools",
    description:
      "Access Stamp is a disability-led platform helping disabled people, wheelchair users, carers, families, and venues make better access decisions through practical guides, venue information, verification labels, and AI tools.",
    path: "/about",
  },
  lawsGuidance: {
    title: "Laws and official guidance",
    description:
      "Links to UK laws and official guidance on disability rights, benefits, education, transport and public services.",
    path: "/laws-guidance",
  },
  directory: {
    title: "Directory",
    description: "Useful UK organisations, services and resources for disabled people, carers and families.",
    path: "/directory",
  },
  glossary: {
    title: "Glossary",
    description: "Plain-English definitions of disability, benefits and accessibility terms used across Access Stamp.",
    path: "/glossary",
  },
  helpCards: {
    title: "Help cards for real access situations",
    description:
      "Quick, practical cards you can copy, save, print, or use when you need to explain an access need clearly.",
    path: "/help-cards",
  },
  contact: {
    title: "Contact Access Stamp",
    description:
      "Contact Access Stamp about venue access information, guides, partnerships, venue support, or general enquiries.",
    path: "/contact",
  },
  methodology: {
    title: "How Access Stamp access information works",
    description:
      "What Access Stamp records, how confidence labels work, why unknowns are shown, and how to confirm details before travelling.",
    path: "/methodology",
  },
  corrections: {
    title: "Corrections and venue updates",
    description: "Report inaccurate venue information or submit corrected access details to Access Stamp.",
    path: "/corrections",
  },
  complaints: {
    title: "Complaints",
    description: "How to complain about Access Stamp content, venue listings, or how we handled your enquiry.",
    path: "/complaints",
  },
  submitVenue: {
    title: "List your venue",
    description: "List your venue on Access Stamp with access details, photos, and AI-assisted scanning before review.",
    path: "/submit-venue",
  },
  scan: {
    title: "Quick Scan",
    description: "Internal venue scan tool.",
    path: "/scan",
    noIndex: true,
  },
} as const;

export function staticPageMetadata(key: keyof typeof STATIC_PAGE_SEO): Metadata {
  const page = STATIC_PAGE_SEO[key];
  return buildPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    noIndex: "noIndex" in page ? page.noIndex : false,
  });
}
