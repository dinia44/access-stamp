import { test, expect } from "@playwright/test";

const widths = [320, 375, 390, 768, 1024, 1440];

for (const width of widths) {
  test(`no horizontal scroll at ${width}px on venue finder`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/venue-finder");

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });

    expect(hasOverflow).toBe(false);
  });
}
