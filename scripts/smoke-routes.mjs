#!/usr/bin/env node
/**
 * Launch-gate checks without Playwright — HTTP smoke, content checks, internal links.
 * Usage: node scripts/smoke-routes.mjs [baseUrl]
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = (process.argv[2] ?? process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const routesPath = join(dirname(fileURLToPath(import.meta.url)), "../tests/routes.ts");
const routesSource = readFileSync(routesPath, "utf8");
const routeMatch = routesSource.match(/export const SMOKE_ROUTES = \[([\s\S]*?)\] as const/);
const linkMatch = routesSource.match(/export const LINK_CRAWL_ROUTES = SMOKE_ROUTES\.filter\([^)]+\)/);

if (!routeMatch) {
  console.error("Could not read SMOKE_ROUTES from tests/routes.ts");
  process.exit(1);
}

const routes = [...routeMatch[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]);
const linkCrawlRoutes = linkMatch
  ? routes.filter((route) => !route.includes("/venue/"))
  : routes;

const failures = [];
const checkedLinks = new Set();

async function fetchHtml(path) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, { redirect: "follow" });
  if (response.status >= 400) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.text();
}

for (const route of routes) {
  try {
    const html = await fetchHtml(route);
    if (!/<h1[\s>]/i.test(html)) {
      failures.push(`${route} → missing h1`);
    }
  } catch (error) {
    failures.push(`${route} → ${error instanceof Error ? error.message : String(error)}`);
  }
}

try {
  const home = await fetchHtml("/");
  if (!/check venue access/i.test(home)) failures.push("/ → missing primary CTA copy");
  if (!/find practical guidance/i.test(home)) failures.push("/ → missing secondary CTA copy");
} catch (error) {
  failures.push(`/ content check → ${error instanceof Error ? error.message : String(error)}`);
}

try {
  const venue = await fetchHtml("/venue/harbour-kitchen-liverpool");
  if (!/demo listing/i.test(venue)) failures.push("venue demo page → missing demo listing banner");
} catch (error) {
  failures.push(`venue demo check → ${error instanceof Error ? error.message : String(error)}`);
}

for (const route of linkCrawlRoutes) {
  try {
    const html = await fetchHtml(route);
    const hrefs = [...html.matchAll(/href="(\/[^"#?]*)/g)].map((match) => match[1]);
    for (const href of hrefs) {
      if (checkedLinks.has(href)) continue;
      checkedLinks.add(href);
      const response = await fetch(`${baseUrl}${href}`, { redirect: "follow" });
      if (response.status >= 400) {
        failures.push(`broken link ${href} (found on ${route}) → HTTP ${response.status}`);
      }
    }
  } catch (error) {
    failures.push(`${route} link crawl → ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("Launch gate failures:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}

console.log(`Launch gate OK: ${routes.length} routes, ${checkedLinks.size} internal links at ${baseUrl}`);
