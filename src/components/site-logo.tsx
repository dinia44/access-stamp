import Image from "next/image";
import { SITE_LOGO_HEIGHT, SITE_LOGO_SRC, SITE_LOGO_WIDTH } from "@/lib/site";

const LOCAL_FALLBACK = "/access-stamp-logo-2026.png";

function isRemoteUrl(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
};

export function SiteLogo({ className, priority, width = SITE_LOGO_WIDTH, height = SITE_LOGO_HEIGHT }: SiteLogoProps) {
  if (isRemoteUrl(SITE_LOGO_SRC)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={SITE_LOGO_SRC}
        alt="Access Stamp"
        width={width}
        height={height}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    );
  }

  return (
    <Image
      src={SITE_LOGO_SRC}
      alt="Access Stamp"
      width={width}
      height={height}
      priority={priority}
      className={className}
    />
  );
}

export { LOCAL_FALLBACK as SITE_LOGO_FALLBACK };
