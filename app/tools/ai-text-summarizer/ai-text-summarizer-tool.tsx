"use client";

import { useMemo, useState } from "react";
import { Copy, Sparkles } from "lucide-react";

type SummaryLength = "short" | "medium" | "detailed";

const MIN_WORDS = 100;
const MAX_WORDS = 2000;

function countWords(text: string): number {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

export function AiTextSummarizerTool() {
  const [text, setText] = useState("");
  const [summaryLength, setSummaryLength] = useState<SummaryLength>("medium");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const tooShort = words > 0 && words < MIN_WORDS;
  const tooLong = words > MAX_WORDS;
  const canSubmit = words >= MIN_WORDS && words <= MAX_WORDS && !loading;

  async function handleSummarize() {
    setError("");
    setSummary("");
    setCopied(false);

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
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, length: summaryLength }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to summarize text.");
        return;
      }
      setSummary(typeof data?.summary === "string" ? data.summary.trim() : "");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <label htmlFor="summarizer-input" className="text-sm font-semibold text-foreground">
        Input text
      </label>
      <textarea
        id="summarizer-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Paste your article, notes, or long content here..."
        className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {MIN_WORDS}-{MAX_WORDS} words recommended
        </span>
        <span>{words} words</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[220px,1fr] sm:items-center">
        <label htmlFor="summary-length" className="text-sm font-medium text-foreground">
          Summary length
        </label>
        <select
          id="summary-length"
          value={summaryLength}
          onChange={(e) => setSummaryLength(e.target.value as SummaryLength)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="detailed">Detailed</option>
        </select>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleSummarize}
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Summarizing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Summarize
            </>
          )}
        </button>
      </div>

      {tooShort ? (
        <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">
          Add more text to reach the minimum {MIN_WORDS} words.
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

      {summary ? (
        <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Summary</h2>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
            >
              <Copy className="h-3.5 w-3.5" aria-hidden />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{summary}</p>
        </div>
      ) : null}
    </section>
  );
}
