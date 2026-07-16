import { NextRequest, NextResponse } from "next/server";

// TODO (Module 02): call getAIClient() from lib/ai-provider.ts with a
// system prompt that returns structured JSON matching
// lib/types.ts -> ChatResponse. This works unchanged regardless of
// which free provider (Groq/Gemini/OpenRouter/Cerebras) is configured
// via AI_PROVIDER in .env.local.
//
// Fastest path: in Claude Code, run the `ai-chat-route` skill and describe
// what you're building ("turn a savings goal into a daily savings plan").
// It will scaffold this route using lib/ai-provider.ts and the
// SYSTEM_PROMPT pattern from workshop/02-ai-integration/README.md.

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  return NextResponse.json(
    {
      needsClarification:
        "This route isn't implemented yet — see Module 02 in the workshop guide.",
    },
    { status: 200 }
  );
}
