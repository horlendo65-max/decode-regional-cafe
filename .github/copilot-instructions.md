# PesaBot workshop instructions

- This repository is a 90-minute workshop starter. Make the smallest change that completes the current module; do not implement later modules unless asked.
- Before editing, read the relevant files and the matching skill in `.github/skills/`.
- Keep the AI route provider-agnostic. Use `getAIClient()` from `lib/ai-provider.ts`; never hardcode Groq, Gemini, OpenRouter, or Cerebras in a route.
- Never print, commit, or copy secrets from `.env.local`. You may report whether a required variable is present.
- Treat model output as untrusted input before it reaches M-Pesa. Preserve the types in `lib/types.ts` and validate payment amounts.
- Daraja work uses the sandbox. A callback must use a public HTTPS URL and must return HTTP 200 even when payment fails.
- Preserve workshop stubs outside the requested module so attendees can complete the remaining steps themselves.
- After code changes, run the narrowest useful check, then summarize changed files and any manual verification still needed.
