/** Accept only a local finder route; discard external and unrelated destinations. */
export function safeVenueReturnUrl(value: string | null): string {
  if (!value || !/^\/venue-finder(?:[?#]|$)/.test(value) || value.includes("\\")) return "/venue-finder";
  try {
    const url = new URL(value, "https://accessstamp.invalid");
    if (url.origin !== "https://accessstamp.invalid" || url.pathname !== "/venue-finder") return "/venue-finder";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch { return "/venue-finder"; }
}
