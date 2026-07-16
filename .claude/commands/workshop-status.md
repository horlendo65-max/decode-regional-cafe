---
description: Check which PesaBot workshop modules are implemented vs. still stubbed, and what to do next
---

Check the current state of this repo against the workshop modules and report back concisely:

1. Read `app/api/chat/route.ts` — is it still returning the `needsClarification` placeholder from the stub, or has it been implemented? If implemented, confirm it calls `getAIClient()` from `lib/ai-provider.ts` rather than a hardcoded provider SDK. This is Module 02.
2. Check `.env.local` for `AI_PROVIDER` and the matching `*_API_KEY` — report which provider is configured (don't print the key itself).
3. Read `lib/daraja.ts` and `app/api/mpesa/stkpush/route.ts` — do `getAccessToken()` and `darajaTimestamp()` still throw "not implemented", or has the STK push flow been built? This is Module 03 (part 1).
4. Read `app/api/mpesa/callback/route.ts` — does it do more than log the raw body, i.e. has the `stkCallback` parsing been added? This is Module 03 (part 2).
5. Check `components/ChatPanel.tsx` — do `sendMessage()` and `confirmAndSave()` still throw "not implemented", or have they been wired to fetch calls?
6. Check whether `.env.local` exists at all (don't print its contents) — if it's missing, flag that Module 00 prep likely wasn't completed.

Report status as a short checklist (✅ done / ⏳ stubbed / ❓ can't tell), then state the single next action to take, referencing the matching skill by name (`ai-chat-route`, `daraja-stk-push`, `daraja-callback`, or `switch-ai-provider` if the issue is a rate limit or deprecated model rather than missing code) so the user can invoke it directly. Keep the whole report under 10 lines — this is meant to be a fast progress check during a live session, not a full audit.
