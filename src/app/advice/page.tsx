import type { Metadata } from "next";
import Link from "next/link";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { PageLayout } from "@/components/page-layout";
import { Badge, Card } from "@/components/ui";
import { ADVICE_HUB_CATEGORY_IMAGES } from "@/lib/advice-card-images";
import { adviceCategoryTint } from "@/lib/colors";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

export const metadata: Metadata = {
  title: "Advice hub",
  description: "Practical accessibility guides covering rights, equipment, transport, education, care, and more \u2014 UK-focused and jargon-free.",
};

export default function AdviceHubPage() {
  return (
    <PageLayout stack="hub">
      <SetChatContext page={{ kind: "advice" }} />
      <div className="space-y-2">
        <Badge tone="navy">Advice Hub</Badge>
        <h1 className="font-[var(--font-heading)] text-4xl text-heading">Practical guides in plain language</h1>
        <p className="max-w-[80ch] text-muted">
          Practical, plain-language guides on disability rights, equipment, care, education, transport, workplace, and more.
          Written from lived experience.
        </p>
      </div>

      <FeaturedPracticalGuides />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ADVICE_CATEGORIES.map((c) => {
          const hubImg = ADVICE_HUB_CATEGORY_IMAGES[c.href];
          return (
            <Link key={c.href} href={c.href} className="group">
              <Card className="h-full overflow-hidden p-0 transition-shadow group-hover:shadow-[var(--shadow)]">
                <AdviceMediaFrame>
                  {hubImg ? (
                    <GuideCoverImage
                      src={hubImg.src}
                      alt={hubImg.alt}
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes={ADVICE_CARD_IMAGE_SIZES}
                    />
                  ) : (
                    <div className="flex h-full min-h-[140px] items-center justify-center bg-blue-pale text-4xl" aria-hidden>
                      {c.icon}
                    </div>
                  )}
                </AdviceMediaFrame>
                <div className="p-5" style={{ backgroundColor: adviceCategoryTint(c.href) }}>
                  <div className="flex items-start gap-3">
                    <div className="icon-well icon-well-blue h-10 w-10 shrink-0 text-lg" aria-hidden>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-heading">{c.title}</div>
                      <div className="mt-1 text-sm text-muted">{c.desc}</div>
                    </div>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-blue">Open →</div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <Card className="p-5 md:col-span-1">
          <div className="text-sm font-semibold text-heading">Useful links</div>
          <ul className="mt-3 space-y-2 text-sm font-semibold">
            <li>
              <Link className="text-blue" href="/directory">
                Directory →
              </Link>
            </li>
            <li>
              <Link className="text-blue" href="/glossary">
                Glossary →
              </Link>
            </li>
            <li>
              <Link className="text-blue" href="/ai-toolkit">
                AI Toolkit
              </Link>
              {" · "}
              <Link className="text-blue" href="/ai">
                Or ask our AI →
              </Link>
            </li>
          </ul>
        </Card>
        <Card className="p-5 md:col-span-2">
          <div className="text-sm font-semibold text-heading">How this is written</div>
          <p className="mt-2 text-sm text-muted">
            Clear, confident, and practical. No charity tone. No inspiration language. Acronyms are explained on first use,
            and complex processes are broken into numbered steps.
          </p>
        </Card>
      </div>
    </PageLayout>
  );
}
