import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Room for an alert image plus form fields. Vercel rejects request bodies
    // over 4.5 MB, so the upload itself is capped lower in src/lib/upload.ts.
    serverActions: { bodySizeLimit: "4mb" },
  },
  async redirects() {
    return [
      { source: "/restauracia/jedalny-listok", destination: "/a-la-carte", permanent: true },
      { source: "/restauracia/obedove-menu", destination: "/menu", permanent: true },
      { source: "/restauracia/ranajkove-menu", destination: "/ranajky", permanent: true },
      { source: "/restauracia/napojovy-listok", destination: "/napoje", permanent: true },
      { source: "/restauracia/vinna-karta", destination: "/napoje", permanent: true },
      { source: "/restauracia/sezonne-ponuky", destination: "/menu", permanent: true },
      { source: "/restauracia", destination: "/bakery-bistro", permanent: true },
      { source: "/restauracia/:path+", destination: "/menu", permanent: true },
      { source: "/jedalny-listok", destination: "/a-la-carte", permanent: true },
      { source: "/obedove-menu", destination: "/menu", permanent: true },
      { source: "/ranajkove-menu", destination: "/ranajky", permanent: true },
      { source: "/napojovy-listok", destination: "/napoje", permanent: true },
      { source: "/vinna-karta", destination: "/napoje", permanent: true },
      { source: "/sezonne-ponuky", destination: "/menu", permanent: true },
      { source: "/ubytovanie", destination: "/apartmany", permanent: true },
      { source: "/fotogaleria", destination: "/apartmany", permanent: true },
      { source: "/akcie-podujatia", destination: "/akcie", permanent: true },
    ];
  },
};

export default nextConfig;
