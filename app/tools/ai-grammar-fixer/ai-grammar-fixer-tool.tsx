"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

const MIN_WORDS = 50;
const MAX_WORDS = 1500;

type Token = { text: string; isWord: boolean };

function countWords(text: string): number {
  return (text.trim().match(/\b[\w'-]+\b/g) || []).length;
}

function tokenizeForDiff(text: string): Token[] {
  return (text.match(/\w+|\s+|[^\s\w]/g) || []).map((tok) => ({
    text: tok,
    isWord: /^\w+$/.test(tok),
  }));
}

function renderBasicDiff(original: string, corrected: string): ReactNode {
  if (!original || !corrected) return null;
  const a = tokenizeForDiff(original);
  const b = tokenizeForDiff(corrected);
  const out: ReactNode[] = [];

  for (let i = 0; i < b.length; i++) {
    const bt = b[i]!;
    const at = a[i];
    const changed = bt.isWord && (!at || at.text.toLowerCase() !== bt.text.toLowerCase());
    if (changed) {
      out.push(
        <mark
          key={`d-${i}-${bt.text}`}
          className="rounded-sm bg-emerald-200/50 px-0.5 text-foreground dark:bg-emerald-500/25"
        >
          {bt.text}
        </mark>,
      );
    } else {
      out.push(<span key={`d-${i}-${bt.text}`}>{bt.text}</span>);
    }
  }

  return out;
}

export function AiGrammarFixerTool() {
  const [text, setText] = useState("");
  const [correctedText, setCorrectedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const tooShort = words > 0 && words < MIN_WORDS;
  const tooLong = words > MAX_WORDS;
  const canSubmit = words >= MIN_WORDS && words <= MAX_WORDS && !loading;

  async function handleFixGrammar() {
    setError("");
    setCorrectedText("");
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
      const res = await fetch("/api/grammar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to fix grammar.");
        return;
      }
      setCorrectedText(typeof data?.correctedText === "string" ? data.correctedText.trim() : "");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!correctedText) return;
    try {
      await navigator.clipboard.writeText(correctedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <label htmlFor="grammar-input" className="text-sm font-semibold text-foreground">
        Input text
      </label>
      <textarea
        id="grammar-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={12}
        placeholder="Paste your email, blog draft, or document here..."
        className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>
          {MIN_WORDS}-{MAX_WORDS} words required
        </span>
        <span>{words} words</span>
      </div>

      <div className="mt-5">
        <button
          type="button"
          onClick={handleFixGrammar}
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Fixing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Fix Grammar
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

      {correctedText ? (
        <div className="mt-6 space-y-4 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Corrected text</h2>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">{correctedText}</p>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Changes (basic highlight)
            </h3>
            <div className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-background p-3 text-sm leading-relaxed text-foreground">
              {renderBasicDiff(text, correctedText)}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
