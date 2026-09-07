import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { getConvexSiteUrl, getConvexUrl } from "@/lib/convex-env";

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: getConvexUrl(),
  convexSiteUrl: getConvexSiteUrl(),
});
