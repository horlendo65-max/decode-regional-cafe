# AI Agent Guide

This repository teaches participants to build deployable AI apps through four reusable layers:

1. **Instructions** define repository-wide engineering rules.
2. **Agent Skills** teach coding agents repeatable tasks.
3. **Custom Agents** provide specialized roles.
4. **Prompt Workflows** guide the build from idea to deployment.

## Recommended workshop flow
1. Run `01-define-mvp.prompt.md` with **Domain Agent Designer**.
2. Run `02-scaffold-mvp.prompt.md` with **MVP Builder**.
3. For the supplied Expense Advisor, run `03-complete-expense-workflow.prompt.md`.
4. Run `04-deploy-check.prompt.md` with **Architecture Reviewer**.

## Application architecture
- `src/skills`: runtime application capabilities.
- `src/agents`: runtime domain reasoning.
- `src/workflows`: runtime orchestration.
- `.github/skills`: instructions loaded by coding agents while building the application.

Do not confuse runtime application skills with coding-agent skills; both are deliberately included in this workshop.
