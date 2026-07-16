---
name: ai-chat-route
description: Complete Module 02 using the provider-agnostic AI chat skill
agent: agent
tools: [read, edit, search, execute]
---

Implement Module 02 now; do not merely describe the solution or return a code
sample.

Follow [the ai-chat-route skill](../skills/ai-chat-route/SKILL.md). Read
`lib/ai-provider.ts`, `lib/types.ts`, `app/api/chat/route.ts`, and
`components/ChatPanel.tsx`, then:

1. Replace the placeholder in `app/api/chat/route.ts` with a POST route that
   calls `getAIClient()`, asks for the exact `ChatResponse` JSON schema, and
   safely parses the model response.
2. Replace only the `sendMessage()` placeholder in
   `components/ChatPanel.tsx` with a request to `/api/chat`.
3. Preserve `confirmAndSave()` and all Module 03 placeholders.
4. Use the provider abstraction. Gemini is the workshop default, but do not
   hardcode Gemini in the route.
5. Never display, copy, or modify secret values in `.env.local`. You may check
   only whether `AI_PROVIDER` and its matching API-key variable are present.
6. Run `npm run build` after editing. Do not start a persistent development
   server. If dependencies are missing, report `npm install` as the next action
   instead of changing unrelated files.

Finish with a concise summary of the edited files and the manual chat message
the attendee should use to test the decision card.
