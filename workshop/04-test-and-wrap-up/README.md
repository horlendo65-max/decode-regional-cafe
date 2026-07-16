# 04 — Test, Deploy, Wrap-Up
### 1:10 – 1:30 (20 min)

[#04-test-deploy-wrap-up](#04-test-deploy-wrap-up)

## End-to-end test (10 min)

[#end-to-end-test-10-min](#end-to-end-test-10-min)

On your live `*.vercel.app` URL:

1. Type a savings goal into the chat
2. Confirm the AI's decision card looks sensible (amount, date, reasoning)
3. Tap **Confirm & Save**, enter the sandbox test number `254708374149`
4. Check the Vercel function logs (**Vercel dashboard → your project → Logs**) for the callback hitting `/api/mpesa/callback` with `ResultCode: 0`

If you get this far, you have a genuine idea-to-MVP loop: natural language in, a real payment rail triggered out, running on a public URL — in under 90 minutes, and it works no matter which free AI provider you picked in prep.

## Adapting the same skeleton to Health or Agri (5 min)

[#adapting-the-same-skeleton-to-health-or-agri-5-min](#adapting-the-same-skeleton-to-health-or-agri-5-min)

The chat → structured decision → action pattern doesn't change — only the system prompt, the JSON shape, and what the "confirm" button does:

| Track | System prompt turns free text into... | Confirm button calls... |
|---|---|---|
| **Fintech** (built today) | a savings plan | Daraja STK Push |
| **Health** | a triage suggestion + suggested clinic slot | a booking API, or a `mailto:`/SMS fallback if no booking API is available |
| **Agri** | a crop input recommendation (fertilizer, timing, quantity) | an SMS to the nearest agrovet, or an order via a supplier API |

The `app/api/chat/route.ts` pattern from Module 02 — `getAIClient()` + system prompt + `response_format: json_object` + a fixed schema — is the reusable part, and it stays provider-agnostic no matter which track you build. Swapping tracks is mostly a matter of rewriting `SYSTEM_PROMPT` and the TypeScript type in `lib/types.ts`.

## What's deliberately left out of this MVP

[#whats-deliberately-left-out-of-this-mvp](#whats-deliberately-left-out-of-this-mvp)

Be upfront with attendees about what a 90-minute MVP is not:

- No database — the callback only logs to console; persisting to a real store (Postgres, Supabase, Firestore) is the natural next step
- No auth — anyone with the URL can trigger a payment prompt to any phone number; needs rate-limiting and phone verification before it's real
- No retry/reconciliation — production Daraja integrations should poll Transaction Status as a fallback when callbacks are missed
- Sandbox only — going live needs a real Paybill/Till and Safaricom's Go-Live process, which is a separate, slower track (see the Daraja docs)

## Resources to send after the workshop

[#resources-to-send-after-the-workshop](#resources-to-send-after-the-workshop)

- Daraja API docs: [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
- This repo, so attendees can keep building on their fork
- [../FREE-AI-MODELS.md](../FREE-AI-MODELS.md) for when they outgrow a single free tier or want to compare providers
