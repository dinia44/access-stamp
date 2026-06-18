import { test, expect } from "@playwright/test";
import { LINK_CRAWL_ROUTES } from "./routes";

for (const route of LINK_CRAWL_ROUTES) {
  test(`internal links on ${route} resolve`, async ({ page, request, baseURL }) => {
    await page.goto(route);

    const hrefs = await page.locator('a[href^="/"]').evaluateAll((anchors) => {
      const unique = new Set<string>();
      for (const anchor of anchors) {
        const href = anchor.getAttribute("href");
        if (!href || href.startsWith("//")) continue;
        const path = href.split("#")[0]?.split("?")[0];
        if (path) unique.add(path);
      }
      return [...unique];
    });

    for (const href of hrefs) {
      const url = `${baseURL}${href}`;
      const response = await request.get(url);
      expect(response.status(), `Broken link ${href} from ${route}`).toBeLessThan(400);
    }
  });
}
