---
name: workshop-status
description: Check completed and stubbed PesaBot workshop modules and recommend one next action
agent: ask
---

Perform a fast, read-only status check. Do not edit files, run terminal commands,
run tests, start the application, install dependencies, browse the web, or scan
unrelated directories.

Read only these files:

- [chat route](../../app/api/chat/route.ts): Module 02 is done only if it calls `getAIClient()`.
- [Daraja helpers](../../lib/daraja.ts) and [STK route](../../app/api/mpesa/stkpush/route.ts): Module 03 STK is done only if neither contains its not-implemented placeholder.
- [callback route](../../app/api/mpesa/callback/route.ts): callback handling is done only if it parses `stkCallback` and always acknowledges with HTTP 200.
- [chat panel](../../components/ChatPanel.tsx): report `sendMessage()` and `confirmAndSave()` separately based on their placeholders.

For configuration, check only whether `.env.local` exists and whether active
`AI_PROVIDER` and its matching API-key variable are non-empty. Never quote,
display, or summarize any secret value.

Return exactly six short lines: Module 02, configuration, STK Push, callback,
UI wiring, and one recommended next slash command. Use ✅ done, ⏳ stubbed,
or ❓ cannot tell. Do not explain your process.
