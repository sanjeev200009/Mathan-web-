import type { NextConfig } from "next";

// `npm run build:static` makes plain files for Cloudflare Pages (the live link). A static export refuses
// cacheComponents, partialPrefetching and redirects, so they are on only for the normal build; the "/"
// to "/en" redirect comes from public/_redirects there instead.
const STATIC = process.env.npm_lifecycle_event === "build:static";

const nextConfig: NextConfig = STATIC
  ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
  : {
      cacheComponents: true,
      partialPrefetching: true,
      // English is the default while the site is built (owner, 16 Nov: "first go with the English, then
      // translate into Tamil"). Tamil stays at /ta; switch this back to /ta once it is translated.
      async redirects() {
        return [{ source: "/", destination: "/en", permanent: false }];
      },
    };

export default nextConfig;
