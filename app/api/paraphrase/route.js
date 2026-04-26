import { NextResponse } from "next/server";

const HF_MODEL = "Vamsi/T5_Paraphrase_Paws";
const HF_API_URLS = [
  `https://router.huggingface.co/hf-inference/models/${HF_MODEL}`,
  `https://api-inference.huggingface.co/models/${HF_MODEL}`,
];
const REQUEST_TIMEOUT_MS = 5000;
const MIN_WORDS = 50;
const MAX_WORDS = 1500;
const MAX_INPUT_CHARS = 6000;

const MODE_PARAMS = {
  standard: { do_sample: true, top_p: 0.9, temperature: 1.0, num_return_sequences: 2 },
  creative: { do_sample: true, top_p: 0.95, temperature: 1.25, num_return_sequences: 3 },
  formal: { do_sample: true, top_p: 0.85, temperature: 0.85, num_return_sequences: 2 },
};

function wordCount(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function cleanText(raw) {
  if (typeof raw !== "string") return "";
  return raw.replace(/\s+/g, " ").trim();
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

function extractVariations(upstream) {
  const rows = Array.isArray(upstream) ? upstream : [upstream];
  const out = [];
  for (const row of rows) {
    const t =
      cleanText(row?.generated_text || row?.summary_text || row?.text || row?.translation_text || "");
    if (t && !out.includes(t)) out.push(t);
    if (out.length >= 3) break;
  }
  return out;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);
    const text = body?.text;
    const mode = body?.mode;

    if (typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Invalid payload. Expected { text: string, mode?: string }." }, { status: 400 });
    }

    const wc = wordCount(text);
    if (wc < MIN_WORDS) {
      return NextResponse.json({ error: `Text must contain at least ${MIN_WORDS} words.` }, { status: 400 });
    }
    if (wc > MAX_WORDS) {
      return NextResponse.json({ error: `Text must be ${MAX_WORDS} words or fewer.` }, { status: 400 });
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
    const selected = typeof mode === "string" && MODE_PARAMS[mode] ? mode : "standard";
    const params = MODE_PARAMS[selected];

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      let lastStatus = 502;
      let lastError = "No paraphrased text returned by Hugging Face.";

      for (const url of HF_API_URLS) {
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${hfToken}`,
          },
          body: JSON.stringify({
            inputs: `paraphrase: ${clipped}`,
            parameters: {
              ...params,
              max_length: 256,
              min_length: 40,
            },
            options: { wait_for_model: false, use_cache: true },
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
          lastError = `[${url}] ${String(base)}`;
          if (res.status === 404) continue;
          return NextResponse.json({ error: lastError }, { status: res.status });
        }

        const variations = extractVariations(upstream);
        if (variations.length > 0) {
          return NextResponse.json({
            paraphrasedText: variations[0],
            variations,
          });
        }

        lastStatus = 502;
        lastError = `[${url}] No paraphrased text returned by model.`;
      }

      return NextResponse.json({ error: lastError }, { status: lastStatus });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Paraphrasing timed out. Please try shorter text."
        : "Failed to paraphrase text.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
