export const SAVED_VENUES_STORAGE_KEY = "access-stamp-saved-venues";
export const SAVED_VENUES_CHANGE_EVENT = "access-stamp-saved-change";

const EMPTY_SLUGS: string[] = [];

let cachedRaw: string | null | undefined;
let cachedSlugs: string[] = EMPTY_SLUGS;

function parseSlugs(raw: string | null): string[] {
  if (!raw) return EMPTY_SLUGS;
  try {
    const parsed = JSON.parse(raw) as unknown;
    const slugs = Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
    return slugs.length ? slugs : EMPTY_SLUGS;
  } catch {
    return EMPTY_SLUGS;
  }
}

function slugsEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((slug, index) => slug === b[index]);
}

/** Stable snapshot for useSyncExternalStore — returns the same array reference when data is unchanged. */
export function getSavedVenueSlugsSnapshot(): string[] {
  if (typeof window === "undefined") return EMPTY_SLUGS;
  const raw = window.localStorage.getItem(SAVED_VENUES_STORAGE_KEY);
  if (raw === cachedRaw) return cachedSlugs;
  const next = parseSlugs(raw);
  if (slugsEqual(next, cachedSlugs)) {
    cachedRaw = raw;
    return cachedSlugs;
  }
  cachedRaw = raw;
  cachedSlugs = next;
  return cachedSlugs;
}

export function readSavedVenueSlugs(): string[] {
  return getSavedVenueSlugsSnapshot();
}

export function writeSavedVenueSlugs(slugs: string[]) {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify(slugs);
  window.localStorage.setItem(SAVED_VENUES_STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedSlugs = slugs.length ? slugs : EMPTY_SLUGS;
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
