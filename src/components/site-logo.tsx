"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { SITE_LOGO_HEIGHT, SITE_LOGO_SRC, SITE_LOGO_WIDTH } from "@/lib/site";

const LOCAL_FALLBACK = "/logo.svg";

function isRemoteUrl(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

/**
 * Remote logos load via <img> so the browser hits Cloudinary directly.
 * next/image optimization can fail (403) if the asset is private or blocks server-side fetches.
 */
export function SiteLogo({ className, priority, width = SITE_LOGO_WIDTH, height = SITE_LOGO_HEIGHT }: SiteLogoProps) {
  const [src, setSrc] = useState(SITE_LOGO_SRC);

  const onError = useCallback(() => {
    setSrc((current) => (current !== LOCAL_FALLBACK ? LOCAL_FALLBACK : current));
  }, []);

  if (isRemoteUrl(src)) {
    return (
      <img
        src={src}
        alt="Access Stamp"
        width={width}
        height={height}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
        onError={onError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt="Access Stamp"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}
