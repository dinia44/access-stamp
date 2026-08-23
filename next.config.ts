import type { NextConfig } from "next";
import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import { SITE_CONFIG } from "./src/lib/site-config";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";

/**
 * CSP tailored to first- and third-party origins actually used by the app.
 * Tighten further after soft-launch once unused hosts are confirmed absent.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://images.unsplash.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  // Next.js requires 'unsafe-inline' scripts in many deployments; avoid unsafe-eval in production.
  isProd
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "connect-src 'self' https://api.openai.com https://api.elevenlabs.io https://*.cloudinary.com https://*.tile.openstreetmap.org https://*.basemaps.cartocdn.com https://nominatim.openstreetmap.org",
  "worker-src 'self' blob:",
  "media-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(self), geolocation=(self), payment=(), usb=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/advice/access-to-work-application-guide",
        destination: "/advice/access-to-work",
        permanent: true,
      },
      {
        source: "/mission",
        destination: "/about",
        permanent: true,
      },
      // Prefer the approved public domain once DNS and NEXT_PUBLIC_SITE_URL are live.
      // Host-based redirects for the Vercel hostname should also be configured in the
      // Vercel project Domains settings so preview URLs are not force-redirected.
      ...(process.env.VERCEL_ENV === "production"
        ? [
            {
              source: "/:path*",
              has: [{ type: "host" as const, value: SITE_CONFIG.vercelHostname }],
              destination: `${SITE_CONFIG.url}/:path*`,
              permanent: true,
            },
          ]
        : []),
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default withBundleAnalyzer(nextConfig);
