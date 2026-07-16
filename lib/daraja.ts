// Helpers for talking to the Safaricom Daraja sandbox API.
// Implemented live in Module 03 — see workshop/03-daraja-integration/README.md
// or run the `/daraja-stk-push` prompt in GitHub Copilot to scaffold it.

export const DARAJA_BASE_URL = "https://sandbox.safaricom.co.ke";

/**
 * Returns a fresh OAuth bearer token for Daraja requests.
 * Tokens are valid for ~1 hour — call this before every request rather
 * than caching long-term.
 *
 * TODO (Module 03): implement using MPESA_CONSUMER_KEY / MPESA_CONSUMER_SECRET
 */
export async function getAccessToken(): Promise<string> {
  throw new Error("getAccessToken() not implemented yet — see Module 03");
}

/**
 * Builds the YYYYMMDDHHmmss timestamp Daraja expects.
 *
 * TODO (Module 03): implement
 */
export function darajaTimestamp(): string {
  throw new Error("darajaTimestamp() not implemented yet — see Module 03");
}

export function darajaPassword(
  shortcode: string,
  passkey: string,
  timestamp: string
): string {
  return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  );
}
