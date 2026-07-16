import { NextRequest, NextResponse } from "next/server";

// TODO (Module 03): get a Daraja OAuth token (lib/daraja.ts), build the
// STK Push payload, POST it to the Daraja sandbox, and return the result.
//
// Fastest path: in GitHub Copilot Chat, run `/daraja-stk-push`. It knows
// the OAuth flow, the password/timestamp format, and the payload shape
// from workshop/03-daraja-integration/README.md.

export async function POST(req: NextRequest) {
  const { phone, amountKes, goalSummary } = await req.json();

  return NextResponse.json(
    {
      errorCode: "NOT_IMPLEMENTED",
      errorMessage:
        "This route isn't implemented yet — see Module 03 in the workshop guide.",
    },
    { status: 501 }
  );
}
