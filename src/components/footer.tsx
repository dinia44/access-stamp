import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";

const PLATFORM_LINKS = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Suggest a venue", href: "/submit-venue" },
  { label: "Advice Hub", href: "/advice" },
  { label: "AI Toolkit", href: "/ai-toolkit" },
  { label: "AI Assistant", href: "/ai" },
  { label: "Help Cards", href: "/help-cards" },
] as const;

const LIFE_AREA_LINKS = [
  { label: "Your Rights", href: "/advice/rights" },
  { label: "Equipment", href: "/advice/equipment" },
  { label: "Transport", href: "/advice/transport" },
  { label: "Workplace", href: "/advice/workplace" },
  { label: "Care & Support", href: "/advice/care" },
  { label: "Education", href: "/advice/education" },
] as const;

const CONTENT_LINKS = [
  { label: "Blog", href: "/blog" },
  { label: "Directory", href: "/directory" },
  { label: "Glossary", href: "/glossary" },
  { label: "Laws & Guidance", href: "/laws-guidance" },
  { label: "About", href: "/about" },
  { label: "How we verify listings", href: "/about#listings" },
] as const;

export function Footer() {
  return (
    <footer className="footer-brand text-[#f8fafc] print:hidden">
      <Container className="py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo className="h-auto max-h-10 w-auto object-contain brightness-0 invert" />
            <p className="text-sm text-[#cbd5e1]">
              Practical access information for disabled people, wheelchair users, carers, older people, and families in
              the UK.
            </p>
            <p className="text-xs text-[#94a3b8]">
              Built from lived experience. Not a charity. Not a compliance tool.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold text-[#f8fafc]">Platform</div>
            <ul className="mt-3 space-y-2 text-sm">
              {PLATFORM_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-[#f8fafc]">Life areas</div>
            <ul className="mt-3 space-y-2 text-sm">
              {LIFE_AREA_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold text-[#f8fafc]">Content &amp; info</div>
            <ul className="mt-3 space-y-2 text-sm">
              {CONTENT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="footer-link">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 text-xs text-[#94a3b8] md:flex-row md:items-center md:justify-between">
            <div>&copy; {new Date().getFullYear()} Access Stamp. All rights reserved.</div>
            <div className="flex flex-wrap gap-4">
              <Link href="/legal/privacy" className="footer-link">
                Privacy policy
              </Link>
              <Link href="/legal/terms" className="footer-link">
                Terms of use
              </Link>
              <Link href="/about" className="footer-link">
                About
              </Link>
            </div>
          </div>
          <p className="mt-3 max-w-[90ch] text-xs leading-5 text-[#94a3b8]">
            Access Stamp provides practical guidance — not medical, legal, or financial advice. Always confirm details
            with the relevant provider, council, or professional before making decisions. Venue information may change;
            check before you travel.
          </p>
        </div>
      </Container>
    </footer>
  );
}
