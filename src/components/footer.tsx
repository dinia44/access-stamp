import Link from "next/link";
import { Container } from "@/components/container";
import { SiteLogo } from "@/components/site-logo";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-navy text-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <SiteLogo className="h-auto max-h-10 w-auto object-contain brightness-0 invert" />
            <p className="text-sm text-[#a0998f]">
              Practical access information for disabled people, wheelchair users,
              carers, older people, and families in the UK.
            </p>
            <p className="text-xs text-[#a0998f]">
              Built from lived experience. Not a charity. Not a compliance tool.
            </p>
          </div>

          <div>
            <div className="text-sm font-semibold">Platform</div>
            <ul className="mt-3 space-y-2 text-sm text-[#a0998f]">
              <li><Link href="/venue-finder">Venue Finder</Link></li>
              <li><Link href="/submit-venue">Suggest a venue</Link></li>
              <li><Link href="/advice">Advice Hub</Link></li>
              <li><Link href="/ai">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Life areas</div>
            <ul className="mt-3 space-y-2 text-sm text-[#a0998f]">
              <li><Link href="/advice/rights">Your Rights</Link></li>
              <li><Link href="/advice/transport">Transport</Link></li>
              <li><Link href="/advice/workplace">Workplace</Link></li>
              <li><Link href="/advice/equipment">Equipment</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">Content</div>
            <ul className="mt-3 space-y-2 text-sm text-[#a0998f]">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/directory">Directory</Link></li>
              <li><Link href="/glossary">Glossary</Link></li>
              <li><Link href="/about">About</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-[#a0998f] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Access Stamp</div>
          <div className="flex gap-4">
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/terms">Terms</Link>
          </div>
          <div>Built with ❤️ from lived experience</div>
        </div>
      </Container>
    </footer>
  );
}
