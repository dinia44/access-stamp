import Link from "next/link";
import { Container } from "@/components/container";
import { AboutJsonLd } from "@/components/about/about-jsonld";
import { staticPageMetadata } from "@/lib/seo/static-pages";
export const metadata = staticPageMetadata("about");
export default function AboutPage() {
  return (
    <Container className="max-w-3xl space-y-10 py-12">
      <AboutJsonLd />
      <header>
        <h1 className="text-4xl font-bold">About Access Stamp</h1>
        <p className="mt-5 text-lg text-muted">
          Practical venue access information and disability guidance, built to
          help you decide what to do next.
        </p>
      </header>
      <section>
        <h2 className="text-2xl font-semibold">Why it exists</h2>
        <p className="mt-3">
          A ramp symbol cannot tell you whether your chair fits through a door,
          whether you can transfer in the toilet, or what help is available.
          Access Stamp brings those details together and makes the gaps visible.
        </p>
      </section>
      <section id="founder">
        <h2 className="text-2xl font-semibold">Allister Diniz — founder</h2>
        <p className="mt-3">
          Allister is a wheelchair user who created Access Stamp around the
          details that matter when planning a visit: doorway widths, routes,
          toilet layout, seating and support. The aim is to make those details
          easier to find before leaving home.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">
          How our approach is different
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            Measurements and photographs, with their source clearly labelled.
          </li>
          <li>
            Visible unknowns, so missing evidence never becomes a promise.
          </li>
          <li>Personal comparisons against your needs.</li>
          <li>Disability-led development shaped by practical decisions.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">What we’re building</h2>
        <p className="mt-3">
          A venue finder supported by clear guides and tools. Current
          demonstration listings show how the reports work while real venue
          coverage develops.
        </p>
      </section>
      <nav aria-label="Learn more">
        <h2 className="text-2xl font-semibold">Learn more</h2>
        <ul>
          {[
            ["Methodology", "/methodology"],
            ["Accessibility", "/accessibility"],
            ["Venue reviews", "/for-venues"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link
                className="inline-flex min-h-11 items-center underline"
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
