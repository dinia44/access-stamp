import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates, explainers, and walkthroughs from the Access Stamp team \u2014 clear, practical, no charity tone.",
};

const POSTS = [
  {
    slug: "what-i-wish-id-known",
    title: "What I wish I'd known in my first year as a wheelchair user",
    date: "March 2026",
    excerpt:
      "The things nobody tells you, from choosing the right cushion to dealing with people's reactions.",
  },
  {
    slug: "wheelchair-basics-daily-transfers",
    title: "Wheelchair basics: daily transfers",
    date: "February 2026",
    excerpt:
      "A practical walkthrough of transfer techniques, positioning, and building confidence.",
  },
  {
    slug: "why-accessible-means-nothing",
    title: "Why 'wheelchair accessible' means almost nothing",
    date: "January 2026",
    excerpt:
      "The gap between what venues claim and what you actually find when you arrive.",
  },
];

export default function BlogPage() {
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
            {POSTS.map((p) => (
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
