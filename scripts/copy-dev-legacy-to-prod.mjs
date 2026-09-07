#!/usr/bin/env node
/**
 * Copy Neon-imported legacy data from the Convex dev deployment to prod.
 *
 *   node scripts/copy-dev-legacy-to-prod.mjs
 */
import { spawnSync } from "node:child_process";

function parseJsonArray(stdout) {
  const start = stdout.indexOf("[");
  if (start < 0) {
    throw new Error(`Expected JSON array, got: ${stdout.slice(0, 200)}`);
  }
  return JSON.parse(stdout.slice(start));
}

function convex(args) {
  const result = spawnSync("npx", ["convex", ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    throw new Error(`${args.join(" ")} failed: ${result.stderr || result.stdout}`);
  }
  return result.stdout;
}

function dump(table) {
  return parseJsonArray(
    convex(["data", table, "--limit", "1000", "--format", "jsonArray"])
  );
}

function runProd(fn, args) {
  const stdout = convex(["run", "--prod", fn, JSON.stringify(args)]);
  const start = stdout.search(/[\[{]/);
  return JSON.parse(start >= 0 ? stdout.slice(start) : stdout.trim());
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
}

function optional(value) {
  return value === null || value === undefined || value === ""
    ? undefined
    : value;
}

const solutions = dump("solutionProducts").map((row) => ({
  slug: row.slug,
  name: row.name,
  currency: row.currency,
  isEnabled: Boolean(row.isEnabled),
  parametersJson: row.parametersJson,
}));
console.log(`Upserting ${solutions.length} solutions on prod…`);
console.log(runProd("importLegacy:importSolutions", { rows: solutions }));

const proposals = dump("proposals").map((row) => ({
  legacyId: row.legacyId,
  solutionSlug: row.solutionSlug,
  customerName: row.customerName,
  phoneNumber: row.phoneNumber,
  email: optional(row.email),
  latitude: optional(row.latitude),
  longitude: optional(row.longitude),
  isInterested: optional(row.isInterested),
  proposalDetailsJson: row.proposalDetailsJson,
  createdAt: row.createdAt,
}));
let importedProposals = 0;
for (const rows of chunk(proposals, 40)) {
  importedProposals += Number(runProd("importLegacy:importProposals", { rows }));
}
console.log(`Imported ${importedProposals} proposals`);

const contacts = dump("contacts").map((row) => ({
  legacyId: row.legacyId,
  name: row.name,
  phoneNumber: row.phoneNumber,
  email: optional(row.email),
  type: optional(row.type),
  message: optional(row.message),
  createdAt: row.createdAt,
}));
const ambassadors = dump("brandAmbassadors").map((row) => ({
  legacyId: row.legacyId,
  name: row.name,
  phoneNumber: row.phoneNumber,
  email: optional(row.email),
  createdAt: row.createdAt,
}));

let importedContacts = 0;
let importedAmbassadors = 0;
const contactChunks = chunk(contacts, 40);
const ambassadorChunks = chunk(ambassadors, 40);
const rounds = Math.max(contactChunks.length, ambassadorChunks.length, 1);
for (let i = 0; i < rounds; i += 1) {
  const result = runProd("importLegacy:importLeads", {
    contacts: contactChunks[i] ?? [],
    ambassadors: ambassadorChunks[i] ?? [],
  });
  importedContacts += result.contacts ?? 0;
  importedAmbassadors += result.ambassadors ?? 0;
}
console.log(
  `Imported ${importedContacts} contacts and ${importedAmbassadors} ambassadors`
);
