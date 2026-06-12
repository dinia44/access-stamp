import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/content/blog";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}): Promise<Metadata> {
  const { slug } = await Promise.resolve(params);
  const p = await getBlogPostBySlug(slug);
  if (!p) return {};
  return buildPageMetadata({
    title: p.title,
    description: p.excerpt || p.sections[0]?.body.slice(0, 160) || p.title,
    path: `/blog/${p.slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string };
}) {
  const { slug } = await Promise.resolve(params);
  const p = await getBlogPostBySlug(slug);
  if (!p) return notFound();

  return (
    <div className="bg-background">
      <Container className="py-10">
        <div className="space-y-6">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: p.title },
            ]}
          />

          <div className="space-y-2">
            <Badge tone="blue">Blog</Badge>
            <h1 className="font-[var(--font-heading)] text-3xl text-heading sm:text-4xl">{p.title}</h1>
            <div className="flex items-center gap-3 text-xs font-semibold text-muted">
              <span>{p.date}</span>
              <span aria-hidden>&middot;</span>
              <span>{p.readTime}</span>
            </div>
          </div>

          <Card className="space-y-6 p-6">
            {p.sections.map((s, i) => (
              <section key={i}>
                {s.heading ? <h2 className="mb-2 text-lg font-semibold text-heading">{s.heading}</h2> : null}
                <p className="text-sm leading-7 text-text">{s.body}</p>
              </section>
            ))}
          </Card>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/blog" className="font-semibold text-blue underline-offset-2 hover:underline">
              &larr; All posts
            </Link>
            <Link href="/advice" className="font-semibold text-blue underline-offset-2 hover:underline">
              Advice hub
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
