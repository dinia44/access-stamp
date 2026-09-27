import assert from "node:assert/strict";
import test from "node:test";
import { VENUES } from "@/data/venues";
import { SAMPLE_VENUES } from "@/lib/mock-data";
import { assessChairAgainstVenue, formatVenueAuditContextForPrompt } from "@/lib/venue-fit";
import { isDemoVenue } from "@/lib/venue-card";
import { buildVenueLocalBusinessJsonLd } from "@/lib/seo/venue-jsonld";
import { getDisplayAccessScore } from "@/lib/venue-score";
import {
  getMeasurementLabel,
  shouldShowAccessScore,
  toVerificationLabel,
  toVerificationType,
  VERIFICATION_PUBLIC_LABELS,
  type VerificationType,
} from "@/lib/venue-verification";

const types = Object.keys(VERIFICATION_PUBLIC_LABELS) as VerificationType[];

test("legacy and current verification labels preserve demo and reviewed states", () => {
  for (const label of ["Access Stamp checked", "Access Stamp audited", "Demo listing", "Demo", "demo"]) {
    assert.equal(toVerificationType(label), "demo");
  }
  for (const type of ["demo", "desk_reviewed", "onsite_audited"] as const) {
    assert.equal(toVerificationType(toVerificationLabel(type)), type);
  }
  for (const label of [undefined, "unexpected", "constructor", "__proto__"]) {
    assert.equal(toVerificationType(label), "unverified");
  }
});

test("measurement claims retain their source and never promote submissions to audits", () => {
  assert.equal(getMeasurementLabel("demo"), "Example measurements");
  assert.equal(getMeasurementLabel("venue_submitted"), "Venue-supplied measurements");
  assert.equal(getMeasurementLabel("desk_reviewed"), "Reviewed measurements");
  assert.equal(getMeasurementLabel("onsite_audited"), "Measured by Access Stamp");
  for (const type of ["unverified", "community_reported", "venue_submitted"] as const) {
    assert.equal(toVerificationLabel(type), "Submitted / not independently verified");
  }
});

test("no verification state produces a universal access score", () => {
  for (const type of types) {
    assert.equal(shouldShowAccessScore(type), false);
    assert.equal(getDisplayAccessScore({ ...SAMPLE_VENUES[0], verificationType: type, verification: type }), null);
  }
});

test("every demo report stays illustrative in fit results, prompts and search metadata", () => {
  const demos = SAMPLE_VENUES.filter(isDemoVenue);
  assert.ok(demos.length > 0);
  for (const venue of demos) {
    const result = assessChairAgainstVenue({ overallWidthCm: 68 }, venue);
    assert.match(result.summary, /Example comparison only/);
    assert.doesNotMatch(result.summary, /should clear|call ahead|choose a venue/);
    assert.match(formatVenueAuditContextForPrompt(venue), /DEMO DATA/);
    const canonical = VENUES.find((item) => item.slug === venue.slug);
    assert.ok(canonical);
    assert.equal(buildVenueLocalBusinessJsonLd(canonical), null);
  }
});

test("submitted measurements keep their source in fit results while genuine records keep metadata", () => {
  const venue = {
    ...SAMPLE_VENUES[0],
    verificationType: "venue_submitted" as const,
    verification: "Submitted / not independently verified",
    photos: [{ src: "/example.jpg", alt: "Door", label: "Entrance", measurement: "Door width measured: 92cm" }],
  };
  const result = assessChairAgainstVenue({ overallWidthCm: 68 }, venue);
  assert.match(result.detailLines.join(" "), /Venue-supplied measurements/);
  assert.doesNotMatch(result.detailLines.join(" "), /Audited/);
  assert.ok(buildVenueLocalBusinessJsonLd({ ...VENUES[0], verification: "venue_submitted" }));
});
