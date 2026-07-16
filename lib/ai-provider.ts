// Provider-agnostic AI client for PesaBot.
//
// All four supported free providers expose an OpenAI-compatible
// /chat/completions endpoint, so a single OpenAI SDK client works for
// all of them — only baseURL, apiKey, and model name change. This means
// the app and the GitHub Copilot skill that scaffolds it don't need to
// know or care which free API an attendee signed up for.
//
// Switch providers with one env var — no code changes required:
//   AI_PROVIDER=gemini      (default)
//   AI_PROVIDER=groq
//   AI_PROVIDER=openrouter
//   AI_PROVIDER=cerebras
//
// See workshop/FREE-AI-MODELS.md for how to get a free key for each,
// and for how to override the model without touching this file.

import OpenAI from "openai";

export type AIProviderId = "groq" | "gemini" | "openrouter" | "cerebras";

interface ProviderConfig {
  baseURL: string;
  apiKeyEnv: string;
  /** Env var an attendee can set to override the default model without editing code. */
  modelEnv: string;
  /** Reasonable free-tier default as of mid-2026 — check FREE-AI-MODELS.md, this drifts. */
  defaultModel: string;
}

const PROVIDERS: Record<AIProviderId, ProviderConfig> = {
  groq: {
    baseURL: "https://api.groq.com/openai/v1",
    apiKeyEnv: "GROQ_API_KEY",
    modelEnv: "GROQ_MODEL",
    // llama-3.3-70b-versatile was deprecated by Groq in June 2026 —
    // openai/gpt-oss-120b is their recommended replacement.
    defaultModel: "openai/gpt-oss-120b",
  },
  gemini: {
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKeyEnv: "GEMINI_API_KEY",
    modelEnv: "GEMINI_MODEL",
    defaultModel: "gemini-3.5-flash",
  },
  openrouter: {
    baseURL: "https://openrouter.ai/api/v1",
    apiKeyEnv: "OPENROUTER_API_KEY",
    modelEnv: "OPENROUTER_MODEL",
    // OpenRouter's free catalog changes often — check
    // https://openrouter.ai/models?max_price=0 and override via
    // OPENROUTER_MODEL if this specific id has aged out.
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  cerebras: {
    baseURL: "https://api.cerebras.ai/v1",
    apiKeyEnv: "CEREBRAS_API_KEY",
    modelEnv: "CEREBRAS_MODEL",
    defaultModel: "llama-3.3-70b",
  },
};

function currentProviderId(): AIProviderId {
  const raw = (process.env.AI_PROVIDER ?? "gemini").toLowerCase();
  if (raw in PROVIDERS) return raw as AIProviderId;
  throw new Error(
    `Unknown AI_PROVIDER "${raw}" — expected one of: ${Object.keys(PROVIDERS).join(", ")}`
  );
}

/**
 * Returns an OpenAI SDK client pointed at whichever provider AI_PROVIDER
 * selects, plus the model name to use with it. Call this once per
 * request rather than module-level, so env var changes during local
 * dev (e.g. switching providers) take effect without a restart in most
 * setups.
 */
export function getAIClient(): { client: OpenAI; model: string; provider: AIProviderId } {
  const provider = currentProviderId();
  const config = PROVIDERS[provider];
  const apiKey = process.env[config.apiKeyEnv];

  if (!apiKey) {
    throw new Error(
      `AI_PROVIDER is set to "${provider}" but ${config.apiKeyEnv} is missing from .env.local. ` +
        `See workshop/FREE-AI-MODELS.md for how to get a free key.`
    );
  }

  const client = new OpenAI({ apiKey, baseURL: config.baseURL });
  const model = process.env[config.modelEnv] || config.defaultModel;

  return { client, model, provider };
}
