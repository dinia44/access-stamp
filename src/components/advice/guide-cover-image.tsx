import Image from "next/image";

/**
 * Advice card / hero imagery (typically inside `AdviceMediaFrame`). Local `.svg` covers use `unoptimized` so they always render in production.
 */
export function GuideCoverImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  const unoptimized = src.endsWith(".svg");
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized}
    />
  );
}
