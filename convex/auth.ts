import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const backofficeUrl = process.env.BACKOFFICE_URL ?? "http://localhost:3001";

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth({
    appName: "Bolt Energy",
    baseURL: siteUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins: [siteUrl, backofficeUrl],
    plugins: [convex({ authConfig })],
  });
};
