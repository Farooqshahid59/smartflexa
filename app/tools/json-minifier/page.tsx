"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

function minifyJson(source: string): string {
  const parsed = JSON.parse(source);
  return JSON.stringify(parsed);
}

export default function JsonMinifierPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const canMinify = input.trim().length > 0;
  const canCopy = output.trim().length > 0;

  const minify = () => {
    setError(null);
    setCopyStatus(null);
    const raw = input.trim();
    if (!raw) {
      setOutput("");
      return;
    }
    try {
      setOutput(minifyJson(raw));
    } catch {
      setOutput("");
      setError(
        "Invalid JSON. Check for missing quotes, trailing commas, or mismatched brackets.",
      );
    }
  };

  const handleCopy = async () => {
    setError(null);
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied output to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Copy failed. Your browser may block clipboard access.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopyStatus(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.jsonMinifier)} />
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
        aria-labelledby="json-minifier-heading"
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
                <span className="text-foreground">JSON Minifier</span>
              </p>
            </nav>

            <h1
              id="json-minifier-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              JSON Minifier Online Free
            </h1>

            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste JSON to remove extra spaces and line breaks. Invalid JSON
              shows a clear error—everything runs in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="json-minifier-heading"
          >
            <div className="space-y-3">
              <label
                htmlFor="json-min-input"
                className="text-sm font-medium text-foreground"
              >
                JSON input
              </label>
              <textarea
                id="json-min-input"
                value={input}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setInput(e.target.value);
                  setCopyStatus(null);
                  setError(null);
                }}
                placeholder='{"a": 1, "b": [2, 3]}'
                spellCheck={false}
                autoComplete="off"
                aria-describedby={inputHintId}
                className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <button
                type="button"
                onClick={minify}
                disabled={!canMinify}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Minify JSON
              </button>
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
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
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

            <div className="mt-8 space-y-3">
              <label
                htmlFor="json-min-output"
                className="text-sm font-medium text-foreground"
              >
                Minified JSON
              </label>
              <textarea
                id="json-min-output"
                value={output}
                readOnly
                aria-describedby={outputHintId}
                placeholder="Minified JSON appears here."
                className="min-h-[220px] w-full resize-y rounded-lg border border-input bg-muted/20 px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="text-xs text-muted-foreground">
                Output is compact <span className="font-mono">JSON.stringify</span>{" "}
                with no extra whitespace.
              </p>
            </div>
          </section>

          <article className="mt-14 space-y-10" aria-labelledby="json-min-seo-heading">
            <h2
              id="json-min-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is JSON Minification?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Minification removes spaces, tabs, and line breaks from JSON text
              while keeping the same data structure. The result is a single
              compact line that is smaller to store and faster to transfer.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Minify JSON
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste your JSON into the input box.</li>
              <li>Click “Minify JSON”.</li>
              <li>Copy the minified output or clear to start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why Use JSON Minifier?
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Smaller payloads for APIs and config files.</li>
              <li>Fewer bytes over the network.</li>
              <li>Same logical content as pretty-printed JSON.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 space-y-4 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <div>
                <p className="font-medium text-foreground">Pretty JSON</p>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap font-mono text-muted-foreground">
                  {`{
  "ok": true,
  "count": 2
}`}
                </pre>
              </div>
              <div>
                <p className="font-medium text-foreground">Minified</p>
                <pre className="mt-2 overflow-x-auto font-mono text-muted-foreground">
                  {`{"ok":true,"count":2}`}
                </pre>
              </div>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is JSON minification?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is the process of deleting unnecessary whitespace from JSON
                  text so the file or string takes less space.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Is it reversible?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. You can parse minified JSON and format it again with a
                  formatter (such as SmartFlexa’s JSON Formatter) to add
                  indentation back.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. The JSON minifier is free to use with no signup required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens in your browser. Your JSON is not uploaded to
                  our servers for this tool.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/json-minifier" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
