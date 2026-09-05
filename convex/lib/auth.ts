import type { Doc } from "../_generated/dataModel";
import type { MutationCtx, QueryCtx } from "../_generated/server";

export async function getCurrentUserOrNull(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"profiles"> | null> {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    return null;
  }

  return await ctx.db
    .query("profiles")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .unique();
}

export async function getCurrentUser(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"profiles">> {
  const user = await getCurrentUserOrNull(ctx);
  if (!user) {
    throw new Error("Not authenticated");
  }
  return user;
}

export async function requireStaff(
  ctx: QueryCtx | MutationCtx
): Promise<Doc<"profiles">> {
  const user = await getCurrentUser(ctx);
  if (user.role !== "admin" && user.role !== "staff") {
    throw new Error("Staff access required");
  }
  return user;
}
