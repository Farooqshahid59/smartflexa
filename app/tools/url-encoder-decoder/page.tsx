"use client";

import { ChangeEvent, useId, useState } from "react";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { MetaTagInboundLinks } from "@/components/meta-tag-inbound-links";
import { RelatedTools } from "@/components/related-tools";
import { getToolPageJsonLd, toolSchemas } from "@/lib/schema";

export default function UrlEncoderDecoderPage() {
  const inputHintId = useId();
  const outputHintId = useId();
  const errorId = useId();
  const copyStatusId = useId();

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const hasInput = input.trim().length > 0;
  const canCopy = output.length > 0;

  const inputDescribedBy = [inputHintId, error ? errorId : null]
    .filter(Boolean)
    .join(" ");

  const handleEncode = () => {
    setCopyStatus(null);
    setError(null);
    if (!input.trim()) {
      setOutput("");
      return;
    }
    setOutput(encodeURIComponent(input));
  };

  const handleDecode = () => {
    setCopyStatus(null);
    if (!input.trim()) {
      setOutput("");
      setError(null);
      return;
    }
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch {
      setOutput("");
      setError(
        "Invalid encoded text. Check for malformed percent-sequences (e.g. incomplete %XX) and try again.",
      );
    }
  };

  const handleCopy = async () => {
    setError(null);
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopyStatus("Output copied to clipboard.");
    } catch {
      setCopyStatus(null);
      setError("Could not copy output. Please copy it manually.");
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
      <JsonLd data={getToolPageJsonLd(toolSchemas.urlEncoderDecoder)} />
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
        aria-labelledby="url-encoder-heading"
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
                <span className="text-foreground">URL Encoder Decoder</span>
              </p>
            </nav>
            <h1
              id="url-encoder-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              URL Encoder and Decoder Online Free
            </h1>
            <p
              id={inputHintId}
              className="mt-2 max-w-2xl text-base text-muted-foreground sm:text-lg"
            >
              Encode text for safe use in URLs, or decode percent-encoded strings
              back to plain text. Runs entirely in your browser.
            </p>
          </div>

          <section
            className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-8"
            aria-labelledby="url-encoder-heading"
          >
            <label
              htmlFor="url-input"
              className="text-sm font-medium text-foreground"
            >
              Input
            </label>
            <textarea
              id="url-input"
              value={input}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                setInput(e.target.value);
                setCopyStatus(null);
                setError(null);
              }}
              placeholder="Paste text, a query value, or percent-encoded string..."
              autoComplete="off"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={inputDescribedBy}
              className="mt-2 min-h-[180px] w-full resize-y rounded-lg border border-input bg-background px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={handleEncode}
                disabled={!hasInput}
                className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Encode URL
              </button>
              <button
                type="button"
                onClick={handleDecode}
                disabled={!hasInput}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Decode URL
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

            {error ? (
              <p
                id={errorId}
                className="mt-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            {copyStatus ? (
              <p
                id={copyStatusId}
                className="mt-4 text-sm text-foreground"
                role="status"
              >
                {copyStatus}
              </p>
            ) : null}

            <div className="mt-8">
              <label
                htmlFor="url-output"
                className="text-sm font-medium text-foreground"
              >
                Output
              </label>
              <textarea
                id="url-output"
                value={output}
                readOnly
                aria-describedby={outputHintId}
                placeholder="Encoded or decoded result appears here."
                className="mt-2 min-h-[180px] w-full resize-y rounded-lg border border-border bg-muted/20 px-4 py-3 font-mono text-sm text-foreground shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p id={outputHintId} className="mt-2 text-xs text-muted-foreground">
                Uses JavaScript{" "}
                <span className="font-mono text-foreground">
                  encodeURIComponent
                </span>{" "}
                and{" "}
                <span className="font-mono text-foreground">
                  decodeURIComponent
                </span>
                .
              </p>
            </div>
          </section>

          <article
            className="mt-14 space-y-10"
            aria-labelledby="url-seo-heading"
          >
            <h2
              id="url-seo-heading"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              What is URL Encoding?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              URL encoding (percent-encoding) replaces unsafe or reserved
              characters with a{" "}
              <span className="font-mono text-foreground">%</span> followed by two
              hex digits—for example, a space becomes{" "}
              <span className="font-mono text-foreground">%20</span>. That keeps
              data safe when it is placed inside query strings and paths.
            </p>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              How to Encode and Decode URLs
            </h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Paste the text or encoded string you want to convert.</li>
              <li>
                Click <strong className="text-foreground">Encode URL</strong> to
                apply percent-encoding.
              </li>
              <li>
                Click <strong className="text-foreground">Decode URL</strong> to
                turn percent-encoded text back into readable characters.
              </li>
              <li>Copy the result or clear both fields to start over.</li>
            </ol>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Why URL Encoding is Important
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-muted-foreground">
              <li>Keeps spaces, symbols, and unicode safe inside URLs.</li>
              <li>Reduces broken links when sharing query parameters.</li>
              <li>Helps servers and APIs interpret values predictably.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Example
            </h2>
            <div className="mt-3 rounded-lg border border-border bg-muted/20 p-4 text-sm">
              <p className="font-medium text-foreground">Normal text</p>
              <pre className="mt-2 overflow-x-auto font-mono text-muted-foreground">
                hello world &amp; more
              </pre>
              <p className="mt-4 font-medium text-foreground">Encoded</p>
              <pre className="mt-2 overflow-x-auto font-mono text-muted-foreground">
                hello%20world%20%26%20more
              </pre>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-foreground">FAQ</h2>
            <dl className="mt-4 space-y-6">
              <div>
                <dt className="font-semibold text-foreground">
                  What is URL encoding used for?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  It is used to put arbitrary text into URLs—especially query
                  parameters—without breaking the address or confusing servers.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is encoding reversible?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. With valid percent-encoding, decoding returns the original
                  string. Invalid sequences may produce errors when decoding.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is this tool free?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Yes. SmartFlexa offers this encoder and decoder at no cost with
                  no signup required.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">
                  Is my data secure?
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-muted-foreground">
                  Processing happens in your browser. Your input is not uploaded
                  to our servers for this tool.
                </dd>
              </div>
            </dl>

            <MetaTagInboundLinks />
            <RelatedTools currentPath="/tools/url-encoder-decoder" heading="More tools" />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
