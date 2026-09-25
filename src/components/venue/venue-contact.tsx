import type { Venue } from "@/lib/mock-data";
import { isDemoVenue } from "@/lib/venue-card";

function webUrl(value?: string) {
  if (!value) return undefined;
  try { const url = new URL(value); return ["https:", "http:"].includes(url.protocol) ? url.href : undefined; } catch { return undefined; }
}

export function VenueContact({ venue }: { venue: Venue }) {
  const contact = isDemoVenue(venue) ? undefined : venue.contact;
  const website = webUrl(contact?.website);
  const source = webUrl(contact?.sourceUrl);
  const verified = Boolean(source && contact?.checkedAt);
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h3 className="font-semibold text-heading">Contact the venue</h3>
      {verified && contact ? <>
        {contact.address ? <p className="mt-2 text-sm">{contact.address}</p> : <p className="mt-2 text-sm text-muted">Full address not verified — confirm it before travelling.</p>}
        <div className="mt-2 flex flex-wrap gap-3">
          {website ? <a href={website} className="inline-flex min-h-11 items-center font-semibold text-blue underline">Venue website</a> : null}
          {contact.phone && /^[+\d\s().-]+$/.test(contact.phone) ? <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="inline-flex min-h-11 items-center font-semibold text-blue underline">Call {contact.phone}</a> : null}
        </div>
        <p className="mt-2 text-sm text-muted">Contact details checked {contact.checkedAt}. <a href={source} className="underline">Contact source</a></p>
      </> : <p className="mt-2 text-sm text-muted">{isDemoVenue(venue) ? "Demonstration only: the venue identity, address and contact details are not verified. Do not plan a real visit from this listing." : "Verified phone, website and full address are not available yet. Confirm the venue’s identity and official contact details before planning travel."}</p>}
    </div>
  );
}
