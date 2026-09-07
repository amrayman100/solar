/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as auth from "../auth.js";
import type * as catalogue from "../catalogue.js";
import type * as catalogueData from "../catalogueData.js";
import type * as commandSearch from "../commandSearch.js";
import type * as dashboard from "../dashboard.js";
import type * as email from "../email.js";
import type * as http from "../http.js";
import type * as importLegacy from "../importLegacy.js";
import type * as leads from "../leads.js";
import type * as lib_auth from "../lib/auth.js";
import type * as lib_parametersJson from "../lib/parametersJson.js";
import type * as lib_validators from "../lib/validators.js";
import type * as orders from "../orders.js";
import type * as profiles from "../profiles.js";
import type * as proposals from "../proposals.js";
import type * as reports from "../reports.js";
import type * as seed from "../seed.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  catalogue: typeof catalogue;
  catalogueData: typeof catalogueData;
  commandSearch: typeof commandSearch;
  dashboard: typeof dashboard;
  email: typeof email;
  http: typeof http;
  importLegacy: typeof importLegacy;
  leads: typeof leads;
  "lib/auth": typeof lib_auth;
  "lib/parametersJson": typeof lib_parametersJson;
  "lib/validators": typeof lib_validators;
  orders: typeof orders;
  profiles: typeof profiles;
  proposals: typeof proposals;
  reports: typeof reports;
  seed: typeof seed;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {
  betterAuth: import("@convex-dev/better-auth/_generated/component.js").ComponentApi<"betterAuth">;
};
