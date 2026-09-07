import path from "node:path";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const DEFAULT_CONVEX_URL = "https://artful-monitor-177.convex.cloud";
const DEFAULT_CONVEX_SITE_URL = "https://artful-monitor-177.convex.site";

// Guarantee Better Auth / Convex auth can resolve URLs during `next build`
// even if Vercel project env vars are missing or misnamed.
process.env.NEXT_PUBLIC_CONVEX_URL =
  process.env.NEXT_PUBLIC_CONVEX_URL?.trim() || DEFAULT_CONVEX_URL;
process.env.NEXT_PUBLIC_CONVEX_SITE_URL =
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL?.trim() || DEFAULT_CONVEX_SITE_URL;
process.env.CONVEX_SITE_URL =
  process.env.CONVEX_SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_CONVEX_SITE_URL;

function convexStorageRemotePatterns(): NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
> {
  const raw = process.env.NEXT_PUBLIC_CONVEX_URL?.trim();
  if (!raw) return [];
  try {
    const u = new URL(raw);
    const protocol = u.protocol === "http:" ? "http" : "https";
    return [
      {
        protocol,
        hostname: u.hostname,
        pathname: "/api/storage/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  transpilePackages: ["@bolt-energy/ui", "@bolt-energy/models"],
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CONVEX_SITE_URL: process.env.NEXT_PUBLIC_CONVEX_SITE_URL,
    CONVEX_SITE_URL: process.env.CONVEX_SITE_URL,
  },
  images: {
    remotePatterns: convexStorageRemotePatterns(),
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  turbopack: {
    resolveAlias: {
      "@convex": path.join(__dirname, "../../convex"),
    },
  },
};

export default withNextIntl(nextConfig);
