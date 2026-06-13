import Link from "next/link";
import { Container } from "@/components/container";
import { FooterNewsletterSignup } from "@/components/footer-newsletter-signup";
import { SiteLogo } from "@/components/site-logo";

const EXPLORE_LINKS = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Advice Hub", href: "/advice" },
  { label: "AI Tools", href: "/ai-toolkit" },
  { label: "Blog", href: "/blog" },
] as const;

const ABOUT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Mission", href: "/about#mission" },
] as const;

const VENUE_LINKS = [
  { label: "For Venues", href: "/for-venues" },
  { label: "List your venue", href: "/submit-venue" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms", href: "/legal/terms" },
  { label: "Privacy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/privacy#cookies" },
  { label: "Accessibility Statement", href: "/accessibility" },
] as const;

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="footer-link text-sm">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer-brand text-[#f8fafc] print:hidden">
      <Container className="py-14 sm:py-16">
        <FooterNewsletterSignup />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="space-y-5">
            <Link href="/" aria-label="Access Stamp home">
              <SiteLogo className="h-auto max-h-12 w-auto object-contain sm:max-h-14" />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-[#c8d4d0]">
              Your trusted platform for accessible venues, practical advice and disability confidence every step of the
              way.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <FooterColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterColumn title="About" links={ABOUT_LINKS} />
            <FooterColumn title="Venues" links={VENUE_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href="mailto:hello@accessstamp.com" className="footer-link">
                  hello@accessstamp.com
                </a>
              </li>
              <li className="leading-6 text-[#94a3b8]">
                Access Stamp Ltd
                <br />
                Manchester, United Kingdom
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-xs text-[#94a3b8] sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Access Stamp Ltd. All rights reserved.</p>
            <p className="max-w-xl leading-5">
              Access Stamp provides practical guidance — not medical, legal, or financial advice. Always confirm details
              before you travel.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
