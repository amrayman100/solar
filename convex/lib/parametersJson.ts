/**
 * Normalize calculator parametersJson (guards against double-encoded Neon imports).
 */

export function parseParametersJson<T = unknown>(raw: string): T {
  let value: unknown = raw;

  for (let i = 0; i < 5; i++) {
    if (typeof value !== "string") break;
    const trimmed = value.trim();
    if (
      !trimmed.startsWith("{") &&
      !trimmed.startsWith("[") &&
      !trimmed.startsWith('"')
    ) {
      break;
    }
    value = JSON.parse(value);
  }

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.keys(value).length === 1 &&
    "parameters" in value &&
    typeof (value as { parameters: unknown }).parameters === "object" &&
    (value as { parameters: unknown }).parameters !== null
  ) {
    value = (value as { parameters: unknown }).parameters;
  }

  if (value === null || typeof value !== "object") {
    throw new Error("Calculator parameters JSON is invalid");
  }

  return value as T;
}

function replaceInvalidNumbers(value: unknown): unknown {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }
  if (Array.isArray(value)) {
    return value.map(replaceInvalidNumbers);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
        key,
        replaceInvalidNumbers(entry),
      ])
    );
  }
  return value;
}

export function stringifyParametersJson(value: unknown): string {
  let normalized: unknown = value;

  for (let i = 0; i < 5; i++) {
    if (typeof normalized !== "string") break;
    normalized = JSON.parse(normalized);
  }

  if (
    normalized &&
    typeof normalized === "object" &&
    !Array.isArray(normalized) &&
    Object.keys(normalized).length === 1 &&
    "parameters" in normalized &&
    typeof (normalized as { parameters: unknown }).parameters === "object" &&
    (normalized as { parameters: unknown }).parameters !== null
  ) {
    normalized = (normalized as { parameters: unknown }).parameters;
  }

  if (normalized === null || typeof normalized !== "object") {
    throw new Error("Calculator parameters must be an object");
  }

  return JSON.stringify(replaceInvalidNumbers(normalized));
}
