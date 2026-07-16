# 00 — Pre-Workshop Prep

[#00-pre-workshop-prep](#00-pre-workshop-prep)

**Do this before the session.** It takes about 20–25 minutes and most of it is waiting for account approvals — none of it should happen live.

## 1. Install tooling

[#1-install-tooling](#1-install-tooling)

- Node.js 20+ (`node -v` to check)
- Git
- A code editor (VS Code recommended) or an online IDE (GitHub Codespaces, StackBlitz) if you'd rather not install anything locally — everything in this workshop is plain file edits, no local-only steps except the final `git push`

```
node -v
git --version
```

## 2. Get a free AI API key — pick ONE provider

[#2-get-a-free-ai-api-key--pick-one-provider](#2-get-a-free-ai-api-key--pick-one-provider)

You only need one of these four. Pick whichever signs up fastest on your network — see [../FREE-AI-MODELS.md](../FREE-AI-MODELS.md) for the full comparison. The app works identically regardless of which one you pick; it's a single `AI_PROVIDER` value in your `.env.local`.

| Provider | Sign up at | Notes |
|---|---|---|
| **Groq** (recommended default) | [console.groq.com](https://console.groq.com) | Fastest responses, good for a live demo |
| Gemini | [aistudio.google.com](https://aistudio.google.com) | Good fallback if Groq is blocked on venue Wi-Fi |
| OpenRouter | [openrouter.ai](https://openrouter.ai) | One key, many free models |
| Cerebras | [cloud.cerebras.ai](https://cloud.cerebras.ai) | Very fast, smaller free catalog |

All four: no credit card required for the free tier. Create the key and save it somewhere safe — you'll paste it into `.env.local` during the session.

## 3. Create a Safaricom Daraja sandbox account (Payments)

[#3-create-a-safaricom-daraja-sandbox-account-payments](#3-create-a-safaricom-daraja-sandbox-account-payments)

1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke) and register (individual account is enough for sandbox)
2. Once logged in, go to **My Apps → Add a new App**
3. Give it a name (e.g. `pesabot-sandbox`) and select the **Lipa Na M-Pesa Sandbox** / **M-PESA Express** product
4. Once created, open the app and note down, from the **Keys** tab:
   - `Consumer Key`
   - `Consumer Secret`
5. Go to the **APIs → M-Pesa Express (STK Push)** page and note down the sandbox test values:
   - `Shortcode`: `174379`
   - `Passkey`: shown on that page
   - Test phone number for simulated payments: `254708374149`

You do **not** need a real Paybill or Till number — sandbox uses a shared test shortcode and no real money moves.

## 4. Create a free Vercel account (Deploy)

[#4-create-a-free-vercel-account-deploy](#4-create-a-free-vercel-account-deploy)

Go to [vercel.com](https://vercel.com) and sign up with GitHub. Connect your GitHub account — we'll deploy straight from this repo in Module 01.

## 5. Clone and install

[#5-clone-and-install](#5-clone-and-install)

```
git clone https://github.com/horlendo65-max/decode-regional-cafe.git
cd decode-regional-cafe
npm install
cp .env.example .env.local
```

Open `.env.local` and set `AI_PROVIDER` to whichever provider you picked in step 2, plus its matching API key. Leave the Daraja and `NEXT_PUBLIC_APP_URL` fields for now — those come in Module 01 and 03.

```
npm run dev
```

Open `http://localhost:3000` — you should see a bare chat UI with a text box and a **Confirm & Save** button, both wired to nothing yet. That's expected — this is the scaffold you'll build on live.

## Checklist

[#checklist](#checklist)

- [ ] Node 20+, Git installed
- [ ] One free AI provider key saved (Groq, Gemini, OpenRouter, or Cerebras)
- [ ] Daraja Consumer Key, Consumer Secret, Shortcode, Passkey saved
- [ ] Vercel account connected to GitHub
- [ ] Repo cloned, `npm install` completed, `npm run dev` runs and loads `http://localhost:3000`

If any of these fail, message the facilitator before the workshop — corporate/campus Wi-Fi sometimes blocks `console.groq.com` or `developer.safaricom.co.ke`, which is worth discovering in advance rather than in the room. If your usual provider is blocked, that's exactly what the other three options are for.
