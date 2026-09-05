"use client";

import { useConvexAuth } from "convex/react";

/** Pass to staff-only `useQuery` so it does not run before Convex auth is ready. */
export function useStaffQueryArgs(): {} | "skip" {
  const { isAuthenticated, isLoading } = useConvexAuth();
  if (isLoading || !isAuthenticated) return "skip";
  return {};
}
