import { Container } from "@/components/container";
import { SubmitVenueForm } from "@/components/submit-venue-form";
import { SAMPLE_VENUES } from "@/lib/mock-data";
export default async function SubmitVenuePage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const venue = SAMPLE_VENUES.find((v) => v.slug === params.suggested);
  return (
    <Container className="max-w-3xl py-12">
      <h1 className="text-4xl font-bold">
        Submit a venue for Access Stamp review
      </h1>
      <p className="my-5 text-lg text-muted">
        Tell us about a venue you own, manage or would like us to review.
        Include what you know and leave uncertain details open.
      </p>
      <p className="mb-8 text-sm">
        We’ll review the information and contact you if we need more detail.
        Submitting a venue does not make it independently verified or guarantee
        publication.
      </p>
      <SubmitVenueForm defaultVenueName={venue?.name} />
    </Container>
  );
}
