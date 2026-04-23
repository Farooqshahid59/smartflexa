import { NextResponse } from "next/server";

const HF_MODEL = "gpt2";
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;
const REQUEST_TIMEOUT_MS = 8000;

function splitSentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function wordCount(text) {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function mean(values) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function variance(values) {
  if (!values.length) return 0;
  const m = mean(values);
  return values.reduce((sum, v) => sum + (v - m) ** 2, 0) / values.length;
}

function stdDev(values) {
  return Math.sqrt(variance(values));
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function confidenceFrom(aiScore) {
  if (aiScore >= 75 || aiScore <= 25) return "High";
  if (aiScore >= 60 || aiScore <= 40) return "Medium";
  return "Low";
}

async function hfTokenScores(text, token) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        inputs: text.slice(0, 2000),
        parameters: { return_full_text: false, max_new_tokens: 1 },
        options: { wait_for_model: true, use_cache: true },
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`HuggingFace error: ${res.status} ${message}`);
    }

    const data = await res.json();

    const first = Array.isArray(data) ? data[0] : data;
    const details = first?.details;
    const prefill = Array.isArray(details?.prefill) ? details.prefill : [];
    const tokens = prefill
      .map((t) => Number(t?.logprob))
      .filter((n) => Number.isFinite(n));

    if (!tokens.length) return null;

    const probs = tokens.map((lp) => Math.exp(lp));
    const avgProb = mean(probs);
    const perplexityLike = Math.exp(-mean(tokens));
    return { avgProb, perplexityLike };
  } finally {
    clearTimeout(timeout);
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
    if (wc < 100) {
      return NextResponse.json(
        { error: "Text must contain at least 100 words." },
        { status: 400 },
      );
    }

    const hfToken = process.env.HUGGINGFACE_API_KEY;
    if (!hfToken) {
      return NextResponse.json(
        { error: "Server missing HUGGINGFACE_API_KEY." },
        { status: 500 },
      );
    }

    const sentences = splitSentences(text);
    const lengths = sentences.map((s) => wordCount(s)).filter((n) => n > 0);

    const burstiness = lengths.length > 1 ? stdDev(lengths) : 0;
    const burstinessNorm = clamp(burstiness / 12, 0, 1);

    let predictabilityNorm = 0.5;
    const hfMetrics = await hfTokenScores(text, hfToken).catch(() => null);

    if (hfMetrics) {
      const avgProbNorm = clamp(hfMetrics.avgProb, 0, 1);
      const pplNorm = 1 - clamp((hfMetrics.perplexityLike - 1) / 80, 0, 1);
      predictabilityNorm = clamp(0.6 * avgProbNorm + 0.4 * pplNorm, 0, 1);
    }

    const aiLikelihood = clamp(
      0.6 * predictabilityNorm + 0.4 * (1 - burstinessNorm),
      0,
      1,
    );
    const aiScore = Math.round(aiLikelihood * 100);
    const humanScore = 100 - aiScore;
    const confidence = confidenceFrom(aiScore);

    const avgSentenceLen = mean(lengths) || 0;
    const sentenceFlags = sentences.map((s) => {
      const len = wordCount(s);
      const suspicious =
        len > 0 &&
        Math.abs(len - avgSentenceLen) < 2 &&
        burstinessNorm < 0.35 &&
        predictabilityNorm > 0.6;
      return { text: s, suspicious };
    });

    return NextResponse.json({
      aiScore,
      humanScore,
      confidence,
      sentences: sentenceFlags,
    });
  } catch (error) {
    const message =
      error instanceof Error && error.name === "AbortError"
        ? "Inference request timed out."
        : "Failed to process detection request.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
