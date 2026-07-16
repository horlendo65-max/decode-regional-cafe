---
name: module-04-test
description: Verify the completed PesaBot locally and guide the final deployed Gemini and Daraja sandbox test
agent: agent
tools: [read, edit, search, execute]
---

Complete Module 04 verification now. Follow
[the test guide](../../workshop/04-test-and-wrap-up/README.md).

1. Inspect Modules 02 and 03 for remaining placeholders. If one remains, stop
   and recommend the exact implementation slash command.
2. Run `npm run build`. Fix only genuine build errors caused by completed
   workshop modules; do not add unrelated features.
3. Check that the configured Gemini and Daraja variables are present without
   displaying their values.
4. Check that `NEXT_PUBLIC_APP_URL` is public HTTPS rather than localhost
   before recommending a callback test.
5. Provide the exact local chat test, clarification test, synthetic callback
   test, and deployed end-to-end sequence.
6. Never trigger an STK Push automatically. Ask the attendee to initiate it
   from the deployed interface using the documented sandbox number, then have
   them confirm the result in Vercel logs.

Finish with a compact pass/fail checklist and clearly separate anything that
still requires a person, browser login, or M-Pesa sandbox interaction.

