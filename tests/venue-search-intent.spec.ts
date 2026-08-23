import { expect, test } from "@playwright/test";

test.describe("Venue Finder search intent", () => {
  test("q=Harbour Kitchen ranks Harbour Kitchen first and does not say Venues in Harbour Kitchen", async ({
    page,
  }) => {
    await page.goto("/venue-finder?q=Harbour%20Kitchen");

    await expect(page.getByRole("heading", { name: /venues? found/i })).toBeVisible();
    await expect(page.getByRole("status")).not.toContainText("Venues in Harbour Kitchen");
    await expect(page.getByRole("status")).toContainText("Venues across the UK");

    const firstCard = page.locator("#venue-results li, #venue-results [class*='venue']").first();
    await expect(page.getByRole("heading", { name: "Harbour Kitchen" }).first()).toBeVisible();
    await expect(firstCard).toContainText("Harbour Kitchen");
  });

  test("q=zzzz-no-venue shows explicit no-results without unrelated listings", async ({ page }) => {
    await page.goto("/venue-finder?q=zzzz-no-venue");

    await expect(page.getByRole("heading", { name: /No venues match/i })).toBeVisible();
    await expect(page.getByText(/browse all demonstration venues/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Harbour Kitchen" })).toHaveCount(0);
  });

  test("location=Liverpool shows Liverpool status without copying into q", async ({ page }) => {
    await page.goto("/venue-finder?location=Liverpool");

    await expect(page.getByRole("status")).toContainText("Venues in Liverpool");
    await expect(page.getByLabel("Venue name or category")).toHaveValue("");
    await expect(page.getByLabel("Town or postcode")).toHaveValue("Liverpool");
  });

  test("q + location keep independent params and exact venue first", async ({ page }) => {
    await page.goto("/venue-finder?q=Harbour%20Kitchen&location=Liverpool");

    await expect(page.getByLabel("Venue name or category")).toHaveValue("Harbour Kitchen");
    await expect(page.getByLabel("Town or postcode")).toHaveValue("Liverpool");
    await expect(page.getByRole("status")).toContainText("Venues in Liverpool");
    await expect(page.getByRole("status")).not.toContainText("Venues in Harbour Kitchen");
    await expect(page.getByRole("heading", { name: "Harbour Kitchen" }).first()).toBeVisible();
  });

  test("malformed params and empty query remain usable", async ({ page }) => {
    await page.goto("/venue-finder?q=&location=&filters=");
    await expect(page.getByRole("heading", { name: "Venues to explore" })).toBeVisible();

    await page.goto("/venue-finder?filters=__not_a_real_filter");
    await expect(page.locator("#venue-results")).toBeVisible();
  });
});
