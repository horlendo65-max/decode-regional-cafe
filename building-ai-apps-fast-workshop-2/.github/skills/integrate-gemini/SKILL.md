---
name: integrate-gemini
description: Connect server-side application logic to the Google Gemini API using the repository provider abstraction, environment variables, safe prompting, and structured error handling.
---

# Integrate Gemini

## Constraints
- Call Gemini only from the Express API.
- Read `GEMINI_API_KEY` from environment variables.
- Keep model configuration centralized in `providers/gemini.provider.ts`.
- Never expose the key through `NEXT_PUBLIC_*` variables.
- Keep prompts grounded in structured data produced by skills.

## Procedure
1. Reuse the existing provider before adding dependencies.
2. Add a concise system/domain instruction.
3. Delimit user-provided content clearly.
4. Request a predictable response format.
5. Add timeout/error handling and a user-safe error message.
6. Do not claim certainty for financial, medical, or agricultural decisions.
7. Run `npm run build` in the API.
