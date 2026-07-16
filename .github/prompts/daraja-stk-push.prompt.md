---
name: daraja-stk-push
description: Complete the OAuth, STK Push, and Confirm & Save portion of Module 03
agent: agent
tools: [read, edit, search, execute]
---

Implement Module 03 part 1 now; do not merely explain or return code samples.

Follow [the Daraja STK Push skill](../skills/daraja-stk-push/SKILL.md). Read
the relevant types, Daraja helper, STK route, and chat panel, then:

1. If any required Daraja variable is missing, stop before external API calls
   and list only the missing variable names. Never display or request secret
   values in Copilot Chat.
2. Implement `getAccessToken()` and the timestamp/password helpers in
   `lib/daraja.ts`.
3. Implement `app/api/mpesa/stkpush/route.ts` with input validation, the
   sandbox endpoint, a whole-number amount of at least KES 1, and the public
   callback URL.
4. Replace only `confirmAndSave()` in `components/ChatPanel.tsx`.
5. Preserve the callback route for `/daraja-callback`.
6. Run `npm run build`. Do not start a persistent server or send a real STK
   request automatically.

Finish with the files edited, the sandbox phone number to use manually, and
the next slash command, `/daraja-callback`.
