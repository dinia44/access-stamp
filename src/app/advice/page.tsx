import type { Metadata } from "next";
import Link from "next/link";
import { AdviceMediaFrame, ADVICE_CARD_IMAGE_SIZES } from "@/components/advice/advice-media-frame";
import { FeaturedPracticalGuides } from "@/components/advice/featured-practical-guides";
import { GuideCoverImage } from "@/components/advice/guide-cover-image";
import { PageHero, PageLayout, PageSectionTitle } from "@/components/page-layout";
import { Badge, Card } from "@/components/ui";
import { ADVICE_HUB_CATEGORY_IMAGES } from "@/lib/advice-card-images";
import { adviceCategoryTint } from "@/lib/colors";
import { ADVICE_CATEGORIES } from "@/lib/mock-data";
import { SetChatContext } from "@/components/chat/set-context";

export const metadata: Metadata = {
  title: "Advice hub",
  description: "Practical accessibility guides covering rights, equipment, transport, education, care, and more — UK-focused and jargon-free.",
};

export default function AdviceHubPage() {
  return (
    <PageLayout stack="relaxed" hero>
      <SetChatContext page={{ kind: "advice" }} />
      <PageHero
        badge={<Badge tone="navy">Advice Hub</Badge>}
        title="Practical guides in plain language"
        subtitle="Rights, equipment, care, education, transport, workplace, and more — written from lived experience, not compliance speak."
      />

      <FeaturedPracticalGuides />

      <div className="space-y-6">
        <PageSectionTitle
          title="Browse by topic"
          description="Pick a life area and jump straight to the guides that matter most."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ADVICE_CATEGORIES.map((c) => {
            const hubImg = ADVICE_HUB_CATEGORY_IMAGES[c.href];
            return (
              <Link key={c.href} href={c.href} className="group block h-full">
                <Card className="h-full overflow-hidden p-0">
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
                        <div className="text-base font-semibold text-heading">{c.title}</div>
                        <div className="mt-1 text-sm text-muted">{c.desc}</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-blue">Open topic →</div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 md:col-span-1">
          <div className="text-base font-semibold text-heading">Useful links</div>
          <ul className="mt-4 space-y-3 text-sm font-semibold">
            <li>
              <Link className="text-blue hover:underline" href="/directory">
                Directory →
              </Link>
            </li>
            <li>
              <Link className="text-blue hover:underline" href="/glossary">
                Glossary →
              </Link>
            </li>
            <li>
              <Link className="text-blue hover:underline" href="/ai-toolkit">
                AI Toolkit
              </Link>
              {" · "}
              <Link className="text-blue hover:underline" href="/ai">
                Ask our AI →
              </Link>
            </li>
          </ul>
        </Card>
        <Card className="p-6 md:col-span-2">
          <div className="text-base font-semibold text-heading">How this is written</div>
          <p className="mt-3 text-sm leading-7 text-muted">
            Clear, confident, and practical. No charity tone. No inspiration language. Acronyms are explained on first
            use, and complex processes are broken into numbered steps.
          </p>
        </Card>
      </div>
    </PageLayout>
  );
}
