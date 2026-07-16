---
name: create-domain-skill
description: Create or update a reusable application skill for parsing, validation, categorization, calculations, summarization, payment, or another single-purpose capability in the workshop API.
---

# Create a reusable domain skill

## Rules
- A skill performs one focused task.
- Prefer deterministic TypeScript for parsing, validation, categorization, and calculations.
- Use the AI provider only when interpretation or natural-language generation is required.
- Do not access Express request or response objects inside a skill.
- Use typed inputs and outputs.
- Return data rather than formatted HTTP responses.

## Procedure
1. Read `starter/api/src/types.ts` and existing skills.
2. Choose a verb-based file name ending in `.skill.ts`.
3. Define explicit input and output types.
4. Implement one exported function or class with no global mutable state.
5. Handle empty and malformed inputs.
6. Add a short usage example to the relevant workflow or workshop guide.
7. Run `npm run build` in `starter/api`.

## Example shape
```ts
export interface SkillInput {
  value: string;
}

export interface SkillResult {
  normalizedValue: string;
}

export function runExampleSkill(input: SkillInput): SkillResult {
  return { normalizedValue: input.value.trim() };
}
```
