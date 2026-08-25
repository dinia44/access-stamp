import assert from "node:assert/strict";
import { test } from "node:test";
import { HELP_CARDS, getHelpCard } from "../../data/helpCards";
import { FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE } from "../../data/help-cards/__fixtures__/flying-with-mobility-equipment";
import {
  LONG_DOWNLOAD_FIXTURE,
  OPTIONAL_SECTIONS_FIXTURE,
} from "../../data/help-cards/__fixtures__/download-documents";
import { HELP_CARD_DOWNLOAD_COPY } from "../../data/help-cards/download-copy";
import { resolveHelpCardDownloadDocument, downloadCopyIssues } from "./download-document";
import { buildHelpCardDownloadPlainText } from "./download-plain-text";
import { buildHelpCardDownloadPdf } from "./download-pdf";
import { helpCardDownloadFilename } from "./download-filename";
import { helpCardLiveUrl, getCanonicalPublicSiteUrl, isNonCanonicalPublicHost } from "./canonical-public-url";
import { createQrMatrix } from "./qr-matrix";

test("every published Help Card has approved download copy", () => {
  for (const card of HELP_CARDS.filter((item) => item.publicationState === "published")) {
    const copy = HELP_CARD_DOWNLOAD_COPY[card.slug];
    assert.ok(copy, `missing download copy for ${card.slug}`);
    assert.ok(copy.status === "reviewed" || copy.status === "published");
    const resolved = resolveHelpCardDownloadDocument(card);
    assert.equal(resolved.ok, true, `${card.slug}: ${resolved.ok ? "" : resolved.issues.join("; ")}`);
  }
});

test("download facts stay synchronized with canonical card data", () => {
  const card = getHelpCard("wheelchair-access-venue");
  assert.ok(card);
  const resolved = resolveHelpCardDownloadDocument(card);
  assert.equal(resolved.ok, true);
  if (!resolved.ok) return;
  assert.equal(resolved.document.appliesTo, card.region);
  assert.equal(resolved.document.reviewedAt, card.variants[0]?.reviewedAt);
  assert.equal(resolved.document.sources.length, card.sources.length);
  assert.equal(resolved.document.sources[0]?.title, card.sources[0]?.title);
  assert.equal(resolved.document.disclaimer, card.disclaimer);
  assert.match(resolved.document.liveUrl, /\/help-cards\/wheelchair-access-venue$/);
  assert.doesNotMatch(resolved.document.liveUrl, /utm_|vercel\.app/i);
});

test("missing or draft download copy does not produce a document", () => {
  const missing = resolveHelpCardDownloadDocument(FLYING_WITH_MOBILITY_EQUIPMENT_FIXTURE);
  assert.equal(missing.ok, false);
  if (missing.ok) return;
  assert.equal(missing.reason, "unpublished-card");

  const card = getHelpCard("gp-appointment-access");
  assert.ok(card);
  const issues = downloadCopyIssues(
    {
      version: 1,
      status: "draft",
      layout: "one-page",
      title: "",
      purpose: "",
      keyMessage: "x",
      actions: [],
      footerNote: "x",
    },
    { ...card, region: "", sources: [] },
    { ...card.variants[0]!, reviewedAt: "tbc" },
  );
  assert.ok(issues.some((issue) => /title/i.test(issue)));
  assert.ok(issues.some((issue) => /purpose/i.test(issue)));
  assert.ok(issues.some((issue) => /actions/i.test(issue)));
  assert.ok(issues.some((issue) => /region/i.test(issue)));
  assert.ok(issues.some((issue) => /review date/i.test(issue)));
  assert.ok(issues.some((issue) => /source/i.test(issue)));
});

test("plain-text download uses curated reading order", () => {
  const card = getHelpCard("wheelchair-access-venue");
  assert.ok(card);
  const resolved = resolveHelpCardDownloadDocument(card);
  assert.equal(resolved.ok, true);
  if (!resolved.ok) return;
  const text = buildHelpCardDownloadPlainText(resolved.document);
  const order = [
    "ACCESS STAMP HELP CARD",
    "Checking wheelchair access before you visit",
    "USE THIS WHEN",
    "KEY MESSAGE",
    "WHAT TO ASK",
    "SUGGESTED WORDING",
    "BEFORE YOU GO",
    "APPLIES TO",
    "OFFICIAL SOURCES",
    "LAST REVIEWED",
    "LIVE CARD",
  ];
  let cursor = 0;
  for (const heading of order) {
    const index = text.indexOf(heading, cursor);
    assert.ok(index >= 0, `missing ${heading}`);
    cursor = index;
  }
  assert.doesNotMatch(text, /What the rules say|Tailor this help card|Related help cards/i);
  assert.match(text, /Equality Act 2010/);
  assert.match(text, /25 July 2026|2026-07-25|25 July 2026/);
});

