// Helpers for talking to the Safaricom Daraja sandbox API.
// Implemented live in Module 03 — see workshop/03-daraja-integration/README.md
// or run the `/daraja-stk-push` prompt in GitHub Copilot to scaffold it.

export const DARAJA_BASE_URL = "https://sandbox.safaricom.co.ke";

/**
 * Returns a fresh OAuth bearer token for Daraja requests.
 * Tokens are valid for ~1 hour — call this before every request rather
 * than caching long-term.
 */
export async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`,
  ).toString("base64");

  const res = await fetch(
    `${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } },
  );

  if (!res.ok) throw new Error("Failed to get Daraja access token");
  const data = await res.json();
  return data.access_token;
}

/**
 * Builds the YYYYMMDDHHmmss timestamp Daraja expects.
 */
export function darajaTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
}

export function darajaPassword(
  shortcode: string,
  passkey: string,
  timestamp: string,
): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
}
