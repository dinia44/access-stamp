import Link from "next/link";
import { Container } from "@/components/container";
import { AskForm } from "@/components/ask-form";
import { getAdviceArticleBySlug } from "@/lib/content/advice";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata = buildPageMetadata({
  title: "Ask Access Stamp",
  description:
    "Turn your situation into practical next steps using Access Stamp guides.",
  path: "/ask",
});

const ASK_MODES = ["personalise", "explain", "draft", "checklist"] as const;
type AskMode = (typeof ASK_MODES)[number];

const MODE_COPY: Record<AskMode, { eyebrow: string; title: string; description: string }> = {
  personalise: {
    eyebrow: "Personalise this guide",
    title: "Make this guide relevant to you",
    description: "Tell us what is happening. Access Stamp will use the selected guide and its sources to build a practical plan around your situation.",
  },
  explain: {
    eyebrow: "Explain this simply",
    title: "Which part do you want help understanding?",
    description: "Tell us what feels confusing. Access Stamp will explain it in plain English using the selected guide as the source.",
  },
  draft: {
    eyebrow: "Draft this for me",
    title: "What do you need to write?",
    description: "Describe who you are writing to and what you need to achieve. Access Stamp will prepare practical wording grounded in the guide.",
  },
  checklist: {
    eyebrow: "Build my checklist",
    title: "Turn this guide into your action list",
    description: "Tell us where you are in the process. Access Stamp will reduce the guide to the actions, evidence and checks that matter to you.",
  },
};

export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ guide?: string; mode?: string }>;
}) {
  const { guide, mode } = await searchParams;
  const article = typeof guide === "string" ? await getAdviceArticleBySlug(guide) : undefined;
  const resolvedMode: AskMode = ASK_MODES.includes(mode as AskMode) ? (mode as AskMode) : "personalise";
  const copy = MODE_COPY[resolvedMode];

  return (
    <Container className="max-w-3xl py-12">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-brand)]">{copy.eyebrow}</p>
      <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl font-medium tracking-[-0.03em] text-[var(--color-ink)] sm:text-5xl">{copy.title}</h1>
      <p className="my-5 max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">{copy.description}</p>
      <AskForm guideSlug={article?.slug} guideTitle={article?.title} mode={resolvedMode} />
      <p className="mt-8 text-sm text-[var(--color-text-muted)]">
        <Link href="/advice" className="font-semibold text-[var(--color-brand)] hover:underline">
          Browse guides
        </Link>{" "}
        ·{" "}
        <Link href="/ai-toolkit" className="font-semibold text-[var(--color-brand)] hover:underline">
          More tools
        </Link>
      </p>
    </Container>
  );
}
