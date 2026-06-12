import { CLOUDINARY_MEDIA } from "@/lib/cloudinary-media";
import { absoluteUrl } from "@/lib/seo/site-url";

/** Branded default for pages without a specific hero image. */
export const DEFAULT_OG_IMAGE = CLOUDINARY_MEDIA.homepageHeroBackdrop;

export function defaultOgImageUrl(): string {
  if (DEFAULT_OG_IMAGE.startsWith("http")) return DEFAULT_OG_IMAGE;
  return absoluteUrl(DEFAULT_OG_IMAGE);
}
