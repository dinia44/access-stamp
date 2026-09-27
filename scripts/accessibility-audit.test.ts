import assert from "node:assert/strict";
import { test } from "node:test";
import { SAMPLE_VENUES } from "../src/lib/mock-data";
import { VENUES } from "../src/data/venues";
import { assessChairAgainstVenue, parseVenueAuditMeasurements } from "../src/lib/venue-fit";
import { ACCESS_AREAS } from "../src/lib/venue-access-features";
import { countVenueUnknowns } from "../src/lib/venue-card";
import { buildVenueFinderQueryString, getFilteredVenues, parseVenueFinderSearchParams } from "../src/lib/venue-finder-params";
import { safeVenueReturnUrl } from "../src/lib/venue-return-url";

const harbour = SAMPLE_VENUES.find(v => v.slug === "harbour-kitchen-liverpool")!;

test("78cm chair must flag the 80cm toilet door even when the entrance fits", () => {
  const result = assessChairAgainstVenue({ overallWidthCm: 78 }, harbour);
  assert.match(result.summary, /Insufficient clearance at toilet door/);
  assert.ok(result.detailLines.some(line => /Entrance: 92 cm — within/.test(line)));
  assert.ok(result.detailLines.some(line => /Toilet door: 80 cm — insufficient/.test(line)));
  assert.ok(result.detailLines.some(line => /Demonstration measurements only/.test(line)));
  assert.ok(!JSON.stringify(result).includes("**"));
});

test("clearance boundary and unknown widths cannot overclaim fit", () => {
  assert.match(assessChairAgainstVenue({ overallWidthCm: 75 }, harbour).summary, /Within the listed/);
  assert.match(assessChairAgainstVenue({ overallWidthCm: 75.1 }, harbour).summary, /Insufficient clearance/);
  const missing = { ...harbour, measurements: undefined, photos: [] };
  assert.match(assessChairAgainstVenue({ overallWidthCm: 60 }, missing).summary, /No measured doorway/);
  for (const width of [NaN, Infinity, 39, 131]) assert.match(assessChairAgainstVenue({ overallWidthCm: width }, harbour).summary, /between 40 and 130/);
});

test("legacy and canonical consumers share the same measurement values", () => {
  const canonical = VENUES.find(v => v.slug === harbour.slug)!;
  assert.deepEqual(harbour.measurements, canonical.measurements);
  assert.equal(parseVenueAuditMeasurements(harbour).doorClearCm, 80);
  const conflictingCaption = { ...harbour, photos: [{ src: "example", alt: "", label: "Door", measurement: "Door width measured: 99cm" }] };
  assert.equal(parseVenueAuditMeasurements(conflictingCaption).openings[0].widthCm, canonical.measurements!.entranceWidthCm);
});

test("every displayed feature is counted, including missing seed fields", () => {
  for (const venue of SAMPLE_VENUES) {
    for (const area of ACCESS_AREAS) for (const key of area.points) assert.ok(venue.features[key], `${venue.slug}: ${key}`);
    assert.equal(countVenueUnknowns(venue), Object.values(venue.features).filter(v => v === "unknown").length);
  }
  assert.equal(harbour.features["Powered wheelchair suitable"], "unknown");
  assert.equal(countVenueUnknowns(harbour), 5);
});

test("cafe and café return the same local Manchester venue", () => {
  const search = (query: string) => getFilteredVenues(SAMPLE_VENUES, { query, location: "Manchester", filters: [] });
  assert.deepEqual(search("cafe"), search("café"));
  assert.ok(search("cafe").some(v => v.slug === "gallery-cafe-manchester"));
  assert.ok(search("cafe").every(v => v.location.startsWith("Manchester,")));
});

test("an unmatched town or conflicting venue query does not broaden geographically", () => {
  assert.equal(getFilteredVenues(SAMPLE_VENUES, { query: "Harbour Kitchen", location: "Manchester", filters: [], center: { lat: 53.48, lng: -2.24 } }).length, 0);
  assert.equal(getFilteredVenues(SAMPLE_VENUES, { query: "cafe", location: "Uckfield", filters: [] }).length, 0);
});

test("search state round-trips through the venue return URL", () => {
  const state = { query: "café", location: "Manchester", filters: ["Accessible toilet"], sortBy: "Evidence confidence" as const, page: 2, viewMode: "list" as const };
  const query = buildVenueFinderQueryString(state);
  assert.deepEqual(parseVenueFinderSearchParams(new URLSearchParams(query)), { ...state, center: undefined });
  const url = `/venue-finder?${query}#venue-gallery-cafe-manchester`;
  assert.equal(safeVenueReturnUrl(url), url);
  for (const bad of ["https://evil.example", "//evil.example", "/venue-finder-evil", "/venue-finder/../admin", "/venue-finder?x=\\evil"]) assert.equal(safeVenueReturnUrl(bad), "/venue-finder");
});
