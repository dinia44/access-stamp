/** Public routes that must load for launch. */
export const SMOKE_ROUTES = [
  "/",
  "/venue-finder",
  "/advice",
  "/advice/pip-in-plain-english",
  "/help-cards",
  "/help-cards/section-88-driving-licence",
  "/ai-toolkit",
  "/ai-toolkit/letter-builder",
  "/ai-toolkit/article-companion",
  "/for-venues",
  "/methodology",
  "/corrections",
  "/complaints",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
  "/accessibility",
  "/about",
  "/submit-venue",
  "/venue/harbour-kitchen-liverpool",
] as const;

export const LINK_CRAWL_ROUTES = SMOKE_ROUTES.filter((route) => !route.includes("/venue/"));

export const AXE_ROUTES = SMOKE_ROUTES.filter(
  (route) => !route.includes("tribunal") && route !== "/submit-venue",
);
