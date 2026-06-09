/**
 * Cloudinary delivery URL helpers — f_auto, q_auto, sized transforms.
 * Non-Cloudinary URLs pass through unchanged (optionally with Unsplash width params).
 */

type CloudinaryTransform = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit" | "scale";
  dpr?: "auto" | number;
  quality?: "auto";
  format?: "auto";
};

const DEFAULT_QUALITY = "q_auto";
const DEFAULT_FORMAT = "f_auto";

function buildTransformSegment(opts: CloudinaryTransform): string {
  const parts: string[] = [DEFAULT_FORMAT, DEFAULT_QUALITY];
  if (opts.width) parts.push(`w_${opts.width}`);
  if (opts.height) parts.push(`h_${opts.height}`);
  if (opts.crop) parts.push(`c_${opts.crop}`);
  if (opts.dpr) parts.push(`dpr_${opts.dpr}`);
  return parts.join(",");
}

/** Inject or replace transform segment in a Cloudinary delivery URL. */
export function cloudinaryUrl(src: string, opts: CloudinaryTransform = {}): string {
  if (!src.includes("res.cloudinary.com")) {
    if (src.includes("images.unsplash.com") && opts.width) {
      const url = new URL(src);
      url.searchParams.set("w", String(opts.width));
      url.searchParams.set("q", "80");
      url.searchParams.set("auto", "format");
      if (opts.height) url.searchParams.set("h", String(opts.height));
      return url.toString();
    }
    return src;
  }

  const transform = buildTransformSegment(opts);
  const uploadMarker = "/upload/";
  const idx = src.indexOf(uploadMarker);
  if (idx === -1) return src;

  const prefix = src.slice(0, idx + uploadMarker.length);
  let remainder = src.slice(idx + uploadMarker.length);

  // Strip transform path segments until version (v123) or public id
  while (remainder.length > 0) {
    const slash = remainder.indexOf("/");
    if (slash === -1) break;
    const segment = remainder.slice(0, slash);
    if (/^v\d+$/.test(segment)) break;
    if (/^(f_|q_|w_|h_|c_|dpr_|g_|e_)/.test(segment) || segment.includes(",")) {
      remainder = remainder.slice(slash + 1);
      continue;
    }
    break;
  }

  return `${prefix}${transform}/${remainder}`;
}

/** Venue card thumbnail — 16:9, mobile-friendly payload. */
export function venueCardImageUrl(src: string): string {
  return cloudinaryUrl(src, { width: 640, height: 360, crop: "fill", dpr: "auto" });
}

/** Homepage hero backdrop — wide, moderate weight. */
export function heroBackdropImageUrl(src: string): string {
  return cloudinaryUrl(src, { width: 1400, crop: "limit", dpr: "auto" });
}

/** Hero collage / secondary marketing images. */
export function heroCollageImageUrl(src: string): string {
  return cloudinaryUrl(src, { width: 520, height: 390, crop: "fill", dpr: "auto" });
}

/** Help Cards hero photo — portrait-friendly, moderate weight. */
export function helpCardsHeroImageUrl(src: string): string {
  return cloudinaryUrl(src, { width: 720, height: 900, crop: "fill", dpr: "auto" });
}
