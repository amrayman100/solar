import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";
import { components } from "./_generated/api";
import type { DataModel } from "./_generated/dataModel";
import authConfig from "./auth.config";

const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
const backofficeUrl = process.env.BACKOFFICE_URL ?? "http://localhost:3001";

function normalizeOrigin(value: string): string {
  return value.trim().replace(/\/$/, "");
}

function collectTrustedOrigins(): string[] {
  const fromEnv = (process.env.TRUSTED_ORIGINS ?? "")
    .split(",")
    .map(normalizeOrigin)
    .filter(Boolean);

  const defaults = [
    siteUrl,
    backofficeUrl,
    "http://localhost:3000",
    "http://localhost:3001",
    "https://www.boltenergy.me",
    "https://boltenergy.me",
    "https://solar-backoffice-amrayman100s-projects.vercel.app",
    "https://solar-backoffice-gules.vercel.app",
  ]
    .map(normalizeOrigin)
    .filter(Boolean);

  return [...new Set([...defaults, ...fromEnv])];
}

export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  const trustedOrigins = collectTrustedOrigins();

  return betterAuth({
    appName: "Bolt Energy",
    baseURL: siteUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    trustedOrigins,
    plugins: [convex({ authConfig })],
  });
};
