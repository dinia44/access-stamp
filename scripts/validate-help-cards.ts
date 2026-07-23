#!/usr/bin/env node
/**
 * Build-time Help Cards content checks.
 * Scans authored data for placeholders and empty source URLs without relying on path aliases.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const packDataPath = join(root, "src/data/helpCardPacks.ts");
const source = readFileSync(packDataPath, "utf8");

const PLACEHOLDERS = [
  "Add latest review date",
  "TBC",
  "TODO",
  "TBA",
];

const errors: string[] = [];

for (const placeholder of PLACEHOLDERS) {
  const patterns = [`"${placeholder}"`, `'${placeholder}'`, `\`${placeholder}\``];
  for (const pattern of patterns) {
    if (source.includes(pattern)) {
      errors.push(`Found placeholder value ${pattern} in helpCardPacks.ts`);
    }
  }
}

if (/href:\s*["']#["']/.test(source) || /href:\s*["']\s*["']/.test(source)) {
  errors.push("Found empty or hash-only source href in helpCardPacks.ts");
}

// Evidence summary cards must include at least one https source nearby in the pack file.
if (!source.includes("type: \"evidence-summary\"")) {
  // optional — no evidence cards is fine
} else if (!/https:\/\/www\.(gov\.uk|legislation\.gov\.uk)/.test(source)) {
  errors.push("Evidence summary content appears without a gov.uk / legislation.gov.uk source URL");
}

if (errors.length > 0) {
  console.error("Help Cards validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Help Cards validation passed.");
