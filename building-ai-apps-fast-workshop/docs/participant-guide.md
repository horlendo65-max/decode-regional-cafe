# Participant Guide

## Welcome

You will build and deploy an AI-powered Expense Advisor using Next.js, Express, TypeScript, Gemini and AI coding-agent skills.

You are not expected to write everything from scratch. The goal is to learn how to assemble an MVP using prepared agents, skills and workflows.

## What you will build

A web app that can:

- answer budgeting questions;
- analyse pasted M-PESA statement text;
- categorise spending;
- recommend savings opportunities;
- deploy to Vercel;
- optionally trigger a Daraja Sandbox STK Push flow.

## What you need before the session

- Node.js 20 or later
- Git
- GitHub account
- Vercel account
- Google AI Studio Gemini API key
- VS Code
- GitHub Copilot Free, Gemini Code Assist, Cursor or another coding assistant

## How to use the repo

Use these folders:

```text
starter/     Your working copy during the workshop
reference/   Complete fallback solution
workshop/    Guided labs and checkpoints
docs/        Explanations, troubleshooting and deployment guides
.github/     Agent instructions, skills and prompt workflows
```

## Recommended flow

1. Read `workshop/workshop_guide.md`.
2. Open the `starter/` app.
3. Configure the Gemini API key.
4. Use `.github/prompts/03-complete-expense-workflow.prompt.md` with your coding assistant.
5. Run the API and web app locally.
6. Test M-PESA statement analysis.
7. Deploy to Vercel.
8. Demo your live URL.

## Coding-agent rule

Use the coding assistant to accelerate, but do not blindly accept changes. Check that it preserves:

- the agent/skill/workflow structure;
- TypeScript types;
- environment variable safety;
- clear separation between frontend and backend;
- no hardcoded API keys.

## Completion criteria

Your project is complete when:

- `npm run build` passes for the web app;
- `npm run build` passes for the API;
- `/health` returns a successful response;
- the Expense Advisor returns a useful AI answer;
- your GitHub repo is pushed;
- the deployed frontend can call the deployed API.
