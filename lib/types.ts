// Shape returned by POST /api/chat once Module 02 is implemented.
// The AI is prompted to return JSON matching one of these two shapes,
// regardless of which provider (Groq / Gemini / OpenRouter / Cerebras)
// is configured in lib/ai-provider.ts.

export interface SavingsDecision {
  goalSummary: string;
  targetAmountKes: number;
  targetDateHint: string;
  suggestedDailyKes: number;
  reasoning: string;
}

export interface ClarificationNeeded {
  needsClarification: string;
}

export type ChatResponse = SavingsDecision | ClarificationNeeded;

export function isClarification(
  response: ChatResponse
): response is ClarificationNeeded {
  return "needsClarification" in response;
}

// Shape returned by POST /api/mpesa/stkpush once Module 03 is implemented.
// This mirrors Safaricom's raw response — see workshop/03-daraja-integration.
export interface StkPushResponse {
  MerchantRequestID?: string;
  CheckoutRequestID?: string;
  ResponseCode?: string;
  ResponseDescription?: string;
  CustomerMessage?: string;
  errorCode?: string;
  errorMessage?: string;
}
