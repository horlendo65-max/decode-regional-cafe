# Free AI Model Options for This Workshop

[#free-ai-model-options-for-this-workshop](#free-ai-model-options-for-this-workshop)

Free LLM tiers change often — treat these as a starting point and re-check quotas and model availability the week of the workshop, not the numbers themselves. As of mid-2026, here's the practical landscape.

## Design choice: the app doesn't pick a provider for you

[#design-choice-the-app-doesnt-pick-a-provider-for-you](#design-choice-the-app-doesnt-pick-a-provider-for-you)

`lib/ai-provider.ts` supports all four providers below through one interface, switched by an `AI_PROVIDER` env var. This exists because a room of 20-40 people won't all have the same provider working on the same network at the same time — someone's Groq key will be rate-limited, someone's campus Wi-Fi will block Gemini, and that shouldn't derail their build. Pick one during prep; switch anytime with a `.env.local` change (or the `switch-ai-provider` Claude Code skill) if it stops working.

## A recent example of why this matters

[#a-recent-example-of-why-this-matters](#a-recent-example-of-why-this-matters)

In June 2026, Groq deprecated `llama-3.3-70b-versatile` (the model most Groq tutorials from 2025 reference) in favor of `openai/gpt-oss-120b`. `lib/ai-provider.ts` already points at the new model, but this is exactly the kind of thing that goes stale between when a workshop guide is written and when it's run — always worth a quick check of each provider's current model list before the session, not just trusting the defaults baked into this repo.

## The four options

[#the-four-options](#the-four-options)

### Groq (recommended default)

**Why:** runs on custom LPU hardware, so responses come back fast enough that a room full of people typing into a chat UI doesn't sit waiting. OpenAI-SDK compatible. No credit card required.

- Sign up: [console.groq.com](https://console.groq.com)
- Current recommended model: `openai/gpt-oss-120b` (see [console.groq.com/docs/models](https://console.groq.com/docs/models) for the live list — Groq deprecates models with a few weeks' notice, so check before the session)
- Rough free-tier shape: ~30 requests/minute, model-dependent daily token caps — comfortably enough for a workshop of 20-40 people each sending a handful of chat messages, worth a dry run beforehand if your group is larger

### Google Gemini (AI Studio)

**Why:** best-documented alternative if Groq is blocked on the venue's network, and a very large context window if you want to feed it more background than a single chat message. Gemini exposes an OpenAI-compatible endpoint directly, so it slots into `lib/ai-provider.ts` the same way as the others.

- Sign up: [aistudio.google.com](https://aistudio.google.com)
- OpenAI-compatible base URL: `https://generativelanguage.googleapis.com/v1beta/openai/`
- Current recommended model: `gemini-2.5-flash` (check [ai.google.dev/gemini-api/docs/models](https://ai.google.dev/gemini-api/docs/models) for newer options — Gemini 3.x models were rolling out through 2026)
- No card required for the free tier, though Google may use free-tier prompts to improve its models (opt-outs are region-dependent) — worth mentioning if attendees plan to test with real personal data

### OpenRouter

**Why:** proxies to dozens of providers (including free-tier Llama, Qwen, and Gemini variants) behind a single OpenAI-compatible key — useful if attendees want to experiment with swapping models after the workshop without juggling multiple accounts.

- Sign up: [openrouter.ai](https://openrouter.ai)
- Base URL: `https://openrouter.ai/api/v1`
- Free models are tagged `:free` in the model id and change often — check [openrouter.ai/models?max_price=0](https://openrouter.ai/models?max_price=0) for the current list rather than trusting any specific id long-term
- Free-model rate limits are tighter per-model than going direct to Groq, so it's a better "explore afterwards" option than a live-demo backbone

### Cerebras

**Why:** very fast inference, good for batch or non-interactive use; smaller free model catalog than the others.

- Sign up: [cloud.cerebras.ai](https://cloud.cerebras.ai)
- Base URL: `https://api.cerebras.ai/v1`
- Check [inference-docs.cerebras.ai](https://inference-docs.cerebras.ai) for the current free model list

## Quick decision guide

[#quick-decision-guide](#quick-decision-guide)

| Need | Use |
|---|---|
| Fast responses in a live room | Groq |
| Backup if Groq is blocked/rate-limited | Gemini |
| Attendees want to try many models after the workshop | OpenRouter |
| Very long context (large documents, big prompts) | Gemini (large context window on free tier) |
| Batch/offline processing, not live latency-sensitive | Cerebras |

## A note for facilitators

[#a-note-for-facilitators](#a-note-for-facilitators)

Free tiers get tightened, renamed, or reshuffled with little notice — this happened to Groq's Llama models in June 2026, and to other providers' catalogs more than once through 2025-2026. Two things reduce risk on workshop day:

1. **Do a dry run 24–48 hours before**, not just at prep time — a key or model id that worked last week can start failing without warning.
2. **Make sure everyone knows the `switch-ai-provider` Claude Code skill exists**, even if you plan to demo with one provider throughout — a rate-limit or deprecated-model error mid-session becomes a two-minute `.env.local` change instead of a dead-air moment, since `app/api/chat/route.ts` never hardcodes a provider.
