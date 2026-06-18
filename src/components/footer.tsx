import Link from "next/link";
import { Container } from "@/components/container";
import { NewsletterBlock } from "@/components/layout/NewsletterBlock";
import { SiteLogo } from "@/components/site-logo";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  FOOTER_ABOUT_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_RESOURCE_LINKS,
  FOOTER_VENUE_LINKS,
} from "@/lib/navigation";
import { suggestVenueMailto } from "@/lib/venue-submission";

const VENUE_LINKS = [
  ...FOOTER_VENUE_LINKS,
  { label: "Suggest a venue", href: suggestVenueMailto() },
] as const;

function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            {link.href.startsWith("mailto:") ? (
              <a href={link.href} className="footer-link text-sm">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="footer-link text-sm">
                {link.label}
              </Link>
            )}
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
        <NewsletterBlock />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)_minmax(0,0.9fr)] lg:gap-12">
          <div className="space-y-5">
            <Link href="/" aria-label="Access Stamp home">
              <SiteLogo className="h-auto max-h-12 w-auto object-contain sm:max-h-14" />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-[#c8d4d0]">
              Practical access information, plain-English guides, and structured tools — built to help disabled people,
              families, carers, and venues make confident decisions.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <FooterColumn title="Explore" links={FOOTER_EXPLORE_LINKS} />
            <FooterColumn title="About" links={FOOTER_ABOUT_LINKS} />
            <FooterColumn title="Venues" links={VENUE_LINKS} />
            <FooterColumn title="Resources" links={FOOTER_RESOURCE_LINKS} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li>
                <a href={`mailto:${SITE_CONFIG.email}`} className="footer-link">
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="leading-6 text-[#94a3b8]">
                Access Stamp Ltd
                <br />
                {SITE_CONFIG.location}
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
