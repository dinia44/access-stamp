import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/container";
import { Badge, Card } from "@/components/ui";

const POSTS = [
  {
    slug: "what-i-wish-id-known",
    title: "What I wish I'd known in my first year as a wheelchair user",
    date: "March 2026",
    body:
      "The things nobody tells you, from choosing the right cushion to dealing with people's reactions. This guide links practical equipment, care, and rights steps you can use immediately.",
  },
  {
    slug: "wheelchair-basics-daily-transfers",
    title: "Wheelchair basics: daily transfers",
    date: "February 2026",
    body:
      "A practical walkthrough of transfer basics: positioning, brakes, footplates, and keeping things safe. This is an overview, always follow the individual’s professional care plan and manual handling training.",
  },
  {
    slug: "why-accessible-means-nothing",
    title: "Why 'wheelchair accessible' means almost nothing",
    date: "January 2026",
    body:
      "‘Accessible’ can mean anything. Real access is practical detail: door widths, turning space, toilets, surfaces, lighting, noise, and parking. This post explains what to check, what to ask, and what to document.",
  },
];

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const p = POSTS.find((x) => x.slug === params.slug);
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
            <Badge tone="amber">Blog</Badge>
            <h1 className="font-[var(--font-heading)] text-4xl text-heading">{p.title}</h1>
            <div className="text-xs font-semibold text-muted">{p.date}</div>
          </div>

          <Card className="p-6">
            <p className="text-sm leading-7 text-text">{p.body}</p>
          </Card>
        </div>
      </Container>
    </div>
  );
}
