---
description: Check completed and stubbed PesaBot workshop modules and recommend one next action
---

Check the current repository state without changing files.

1. Inspect `app/api/chat/route.ts`. Report whether Module 02 is stubbed or calls `getAIClient()` from `lib/ai-provider.ts`.
2. Check whether `.env.local` exists and whether `AI_PROVIDER` plus its matching API key are configured. Never reveal a key or print the file.
3. Inspect `lib/daraja.ts` and `app/api/mpesa/stkpush/route.ts`. Report whether Module 03 part 1 is stubbed or implemented.
4. Inspect `app/api/mpesa/callback/route.ts`. Report whether Module 03 part 2 parses `stkCallback` and always acknowledges the callback.
5. Inspect `components/ChatPanel.tsx`. Report whether `sendMessage()` and `confirmAndSave()` remain stubbed.

Return at most nine lines: a short checklist using ✅ done, ⏳ stubbed, or ❓ cannot tell, followed by exactly one recommended next prompt or skill name.

