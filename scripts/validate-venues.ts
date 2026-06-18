import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

type SeedVenue = {
  id: string;
  slug: string;
  accessScore: number;
  verification?: string;
  verificationType?: string;
  rating?: number;
  photos?: Array<{ src: string; alt: string }>;
};

const PROHIBITED_COPY_ALLOWLIST = new Set([
  "src/lib/venue-verification.ts",
  "src/data/venues.ts",
]);

const PROHIBITED_COPY = [
  "Founder image/video to be added",
  "hello@accessstamp.com",
  "Access Stamp checked",
  "Lorem ipsum",
] as const;

const ALLOWED_ACCESS_STAMP_CHECKED = new Set<string>();

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const venueSeed = JSON.parse(
  readFileSync(join(root, "src/data/venue-seed.json"), "utf8"),
) as SeedVenue[];

function getScoreBand(score: number): string {
  if (score >= 85) return "Excellent access";
  if (score >= 70) return "Good access";
  return "Limited access";
}

function walkSourceFiles(dir: string, files: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".next" || entry.name === "api") continue;
      walkSourceFiles(fullPath, files);
    } else if (/\.(tsx?|jsx?|mdx?)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

const errors: string[] = [];
const imageOwners = new Map<string, string>();
const venues = venueSeed;

for (const venue of venues) {
  if (!venue.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(venue.slug)) {
    errors.push(`${venue.id}: invalid slug "${venue.slug}"`);
  }

  if (!venue.verificationType) {
    errors.push(`${venue.slug}: missing verificationType`);
  }

  if (venue.rating !== undefined) {
    errors.push(`${venue.slug}: unsourced rating field must be removed`);
  }

  if (venue.accessScore < 0 || venue.accessScore > 100) {
    errors.push(`${venue.slug}: accessScore ${venue.accessScore} outside 0–100`);
  }

  if (!getScoreBand(venue.accessScore)) {
    errors.push(`${venue.slug}: could not derive score band`);
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

const sourceFiles = [
  ...walkSourceFiles(join(root, "src/app")),
  ...walkSourceFiles(join(root, "src/components")),
];
for (const file of sourceFiles) {
  const relative = file.replace(`${root}/`, "");
  if (PROHIBITED_COPY_ALLOWLIST.has(relative)) continue;
  const content = readFileSync(file, "utf8");
  for (const phrase of PROHIBITED_COPY) {
    if (!content.includes(phrase)) continue;
    if (phrase === "Access Stamp checked" && ALLOWED_ACCESS_STAMP_CHECKED.has(file)) continue;
    errors.push(`Prohibited public copy "${phrase}" in ${relative}`);
  }
}

if (errors.length) {
  console.error("Venue validation failed:\n");
  for (const error of errors) console.error(`  • ${error}`);
  process.exit(1);
}

console.log(`Validated ${venues.length} venues and ${sourceFiles.length} source files.`);
