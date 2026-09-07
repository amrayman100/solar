/** Production Convex deployment (artful-monitor-177). */
export const PROD_CONVEX_URL = "https://artful-monitor-177.convex.cloud";
export const PROD_CONVEX_SITE_URL = "https://artful-monitor-177.convex.site";

export function getConvexUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CONVEX_URL?.trim() ||
    process.env.CONVEX_URL?.trim() ||
    PROD_CONVEX_URL
  );
}

export function getConvexSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CONVEX_SITE_URL?.trim() ||
    process.env.CONVEX_SITE_URL?.trim() ||
    PROD_CONVEX_SITE_URL
  );
}
