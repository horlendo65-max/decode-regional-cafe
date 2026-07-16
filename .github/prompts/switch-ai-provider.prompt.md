---
description: Switch PesaBot to another supported free runtime AI provider
---

Follow [the switch-ai-provider skill](../skills/switch-ai-provider/SKILL.md). First ask which provider to use if the user did not name one. Never display or overwrite an API key, and do not rewrite `app/api/chat/route.ts` when it already uses `getAIClient()`.
