/**
 * Unit checks for venue search intent (no silent q→location, exact name ranking).
 * Run: npx tsx --test scripts/venue-search-intent.test.ts
 */
import assert from "node:assert/strict";
import { test } from "node:test";
import { SAMPLE_VENUES as venues } from "../src/lib/mock-data";
import {
  formatVenueFinderLocationLine,
  getFilteredVenuesWithMeta,
  parseVenueFinderSearchParams,
} from "../src/lib/venue-finder-params";

test("parse keeps q and location independent", () => {
  const state = parseVenueFinderSearchParams({
    q: "Harbour Kitchen",
    location: "Liverpool",
  });
  assert.equal(state.query, "Harbour Kitchen");
  assert.equal(state.location, "Liverpool");
});

test("q=Harbour Kitchen ranks Harbour Kitchen first", () => {
  const { venues: results, isExplicitNoResults } = getFilteredVenuesWithMeta(venues, {
    query: "Harbour Kitchen",
    location: "",
    filters: [],
  });
  assert.equal(isExplicitNoResults, false);
  assert.ok(results.length >= 1);
  assert.equal(results[0]?.name, "Harbour Kitchen");
  assert.equal(formatVenueFinderLocationLine(""), "Venues across the UK");
  // Location line must come from the location field, not from q.
  assert.equal(formatVenueFinderLocationLine(""), "Venues across the UK");
});

test("nonsense query is explicit no-results", () => {
  const { venues: results, isExplicitNoResults } = getFilteredVenuesWithMeta(venues, {
    query: "zzzz-no-venue",
    location: "",
    filters: [],
  });
  assert.equal(isExplicitNoResults, true);
  assert.equal(results.length, 0);
});

test("location=Liverpool filters to Liverpool venues", () => {
  const { venues: results } = getFilteredVenuesWithMeta(venues, {
    query: "",
    location: "Liverpool",
    filters: [],
  });
  assert.ok(results.length >= 1);
  assert.ok(results.every((v) => /liverpool/i.test(v.location)));
  assert.equal(formatVenueFinderLocationLine("Liverpool"), "Venues in Liverpool");
});

test("q + location keeps exact venue first with Liverpool place line", () => {
  const { venues: results } = getFilteredVenuesWithMeta(venues, {
    query: "Harbour Kitchen",
    location: "Liverpool",
    filters: [],
  });
  assert.equal(results[0]?.name, "Harbour Kitchen");
  assert.equal(formatVenueFinderLocationLine("Liverpool"), "Venues in Liverpool");
});

test("malformed empty params browse all", () => {
  const state = parseVenueFinderSearchParams({ q: "", location: "", filters: "" });
  const { venues: results, isExplicitNoResults } = getFilteredVenuesWithMeta(venues, state);
  assert.equal(isExplicitNoResults, false);
  assert.ok(results.length > 0);
});
