# 02 — AI Integration
### 0:20 – 0:45 (25 min)

[#02-ai-integration](#02-ai-integration)

Goal: turn a free-text savings goal into a structured plan the app can act on, using whichever free AI provider you set up in prep.

## Why a "structured decision", not just a chat reply

[#why-a-structured-decision-not-just-a-chat-reply](#why-a-structured-decision-not-just-a-chat-reply)

A chatbot that only produces prose is a dead end for an MVP — nothing downstream can act on it. We ask the model to reply as JSON matching a fixed shape, so the UI can render a confirmation card and the payment step can read an exact amount. This "decision tool" pattern (chat in, structured action out) is the reusable part of this workshop — it's the same shape you'd use for a health triage tool or an Agri input recommender.

## Why this works with any of the four providers

[#why-this-works-with-any-of-the-four-providers](#why-this-works-with-any-of-the-four-providers)

Groq, Gemini, OpenRouter, and Cerebras all expose an OpenAI-compatible `/chat/completions` endpoint. `lib/ai-provider.ts` already wraps this: it reads `AI_PROVIDER` from your environment and returns a ready-to-use client and model name, whichever of the four you picked. You never import a provider-specific SDK in the route itself — only `getAIClient()`.

```typescript
// lib/ai-provider.ts already does this — you don't need to touch it
export function getAIClient(): { client: OpenAI; model: string; provider: AIProviderId } {
  // ... resolves AI_PROVIDER, baseURL, apiKey, and model automatically
}
```

If you're curious, open `lib/ai-provider.ts` and read it before continuing — it's short, and understanding it means you never have to think about "which provider" again for the rest of the workshop.

## Install the OpenAI SDK

[#install-the-openai-sdk](#install-the-openai-sdk)

One SDK talks to all four providers via `lib/ai-provider.ts`'s different `baseURL`s.

```
npm install openai
```

## Build the chat API route

[#build-the-chat-api-route](#build-the-chat-api-route)

`app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAIClient } from "@/lib/ai-provider";

const SYSTEM_PROMPT = `You are PesaBot, a friendly savings assistant for Kenyan users.
Given a user's goal in free text, respond ONLY with JSON matching this exact shape,
no markdown, no commentary:

{
  "goalSummary": string,       // one short sentence restating the goal
  "targetAmountKes": number,   // total KES needed
  "targetDateHint": string,    // e.g. "December 2026" or "in 3 months"
  "suggestedDailyKes": number, // a sensible daily amount to hit the goal
  "reasoning": string          // one sentence explaining the math, plain language
}

If the user hasn't given enough detail to compute this, ask ONE clarifying
question instead, as JSON: { "needsClarification": string }`;

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const { client, model } = getAIClient();

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { needsClarification: "Sorry, could you rephrase your savings goal?" },
      { status: 200 }
    );
  }
}
```

Key details worth calling out live:
- `getAIClient()` is the only provider-specific line in this whole route — everything else is identical no matter which of the four free tiers someone in the room is using
- `response_format: { type: "json_object" }` — enforces valid JSON output where supported, which removes most of the parsing pain
- `temperature: 0.3` — low temperature keeps the numbers consistent between runs, which matters when the next step is a real payment
- Always wrap `JSON.parse` in try/catch — models occasionally still return malformed JSON

## Wire up the chat UI

[#wire-up-the-chat-ui](#wire-up-the-chat-ui)

`components/ChatPanel.tsx` already has the input box and message list — add the fetch call in place of the stub:

```typescript
async function sendMessage(text: string) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });
  const decision = await res.json();

  if (decision.needsClarification) {
    addBotMessage(decision.needsClarification);
  } else {
    addDecisionCard(decision); // renders the confirm-and-save card
  }
}
```

## Try it

[#try-it](#try-it)

```
npm run dev
```

Type something like: *"I want to save 5000 shillings for my sister's school fees by December"*

You should get back a decision card with a daily amount — that card's **Confirm & Save** button is what Module 03 wires up to Daraja.

## If your provider is rate-limited or its model was deprecated

[#if-your-provider-is-rate-limited-or-its-model-was-deprecated](#if-your-provider-is-rate-limited-or-its-model-was-deprecated)

Free tiers get tightened or reshuffled without much notice — check `../FREE-AI-MODELS.md` for current status, or in Claude Code just say "switch to Gemini" (or whichever provider) and the `switch-ai-provider` skill will change your `.env.local` correctly — no code edit needed, since the route only ever talks to `getAIClient()`.
