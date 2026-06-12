import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

type SeedVenue = {
  id: string;
  slug: string;
  accessScore: number;
  photos?: Array<{ src: string; alt: string }>;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const venueSeed = JSON.parse(
  readFileSync(join(__dirname, "../src/data/venue-seed.json"), "utf8"),
) as SeedVenue[];

function getScoreBand(score: number): string {
  if (score >= 85) return "Excellent access";
  if (score >= 70) return "Good access";
  return "Limited access";
}

const errors: string[] = [];
const imageOwners = new Map<string, string>();
const venues = venueSeed;

for (const venue of venues) {
  if (!venue.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(venue.slug)) {
    errors.push(`${venue.id}: invalid slug "${venue.slug}"`);
  }

  if (venue.accessScore < 0 || venue.accessScore > 100) {
    errors.push(`${venue.slug}: accessScore ${venue.accessScore} outside 0–100`);
  }

  if (!getScoreBand(venue.accessScore)) {
    errors.push(`${venue.slug}: could not derive score band`);
  }

  const expectedHref = `/venue/${venue.slug}`;
  if (!expectedHref.includes(venue.slug)) {
    errors.push(`${venue.slug}: href would not contain slug`);
  }

  for (const image of venue.photos ?? []) {
    if (!image.alt?.trim()) {
      errors.push(`${venue.slug}: image missing alt text (${image.src})`);
    }
    const owner = imageOwners.get(image.src);
    if (owner && owner !== venue.slug) {
      errors.push(`${venue.slug}: duplicate image src also used by ${owner} (${image.src})`);
    } else {
      imageOwners.set(image.src, venue.slug);
    }
  }
}

const slugs = venues.map((venue) => venue.slug);
const duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicateSlugs.length) {
  errors.push(`Duplicate slugs: ${[...new Set(duplicateSlugs)].join(", ")}`);
}

const scoreCounts = new Map<number, number>();
for (const venue of venues) {
  scoreCounts.set(venue.accessScore, (scoreCounts.get(venue.accessScore) ?? 0) + 1);
}
for (const [score, count] of scoreCounts) {
  if (count > 2) {
    errors.push(`More than two venues share accessScore ${score}`);
  }
}

if (errors.length) {
  console.error("Venue validation failed:\n");
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log(`Validated ${venues.length} venues.`);
