# 00 — Pre-Workshop Prep

[#00-pre-workshop-prep](#00-pre-workshop-prep)

**Do this before the session.** It takes about 20–25 minutes and most of it is waiting for account approvals — none of it should happen live.

## 1. Install tooling

[#1-install-tooling](#1-install-tooling)

- Node.js 20+ (`node -v` to check)
- Git
- A code editor (VS Code recommended) or an online IDE (GitHub Codespaces, StackBlitz) if you'd rather not install anything locally — everything in this workshop is plain file edits, no local-only steps except the final `git push`
- GitHub Copilot Chat for VS Code: Copilot Free is sufficient; an event-provided temporary license gives higher limits and optional agent features. Follow [the Copilot guide](../COPILOT-GUIDE.md) and sign in before the session.

```
node -v
git --version
```

## 2. Get a free Gemini API key

[#2-get-a-free-gemini-api-key](#2-get-a-free-gemini-api-key)

Create a key in [Google AI Studio](https://aistudio.google.com) and save it somewhere secure. Gemini is the common workshop default, which makes the live instructions easier to follow. See [../FREE-AI-MODELS.md](../FREE-AI-MODELS.md) for fallback providers if Gemini is unavailable on the venue network.

| Provider | Sign up at | Notes |
|---|---|---|
| **Gemini** (recommended default) | [aistudio.google.com](https://aistudio.google.com) | Shared workshop path; OpenAI-compatible endpoint |
| Groq | [console.groq.com](https://console.groq.com) | Fast fallback if Gemini is blocked or rate-limited |
| OpenRouter | [openrouter.ai](https://openrouter.ai) | One key, many free models |
| Cerebras | [cloud.cerebras.ai](https://cloud.cerebras.ai) | Very fast, smaller free catalog |

Start with the Gemini free tier; do not enable billing for this workshop. Create the key and save it somewhere safe—you'll paste it into `.env.local`, never into source code or Copilot Chat.

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

Open `.env.local`, leave `AI_PROVIDER=gemini`, and set `GEMINI_API_KEY` to your Google AI Studio key. Leave the Daraja and `NEXT_PUBLIC_APP_URL` fields for now—those come in Modules 01 and 03.

```
npm run dev
```

Open `http://localhost:3000` — you should see a bare chat UI with a text box and a **Confirm & Save** button, both wired to nothing yet. That's expected — this is the scaffold you'll build on live.

## Checklist

[#checklist](#checklist)

- [ ] Node 20+, Git installed
- [ ] VS Code Copilot Chat opens for this repository (Free or temporary license)
- [ ] Gemini free API key saved; one fallback provider is optional
- [ ] Daraja Consumer Key, Consumer Secret, Shortcode, Passkey saved
- [ ] Vercel account connected to GitHub
- [ ] Repo cloned, `npm install` completed, `npm run dev` runs and loads `http://localhost:3000`

If any of these fail, message the facilitator before the workshop—corporate/campus Wi-Fi sometimes blocks Google AI Studio or `developer.safaricom.co.ke`. Discover that before the event and use one of the fallback providers if necessary.
