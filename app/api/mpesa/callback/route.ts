import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = body?.Body?.stkCallback;

    if (result?.ResultCode === 0) {
      const items: Array<{ Name: string; Value: unknown }> =
        result.CallbackMetadata?.Item ?? [];
      const amount = items.find((i) => i.Name === "Amount")?.Value;
      const receipt = items.find((i) => i.Name === "MpesaReceiptNumber")?.Value;
      console.log(`Payment received: KES ${amount}, receipt ${receipt}`);
      // MVP: log it. Next iteration: look up the order by
      // result.CheckoutRequestID and mark it paid in a real database.
    } else {
      console.log(`Payment not completed: ${result?.ResultDesc}`);
    }
  } catch (err) {
    console.error("Failed to parse Daraja callback:", err);
  }

  return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" });
}
