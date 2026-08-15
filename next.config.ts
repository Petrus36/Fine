import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Alert-window images uploaded from the admin panel to Vercel Blob.
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    // Room for an alert image plus form fields. Vercel rejects request bodies
    // over 4.5 MB, so the upload itself is capped lower in src/lib/upload.ts.
    serverActions: { bodySizeLimit: "4mb" },
  },
};

export default nextConfig;
