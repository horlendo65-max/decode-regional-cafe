# Building AI Apps Fast — From Idea to MVP

Build and deploy an AI-powered **M-PESA Expense Advisor** in 90 minutes using AI coding agents, reusable skills, and workflows.

## Live outcome
Participants finish with:
- a Next.js + TypeScript interface;
- an Express + TypeScript API;
- a Gemini-powered expense decision tool;
- pasted M-PESA statement analysis;
- an optional Daraja Sandbox STK Push skill;
- a GitHub repository and deployable Vercel projects.

## Prerequisites
- Node.js 20+
- Git and GitHub account
- Vercel account
- Gemini API key from Google AI Studio
- VS Code with GitHub Copilot Free, Gemini Code Assist, Cursor, or another coding agent
- Optional: Daraja Sandbox credentials

## Workshop
Start at [`workshop/workshop_guide.md`](workshop/workshop_guide.md).

## Repository structure
```text
building-ai-apps-fast-workshop/
├── reference/             # Complete working implementation and fallback
│   ├── web/               # Next.js interface
│   └── api/               # Express API, agents, skills and workflows
├── starter/               # Participant scaffold with guided TODOs
├── workshop/              # 90-minute step-by-step lab
├── agent-prompts.md       # Prompts for Copilot/Gemini coding agents
├── .github/agents/        # Custom Copilot agents
├── .github/skills/        # Reusable coding-agent skills (SKILL.md)
├── .github/prompts/       # Guided workshop prompt workflows
└── docs/                  # Deployment, architecture and facilitator notes
```


## Two kinds of skills are included

- **Coding-agent skills:** `.github/skills/*/SKILL.md` teach Copilot-compatible agents how to scaffold, integrate Gemini, build workflows, deploy, and add Daraja Sandbox.
- **Application runtime skills:** `starter/api/src/skills/*.skill.ts` are capabilities used by the deployed Expense Advisor itself.

Start the agent-driven flow with `.github/prompts/01-define-mvp.prompt.md`, or complete the supplied use case with `.github/prompts/03-complete-expense-workflow.prompt.md`. See [`AGENTS.md`](AGENTS.md).

## Quick start — working reference
```bash
cd reference/api
cp .env.example .env
npm install
npm run dev
```
In another terminal:
```bash
cd reference/web
cp .env.example .env.local
npm install
npm run dev
```
Open `http://localhost:3000`.

## AI tools
GitHub Copilot Free or Gemini Code Assist helps participants scaffold and modify code. The deployed app itself uses the Gemini API; an IDE coding assistant is not used as the production inference backend.

## Safety
The application provides educational budgeting guidance, not regulated financial advice. Never commit API keys or upload statements containing details you do not want processed by the configured AI provider.
