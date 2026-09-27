import Link from "next/link";
import { Container } from "@/components/container";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
export const metadata = buildPageMetadata({
  title: "Resources",
  description:
    "Guides, Help Cards, tools and useful services from Access Stamp.",
  path: "/resources",
});
export default function ResourcesPage() {
  const items = [
    ["Guides", "/advice", "Detailed step-by-step guidance"],
    [
      "Help Cards",
      "/help-cards",
      "Short practical responses for a specific situation",
    ],
    ["Tools", "/ai-toolkit", "Templates, checklists and planners"],
    ["Directory", "/directory", "Useful organisations and services"],
    ["Glossary", "/glossary", "Plain-English terms"],
  ];
  return (
    <Container className="max-w-4xl py-12">
      <h1 className="text-4xl font-bold">Resources</h1>
      <section className="my-8 border-b border-border pb-8">
        <h2 className="text-2xl font-semibold">Not sure where to start?</h2>
        <p className="my-3">
          Tell Access Stamp what’s happening and get practical next steps.
        </p>
        <Link
          href="/ask"
          className="inline-flex min-h-11 items-center font-semibold underline"
        >
          Ask Access Stamp →
        </Link>
      </section>
      <ul className="grid gap-5 sm:grid-cols-2">
        {items.map(([name, href, desc]) => (
          <li key={href} className="border-b border-border py-4">
            <h2 className="text-xl font-semibold">
              <Link
                href={href}
                className="inline-flex min-h-11 items-center underline"
              >
                {name}
              </Link>
            </h2>
            <p className="text-muted">{desc}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
