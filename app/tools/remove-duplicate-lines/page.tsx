"use client";

import { ChangeEvent, useId, useMemo, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { DiffInboundLinks } from "@/components/diff-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function formatLineKey(line: string, caseSensitive: boolean): string {
  return caseSensitive ? line : line.toLowerCase();
}

function removeDuplicateLines(text: string, caseSensitive: boolean): string {
  const lines = text.split(/\r?\n/);
  const seen = new Set<string>();
  const out: string[] = [];

  for (const line of lines) {
    const key = formatLineKey(line, caseSensitive);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(line);
  }

  return out.join("\n");
}

function formatKB(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

export default function RemoveDuplicateLinesPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const inputBytes = useMemo(() => {
    // Rough estimate: UTF-8 bytes are not trivial; encode is acceptable here.
    try {
      return new TextEncoder().encode(inputText).byteLength;
    } catch {
      return inputText.length;
    }
  }, [inputText]);

  const canRemove = inputText.trim().length > 0 && !isRemoving;
  const canCopy = outputText.trim().length > 0;

  const doRemove = async () => {
    setError(null);
    setCopyStatus(null);
    setIsRemoving(true);
    try {
      const result = removeDuplicateLines(inputText, caseSensitive);
      setOutputText(result);
    } catch {
      setError("Failed to remove duplicates. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCopy = async () => {
    setCopyStatus(null);
    setError(null);
    if (!outputText.trim()) return;

    try {
      await navigator.clipboard.writeText(outputText);
      setCopyStatus("Copied output to clipboard.");
    } catch {
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const clearInput = () => {
    setInputText("");
    setOutputText("");
    setError(null);
    setCopyStatus(null);
  };

  const clearOutput = () => {
    setOutputText("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.removeDuplicateLines)} />
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground opacity-0 transition focus:translate-y-0 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      <Header />
      <main
        id="main-content"
        className="flex-1 bg-background"
        aria-labelledby="remove-duplicate-lines-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mb-8 text-center sm:text-left">
            <nav aria-label="Breadcrumb">
              <p className="text-sm font-medium text-muted-foreground">
                <a href="/" className="hover:text-foreground">
                  Home
                </a>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span>Tools</span>
                <span className="mx-2 text-border" aria-hidden>
                  /
                </span>
                <span className="text-foreground">Remove Duplicate Lines</span>
              </p>
            </nav>

            <h1
              id="remove-duplicate-lines-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              Remove Duplicate Lines Online Free
            </h1>

            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste text and remove repeated lines while preserving order. Choose
              case sensitivity if you want exact vs. relaxed matching.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="remove-duplicate-lines-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="dedupe-input"
                className="text-sm font-medium text-foreground"
              >
                Input text
              </label>
              <textarea
                id="dedupe-input"
                value={inputText}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setInputText(e.target.value)
                }
                placeholder="Paste your lines here..."
                spellCheck={false}
                autoComplete="off"
                aria-describedby={inputHintId}
                className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="text-xs text-muted-foreground">
                Approx. {formatKB(inputBytes)} · Processing preserves the first
                occurrence of each unique line.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                <input
                  type="checkbox"
                  checked={caseSensitive}
                  onChange={(e) => setCaseSensitive(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-ring"
                />
                Case sensitive
              </label>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void doRemove()}
                  disabled={!canRemove}
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isRemoving ? "Removing…" : "Remove Duplicates"}
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <label
                htmlFor="dedupe-output"
                className="text-sm font-medium text-foreground"
              >
                Output (duplicates removed)
              </label>
              <textarea
                id="dedupe-output"
                value={outputText}
                readOnly
                aria-describedby={outputHintId}
                className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-muted/20 px-4 py-3 text-base text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                Empty until you click “Remove Duplicates”.
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={() => void handleCopy()}
                disabled={!canCopy}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Copy output
              </button>

              <button
                type="button"
                onClick={clearOutput}
                disabled={!outputText.trim()}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear output
              </button>

              <button
                type="button"
                onClick={clearInput}
                disabled={isRemoving}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear input
              </button>
            </div>

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="dedupe-seo-heading">
            <h2
              id="dedupe-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is Duplicate Line Removal?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Duplicate line removal is the process of deleting repeated lines from
              a block of text while keeping the first occurrence and preserving the
              original order.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Remove Duplicate Lines
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste your lines into the input textarea.</li>
              <li>Toggle “Case sensitive” if needed.</li>
              <li>Click “Remove Duplicates”.</li>
              <li>Copy the cleaned output or clear and try a new input.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Use Cases
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Cleaning up data exports and lists.</li>
              <li>Removing repeated entries from logs.</li>
              <li>De-duplicating usernames, IDs, or URLs.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">Example</h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <p className="font-medium text-foreground">Input</p>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                {"hello\nworld\nhello\nWorld"}
              </pre>
              <p className="mt-4 font-medium text-foreground">Output</p>
              <pre className="mt-2 whitespace-pre-wrap text-muted-foreground">
                {"hello\nworld\nWorld"}
              </pre>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  How does duplicate removal work?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  The tool keeps the first occurrence of each unique line. Matching
                  is either exact or case-insensitive depending on your toggle.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is this tool free?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa removes duplicate lines for free in your browser.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is my data secure?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes—processing happens in your browser. Your text is not uploaded
                  to a backend service for this tool.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Does it preserve order?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. The output order matches the first time each unique line
                  appears in the input.
                </dd>
              </div>
            </dl>

            <DiffInboundLinks />
            <RelatedTools currentPath="/tools/remove-duplicate-lines" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}

