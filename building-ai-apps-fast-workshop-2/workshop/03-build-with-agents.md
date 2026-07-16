# Step 3 — Build with an AI coding agent (35 min)

Open your editor agent and paste **Prompt 1** from `agent-prompts.md`. Let it explain the architecture before editing.

Then paste **Prompt 2** to assemble `starter/api/src/workflows/expense-analysis.workflow.ts`.

Run:
```bash
npm run build
```
Test through the browser. Inspect whether the parsed totals match the pasted lines. AI may advise, but deterministic skills should calculate money.

## Customization challenge
Choose one:
- change the advisor persona to focus on students, families or microbusinesses;
- add a category rule;
- improve empty/loading/error states;
- create a `HealthTriageWorkflow` or `CropAdvisorWorkflow` from the extension prompt.

## Optional Daraja
The prepared `DarajaStkPushSkill` is sandbox-only. Keep it disabled unless credentials and a public callback URL are available. Never place Daraja secrets in the browser.
