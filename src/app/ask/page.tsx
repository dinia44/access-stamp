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
export default async function AskPage({
  searchParams,
}: {
  searchParams: Promise<{ guide?: string }>;
}) {
  const { guide } = await searchParams;
  const article =
    typeof guide === "string" ? await getAdviceArticleBySlug(guide) : undefined;
  return (
    <Container className="max-w-3xl py-12">
      <h1 className="text-4xl font-bold">Ask Access Stamp</h1>
      <p className="my-5 text-lg text-muted">
        Tell us what’s happening. Get a practical guide built around your
        situation using Access Stamp information, with sources and anything that
        still needs checking.
      </p>
      <AskForm guideSlug={article?.slug} guideTitle={article?.title} />
      <p className="mt-8">
        <Link href="/advice" className="underline">
          Browse guides
        </Link>{" "}
        ·{" "}
        <Link href="/ai-toolkit" className="underline">
          More tools
        </Link>
      </p>
    </Container>
  );
}
