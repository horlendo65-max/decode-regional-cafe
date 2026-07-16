---
name: integrate-daraja-sandbox
description: Add an optional M-PESA Daraja Sandbox STK Push capability to the Express API while keeping credentials server-side and the payment flow separate from AI advice.
---

# Integrate Daraja Sandbox

## Scope
Workshop sandbox only. Do not present it as a production payment implementation.

## Procedure
1. Reuse `daraja-stk-push.skill.ts`.
2. Read consumer key, consumer secret, shortcode, passkey, and callback URL from server environment variables.
3. Validate and normalize the Kenyan phone number.
4. Obtain an OAuth access token server-side.
5. Initiate STK Push through a dedicated API endpoint.
6. Return checkout identifiers, not credentials.
7. Keep the user action explicit: AI advice must never trigger payment automatically.
8. Handle sandbox and callback failures safely.
9. Document the required environment variables.

## Safety boundary
The recommendation workflow may suggest an amount, but only a separate user-confirmed action may initiate STK Push.
