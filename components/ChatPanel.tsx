"use client";

import { useState } from "react";
import DecisionCard from "./DecisionCard";
import {
  isClarification,
  type ChatResponse,
  type SavingsDecision,
} from "@/lib/types";

type Message =
  | { role: "user"; text: string }
  | { role: "bot"; text: string }
  | { role: "decision"; decision: SavingsDecision };

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! What are you saving for, and by when?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text }]);
    setLoading(true);

    try {
      const decision = await sendMessage(text);
      if (isClarification(decision)) {
        setMessages((m) => [
          ...m,
          { role: "bot", text: decision.needsClarification },
        ]);
      } else {
        setMessages((m) => [...m, { role: "decision", decision }]);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Something went wrong talking to the AI. Check the console." },
      ]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm(decision: SavingsDecision, phone: string) {
    await confirmAndSave(decision, phone);
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {messages.map((msg, i) => {
          if (msg.role === "decision") {
            return (
              <DecisionCard
                key={i}
                decision={msg.decision}
                onConfirm={(phone) => handleConfirm(msg.decision, phone)}
              />
            );
          }
          return (
            <div
              key={i}
              className={
                msg.role === "user"
                  ? "self-end rounded-2xl bg-pesabrand-green px-4 py-2 text-sm text-white"
                  : "self-start rounded-2xl bg-white px-4 py-2 text-sm shadow-sm"
              }
            >
              {msg.text}
            </div>
          );
        })}
        {loading && (
          <div className="self-start text-xs text-pesabrand-dark/50">
            PesaBot is thinking…
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="I want to save 5000 for..."
          className="flex-1 rounded-lg border border-pesabrand-dark/20 px-3 py-2 text-sm"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="rounded-lg bg-pesabrand-dark px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// TODO (Module 02): implement this to POST { message: text } to /api/chat
// and return the parsed ChatResponse JSON.
// Run `/ai-chat-route` in GitHub Copilot Chat, or see
// workshop/02-ai-integration/README.md, for the exact shape to wire up.
// Works the same regardless of which AI_PROVIDER is configured server-side.
// ---------------------------------------------------------------------------
async function sendMessage(text: string): Promise<ChatResponse> {
  throw new Error("sendMessage() not implemented yet — see Module 02");
}

// ---------------------------------------------------------------------------
// TODO (Module 03): implement this to POST
// { phone, amountKes: decision.suggestedDailyKes, goalSummary: decision.goalSummary }
// to /api/mpesa/stkpush.
// Run `/daraja-stk-push` in GitHub Copilot Chat, or see
// workshop/03-daraja-integration/README.md, for the exact shape to wire up.
// ---------------------------------------------------------------------------
async function confirmAndSave(
  decision: SavingsDecision,
  phone: string
): Promise<void> {
  throw new Error("confirmAndSave() not implemented yet — see Module 03");
}
