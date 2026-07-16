# Coding-agent prompts

## Prompt 1 — Architecture guide
Act as a workshop pair programmer. Read `README.md`, `workshop/01-overview.md`, and the code under `starter/api/src`. Do not edit yet. Explain, in under 250 words, how the agent, skills and workflow collaborate, identify deterministic versus generative responsibilities, and list the exact files involved.

## Prompt 2 — Assemble the workflow
Implement only `starter/api/src/workflows/expense-analysis.workflow.ts`. Reuse the existing ParseMpesaSkill, CategorizeSkill, BudgetMathSkill and ExpenseAdvisorAgent. Run them in that order, reject an empty parsed transaction list, return the ExpenseAnalysis shape including the educational disclaimer, and do not duplicate logic from the skills. Preserve strict TypeScript and NodeNext `.js` import suffixes. Then run the API build and fix only errors caused by this change.

## Prompt 3 — Improve UX
Review `starter/web/app/page.tsx` and `globals.css`. Improve accessibility and mobile behavior without adding a UI library. Preserve the API contract and green workshop theme. Add clear privacy copy stating that pasted statement text is sent to the configured AI service.

## Prompt 4 — Create a new use case
Using the existing architecture, propose files for a Kenyan smallholder Crop Advisor. Create deterministic input validation and a generative advisor agent, but include a safety boundary: it must not claim certainty about disease identification and should recommend an agricultural officer for high-risk cases. Do not modify the Expense Advisor.

## Rescue prompt
The app is broken. Compare only the affected starter file with the equivalent file under `reference/`. Explain the smallest safe correction, apply it without replacing unrelated participant work, then run the relevant build command.
