import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { getBlogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, explainers, and walkthroughs from the Access Stamp team — clear, practical, no charity tone.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <Badge tone="amber">Blog</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">Updates, explainers, walkthroughs</h1>
            <p className="max-w-[85ch] text-muted">
              Clear, practical posts. No charity tone. No inspiration language.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group">
                <Card className="h-full p-5 transition-shadow group-hover:shadow-[var(--shadow)]">
                  <div className="text-xs font-semibold text-muted">{p.date}</div>
                  <div className="mt-2 text-sm font-semibold text-heading">{p.title}</div>
                  <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                  <div className="mt-4 text-sm font-semibold text-blue">Read →</div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
