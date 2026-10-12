import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@ieee/ui", "@ieee/supabase"],
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 100],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
