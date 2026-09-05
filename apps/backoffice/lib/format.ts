export function formatMoney(amount: number): string {
  return `EGP ${amount.toLocaleString("en-EG")}`;
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString("en-EG");
}

export function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function prettyJson(raw: string): string {
  try {
    return JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    return raw;
  }
}
