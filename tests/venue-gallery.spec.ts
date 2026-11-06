import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const report = "/venue/harbour-kitchen-liverpool";

for (const width of [1280, 390]) {
  test(`venue gallery can browse, expand and restore focus at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(report);
    const gallery = page.getByRole("region", { name: "Venue photo gallery" });
    await expect(
      gallery.getByRole("button", {
        name: "Show photo: Routes and seating",
        exact: true,
      }),
    ).toHaveAttribute("aria-pressed", "true");
    await gallery
      .getByRole("button", { name: "Next photo", exact: true })
      .click();
    await expect(gallery.getByRole("status")).toContainText("Parking bay");
    await gallery
      .getByRole("button", { name: "Previous photo", exact: true })
      .click();
    const toilet = gallery.getByRole("button", {
      name: "Show photo: Toilet layout",
      exact: true,
    });
    await toilet.click();
    await expect(gallery.getByRole("status")).toContainText(
      "Photo 3 of 6: Toilet layout",
    );
    await toilet.press("ArrowRight");
    await expect(
      gallery.getByRole("button", {
        name: "Show photo: Routes and seating",
        exact: true,
      }),
    ).toBeFocused();
    await page.keyboard.press("Home");
    await expect(
      gallery.getByRole("button", {
        name: "Show photo: Venue frontage",
        exact: true,
      }),
    ).toBeFocused();
    await page.keyboard.press("End");
    await expect(gallery.getByRole("status")).toContainText("Photo 6 of 6");
    const trigger = gallery.getByRole("button", {
      name: "View all 6 photos",
      exact: true,
    });
    await trigger.click();
    const viewer = page.getByRole("dialog", { name: "Venue photo viewer" });
    await expect(viewer).toBeVisible();
    await expect(
      viewer.getByRole("button", { name: "Close", exact: false }),
    ).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(
      viewer.getByText("Venue frontage", { exact: true }),
    ).toBeVisible();
    for (let i = 0; i < 8; i++) {
      await page.keyboard.press("Tab");
      await expect
        .poll(() =>
          viewer.evaluate((el) => el.contains(document.activeElement)),
        )
        .toBe(true);
    }
    const violations = (
      await new AxeBuilder({ page }).include(".venue-gallery-dialog").analyze()
    ).violations;
    expect(
      violations.filter((v) =>
        ["critical", "serious"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
    await page.keyboard.press("Escape");
    await expect(viewer).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await expect
      .poll(() => page.evaluate(() => document.body.style.overflow))
      .not.toBe("hidden");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    ).toBe(false);
  });
}

test("save venue persists and does not change demo evidence", async ({
  page,
}) => {
  await page.goto(report);
  const save = page.getByRole("button", { name: "Save", exact: true });
  await save.click();
  await expect(
    page.getByRole("button", { name: "Saved", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Saved", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#venue-measurements")).toContainText("92 cm");
  await expect(page.locator("#venue-measurements")).toContainText("80 cm");
  await expect(page.getByText("5 to confirm", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Example listing", { exact: true }),
  ).toBeVisible();
});

test("venue report has no serious accessibility violations including contrast", async ({
  page,
}) => {
  await page.goto(report);
  const results = await new AxeBuilder({ page })
    .include(".venue-report")
    .analyze();
  expect(
    results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    ),
    JSON.stringify(results.violations, null, 2),
  ).toEqual([]);
});

test("missing photo leaves the next and previous controls usable", async ({
  page,
}) => {
  await page.route("**/_next/image?*", (route) => route.abort());
  await page.goto(report);
  const gallery = page.getByRole("region", { name: "Venue photo gallery" });
  await expect(
    gallery.getByText("This photo is unavailable. Try another photo."),
  ).toBeVisible();
  await gallery
    .getByRole("button", { name: "Next photo", exact: true })
    .click();
  await expect(gallery.getByRole("status")).toContainText("Parking bay");
});

test("horizontal touch gesture advances the gallery without opening the viewer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(report);
  const gallery = page.getByRole("region", { name: "Venue photo gallery" });
  const surface = gallery.getByRole("button", {
    name: "Expand photo: Routes and seating",
    exact: true,
  });
  await surface.dispatchEvent("pointerdown", {
    pointerType: "touch",
    clientX: 280,
    clientY: 200,
  });
  await surface.dispatchEvent("pointerup", {
    pointerType: "touch",
    clientX: 100,
    clientY: 205,
  });
  await expect(gallery.getByRole("status")).toContainText("Parking bay");
  await expect(
    page.getByRole("dialog", { name: "Venue photo viewer" }),
  ).not.toBeVisible();
});
