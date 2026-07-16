# Free AI Model Options for This Workshop

[#free-ai-model-options-for-this-workshop](#free-ai-model-options-for-this-workshop)

Free LLM tiers change often — treat these as a starting point and re-check quotas and model availability the week of the workshop, not the numbers themselves. As of mid-2026, here's the practical landscape.

## Design choice: the app doesn't pick a provider for you

[#design-choice-the-app-doesnt-pick-a-provider-for-you](#design-choice-the-app-doesnt-pick-a-provider-for-you)

`lib/ai-provider.ts` uses Gemini by default and supports three fallback providers through the same interface, switched by `AI_PROVIDER`. A shared Gemini path keeps the live workshop consistent, while the fallbacks prevent a network block or rate limit from derailing the build. Switch with `.env.local` or the `switch-ai-provider` GitHub Copilot skill; never rewrite the chat route.

## A recent example of why this matters

[#a-recent-example-of-why-this-matters](#a-recent-example-of-why-this-matters)

In June 2026, Groq deprecated `llama-3.3-70b-versatile` (the model most Groq tutorials from 2025 reference) in favor of `openai/gpt-oss-120b`. `lib/ai-provider.ts` already points at the new model, but this is exactly the kind of thing that goes stale between when a workshop guide is written and when it's run — always worth a quick check of each provider's current model list before the session, not just trusting the defaults baked into this repo.

## The four options

[#the-four-options](#the-four-options)

### Google Gemini (AI Studio)—recommended default

**Why:** one common setup for the room, a free API tier, and an OpenAI-compatible endpoint that works with the repository's existing client.

- Create a key: [aistudio.google.com](https://aistudio.google.com)
- OpenAI-compatible base URL: `https://generativelanguage.googleapis.com/v1beta/openai/`
- Workshop model: `gemini-3.5-flash`
- Keep billing disabled for the workshop and check the active project limits in AI Studio before the event.

### Groq—first fallback

**Why:** fast OpenAI-compatible inference if Gemini is blocked or rate-limited on the venue network.

- Sign up: [console.groq.com](https://console.groq.com)
- Current repository fallback: `openai/gpt-oss-120b`
- Check [console.groq.com/docs/models](https://console.groq.com/docs/models) before the session because model availability changes.

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
| Standard workshop setup | Gemini (`gemini-3.5-flash`) |
| Backup if Gemini is blocked/rate-limited | Groq |
| Attendees want to try many models after the workshop | OpenRouter |
| Very long context (large documents, big prompts) | Gemini |
| Batch/offline processing, not live latency-sensitive | Cerebras |

## A note for facilitators

[#a-note-for-facilitators](#a-note-for-facilitators)

Free tiers get tightened, renamed, or reshuffled with little notice — this happened to Groq's Llama models in June 2026, and to other providers' catalogs more than once through 2025-2026. Two things reduce risk on workshop day:

1. **Do a dry run 24–48 hours before**, not just at prep time — a key or model id that worked last week can start failing without warning.
2. **Make sure everyone knows the `/switch-ai-provider` Copilot prompt and skill exist**, even if you plan to demo with one provider throughout — a rate-limit or deprecated-model error mid-session becomes a two-minute `.env.local` change instead of a dead-air moment, since `app/api/chat/route.ts` never hardcodes a provider.
