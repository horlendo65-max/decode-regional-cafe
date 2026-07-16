# Troubleshooting Guide

## API does not start

Check:

```bash
node -v
npm install
cp .env.example .env
npm run dev
```

Node should be version 20 or later.

## Gemini returns an authentication error

Check:

- `GEMINI_API_KEY` exists in `starter/api/.env`.
- The key was copied from Google AI Studio.
- There are no quotes or spaces around the key.
- The API server was restarted after changing `.env`.

## Frontend cannot reach backend

Check `starter/web/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:4000
```

For deployed Vercel apps, update it to the deployed API URL.

## CORS error

For local development, confirm the API allows the local frontend origin. If needed, update the Express CORS configuration in `starter/api/src/app.ts`.

## AI response is too vague

Improve the agent prompt. Add:

- Kenyan context;
- expected spending categories;
- Markdown output;
- concrete recommendations;
- safety disclaimer for financial advice.

## Coding agent broke the architecture

Use these rescue steps:

1. Compare your file with `reference/`.
2. Open `agent-prompts.md`.
3. Use the rescue prompt: "Restore the agent/skill/workflow separation...".
4. Re-run TypeScript build.

## Vercel deployment fails

Check:

- correct root directory selected;
- build command matches package scripts;
- environment variables are configured;
- no API keys are committed;
- the API is deployed separately from the frontend when using this repo structure.

## Daraja Sandbox does not trigger STK Push

Check:

- consumer key and secret;
- shortcode;
- passkey;
- timestamp format;
- callback URL is public;
- phone number format follows Daraja Sandbox requirements.

## Emergency fallback

Use the complete implementation in `reference/` if the starter becomes blocked during the session.
