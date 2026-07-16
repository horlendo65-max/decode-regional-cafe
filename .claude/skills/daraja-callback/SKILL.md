---
name: daraja-callback
description: Use this skill when implementing app/api/mpesa/callback/route.ts — the endpoint Safaricom calls after a customer completes or cancels an STK Push. Triggers on requests like "handle the M-Pesa callback", "implement the Daraja callback route", "parse the STK callback body", or any task about receiving the async result of a payment in this repo.
---

# Daraja Callback Handler (PesaBot Module 03, part 2)

[#daraja-callback-handler-pesabot-module-03-part-2](#daraja-callback-handler-pesabot-module-03-part-2)

## What this skill builds

[#what-this-skill-builds](#what-this-skill-builds)

`app/api/mpesa/callback/route.ts` — the route Safaricom POSTs to (asynchronously, seconds after the STK Push request) once the customer enters their PIN or cancels.

## The one rule that matters most

[#the-one-rule-that-matters-most](#the-one-rule-that-matters-most)

**Always return HTTP 200**, even when the payment failed or the body is malformed. If your route returns anything else, Safaricom retries the callback repeatedly and eventually gives up silently — which looks like "callbacks just stopped working" days later, and is confusing to debug. Put the response inside a try/catch that still returns 200 on the catch path.

## Implementation

[#implementation](#implementation)

```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = body?.Body?.stkCallback;

    if (result?.ResultCode === 0) {
      const items = result.CallbackMetadata?.Item ?? [];
      const amount = items.find((i: any) => i.Name === "Amount")?.Value;
      const receipt = items.find(
        (i: any) => i.Name === "MpesaReceiptNumber"
      )?.Value;
      console.log(`Payment received: KES ${amount}, receipt ${receipt}`);
      // MVP: log it. Next iteration: look up the order by
      // result.CheckoutRequestID and mark it paid in a real database.
    } else {
      console.log(`Payment not completed: ${result?.ResultDesc}`);
    }
  } catch (err) {
    console.error("Failed to parse Daraja callback:", err);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
```

## Verify

[#verify](#verify)

This route can't be tested meaningfully on `localhost` — Safaricom needs a real public HTTPS URL to call back to. Verify it by:

1. Deploying (`git push`, Vercel auto-deploys)
2. Confirming `NEXT_PUBLIC_APP_URL` in Vercel's environment variables matches the deployed URL exactly (no trailing slash)
3. Triggering an STK Push from the deployed app and checking **Vercel dashboard → your project → Logs** for the `console.log` output after entering a PIN in sandbox

If nothing shows up in the logs after a minute, the most common cause is `CallBackURL` in the STK Push payload not matching a reachable route — double check it's using `NEXT_PUBLIC_APP_URL`, not `localhost`, and that the deployment actually redeployed after the env var was set.
