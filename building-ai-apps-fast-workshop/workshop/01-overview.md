# Step 1 — Understand the building blocks (10 min)

**Agent:** owns the goal and uses context to produce advice. Here: `ExpenseAdvisorAgent`.

**Skill:** deterministic, reusable capability. Here: parsing, categorization, budget math and optional STK Push.

**Workflow:** ordered orchestration with explicit inputs and outputs.

```text
Next.js UX → POST /api/analyze → ExpenseAnalysisWorkflow
  → ParseMpesaSkill → CategorizeSkill → BudgetMathSkill
  → ExpenseAdvisorAgent → Gemini → structured response
```

Why this works in 90 minutes: the boilerplate and boundaries exist; participants use an AI coding agent to inspect, connect and adapt them.
