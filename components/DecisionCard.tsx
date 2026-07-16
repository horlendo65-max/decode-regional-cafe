"use client";

import { useState } from "react";
import type { SavingsDecision } from "@/lib/types";

interface DecisionCardProps {
  decision: SavingsDecision;
  onConfirm: (phone: string) => Promise<void>;
}

export default function DecisionCard({
  decision,
  onConfirm,
}: DecisionCardProps) {
  const [phone, setPhone] = useState("254708374149"); // sandbox test number
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleConfirm() {
    setStatus("sending");
    try {
      await onConfirm(phone);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-pesabrand-green/20 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-pesabrand-dark">
        {decision.goalSummary}
      </p>

      <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <dt className="text-pesabrand-dark/60">Target</dt>
        <dd className="text-right font-semibold">
          KES {decision.targetAmountKes.toLocaleString()}
        </dd>

        <dt className="text-pesabrand-dark/60">By</dt>
        <dd className="text-right">{decision.targetDateHint}</dd>

        <dt className="text-pesabrand-dark/60">Suggested daily saving</dt>
        <dd className="text-right font-semibold text-pesabrand-green">
          KES {decision.suggestedDailyKes.toLocaleString()}
        </dd>
      </dl>

      <p className="mt-2 text-xs text-pesabrand-dark/60">
        {decision.reasoning}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="2547XXXXXXXX"
          className="flex-1 rounded-lg border border-pesabrand-dark/20 px-3 py-2 text-sm"
        />
        <button
          onClick={handleConfirm}
          disabled={status === "sending" || status === "sent"}
          className="rounded-lg bg-pesabrand-green px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {status === "idle" && "Confirm & Save"}
          {status === "sending" && "Sending prompt…"}
          {status === "sent" && "Check your phone"}
          {status === "error" && "Try again"}
        </button>
      </div>
    </div>
  );
}
