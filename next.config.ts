import type { NextConfig } from "next";

// Pages are only indexable when ALLOW_INDEXING=true (set it on the production
// deployment only). Everything else, including preview deployments, is noindex.
const indexingEnabled = process.env.ALLOW_INDEXING === "true";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Photography is served from /public/images. Add a host here only if you
    // load images from a CDN, e.g. { protocol: "https", hostname: "cdn.example-host.com" }.
    remotePatterns: [],
  },
  async headers() {
    const security = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      {
        source: "/:path*",
        headers: indexingEnabled
          ? security
          : [...security, { key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
