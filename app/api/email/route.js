import { NextResponse } from "next/server";

const HF_MODELS = [
  // Known hosted model fallback (works in this environment).
  "facebook/bart-large-cnn",
  "google/flan-t5-large",
  // Fallbacks when large is not available on current provider path.
  "google/flan-t5-base",
  "google/flan-t5-small",
];
const HF_BASE_URLS = [
  "https://router.huggingface.co/hf-inference/models",
  "https://api-inference.huggingface.co/models",
];
const REQUEST_TIMEOUT_MS = 18000;
const MIN_WORDS = 10;
const MAX_WORDS = 600;
const MAX_INPUT_CHARS = 3500;

function wordCount(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function cleanText(raw) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim();
}

function promptFor({ text, purpose, tone }) {
  const safeTone = ["professional", "friendly", "formal", "short"].includes(tone)
    ? tone
    : "professional";
  const safePurpose = ["reply", "new"].includes(purpose) ? purpose : "new";

  return [
    `Write a complete ${safeTone} ${safePurpose === "reply" ? "email reply" : "new email"}.`,
    "Include a greeting, concise body, and clear closing.",
    "Keep it practical and ready to send.",
    `Email context: ${text}`,
  ].join("\n");
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

function extractEmail(upstream) {
  const rows = Array.isArray(upstream) ? upstream : [upstream];
  for (const row of rows) {
    const out = cleanText(row?.generated_text || row?.summary_text || row?.text || "");
    if (out) return out;
  }
  return "";
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

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const text = typeof body?.text === "string" ? body.text.trim() : "";
    const tone = typeof body?.tone === "string" ? body.tone.toLowerCase() : "professional";
    const purpose = typeof body?.purpose === "string" ? body.purpose.toLowerCase() : "new";

    if (!text) {
      return NextResponse.json({ error: "Invalid payload. Expected { text: string, tone?: string, purpose?: string }." }, { status: 400 });
    }

    const wc = wordCount(text);
    if (wc < MIN_WORDS) {
      return NextResponse.json({ error: `Please provide at least ${MIN_WORDS} words of context.` }, { status: 400 });
    }
    if (wc > MAX_WORDS) {
      return NextResponse.json({ error: `Please keep context to ${MAX_WORDS} words or fewer.` }, { status: 400 });
    }

    const hfToken =
      process.env.HUGGINGFACE_API_KEY ||
      process.env.HUGGINGFACEHUB_API_TOKEN ||
      process.env.HF_TOKEN;

    if (!hfToken) {
      return NextResponse.json({ error: "Server missing Hugging Face API token. Set HUGGINGFACE_API_KEY (or HUGGINGFACEHUB_API_TOKEN / HF_TOKEN)." }, { status: 500 });
    }

    const clipped = text.length > MAX_INPUT_CHARS ? text.slice(0, MAX_INPUT_CHARS) : text;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      let lastStatus = 502;
      let lastError = "No email text returned by model.";

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
              inputs: promptFor({ text: clipped, purpose, tone }),
              parameters: {
                max_new_tokens: 240,
                temperature: tone === "short" ? 0.7 : 0.85,
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
              (upstream && typeof upstream === "object" && (upstream.error || upstream.message)) ||
              (typeof upstream === "string" ? upstream : null) ||
              `Hugging Face inference failed (${res.status}).`;
            lastError = `[${model}] [${url}] ${String(base)}`;
            if (shouldTryNextEndpoint(res.status, String(base))) continue;
            return NextResponse.json({ error: lastError }, { status: res.status });
          }

          const email = extractEmail(upstream);
          if (email) return NextResponse.json({ email });

          lastStatus = 502;
          lastError = `[${model}] [${url}] No email text returned by model.`;
        }
      }

      return NextResponse.json({ error: lastError }, { status: lastStatus });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Email generation timed out. Please try shorter context."
        : "Failed to generate email.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
