import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { PageHero, PageLayout } from "@/components/page-layout";
import { Badge, Card } from "@/components/ui";
import { getBlogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, explainers, and walkthroughs from the Access Stamp team — clear, practical, no charity tone.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <PageLayout stack="relaxed" hero>
      <PageHero
        badge={<Badge tone="blue">Blog</Badge>}
        title="Updates, explainers, and walkthroughs"
        subtitle="Curated posts on access, venues, and practical disability guidance — clear and direct, never charity-speak."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, index) => (
          <FadeIn key={p.slug} delayMs={index * 60}>
            <Link href={`/blog/${p.slug}`} className="group block h-full">
              <Card className="flex h-full flex-col p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.06em] text-[#59682A]">{p.date}</div>
                <h2 className="mt-3 text-lg font-semibold leading-snug text-heading group-hover:text-blue">
                  {p.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{p.excerpt}</p>
                <div className="mt-5 text-sm font-semibold text-blue">Read article →</div>
              </Card>
            </Link>
          </FadeIn>
        ))}
      </div>
    </PageLayout>
  );
}