test("filename convention includes slug and review date", () => {
  assert.equal(
    helpCardDownloadFilename("wheelchair-access-venue", "2026-07-25", "pdf"),
    "access-stamp-help-card-wheelchair-access-venue-2026-07-25.pdf",
  );
  assert.equal(
    helpCardDownloadFilename("wheelchair-access-venue", "2026-07-25", "txt"),
    "access-stamp-help-card-wheelchair-access-venue-2026-07-25.txt",
  );
});

test("canonical printed URL never uses a preview hostname", () => {
  const previous = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://access-stamp-allister-diniz-s-projects.vercel.app";
  const live = helpCardLiveUrl("section-88-driving-licence");
  assert.equal(new URL(live.url).hostname, "accessstamp.co.uk");
  assert.equal(isNonCanonicalPublicHost("example.vercel.app"), true);
  const site = getCanonicalPublicSiteUrl();
  assert.equal(site.source, "approved-domain");
  process.env.NEXT_PUBLIC_SITE_URL = previous;
});

test("QR matrix encodes the live URL and keeps a quiet zone in SVG", () => {
  const url = "https://accessstamp.co.uk/help-cards/wheelchair-access-venue";
  const matrix = createQrMatrix(url);
  assert.ok(matrix.size >= 21);
  assert.equal(matrix.modules.length, matrix.size);
  assert.ok(matrix.modules.some((row) => row.some(Boolean)));
});

test("PDF builder returns selectable-text PDFs with expected page counts", () => {
  for (const slug of [
    "wheelchair-access-venue",
    "section-88-driving-licence",
    "report-inaccessible-information",
    "gp-appointment-access",
    "job-interview-adjustments",
    "reasonable-adjustments-at-work",
  ]) {
    const card = getHelpCard(slug);
    assert.ok(card);
    const resolved = resolveHelpCardDownloadDocument(card);
    assert.equal(resolved.ok, true);
    if (!resolved.ok) continue;
    const pdf = buildHelpCardDownloadPdf(resolved.document);
    const header = Buffer.from(pdf.arrayBuffer.slice(0, 5)).toString("utf8");
    assert.equal(header, "%PDF-");
    assert.ok(pdf.pageCount >= 1);
    assert.ok(pdf.pageCount <= 2, `${slug} produced ${pdf.pageCount} pages`);
  }

  const section88 = getHelpCard("section-88-driving-licence");
  const information = getHelpCard("report-inaccessible-information");
  assert.ok(section88 && information);
  const twoPage = resolveHelpCardDownloadDocument(section88);
  const onePage = resolveHelpCardDownloadDocument(information);
  if (twoPage.ok) assert.equal(twoPage.document.layout, "two-page");
  if (onePage.ok) assert.equal(onePage.document.layout, "one-page");
});

test("layout fixtures wrap long titles, sources and wording without dropping sections", () => {
  const longPdf = buildHelpCardDownloadPdf(LONG_DOWNLOAD_FIXTURE);
  const optionalPdf = buildHelpCardDownloadPdf(OPTIONAL_SECTIONS_FIXTURE);
  assert.equal(Buffer.from(longPdf.arrayBuffer.slice(0, 5)).toString("utf8"), "%PDF-");
  assert.ok(longPdf.pageCount >= 1);
  assert.ok(optionalPdf.pageCount >= 1);

  const longText = buildHelpCardDownloadPlainText(LONG_DOWNLOAD_FIXTURE);
  assert.match(longText, /time-sensitive appointment/);
  assert.match(longText, /substantial disadvantage/);
  const optionalText = buildHelpCardDownloadPlainText(OPTIONAL_SECTIONS_FIXTURE);
  assert.doesNotMatch(optionalText, /WHAT TO ASK/);
  assert.doesNotMatch(optionalText, /SUGGESTED WORDING/);
  assert.doesNotMatch(optionalText, /BEFORE YOU GO/);
});
