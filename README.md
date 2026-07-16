# decode-regional-cafe
### Building AI Apps Fast: From Idea to MVP — a 90-minute workshop (Fintech track)

[#decode-regional-cafe](#decode-regional-cafe)

This repo is both things at once: a working Next.js starter app (**PesaBot**) and the workshop guide that walks attendees through finishing it live. Clone it once — the code and the instructions live together.

## What We're Building

[#what-were-building](#what-were-building)

**PesaBot** — an AI savings assistant. A user chats about a savings goal ("I want to save KES 5,000 for my sister's school fees by December"), an AI turns that into a concrete daily/weekly savings plan, and when the user taps **Confirm & Save**, the app triggers a real M-Pesa STK Push (sandbox) so the user "pays themselves" on the spot.

| Requirement | How PesaBot covers it |
|---|---|
| Working AI-powered app (chatbot / decision tool) | Chat UI + AI turns a goal into a structured savings plan |
| API integration — payments | M-Pesa Daraja STK Push (sandbox) |
| Basic deployed interface | Deployed to Vercel, live public URL |
| Rapid prototyping | Deploy-first workflow, pre-built scaffold, ~90 min total |
| Use-case flexibility | Same skeleton adapts to Health (symptom triage → book a slot) or Agri (crop input advice → order supplies) — see [workshop/04-test-and-wrap-up](workshop/04-test-and-wrap-up/README.md) |
| Free-model flexibility | Uses Gemini's free API tier by default; Groq, OpenRouter, and Cerebras remain one-env-var fallbacks |

## Quick start

[#quick-start](#quick-start)

```
git clone https://github.com/horlendo65-max/decode-regional-cafe.git
cd decode-regional-cafe
npm install
cp .env.example .env.local   # fill in your keys — see workshop/00-prep
npm run dev
```

Open `http://localhost:3000`. You'll see a working chat UI that does nothing yet — the API routes return "not implemented" placeholders. You (or the workshop) fill those in.

## Repo layout

[#repo-layout](#repo-layout)

```
decode-regional-cafe/
├── app/                    # Next.js App Router — pages + API routes (stubbed)
├── components/             # Chat UI (built) — ChatPanel.tsx, DecisionCard.tsx
├── lib/                    # ai-provider.ts (multi-provider AI client), daraja.ts (stubbed), types.ts
├── .github/                # Copilot instructions, prompt files, and custom agents
│   ├── agents/
│   ├── prompts/
│   └── skills/
├── workshop/                # The 90-minute guide, module by module
│   ├── 00-prep/
│   ├── 01-scaffold-and-deploy/
│   ├── 02-ai-integration/
│   ├── 03-daraja-integration/
│   ├── 04-test-and-wrap-up/
│   ├── FACILITATOR-GUIDE.md
│   └── FREE-AI-MODELS.md
├── .env.example
└── package.json
```

## Format

[#format](#format)

- **Duration:** 90 minutes, live-coding
- **Stack:** Next.js 14 (App Router) + TypeScript
- **IDE assistant:** GitHub Copilot Free or an event-provided temporary Copilot license
- **Runtime AI:** Gemini free API tier by default; other supported providers remain fallbacks — see [workshop/FREE-AI-MODELS.md](workshop/FREE-AI-MODELS.md)
- **Payments:** Safaricom Daraja API, sandbox environment (no real money moves)
- **Deploy target:** Vercel free tier

## Prerequisites (must be done *before* the session)

[#prerequisites](#prerequisites)

90 minutes is not enough time for account signups, npm installs, and waiting for API approvals. Everything in **[workshop/00-prep](workshop/00-prep/README.md)** must be done ahead of time — send it out at least 3 days before the workshop, with a reminder 24 hours before.

## Agenda

[#agenda](#agenda)

| Time | Module | What happens |
|---|---|---|
| 0:00 – 0:10 | Kickoff | Idea framing, MVP mindset, what "done" looks like in 90 min |
| 0:10 – 0:20 | [01 — Scaffold & deploy](workshop/01-scaffold-and-deploy/README.md) | First deploy to Vercel (deploy *before* you build) |
| 0:20 – 0:45 | [02 — AI integration](workshop/02-ai-integration/README.md) | Chat UI, AI provider call, structured JSON decisions |
| 0:45 – 1:10 | [03 — Daraja integration](workshop/03-daraja-integration/README.md) | OAuth token, STK Push, callback handling |
| 1:10 – 1:25 | [04 — Test, deploy, wrap-up](workshop/04-test-and-wrap-up/README.md) | Redeploy, end-to-end test, adapting the skeleton to Health/Agri |
| 1:25 – 1:30 | Close | Resources, next steps, feedback |

See **[workshop/FACILITATOR-GUIDE.md](workshop/FACILITATOR-GUIDE.md)** for minute-by-minute timing and what to cut if you're running behind.

## Building with GitHub Copilot Free or a temporary license

[#building-with-github-copilot-free-or-a-temporary-license](#building-with-github-copilot-free-or-a-temporary-license)

Open the repository in VS Code with GitHub Copilot Chat. The `.github/` folder is the single source for repository instructions, reusable slash prompts, custom agents, and project skills. See **[workshop/COPILOT-GUIDE.md](workshop/COPILOT-GUIDE.md)** for setup, Free-plan fallbacks, and tips for preserving the limited allowance.

**Skills** (auto-trigger on natural descriptions, or invoke by name):

| Skill | Scaffolds |
|---|---|
| `ai-chat-route` | `app/api/chat/route.ts` + wiring — **provider-agnostic**, works against whichever of Groq/Gemini/OpenRouter/Cerebras is configured |
| `daraja-stk-push` | `lib/daraja.ts` + the STK push route |
| `daraja-callback` | The M-Pesa callback handler |
| `switch-ai-provider` | Swaps `AI_PROVIDER` mid-workshop if one free tier is rate-limited or a model gets deprecated — config change, not a rewrite |

**Custom agents** (select from the Copilot agent picker when available):

| Agent | Use it to |
|---|---|
| `daraja-debugger` | Diagnose a Daraja/M-Pesa error from the actual error message, using a symptom→cause table |
| `prompt-reviewer` | Review your AI system prompt and JSON schema for edge cases and provider lock-in before it's wired to a real payment |

**Reusable prompts:** `/workshop-status`, the four module/skill prompts, plus `/debug-daraja` and `/review-ai-prompt` as Free-plan equivalents of the custom agents. These keep each request small enough for a live workshop.

Example prompts:

```
/ai-chat-route
```
```
/switch-ai-provider Move from Gemini to Groq.
```
```
Select Daraja Debugger: My STK Push returns "Invalid Access Token".
```
```
/workshop-status
```

If a Free account runs out of requests or does not expose a preview feature, continue with the module READMEs under `workshop/`; they contain the same implementation details. A temporary license changes Copilot features and limits, not the repository or the finished application.

## Deploying

[#deploying](#deploying)

Push to GitHub (already done if you're reading this from the repo), import into Vercel, add the same environment variables from `.env.example`, and set `NEXT_PUBLIC_APP_URL` to your deployed URL (needed for the Daraja callback to be reachable). See [workshop/01-scaffold-and-deploy](workshop/01-scaffold-and-deploy/README.md).

## Why this shape

[#why-this-shape](#why-this-shape)

The workshop follows a "deploy first, build second" philosophy: get a real, public URL live in the first 10 minutes, then build *into* that deployed app rather than building locally and deploying once at the end. This matters specifically for the Daraja integration, because Safaricom's callback URL must be a real HTTPS endpoint — having it live early removes a whole class of last-minute surprises.
