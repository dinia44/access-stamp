import { test, expect } from "@playwright/test";

const CARD = "/help-cards/wheelchair-access-venue";
const SECTION = "/help-cards/section-88-driving-licence";
const WORDING = "/help-cards/reasonable-adjustments-at-work";

test("download actions have accessible names and a live status region", async ({ page }) => {
  await page.goto(CARD);

  const pdf = page.getByRole("button", {
    name: /download this card as a pdf of checking wheelchair access with a venue/i,
  });
  const txt = page.getByRole("button", {
    name: /download checking wheelchair access with a venue as text/i,
  });
  const print = page.getByRole("button", { name: /print checking wheelchair access with a venue card/i });

  await expect(pdf).toBeVisible();
  await expect(txt).toBeVisible();
  await expect(print).toBeVisible();
  await expect(page.getByText(/take a short version with you/i)).toBeVisible();
  await expect(page.getByText(/downloads are saved to this device/i)).toBeVisible();
  await expect(page.locator("[data-help-card-download-status]")).toHaveCount(1);
});

test("download controls are keyboard operable with visible focus", async ({ page }) => {
  await page.goto(CARD);
  const pdf = page.getByRole("button", { name: /download this card as a pdf/i });
  await pdf.focus();
  await expect(pdf).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: /as text/i })).toBeFocused();
});

test("PDF and plain-text endpoints use curated content and filenames", async ({ request }) => {
  const pdf = await request.get("/api/help-cards/wheelchair-access-venue/pdf");
  expect(pdf.status()).toBe(200);
  expect(pdf.headers()["content-type"]).toContain("application/pdf");
  expect(pdf.headers()["content-disposition"]).toContain(
    "access-stamp-help-card-wheelchair-access-venue-2026-07-25.pdf",
  );
  const pdfBody = await pdf.body();
  expect(pdfBody.subarray(0, 5).toString()).toBe("%PDF-");

  const txt = await request.get("/api/help-cards/wheelchair-access-venue/txt");
  expect(txt.status()).toBe(200);
  expect(txt.headers()["content-type"]).toContain("text/plain");
  expect(txt.headers()["content-disposition"]).toContain(
    "access-stamp-help-card-wheelchair-access-venue-2026-07-25.txt",
  );
  const text = await txt.text();
  expect(text).toContain("ACCESS STAMP HELP CARD");
  expect(text).toContain("Checking wheelchair access before you visit");
  expect(text).toContain("USE THIS WHEN");
  expect(text).toContain("YOU COULD SEND OR SAY");
  expect(text).not.toContain("What the rules say");
  expect(text).not.toMatch(/vercel\.app/i);
});

test("unknown and unapproved cards do not dump webpage text", async ({ request }) => {
  const missing = await request.get("/api/help-cards/not-a-real-card/pdf");
  expect(missing.status()).toBe(404);

  const fixture = await request.get("/api/help-cards/fixture-flying-with-mobility-equipment/pdf");
  expect(fixture.status()).toBe(404);

  const txt = await request.get("/api/help-cards/not-a-real-card/txt");
  expect(txt.status()).toBe(404);
});

test("print media shows the designed document and hides web chrome", async ({ page }) => {
  await page.goto(CARD);
  await page.emulateMedia({ media: "print" });

  await expect(page.locator(".help-card-document")).toBeVisible();
  await expect(page.locator(".help-card-web-only")).toBeHidden();
  await expect(page.getByRole("button", { name: /download this card as a pdf/i })).toBeHidden();
  await expect(page.locator(".help-card-document h1")).toHaveText(/checking wheelchair access before you visit/i);
  await expect(page.locator(".help-card-document")).toContainText(/if anything has changed, this is the live page/i);
});

test("mobile download controls stay usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(CARD);
  const pdf = page.getByRole("button", { name: /download this card as a pdf/i });
  const box = await pdf.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(44);
  await expect(pdf).toBeVisible();
  await expect(page.getByRole("button", { name: /as text/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /print /i })).toBeVisible();
});

test("wording-led and legally conditional cards expose the same download actions", async ({ page }) => {
  for (const route of [SECTION, WORDING]) {
    await page.goto(route);
    await expect(page.getByRole("button", { name: /download this card as a pdf/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /as text/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /print /i })).toBeVisible();
  }
});

test("failed PDF download is retryable and announced", async ({ page }) => {
  await page.route("**/api/help-cards/wheelchair-access-venue/pdf", async (route) => {
    await route.fulfill({ status: 500, body: "error" });
  });
  await page.goto(CARD);
  const pdf = page.getByRole("button", { name: /download this card as a pdf/i });
  await pdf.click();
  await expect(pdf).toHaveText(/PDF failed — try again/i);
  await expect(pdf).toBeEnabled();
  await expect(page.locator("[data-help-card-download-status]")).toContainText(
    /could not download the pdf/i,
  );
});
