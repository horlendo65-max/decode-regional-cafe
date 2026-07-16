import { NextRequest, NextResponse } from "next/server";

// TODO (Module 03): parse Safaricom's callback body, log the result
// (or persist it), and ALWAYS return HTTP 200 — Safaricom retries
// aggressively on anything else.
//
// Fastest path: in GitHub Copilot Chat, run `/daraja-callback`.

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  console.log("Daraja callback received (not yet handled):", body);

  // Always 200, even before this is fully implemented, so Safaricom
  // doesn't retry indefinitely during development.
  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
