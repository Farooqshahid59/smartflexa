import { NextResponse } from "next/server";

const HF_MODELS = [
  "google/flan-t5-large",
  "google/flan-t5-base",
  "google/flan-t5-small",
];
const HF_BASE_URLS = [
  "https://router.huggingface.co/hf-inference/models",
  "https://api-inference.huggingface.co/models",
];
const REQUEST_TIMEOUT_MS = 18000;
const MIN_WORDS = 50;
const MAX_WORDS = 1500;
const MAX_INPUT_CHARS = 8000;

function wordCount(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function cleanText(raw) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim();
}

function buildGrammarPrompt(text) {
  return `Fix grammar, improve clarity, and rewrite this text professionally:\n${text}`;
}

function shouldTryNextEndpoint(status, message) {
  if (status === 404) return true;
  if (typeof message !== "string") return false;
  const lower = message.toLowerCase();
  return (
    lower.includes("model not supported by provider") ||
    lower.includes("not supported by provider hf-inference") ||
    lower.includes("cannot post /models/")
  );
}

async function parseUpstreamBody(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const text = body?.text;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json(
        { error: "Invalid payload. Expected { text: string }." },
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

    const clipped = text.length > MAX_INPUT_CHARS ? text.slice(0, MAX_INPUT_CHARS) : text;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      let lastStatus = 502;
      let lastError = "No corrected text returned by Hugging Face.";

      for (const model of HF_MODELS) {
        for (const baseUrl of HF_BASE_URLS) {
          const url = `${baseUrl}/${model}`;
          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${hfToken}`,
            },
            body: JSON.stringify({
              inputs: buildGrammarPrompt(clipped),
              parameters: {
                max_new_tokens: 280,
                temperature: 0.6,
                do_sample: true,
                top_p: 0.9,
              },
              options: { wait_for_model: true, use_cache: true },
            }),
            signal: controller.signal,
          });

          const upstream = await parseUpstreamBody(res);

          if (!res.ok) {
            lastStatus = res.status;
            const base =
              (upstream &&
                typeof upstream === "object" &&
                (upstream.error || upstream.message)) ||
              (typeof upstream === "string" ? upstream : null) ||
              `Hugging Face inference failed (${res.status}).`;
            lastError = `[${model}] [${url}] ${String(base)}`;
            if (shouldTryNextEndpoint(res.status, String(base))) continue;
            return NextResponse.json({ error: lastError }, { status: res.status });
          }

          const first = Array.isArray(upstream) ? upstream[0] : upstream;
          const correctedText = cleanText(
            first?.generated_text || first?.summary_text || first?.text || "",
          );

          if (correctedText) return NextResponse.json({ correctedText });
          lastStatus = 502;
          lastError = `[${model}] [${url}] No corrected text returned by model.`;
        }
      }

      return NextResponse.json({ error: lastError }, { status: lastStatus });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Grammar correction timed out. Please try shorter text."
        : "Failed to correct grammar.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
