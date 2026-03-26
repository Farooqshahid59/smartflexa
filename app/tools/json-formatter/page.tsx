"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

const EXAMPLE_RAW = `{"name":"SmartFlexa","tools":["JSON","Image","PDF"],"active":true,"meta":{"version":1}}`;

const EXAMPLE_FORMATTED = `{
  "name": "SmartFlexa",
  "tools": [
    "JSON",
    "Image",
    "PDF"
  ],
  "active": true,
  "meta": {
    "version": 1
  }
}`;

function JsonLine({ line }: { line: string }) {
  const trimmed = line.trimStart();
  const indent = line.length - trimmed.length;
  const pad = " ".repeat(indent);

  if (/^".*":\s/.test(trimmed)) {
    const colon = trimmed.indexOf(":");
    const key = trimmed.slice(0, colon + 1);
    const rest = trimmed.slice(colon + 1);
    return (
      <span className="block font-mono text-sm leading-relaxed">
        <span className="text-muted-foreground">{pad}</span>
        <span className="text-sky-700 dark:text-sky-400">{key}</span>
        <span className="text-foreground">{rest}</span>
      </span>
    );
  }

  return (
    <span className="block font-mono text-sm leading-relaxed text-foreground">
      {line || " "}
    </span>
  );
}

function FormattedPreview({
  text,
  id,
}: {
  text: string;
  id: string;
}) {
  const lines = text.split("\n");
  return (
    <div
      id={id}
      className="max-h-80 overflow-auto rounded-lg border border-border bg-muted/40 p-4"
      role="region"
      aria-label="Formatted JSON output"
      tabIndex={0}
    >
      {lines.map((line, i) => (
        <JsonLine key={`${i}-${line.slice(0, 24)}`} line={line} />
      ))}
    </div>
  );
}

export default function JsonFormatterPage() {
  const inputHintId = useId();
  const shortcutHintId = useId();
  const errorId = useId();
  const outputHeadingId = useId();
  const outputRegionId = useId();
  const statusId = useId();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const copyStatusClearRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyStatusClearRef.current) {
        window.clearTimeout(copyStatusClearRef.current);
      }
    };
  }, []);

  const formatJson = useCallback(() => {
    setError(null);
    setCopyStatus(null);
    const raw = input.trim();
    if (!raw) {
      setOutput("");
      setError("Paste some JSON first, then tap Format JSON.");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch {
      setOutput("");
      setError(
        "That doesn’t look like valid JSON. Check for missing quotes, trailing commas, or brackets.",
      );
    }
  }, [input]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setCopyStatus(null);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Copied to clipboard.");
      setError(null);
      if (copyStatusClearRef.current) {
        window.clearTimeout(copyStatusClearRef.current);
      }
      copyStatusClearRef.current = window.setTimeout(() => {
        setCopyStatus(null);
        copyStatusClearRef.current = null;
      }, 4000);
    } catch {
      setCopyStatus(null);
      setError("Could not copy to clipboard. Try selecting the text manually.");
    }
  };

  const inputDescribedBy = [inputHintId, shortcutHintId, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex min-h-screen flex-col">
      <JsonLd data={getToolPageJsonLd(toolSchemas.jsonFormatter)} />
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
        aria-labelledby="json-formatter-heading"
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
                <span className="text-foreground">JSON Formatter</span>
              </p>
            </nav>
            <h1
              id="json-formatter-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              JSON Formatter
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Paste JSON, format it with clean indentation, and copy the result.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="json-formatter-heading"
          >
            <label
              htmlFor="json-input"
              className="text-sm font-medium text-foreground"
            >
              Input
            </label>
            <textarea
              id="json-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  (e.ctrlKey || e.metaKey) &&
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();
                  formatJson();
                }
              }}
              placeholder='{"hello":"world"}'
              spellCheck={false}
              autoComplete="off"
              aria-invalid={Boolean(error)}
              aria-describedby={inputDescribedBy}
              className="mt-2 min-h-[200px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <p
              id={shortcutHintId}
              className="mt-1.5 text-xs leading-relaxed text-muted-foreground"
            >
              Tip: press{" "}
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                Ctrl
              </kbd>
              +
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                Enter
              </kbd>{" "}
              or{" "}
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                ⌘
              </kbd>
              +
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.7rem] text-foreground">
                Enter
              </kbd>{" "}
              to format.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={formatJson}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Format JSON
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Clear
              </button>
            </div>

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            ) : null}

            <p id={statusId} className="sr-only" aria-live="polite">
              {copyStatus ?? ""}
            </p>

            <div className="mt-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2
                  id={outputHeadingId}
                  className="text-sm font-medium text-foreground"
                >
                  Output
                </h2>
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  aria-label={
                    output
                      ? undefined
                      : "Copy to clipboard (format JSON first)"
                  }
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Copy to clipboard
                </button>
              </div>
              <div className="mt-2">
                {output ? (
                  <FormattedPreview text={output} id={outputRegionId} />
                ) : (
                  <div
                    className="rounded-lg border border-dashed border-border bg-muted/20 px-4 py-12 text-center text-sm text-muted-foreground"
                    role="status"
                    aria-live="polite"
                  >
                    Formatted JSON will show here.
                  </div>
                )}
              </div>
            </div>
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="article-about-json-formatter"
          >
            <h2
              id="article-about-json-formatter"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is a JSON Formatter?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              A JSON formatter takes compact or messy JSON text and rewrites it
              with consistent indentation and line breaks so it is easier to read,
              review, and share. It does not change the data—only how it is
              presented.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Use
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste your JSON into the input box above.</li>
              <li>Click &quot;Format JSON&quot; to pretty-print with 2-space indentation.</li>
              <li>Review the output below. Fix any errors shown if the JSON is invalid.</li>
              <li>Use &quot;Copy to clipboard&quot; to paste the formatted result elsewhere.</li>
              <li>Use &quot;Clear&quot; to reset both input and output.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              Raw (minified) JSON:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm">
              {EXAMPLE_RAW}
            </pre>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Formatted:
            </p>
            <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted/40 p-4 font-mono text-xs text-foreground sm:text-sm whitespace-pre">
              {EXAMPLE_FORMATTED}
            </pre>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              FAQ
            </h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">What is JSON?</dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  JSON (JavaScript Object Notation) is a lightweight text format
                  for structured data. Objects use curly braces, arrays use square
                  brackets, and values can be strings, numbers, booleans, null,
                  arrays, or nested objects.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa’s JSON Formatter is free to use in your browser
                  with no signup required for basic formatting.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Formatting runs in your browser. Your JSON is not sent to a
                  server for this page. Avoid pasting secrets or production
                  credentials into any online tool if your policy forbids it.
                </dd>
              </div>
            </dl>

            <RelatedTools currentPath="/tools/json-formatter" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
