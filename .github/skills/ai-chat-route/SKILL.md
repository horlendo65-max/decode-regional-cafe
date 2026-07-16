---
name: ai-chat-route
description: Use this GitHub Copilot skill when implementing app/api/chat/route.ts or wiring sendMessage() in components/ChatPanel.tsx for PesaBot. It detects the configured free runtime AI provider from .env.local. Trigger for requests such as "implement the chat route", "connect the AI", "wire up the AI model", "turn a goal into a decision", or other tasks that turn free-text input into structured JSON through an LLM in this repository.
---

# AI Chat Route (PesaBot Module 02) — multi-provider

[#ai-chat-route-pesabot-module-02-multi-provider](#ai-chat-route-pesabot-module-02-multi-provider)

## Why this skill is provider-agnostic

[#why-this-skill-is-provider-agnostic](#why-this-skill-is-provider-agnostic)

Different attendees will have different free API keys depending on what worked on the venue's network during prep — some will have Groq, some Gemini, some OpenRouter, some Cerebras. `lib/ai-provider.ts` already abstracts this: all four are OpenAI-compatible endpoints, so one client works for all of them, switched by the `AI_PROVIDER` env var. This skill scaffolds *against that abstraction*, not against any one provider's SDK — never hardcode a specific provider's client library here.

## What this skill builds

[#what-this-skill-builds](#what-this-skill-builds)

1. `app/api/chat/route.ts` — a POST route that calls `getAIClient()` from `lib/ai-provider.ts` with a system prompt, and returns structured JSON matching `lib/types.ts`'s `ChatResponse` type.
2. The `sendMessage()` function stub at the bottom of `components/ChatPanel.tsx` — replace the `throw new Error(...)` with a `fetch("/api/chat", ...)` call. This part never changes based on provider — it only talks to your own `/api/chat` route.

## Before you start

[#before-you-start](#before-you-start)

1. Read `lib/ai-provider.ts` in full — it already knows how to build a client for any of the four providers. Don't reimplement provider selection logic inside the route; import and call `getAIClient()`.
2. Check `.env.local` for `AI_PROVIDER` and the matching `*_API_KEY`. If neither is set, ask the attendee which free provider they signed up for during prep rather than defaulting silently — a missing key produces a confusing runtime error, not a helpful one.
3. Read `lib/types.ts` — the JSON shape you generate MUST match `SavingsDecision` / `ClarificationNeeded` exactly, field names included. `ChatPanel.tsx` and `DecisionCard.tsx` already destructure these exact fields.
4. Install the SDK if it isn't already a dependency: `npm install openai` (this one package talks to all four providers via `lib/ai-provider.ts`).

## Implementation

[#implementation](#implementation)

### `app/api/chat/route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getAIClient } from "@/lib/ai-provider";

const SYSTEM_PROMPT = `You are PesaBot, a friendly savings assistant for Kenyan users.
Given a user's goal in free text, respond ONLY with JSON matching this exact shape,
no markdown, no commentary:

{
  "goalSummary": string,
  "targetAmountKes": number,
  "targetDateHint": string,
  "suggestedDailyKes": number,
  "reasoning": string
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

Note there is no `if (provider === "groq") ... else if (provider === "gemini")` branching anywhere — `getAIClient()` already resolved that, and every one of the four providers accepts the same `chat.completions.create()` call shape. If you find yourself writing provider-specific branches in the route, stop — that logic belongs in `lib/ai-provider.ts`, not here.

### `sendMessage()` in `components/ChatPanel.tsx`

```typescript
async function sendMessage(text: string): Promise<ChatResponse> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`);
  return res.json();
}
```

## Verify

[#verify](#verify)

1. `npm run dev`, open `http://localhost:3000`
2. Send: *"I want to save 5000 shillings for my sister's school fees by December"*
3. Expect a decision card to render with a target amount, date, and daily suggestion — not a raw error, not a JSON blob printed as chat text

If the room has a mix of providers, this exact test should pass the same way for everyone, regardless of which one they configured.

## Common failure modes to check for

[#common-failure-modes-to-check-for](#common-failure-modes-to-check-for)

- `temperature` above ~0.5 makes the numbers inconsistent between similar inputs — keep it low (0.2–0.4) since a real payment amount is downstream
- Forgetting `response_format: { type: "json_object" }` — without it some providers wrap JSON in markdown fences, which breaks `JSON.parse`. Not all providers support this field identically — if a provider silently ignores it, fall back to instructing strict-JSON-only in the system prompt and validating harder in the catch block
- Field name drift (e.g. `dailyAmount` instead of `suggestedDailyKes`) — always cross-check against `lib/types.ts`, don't invent field names
- `AI_PROVIDER` set to a value with no matching API key in `.env.local` — `getAIClient()` throws a clear error naming the missing env var; don't swallow that error, surface it
- A provider's default model in `lib/ai-provider.ts` has been deprecated since this skill was written (this happens — Groq deprecated `llama-3.3-70b-versatile` in June 2026, for example) — if requests fail with a "model not found" or "model decommissioned" style error, check the provider's current model list and set the matching `*_MODEL` env var rather than editing `lib/ai-provider.ts`'s defaults live in the workshop
