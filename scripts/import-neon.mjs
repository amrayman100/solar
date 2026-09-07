#!/usr/bin/env node
/**
 * One-shot Neon → Convex import. Does not print or commit credentials.
 *
 *   NEON_DATABASE_URL=postgresql://... npm run import:neon
 *   CONVEX_PROD=1 NEON_DATABASE_URL=postgresql://... npm run import:neon
 *
 * Requires `npx convex` logged in to the solar deployment.
 */
import { spawnSync } from "node:child_process";
import pg from "pg";

const url = process.env.NEON_DATABASE_URL;
if (!url) {
  console.error("Set NEON_DATABASE_URL to the live Neon connection string.");
  process.exit(1);
}

const PRODUCT_SLUGS = {
  "grid-tied": "grid-tied",
  "off-grid": "off-grid",
  "solar-irrigation": "solar-irrigation",
  "solar-heating": "solar-heating",
  ev: "ev",
  construction: "construction",
  "whole-sale": "whole-sale",
};

function toMillis(value) {
  if (!value) return Date.now();
  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? Date.now() : parsed;
}

function optionalNumber(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

const convexRunArgs = process.env.CONVEX_PROD === "1" ? ["--prod"] : [];

function runConvex(fn, args) {
  const result = spawnSync(
    "npx",
    ["convex", "run", ...convexRunArgs, fn, JSON.stringify(args)],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  );
  if (result.status !== 0) {
    throw new Error(`${fn} failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout.trim();
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();

const products = (await client.query("select id, name, currency, is_enabled, parameters from products")).rows;
const proposals = (await client.query("select * from product_proposals")).rows;
const contacts = (await client.query("select * from contact")).rows;
const ambassadors = (await client.query("select * from brand_ambassador")).rows;
await client.end();

const productById = new Map(products.map((row) => [row.id, row]));

const solutionRows = products
  .filter((row) => PRODUCT_SLUGS[row.name])
  .map((row) => ({
    slug: PRODUCT_SLUGS[row.name],
    name: row.name,
    currency: row.currency || "EGP",
    isEnabled: Boolean(row.is_enabled),
    parametersJson: (() => {
      const raw = row.parameters ?? {};
      // pg may already return a string for json columns; never double-encode.
      if (typeof raw === "string") {
        try {
          JSON.parse(raw);
          return raw;
        } catch {
          return JSON.stringify({});
        }
      }
      return JSON.stringify(raw);
    })(),
  }));

console.log(`Importing ${solutionRows.length} solutions…`);
console.log(runConvex("importLegacy:importSolutions", { rows: solutionRows }));

const proposalRows = proposals.map((row) => {
  const product = productById.get(row.product_id);
  return {
    legacyId: row.id,
    solutionSlug: product ? PRODUCT_SLUGS[product.name] ?? product.name : "unknown",
    customerName: row.name || "Unknown",
    phoneNumber: row.phone_number || "",
    email: row.email_address || undefined,
    latitude: optionalNumber(row.address_latitude),
    longitude: optionalNumber(row.address_longitude),
    isInterested: row.is_interested ?? undefined,
    proposalDetailsJson: JSON.stringify(row.proposal_details ?? {}),
    createdAt: toMillis(row.created_at),
  };
});

let importedProposals = 0;
for (const rows of chunk(proposalRows, 40)) {
  importedProposals += Number(runConvex("importLegacy:importProposals", { rows }));
}
console.log(`Imported ${importedProposals} proposals`);

const contactRows = contacts.map((row) => ({
  legacyId: row.id,
  name: row.name || "Unknown",
  phoneNumber: row.phone_number || "",
  email: row.email_address || undefined,
  type: row.type || undefined,
  message: row.conatct_desc || undefined,
  createdAt: toMillis(row.created_at),
}));
const ambassadorRows = ambassadors.map((row) => ({
  legacyId: row.id,
  name: row.name || "Unknown",
  phoneNumber: row.phone_number || "",
  email: row.email_address || undefined,
  createdAt: toMillis(row.created_at),
}));

let importedContacts = 0;
let importedAmbassadors = 0;
const contactChunks = chunk(contactRows, 40);
const ambassadorChunks = chunk(ambassadorRows, 40);
const leadRounds = Math.max(contactChunks.length, ambassadorChunks.length, 1);
for (let i = 0; i < leadRounds; i += 1) {
  const result = JSON.parse(
    runConvex("importLegacy:importLeads", {
      contacts: contactChunks[i] ?? [],
      ambassadors: ambassadorChunks[i] ?? [],
    })
  );
  importedContacts += result.contacts ?? 0;
  importedAmbassadors += result.ambassadors ?? 0;
}
console.log(`Imported ${importedContacts} contacts and ${importedAmbassadors} ambassadors`);
