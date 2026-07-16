---
name: daraja-callback
description: Complete the safe Daraja callback portion of Module 03
agent: agent
tools: [read, edit, search, execute]
---

Implement Module 03 part 2 now; do not merely explain or return a code sample.

Follow [the Daraja callback skill](../skills/daraja-callback/SKILL.md), then:

1. Replace the placeholder in `app/api/mpesa/callback/route.ts`.
2. Safely parse `Body.stkCallback`, distinguish success from cancellation or
   failure, and extract useful callback metadata without assuming item order.
3. Never log credentials or the complete incoming body.
4. Return Daraja's HTTP 200 acknowledgement on success, payment failure, and
   malformed input.
5. Do not add a database or modify the STK Push implementation.
6. Run `npm run build`, then use a local `curl` request with synthetic callback
   JSON if a development server is already running. Do not start a persistent
   server solely for this check.

Finish with the edited file, a safe synthetic callback test command, and the
next slash command, `/module-04-test`.
