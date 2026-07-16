import { NextRequest, NextResponse } from "next/server";
import {
  getAccessToken,
  darajaTimestamp,
  darajaPassword,
  DARAJA_BASE_URL,
} from "@/lib/daraja";

export async function POST(req: NextRequest) {
  const { phone, amountKes, goalSummary } = await req.json();

  if (!phone || typeof amountKes !== "number") {
    return NextResponse.json(
      {
        errorCode: "INVALID_INPUT",
        errorMessage: "phone and amountKes are required",
      },
      { status: 400 },
    );
  }

  const token = await getAccessToken();
  const timestamp = darajaTimestamp();
  const shortcode = process.env.MPESA_SHORTCODE!;
  const password = darajaPassword(
    shortcode,
    process.env.MPESA_PASSKEY!,
    timestamp,
  );

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.max(1, Math.round(amountKes)),
    PartyA: phone,
    PartyB: shortcode,
    PhoneNumber: phone,
    CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
    AccountReference: "PesaBot",
    TransactionDesc: (goalSummary ?? "Savings").slice(0, 20),
  };

  const res = await fetch(
    `${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();
  return NextResponse.json(data);
}
