"use client";

import { useMemo, useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

type ParaphraseMode = "standard" | "creative" | "formal";

const MIN_WORDS = 50;
const MAX_WORDS = 1500;

function countWords(text: string): number {
  return (text.trim().match(/[\w'-]+/g) || []).length;
}

export function AiParaphraserTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<ParaphraseMode>("standard");
  const [variations, setVariations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const words = useMemo(() => countWords(text), [text]);
  const tooShort = words > 0 && words < MIN_WORDS;
  const tooLong = words > MAX_WORDS;
  const canSubmit = words >= MIN_WORDS && words <= MAX_WORDS && !loading;

  async function handleParaphrase() {
    setError("");
    setVariations([]);
    setCopiedIdx(null);

    if (words < MIN_WORDS) {
      setError(`Please enter at least ${MIN_WORDS} words.`);
      return;
    }
    if (words > MAX_WORDS) {
      setError(`Please keep input within ${MAX_WORDS} words.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/paraphrase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to paraphrase text.");
        return;
      }

      const v = Array.isArray(data?.variations)
        ? data.variations.filter((x: unknown): x is string => typeof x === "string" && x.trim().length > 0)
        : [];
      const first = typeof data?.paraphrasedText === "string" ? data.paraphrasedText.trim() : "";
      const merged = [...new Set([first, ...v].filter(Boolean))].slice(0, 3);
      setVariations(merged);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy(index: number, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedIdx(index);
      window.setTimeout(() => setCopiedIdx(null), 1600);
    } catch {
      setCopiedIdx(null);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <label htmlFor="paraphrase-input" className="text-sm font-semibold text-foreground">
        Input text
      </label>
      <textarea
        id="paraphrase-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Paste your paragraph, article excerpt, or draft here..."
        className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{MIN_WORDS}-{MAX_WORDS} words required</span>
        <span>{words} words</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[220px,1fr] sm:items-center">
        <label htmlFor="paraphrase-mode" className="text-sm font-medium text-foreground">
          Mode
        </label>
        <select
          id="paraphrase-mode"
          value={mode}
          onChange={(e) => setMode(e.target.value as ParaphraseMode)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="standard">Standard</option>
          <option value="creative">Creative</option>
          <option value="formal">Formal</option>
        </select>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleParaphrase}
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Paraphrasing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Paraphrase Text
            </>
          )}
        </button>
      </div>

      {tooShort ? (
        <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          Add more text to reach at least {MIN_WORDS} words.
        </p>
      ) : null}
      {tooLong ? (
        <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          Input is too long. Please keep it within {MAX_WORDS} words.
        </p>
      ) : null}
      {error ? (
        <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {variations.length > 0 ? (
        <div className="mt-6 space-y-4">
          {variations.map((v, idx) => (
            <div key={`${idx}-${v.slice(0, 24)}`} className="rounded-lg border border-border bg-muted/20 p-4">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-foreground">
                  {idx === 0 ? "Paraphrased text" : `Variation ${idx + 1}`}
                </h2>
                <button
                  type="button"
                  onClick={() => void handleCopy(idx, v)}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                >
                  {copiedIdx === idx ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  {copiedIdx === idx ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{v}</p>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
