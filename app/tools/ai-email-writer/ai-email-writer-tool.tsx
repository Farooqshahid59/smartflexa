"use client";

import { useMemo, useState } from "react";
import { Check, Copy, RefreshCw, Sparkles } from "lucide-react";

type EmailPurpose = "reply" | "new";
type EmailTone = "professional" | "friendly" | "formal" | "short";

const MIN_WORDS = 10;
const MAX_WORDS = 600;

function countWords(text: string): number {
  return (text.trim().match(/[\w'-]+/g) || []).length;
}

export function AiEmailWriterTool() {
  const [text, setText] = useState("");
  const [purpose, setPurpose] = useState<EmailPurpose>("reply");
  const [tone, setTone] = useState<EmailTone>("professional");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const words = useMemo(() => countWords(text), [text]);
  const tooShort = words > 0 && words < MIN_WORDS;
  const tooLong = words > MAX_WORDS;
  const canSubmit = words >= MIN_WORDS && words <= MAX_WORDS && !loading;

  async function generateEmail() {
    setError("");
    setEmail("");
    setCopied(false);

    if (words < MIN_WORDS) {
      setError(`Please add at least ${MIN_WORDS} words of context.`);
      return;
    }
    if (words > MAX_WORDS) {
      setError(`Please keep context within ${MAX_WORDS} words.`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone, purpose }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || "Failed to generate email.");
        return;
      }
      if (typeof data?.email !== "string" || !data.email.trim()) {
        setError("No email generated. Please try again.");
        return;
      }
      setEmail(data.email.trim());
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <label htmlFor="email-context" className="text-sm font-semibold text-foreground">Email context</label>
      <textarea
        id="email-context"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={11}
        placeholder="Describe the situation, recipient, goals, and key points to include..."
        className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
        <span>{MIN_WORDS}-{MAX_WORDS} words required</span>
        <span>{words} words</span>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="email-purpose" className="text-sm font-medium text-foreground">Purpose</label>
          <select
            id="email-purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as EmailPurpose)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="reply">Reply</option>
            <option value="new">New email</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="email-tone" className="text-sm font-medium text-foreground">Tone</label>
          <select
            id="email-tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as EmailTone)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
          >
            <option value="professional">Professional</option>
            <option value="friendly">Friendly</option>
            <option value="formal">Formal</option>
            <option value="short">Short</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={generateEmail}
          disabled={!canSubmit}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              Generate Email
            </>
          )}
        </button>

        {email ? (
          <button
            type="button"
            onClick={generateEmail}
            disabled={loading}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className="h-4 w-4" aria-hidden />
            Regenerate
          </button>
        ) : null}
      </div>

      {tooShort ? <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">Add more context to reach at least {MIN_WORDS} words.</p> : null}
      {tooLong ? <p className="mt-3 rounded-lg border border-amber-400/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300">Context is too long. Keep it within {MAX_WORDS} words.</p> : null}
      {error ? <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p> : null}

      {email ? (
        <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold text-foreground">Generated email</h2>
            <button
              type="button"
              onClick={() => void copyEmail()}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
            >
              {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">{email}</pre>
        </div>
      ) : null}
    </section>
  );
}
