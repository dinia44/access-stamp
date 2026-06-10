export const SAVED_VENUES_STORAGE_KEY = "access-stamp-saved-venues";
export const SAVED_VENUES_CHANGE_EVENT = "access-stamp-saved-change";

export function readSavedVenueSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_VENUES_STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function writeSavedVenueSlugs(slugs: string[]) {
  window.localStorage.setItem(SAVED_VENUES_STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(SAVED_VENUES_CHANGE_EVENT));
}

export function toggleSavedVenueSlug(slug: string): boolean {
  const current = readSavedVenueSlugs();
  const has = current.includes(slug);
  const updated = has ? current.filter((s) => s !== slug) : [...current, slug];
  writeSavedVenueSlugs(updated);
  return !has;
}

export function subscribeSavedVenues(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const run = () => cb();
  window.addEventListener("storage", run);
  window.addEventListener(SAVED_VENUES_CHANGE_EVENT, run);
  return () => {
    window.removeEventListener("storage", run);
    window.removeEventListener(SAVED_VENUES_CHANGE_EVENT, run);
  };
}
