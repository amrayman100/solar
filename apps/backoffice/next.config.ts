import path from "node:path";
import type { NextConfig } from "next";

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

export default nextConfig;
