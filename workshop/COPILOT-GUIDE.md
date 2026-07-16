# GitHub Copilot setup for the workshop

This repository uses **GitHub Copilot** as the IDE assistant and the **Gemini free API tier** as PesaBot's runtime AI. Copilot helps write the code but does not replace the Gemini model called by the deployed application.

## Before the session

1. Install the latest VS Code and the GitHub Copilot extension, then sign in to a personal GitHub account.
2. Enable Copilot Free if the account has no assigned license. If the event supplies a temporary license, confirm it appears in the Copilot menu before arriving.
3. Open the repository root as the VS Code workspace. Copilot automatically receives `.github/copilot-instructions.md` and discovers the project skills under `.github/skills/`.
4. Open Copilot Chat. Use **Agent** mode when it is available; otherwise the reusable prompts still work in chat and the full module READMEs remain the no-AI fallback.

Copilot Free has limited usage and automatic model selection. Paid or temporary licenses provide higher allowances and may expose more agent features. This repo does not pin a Copilot model, so the same files work under either plan.

## Recommended workflow

Run one reusable prompt per workshop checkpoint:

| When | Type in Copilot Chat |
|---|---|
| Check progress | `/workshop-status` |
| Module 02 | `/ai-chat-route` |
| Module 03, STK Push | `/daraja-stk-push` |
| Module 03, callback | `/daraja-callback` |
| Runtime AI provider fails | `/switch-ai-provider` |
| Diagnose a Daraja error | `/debug-daraja` followed by the exact error |
| Review AI before M-Pesa | `/review-ai-prompt` |

If prompt files do not appear after cloning, reload the VS Code window. As a universal fallback, type a normal request such as: `Use the ai-chat-route skill in .github/skills to implement Module 02.`

## Using custom agents

When the agent picker is available, select:

- **Daraja Debugger** after an STK Push implementation returns a specific error.
- **Prompt Reviewer** after Module 02 works and before connecting its output to M-Pesa.

If a Copilot Free account does not show custom agents, run `/debug-daraja` or `/review-ai-prompt`. The agent profiles are conveniences, not workshop dependencies.

## Make the free allowance last

- Ask for one module at a time; the prompt files already provide the required context.
- Use `/workshop-status` instead of asking Copilot to explain the whole repository.
- Run local checks before sending another chat request, and include the exact error if a check fails.
- Do not regenerate working files just to make them stylistically different.
- Pair up if an attendee reaches their allowance: the workshop guide contains every code sample needed to continue manually.

Temporary-license expiry does not affect committed code, skills, prompts, or the running PesaBot app. It only changes which Copilot features and usage limits are available afterward.
