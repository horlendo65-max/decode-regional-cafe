import { NextRequest, NextResponse } from "next/server";
import { getAIClient } from "@/lib/ai-provider";

const SYSTEM_PROMPT = `You are PesaBot, a friendly savings assistant for Kenyan users.
Given a user's goal in free text, respond ONLY with JSON matching this exact shape,
no markdown, no commentary:

{
  "goalSummary": string,
  "targetAmountKes": number,
  "targetDateHint": string,
  "suggestedDailyKes": number,
  "reasoning": string
}

If the user hasn't given enough detail to compute this, ask ONE clarifying
question instead, as JSON: { "needsClarification": string }`;

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const { client, model } = getAIClient();

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    temperature: 0.3,
    response_format: { type: "json_object" },
  });

  const raw = completion.choices[0]?.message?.content ?? "{}";

  try {
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json(
      { needsClarification: "Sorry, could you rephrase your savings goal?" },
      { status: 200 },
    );
  }
}
