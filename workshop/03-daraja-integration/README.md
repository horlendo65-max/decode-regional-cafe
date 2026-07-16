# 03 — Daraja (M-Pesa) Integration
### 0:45 – 1:10 (25 min)

[#03-daraja-mpesa-integration](#03-daraja-mpesa-integration)

Goal: when the user taps **Confirm & Save** on the AI's decision card, trigger a real M-Pesa STK Push (sandbox) for the suggested daily amount.

Three pieces: get an OAuth token, send the STK Push request, handle the callback Safaricom sends back. This part is the same regardless of which AI provider you're using — Daraja doesn't care how the decision was generated.

## 1. Get an OAuth access token

[#1-get-an-oauth-access-token](#1-get-an-oauth-access-token)

Every Daraja request needs a fresh bearer token (valid ~1 hour). Add a small helper:

`lib/daraja.ts`:

```typescript
const BASE_URL = "https://sandbox.safaricom.co.ke";

export async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${auth}` } }
  );

  if (!res.ok) throw new Error("Failed to get Daraja access token");
  const data = await res.json();
  return data.access_token;
}
```

## 2. Build the STK Push route

[#2-build-the-stk-push-route](#2-build-the-stk-push-route)

`app/api/mpesa/stkpush/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/lib/daraja";

const BASE_URL = "https://sandbox.safaricom.co.ke";

function darajaTimestamp(): string {
  return new Date()
    .toISOString()
    .replace(/[^0-9]/g, "")
    .slice(0, 14);
}

export async function POST(req: NextRequest) {
  const { phone, amountKes, goalSummary } = await req.json();

  const token = await getAccessToken();
  const timestamp = darajaTimestamp();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const password = Buffer.from(
    `${shortcode}${process.env.MPESA_PASSKEY}${timestamp}`
  ).toString("base64");

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.max(1, Math.round(amountKes)), // sandbox accepts whole numbers
    PartyA: phone, // format: 2547XXXXXXXX
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
    AccountReference: "PesaBot",
    TransactionDesc: goalSummary?.slice(0, 20) ?? "Savings",
  };

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
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

Note `NEXT_PUBLIC_APP_URL` — this must already be set in Vercel from Module 01, pointing at your real deployed URL. It has to be HTTPS for the callback to work.

## 3. Handle the callback

[#3-handle-the-callback](#3-handle-the-callback)

Safaricom calls this route asynchronously once the user enters (or cancels) their PIN. **Always return HTTP 200**, even on failure — Safaricom retries aggressively otherwise.

`app/api/mpesa/callback/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = body?.Body?.stkCallback;

  if (result?.ResultCode === 0) {
    const items = result.CallbackMetadata?.Item ?? [];
    const amount = items.find((i: any) => i.Name === "Amount")?.Value;
    const receipt = items.find((i: any) => i.Name === "MpesaReceiptNumber")?.Value;
    console.log(`Payment received: KES ${amount}, receipt ${receipt}`);
    // MVP: log it. Next iteration: write to a database keyed by CheckoutRequestID.
  } else {
    console.log(`Payment not completed: ${result?.ResultDesc}`);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
```

## 4. Wire the Confirm & Save button

[#4-wire-the-confirm--save-button](#4-wire-the-confirm--save-button)

```typescript
async function confirmAndSave(decision: Decision, phone: string) {
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
  if (data.ResponseCode === "0") {
    showToast("Check your phone for the M-Pesa prompt");
  } else {
    showToast("Something went wrong — try again");
  }
}
```

## Redeploy and test

[#redeploy-and-test](#redeploy-and-test)

```
git add .
git commit -m "add daraja stk push"
git push
```

Vercel redeploys automatically. On the live URL, use the **sandbox test number `254708374149`** with any 4-digit PIN when prompted.

## Common issues

[#common-issues](#common-issues)

| Symptom | Likely cause |
|---|---|
| `Invalid Access Token` | Token expired (1hr) or wrong Consumer Key/Secret pair — regenerate |
| No callback ever arrives | `CallBackURL` isn't publicly reachable HTTPS — confirm you're testing the deployed URL, not localhost |
| `Bad Request - Invalid PhoneNumber` | Phone must be `2547XXXXXXXX`, no `+`, no leading `0` |
| STK prompt never reaches a real phone in sandbox | Expected — sandbox only prompts the shared test number `254708374149` |
| Callback route errors out | Make sure it still returns HTTP 200 even inside a catch block, or Safaricom will retry and eventually give up silently |

Stuck on something not in this table? Ask the `daraja-debugger` subagent in Claude Code with your exact error message.
