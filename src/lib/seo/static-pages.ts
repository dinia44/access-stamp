import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const STATIC_PAGE_SEO = {
  home: {
    title: "Access Stamp — accessible venues, advice and AI tools",
    description:
      "Access-checked UK venues, plain-English advice on rights, benefits and equipment, and AI tools that help you plan — built by disabled people.",
    path: "/",
  },
  venueFinder: {
    title: "Venue Finder — access-checked places across the UK",
    description:
      "Search UK venues by step-free access, toilets, parking, hearing support and more. Photo-evidenced access reports with confidence ratings.",
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
    title: "About Access Stamp",
    description:
      "Access Stamp is built by disabled people in the UK to make practical accessibility information easier to find and trust.",
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
    title: "Help cards",
    description: "Quick-reference cards for common disability rights and access situations in the UK.",
    path: "/help-cards",
  },
  submitVenue: {
    title: "List your venue",
    description: "Submit a venue for community access reporting or request an Access Stamp audit.",
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
