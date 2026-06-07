import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";

const EXPLORE_LINKS = [
  { label: "Venue Finder", href: "/venue-finder" },
  { label: "Ask AI", href: "/ai" },
  { label: "Advice Hub", href: "/advice" },
  { label: "Practical Guides", href: "/advice" },
  { label: "Blog", href: "/blog" },
] as const;

const ABOUT_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Our Mission", href: "/about#mission" },
  { label: "Our Community", href: "/about#community" },
  { label: "Careers", href: "/about#careers" },
  { label: "Press", href: "/about#press" },
] as const;

const RESOURCE_LINKS = [
  { label: "Accessibility Checklist", href: "/ai-toolkit/venue-questions" },
  { label: "For Venues", href: "/submit-venue" },
  { label: "Partner With Us", href: "/about#partners" },
  { label: "API & Data", href: "/about#data" },
  { label: "Help Centre", href: "/help-cards" },
] as const;

const LEGAL_LINKS = [
  { label: "Terms & Conditions", href: "/legal/terms" },
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/privacy#cookies" },
  { label: "Accessibility Statement", href: "/about#accessibility" },
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "FB" },
  { label: "Instagram", href: "https://instagram.com", icon: "IG" },
  { label: "X (Twitter)", href: "https://x.com", icon: "X" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "LI" },
  { label: "YouTube", href: "https://youtube.com", icon: "YT" },
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
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="space-y-5">
            <SiteLogo className="h-auto max-h-10 w-auto object-contain" />
            <p className="max-w-sm text-sm leading-7 text-[#c8d4d0]">
              Your trusted platform for accessible venues, practical advice and disability confidence every step of the
              way.
            </p>
            <div className="flex flex-wrap gap-2" aria-label="Social media">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-[#c8d4d0] transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#F04A16] focus-visible:outline-offset-4"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <FooterColumn title="Explore" links={EXPLORE_LINKS} />
            <FooterColumn title="About" links={ABOUT_LINKS} />
            <FooterColumn title="Resources" links={RESOURCE_LINKS} />
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
              <li>
                <a href="tel:+441234567890" className="footer-link">
                  +44 (0) 1234 567 890
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
