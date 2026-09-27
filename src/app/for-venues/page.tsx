import Link from "next/link";
import { Container } from "@/components/container";
import { ForVenuesLeadForm } from "@/components/for-venues/for-venues-lead-form";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
export const metadata = buildPageMetadata({
  title: "For venues — Access Stamp reviews",
  description:
    "Choose an Access Stamp venue review and publish practical access information.",
  path: "/for-venues",
});
const ROWS: [string, boolean, boolean, boolean][] = [
  ["Public listing", true, true, true],
  ["On-site visit", true, true, true],
  ["Core measurements", true, true, true],
  ["Detailed measurements", false, true, true],
  ["PDF report", false, true, true],
  ["Staff guidance", false, true, true],
  ["Re-check", false, false, true],
  ["Training", false, false, true],
];
export default function ForVenuesPage() {
  return (
    <Container className="max-w-5xl space-y-12 py-12">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold">
          Help visitors make an informed choice
        </h1>
        <p className="mt-5 text-lg text-muted">
          Turn vague access claims into measurements, photos and clear
          information about what is known and what still needs checking.
        </p>
        <a
          href="#enquire"
          className="mt-5 inline-flex min-h-12 items-center rounded-full bg-[#C8430F] px-6 font-semibold text-white"
        >
          Enquire about a review
        </a>
      </header>
      <section>
        <h2 className="text-2xl font-semibold">What will my venue get?</h2>
        <p className="mt-3 max-w-3xl">
          A public access listing with measurements, photographs and an access
          summary. Fuller reviews include a report, practical recommendations
          and staff guidance. Publication follows review and confirmation of the
          evidence.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">What do you check?</h2>
        <p className="mt-3">
          Entrances, internal routes, toilets, arrival, seating, communication,
          sensory information and assistance. Unknown details remain clearly
          marked.
        </p>
        <Link
          className="inline-flex min-h-11 items-center underline"
          href="/methodology"
        >
          Read the methodology
        </Link>
      </section>
      <section id="pilot-programme">
        <h2 className="text-2xl font-semibold">Which review do I need?</h2>
        <p className="my-3 text-muted">
          Pilot pricing is available on enquiry. We’ll confirm scope and costs
          before booking.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">
              Venue review package comparison
            </caption>
            <thead>
              <tr>
                {["Feature", "Snapshot", "Measured Review", "Full Review"].map(
                  (h) => (
                    <th
                      scope="col"
                      key={h}
                      className="border-b border-border p-3"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, ...values]) => (
                <tr key={label}>
                  <th
                    scope="row"
                    className="border-b border-border p-3 font-medium"
                  >
                    {label}
                  </th>
                  {values.map((yes, i) => (
                    <td key={i} className="border-b border-border p-3">
                      <span aria-hidden>{yes ? "✓" : "—"}</span>
                      <span className="sr-only">
                        {yes ? "Included" : "Not included"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">What happens next?</h2>
        <ol className="mt-4 grid list-inside list-decimal gap-4 sm:grid-cols-5">
          {[
            "Book a review",
            "Review the venue",
            "Receive a draft",
            "Confirm the details",
            "Publish the report",
          ].map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-5">
          <Link
            className="inline-flex min-h-11 items-center underline"
            href="/submit-venue"
          >
            Submit your venue for review →
          </Link>
        </p>
      </section>
      <section id="enquire" className="scroll-mt-28">
        <h2 className="mb-5 text-2xl font-semibold">
          Tell us about your venue
        </h2>
        <ForVenuesLeadForm />
      </section>
    </Container>
  );
}
