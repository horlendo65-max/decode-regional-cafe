---
name: switch-ai-provider
description: Use this skill when an attendee needs to switch which free AI provider PesaBot uses — e.g. Groq is rate-limited or blocked on the venue network mid-workshop, or a provider's default model has been deprecated. Triggers on requests like "switch to Gemini", "Groq isn't working, use another provider", "change the AI model", or "the model was decommissioned". This is a config change, not a rewrite — app/api/chat/route.ts should not need to change at all.
---

# Switch AI Provider

[#switch-ai-provider](#switch-ai-provider)

## When this is the right skill

[#when-this-is-the-right-skill](#when-this-is-the-right-skill)

If `app/api/chat/route.ts` was built with the `ai-chat-route` skill (calling `getAIClient()` from `lib/ai-provider.ts` rather than a hardcoded SDK), switching providers is a `.env.local` change — no code edit needed. Use this skill to make that change correctly and verify it, not to rewrite the route.

If the route was *not* built against `lib/ai-provider.ts` — e.g. someone hardcoded a Groq client directly — say so explicitly and offer to refactor it onto the abstraction first (effectively re-running `ai-chat-route`), since patching a hardcoded integration provider-by-provider is exactly the trap this abstraction exists to avoid.

## Steps

[#steps](#steps)

1. Confirm which provider to switch to, and that the attendee has a free API key for it (see `workshop/FREE-AI-MODELS.md` for signup links per provider if not).
2. In `.env.local`, set:
   - `AI_PROVIDER=<groq|gemini|openrouter|cerebras>`
   - the matching `*_API_KEY` for that provider
   - optionally the matching `*_MODEL` if the default in `lib/ai-provider.ts` is stale (see below)
3. Restart the dev server (`npm run dev`) — env var changes are not picked up by Next.js hot reload.
4. Re-run the same test from the `ai-chat-route` skill's Verify section to confirm the new provider works end to end.

## If the error is "model not found" / "model decommissioned" rather than a rate limit

[#if-the-error-is-model-not-found--model-decommissioned-rather-than-a-rate-limit](#if-the-error-is-model-not-found--model-decommissioned-rather-than-a-rate-limit)

This isn't a provider outage — the specific model id in `lib/ai-provider.ts`'s `defaultModel` for that provider has been retired. Free-tier model catalogs change often (Groq deprecated `llama-3.3-70b-versatile` in June 2026, for example). Don't edit `lib/ai-provider.ts` live in a workshop to "fix" this — instead:

1. Check the provider's current model list (Groq: console.groq.com/docs/models; Gemini: ai.google.dev/gemini-api/docs/models; OpenRouter: openrouter.ai/models?max_price=0; Cerebras: inference-docs.cerebras.ai)
2. Set the matching override env var (`GROQ_MODEL`, `GEMINI_MODEL`, `OPENROUTER_MODEL`, or `CEREBRAS_MODEL`) in `.env.local` to a current model id
3. Restart and retest

This is exactly why `lib/ai-provider.ts` reads model names from env vars with hardcoded fallbacks, rather than hardcoding them only in one place — a stale default shouldn't require a code change to fix mid-session.

## Don't do this

[#dont-do-this](#dont-do-this)

- Don't add `if (provider === "x")` branches to `app/api/chat/route.ts` — provider differences belong in `lib/ai-provider.ts` only
- Don't remove the other providers' config blocks from `.env.example` to "simplify" — other attendees on the same repo may be using a different one
- Don't assume `response_format: { type: "json_object" }` behaves identically across all four providers without testing — if one provider is returning malformed JSON that others don't, that's provider-specific behavior worth flagging, not silently working around with extra parsing logic that masks it
