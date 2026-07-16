---
name: scaffold-ai-mvp
description: Scaffold a deployable AI MVP in this repository using Next.js, TypeScript, Express, a simple UX, reusable application skills, an agent, and an orchestrating workflow. Use when starting a Health, Agriculture, FinTech, or other decision-tool MVP.
---

# Scaffold an AI MVP

## Goal
Create a working vertical slice without replacing the repository architecture.

## Inputs to identify
- Use-case name and target user.
- User input and expected decision/output.
- Domain: FinTech, Health, Agriculture, or another approved domain.
- Required integrations.

When details are missing, preserve generic names and add a clearly marked TODO rather than inventing business rules.

## Required architecture
1. Next.js UI in `starter/web`.
2. Express route in `starter/api/src/app.ts`.
3. Domain skill modules in `starter/api/src/skills`.
4. One agent in `starter/api/src/agents`.
5. One deterministic workflow in `starter/api/src/workflows`.
6. Gemini only through `providers/gemini.provider.ts`.

## Steps
1. Inspect existing types and naming conventions.
2. Define or extend input/output types in `src/types.ts`.
3. Create small deterministic skills before adding AI generation.
4. Compose skills in an agent.
5. Orchestrate the complete request in a workflow.
6. Expose one API endpoint.
7. Connect the UI using `NEXT_PUBLIC_API_URL`.
8. Add input validation, loading, empty, success, and failure states.
9. Keep secrets server-side.
10. Run TypeScript builds for API and web.

## Completion checks
- No API key appears in browser code.
- The app works using sample data.
- The workflow has visible steps and does not hide all logic in one prompt.
- Errors return safe, understandable messages.
- README or workshop notes explain how to run and deploy the generated MVP.
