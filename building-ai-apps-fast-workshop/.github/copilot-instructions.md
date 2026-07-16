# Repository coding instructions
- Use TypeScript strict mode and small single-purpose files.
- Preserve the Agent → Skills → Workflow separation.
- Money parsing and arithmetic must remain deterministic; do not ask the model to calculate source-of-truth totals.
- Never expose Gemini or Daraja secrets to the Next.js browser bundle.
- Return structured JSON from the API and validate external/model input with Zod.
- Use Kenyan context respectfully; do not present educational output as professional financial advice.
- Keep changes scoped to the participant's requested lab step.
