import { NextResponse } from "next/server";

const HF_MODEL = "facebook/bart-large-cnn";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
const REQUEST_TIMEOUT_MS = 5000;
const MIN_WORDS = 100;
const MAX_WORDS = 2000;
/** BART CNN context is limited; keep server payload bounded for latency. */
const MAX_INPUT_CHARS = 8000;

const LENGTH_PRESETS = {
  /** Tighter abstract */
  short: { min_length: 24, max_length: 90 },
  /** Matches requested baseline */
  medium: { min_length: 30, max_length: 130 },
  /** Longer recap */
  detailed: { min_length: 60, max_length: 220 },
};

function wordCount(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function cleanSummary(raw) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim();
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const text = body?.text;
    const length = body?.length;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Invalid payload. Expected { text: string, length?: string }." },
        { status: 400 },
      );
    }

    const wc = wordCount(text);
    if (wc < MIN_WORDS) {
      return NextResponse.json(
        { error: `Text must contain at least ${MIN_WORDS} words.` },
        { status: 400 },
      );
    }
    if (wc > MAX_WORDS) {
      return NextResponse.json(
        { error: `Text must be ${MAX_WORDS} words or fewer.` },
        { status: 400 },
      );
    }

    const hfToken =
      process.env.HUGGINGFACE_API_KEY ||
      process.env.HUGGINGFACEHUB_API_TOKEN ||
      process.env.HF_TOKEN;

    if (!hfToken) {
      return NextResponse.json(
        {
          error:
            "Server missing Hugging Face API token. Set HUGGINGFACE_API_KEY (or HUGGINGFACEHUB_API_TOKEN / HF_TOKEN).",
        },
        { status: 500 },
      );
    }

    const params =
      typeof length === "string" && LENGTH_PRESETS[length]
        ? LENGTH_PRESETS[length]
        : LENGTH_PRESETS.medium;

    const clipped = text.length > MAX_INPUT_CHARS ? text.slice(0, MAX_INPUT_CHARS) : text;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const res = await fetch(HF_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${hfToken}`,
        },
        body: JSON.stringify({
          inputs: clipped,
          parameters: {
            max_length: params.max_length,
            min_length: params.min_length,
          },
          options: { wait_for_model: false, use_cache: true },
        }),
        signal: controller.signal,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        const apiError =
          (data && (data.error || data.message)) ||
          `Hugging Face inference failed (${res.status}).`;
        return NextResponse.json({ error: String(apiError) }, { status: res.status });
      }

      const first = Array.isArray(data) ? data[0] : data;
      const summary = cleanSummary(first?.summary_text || first?.generated_text || "");

      if (!summary) {
        return NextResponse.json(
          { error: "No summary returned by model." },
          { status: 502 },
        );
      }

      return NextResponse.json({ summary });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Summarization timed out. Please try again with a shorter excerpt."
        : "Failed to summarize text.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
