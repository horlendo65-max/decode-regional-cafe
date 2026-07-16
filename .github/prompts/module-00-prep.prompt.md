---
name: module-00-prep
description: Prepare the local PesaBot workspace and report any credentials the attendee must configure
agent: agent
tools: [read, edit, search, execute]
---

Complete Module 00 preparation now. Follow
[the prep guide](../../workshop/00-prep/README.md).

1. Check the installed Node.js and Git versions.
2. Run `npm install` only when dependencies are missing.
3. Create `.env.local` from `.env.example` only when `.env.local` does not
   already exist.
4. Configure non-secret workshop defaults when absent:
   `AI_PROVIDER=gemini`, `GEMINI_MODEL=gemini-3.5-flash`,
   `MPESA_SHORTCODE=174379`, and
   `NEXT_PUBLIC_APP_URL=http://localhost:3000`.
5. Check whether `GEMINI_API_KEY`, `MPESA_CONSUMER_KEY`,
   `MPESA_CONSUMER_SECRET`, and `MPESA_PASSKEY` are non-empty. Never read them
   aloud, display them, overwrite them, or ask the attendee to paste them into
   Copilot Chat. Tell the attendee to edit `.env.local` directly for any
   missing secret.
6. Run `npm run build` when all required local dependencies are available.

Do not implement Modules 02 or 03. Finish with a short prep checklist and the
next slash command, `/module-01-deploy`.

