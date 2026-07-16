---
name: build-agent-workflow
description: Compose application skills into a domain agent and a predictable end-to-end workflow. Use when wiring a new use case or completing the starter workflow TODO.
---

# Build an agent and workflow

## Definitions
- **Skill:** one reusable capability.
- **Agent:** domain reasoning and selection of relevant skills.
- **Workflow:** ordered orchestration from validated request to response.

## Required flow
`validate input -> deterministic skills -> agent reasoning -> Gemini response -> normalized API output`

## Procedure
1. List the skills required by the use case.
2. Keep ordering and branching in the workflow.
3. Keep domain prompt construction in the agent.
4. Pass structured results to the agent; do not pass raw untrusted text when parsed data is available.
5. Return a stable JSON contract to the route.
6. Avoid autonomous loops, hidden retries, or unbounded tool calls in this 90-minute workshop.
7. Include safe fallback behavior when the model call fails.
8. Run the API build.

## Expense Advisor workflow
1. Validate pasted statement text.
2. Parse M-PESA-like transaction lines.
3. Categorize transactions.
4. Calculate totals and category summaries.
5. Ask the Expense Advisor agent to explain patterns and recommendations.
6. Return structured analysis plus an advisory response.
