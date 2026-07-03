import Link from "next/link";
import { Container } from "@/components/container";
import { NewsletterBlock } from "@/components/layout/NewsletterBlock";
import { SiteLogo } from "@/components/site-logo";
import { SITE_CONFIG } from "@/lib/site-config";
import {
  FOOTER_ACCESS_STAMP_LINKS,
  FOOTER_EXPLORE_LINKS,
  FOOTER_LEGAL_LINKS,
  FOOTER_RESOURCE_LINKS,
} from "@/lib/navigation";

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
        <NewsletterBlock />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-12">
          <div className="space-y-5">
            <Link href="/" aria-label="Access Stamp — home">
              <SiteLogo className="h-auto max-h-7 w-auto object-contain" />
            </Link>
            <p className="max-w-sm text-sm leading-7 text-[#c8d4d0]">
              Practical access information, plain-English guides, and structured tools — built to help disabled people,
              families, carers, and venues make confident decisions.
            </p>
            <ul className="space-y-2 text-sm">
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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FooterColumn title="Explore" links={FOOTER_EXPLORE_LINKS} />
            <FooterColumn title="Access Stamp" links={FOOTER_ACCESS_STAMP_LINKS} />
            <FooterColumn title="Resources" links={FOOTER_RESOURCE_LINKS} />
            <FooterColumn title="Legal" links={FOOTER_LEGAL_LINKS} />
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
