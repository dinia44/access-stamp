import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { SITE_CONFIG } from "@/lib/site-config";
import { EXAMPLE_VENUE_PHOTOS } from "@/lib/venue-photo-examples";

export const metadata = buildPageMetadata({
  title: "How to photograph venue access",
  description: "A visual walkthrough for taking useful entrance, parking, seating and toilet photos for an Access Stamp venue listing.",
  path: "/for-venues/photo-guide",
});

const SHOTS = [
  {
    key: "exterior",
    title: "Show where visitors arrive",
    instruction: "Stand back from the entrance. Include the frontage and the route a visitor would take from the pavement or drop-off. Keep kerbs, slopes and changes in surface in the frame.",
  },
  {
    key: "parking",
    title: "Show parking and the route from it",
    instruction: "If there is a Blue Badge bay or drop-off, photograph the whole space and any signs. Add a second shot from there towards the entrance so visitors can see the surface and any kerbs.",
  },
  {
    key: "entrance",
    title: "Show the open door and threshold",
    instruction: "Photograph the door open from outside with the whole opening and the ground on both sides in view. Take a closer side-on shot of any step, lip or ramp.",
    detail: "If you can, measure the clear opening at its narrowest point and the height of any step or lip. Send the measurements in centimetres.",
  },
  {
    key: "seating",
    title: "Show the route and seating inside",
    instruction: "Take a wide shot from just inside the entrance and another from the seating area. Keep the usual furniture layout, narrow gaps, turns and any changes in level visible.",
  },
  {
    key: "toilet",
    title: "Show the toilet layout",
    instruction: "From the doorway, photograph the empty room. Include the toilet, the floor space beside it, the sink and any rails or alarm cord. Take a second shot if they don’t fit in one frame.",
    detail: "This stock photo illustrates the angle only. Show the layout and fittings your visitors will actually find.",
  },
  {
    key: "counter",
    title: "Show any other useful features",
    instruction: "Photograph a counter, lift, hearing loop sign or quieter seating area if you have one. Include the approach and anything a visitor needs to find or use it.",
  },
] as const;

export default function VenuePhotoGuidePage() {
  return (
    <Container className="max-w-5xl space-y-10 py-10 sm:py-14">
      <header className="max-w-3xl">
        <Link href="/for-venues" className="inline-flex min-h-11 items-center text-sm font-semibold underline">
          Back to For venues
        </Link>
        <p className="page-hero-eyebrow mt-4">Uckfield pilot</p>
        <h1 className="mt-2 text-3xl font-semibold text-heading sm:text-4xl">
          How to photograph your venue’s access
        </h1>
        <p className="mt-4 text-lg leading-7 text-muted">
          A phone and a few minutes are enough. Follow the route a visitor
          would take and show what they’ll find along the way.
        </p>
        <p className="mt-4 rounded-[var(--radius-md)] border border-border bg-[var(--color-surface-subtle)] p-4 text-sm leading-6">
          These Unsplash photos are examples from different places. Take the
          same kinds of shots at your own venue, with any steps, tight spaces
          or other features in view.
        </p>
      </header>

      <ol className="grid gap-5 sm:grid-cols-2">
        {SHOTS.map((shot, index) => {
          const photo = EXAMPLE_VENUE_PHOTOS[shot.key];
          return (
            <li key={shot.key} className="overflow-hidden rounded-[var(--radius-card)] border border-border bg-card">
              <figure className="bg-[var(--color-surface-subtle)]">
                <div className="relative aspect-[3/2]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, 480px"
                    className="object-contain"
                  />
                </div>
                <figcaption className="px-4 py-2 text-xs leading-5 text-muted">
                  Example photo by <a href={photo.source} className="inline-block py-2 underline">{photo.credit} on Unsplash</a>
                </figcaption>
              </figure>
              <div className="p-4 sm:p-5">
                <h2 className="text-lg font-semibold text-heading">{index + 1}. {shot.title}</h2>
                <p className="mt-2 text-sm leading-6">{shot.instruction}</p>
                {"detail" in shot ? <p className="mt-2 text-sm leading-6 text-muted">{shot.detail}</p> : null}
              </div>
            </li>
          );
        })}
      </ol>

      <section className="rounded-[var(--radius-card)] border border-border bg-[var(--color-surface-subtle)] p-5 sm:p-7">
        <h2 className="text-2xl font-semibold text-heading">Send us your photos</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-6">
          <li>Use good light and the phone’s normal camera. Take the photos when the space is empty and keep faces, number plates and private details out of frame.</li>
          <li>Send the original files with the venue name, date taken and a short note about what each photo shows.</li>
          <li>Confirm you have permission from the rights holder and that Access Stamp can publish the photos on your listing.</li>
        </ul>
        <p className="mt-4 leading-6">
          We’ll draft your free listing and send it to you to check. If you’d
          prefer us to take the photos, ask about a local visit around Uckfield.
          We’ll agree the small fee with you before booking.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5">
          <a href={`mailto:${SITE_CONFIG.email}?subject=Access%20Stamp%20venue%20photos`} className="inline-flex min-h-11 items-center font-semibold underline">
            Email your photos or ask for a visit
          </a>
          <Link href="/venue/harbour-kitchen-liverpool#venue-photos" className="inline-flex min-h-11 items-center font-semibold underline">
            See the example listing
          </Link>
        </div>
      </section>
    </Container>
  );
}
