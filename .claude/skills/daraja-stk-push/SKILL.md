---
name: daraja-stk-push
description: Use this skill when implementing lib/daraja.ts, app/api/mpesa/stkpush/route.ts, or wiring the confirmAndSave() function in components/ChatPanel.tsx. Triggers on requests like "implement the STK push", "wire up M-Pesa", "connect Daraja", "get an OAuth token from Safaricom", or any task involving triggering an M-Pesa payment prompt in this repo. For diagnosing an error from an already-implemented STK push call, use the daraja-debugger agent instead. Works the same in any editor or online IDE — file edits only, no environment-specific steps.
---

# Daraja STK Push (PesaBot Module 03, part 1)

[#daraja-stk-push-pesabot-module-03-part-1](#daraja-stk-push-pesabot-module-03-part-1)

## What this skill builds

[#what-this-skill-builds](#what-this-skill-builds)

Three things, in order — each depends on the previous one:

1. `getAccessToken()` and `darajaTimestamp()` in `lib/daraja.ts`
2. `app/api/mpesa/stkpush/route.ts` — builds the STK Push payload and sends it
3. The `confirmAndSave()` function stub in `components/ChatPanel.tsx`

## Before you start

[#before-you-start](#before-you-start)

Confirm these exist in `.env.local` (get them from developer.safaricom.co.ke, sandbox app — see `workshop/00-prep/README.md`):

- `MPESA_CONSUMER_KEY`
- `MPESA_CONSUMER_SECRET`
- `MPESA_SHORTCODE` (sandbox default: `174379`)
- `MPESA_PASSKEY`
- `NEXT_PUBLIC_APP_URL` — must be a real public HTTPS URL for the callback to work once deployed; `http://localhost:3000` is fine for building the request itself but the callback will only ever be reachable once this points at a deployed URL

If any are missing, stop and tell the user rather than hardcoding a placeholder — a wrong Consumer Key/Secret pair produces a confusing `Invalid Access Token` error, not a clear "missing config" error.

## Implementation

[#implementation](#implementation)

### `lib/daraja.ts`

```typescript
export const DARAJA_BASE_URL = "https://sandbox.safaricom.co.ke";

export async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  if (!res.ok) throw new Error("Failed to get Daraja access token");
  const data = await res.json();
  return data.access_token;
}

export function darajaTimestamp(): string {
  return new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
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
```

### `app/api/mpesa/stkpush/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, darajaTimestamp, darajaPassword, DARAJA_BASE_URL } from "@/lib/daraja";

export async function POST(req: NextRequest) {
  const { phone, amountKes, goalSummary } = await req.json();

  const token = await getAccessToken();
  const timestamp = darajaTimestamp();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const password = darajaPassword(shortcode, process.env.MPESA_PASSKEY!, timestamp);

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.max(1, Math.round(amountKes)),
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
    AccountReference: "PesaBot",
    TransactionDesc: (goalSummary ?? "Savings").slice(0, 20),
  };

  const res = await fetch(`${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
```

### `confirmAndSave()` in `components/ChatPanel.tsx`

```typescript
async function confirmAndSave(
  decision: SavingsDecision,
  phone: string
): Promise<void> {
  const res = await fetch("/api/mpesa/stkpush", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone,
      amountKes: decision.suggestedDailyKes,
      goalSummary: decision.goalSummary,
    }),
  });
  const data = await res.json();
  if (data.ResponseCode !== "0") {
    throw new Error(data.errorMessage ?? data.ResponseDescription ?? "STK push failed");
  }
}
```

## Verify

[#verify](#verify)

1. Restart the dev server after editing `.env.local`
2. Send a goal in the chat, get a decision card, click Confirm & Save with phone `254708374149` (the shared sandbox test number)
3. Check the terminal running `npm run dev` — you should see the raw Daraja JSON response with a `CheckoutRequestID`, not an error
4. Real phones will not receive a prompt in sandbox — only `254708374149` does. This is expected, not a bug.

## Hand off to the debugger agent

[#hand-off-to-the-debugger-agent](#hand-off-to-the-debugger-agent)

If the implementation looks correct but requests are still failing (401s, `Invalid Access Token`, malformed responses), stop guessing and suggest the user invoke the `daraja-debugger` agent with the actual error message and response body.
